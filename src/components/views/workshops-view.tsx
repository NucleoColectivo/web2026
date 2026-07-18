
'use client';

import React, { useRef } from 'react';
import { useTranslation } from '@/context/language-context';
import { 
  Award, CheckCircle, GitBranch, 
  MessageCircle, ArrowRight, Target, Wand2, Zap, Microscope, 
  Layers, Presentation, ChevronRight, UserCheck, Users,
  Flame, Clock, Sparkles
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

function SpatialSection({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 50, damping: 25, mass: 0.5 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -3]), springConfig);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, rotateX, perspective: 1200 }}
      className={cn("relative z-10 antialiased", className)}
    >
      {children}
    </motion.div>
  );
}

const SpecItemMini = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-black rounded-none shadow-sm">
    <Icon className="size-3 text-black/60" />
    <div className="flex gap-2">
      <span className="text-[8px] font-black uppercase text-black/60 font-code">{label}:</span>
      <span className="text-[9px] font-bold text-black uppercase font-headline">{value}</span>
    </div>
  </div>
);

const ReactorBanner = () => (
  <motion.a
    href="https://reactor-mocha-three.vercel.app/laboratorio"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -2, scale: 1.01 }}
    className="group relative w-full mb-12 overflow-hidden rounded-none border-2 border-accent bg-black flex flex-col p-6 md:px-12 md:py-8 shadow-[20px_20px_0px_0px_rgba(248,195,0,0.3)] transition-all duration-500 cursor-pointer"
  >
    <div className="absolute top-0 left-0 bg-accent text-black px-4 py-1.5 flex items-center gap-2 z-20 border-b border-r border-black">
        <div className="w-2 h-2 rounded-full bg-black animate-pulse"></div>
        <span className="text-[10px] font-black uppercase tracking-widest font-code tracking-[0.3em]">REACTOR SYSTEM ONLINE / ACTIVE_NODE</span>
    </div>

    <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pt-12">
        <div className="flex-1 text-left space-y-4">
            <h2 className="text-4xl sm:text-7xl md:text-9xl font-black text-white font-headline uppercase tracking-tighter leading-[0.85] mb-2 break-words">
                <span className="block transition-colors">NÚCLEO</span>
                <span className="block text-accent transition-colors">REACTOR</span>
            </h2>
            <div className="flex items-start gap-4">
                <div className="w-2 bg-accent min-h-[40px] flex-shrink-0" />
                <div>
                    <p className="font-code text-sm font-black text-accent tracking-[0.4em] uppercase mb-2">
                        [ SISTEMA_DE_ACTIVACIÓN_CREATIVA_CON_IA ]
                    </p>
                    <p className="font-code text-xs md:text-sm text-neutral-400 max-w-2xl leading-relaxed uppercase">
                        "NÚCLEO REACTOR" Laboratorio digital de creación y pensamiento que utiliza la IA como un colaborador creativo. Un workspace para experimentar, prototipar y publicar proyectos que exploran las nuevas fronteras del arte, la cultura y la tecnología.
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-3 group/btn">
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] font-code text-white">INGRESAR AL LABORATORIO DIGITAL</span>
                    <div className="w-10 h-10 rounded-none bg-accent text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-all border-2 border-black">
                        <ArrowRight className="size-5" />
                    </div>
                </div>
            </div>
        </div>
        <div className="w-24 md:w-[220px] flex-shrink-0 self-end md:self-auto text-accent opacity-60 group-hover:opacity-100 transition-opacity transform group-hover:rotate-6 duration-700">
            <Flame className="w-full h-auto" strokeWidth={0.5} />
        </div>
    </div>
  </motion.a>
);

