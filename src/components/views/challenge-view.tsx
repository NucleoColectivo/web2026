
'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useApp } from '@/context/app-context';
import { useFirebase } from '@/firebase/provider';
import Image from 'next/image';
import {
    X, ArrowRight, ArrowLeft, Zap, Sparkles, Calculator, RefreshCw, Folder, Trash2, Sliders, Copy, BrainCircuit, Users2, Target, Save, Lightbulb, Hammer, Flame, Globe, Terminal, Info
} from 'lucide-react';
import { evaluateCreativeSolution, type EvaluationOutput } from '@/ai/flows/evaluate-creative-solution';
import { generateCreativeSolution, type SolutionOutput } from '@/ai/flows/generate-creative-solution';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/context/language-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { BRAND } from '@/lib/data';

function NodesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: any[] = [];
        const numParticles = 60; 
        const colors = [BRAND.yellow, '#8B5CF6', '#00FF58']; 

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    radius: Math.random() * 1.2 + 0.5,
                    color: colors[i % colors.length]
                });
            }
        };

        window.addEventListener('resize', resize);
        resize();

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = 0.3;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = p.color;
                        ctx.globalAlpha = (1 - dist / 150) * 0.1;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });
            
            ctx.globalAlpha = 1;
            animationFrameId = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />;
}

