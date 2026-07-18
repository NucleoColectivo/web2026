
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Palette, 
  Video, 
  PenTool, 
  Cpu, 
  GraduationCap, 
  Megaphone, 
  X,
  Zap,
  Fingerprint,
  Terminal,
  Activity,
  Beaker,
  User,
  CircuitBoard,
  UserCheck,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/app-context';

export function SolutionsView() {
  const { playSound } = useApp();
  const [selectedService, setSelectedService] = useState<any>(null);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

  const team = [
    {
      id: "NC_01",
      name: "Manuel Palacio",
      role: "Dirección Creativa / Dev",
      bio: "Explorador de las fronteras entre naturaleza, código y percepción.",
      img: "https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/imagen/Manuel.png"
    },
    {
      id: "NC_02",
      name: "Carlos Andrés Londoño",
      role: "Producción Audiovisual",
      bio: "Investigador transmedia de la memoria y tecnología visual.",
      img: "https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/carlos_londor_/carlos.jpeg"
    },
    {
      id: "NC_03",
      name: "María Cecilia Castaño",
      role: "Comunicadora / Bióloga / Gestión",
      bio: "Bióloga articulando diálogos entre ciencia y arte.",
      img: "https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/MARIA%20CECILIA/maria5.png"
    }
  ];

  const services = [
    {
      id: 1,
      title: "Arte, Experiencias e Instalaciones",
      icon: <Palette />,
      tag: "Inmersivo",
      description: "DISEÑAMOS Y DESARROLLAMOS ESPACIOS DONDE LA TECNOLOGÍA SE VUELVE SENSIBLE Y PARTICIPATIVA.",
      mediators: ["NC_01", "NC_02"],
      items: [
        "Instalaciones inmersivas",
        "Experiencias interactivas con inteligencia artificial",
        "Videoarte y performance audiovisual en tiempo real",
        "Proyectos de co-creación artística",
        "Integración de imagen, sonido y tecnología",
        "Programación creativa aplicada al arte",
        "Diseño de agentes conversacionales para experiencias culturales"
      ]
    },
    {
      id: 2,
      title: "Producción Audiovisual",
      icon: <Video />,
      tag: "Narrativa",
      description: "RELATOS VISUALES DE ALTA FIDELIDAD PARA EL ENTORNO CONTEMPORÁNEO.",
      mediators: ["NC_02"],
      items: [
        "Dirección y realización audiovisual",
        "Producción de documentales y series web",
        "Guion y desarrollo narrativo",
        "Dirección de fotografía",
        "Edición profesional de video",
        "Animación 2D y motion graphics",
        "Postproducción integral",
        "Filmación y cobertura audiovisual de eventos"
      ]
    },
    {
      id: 3,
      title: "Diseño Gráfico e Ilustración",
      icon: <PenTool />,
      tag: "Visual",
      description: "CONSTRUCCIÓN DE IDENTIDADES MEMORABLES MEDIANTE DIBUJO ANÁLOGO Y DIGITAL.",
      mediators: ["NC_01"],
      items: [
        "Diseño gráfico publicitario",
        "Identidad visual e imagen corporativa",
        "Dirección de arte",
        "Diagramación editorial",
        "Artes finales para impresión",
        "Ilustración digital y análoga",
        "Diseño de personajes",
        "Storyboard y desarrollo visual"
      ]
    },
    {
      id: 4,
      title: "Desarrollo Digital e IA",
      icon: <Cpu />,
      tag: "Tecnología",
      description: "SOFTWARE Y AGENTES INTELIGENTES APLICADOS AL SECTOR CULTURAL Y CREATIVO.",
      mediators: ["NC_01"],
      items: [
        "Desarrollo de landing pages funcionales",
        "Formularios dinámicos para recolección de datos",
        "Juegos educativos digitales",
        "Desarrollo de chatbots inteligentes",
        "Integración de IA para generación de imágenes",
        "Síntesis de voz y automatización creativa",
        "Desarrollo de plataformas digitales colaborativas"
      ]
    },
    {
      id: 5,
      title: "Formación y Procesos Creativos",
      icon: <GraduationCap />,
      tag: "Pedagogía",
      description: "INTERCAMBIO DE SABERES TÉCNICOS Y CREATIVOS EN LABORATORIOS INTERDISCIPLINARES.",
      mediators: ["NC_01", "NC_02", "NC_03"],
      items: [
        "Talleres de co-creación",
        "Laboratorios de arte y tecnología",
        "Procesos pedagógicos interdisciplinarios",
        "Formación en herramientas digitales y creativas",
        "Acompañamiento en desarrollo de proyectos culturales"
      ]
    },
    {
      id: 6,
      title: "Comunicación y Gestión Cultural",
      icon: <Megaphone />,
      tag: "Estrategia",
      description: "GESTIÓN INTEGRAL DE PROYECTOS Y PRODUCCIÓN DE CONTENIDOS CON IMPACTO.",
      mediators: ["NC_03"],
      items: [
        "Estrategia y redacción de contenidos",
        "Producción de contenidos culturales y educativos",
        "Coordinación y producción de eventos",
        "Gestión de proyectos culturales y sociales",
        "Fotografía de eventos",
        "Fotografía de naturaleza"
      ]
    }
  ];

  return (
    <div className="bg-white text-black font-body animate-fade-in overflow-x-hidden min-h-screen">
      
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none -z-10" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-sm" 
              onClick={() => setSelectedService(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }} 
              animate={{ scale: 1, y: 0, opacity: 1 }} 
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative bg-white border-2 border-black w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] z-10"
            >
              <div className="md:w-5/12 bg-black text-white p-8 md:p-10 flex flex-col justify-between border-b-2 md:border-b-0 md:border-r-2 border-black">
                <div className="max-w-full">
                  <div className="bg-accent text-black px-3 py-1 text-[10px] font-black uppercase tracking-widest inline-block mb-6 italic border border-black shadow-[2px_2px_0_0_rgba(255,255,255,0.1)]">
                    MOD_0{selectedService.id}
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight leading-[0.9] italic font-headline break-words">
                    {selectedService.title}
                  </h2>
                </div>
                <div className="space-y-6">
                  <div className="border-t border-white/10 pt-6">
                    <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 block mb-4">MEDIACIÓN_CORE</span>
                    <div className="space-y-4">
                      {selectedService.mediators.map((medId: string) => {
                        const med = team.find(t => t.id === medId);
                        if (!med) return null;
                        return (
                          <div key={medId} className="flex items-center gap-3 group">
                            <div className="w-10 h-10 border border-white/20 overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all">
                              <img src={med.img} alt={med.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-[10px] font-black uppercase tracking-tighter truncate">{med.name}</p>
                              <p className="text-[8px] font-bold text-accent uppercase italic truncate opacity-60">{med.role}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <button onClick={() => { playSound('close'); setSelectedService(null); }} className="p-2.5 bg-accent text-black w-fit hover:bg-white transition-colors border-2 border-black">
                    <X size={20} strokeWidth={4} />
                  </button>
                </div>
              </div>

              <div className="md:w-7/12 p-8 md:p-12 bg-white overflow-y-auto custom-scrollbar">
                <header className="mb-10 font-code">
                  <div className="flex items-center gap-2 mb-4">
                    <UserCheck className="text-accent size-4" strokeWidth={3} />
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-300">TECHNICAL_REPORTS_</span>
                  </div>
                  <p className="text-xl md:text-2xl font-bold leading-tight text-black border-l-4 border-accent pl-6 italic uppercase">
                    {selectedService.description}
                  </p>
                </header>

                <div className="space-y-5">
                  {selectedService.items.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-4 group">
                      <div className="h-2 w-2 bg-accent shrink-0 mt-1.5 shadow-[2px_2px_0_0_rgba(0,0,0,1)]"></div>
                      <span className="text-sm md:text-base font-bold text-zinc-800 border-b border-zinc-100 pb-3 w-full group-hover:border-black transition-colors italic uppercase">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-16 pt-8 border-t-2 border-black flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-2 font-code text-[9px] text-zinc-400">
                    <Activity className="size-3 animate-pulse" />
                    <span>SYSTEM_READY_FOR_DEPLOYMENT</span>
                  </div>
                  <button onClick={() => setSelectedService(null)} className="bg-black text-white px-8 py-4 font-black uppercase text-[11px] tracking-widest hover:bg-accent hover:text-black transition-all border-2 border-black italic font-code w-full sm:w-auto shadow-[4px_4px_0_0_rgba(248,195,0,1)] hover:shadow-none">
                    CERRAR_EXPEDIENTE_
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section className="relative min-h-[80vh] flex flex-col justify-center px-4 md:px-12 bg-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto w-full">
          <header className="flex items-center gap-3 mb-6 font-code">
            <span className="text-zinc-300 text-xs font-bold">{'>_'}</span>
            <span className="text-[9px] font-black tracking-widest text-zinc-300 uppercase italic">NC_SERVICES_V2</span>
          </header>
          
          <div className="mb-12">
             <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black italic uppercase tracking-tighter leading-[0.85] text-black font-headline">
                SOLUCIONES_
             </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-black bg-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            {services.map((service) => (
              <div 
                key={service.id}
                onClick={() => { playSound('click'); setSelectedService(service); }}
                className="group p-8 md:p-10 border border-black transition-all cursor-pointer flex flex-col justify-between min-h-[400px] md:min-h-[480px] relative overflow-hidden bg-white hover:bg-accent"
              >
                <div>
                  <div className="flex justify-between items-start mb-10 font-code">
                    <div className="bg-black text-white px-4 py-1.5 text-[11px] font-black uppercase italic border border-black tracking-widest shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]">
                      {service.tag}
                    </div>
                    <Zap size={28} className="text-black/10 group-hover:text-black transition-colors" />
                  </div>
                  <div className="mb-8 text-black group-hover:scale-110 transition-transform origin-left">
                    {React.cloneElement(service.icon as React.ReactElement, { strokeWidth: 3, size: 48 })}
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 uppercase italic tracking-tighter leading-[0.9] font-headline group-hover:translate-x-1 transition-transform break-words">
                    {service.title}
                  </h3>
                  <p className="text-zinc-500 text-[11px] font-bold leading-relaxed italic uppercase group-hover:text-black/70 font-code max-w-[280px]">
                    {service.description}
                  </p>
                </div>
                <div className="flex justify-between items-end pt-8 font-code border-t border-black/5">
                  <span className="text-6xl md:text-7xl font-black opacity-[0.05] group-hover:opacity-10 italic leading-none">{String(service.id).padStart(2, '0')}</span>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-black border-b-2 border-transparent group-hover:border-black transition-all pb-1">
                    <Fingerprint size={24} strokeWidth={2.5} /> LOAD_DATA
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-black py-5 border-y-2 border-black overflow-hidden select-none font-code">
        <div className="flex whitespace-nowrap animate-ticker">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex items-center gap-10 md:gap-16 px-4 md:px-8 text-zinc-100">
              <span className="font-black text-xs uppercase tracking-tighter italic">ARTE_IA</span>
              <Activity className="text-accent w-4 h-4 opacity-60" />
              <span className="text-white font-black text-xs uppercase italic opacity-40">INSTALACIONES_</span>
              <Beaker className="text-white w-4 h-4 opacity-40" />
              <span className="text-accent font-black text-xs uppercase italic">GESTIÓN_</span>
              <Megaphone className="text-accent w-4 h-4 opacity-60" />
            </div>
          ))}
        </div>
      </div>

      <section id="adn" className="py-24 px-4 md:px-12 bg-white border-b-8 border-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10 font-code">
            <h3 className="text-[8px] font-black uppercase tracking-widest text-zinc-300 mb-6 italic">PROTOCOL_DNA</h3>
            <div className="mb-10">
              <p className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.9] text-black italic font-headline">
                SISTEMAS <br/>
                <span className="text-accent text-3xl sm:text-5xl lg:text-6xl">ORGANIC_</span><br/>
                DIGITALES
              </p>
            </div>
            <div className="space-y-10">
              {[
                { title: "Escucha Territorial", desc: "Mapeo de contextos biológicos y sociales para informar el diseño tecnológico." },
                { title: "Iteración Acelerada", desc: "Prototipado rápido mediante agentes de IA y visualización." },
                { title: "Despliegue Core", desc: "Integración final en sistemas físicos, inmersivos y plataformas." }
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <span className="text-4xl font-black text-black/5 group-hover:text-accent italic leading-none">0{i+1}</span>
                  <div className="pt-1">
                    <span className="text-lg font-black uppercase italic block mb-2 group-hover:translate-x-1 transition-transform font-headline">{step.title}</span>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase italic leading-relaxed tracking-wider max-w-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-black p-8 md:p-12 border-2 border-black shadow-[12px_12px_0px_0px_rgba(248,195,0,0.15)] text-white relative overflow-hidden group h-full flex flex-col justify-center">
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:rotate-6 transition-transform">
              <CircuitBoard size={300} />
            </div>
            <Terminal className="text-accent mb-8 opacity-60" size={32} />
            <p className="text-2xl md:text-4xl font-black leading-tight mb-10 italic uppercase tracking-tighter text-zinc-100 font-headline">
              "ARTICULAMOS LA COMPLEJIDAD DEL CÓDIGO CON LA FRAGILIDAD DE LO HUMANO."
            </p>
            <div className="h-1 w-24 bg-accent opacity-60"></div>
          </div>
        </div>
      </section>

      <section id="equipo" className="py-24 px-4 md:px-12 bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto">
          <header className="mb-16 font-code">
            <div className="flex items-center gap-3 mb-4 text-accent opacity-60">
               <User size={18} />
               <span className="text-[9px] font-black tracking-widest uppercase italic">NC_CORE_TEAM</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight italic text-white font-headline">EQUIPO_</h3>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="group flex flex-col bg-white/5 border border-white/10 p-6 hover:bg-white transition-all duration-500">
                <div className="aspect-square border border-white/10 mb-6 overflow-hidden grayscale group-hover:grayscale-0 transition-all group-hover:border-black">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700" />
                </div>
                <div className="flex flex-col text-white group-hover:text-black">
                  <span className="text-[7px] font-black uppercase tracking-widest text-accent group-hover:text-zinc-400 mb-3 italic font-code">ID_0{idx+1}</span>
                  <h4 className="text-xl font-black uppercase italic leading-none mb-3 group-hover:translate-x-1 transition-transform font-headline">{member.name}</h4>
                  <div className="h-[2px] w-8 bg-accent/30 group-hover:bg-black mb-4 transition-all group-hover:w-full"></div>
                  <p className="text-[9px] font-black uppercase tracking-widest mb-3 opacity-60 italic font-code">{member.role}</p>
                  <p className="text-[11px] font-bold leading-relaxed italic opacity-40 group-hover:opacity-80 uppercase tracking-tight">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          display: flex;
          width: fit-content;
          animation: ticker 60s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8f8f8;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #000;
        }
      `}</style>
    </div>
  );
}
