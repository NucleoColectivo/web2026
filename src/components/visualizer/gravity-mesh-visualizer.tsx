"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GravityMeshVisualizerProps {
  embedded?: boolean;
  audioAnalyser: AnalyserNode | null;
  showFullscreenToggle?: boolean;
}

class Particle {
    x: number;
    y: number;
    z: number;
    size: number;
    
    constructor(w: number, h: number) {
        this.x = 0; this.y = 0; this.z = 0; this.size = 0;
        this.reset(w, h);
    }
    reset(w: number, h: number) { this.x = (Math.random() - 0.5) * w * 1.5; this.y = (Math.random() - 0.5) * h * 1.5; this.z = Math.random() * 1500 + 200; this.size = Math.random(); }
    update(speed: number, w: number, h: number) { this.z -= speed; if (this.z <= 1) this.reset(w, h); }
    draw(ctx: CanvasRenderingContext2D, w: number, h: number, perspective: number) {
        const scale = perspective / (perspective + this.z);
        const sx = (this.x) * scale + w/2;
        const sy = (this.y) * scale + h/2;
        if (sx < 0 || sx > w || sy < 0 || sy > h) return;
        const opacity = Math.min(0.8, (1500 - this.z)/1000);
        ctx.fillStyle = `rgba(200, 255, 230, ${opacity})`;
        ctx.fillRect(sx, sy, this.size * 2, this.size * 2);
    }
}

class Point {
    baseX: number; baseY: number; baseZ: number; currentZ: number; velocityZ: number;
    constructor(x: number, y: number, z: number) { this.baseX = x; this.baseY = y; this.baseZ = z; this.currentZ = z; this.velocityZ = 0; }
    update(w: number, h: number, config: any, state: any, triggerInteraction: () => void) {
        const displacement = this.currentZ - this.baseZ;
        const force = -config.tension * displacement;
        this.velocityZ += force;
        this.velocityZ *= config.dampening;
        this.currentZ += this.velocityZ;
        let targetX = state.mouseX;
        let targetY = state.mouseY;
        let influence = config.touchInfluence;
        if (state.isGyroActive && state.mouseX < 0) { targetX = (0.5 + state.gyroX * 0.03) * w; targetY = (0.5 + state.gyroY * 0.03) * h; influence = config.touchInfluence * 0.8; }
        if (targetX > 0) {
            const scale = config.perspective / (config.perspective + this.currentZ + config.baseZ);
            const screenX = (this.baseX - w/2) * scale + w/2;
            const screenY = (this.baseY - h/2) * scale + h/2;
            const dx = screenX - targetX;
            const dy = screenY - targetY;
            if (Math.abs(dx) < 250 && Math.abs(dy) < 250) {
                const distSq = dx*dx + dy*dy;
                if (distSq < 62500) { const pull = (1 - Math.sqrt(distSq)/250) * influence; this.velocityZ += pull * 0.2; triggerInteraction(); }
            }
        }
    }
    applyForce(force: number, triggerInteraction: () => void) { this.velocityZ += force; if (Math.abs(force) > 2) triggerInteraction(); }
}