export function ChallengeView() {
    const { db, user, playSound } = useApp();
    const { t } = useTranslation();
    const [challengeView, setChallengeView] = useState<'cover' | 'game'>('cover');
    const [currentChallenge, setCurrentChallenge] = useState<any>(null);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [evaluationResult, setEvaluationResult] = useState<EvaluationOutput | null>(null);
    const [aiSolution, setAiSolution] = useState<SolutionOutput | null>(null);
    const [userSolution, setUserSolution] = useState("");
    const [showSaved, setShowSaved] = useState(false);
    const [savedList, setSavedList] = useState<any[]>([]);
    const [openSelector, setOpenSelector] = useState<string | null>(null);
    const [seed, setSeed] = useState(1125);

    const conceptos = useMemo(() => (t('challenge.creative.variables.concepts') || "").split('|'), [t]);
    const acciones = useMemo(() => (t('challenge.creative.variables.actions') || "").split('|'), [t]);
    const desafios = useMemo(() => (t('challenge.creative.variables.challenges') || "").split('|'), [t]);
    const contextos = useMemo(() => (t('challenge.creative.variables.contexts') || "").split('|'), [t]);

    const variableMap: Record<string, string[]> = {
        concepto: conceptos,
        accion: acciones,
        desafio: desafios,
        contexto: contextos,
    };

    const cardConfig: Record<string, { label: string, icon: any, color: string, textColor: string, num: string }> = {
        concepto: { label: "CONCEPTO", icon: Lightbulb, color: "#00FFFF", textColor: "text-cyan-400", num: "01" },
        accion: { label: "ACCIÓN", icon: Hammer, color: "#FFA500", textColor: "text-orange-400", num: "02" },
        desafio: { label: "DESAFÍO", icon: Flame, color: "#FF0000", textColor: "text-red-500", num: "03" },
        contexto: { label: "CONTEXTO", icon: Globe, color: "#00FF58", textColor: "text-green-500", num: "04" }
    };

    const generateChallenge = () => {
        const newChallenge = {
            id: Date.now(),
            concepto: conceptos[Math.floor(Math.random() * conceptos.length)],
            accion: acciones[Math.floor(Math.random() * acciones.length)],
            desafio: desafios[Math.floor(Math.random() * desafios.length)],
            contexto: contextos[Math.floor(Math.random() * contextos.length)]
        };
        setCurrentChallenge(newChallenge);
        setSeed(Math.floor(Math.random() * 9999));
        setUserSolution("");
        setEvaluationResult(null);
        setAiSolution(null);
    };

    const handleEvaluate = async () => {
        if (!currentChallenge || !userSolution) return;
        const cacheKey = `eval_${JSON.stringify(currentChallenge)}_${userSolution.trim()}`;
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
            setEvaluationResult(JSON.parse(cached));
            playSound('success');
            return;
        }

        setIsEvaluating(true);
        try {
            const result = await evaluateCreativeSolution({ ...currentChallenge, propuesta: userSolution });
            setEvaluationResult(result);
            sessionStorage.setItem(cacheKey, JSON.stringify(result));
            playSound('success');
        } catch (e) {
            console.error(e);
        } finally {
            setIsEvaluating(false);
        }
    };

    const handleGenerateSolution = async () => {
        if (!currentChallenge) return;
        const cacheKey = `sol_${JSON.stringify(currentChallenge)}`;
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
            setAiSolution(JSON.parse(cached));
            playSound('success');
            return;
        }

        setIsGenerating(true);
        try {
            const result = await generateCreativeSolution({ ...currentChallenge });
            setAiSolution(result);
            sessionStorage.setItem(cacheKey, JSON.stringify(result));
            playSound('success');
        } catch (e) {
            console.error(e);
        } finally {
            setIsGenerating(false);
        }
    };

    if (challengeView === 'cover') {
        return (
            <div className="font-body bg-black text-neutral-200 min-h-screen flex flex-col pt-20 overflow-hidden relative">
                <NodesBackground />
                <div className="flex-grow flex items-center justify-center p-4 relative z-10 antialiased font-medium">
                    <div className="text-center max-w-4xl animate-fade-in-up">
                        <div className="flex justify-center mb-8">
                             <Image src="https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/imagen/ICONO%20LOGO%20AMARILLO.png" alt="Logo" width={100} height={100} className="w-16 h-16 md:w-24 md:h-24" />
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black font-headline tracking-tighter mb-6 text-white uppercase">
                            {t('challenge.cover.title')}
                        </h1>
                        <p className="text-sm md:text-xl text-neutral-400 mb-10 md:mb-12 font-light max-w-2xl mx-auto leading-relaxed border-t border-b border-white/5 py-6 italic">
                            {t('challenge.cover.subtitle')}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            <div className="bg-neutral-900 border border-white/5 p-8 text-left rounded-2xl group hover:border-accent transition-all">
                                <Users2 className="size-10 mb-4 text-accent"/>
                                <h3 className="text-2xl font-bold font-headline text-white mb-2">{t('challenge.cover.strategic_challenge.title')}</h3>
                                <p className="text-sm text-neutral-400 mb-6">{t('challenge.cover.strategic_challenge.description')}</p>
                                <button onClick={() => { playSound('click'); window.open('https://forms.gle/smy3CpQaSMLeMYXj6', '_blank'); }} className="w-full py-3 bg-accent text-black font-bold uppercase rounded-lg">PROXIMAMENTE_</button>
                            </div>
                            <div className="bg-neutral-900 border border-white/5 p-8 text-left rounded-2xl group hover:border-cyan-400 transition-all">
                                <BrainCircuit className="size-10 mb-4 text-cyan-400"/>
                                <h3 className="text-2xl font-bold font-headline text-white mb-2">{t('challenge.cover.creative_machine.title')}</h3>
                                <p className="text-sm text-neutral-400 mb-6">{t('challenge.cover.creative_machine.description')}</p>
                                <button onClick={() => { playSound('start'); generateChallenge(); setChallengeView('game'); }} className="w-full py-3 bg-cyan-500 text-black font-bold uppercase rounded-lg">INICIAR_</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="font-body bg-black text-neutral-200 min-h-screen flex flex-col pt-20 overflow-hidden relative">
            <NodesBackground />
            <div className="flex-grow flex items-center justify-center p-4 relative z-10 antialiased font-medium py-10">
                <div className="w-full max-w-5xl mx-auto">
                    <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                        <div>
                            <h2 className="text-2xl font-black font-headline text-white tracking-widest uppercase">MÁQUINA CREATIVA</h2>
                            <p className="text-[10px] text-neutral-500 font-code uppercase">STATUS: ACTIVE_NODE | ENCRYPT: AES-256</p>
                        </div>
                        <button onClick={() => setChallengeView('cover')} className="px-4 py-2 border border-white/10 text-xs font-bold uppercase hover:bg-white/10 transition-all">SALIR</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        {currentChallenge && Object.keys(cardConfig).map((key) => {
                            const cfg = cardConfig[key];
                            return (
                                <div key={key} onClick={() => setOpenSelector(key)} className="bg-neutral-900/50 border border-white/10 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/10 transition-all min-h-[160px]">
                                    <cfg.icon className="size-8 mb-4" style={{ color: cfg.color }} />
                                    <h3 className={cn("text-[9px] font-black tracking-widest mb-2 uppercase", cfg.textColor)}>{cfg.label}</h3>
                                    <p className="text-lg font-mono text-white leading-tight">{currentChallenge[key]}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-black/60 border-l-4 border-primary p-8 mb-10">
                        <div className="flex items-center gap-2 mb-4 opacity-40">
                            <Zap size={14} className="text-primary" fill="currentColor"/>
                            <span className="text-[10px] font-black uppercase tracking-widest">MISIÓN_GENERADA</span>
                        </div>
                        <p className="text-xl md:text-2xl font-mono text-white/90 leading-relaxed italic">
                            Imagina un escenario en <span className="text-green-500 font-bold">{currentChallenge?.contexto}</span>, donde enfrentas <span className="text-red-500 font-bold">{currentChallenge?.desafio}</span>. Tu tarea es <span className="text-orange-400 font-bold">{currentChallenge?.accion}</span> aplicando el concepto de <span className="text-cyan-400 font-bold">{currentChallenge?.concepto}</span>.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <textarea 
                            value={userSolution} 
                            onChange={(e) => setUserSolution(e.target.value)} 
                            placeholder="Describe tu solución disruptiva aquí..."
                            className="w-full h-40 p-6 bg-white/5 text-white border border-white/10 focus:border-cyan-500 outline-none transition-all resize-none font-mono"
                        />
                        <div className="flex flex-wrap justify-center gap-6">
                            <button onClick={handleEvaluate} disabled={isEvaluating || !userSolution} className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-cyan-400 disabled:opacity-30 transition-all flex items-center gap-3">
                                {isEvaluating ? <RefreshCw className="animate-spin size-4" /> : <Calculator size={4}/>} EVALUAR_
                            </button>
                            <button onClick={handleGenerateSolution} disabled={isGenerating} className="px-8 py-4 border border-white/20 text-white font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
                                {isGenerating ? <RefreshCw className="animate-spin size-4" /> : <Sparkles size={4}/>} AYUDA_IA_
                            </button>
                            <button onClick={generateChallenge} className="px-8 py-4 border border-white/20 text-white font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
                                <RefreshCw size={16}/> RESET_
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {(aiSolution || evaluationResult) && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12 space-y-8">
                                {aiSolution && (
                                    <div className="bg-white/5 border border-white/10 p-8">
                                        <h3 className="text-2xl font-black font-headline text-white mb-4 uppercase">{aiSolution.titulo}</h3>
                                        <p className="text-lg text-neutral-300 leading-relaxed font-mono">{aiSolution.solucion}</p>
                                    </div>
                                )}
                                {evaluationResult && (
                                    <div className="bg-white/5 border border-white/10 p-8">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-2xl font-black font-headline text-white uppercase">{evaluationResult.titulo}</h3>
                                            <span className="text-5xl font-black text-cyan-400">{evaluationResult.puntuacion}</span>
                                        </div>
                                        <p className="text-lg text-neutral-300 leading-relaxed italic">{evaluationResult.retroalimentacion}</p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <Dialog open={!!openSelector} onOpenChange={(open) => !open && setOpenSelector(null)}>
                <DialogContent className="bg-black/95 border border-white/20 text-white max-w-xl">
                    <DialogTitle className="uppercase tracking-widest font-black">Seleccionar Variable</DialogTitle>
                    <DialogDescription className="sr-only">Elige una nueva variable para el reto</DialogDescription>
                    <div className="space-y-2 mt-4 max-h-[60vh] overflow-y-auto">
                        {openSelector && variableMap[openSelector].map(option => (
                            <button key={option} onClick={() => { setCurrentChallenge((prev:any) => ({...prev, [openSelector]: option})); setOpenSelector(null); playSound('click'); }} className="w-full text-left p-4 bg-white/5 hover:bg-white/10 transition-all font-mono">
                                {option}
                            </button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
