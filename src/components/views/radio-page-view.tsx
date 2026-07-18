
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useApp } from '@/context/app-context';
import { useTranslation } from '@/context/language-context';
import { STATIONS_DATA, PODCAST_DATA } from '@/lib/data';
import { GravityMeshVisualizer } from '@/components/visualizer/gravity-mesh-visualizer';
import { Play, Pause, Volume2, Calendar, SkipBack, SkipForward, Shuffle, VolumeX, Headphones, ChevronDown, Rewind, FastForward, Activity, Maximize2, Layers, Users, Zap, Cpu, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

function SpatialSection({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const InfoBanner = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const schedule = t('radio.info_banner.col2_schedule');
  const functions = t('radio.info_banner.col3_functions_list');
  const tags = t('radio.info_banner.col1_tags');

  return (
    <div className="w-full flex items-center justify-center p-4 md:p-8 font-sans bg-transparent">
      <button
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center justify-between w-full max-w-2xl h-24 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-zinc-800 hover:border-amber-500/50 rounded-2xl transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] cursor-pointer"
      >
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-[2px] bg-amber-500 transition-all duration-700 ease-out" style={{ width: isHovered ? '100%' : '0%' }} />

        <div className="relative z-10 flex items-center w-full px-4 md:px-8">
          <div className={cn(
            "flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl border transition-all duration-500 flex-shrink-0",
            isHovered ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.6)]' : 'bg-zinc-900 text-amber-500 border-zinc-700'
          )}>
            <Activity className={cn("size-6 md:size-7", isHovered ? 'animate-pulse' : '')} strokeWidth={2} />
          </div>
          <div className="flex-1 ml-4 md:ml-6 text-left overflow-hidden">
            <div className="flex items-baseline gap-2 md:gap-3 mb-1">
              <span className="text-zinc-500 text-[8px] md:text-[10px] tracking-[0.2em] font-mono uppercase whitespace-nowrap">{t('radio.info_banner.system_info')}</span>
              <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full flex-shrink-0 ${isHovered ? 'bg-green-500 animate-ping' : 'bg-zinc-700'}`} />
            </div>
            <h3 className="text-white text-base md:text-xl font-bold tracking-tight group-hover:text-amber-400 transition-colors truncate">{t('radio.info_banner.title')}</h3>
            <p className="text-zinc-500 text-[10px] md:text-xs truncate mt-0.5">{t('radio.info_banner.subtitle')}</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 pl-4 md:pl-6 border-l border-zinc-800 ml-4">
            <span className="text-[10px] font-bold text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase tracking-widest">{t('radio.info_banner.cta')}</span>
            <div className="p-2 md:p-2.5 bg-zinc-900 rounded-full group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300">
              <Maximize2 className="size-4" />
            </div>
          </div>
        </div>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-7xl max-h-[90vh] p-0 flex flex-col overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.9)]">
          <DialogTitle className="sr-only">{t('radio.info_banner.title')}</DialogTitle>
          <DialogDescription className="sr-only">{t('radio.info_banner.subtitle')}</DialogDescription>
          
          <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)] animate-pulse" />
              <h2 className="text-white font-bold tracking-tight uppercase" dangerouslySetInnerHTML={{ __html: t('radio.info_banner.modal_header_title') }} />
              <span className="hidden sm:inline-block text-zinc-600 font-mono text-xs tracking-widest uppercase border-l border-zinc-700 pl-3 ml-3">{t('radio.info_banner.modal_header_subtitle')}</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800 h-full">
              <div className="p-8 space-y-8 group hover:bg-zinc-900/20 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center text-amber-500 shadow-lg group-hover:border-amber-500/30 transition-all duration-300"><Cpu size={24} /></div>
                  <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-500 uppercase">Sec. 01</span>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{t('radio.info_banner.col1_title')}</h4>
                  <p className="text-amber-500 font-mono text-[10px] tracking-[0.2em] mb-4 uppercase">{t('radio.info_banner.col1_subtitle')}</p>
                  <p className="text-zinc-300 leading-relaxed text-sm mb-4" dangerouslySetInnerHTML={{ __html: t('radio.info_banner.col1_p1') }} />
                  <p className="text-zinc-400 leading-relaxed text-sm border-l-2 border-amber-500/20 pl-4" dangerouslySetInnerHTML={{ __html: t('radio.info_banner.col1_p2') }} />
                </div>
                <div className="space-y-3">
                  <h5 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{t('radio.info_banner.col1_section_title')}</h5>
                  <div className="flex flex-wrap gap-2">{Array.isArray(tags) && tags.map((tag: string) => (<span key={tag} className="px-3 py-1 bg-zinc-900/50 border border-zinc-800 rounded-full text-xs text-zinc-300">{tag}</span>))}</div>
                </div>
              </div>
              <div className="p-8 space-y-8 group hover:bg-zinc-900/20 transition-colors bg-zinc-900/10">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center text-amber-500 shadow-lg group-hover:border-amber-500/30 transition-all duration-300"><Calendar size={24} /></div>
                  <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-500 uppercase">Sec. 02</span>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{t('radio.info_banner.col2_title')}</h4>
                  <p className="text-amber-500 font-mono text-[10px] tracking-[0.2em] mb-4 uppercase">{t('radio.info_banner.col2_subtitle')}</p>
                  <div className="space-y-2.5">
                    {Array.isArray(schedule) && schedule.map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/60 transition-colors">
                        <div className="w-10 h-8 flex items-center justify-center bg-zinc-950 rounded text-[10px] font-bold text-zinc-500 font-mono">{item.d}</div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-zinc-200 uppercase">{item.t}</span>
                          <span className="text-[10px] text-zinc-500 truncate">{item.sub}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-2 text-center"><span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold rounded uppercase tracking-wider border border-amber-500/20">{t('radio.info_banner.col2_footer')}</span></div>
              </div>
              <div className="p-8 space-y-8 group hover:bg-zinc-900/20 transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-start justify-between relative z-10">
                  <div className="w-12 h-12 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center text-amber-500 shadow-lg group-hover:border-amber-500/30 transition-all duration-300"><Layers size={24} /></div>
                  <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-500 uppercase">Sec. 03</span>
                </div>
                <div className="relative z-10">
                  <h4 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{t('radio.info_banner.col3_title')}</h4>
                  <p className="text-amber-500 font-mono text-[10px] tracking-[0.2em] mb-4 uppercase">{t('radio.info_banner.col3_subtitle')}</p>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h5 className="text-sm font-bold text-white flex items-center gap-2"><Users size={14} className="text-zinc-500" /> {t('radio.info_banner.col3_community_title')}</h5>
                      <p className="text-zinc-400 text-xs leading-relaxed">{t('radio.info_banner.col3_community_p')}</p>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-sm font-bold text-white flex items-center gap-2"><Zap size={14} className="text-zinc-500" /> {t('radio.info_banner.col3_functions_title')}</h5>
                      <ul className="grid grid-cols-1 gap-2">
                        {Array.isArray(functions) && functions.map((item: string, i: number) => (<li key={i} className="text-xs text-zinc-400 flex gap-2"><span className="text-amber-500">›</span> {item}</li>))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 mt-auto pt-6 border-t border-zinc-800">
                  <p className="text-white text-sm font-medium italic text-center" dangerouslySetInnerHTML={{ __html: `${t('radio.info_banner.col3_quote_p1')}<br/><span class="text-amber-500">${t('radio.info_banner.col3_quote_p2')}</span>` }} />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-between px-6 py-3 bg-zinc-950 border-t border-zinc-800 text-[10px] text-zinc-600 font-mono uppercase tracking-wider shrink-0">
            <span>{t('radio.info_banner.modal_footer_id')}</span>
            <div className="flex gap-6">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {t('radio.info_banner.modal_footer_status')}</span>
              <span>{t('radio.info_banner.modal_footer_location')}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export function RadioPageView() {
  const { 
    currentStation, 
    setCurrentStation, 
    isPlaying, 
    setIsPlaying, 
    audioAnalyser,
    volume,
    setVolume,
    isMuted,
    setIsMuted 
  } = useApp();
  const { t } = useTranslation();
  
  const allStations = React.useMemo(() => STATIONS_DATA.flatMap(category => category.stations), []);
  
  const [activePodcast, setActivePodcast] = useState<(typeof PODCAST_DATA.episodes[0]) | null>(null);
  const [isPodcastPlaying, setIsPodcastPlaying] = useState(false);
  const [isPodcastSectionExpanded, setIsPodcastSectionExpanded] = useState(false);
  const [podcastCurrentTime, setPodcastCurrentTime] = useState(0);
  const [podcastDuration, setPodcastDuration] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [dayIndex, setDayIndex] = useState<number | null>(null);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    STATIONS_DATA.forEach(category => {
        initialState[category.category] = true;
    });
    return initialState;
  });

  const toggleCategory = (category: string) => {
      setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const podcastAudioRef = useRef<HTMLAudioElement | null>(null);
  const schedule = (t('radio.schedule_days') || []) as { day: string; desc: string }[];

  useEffect(() => {
    const today = new Date().getDay();
    const index = (today === 0 || today === 6) ? 5 : today - 1;
    setDayIndex(index);
    
    podcastAudioRef.current = new Audio();
    const audio = podcastAudioRef.current;
    
    const handleTimeUpdate = () => setPodcastCurrentTime(audio.currentTime);
    const handleDurationChange = () => setPodcastDuration(audio.duration);
    const handleEnded = () => setIsPodcastPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    }
  }, []);

  useEffect(() => {
    if (podcastAudioRef.current) {
      podcastAudioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePodcastPlayToggle = (episode: typeof PODCAST_DATA.episodes[0]) => {
    if (!podcastAudioRef.current || episode.url === '#') return;

    if (isPlaying) {
      setIsPlaying(false);
    }
    
    const isSameEpisode = activePodcast?.id === episode.id;

    if (isSameEpisode && isPodcastPlaying) {
      podcastAudioRef.current.pause();
      setIsPodcastPlaying(false);
    } else {
      if (!isSameEpisode) {
        podcastAudioRef.current.src = episode.url;
        setActivePodcast(episode);
        setPodcastCurrentTime(0);
      }
      podcastAudioRef.current.play().catch(e => console.error("Podcast play error:", e));
      setIsPodcastPlaying(true);
    }
  };

  const handleStationClick = (station: typeof STATIONS_DATA[0]['stations'][0]) => {
    if (isPodcastPlaying && podcastAudioRef.current) {
        podcastAudioRef.current.pause();
        setIsPodcastPlaying(false);
        setActivePodcast(null);
    }
    if (currentStation?.id === station.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentStation(station);
      setIsPlaying(true);
    }
  };

  const handlePodcastSeek = (value: number[]) => {
    if (podcastAudioRef.current) {
      podcastAudioRef.current.currentTime = value[0];
      setPodcastCurrentTime(value[0]);
    }
  };

  const handlePodcastSkip = (amount: number) => {
    if (podcastAudioRef.current) {
      podcastAudioRef.current.currentTime = Math.max(0, podcastAudioRef.current.currentTime + amount);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const floorSeconds = Math.floor(seconds);
    const min = Math.floor(floorSeconds / 60);
    const sec = floorSeconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleNextStation = () => {
    if (isPodcastPlaying && podcastAudioRef.current) {
        podcastAudioRef.current.pause();
        setIsPodcastPlaying(false);
        setActivePodcast(null);
    }
    if (!currentStation) {
      setCurrentStation(allStations[0]);
      setIsPlaying(true);
      return;
    }
    const currentIndex = allStations.findIndex(s => s.id === currentStation.id);
    const nextIndex = (currentIndex + 1) % allStations.length;
    setCurrentStation(allStations[nextIndex]);
    if (!isPlaying) setIsPlaying(true);
  };

  const handlePrevStation = () => {
    if (isPodcastPlaying && podcastAudioRef.current) {
        podcastAudioRef.current.pause();
        setIsPodcastPlaying(false);
        setActivePodcast(null);
    }
    if (!currentStation) {
      setCurrentStation(allStations[0]);
      setIsPlaying(true);
      return;
    }
    const currentIndex = allStations.findIndex(s => s.id === currentStation.id);
    const prevIndex = (currentIndex - 1 + allStations.length) % allStations.length;
    setCurrentStation(allStations[prevIndex]);
    if (!isPlaying) setIsPlaying(true);
  };

  const handleShuffleStation = () => {
    if (isPodcastPlaying && podcastAudioRef.current) {
        podcastAudioRef.current.pause();
        setIsPodcastPlaying(false);
        setActivePodcast(null);
    }
    const randomIndex = Math.floor(Math.random() * allStations.length);
    setCurrentStation(allStations[randomIndex]);
    if (!isPlaying) setIsPlaying(true);
  };

  return (
    <div className="bg-neutral-900 min-h-screen text-white pt-32 md:pt-48 pb-40 px-4 md:px-12 animate-fade-in relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-70">
        <div className="absolute inset-0 -z-0" style={{backgroundImage: `radial-gradient(circle at 25% 30%, hsla(180, 70%, 20%, 0.1) 0%, transparent 40%), radial-gradient(circle at 75% 70%, hsla(270, 60%, 25%, 0.08) 0%, transparent 40%)`}}/>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        <SpatialSection className="text-center mb-8 md:mb-10">
            <div className="flex justify-center items-center gap-3 md:gap-4 mb-4">
              <div className="relative w-12 h-12 md:w-20 md:h-20 flex-shrink-0">
                <Image src="https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/imagen/ICONO%20LOGO%20AMARILLO.png" alt="Núcleo Colectivo Logo" fill className="object-contain" />
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-headline tracking-tighter text-white">
                <span className="text-neutral-500">NÚCLEO/</span>RADIO
              </h1>
            </div>
            <p className="text-sm md:text-lg text-neutral-200 mt-2 font-light px-4">{t('radio.hero_subtitle')}</p>
            <p className="text-neutral-300 max-w-3xl mx-auto mt-4 md:mt-6 font-light text-xs md:text-base px-4">{t('radio.headline')}</p>
            <div className="mt-6 md:mt-8 bg-neutral-800 px-4 py-2 rounded-full text-[10px] md:text-xs font-code inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_hsl(var(--accent))]"></span>
              {t('radio.status_line')}
            </div>
        </SpatialSection>
        
        <SpatialSection>
          <InfoBanner />
        </SpatialSection>
        
        {currentStation && (
          <SpatialSection className="bg-gradient-to-r from-neutral-800 to-neutral-900 border border-neutral-700 p-6 md:p-12 mb-12 md:mb-20 rounded-xl relative overflow-hidden group min-h-[300px] md:min-h-[350px] flex flex-col justify-center">
            <GravityMeshVisualizer embedded={true} audioAnalyser={audioAnalyser} showFullscreenToggle={true} />
            <div className="relative z-10 w-full pointer-events-auto">
                <div className="text-center md:text-left">
                    <span className="text-red-500 font-bold tracking-widest text-[10px] md:text-xs mb-2 block animate-pulse">{t('radio.now_playing')}</span>
                    <h2 className="text-2xl md:text-4xl font-bold mb-2 font-headline">{currentStation.title}</h2>
                    <p className="text-sm md:text-xl text-neutral-200 mb-4 max-w-xl line-clamp-2 md:line-clamp-none">{currentStation.description}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
                        <span className="bg-black/30 px-2 md:px-3 py-1 text-[10px] md:text-sm font-code text-neutral-300 border border-neutral-700">{currentStation.location}</span>
                        {Array.isArray(currentStation.tags) && currentStation.tags.map(tag => (
                          <span key={tag} className="bg-black/30 px-2 md:px-3 py-1 text-[10px] md:text-sm font-code text-neutral-300 border border-neutral-700">{tag}</span>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 w-full">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-3 md:gap-4">
                          <button onClick={handlePrevStation} className="p-2 md:p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors" aria-label="Previous Station">
                            <SkipBack className="size-4 md:size-5" fill="white" />
                          </button>
                          <button onClick={() => setIsPlaying(!isPlaying)} className="w-16 h-16 md:w-20 md:h-20 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]" aria-label={isPlaying ? 'Pause' : 'Play'}>
                              {isPlaying ? <Pause className="size-7 md:size-8" fill="black" /> : <Play className="size-7 md:size-8 ml-1" fill="black" />}
                          </button>
                          <button onClick={handleNextStation} className="p-2 md:p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors" aria-label="Next Station">
                            <SkipForward className="size-4 md:size-5" fill="white" />
                          </button>
                           <button onClick={handleShuffleStation} className="p-2 md:p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors" aria-label="Shuffle Station">
                            <Shuffle className="size-4 md:size-5" />
                           </button>
                      </div>
                       <p className="text-center text-[10px] md:text-xs text-neutral-400 mt-4 font-code tracking-wider">{t('radio.player_microcopy')}</p>
                    </div>
                    
                    <div className="flex items-center gap-3 w-full md:w-auto max-w-[240px] md:min-w-[200px]">
                        <button onClick={() => setIsMuted(!isMuted)} aria-label={isMuted ? 'Unmute' : 'Mute'}>
                            {isMuted ? <VolumeX className="size-4 md:size-5 text-neutral-400"/> : <Volume2 className="size-4 md:size-5 text-white"/>}
                        </button>
                        <Slider
                            value={[isMuted ? 0 : volume * 100]}
                            onValueChange={(value) => {
                                setVolume(value[0] / 100);
                                if (isMuted) setIsMuted(false);
                            }}
                            max={100}
                            step={1}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
          </SpatialSection>
        )}

        <SpatialSection className="p-6 md:p-12 mb-12 md:mb-20 rounded-2xl bg-neutral-800/50 border border-neutral-700">
          <Collapsible open={isPodcastSectionExpanded} onOpenChange={setIsPodcastSectionExpanded}>
            <CollapsibleTrigger asChild>
              {isPodcastSectionExpanded ? (
                <div className="flex justify-between items-center group mb-4 cursor-pointer">
                  <h2 className="text-xl md:text-2xl font-bold text-white">{t('podcast.original_production')}</h2>
                  <div className="flex items-center gap-1 text-xs md:text-sm text-neutral-300 group-hover:text-white transition-colors border border-neutral-600 px-2 md:px-3 py-1 rounded flex-shrink-0">
                    {t('radio.hide')}
                    <ChevronDown className="size-3 md:size-4 transition-transform rotate-180" />
                  </div>
                </div>
              ) : (
                <motion.div 
                  role="button"
                  onClick={() => setIsPodcastSectionExpanded(true)}
                  className="relative w-full rounded-2xl overflow-hidden border border-yellow-500/40 shadow-[0_0_30px_-10px_rgba(234,179,8,0.2)] group mb-4"
                  style={{ minHeight: '200px' }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute inset-0 bg-cover transition-transform duration-[2s] ease-out"
                    style={{ 
                      backgroundImage: `url('${PODCAST_DATA.image}')`,
                      backgroundPosition: 'center 25%',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent md:via-black/50" />
                  
                  <div className="absolute inset-0 flex flex-col justify-center px-6 py-6 md:px-12 z-10">
                    <div className="max-w-3xl space-y-2 md:space-y-4">
                      <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-xl font-headline">
                        {t('podcast.title').replace('Cosiaca', '')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Cosiaca</span>
                      </motion.h1>
                      
                      <div className="space-y-1">
                        <p className="text-zinc-300 text-[10px] md:text-sm font-medium tracking-widest uppercase border-l-2 border-amber-500 pl-3">
                          {t('podcast.banner.subtitle')}
                        </p>
                      </div>

                      <p className="text-zinc-400 text-xs md:text-base lg:text-lg font-light leading-relaxed max-w-xl hidden sm:line-clamp-2 lg:line-clamp-none" 
                        dangerouslySetInnerHTML={{ __html: t('podcast.banner.description')}} />
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-20 flex gap-2 md:gap-3">
                    <button 
                      onClick={(e) => {
                          e.stopPropagation();
                          handlePodcastPlayToggle(PODCAST_DATA.episodes[0]);
                          if (!isPodcastSectionExpanded) setIsPodcastSectionExpanded(true);
                      }}
                      className="hidden sm:flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 bg-amber-500 hover:bg-amber-400 text-black text-[10px] md:text-sm font-bold rounded-full transition-all shadow-lg"
                    >
                        <PlayCircle className="size-4 md:size-[18px]" />
                        {t('podcast.banner.listen_now')}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 bg-zinc-800/60 backdrop-blur-md text-zinc-200 text-[10px] md:text-sm font-medium rounded-full border border-white/10">
                        {t('podcast.banner.show_content')} <ChevronDown className={cn("size-3 md:size-4 transition-transform", isHovered ? 'rotate-180' : '')} />
                    </button>
                  </div>
                </motion.div>
              )}
            </CollapsibleTrigger>
            
            <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center mt-8 mb-10 text-center md:text-left">
                    <div className="w-40 md:w-1/4 flex-shrink-0">
                        <div className="aspect-square relative rounded-lg overflow-hidden shadow-2xl">
                            <Image src={PODCAST_DATA.image} alt={t('podcast.title')} fill className="object-cover" />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm md:text-lg text-accent font-bold mb-2">{t('podcast.description')}</p>
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-headline mb-4">{t('podcast.title')}</h2>
                        <p className="text-sm md:text-base text-neutral-200 max-w-2xl">{t('podcast.longDescription')}</p>
                    </div>
                </div>
                
                {activePodcast && (
                  <div className="bg-black/40 border border-neutral-700 rounded-lg p-4 my-6 md:my-8 animate-fade-in">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                        <Image src={PODCAST_DATA.image} alt="Podcast Cover" fill className="rounded object-cover" />
                      </div>
                      <div className="flex-grow overflow-hidden">
                        <p className="text-[10px] text-accent font-bold">{t('podcast.now_playing_episode')}</p>
                        <h4 className="text-sm md:text-base font-bold text-white truncate">{t(`podcast.episodes.${activePodcast.id}.title`)}</h4>
                      </div>
                       <div className="flex items-center gap-1 md:gap-2">
                        <button onClick={() => handlePodcastSkip(-15)} className="p-1.5 md:p-2 text-neutral-300 hover:text-white transition-colors">
                          <Rewind className="size-4 md:size-5"/>
                        </button>
                        <button onClick={() => handlePodcastPlayToggle(activePodcast)} className="w-10 h-10 md:w-12 md:h-12 bg-white text-black rounded-full flex items-center justify-center">
                          {isPodcastPlaying ? <Pause className="size-4 md:size-5" fill="black"/> : <Play className="size-4 md:size-5 ml-1" fill="black"/>}
                        </button>
                        <button onClick={() => handlePodcastSkip(15)} className="p-1.5 md:p-2 text-neutral-300 hover:text-white transition-colors">
                          <FastForward className="size-4 md:size-5"/>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 mt-3">
                      <span className="text-[10px] md:text-xs font-mono text-neutral-400">{formatTime(podcastCurrentTime)}</span>
                      <Slider value={[podcastCurrentTime]} max={podcastDuration || 100} step={1} onValueChange={handlePodcastSeek} className="w-full" />
                      <span className="text-[10px] md:text-xs font-mono text-neutral-400">{formatTime(podcastDuration)}</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center mb-6 border-b border-neutral-700 pb-4">
                  <h4 className="font-bold text-white flex items-center gap-2 uppercase tracking-widest text-[10px] md:text-sm">
                    <Headphones className="size-3 md:size-4"/> {t('podcast.episodes_available')}
                  </h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Array.isArray(PODCAST_DATA.episodes) && PODCAST_DATA.episodes.map((episode) => (
                        <div key={episode.id} className={cn(
                          "flex items-center gap-3 md:gap-4 p-3 rounded-lg border transition-colors group",
                          activePodcast?.id === episode.id ? 'bg-accent text-accent-foreground border-accent' : 
                          (episode.url === '#' ? 'bg-neutral-800/50 border-neutral-700/50 cursor-not-allowed opacity-60' : 'bg-black/30 border-neutral-700/50 hover:border-accent hover:bg-accent/10'),
                      )}>
                          <button
                              onClick={() => handlePodcastPlayToggle(episode)}
                              disabled={episode.url === '#' || (activePodcast?.id === episode.id && isPodcastPlaying)}
                              className={cn("w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0",
                              activePodcast?.id === episode.id ? 'bg-black/20 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                              )}
                          >
                              {isPodcastPlaying && activePodcast?.id === episode.id ? <Pause className="size-3 md:size-4" fill="currentColor" /> : <Play className="size-3 md:size-4 ml-0.5" fill="currentColor" />}
                          </button>
                          <div className="flex-grow overflow-hidden">
                              <h5 className={cn("font-bold text-xs md:text-sm truncate", activePodcast?.id === episode.id ? 'text-white' : 'text-neutral-200' )}>{t(`podcast.episodes.${episode.id}.title`)}</h5>
                              <p className={cn("text-[10px] md:text-xs truncate", activePodcast?.id === episode.id ? 'text-white/70' : 'text-neutral-300')}>{t(`podcast.episodes.${episode.id}.description`)}</p>
                          </div>
                          <div className="text-[10px] md:text-xs font-mono flex-shrink-0 whitespace-nowrap">
                              <span className={cn(activePodcast?.id === episode.id ? 'text-white' : 'text-neutral-400')}>{episode.duration}</span>
                          </div>
                      </div>
                    ))}
                </div>
                <div className="mt-8 pt-6 border-t border-neutral-700/50 text-center">
                    <h4 className="text-accent font-bold mb-2 text-sm md:text-base">{t('podcast.about_title')}</h4>
                    <p className="text-xs md:sm text-neutral-300 max-w-2xl mx-auto">{t('podcast.info')}</p>
                </div>
            </CollapsibleContent>
          </Collapsible>
        </SpatialSection>

        <div className="mb-24 grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="lg:col-span-3 space-y-6 md:space-y-8">
            {STATIONS_DATA.map((category, idx) => (
              <SpatialSection key={idx}>
                <Collapsible
                  open={openCategories[category.category]}
                  onOpenChange={() => toggleCategory(category.category)}
                  className="w-full"
                >
                  <CollapsibleTrigger className="w-full flex items-center justify-between cursor-pointer group mb-4 text-left">
                    <h3 className="text-xl md:text-2xl font-bold border-l-4 border-white pl-4 uppercase tracking-wider font-headline group-hover:border-accent transition-colors">{category.category}</h3>
                    <ChevronDown className={cn("h-5 w-5 md:h-6 md:w-6 text-neutral-400 transition-transform duration-300 group-hover:text-white", openCategories[category.category] && "rotate-180")} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pt-2 md:pt-4">
                      {Array.isArray(category.stations) && category.stations.map((station) => (
                        <div key={station.id} onClick={() => handleStationClick(station)} className={cn(
                          'p-5 md:p-6 border rounded-lg cursor-pointer transition-all duration-300 group hover:-translate-y-1', 
                          currentStation?.id === station.id 
                          ? 'bg-neutral-800 border-accent shadow-[0_0_20px_hsl(var(--accent)/0.2)]' 
                          : 'bg-neutral-900 border-neutral-800 hover:border-accent/80'
                        )}>
                          <div className="flex justify-between items-start mb-4">
                            <div className={cn('p-2.5 md:p-3 rounded-full transition-colors', currentStation?.id === station.id ? 'bg-accent/10 text-accent' : 'bg-neutral-800 text-neutral-400 group-hover:text-accent')}>
                              {currentStation?.id === station.id && isPlaying ? <Volume2 className="size-4 md:size-5 animate-pulse"/> : <Play className="size-4 md:size-5 ml-1"/>}
                            </div>
                            <span className={cn('text-[10px] md:text-xs font-code uppercase', currentStation?.id === station.id ? 'text-accent' : 'text-neutral-500')}>{station.location}</span>
                          </div>
                          <h4 className="text-base md:text-lg font-bold mb-2 font-headline text-white truncate">{station.title}</h4>
                          <p className={cn('text-xs md:text-sm mb-4 line-clamp-2', currentStation?.id === station.id ? 'text-neutral-200' : 'text-neutral-400')}>{station.description}</p>
                          <div className="flex flex-wrap gap-1.5 md:gap-2">
                            {Array.isArray(station.tags) && station.tags.map(tag => (
                              <span key={tag} className={cn('text-[8px] md:text-[10px] uppercase px-1.5 md:px-2 py-0.5 rounded border', currentStation?.id === station.id ? 'border-accent/50 text-accent' : 'border-neutral-700 text-neutral-500 group-hover:border-accent/50 group-hover:text-accent')}>{tag}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </SpatialSection>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <SpatialSection className="bg-neutral-800 p-5 md:p-6 rounded-xl sticky top-24">
              <h3 className="font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-widest text-[10px] md:text-sm border-b border-neutral-700 pb-4">
                <Calendar className="size-4 md:size-5" /> {t('radio.schedule_title')}
              </h3>
              <div className="space-y-3 md:space-y-4">
                {dayIndex !== null && Array.isArray(schedule) && schedule.map((slot, i) => (
                  <div key={i} className={cn(
                    "p-2 md:p-3 rounded-md transition-all duration-300",
                    i === dayIndex ? "bg-accent/10 border-l-2 border-accent" : "opacity-60"
                  )}>
                    <h4 className={cn(
                      "font-bold text-xs md:text-sm",
                      i === dayIndex ? "text-accent" : "text-white"
                    )}>{slot.day}</h4>
                    <p className="text-[10px] md:text-xs text-neutral-400">{slot.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 md:mt-8 pt-6 border-t border-neutral-700">
                <p className="text-center text-[10px] text-neutral-500 font-code">{t('radio.schedule_footer')}</p>
              </div>
            </SpatialSection>
          </div>
        </div>

        <SpatialSection className="p-8 md:p-12 bg-neutral-800 rounded-2xl text-center border border-neutral-700">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 font-headline">{t('radio.suggest_station_title_new')}</h3>
          <p className="text-sm md:text-base text-neutral-300 mb-8 max-w-2xl mx-auto">{t('radio.suggest_station_description_new')}</p>
          <a href="https://forms.gle/smy3CpQaSMLeMYXj6" target="_blank" rel="noopener noreferrer" className="inline-block bg-accent text-accent-foreground px-6 md:px-8 py-2.5 md:py-3 font-bold hover:bg-yellow-400 transition-colors rounded-lg text-sm md:text-base">
             <span className="mr-2">🟡</span>{t('radio.suggest_station_cta_new')}
          </a>
        </SpatialSection>
      </div>
    </div>
  );
}