const LabBanner = ({ t }: { t: any }) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="group relative w-full mb-8 overflow-hidden rounded-none border-2 border-black bg-accent flex flex-col md:flex-row items-center p-6 md:px-10 md:py-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
    >
      <div className="absolute top-0 left-0 bg-black text-white px-3 py-1 flex items-center gap-2 z-20 border-b border-r border-black">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
          <span className="text-[8px] font-black uppercase tracking-[0.3em] font-code">LABORATORY SYSTEM ONLINE</span>
      </div>

      <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center gap-8 pt-10">
          <div className="flex-1 text-left space-y-3">
              <div>
                  <h2 className="text-3xl sm:text-6xl md:text-8xl font-black text-black font-headline uppercase tracking-tighter leading-none break-words">
                      IA / CREATIVA
                  </h2>
                  <p className="text-black/60 font-code text-[10px] md:text-xs font-black tracking-[0.4em] uppercase mt-1">
                      INVESTIGACIÓN-CREACIÓN
                  </p>
              </div>
              
              <div className="flex items-start gap-3">
                  <div className="w-1.5 bg-black h-8 flex-shrink-0" />
                  <p className="font-code text-[10px] md:text-xs text-black/80 max-w-2xl leading-relaxed uppercase">
                      Un laboratorio de inmersión técnica que integra la IA como extensión cognitiva para la creación contemporánea.
                  </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                  <SpecItemMini icon={Clock} label="Horas" value="16 h" />
                  <SpecItemMini icon={GitBranch} label="Tipo" value="Híbrido" />
                  <SpecItemMini icon={Microscope} label="Carácter" value="I-C" />
              </div>
          </div>
          
          <div className="flex items-center pt-4 md:pt-0">
              <a href="https://wa.me/573006101221" target="_blank" rel="noopener noreferrer" className="block w-full max-w-[180px] md:max-w-[280px] group/cta">
                  <div className="bg-black text-white p-4 font-black uppercase italic tracking-widest text-center border-2 border-black shadow-[4px_4px_0_0_rgba(255,255,255,0.3)] group-hover/cta:bg-white group-hover/cta:text-black transition-all">
                    CONTACTAR_CORE_
                  </div>
              </a>
          </div>
      </div>
    </motion.div>
  );
};

