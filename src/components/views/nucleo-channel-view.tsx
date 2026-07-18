'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/app-context';
import { DIGITAL_CHANNEL_DATA } from '@/lib/digital-channel-data';
import { Tv, SlidersHorizontal, Play, Clock, Eye, Calendar, Star, ArrowRight, X, Maximize2, Archive, LayoutTemplate, Target, Users, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VideoPlayerModal } from '@/components/modals/video-player-modal';
import { useTranslation } from '@/context/language-context';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

type Video = {
  id: string;
  titulo: string;
  canal: string;
  url: string;
  descripcion: string;
  duracion?: string;
  visualizaciones?: number;
  fecha_publicacion?: string;
  conceptos_clave?: string[];
  razon_destacado?: string;
};

// Component to wrap sections with an elegant spatial 3D effect
function SpatialSection({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 60, damping: 25, mass: 0.5, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const y = useTransform(smoothProgress, [0, 0.5, 1], [80, 0, -80]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1, 0.98]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [5, 0, -5]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        y, 
        scale, 
        opacity,
        rotateX,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const ChannelInfoBanner = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sections = t('channel_info_banner.col2_sections') || [];
  const functions = t('channel_info_banner.col3_functions_list') || [];
  const tags = t('channel_info_banner.col1_tags') || [];

  return (
    <div className="w-full flex items-center justify-center p-8 font-sans bg-transparent">
      <button
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center justify-between w-full max-w-2xl h-24 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-zinc-800 hover:border-accent/50 rounded-2xl transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(var(--accent)/0.15)] cursor-pointer"
      >
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-700 ease-out" style={{ width: isHovered ? '100%' : '0%' }} />

        <div className="relative z-10 flex items-center w-full px-6 md:px-8">
          <div className={cn(
            'flex items-center justify-center w-14 h-14 rounded-xl border transition-all duration-500',
            isHovered ? 'bg-accent text-black border-yellow-400 shadow-[0_0_15px_rgba(var(--accent),0.6)]' : 'bg-zinc-900 text-accent border-zinc-700'
          )}>
             <Tv className={`w-7 h-7 ${isHovered ? 'animate-pulse' : ''}`} strokeWidth={2} />
          </div>
          <div className="flex-1 ml-6 text-left">
            <div className="flex items-baseline gap-3 mb-1">
               <span className="text-zinc-500 text-[10px] tracking-[0.2em] font-mono uppercase">
                 {t('channel_info_banner.system_info')}
               </span>
               <span className={`w-2 h-2 rounded-full ${isHovered ? 'bg-green-500 animate-ping' : 'bg-zinc-700'}`} />
            </div>
            <h3 className="text-white text-lg md:text-xl font-bold tracking-tight group-hover:text-yellow-300 transition-colors">
              {t('channel_info_banner.title')}
            </h3>
             <p className="text-zinc-500 text-xs truncate mt-0.5">
               {t('channel_info_banner.subtitle')}
             </p>
          </div>
          <div className="hidden md:flex items-center gap-2 pl-6 border-l border-zinc-800 ml-4">
             <span className="text-[10px] font-bold text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase tracking-widest">
               {t('channel_info_banner.cta')}
             </span>
             <div className="p-2.5 bg-zinc-900 rounded-full group-hover:bg-accent group-hover:text-black transition-colors duration-300">
               <Maximize2 size={16} />
             </div>
          </div>
        </div>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-7xl max-h-[90vh] p-0 flex flex-col overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.9)]">
          <DialogTitle className="sr-only">{t('channel_info_banner.title')}</DialogTitle>
          <DialogDescription className="sr-only">{t('channel_info_banner.subtitle')}</DialogDescription>
          
          <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md shrink-0">
             <div className="flex items-center gap-3">
               <div className="w-3 h-3 bg-accent rounded-full shadow-[0_0_10px_rgba(var(--accent),0.8)] animate-pulse" />
               <h2 className="text-white font-bold tracking-tight uppercase" dangerouslySetInnerHTML={{ __html: t('channel_info_banner.modal_header_title') }}/>
               <span className="hidden sm:inline-block text-zinc-600 font-mono text-xs tracking-widest uppercase border-l border-zinc-700 pl-3 ml-3">
                 {t('channel_info_banner.modal_header_subtitle')}
               </span>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800 h-full">
              <div className="p-8 space-y-8 group hover:bg-zinc-900/20 transition-colors">
                 <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center text-accent shadow-lg group-hover:border-accent/30 transition-all duration-300"><Archive size={24} /></div>
                    <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-500 uppercase">Sec. 01</span>
                 </div>
                 <div>
                   <h4 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{t('channel_info_banner.col1_title')}</h4>
                   <p className="text-accent font-mono text-[10px] tracking-[0.2em] mb-4 uppercase">{t('channel_info_banner.col1_subtitle')}</p>
                   <p className="text-zinc-300 leading-relaxed text-sm mb-4" dangerouslySetInnerHTML={{ __html: t('channel_info_banner.col1_p1') }} />
                   <p className="text-zinc-400 leading-relaxed text-sm border-l-2 border-accent/20 pl-4" dangerouslySetInnerHTML={{ __html: t('channel_info_banner.col1_p2') }} />
                 </div>
                 <div className="space-y-3">
                    <h5 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{t('channel_info_banner.col1_section_title')}</h5>
                    <div className="flex flex-wrap gap-2">{Array.isArray(tags) && tags.map((tag: string) => (<span key={tag} className="px-3 py-1 bg-zinc-900/50 border border-zinc-800 rounded-full text-xs text-zinc-300">{tag}</span>))}</div>
                 </div>
              </div>
              <div className="p-8 space-y-8 group hover:bg-zinc-900/20 transition-colors bg-zinc-900/10">
                 <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center text-accent shadow-lg group-hover:border-accent/30 transition-all duration-300"><LayoutTemplate size={24} /></div>
                    <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-500 uppercase">Sec. 02</span>
                 </div>
                 <div>
                   <h4 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{t('channel_info_banner.col2_title')}</h4>
                   <p className="text-accent font-mono text-[10px] tracking-[0.2em] mb-4 uppercase">{t('channel_info_banner.col2_subtitle')}</p>
                   <div className="space-y-2.5">
                    {Array.isArray(sections) && sections.map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/60 transition-colors">
                           <div className="flex flex-col">
                             <span className="text-xs font-bold text-zinc-200 uppercase">{item.t}</span>
                             <span className="text-[10px] text-zinc-500 truncate">{item.sub}</span>
                           </div>
                        </div>
                      ))}
                   </div>
                 </div>
                 <div className="pt-2 text-center"><span className="inline-block px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold rounded uppercase tracking-wider border border-accent/20">{t('channel_info_banner.col2_footer')}</span></div>
              </div>
              <div className="p-8 space-y-8 group hover:bg-zinc-900/20 transition-colors relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
                 <div className="flex items-start justify-between relative z-10">
                    <div className="w-12 h-12 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center text-accent shadow-lg group-hover:border-accent/30 transition-all duration-300"><Target size={24} /></div>
                    <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-500 uppercase">Sec. 03</span>
                 </div>
                 <div className="relative z-10">
                   <h4 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{t('channel_info_banner.col3_title')}</h4>
                   <p className="text-accent font-mono text-[10px] tracking-[0.2em] mb-4 uppercase">{t('channel_info_banner.col3_subtitle')}</p>
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <h5 className="text-sm font-bold text-white flex items-center gap-2"><Users size={14} className="text-zinc-500" /> {t('channel_info_banner.col3_community_title')}</h5>
                         <p className="text-zinc-400 text-xs leading-relaxed">{t('channel_info_banner.col3_community_p')}</p>
                      </div>
                      <div className="space-y-2">
                         <h5 className="text-sm font-bold text-white flex items-center gap-2"><Zap size={14} className="text-zinc-500" /> {t('channel_info_banner.col3_functions_title')}</h5>
                         <ul className="grid grid-cols-1 gap-2">
                          {Array.isArray(functions) && functions.map((item: string, i: number) => (<li key={i} className="text-xs text-zinc-400 flex gap-2"><span className="text-accent">›</span> {item}</li>))}
                         </ul>
                      </div>
                   </div>
                 </div>
                 <div className="relative z-10 mt-auto pt-6 border-t border-zinc-800">
                    <p className="text-white text-sm font-medium italic text-center" dangerouslySetInnerHTML={{ __html: `${t('channel_info_banner.col3_quote_p1')}<br/><span class="text-accent">${t('channel_info_banner.col3_quote_p2')}</span>` }} />
                 </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-between px-6 py-3 bg-zinc-950 border-t border-zinc-800 text-[10px] text-zinc-600 font-mono uppercase tracking-wider shrink-0">
             <span>{t('channel_info_banner.modal_footer_id')}</span>
             <div className="flex gap-6">
               <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {t('channel_info_banner.modal_footer_status')}</span>
               <span>{t('channel_info_banner.modal_footer_location')}</span>
             </div>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #09090b; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #27272a; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #f59e0b; 
        }
      `}</style>
    </div>
  );
};


const VideoCard = ({ video, onVideoSelect }: { video: Video; onVideoSelect: (video: Video) => void }) => {
  const videoId = new URL(video.url).searchParams.get('v');
  if (!videoId) return null;

  return (
    <button
      onClick={() => onVideoSelect(video)}
      className="group text-left bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden hover:border-accent/70 transition-all duration-300 flex flex-col h-full shadow-lg"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
        <Image 
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
          alt={video.titulo} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-white/80 text-black rounded-full scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 backdrop-blur-sm">
          <Play size={24} fill="currentColor" />
        </div>
        {video.duracion && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-code backdrop-blur-sm">
            {video.duracion}
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-xs text-accent font-bold uppercase tracking-wider mb-2 font-code">{video.canal}</p>
        <h3 className="font-bold text-base text-white mb-3 group-hover:text-white transition-colors line-clamp-2 leading-tight font-headline">{video.titulo}</h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-400 mb-4 font-code">
          {video.visualizaciones !== undefined && <span><Eye size={12} className="inline mr-1.5 opacity-60"/> {new Intl.NumberFormat().format(video.visualizaciones)}</span>}
          {video.fecha_publicacion && <span><Calendar size={12} className="inline mr-1.5 opacity-60"/> {new Date(video.fecha_publicacion).toLocaleDateString('es-CO', { year: 'numeric', month: 'short' })}</span>}
        </div>
        <p className="text-sm text-neutral-400 line-clamp-3 flex-grow mb-4 font-light">{video.descripcion}</p>
        {video.conceptos_clave && (
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-neutral-800">
            {video.conceptos_clave.slice(0, 3).map(tag => <span key={tag} className="text-[10px] bg-neutral-800 border border-neutral-700/80 text-neutral-300 px-3 py-1 rounded-full">{tag}</span>)}
          </div>
        )}
      </div>
    </button>
  );
};

const FeaturedVideoCard = ({ video, onVideoSelect }: { video: Video; onVideoSelect: (video: Video) => void }) => {
    const videoId = new URL(video.url).searchParams.get('v');
    if (!videoId) return null;

    return (
        <button
            onClick={() => onVideoSelect(video)}
            className="group text-left bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden hover:border-accent/70 transition-all duration-300 flex flex-col h-full shadow-lg"
        >
            <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                <Image 
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
                  alt={video.titulo} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:opacity-60"></div>
                <div className="absolute top-2 left-2 flex items-center gap-1.5 text-xs text-black font-bold uppercase tracking-wider font-code bg-accent px-2 py-1 rounded">
                    <Star size={12} fill="currentColor" />
                    Contenido Destacado
                </div>
                 {video.duracion && (
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-code backdrop-blur-sm">
                    {video.duracion}
                  </div>
                )}
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-white mb-1 group-hover:text-white transition-colors font-headline">{video.titulo}</h3>
                <p className="text-sm text-neutral-400 mb-4 font-light">{video.canal}</p>
                <p className="text-neutral-400 text-sm line-clamp-4 flex-grow mb-6 font-light">{video.razon_destacado || video.descripcion}</p>
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-neutral-800">
                    {video.conceptos_clave?.map(tag => <span key={tag} className="text-[10px] bg-neutral-800 border border-neutral-700/80 text-neutral-300 px-3 py-1 rounded-full">{tag}</span>)}
                </div>
            </div>
        </button>
    );
};


export function NucleoChannelView() {
  const { playSound } = useApp();
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const sections = Object.keys(DIGITAL_CHANNEL_DATA.secciones);
  
  const newReleaseVideo = DIGITAL_CHANNEL_DATA.videos_destacados[0];
  const otherFeaturedVideos = DIGITAL_CHANNEL_DATA.videos_destacados.slice(1);

  const featuredVideoIds = useMemo(() => new Set(DIGITAL_CHANNEL_DATA.videos_destacados.map(v => v.id)), []);
  
  const videos: Video[] = useMemo(() => {
    const allSectionVideos = sections.flatMap(sec => (DIGITAL_CHANNEL_DATA.secciones as any)[sec].videos);
    if (activeSection === 'all') {
      return allSectionVideos.filter(video => !featuredVideoIds.has(video.id));
    }
    return (DIGITAL_CHANNEL_DATA.secciones as any)[activeSection]?.videos || [];
  }, [activeSection, sections, featuredVideoIds]);
  
  const handleVideoSelect = (video: Video) => {
    playSound('click');
    setSelectedVideo(video);
  }

  const newReleaseVideoId = new URL(newReleaseVideo.url).searchParams.get('v');

  return (
    <>
      <div className="min-h-screen bg-neutral-950 text-white font-body relative overflow-hidden perspective-[1200px]">
        <header className="fixed top-0 left-0 right-0 z-50 p-4 md:px-12 md:py-5 flex justify-between items-center bg-neutral-950/80 backdrop-blur-lg border-b border-white/10">
          <div className="flex items-center gap-3 md:gap-4">
            <Tv size={20} className="md:size-5 text-accent"/>
            <h1 className="text-sm md:text-base font-bold font-headline uppercase tracking-widest text-neutral-200">NÚCLEO / CHANNEL</h1>
          </div>
        </header>

        <main className="pt-48 pb-16 px-4 md:px-12 max-w-[1800px] mx-auto relative z-10">

          <SpatialSection className="text-center mb-12 md:mb-16">
              <div className="flex justify-center items-center gap-4 mb-4">
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                  <Image src="https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/imagen/ICONO%20LOGO%20AMARILLO.png" alt="Núcleo Colectivo Logo" fill className="object-contain" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-headline tracking-tighter text-white">
                  <span className="text-neutral-500">NÚCLEO/</span>CHANNEL
                </h1>
              </div>
              <p className="text-base md:text-lg text-neutral-200 mt-2 font-light">{t('channel.hero_subtitle')}</p>
              <p className="text-neutral-300 max-w-3xl mx-auto mt-6 font-light">{t('channel.headline')}</p>
              <div className="mt-8 bg-neutral-800 px-4 py-2 rounded-full text-xs font-code inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_hsl(var(--accent))]"></span>
                {t('channel.status_line')}
              </div>
          </SpatialSection>
          
          <SpatialSection>
            <ChannelInfoBanner />
          </SpatialSection>

          {newReleaseVideo && newReleaseVideoId && (
            <SpatialSection className="mb-12 md:mb-16">
              <div className="relative aspect-video md:aspect-[2.4/1] rounded-lg overflow-hidden group bg-neutral-900">
                <Image
                  src={`https://img.youtube.com/vi/${newReleaseVideoId}/maxresdefault.jpg`}
                  alt={newReleaseVideo.titulo}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-3/5 lg:w-1/2">
                   <div className="mb-4">
                      <span className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded">
                        Nuevo Lanzamiento
                      </span>
                    </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-3 font-headline leading-tight">{newReleaseVideo.titulo}</h2>
                  <p className="text-neutral-300 text-sm md:text-base line-clamp-3 mb-6">{newReleaseVideo.descripcion}</p>
                  <button onClick={() => handleVideoSelect(newReleaseVideo)} className="bg-accent text-accent-foreground px-8 py-3 font-bold rounded-lg hover:bg-yellow-400 transition-colors flex items-center gap-2 group/button">
                    Ver Ahora <ArrowRight size={20} className="group-hover/button:translate-x-1 transition-transform"/>
                  </button>
                </div>
              </div>
            </SpatialSection>
          )}
          
          <SpatialSection className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-headline flex items-center gap-4 text-white"><div className="w-1 h-8 bg-accent" /> Destacados</h2>
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full mt-8 -mx-2"
              >
                <CarouselContent className="px-2">
                  {otherFeaturedVideos.map((video) => (
                    <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/3 p-2">
                      <FeaturedVideoCard video={video} onVideoSelect={handleVideoSelect} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:inline-flex left-4 text-white bg-black/40 border-neutral-700 hover:bg-black/80 h-10 w-10" />
                <CarouselNext className="hidden md:inline-flex right-4 text-white bg-black/40 border-neutral-700 hover:bg-black/80 h-10 w-10" />
              </Carousel>
          </SpatialSection>

          <div className="sticky top-[69px] z-40 bg-neutral-950/80 backdrop-blur-lg py-4 mb-8 -mx-4 px-4 md:-mx-12 md:px-12 border-y border-white/10">
              <div className="max-w-[1800px] mx-auto flex items-center gap-2 overflow-x-auto pb-2">
                  <SlidersHorizontal size={16} className="text-neutral-500 flex-shrink-0"/>
                  <div className="w-px h-5 bg-neutral-700 mx-2"></div>
                  <button onClick={() => setActiveSection('all')} className={cn("px-4 py-1.5 text-sm font-bold rounded-full transition-all duration-300 whitespace-nowrap", activeSection === 'all' ? 'bg-accent text-accent-foreground' : 'bg-transparent text-neutral-400 hover:bg-neutral-800 hover:text-white')}>
                      Todos
                  </button>
                  {sections.map(sectionKey => (
                      <button key={sectionKey} onClick={() => setActiveSection(sectionKey)} className={cn("px-4 py-1.5 text-sm rounded-full transition-all duration-300 whitespace-nowrap capitalize font-medium", activeSection === sectionKey ? 'bg-accent text-accent-foreground font-bold' : 'bg-transparent text-neutral-400 hover:bg-neutral-800 hover:text-white')}>
                          {(DIGITAL_CHANNEL_DATA.secciones as any)[sectionKey].descripcion.split(',')[0]}
                      </button>
                  ))}
              </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-10">
              {videos.map((video) => (
                  <SpatialSection key={video.id} className="h-full">
                    <VideoCard video={video} onVideoSelect={handleVideoSelect} />
                  </SpatialSection>
              ))}
          </div>
        </main>
      </div>
      <VideoPlayerModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </>
  );
}