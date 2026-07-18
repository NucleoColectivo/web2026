
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building, Users, Gavel, Handshake, GraduationCap, Users2, 
  ClipboardList, MessagesSquare, FileText, Lightbulb, Leaf, CheckCircle, 
  AlertTriangle, Info, Coins, PieChart, FileDown, Brain, 
  RefreshCw, Bot, Target, Activity, Star
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useApp } from '@/context/app-context';
import { useTranslation } from '@/context/language-context';
import { cn } from '@/lib/utils';

// Configuración Base
const BASE_CONFIG = {
    defaultBudget: 6200,
    minBudget: 3000,
    maxBudget: 12000,
    principleOptions: [
        { id: 'inc', label: 'Inclusividad', desc: 'Identificar activamente a los GI y permitir su participación.', isAA1000: true },
        { id: 'mat', label: 'Materialidad', desc: 'Priorizar los temas de sostenibilidad más relevantes.', isAA1000: true },
        { id: 'res', label: 'Capacidad de Respuesta', desc: 'Reaccionar oportuna y relevantemente.', isAA1000: true },
        { id: 'uni', label: 'Unilateralidad', desc: 'Decisiones sin consulta (NO AA1000).', isAA1000: false },
        { id: 'con', label: 'Confidencialidad Total', desc: 'Restricción de información sin justificación.', isAA1000: false }
    ],
    stakeholders: [
        { id: 'empresas', name: 'Empresas Afiliadas', impact: 5, influence: 5, icon: Building, desc: 'Aportan recursos y generan empleo.' },
        { id: 'trabajadores', name: 'Trabajadores y Familias', impact: 5, influence: 4, icon: Users2, desc: 'Beneficiarios directos de servicios sociales.' },
        { id: 'estado', name: 'Entes de Regulación', impact: 3, influence: 5, icon: Gavel, desc: 'Definen normas y supervisan.' },
        { id: 'proveedores', name: 'Aliados y Proveedores', impact: 4, influence: 3, icon: Handshake, desc: 'Cadena de valor estratégica.' },
        { id: 'comunidad', name: 'Comunidad y Academia', impact: 3, influence: 2, icon: GraduationCap, desc: 'Legitimidad social.' },
        { id: 'equipo', name: 'Equipo Colaborador', impact: 4, influence: 3, icon: Users, desc: 'Empleados de la organización.' }
    ],
    channels: [
        { id: 'encuesta', name: 'Encuesta de Percepción', cost: 400, confidence: 8, compliance: 4, icon: ClipboardList, level: 'Informar' },
        { id: 'mesa', name: 'Mesas de Diálogo Social', cost: 1200, confidence: 28, compliance: 14, icon: MessagesSquare, level: 'Consultar' },
        { id: 'informe', name: 'Informe de Sostenibilidad', cost: 1500, confidence: 12, compliance: 28, icon: FileText, level: 'Informar' },
        { id: 'cocreacion', name: 'Talleres de Co-creación', cost: 1800, confidence: 42, compliance: 8, icon: Lightbulb, level: 'Colaborar' }
    ],
    valueDeclarations: [
        { id: 'bienestar', label: 'Bienestar Social Integral', desc: 'Calidad de vida (ODS 1,3,4).', rep: 15, comp: 5, conf: 5 },
        { id: 'transparencia', label: 'Transparencia Radical y Ética', desc: 'Rendición de cuentas AA1000.', rep: 25, comp: 22, conf: 18 },
        { id: 'desarrollo', label: 'Desarrollo Regional Sostenible', desc: 'Impacto territorial y alianzas.', rep: 20, comp: 8, conf: 10 }
    ],
    materialTopics: [
        { id: 'clima', label: 'Acción climática', desc: 'Huella de carbono', gri: 'GRI 305' },
        { id: 'trabajo', label: 'Trabajo decente', desc: 'Condiciones laborales', gri: 'GRI 401' },
        { id: 'etica', label: 'Ética y cumplimiento', desc: 'Anticorrupción', gri: 'GRI 205' },
        { id: 'comunidad', label: 'Desarrollo comunitario', desc: 'Inversión social', gri: 'GRI 413' },
        { id: 'agua', label: 'Gestión del agua', desc: 'Uso eficiente', gri: 'GRI 303' },
        { id: 'innovacion', label: 'Innovación inclusiva', desc: 'Tecnología para bienestar', gri: 'GRI 203' }
    ],
    improvementActions: [
        { id: 'politicas', label: 'Actualizar políticas', repBonus: 8, compBonus: 5, confBonus: 4 },
        { id: 'indicadores', label: 'Definir indicadores KPI', repBonus: 5, compBonus: 10, fontBonus: 6 },
        { id: 'reporte', label: 'Reporte público anual', repBonus: 12, compBonus: 5, confBonus: 8 },
        { id: 'monitoreo', label: 'Monitoreo continuo', repBonus: 10, compBonus: 8, fontBonus: 7 },
        { id: 'capacitacion', label: 'Capacitar Sistema Líder', repBonus: 6, compBonus: 6, confBonus: 10 }
    ]
};