export function WorkshopsView() {
  const { t } = useTranslation();
  const detailsKey = 'workshops_details.ia';

  const objectives = t(`${detailsKey}.section_3_obj_specific_list`) || [];
  const specs = t(`${detailsKey}.section_11_list`) || [];
  const awards = t(`${detailsKey}.section_10_list`) || [];

  return (
    <div className="px-4 md:px-12 pt-32 md:pt-40 pb-32 max-w-[1600px] mx-auto animate-fade-in perspective-1200">
        
        <SpatialSection className="mb-10 md:mb-12">
          <div className="flex items-baseline gap-3 mb-2">
            <div className="w-8 md:w-10 h-1 bg-black" />
            <span className="font-code text-[9px] md:text-xs font-black uppercase tracking-[0.4em] text-neutral-400">Proposals_v2.0</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-foreground tracking-tighter font-headline uppercase leading-[0.85] break-words">
            Laboratorios
          </h1>
          <p className="text-base md:text-xl text-muted-foreground font-light max-w-2xl mt-4 md:mt-6">
            Propuestas de formación avanzada y experimentación técnica para la creación contemporánea.
          </p>
        </SpatialSection>

        <SpatialSection>
          <ReactorBanner />
        </SpatialSection>

        <div className="bg-muted/5 rounded-none p-4 md:p-8 border border-border/50 border-dashed">
          <SpatialSection>
            <LabBanner t={t} />
          </SpatialSection>

          <SpatialSection className="mb-20 md:mb-32">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
                  <div className="lg:col-span-4 flex h-full">
                      <div className="p-6 md:p-8 bg-primary text-white rounded-none shadow-xl relative overflow-hidden group flex flex-col justify-center w-full">
                        <div className="relative z-10">
                          <h4 className="font-code text-[8px] tracking-[0.4em] mb-4 text-white/50 uppercase">
                            {t(`${detailsKey}.section_3_obj_general_title`)}
                          </h4>
                          <p className="text-lg md:text-2xl font-bold font-headline leading-tight italic tracking-tight">
                            "{t(`${detailsKey}.section_3_obj_general_text`)}"
                          </p>
                        </div>
                      </div>
                  </div>

                  <div className="lg:col-span-8 flex flex-col justify-center pt-8 lg:pt-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-8">
                          {Array.isArray(objectives) && objectives.slice(0, 4).map((obj: string, i: number) => (
                            <div key={i} className="flex items-start gap-4 group">
                              <div className="text-6xl md:text-8xl font-black text-primary/5 group-hover:text-primary/10 transition-all duration-500 font-headline flex-shrink-0 leading-none select-none">
                                {String(i+1).padStart(2, '0')}
                              </div>
                              <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed pt-2 group-hover:text-foreground transition-colors uppercase font-bold">
                                {obj}
                              </p>
                            </div>
                          ))}
                      </div>
                  </div>
              </div>
          </SpatialSection>

          <SpatialSection className="mb-20 md:mb-32 px-2 md:px-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6 mb-10 md:mb-12 border-b-2 border-black pb-6 md:pb-8">
                <div className="overflow-hidden">
                  <span className="text-primary font-code font-black text-[9px] md:text-xs uppercase tracking-[0.4em] mb-2 block">Process_Mapping</span>
                  <h2 className="text-3xl md:text-6xl font-black font-headline uppercase tracking-tighter leading-none break-words">
                    {t(`${detailsKey}.section_7_title`)}
                  </h2>
                </div>
                <div className="flex items-center gap-2 md:gap-3 bg-black text-white px-3 md:px-4 py-1.5 md:py-2 rounded-none border border-black font-code text-[8px] md:text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                  <Zap className="text-accent size-3 md:size-4 animate-pulse" />
                  <span>4 Etapas de Producción</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {[1, 2, 3, 4].map(i => (
                      <SessionCard
                          key={i}
                          number={`0${i}`}
                          title={t(`${detailsKey}.section_7_session_${i}_title`)}
                          contents={t(`${detailsKey}.section_7_session_${i}_contents_list`) || []}
                          results={t(`${detailsKey}.section_7_session_${i}_results_list`) || []}
                      />
                  ))}
              </div>
          </SpatialSection>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start px-2 md:px-4">
              <div className="lg:col-span-7">
                  <SpatialSection>
                      <h3 className="text-2xl md:text-4xl font-black font-headline mb-6 md:mb-10 flex items-center gap-3 uppercase tracking-tighter break-words">
                        <Layers className="text-primary size-6 md:size-8 flex-shrink-0" /> {t(`${detailsKey}.section_6_title`)}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                        {[
                          { icon: Zap, title: "Activación", desc: "Introducción conceptual y mapeo de bloqueos creativos para iniciar el flujo." },
                          { icon: Presentation, title: "Demos Técnicas", desc: "Demostraciones en vivo de uso de herramientas IA en imagen y sonido." },
                          { icon: UserCheck, title: "Práctica Guiada", desc: "Ejercicios intensivos de producción aplicada en tiempo real." },
                          { icon: Users, title: "Socialización", desc: "Cierre colectivo con feedback experto sobre los prototipos logrados." }
                        ].map((step, idx) => (
                          <div key={idx} className="relative pl-6 md:pl-8 border-l-[2px] border-primary/20 hover:border-primary transition-all group">
                            <div className="absolute top-0 left-[-10px] md:left-[-12px] w-4 h-4 md:w-5 md:h-5 rounded-none bg-white border-2 border-primary flex items-center justify-center group-hover:bg-primary transition-all">
                              <step.icon className="text-primary group-hover:text-white transition-colors" size={14} />
                            </div>
                            <h4 className="font-black text-base md:text-lg text-foreground mb-1 md:mb-2 uppercase tracking-tight font-headline">{step.title}</h4>
                            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-10 md:mt-16 p-6 md:p-10 bg-white rounded-none border-2 border-dashed border-black">
                        <h4 className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4 md:mb-6 font-code">ESPECIFICACIONES TÉCNICAS</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                          {Array.isArray(specs) && specs.map((item: string, i: number) => (
                            <li key={i} className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold text-foreground/70 uppercase font-headline">
                              <div className="w-1.5 h-1.5 bg-accent rounded-none shadow-[0_0_6px_rgba(248,195,0,0.5)] flex-shrink-0" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                  </SpatialSection>
              </div>

              <div className="lg:col-span-5 space-y-6">
                  <SpatialSection>
                      <div className="bg-black text-white p-6 md:p-10 rounded-none shadow-xl relative overflow-hidden group border-2 border-black">
                          <h4 className="text-xl md:text-2xl font-black font-headline mb-6 md:mb-8 flex items-center gap-3 uppercase tracking-tighter">
                            <Award className="text-accent size-5 md:size-6 flex-shrink-0"/> {t(`${detailsKey}.section_10_title`)}
                          </h4>
                          <ul className="space-y-4 md:space-y-6">
                            {Array.isArray(awards) && awards.map((item: string, index: number) => (
                              <li key={index} className="text-xs md:text-sm leading-relaxed border-l-2 border-accent/40 pl-4 md:pl-5 hover:border-accent transition-colors">
                                <p dangerouslySetInnerHTML={{ __html: item }} className="text-neutral-300 font-light" />
                              </li>
                            ))}
                          </ul>
                      </div>
                  </SpatialSection>

                  <SpatialSection>
                      <div className="bg-white border-2 border-black p-6 md:p-10 rounded-none shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center">
                          <div className="w-10 h-10 md:w-14 md:h-14 bg-primary/10 rounded-none flex items-center justify-center mx-auto mb-4 md:mb-6 text-primary border border-primary/20">
                              <Wand2 size={40} />
                          </div>
                          <h3 className="text-xl md:text-2xl font-black font-headline mb-3 text-black uppercase tracking-tighter">¿Propuesta personalizada?</h3>
                          <p className="text-neutral-600 mb-6 md:mb-8 text-sm md:text-base font-light leading-relaxed">Adaptamos este programa para instituciones educativas, museos y departamentos creativos.</p>
                          <a href="https://wa.me/573006101221" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-primary text-white px-6 md:px-8 py-3.5 md:py-4 font-black uppercase tracking-widest rounded-none hover:bg-black hover:shadow-xl transition-all w-full shadow-md shadow-primary/10 transform hover:-translate-y-0.5 text-xs md:text-sm">
                              <MessageCircle className="size-5"/> {t(`${detailsKey}.contact_cta`)}
                          </a>
                      </div>
                  </SpatialSection>
              </div>
          </div>
        </div>
    </div>
  );
}

function SessionCard({ number, title, contents, results }: { number: string, title: string, contents: string[], results: string[] }) {
    return (
        <div className="group relative bg-muted/5 p-5 rounded-none border border-border hover:border-primary/40 hover:bg-white transition-all duration-300 flex flex-col h-full overflow-hidden hover:shadow-lg">
            <div className="absolute -top-2 -right-2 p-2 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
              <span className="text-6xl font-black font-headline leading-none text-primary">{number}</span>
            </div>
            <div className="relative z-10 h-full flex flex-col">
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-4 h-[2px] bg-primary"></span>
                        <span className="text-primary font-code text-[9px] font-black tracking-[0.3em] uppercase">ETAPA {number}</span>
                    </div>
                    <h4 className="text-xl font-black font-headline text-foreground leading-tight uppercase tracking-tighter break-words">{title}</h4>
                </div>
                <div className="space-y-4 flex-grow">
                    <div>
                        <h5 className="font-black text-foreground/40 mb-3 text-[8px] uppercase tracking-[0.2em] font-code flex items-center gap-2">
                            <Layers size={12} /> NÚCLEOS TEMÁTICOS
                        </h5>
                        <ul className="space-y-2">
                            {Array.isArray(contents) && contents.map((item, index) => (
                              <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                                <ChevronRight className="text-accent mt-0.5 size-3 flex-shrink-0" />
                                <span className="leading-snug">{item}</span>
                              </li>
                            ))}
                        </ul>
                    </div>
                     <div className="pt-4 border-t border-border">
                        <h5 className="font-black text-foreground/40 mb-3 text-[8px] uppercase tracking-[0.2em] font-code flex items-center gap-2">
                            <Sparkles size={12} /> ENTREGABLE
                        </h5>
                        <ul className="space-y-2">
                            {Array.isArray(results) && results.map((item, index) => (
                              <li key={index} className="flex items-start gap-2 text-xs text-primary font-bold italic">
                                <div className="w-4 h-4 rounded-none bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <CheckCircle className="size-2.5"/>
                                </div>
                                <span className="leading-snug">{item}</span>
                              </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