export function GravityMeshVisualizer({ embedded = false, audioAnalyser, showFullscreenToggle = false }: GravityMeshVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  
  const config = useRef({ gridSize: 40, perspective: 900, baseZ: 200, dampening: 0.94, tension: 0.025, audioInfluence: 200, touchInfluence: 800, idleTimeout: 3000 });
  const state = useRef<{
    points: Point[];
    particles: Particle[];
    width: number;
    height: number;
    mouseX: number;
    mouseY: number;
    gyroX: number;
    gyroY: number;
    isGyroActive: boolean;
    lastInteraction: number;
    isIdle: boolean;
    idlePhase: number;
    dataArray: Uint8Array | null;
    avgVol: number;
  }>({ points: [], particles: [], width: 0, height: 0, mouseX: -9999, mouseY: -9999, gyroX: 0, gyroY: 0, isGyroActive: false, lastInteraction: Date.now(), isIdle: false, idlePhase: 0, dataArray: null, avgVol: 0 });

  const volBarRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef<HTMLDivElement>(null);
  const sysMsgRef = useRef<HTMLDivElement>(null);
  const valRefs = useRef<{[key: string]: HTMLSpanElement | null}>({});

  const triggerInteraction = () => {
      state.current.lastInteraction = Date.now();
      if (state.current.isIdle) { 
          state.current.isIdle = false; 
          if (modeRef.current) { 
              modeRef.current.innerText = "MODO: AUDIO REACTIVO"; 
              modeRef.current.style.color = "#00ff88"; 
          } 
      }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(err => {
          console.warn("Fullscreen request failed:", err);
        });
      } else {
        document.exitFullscreen();
      }
    } catch (e) {
      console.warn("Fullscreen API error:", e);
    }
  };
  
    const createWorld = () => {
        if (!canvasRef.current || !containerRef.current) return;
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        canvasRef.current.width = width; canvasRef.current.height = height; state.current.width = width; state.current.height = height;
        state.current.points = []; state.current.particles = [];
        const range = Math.max(width, height) * 1.2; const step = range / config.current.gridSize;
        for (let y = 0; y < config.current.gridSize; y++) { for (let x = 0; x < config.current.gridSize; x++) { const pX = (x - config.current.gridSize/2) * step + width/2; const pY = (y - config.current.gridSize/2) * step + height/2; state.current.points.push(new Point(pX, pY, 0)); } }
        for(let i=0; i<100; i++) state.current.particles.push(new Particle(width, height));
    };


  const animate = () => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d', { alpha: false });
      if (!ctx) return;
      
      const { width, height, dataArray, points, particles } = state.current;
      const { gridSize, audioInfluence, idleTimeout, perspective } = config.current;
      
      if (embedded) { ctx.clearRect(0, 0, width, height); ctx.fillStyle = 'rgba(5, 5, 8, 0.4)'; ctx.fillRect(0, 0, width, height); } else { ctx.fillStyle = '#050508'; ctx.fillRect(0, 0, width, height); }
      
      if (audioAnalyser && dataArray) { 
        try { 
          audioAnalyser.getByteFrequencyData(dataArray); 
          let sum = 0; for(let i=0; i<dataArray.length; i++) sum += dataArray[i]; 
          const rawAvg = sum / dataArray.length; 
          if (rawAvg === 0 && !state.current.isIdle) { const time = Date.now() * 0.005; state.current.avgVol = (Math.sin(time) * 0.5 + 0.5) * 30; } else { state.current.avgVol = rawAvg; } 
        } catch(e) { state.current.avgVol = 0; } 
      } else { 
        const time = Date.now() * 0.002; state.current.avgVol = (Math.sin(time * 2) * 0.5 + 0.5) * 20; 
      }

      if (volBarRef.current) volBarRef.current.style.width = Math.min(100, state.current.avgVol * 1.5) + '%';
      if (state.current.avgVol > 10) triggerInteraction();
      
      if (Date.now() - state.current.lastInteraction > idleTimeout) { 
        if (!state.current.isIdle) { 
          state.current.isIdle = true; 
          if (modeRef.current) { modeRef.current.innerText = "ESPERANDO SEÑAL..."; modeRef.current.style.color = "#00ccff"; } 
          if (sysMsgRef.current) sysMsgRef.current.style.opacity = "1"; 
        } 
        state.current.idlePhase += 0.05; 
      } else { 
        if (sysMsgRef.current) sysMsgRef.current.style.opacity = "0"; 
      }
      
      const pSpeed = 2 + (state.current.avgVol / 20); 
      particles.forEach(p => { p.update(pSpeed, width, height); p.draw(ctx, width, height, perspective); });
      
      ctx.lineWidth = 1; let pIndex = 0; const time = Date.now() * 0.002; 
      const projX = new Float32Array(points.length); const projY = new Float32Array(points.length); const projScale = new Float32Array(points.length);
      
      for (let y = 0; y < gridSize; y++) { for (let x = 0; x < gridSize; x++) { 
          const p = points[pIndex]; 
          const distCenter = Math.sqrt(Math.pow(x - gridSize/2, 2) + Math.pow(y - gridSize/2, 2)); 
          if (state.current.avgVol > 5) { const wave = Math.sin(distCenter * 0.5 - time * 5); p.applyForce(wave * (state.current.avgVol/255) * audioInfluence * 0.1, triggerInteraction); } 
          if (state.current.isIdle) { const breath = Math.sin(x * 0.3 + state.current.idlePhase) * Math.cos(y * 0.3 + state.current.idlePhase); p.velocityZ += breath * 0.5; } 
          p.update(width, height, config.current, state.current, triggerInteraction); 
          const scale = perspective / (perspective + p.currentZ + config.current.baseZ); 
          projX[pIndex] = (p.baseX - width/2) * scale + width/2; 
          projY[pIndex] = (p.baseY - height/2) * scale + height/2; 
          projScale[pIndex] = scale; pIndex++; 
      }}
      
      for (let y = 0; y < gridSize; y++) { for (let x = 0; x < gridSize; x++) { 
        const i = y * gridSize + x; 
        if (projScale[i] <= 0) continue; 
        const px = projX[i]; const py = projY[i]; 
        if (px < -100 || px > width+100 || py < -100 || py > height+100) continue; 
        const depth = Math.abs(points[i].currentZ); 
        let r, g, b; 
        if (state.current.isIdle) { r=0; g=200; b=255; } else { r = depth > 50 ? 50 : 0; g = 255; b = depth > 50 ? 255 : 136; } 
        const alpha = Math.min(1, 0.1 + (depth/100) + (state.current.avgVol/300)); 
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`; 
        ctx.beginPath(); 
        if (x < gridSize - 1 && projScale[i+1] > 0) { ctx.moveTo(px, py); ctx.lineTo(projX[i+1], projY[i+1]); } 
        if (y < gridSize - 1 && projScale[i+gridSize] > 0) { ctx.moveTo(px, py); ctx.lineTo(projX[i+gridSize], projY[i+gridSize]); } 
        ctx.stroke(); 
      }}
      
      requestRef.current = requestAnimationFrame(animate);
  };
  
    const initSystem = async () => {
      if (audioAnalyser) state.current.dataArray = new Uint8Array(audioAnalyser.frequencyBinCount);
      else state.current.dataArray = new Uint8Array(128); 
      setIsRunning(true);
  };

  useEffect(() => {
    if (isRunning) {
        createWorld();
        animate();
    }
    return () => {
        if(requestRef.current) cancelAnimationFrame(requestRef.current);
    }
  }, [isRunning]);

  useEffect(() => {
      if (audioAnalyser || embedded) initSystem();
  }, [audioAnalyser, embedded]);

  useEffect(() => { 
    const handleResize = () => {
      createWorld();
    }; 
    const handleMouseMove = (e: MouseEvent) => { if (containerRef.current) { const rect = containerRef.current.getBoundingClientRect(); state.current.mouseX = e.clientX - rect.left; state.current.mouseY = e.clientY - rect.top; } else { state.current.mouseX = e.clientX; state.current.mouseY = e.clientY; } }; 
    const handleTouchMove = (e: TouchEvent) => { if (containerRef.current) { const rect = containerRef.current.getBoundingClientRect(); state.current.mouseX = e.touches[0].clientX - rect.left; state.current.mouseY = e.touches[0].clientY - rect.top; } }; 
    const handleTouchEnd = () => { state.current.mouseX = -9999; }; 
    const handleFullscreenChange = () => { setIsFullscreen(!!document.fullscreenElement); setTimeout(createWorld, 150); }; 
    window.addEventListener('resize', handleResize); 
    window.addEventListener('mousemove', handleMouseMove); 
    window.addEventListener('touchmove', handleTouchMove, {passive: false}); 
    window.addEventListener('touchend', handleTouchEnd); 
    document.addEventListener('fullscreenchange', handleFullscreenChange); 
    return () => { 
        window.removeEventListener('resize', handleResize); 
        window.removeEventListener('mousemove', handleMouseMove); 
        window.removeEventListener('touchmove', handleTouchMove); 
        window.removeEventListener('touchend', handleTouchEnd); 
        document.removeEventListener('fullscreenchange', handleFullscreenChange); 
        if (requestRef.current) cancelAnimationFrame(requestRef.current); 
    }; 
  }, []);

  const updateVal = (key: string, val: string) => { 
      (config.current as any)[key] = parseFloat(val); 
      if (valRefs.current[key]) (valRefs.current[key] as HTMLSpanElement).innerText = val; 
  };

  return (
    <div ref={containerRef} className={cn(embedded ? "absolute inset-0 z-0 overflow-hidden rounded-xl bg-black" : "fixed inset-0 z-50 bg-[#050508] text-white font-code overflow-hidden")}>
        <div className="absolute inset-0 pointer-events-none z-10 opacity-60" style={{background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1))', backgroundSize: '100% 4px'}}></div>
        <canvas ref={canvasRef} className="block w-full h-full relative z-0" />
        {!embedded && <div ref={sysMsgRef} className="absolute top-5 left-1/2 -translate-x-1/2 text-[10px] text-white/30 tracking-[0.2em] pointer-events-none z-20 transition-opacity duration-500">SISTEMA EN REPOSO - ACÉRCATE</div>}
        {!isRunning && !embedded && (<div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-radial-gradient from-[#1a1a2e] to-black text-center p-6"><button onClick={() => initSystem()} className="bg-transparent border-2 border-[#00ff88] text-[#00ff88] px-10 py-4 text-lg font-bold tracking-[4px] uppercase hover:bg-[#00ff88] hover:text-black hover:shadow-[0_0_30px_#00ff88] transition-all">INICIAR VISUALIZADOR</button></div>)}
        {(!embedded || showFullscreenToggle) && <button onClick={toggleFullscreen} className="absolute bottom-6 right-6 z-50 p-2 text-[#00ff88] border border-[#00ff88] rounded hover:bg-[#00ff88] hover:text-black transition-colors" title="Alternar Pantalla Completa">{isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}</button>}
        {(isRunning && (!embedded || isFullscreen)) && (
            <div className="absolute inset-0 z-40 pointer-events-none p-4 flex flex-col justify-between">
                <div className="pointer-events-auto bg-[#05050a]/85 border border-[#00ff88]/30 p-4 rounded backdrop-blur-sm w-full max-w-[280px] shadow-lg transition-all duration-300">
                    <div className="flex justify-between items-center cursor-pointer group mb-2" onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}><h3 className="text-white font-bold text-xs tracking-widest select-none">PARAMETROS_CORE</h3><div className="text-[#00ff88] text-xs font-code">[{isMenuCollapsed ? '+' : '-'}]</div></div>
                    {!isMenuCollapsed && (<div className="space-y-4 animate-fade-in"><div><div className="flex justify-between text-[10px] text-[#00ff88] font-bold mb-1"><span>GANANCIA AUDIO</span><span ref={el => valRefs.current['audioInfluence'] = el}>200</span></div><input type="range" className="w-full" min="0" max="500" defaultValue="200" onChange={(e) => updateVal('audioInfluence', e.target.value)} /></div><div><div className="flex justify-between text-[10px] text-[#00ff88] font-bold mb-1"><span>TENSIÓN MALLA</span><span ref={el => valRefs.current['tension'] = el}>0.025</span></div><input type="range" className="w-full" min="0.005" max="0.1" step="0.005" defaultValue="0.025" onChange={(e) => updateVal('tension', e.target.value)} /></div></div>)}
                    <div className="flex gap-4 mt-2 border-t border-white/10 pt-3"><div className="flex items-center text-[10px] text-gray-500 font-bold"><span className={`w-2 h-2 rounded-full mr-1 ${audioAnalyser ? 'bg-[#00ff88] shadow-[0_0_8px_#00ff88]' : 'bg-red-500'}`}></span>AUDIO_SOURCE: {audioAnalyser ? 'INTERNAL' : 'OFFLINE'}</div></div>
                </div>
                <div className="self-end pointer-events-auto bg-[#05050a]/85 border border-[#00ff88]/30 p-4 rounded backdrop-blur-sm min-w-[160px] text-right"><div className="text-[10px] text-gray-500 mb-1 tracking-widest">ESTADO</div><div ref={modeRef} className="text-sm font-bold text-[#00ff88] mb-3 animate-pulse">{audioAnalyser ? 'SISTEMA ONLINE' : 'MODO SIMULACIÓN'}</div><div className="text-[10px] text-gray-500 mb-1 tracking-widest">ENERGÍA ACÚSTICA</div><div className="h-1 w-full bg-gray-800 overflow-hidden"><div ref={volBarRef} className="h-full bg-[#00ff88] w-0 transition-all duration-75"></div></div></div>
            </div>
        )}
    </div>
  );
};