export function ConexionSostenibleGame({ onBack }: { onBack: () => void }) {
    const { playSound } = useApp();
    const { t } = useTranslation();
    const reportRef = useRef<HTMLDivElement>(null);

    // Estado del juego
    const [step, setStep] = useState('home');
    const [role, setRole] = useState<string | null>(null);
    const [budget, setBudget] = useState(BASE_CONFIG.defaultBudget);
    const [initialBudget, setInitialBudget] = useState(BASE_CONFIG.defaultBudget);
    const [isNarrativeLoading, setIsNarrativeLoading] = useState(false);
    const [narrative, setNarrative] = useState<string | null>(null);
    const [selection, setSelection] = useState<any>({
        principles: [],
        valueDecl: null,
        stakeholders: [],
        materialTopics: [],
        actions: {}, // { stakeholderId: channelId }
        improvements: []
    });

    // Cálculos de métricas
    const computeFinalMetrics = () => {
        let confidence = 20, compliance = 20, reputation = 30;
        
        // Principios
        const hasAllPrinciples = BASE_CONFIG.principleOptions.filter(p=>p.isAA1000).every(p=>selection.principles.includes(p.id));
        if(hasAllPrinciples) { confidence += 15; compliance += 15; reputation += 12; }
        
        // Valor
        const val = BASE_CONFIG.valueDeclarations.find(v=>v.id===selection.valueDecl);
        if(val) { reputation += val.rep; compliance += val.comp; confidence += val.conf; }
        
        // Canales
        Object.values(selection.actions).forEach((cid: any) => {
            const ch = BASE_CONFIG.channels.find(c=>c.id===cid);
            if (ch) {
                confidence += ch.confidence;
                compliance += ch.compliance;
            }
        });
        
        // Mejoras
        selection.improvements.forEach((iid: any) => {
            const act = BASE_CONFIG.improvementActions.find(a=>a.id===iid);
            if (act) {
                reputation += act.repBonus;
                compliance += act.compBonus;
                confidence += act.confBonus;
            }
        });

        // Sinergias
        const selectedChannels = Object.values(selection.actions);
        if(selectedChannels.includes('mesa') && selectedChannels.includes('cocreacion')) {
            confidence += 10;
            reputation += 5;
        }

        return { 
            confidence: Math.min(100, confidence), 
            compliance: Math.min(100, compliance), 
            reputation: Math.min(100, reputation),
            effectiveness: Math.min(100, 40 + (selectedChannels.some((c: any) => c === 'cocreacion') ? 20 : 0) + (selection.improvements.length * 10))
        };
    };

    const metrics = computeFinalMetrics();

    // Handlers
    const startSimulation = (initBudget: number) => {
        setInitialBudget(initBudget);
        setBudget(initBudget);
        setStep('role');
        playSound('start');
    };

    const handleTogglePrinciple = (id: string) => {
        setSelection((prev: any) => {
            const exists = prev.principles.includes(id);
            if (exists) return { ...prev, principles: prev.principles.filter((p: string) => p !== id) };
            if (prev.principles.length < 3) return { ...prev, principles: [...prev.principles, id] };
            return prev;
        });
        playSound('click');
    };

    const handleAssignChannel = (sid: string, cid: string) => {
        const channel = BASE_CONFIG.channels.find(c=>c.id===cid)!;
        const prevCid = selection.actions[sid];
        const prevChannel = prevCid ? BASE_CONFIG.channels.find(c=>c.id===prevCid) : null;
        
        const costDiff = channel.cost - (prevChannel?.cost || 0);
        
        if (budget >= costDiff) {
            setBudget(prev => prev - costDiff);
            setSelection((prev: any) => ({
                ...prev,
                actions: { ...prev.actions, [sid]: cid }
            }));
            playSound('success');
        } else {
            alert("Presupuesto insuficiente");
        }
    };

    const generateNarrative = async () => {
        // Optimización Spark: Solo permitir si el usuario confirma
        const confirm = window.confirm("¿Deseas activar la IA para generar un informe narrativo detallado? Esto consume créditos de procesamiento.");
        if (!confirm) return;

        setIsNarrativeLoading(true);
        try {
            // Simulación de respuesta IA para ahorrar tokens
            setTimeout(() => {
                setNarrative("Su estrategia demuestra un alto compromiso con la transparencia y el diálogo social. La integración de talleres de co-creación ha generado una sinergia de confianza superior al 85%. Se recomienda fortalecer el monitoreo continuo para asegurar el cumplimiento GRI en futuros ciclos.");
                setIsNarrativeLoading(false);
                playSound('success');
            }, 2000);
        } catch (e) {
            setIsNarrativeLoading(false);
        }
    };

    const exportPDF = async () => {
        if (!reportRef.current) return;
        const canvas = await html2canvas(reportRef.current);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        pdf.save('Informe_Conexion_Sostenible.pdf');
        playSound('success');
    };

    // Renderizado de Pasos
    if (step === 'home') {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-black/40 p-6 rounded-none border-4 border-[#00FF58]/20">
                <div className="text-center max-w-4xl">
                    <div className="flex justify-center items-center gap-6 mb-12 flex-wrap">
                        <div className="w-12 h-12 bg-[#00FF58]/20 rounded-none flex items-center justify-center text-[#00FF58]">
                            <Activity className="animate-pulse" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black text-white font-headline mb-4 uppercase italic">Conexión Sostenible</h1>
                    <p className="text-xl md:text-2xl text-[#00FF58] font-medium mb-8">Modelo de relacionamiento AA1000SES + GRI</p>
                    <div className="bg-black/60 p-8 rounded-none border-2 border-white/10 mb-10">
                        <label className="block text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">💵 Presupuesto de Simulación</label>
                        <input 
                            type="number" 
                            defaultValue={BASE_CONFIG.defaultBudget} 
                            id="budgetInput"
                            className="bg-transparent text-5xl font-black text-white text-center w-full outline-none"
                        />
                    </div>
                    <button 
                        onClick={() => {
                            const val = parseInt((document.getElementById('budgetInput') as HTMLInputElement).value);
                            startSimulation(val || BASE_CONFIG.defaultBudget);
                        }}
                        className="bg-[#00FF58] hover:bg-white text-black px-12 py-5 rounded-none text-2xl font-black uppercase tracking-widest transition-all shadow-[8px_8px_0_0_rgba(0,0,0,1)] border-2 border-black"
                    >
                        Iniciar Sistema
                    </button>
                </div>
            </div>
        );
    }

    const stepsOrder = ['role', 'context', 'principles', 'value', 'stakeholders', 'materiality', 'channels', 'improvement', 'summary'];
    const currentStepIdx = stepsOrder.indexOf(step);

    return (
        <div className="space-y-8 animate-fade-in font-body">
            {/* Header Técnico */}
            <div className="bg-zinc-900 border-2 border-[#00FF58]/30 p-6 rounded-none shadow-2xl flex flex-wrap items-center justify-between gap-6 sticky top-24 z-30">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#00FF58]/20 rounded-none flex items-center justify-center text-[#00FF58]">
                        <Activity className="animate-pulse" />
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">STATUS: SIMULATION_ACTIVE</h4>
                        <p className="text-sm font-bold text-white uppercase">AA1000SES // NUCLEO_CORE</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <MetricMini label="Confianza" value={metrics.confidence} color="text-blue-400" />
                    <MetricMini label="Cumplimiento" value={metrics.compliance} color="text-[#00FF58]" />
                    <MetricMini label="Reputación" value={metrics.reputation} color="text-amber-400" />
                    <div className="bg-black/40 px-4 py-2 rounded-none border border-white/5">
                        <span className="text-[10px] text-zinc-500 block uppercase font-black">Budget</span>
                        <span className="text-lg font-black text-white">${budget.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Contenido Dinámico */}
            <div className="min-h-[50vh]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="max-w-5xl mx-auto"
                    >
                        {step === 'role' && (
                            <div className="text-center space-y-12">
                                <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic">Seleccione su Perfil Estratégico</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <RoleCard 
                                        title="Líder de Sostenibilidad" 
                                        icon={Leaf} 
                                        color="border-[#00FF58]"
                                        desc="Enfoque social, ambiental y materialidad."
                                        onClick={() => { setRole('sostenibilidad'); setStep('context'); playSound('click'); }}
                                    />
                                    <RoleCard 
                                        title="Jefe de Gobierno" 
                                        icon={Gavel} 
                                        color="border-blue-500"
                                        desc="Enfoque en cumplimiento, ética y riesgos."
                                        onClick={() => { setRole('gobierno'); setStep('context'); playSound('click'); }}
                                    />
                                </div>
                            </div>
                        )}

                        {step === 'context' && (
                            <div className="bg-zinc-900 border-2 border-white/10 p-10 rounded-none text-center space-y-8 shadow-[8px_8px_0_0_#00FF58]">
                                <Info className="mx-auto size-16 text-[#00FF58]" />
                                <h2 className="text-4xl font-black text-white uppercase">Misión Estratégica</h2>
                                <p className="text-xl text-zinc-300 leading-relaxed max-w-3xl mx-auto font-light">
                                    Su objetivo es implementar un modelo de relacionamiento basado en <strong>AA1000SES (2015)</strong> y <strong>GRI 2-29</strong>. 
                                    Debe priorizar la comunicación en doble vía y maximizar el impacto social con el presupuesto asignado.
                                </p>
                                <button onClick={() => setStep('principles')} className="btn-primary text-xl px-12 py-4 rounded-none bg-[#00FF58] text-black hover:bg-white transition-all">Continuar Secuencia</button>
                            </div>
                        )}

                        {step === 'principles' && (
                            <div className="space-y-8">
                                <h2 className="text-3xl font-black text-white uppercase">Priorice los 3 Principios AA1000</h2>
                                <div className="grid gap-4">
                                    {BASE_CONFIG.principleOptions.map(p => (
                                        <button 
                                            key={p.id}
                                            onClick={() => handleTogglePrinciple(p.id)}
                                            className={cn(
                                                "p-6 rounded-none border-2 text-left transition-all flex justify-between items-center",
                                                selection.principles.includes(p.id) 
                                                    ? "bg-[#00FF58]/10 border-[#00FF58]" 
                                                    : "bg-black/40 border-white/10 hover:border-white/30"
                                            )}
                                        >
                                            <div>
                                                <h4 className="text-xl font-bold text-white">{p.label}</h4>
                                                <p className="text-zinc-400">{p.desc}</p>
                                            </div>
                                            {selection.principles.includes(p.id) && <CheckCircle className="text-[#00FF58]" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 'channels' && (
                            <div className="space-y-8">
                                <h2 className="text-3xl font-black text-white uppercase">Asignación de Canales de Doble Vía</h2>
                                <div className="grid gap-6">
                                    {selection.stakeholders.length > 0 ? selection.stakeholders.map((sid: any) => {
                                        const s = BASE_CONFIG.stakeholders.find(st=>st.id===sid)!;
                                        const assignedCid = selection.actions[sid];
                                        return (
                                            <div key={sid} className="bg-black/40 p-8 rounded-none border-2 border-white/10 space-y-6">
                                                <div className="flex items-center gap-4">
                                                    <s.icon className="text-accent" />
                                                    <h3 className="text-xl font-black text-white uppercase">{s.name}</h3>
                                                </div>
                                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                                    {BASE_CONFIG.channels.map(c => (
                                                        <button 
                                                            key={c.id}
                                                            onClick={() => handleAssignChannel(sid, c.id)}
                                                            className={cn(
                                                                "p-4 rounded-none border-2 text-[10px] font-black uppercase tracking-widest transition-all",
                                                                assignedCid === c.id 
                                                                    ? "bg-[#00FF58] border-black text-black" 
                                                                    : "bg-zinc-800 border-white/5 text-zinc-400 hover:bg-zinc-700"
                                                            )}
                                                        >
                                                            {c.name} (${c.cost})
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    }) : <p className="text-zinc-500">Primero seleccione grupos de interés.</p>}
                                </div>
                            </div>
                        )}

                        {step === 'summary' && (
                            <div className="bg-zinc-900 border-2 border-white/10 p-12 rounded-none shadow-[12px_12px_0_0_#00FF58] space-y-10">
                                <div className="text-center">
                                    <PieChart className="mx-auto size-16 text-[#00FF58] mb-4" />
                                    <h2 className="text-4xl font-black text-white uppercase">Resumen de Estrategia</h2>
                                </div>
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="space-y-6">
                                        <div className="border-l-4 border-[#00FF58] pl-6">
                                            <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">Principios</h4>
                                            <p className="text-white font-bold">{selection.principles.map((p:any) => BASE_CONFIG.principleOptions.find(o=>o.id===p)?.label).join(', ')}</p>
                                        </div>
                                        <div className="border-l-4 border-blue-500 pl-6">
                                            <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">Valor Estratégico</h4>
                                            <p className="text-white font-bold">{BASE_CONFIG.valueDeclarations.find(v=>v.id===selection.valueDecl)?.label || 'No definido'}</p>
                                        </div>
                                    </div>
                                    <div className="bg-black/40 p-6 rounded-none border-2 border-white/5">
                                        <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 text-center">Score de Eficiencia</h4>
                                        <div className="text-6xl font-black text-[#00FF58] text-center">{Math.round((metrics.confidence + metrics.compliance + metrics.reputation) / 3)}%</div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap justify-center gap-6">
                                    <button onClick={() => setStep('results')} className="btn-primary px-10 py-4 text-xl bg-[#00FF58] text-black border-2 border-black hover:bg-white rounded-none">Generar Informe Final</button>
                                </div>
                            </div>
                        )}

                        {step === 'results' && (
                            <div ref={reportRef} className="bg-[#0a120a] p-10 md:p-20 rounded-none border-4 border-[#00FF58] text-white space-y-12">
                                <div className="flex justify-between items-start border-b-2 border-white/20 pb-10">
                                    <div>
                                        <h1 className="text-5xl font-black font-headline uppercase italic">Informe de Gestión GI</h1>
                                        <p className="text-[#00FF58] font-bold uppercase tracking-widest mt-2">Ciclo 2026 // Estrategia Núcleo</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                    <ReportMetric label="Confianza" value={metrics.confidence} />
                                    <ReportMetric label="Cumplimiento" value={metrics.compliance} />
                                    <ReportMetric label="Reputación" value={metrics.reputation} />
                                    <ReportMetric label="Efectividad" value={metrics.effectiveness} />
                                </div>

                                <div className="bg-black/30 p-10 rounded-none border-2 border-white/10">
                                    <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-4">
                                        <Brain className="text-[#00FF58]" /> Análisis del Modelo
                                    </h3>
                                    {isNarrativeLoading ? (
                                        <div className="flex flex-col items-center py-10">
                                            <RefreshCw className="animate-spin size-12 text-[#00FF58] mb-4" />
                                            <p className="text-zinc-400 font-code animate-pulse">PROCESANDO EVIDENCIA CON IA...</p>
                                        </div>
                                    ) : narrative ? (
                                        <p className="text-lg leading-relaxed italic text-zinc-200">{narrative}</p>
                                    ) : (
                                        <div className="text-center py-6">
                                            <p className="text-zinc-400 mb-6">Genera un análisis experto basado en sus decisiones.</p>
                                            <button 
                                                onClick={generateNarrative}
                                                className="bg-[#00FF58] text-black px-8 py-3 rounded-none font-bold flex items-center gap-3 mx-auto hover:bg-white transition-all border-2 border-black"
                                            >
                                                <Bot /> Activar IA Narrativa
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap justify-center gap-6 no-print">
                                    <button onClick={exportPDF} className="flex items-center gap-3 px-8 py-4 bg-white text-black font-black uppercase rounded-none hover:bg-[#00FF58] transition-all border-2 border-black">
                                        <FileDown /> Exportar PDF
                                    </button>
                                    <button onClick={() => window.location.reload()} className="flex items-center gap-3 px-8 py-4 border-2 border-white text-white font-black uppercase rounded-none hover:bg-white hover:text-black transition-all">
                                        Nueva Simulación
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controles de Navegación Globales */}
            {step !== 'home' && step !== 'results' && step !== 'role' && (
                <div className="flex justify-between max-w-5xl mx-auto pt-10">
                    <button 
                        onClick={() => {
                            const order = stepsOrder;
                            const idx = order.indexOf(step);
                            if (idx > 0) setStep(order[idx-1]);
                            playSound('click');
                        }}
                        className="px-8 py-3 rounded-none border-2 border-white/20 text-white font-bold hover:bg-white/10 transition-all"
                    >
                        ← Anterior
                    </button>
                    <button 
                        onClick={() => {
                            // Validaciones
                            if (step === 'principles' && selection.principles.length !== 3) {
                                alert("Seleccione exactamente 3 principios.");
                                return;
                            }
                            if (step === 'value' && !selection.valueDecl) {
                                alert("Seleccione una declaración de valor.");
                                return;
                            }
                            if (step === 'stakeholders' && selection.stakeholders.length !== 4) {
                                alert("Seleccione 4 grupos de interés.");
                                return;
                            }

                            const order = stepsOrder;
                            const idx = order.indexOf(step);
                            if (idx < order.length - 1) setStep(order[idx+1]);
                            playSound('click');
                        }}
                        className="px-8 py-3 rounded-none bg-[#00FF58] text-black font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg border-2 border-black"
                    >
                        Siguiente →
                    </button>
                </div>
            )}
        </div>
    );
}

// Sub-componentes
function MetricMini({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div className="hidden sm:block text-right">
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-tighter block">{label}</span>
            <span className={cn("text-sm font-black", color)}>{value}%</span>
        </div>
    );
}

function RoleCard({ title, icon: Icon, desc, color, onClick }: any) {
    return (
        <button onClick={onClick} className={cn("group p-10 rounded-none border-4 bg-black/40 text-left transition-all hover:bg-black/60", color + "/20 hover:" + color)}>
            <div className={cn("w-16 h-16 rounded-none flex items-center justify-center mb-6 transition-all group-hover:scale-110", color.replace('border', 'bg') + "/10")}>
                <Icon size={32} className={color.replace('border', 'text')} />
            </div>
            <h4 className="text-2xl font-black text-white uppercase mb-3">{title}</h4>
            <p className="text-zinc-400 font-light leading-relaxed">{desc}</p>
        </button>
    );
}

function ReportMetric({ label, value }: { label: string, value: number }) {
    return (
        <div className="text-center p-6 border-2 border-white/10 bg-black/20">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00FF58] block mb-2">{label}</span>
            <span className="text-5xl font-black italic font-headline">{value}%</span>
        </div>
    );
}
