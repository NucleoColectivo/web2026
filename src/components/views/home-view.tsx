
"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/app-context';
import { useTranslation } from '@/context/language-context';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, FlaskConical, Users, Archive, BrainCircuit, X, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut, Zap } from 'lucide-react';
import { SectionTitle } from '@/components/common/section-title';
import Image from 'next/image';
import { PROJECTS } from '@/lib/data';
import { VideoPlayerModal } from '@/components/modals/video-player-modal';
import { HeroAnimation } from '@/components/common/hero-animation';
import { HeroAnimatedText } from '@/components/common/hero-animated-text';
import { Logo } from '@/components/common/logo';
import { cn } from '@/lib/utils';

type LocalVideo = {
  id: string;
  titulo: string;
  canal: string;
  url: string;
  descripcion: string;
};

function SpatialSection({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 50, damping: 25, mass: 0.5 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [60, -60]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]), springConfig);

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity, rotateX, scale, perspective: 1200 }}
      className={cn("relative z-10", className)}
    >
      {children}
    </motion.section>
  );
}

const ImgLabMarquee = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const IMG_LAB_BASE = "https://raw.githubusercontent.com/NucleoColectivo/web2026/main/imglab/";
  const images = Array.from({ length: 15 }).map((_, i) => `${IMG_LAB_BASE}${i.toString().padStart(2, '0')}.png`);

  useEffect(() => {
    if (isHovering || selectedImage) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, isHovering, selectedImage]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // WhatsApp Setup with custom message
  const phone = "573332781752";
  const message = "Hola, estoy interesado/a en el Laboratorio IA para procesos creativos.";
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="w-full my-16 md:my-32 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl mx-auto bg-black border-4 border-[#ffcc00] rounded-2xl shadow-2xl overflow-hidden relative">
        
        {/* Top branding banner bar */}
        <div className="bg-[#ffcc00] text-black px-6 py-3 font-black text-center sm:text-left flex flex-col sm:flex-row justify-between items-center">
            <span className="tracking-wider uppercase text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-black" fill="currentColor" /> NÚCLEO COLECTIVO — HOME BANNER
            </span>
            <span className="text-xs font-semibold bg-black text-[#ffcc00] px-3 py-1 rounded-full uppercase mt-2 sm:mt-0">
                Laboratorio IA 2026
            </span>
        </div>

        {/* Banner Slider Container */}
        <div 
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-zinc-950 overflow-hidden group cursor-pointer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
            <div className="w-full h-full relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <img 
                    src={images[currentImageIndex]} 
                    alt={`Laboratorio IA ${currentImageIndex}`} 
                    className="w-full h-full object-contain bg-black cursor-pointer" 
                    onClick={() => setSelectedImage(images[currentImageIndex])} 
                    loading="lazy"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={handlePrev} 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-[#ffcc00] hover:text-black text-white w-12 h-12 rounded-full flex items-center justify-center transition-all z-20 opacity-90 shadow-lg border border-[#ffcc00]/40"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={handleNext} 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-[#ffcc00] hover:text-black text-white w-12 h-12 rounded-full flex items-center justify-center transition-all z-20 opacity-90 shadow-lg border border-[#ffcc00]/40"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Click indicator badge */}
            <div className="absolute top-4 right-4 bg-black/80 text-[#ffcc00] px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider z-20 flex items-center gap-2 border border-[#ffcc00]/30 shadow pointer-events-none">
                <ZoomIn className="w-4 h-4" /> Click para ampliar
            </div>
        </div>

        {/* Footer Navigation bar */}
        <div className="bg-zinc-950 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-900">
            <div className="text-xs text-zinc-400 font-medium">
                Pieza <span className="text-[#ffcc00] font-bold">{currentImageIndex + 1}</span> de <span>{images.length}</span>
            </div>
            {/* Dots Navigation Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-full">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2.5 rounded-full transition-all flex-shrink-0 ${index === currentImageIndex ? 'bg-[#ffcc00] w-6' : 'bg-zinc-700 hover:bg-zinc-400 w-2.5'}`}
                />
              ))}
            </div>
            <div className="text-xs text-zinc-500">
                Desvanecimiento automático
            </div>
        </div>

        {/* Call To Action Panel */}
        <div className="bg-zinc-900 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800">
            <div className="text-center sm:text-left">
                <h3 className="text-xl font-extrabold text-[#ffcc00]">Laboratorio IA para procesos creativos</h3>
                <p className="text-zinc-400 text-sm mt-1">Sábado 15 de Agosto 2026 • Centro Cultural Facultad de Artes UdeA</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-[#ffcc00] hover:bg-yellow-400 text-black font-black px-6 py-3.5 rounded-xl flex items-center justify-center gap-3 transition-transform hover:scale-105 shadow-lg uppercase tracking-wide text-sm">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Me Interesa / Inscribirme
                </a>
            </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-[#ffcc00] z-50 bg-zinc-900/80 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative max-w-5xl max-h-[90vh] flex items-center justify-center">
                <motion.img 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  src={selectedImage} 
                  alt="Ampliada" 
                  className="max-w-full max-h-[85vh] object-contain rounded-lg border-2 border-[#ffcc00] shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
            </div>
            <div className="absolute bottom-6 text-center text-zinc-400 text-sm">
                Presiona <span className="text-[#ffcc00] font-bold">ESC</span> o haz clic en la "X" para cerrar
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function HomeView() {
  const { playSound } = useApp();
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<LocalVideo | null>(null);
  
  const handleNavClick = (path: string) => {
    playSound('click');
    router.push(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleProjectClick = (project: (typeof PROJECTS)[0]) => {
      playSound('click');
      if (project.media.externalUrl?.includes('youtube.com')) {
        setSelectedVideo({
          id: project.id,
          titulo: t(`projects_data.${project.id}.title`),
          canal: project.authors.map(a => t(`artists.${a.id}.name`)).join(', '),
          url: project.media.externalUrl,
          descripcion: t(`projects_data.${project.id}.summary`),
        });
      } else if (project.media.externalUrl) {
        window.open(project.media.externalUrl, '_blank');
      } else {
        handleNavClick('/showcase');
      }
  };

  const featuredProjects = PROJECTS.filter(p => p.featured).slice(0, 4);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background overflow-hidden perspective-1200">
        
        {/* Hero Section */}
        <section className="relative flex flex-col justify-center min-h-[85vh] px-6 md:px-12 bg-transparent overflow-hidden">
          <div className="absolute inset-0 z-0">
            <HeroAnimation />
          </div>

          <div className="relative z-10 max-w-4xl w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className='mb-6 mt-20 md:mt-24'
            >
              <div className="w-full max-w-[260px] md:max-w-[590px] mb-4 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]">
                <Logo />
              </div>
              <div className="space-y-1">
                <p className="text-[9px] md:text-sm font-code tracking-[0.2em] md:tracking-[0.4em] text-accent uppercase">{t('home.est_date')}</p>
                <p className="w-full text-lg md:text-3xl font-bold text-foreground tracking-tight">{t('home.platform_system')}</p>
              </div>
            </motion.div>
            
            <HeroAnimatedText />

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 mb-8"
            >
              <p className="text-xl md:text-3xl lg:text-4xl font-bold italic text-foreground/90 max-w-3xl leading-tight border-l-4 border-accent pl-6 uppercase">
                {t('home_v2.hero.description')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-start mt-8"
            >
              <button onClick={() => handleNavClick('/showcase')} className="btn-primary text-sm md:text-lg">
                {t('home_v2.hero.cta_primary')}
              </button>
              <button onClick={() => handleNavClick('/community')} className="font-bold text-foreground/80 hover:text-foreground transition-colors flex items-center justify-center gap-2 group text-xs md:text-base">
                {t('home_v2.hero.cta_secondary')} <ArrowRight className="size-4 md:size-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>
        
        <ImgLabMarquee />

        {/* What can you do Section */}
        <SpatialSection className="px-6 md:px-12 py-12 md:py-24 relative z-20">
          <div className="max-w-7xl mx-auto">
            <SectionTitle subtitle={t('home_v2.what_to_do.subtitle')}>{t('home_v2.what_to_do.title')}</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { icon: FlaskConical, title: 'item1_title', desc: 'item1_desc' },
                { icon: Archive, title: 'item2_title', desc: 'item2_desc' },
                { icon: Users, title: 'item3_title', desc: 'item3_desc' },
                { icon: BrainCircuit, title: 'item4_title', desc: 'item4_desc' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5, scale: 1.02 }} 
                  className="bg-muted/30 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-border hover:border-accent/50 transition-all duration-300 shadow-sm hover:shadow-xl"
                >
                  <item.icon className="size-10 md:size-12 text-accent mb-5 md:mb-6" strokeWidth={1.5} />
                  <h3 className="text-sm md:text-base font-black italic uppercase font-headline mb-3 text-foreground">{t(`home_v2.what_to_do.${item.title}`)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(`home_v2.what_to_do.${item.desc}`)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </SpatialSection>

        {/* Who it's for section */}
        <SpatialSection className="px-6 md:px-12 py-20 md:py-32">
          <div className="max-w-7xl mx-auto">
            <SectionTitle subtitle={t('home_v2.who_is_it_for.subtitle')}>{t('home_v2.who_is_it_for.title')}</SectionTitle>
            <p className="text-sm md:text-base text-foreground/80 -mt-8 mb-12 md:mb-16 max-w-2xl font-light leading-relaxed">{t('home_v2.who_is_it_for.p1')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {[
                { color: 'primary', title: 'item1_title', desc: 'item1_desc' },
                { color: 'accent', title: 'item2_title', desc: 'item2_desc' },
                { color: 'foreground', title: 'item3_title', desc: 'item3_desc' }
              ].map((item, idx) => (
                <div key={idx} className="bg-gradient-to-br from-muted/50 to-muted/20 p-8 md:p-10 rounded-none border-2 border-black relative overflow-hidden group shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col min-h-[320px]">
                  <div className={cn(
                    "absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full transition-all duration-500",
                    item.color === 'primary' ? 'bg-primary/10 group-hover:bg-primary/20' : 
                    item.color === 'accent' ? 'bg-accent/10 group-hover:bg-accent/20' : 
                    'bg-foreground/5 group-hover:bg-foreground/10'
                  )}></div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black italic uppercase font-headline mb-4 text-foreground leading-[0.9] break-words">
                    {t(`home_v2.who_is_it_for.${item.title}`)}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                    {t(`home_v2.who_is_it_for.${item.desc}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SpatialSection>
        
        {/* Featured Projects */}
        <SpatialSection className="px-6 md:px-12 py-20 md:py-32">
          <div className="max-w-7xl mx-auto">
            <SectionTitle subtitle={t('home.showcase_intro')}>{t('home.featured')}</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
              {featuredProjects.map((project, idx) => (
                  <motion.div
                      key={project.id}
                      whileHover={{ scale: 1.03 }}
                      className="relative group overflow-hidden rounded-none border-2 border-black aspect-[4/3] bg-muted cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                      onClick={() => handleProjectClick(project)}
                  >
                          <img
                          src={project.media.hero_image}
                          alt={t(`projects_data.${project.id}.title`)}
                          
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <span className="inline-block bg-accent text-black text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] font-code px-2 py-1 rounded-none border border-black mb-3">{project.authors.map(a=>t(`artists.${a.id}.name`)).join(", ")}</span>
                          <h4 className="text-lg md:text-2xl font-black italic uppercase font-headline text-white leading-tight">{t(`projects_data.${project.id}.title`)}</h4>
                      </div>
                  </motion.div>
              ))}
            </div>
             <div className="text-center mt-8 md:mt-16">
                 <button onClick={() => handleNavClick('/showcase')} className="font-black text-muted-foreground hover:text-accent transition-all duration-300 flex items-center justify-center gap-2 mx-auto uppercase tracking-[0.3em] text-[10px] md:text-xs group">
                    {t('home_v2.featured_cta')} <ArrowRight className="size-4 md:size-5 group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </div>
        </SpatialSection>

        {/* Community CTA */}
        <SpatialSection className="px-6 md:px-12 py-24 md:py-40 bg-accent/[0.03]">
           <div className="max-w-4xl mx-auto text-center">
              <SectionTitle centered subtitle={t('home_v2.community_cta.subtitle')}>{t('home_v2.community_cta.title')}</SectionTitle>
              <p className="text-foreground/80 text-xl md:text-3xl mb-10 md:mb-12 font-light leading-relaxed max-w-2xl mx-auto italic uppercase">{t('home_v2.community_cta.desc')}</p>
              <motion.button 
                whileHover={{ scale: 1.05, shadow: "0px 0px 20px rgba(248, 195, 0, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick('/contact')} 
                className="btn-primary text-base md:text-xl px-12 py-5 uppercase tracking-widest"
              >
                 {t('home_v2.community_cta.cta')}
              </motion.button>
           </div>
        </SpatialSection>
      </div>

      <VideoPlayerModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </>
  );
}
