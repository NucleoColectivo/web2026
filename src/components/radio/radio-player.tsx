
"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, Bot, Volume2, VolumeX, SkipBack, SkipForward, Shuffle, ChevronUp, ChevronDown, Maximize2, Activity, Settings2, X } from 'lucide-react';
import { WELCOME_DJ_URL, DJ_MESSAGES, DJ_INTERVAL_MINUTES, STATIONS_DATA } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';

type Station = typeof STATIONS_DATA[0]['stations'][0];

interface RadioPlayerProps {
  currentStation: Station | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  onAnalyserReady: (analyser: AnalyserNode) => void;
  volume: number;
  isMuted: boolean;
  onClose: () => void;
}

export function RadioPlayer({ 
  currentStation, 
  isPlaying, 
  onTogglePlay, 
  isExpanded, 
  setIsExpanded, 
  onAnalyserReady, 
  volume, 
  isMuted,
  onClose
}: RadioPlayerProps) {
  const streamRef = useRef<HTMLAudioElement | null>(null);
  const djRef = useRef<HTMLAudioElement | null>(null);
  const [djActive, setDjActive] = useState(false);
  const [welcomePlayed, setWelcomePlayed] = useState(false);
  const [lastDjTime, setLastDjTime] = useState(0);
  const [isInitializing, setIsInitializing] = useState(false);
  const [countdown, setCountdown] = useState('');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const allStations = useMemo(() => STATIONS_DATA.flatMap(cat => cat.stations), []);

  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.volume = isMuted ? 0 : volume;
    }
    if (djRef.current) {
      djRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    streamRef.current = new Audio();
    djRef.current = new Audio();
    streamRef.current.crossOrigin = "anonymous";
    djRef.current.crossOrigin = "anonymous";

    return () => {
      streamRef.current?.pause();
      djRef.current?.pause();
      audioCtxRef.current?.close();
    };
  }, []);

  useEffect(() => {
    const initAudioContext = () => {
      if (!audioCtxRef.current && isPlaying && streamRef.current) {
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          audioCtxRef.current = new AudioContext();
          analyserRef.current = audioCtxRef.current.createAnalyser();
          analyserRef.current.fftSize = 256;
          sourceRef.current = audioCtxRef.current.createMediaElementSource(streamRef.current);
          sourceRef.current.connect(analyserRef.current);
          analyserRef.current.connect(audioCtxRef.current.destination);
          if (onAnalyserReady) onAnalyserReady(analyserRef.current);
        } catch (e) {
          console.warn("AudioContext Init Warning (CORS):", e);
        }
      } else if (audioCtxRef.current?.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    };
    if (isPlaying) {
        initAudioContext();
    }
  }, [isPlaying, onAnalyserReady]);

  useEffect(() => {
    if (!isPlaying || djActive || isInitializing || !lastDjTime) {
      setCountdown('');
      return;
    }
    const timer = setInterval(() => {
      const nextTime = lastDjTime + DJ_INTERVAL_MINUTES * 60 * 1000;
      const diff = nextTime - Date.now();
      if (diff > 0) {
        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        setCountdown(`-${mins}:${secs.toString().padStart(2, '0')} MIN`);
      } else {
        setCountdown("CUALQUIER MOMENTO...");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, lastDjTime, djActive, isInitializing]);

  useEffect(() => {
    if (currentStation && streamRef.current) {
      streamRef.current.src = currentStation.url;
      if (isPlaying && welcomePlayed && !djActive) {
        streamRef.current.play().catch(e => console.log("Stream Change Play Error:", e));
      }
    }
  }, [currentStation, isPlaying, welcomePlayed, djActive]);

  const playWelcomeSequence = () => {
    if (!djRef.current || !streamRef.current) return;
    setIsInitializing(true);
    setDjActive(true);
    streamRef.current.pause();
    djRef.current.src = WELCOME_DJ_URL;
    
    const cleanupAndStartRadio = () => {
      if (djRef.current) {
          djRef.current.removeEventListener('ended', handleEnded);
          djRef.current.removeEventListener('error', handleError);
      }
      setWelcomePlayed(true);
      setDjActive(false);
      setIsInitializing(false);
      setLastDjTime(Date.now());
      startMainStream();
    };

    const handleEnded = () => cleanupAndStartRadio();
    const handleError = () => cleanupAndStartRadio();
    
    djRef.current.addEventListener('ended', handleEnded);
    djRef.current.addEventListener('error', handleError);
    djRef.current.play().catch(e => cleanupAndStartRadio());
  };

  const startMainStream = () => {
    if (streamRef.current) {
      streamRef.current.play().catch(e => console.log("Error fatal iniciando stream:", e));
    }
  };
  
  useEffect(() => {
    if (!streamRef.current || !djRef.current) return;
    if (!isPlaying) {
        streamRef.current.pause();
        djRef.current.pause();
        return;
    }
    if (audioCtxRef.current?.state === 'suspended') audioCtxRef.current.resume();

    if (!welcomePlayed && !isInitializing && !djActive) {
        playWelcomeSequence();
    } else if (welcomePlayed && !djActive && !isInitializing) {
        streamRef.current.play().catch(e => console.log("Stream Resume Error:", e));
    } else if (djActive && !isInitializing) {
        djRef.current.play().catch(e => console.log("DJ Resume Error:", e));
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying || !welcomePlayed || djActive || isInitializing) return;
    const checkInterval = setInterval(() => {
      if (lastDjTime && (Date.now() - lastDjTime) / 1000 / 60 >= DJ_INTERVAL_MINUTES) {
        triggerAutoDJ();
      }
    }, 10000);
    return () => clearInterval(checkInterval);
  }, [isPlaying, welcomePlayed, lastDjTime, djActive, isInitializing]);

  const fadeVolume = (audioEl: HTMLAudioElement, targetVol: number, duration: number) => {
    if (isMuted) return;
    const startVol = audioEl.volume;
    const steps = 20;
    const stepTime = duration / steps;
    const volStep = (targetVol - startVol) / steps;
    let currentStep = 0;
    const fadeInterval = setInterval(() => {
      currentStep++;
      const newVol = startVol + (volStep * currentStep);
      if (newVol >= 0 && newVol <= 1) audioEl.volume = newVol;
      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        audioEl.volume = targetVol;
      }
    }, stepTime);
  };

  const triggerAutoDJ = () => {
    if (DJ_MESSAGES.length === 0 || !streamRef.current || !djRef.current) return;
    setDjActive(true);
    djRef.current.src = DJ_MESSAGES[Math.floor(Math.random() * DJ_MESSAGES.length)];
    fadeVolume(streamRef.current, volume * 0.2, 1000);
    djRef.current.play().then(() => {
      if(djRef.current) {
        djRef.current.onended = () => {
          if (streamRef.current) fadeVolume(streamRef.current, volume, 1500);
          setDjActive(false);
          setLastDjTime(Date.now());
        };
      }
    }).catch(e => {
      if(streamRef.current) streamRef.current.volume = volume;
      setDjActive(false);
      setLastDjTime(Date.now());
    });
  };

  const handleNext = () => {
    const currentIndex = allStations.findIndex(s => s.id === currentStation?.id);
    const nextStation = allStations[(currentIndex + 1) % allStations.length];
    // This is handled by parent but for widget we can just force update via props logic if needed
    // In this MVP we expect the user to use the radio page or we can add local station management
  };

  if (!currentStation) return null;

  return (
    <div className={cn(
      "fixed bottom-6 left-6 z-[100] transition-all duration-500 ease-in-out",
      isExpanded ? 'w-[320px] md:w-[400px]' : 'w-[200px]'
    )}>
      <div className="bg-black/95 text-white shadow-[10px_10px_0px_0px_rgba(0,0,0,0.5)] border-2 border-white/10 flex flex-col backdrop-blur-md rounded-none overflow-hidden">
        
        {/* Header / Mini Player */}
        <div 
          className="flex items-center justify-between px-4 py-4 cursor-pointer hover:bg-white/5 transition-colors border-b border-white/5"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={cn(
              "w-2 h-2 rounded-full shrink-0", 
              isPlaying ? 'bg-[#00FF58] animate-pulse shadow-[0_0_8px_#00FF58]' : 'bg-red-500'
            )}></div>
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] font-code text-neutral-500 tracking-[0.2em] uppercase">SIGNAL_ACTIVE</span>
              <span className="text-xs font-bold truncate uppercase tracking-tight">
                {currentStation.title}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={onTogglePlay} 
              className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
              {isPlaying ? <Pause size={14} fill="black" /> : <Play size={14} fill="black" className="ml-0.5" />}
            </button>
            <div className="p-1 text-neutral-500 hover:text-white transition-colors">
              {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }} 
              className="p-1 ml-1 text-neutral-500 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Expanded Controls */}
        {isExpanded && (
          <div className="p-6 pt-4 animate-fade-in space-y-6">
            
            <div className="flex justify-between items-start gap-4 border-b border-white/5 pb-4">
              <div className="flex-1 min-w-0">
                <h4 className="text-[8px] font-code text-neutral-500 mb-1 uppercase tracking-widest">STATION_ID</h4>
                <p className="text-xl font-black italic uppercase font-headline tracking-tighter truncate text-[#00FF58]">
                  {currentStation.title}
                </p>
              </div>
              <div className="text-right">
                <h4 className="text-[8px] font-code text-neutral-500 mb-1 uppercase tracking-widest">FREQ</h4>
                <p className="text-[10px] font-bold uppercase tracking-wider">128 KBPS</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-3 flex items-center gap-3">
              <div className={cn("p-2 rounded-none bg-black/40", djActive ? "text-[#00FF58]" : "text-neutral-600")}>
                <Bot size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black tracking-widest uppercase text-neutral-500">AUTO DJ SYSTEM</span>
                <span className="text-[10px] font-bold text-neutral-300">
                  {djActive ? (
                    <span className="text-[#00FF58] animate-pulse">INTERVINIENDO SEÑAL...</span>
                  ) : (
                    <span>STANDBY <span className="text-accent">{countdown}</span></span>
                  )}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 py-2">
              <div className="flex items-center justify-center gap-6">
                <button className="text-neutral-500 hover:text-white transition-colors">
                  <Shuffle size={18} />
                </button>
                <button className="text-neutral-300 hover:text-white transition-colors">
                  <SkipBack size={24} fill="currentColor" />
                </button>
                <button 
                  onClick={onTogglePlay} 
                  className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.15)] border-2 border-black"
                >
                  {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
                </button>
                <button className="text-neutral-300 hover:text-white transition-colors">
                  <SkipForward size={24} fill="currentColor" />
                </button>
                <button className="text-neutral-500 hover:text-white transition-colors">
                  <Settings2 size={18} />
                </button>
              </div>

              <div className="w-full px-2">
                <div className="flex items-center gap-3">
                  <VolumeX size={14} className="text-neutral-600 shrink-0" />
                  <Slider 
                    defaultValue={[volume * 100]} 
                    max={100} 
                    step={1} 
                    className="flex-grow"
                    onValueChange={(val) => {
                      // This would need to set volume in context
                    }}
                  />
                  <Volume2 size={14} className="text-neutral-600 shrink-0" />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap gap-1.5">
                {currentStation.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[8px] font-bold uppercase border border-white/10 px-2 py-0.5 text-neutral-500">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center text-[8px] font-code text-neutral-600 border-t border-white/5 pt-4">
                <div className="flex items-center gap-2">
                  <Activity size={10} className="text-[#00FF58]" />
                  <span>SYNC_STABLE</span>
                </div>
                <span>CORE_V.2.5</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
