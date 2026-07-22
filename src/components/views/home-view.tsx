
"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/app-context';
import { useTranslation } from '@/context/language-context';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, FlaskConical, Users, Archive, BrainCircuit, X, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from 'lucide-react';
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
  const [isZoomed, setIsZoomed] = useState(false);

  const IMG_LAB_BASE = "https://github.com/NucleoColectivo/web2026/blob/main/imglab/";
  const images = [
    `${IMG_LAB_BASE}01.png?raw=true`,
    `${IMG_LAB_BASE}02.png?raw=true`,
    `${IMG_LAB_BASE}03.png?raw=true`,
    `${IMG_LAB_BASE}04.png?raw=true`,
    `${IMG_LAB_BASE}05.png?raw=true`,
    `${IMG_LAB_BASE}06.png?raw=true`,
    `${IMG_LAB_BASE}invitacion_IG1.png?raw=true`,
    `${IMG_LAB_BASE}invitacion_IG2.png?raw=true`,
    `${IMG_LAB_BASE}invitacion_IG3.png?raw=true`,
    `${IMG_LAB_BASE}invitacion_IG4%20copia.png?raw=true`,
    `${IMG_LAB_BASE}invitacion_IG4.png?raw=true`,
    `${IMG_LAB_BASE}invitacion_afiche1.png?raw=true`,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImage) return;
    
    // Create an invisible link to download the image
    const link = document.createElement('a');
    link.href = selectedImage;
    link.download = `nucleo_colectivo_lab_${currentImageIndex}.png`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="w-full bg-background border-y-2 border-border flex flex-col lg:flex-row relative z-30 overflow-hidden my-16 md:my-32">
        
        {/* Left Info Panel */}
        <div className="w-full lg:w-[50%] bg-[#FFCC00] p-6 md:p-10 lg:p-16 flex flex-col justify-center border-b-2 lg:border-b-0 lg:border-r-2 border-border flex-shrink-0 relative">
          <h2 className="font-headline font-black text-black text-4xl md:text-5xl lg:text-6xl leading-[0.9] uppercase mb-8 lg:mb-10 tracking-tighter  origin-bottom-left">
            Laboratorio IA<br/>para procesos<br/>creativos
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 items-stretch max-w-xl">
            {/* Date Box */}
            <div className="bg-white border-2 border-black p-3 md:p-5 flex flex-col items-center justify-center text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex-shrink-0 min-w-[150px]">
              <span className="font-headline font-black text-sm md:text-base uppercase tracking-tighter text-black ">Sábado</span>
              <span className="font-headline font-black text-6xl md:text-7xl leading-[0.8] my-1 tracking-tighter text-black ">15</span>
              <span className="font-headline font-black text-sm md:text-base uppercase tracking-tighter text-black ">Agosto</span>
              <span className="text-sm md:text-base font-light text-gray-500 tracking-widest mt-1">2026</span>
            </div>

            {/* Info Box */}
            <div className="bg-white border-2 border-black flex flex-col flex-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              {/* Time */}
              <div className="bg-black text-white p-2 text-center flex items-center justify-center h-14 md:h-16">
                <span className="font-black text-2xl md:text-3xl font-headline tracking-tighter whitespace-nowrap ">2:00 <span className="text-sm md:text-base font-sans tracking-normal transform-none inline-block">p. m.</span> a 6:00 <span className="text-sm md:text-base font-sans tracking-normal transform-none inline-block">p. m.</span></span>
              </div>
              
              {/* Location */}
              <div className="flex flex-col flex-1 p-4 pb-2 justify-end bg-white">
                <span className="text-xs md:text-sm font-black tracking-widest uppercase ml-1 mb-1 text-black/80">LUGAR :</span>
                <span className="font-headline font-black text-2xl md:text-4xl leading-[0.9] ml-1 mb-1 tracking-tighter text-black  origin-bottom-left">Centro Cultural</span>
              </div>
              
              <div className="bg-[#FFCC00] px-4 py-2 border-y-2 border-black font-black font-headline text-lg md:text-2xl tracking-tighter text-black  origin-left">
                Facultad de Artes UdeA
              </div>
              
              <div className="bg-white px-4 py-3 flex items-center gap-2 font-black text-base md:text-xl border-b-2 border-black text-black">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-[#FFCC00] fill-current drop-shadow-[1px_1px_0_rgba(0,0,0,1)] flex-shrink-0" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span className="whitespace-nowrap font-headline tracking-tighter ">CRA 64B # 51- 64</span>
              </div>
              
              <div className="flex font-black font-headline text-[10px] md:text-sm h-10 md:h-12">
                <div className="bg-[#e5e5e5] px-3 md:px-4 flex items-center justify-center border-r-2 border-black text-gray-500 tracking-widest">BARRIO</div>
                <div className="bg-[#FFCC00] flex-1 px-3 md:px-4 flex items-center justify-center tracking-tighter text-center whitespace-nowrap text-black text-base md:text-lg  origin-center">CARLOS E RESTREPO</div>
              </div>
            </div>
          </div>
          
          {/* WhatsApp Button */}
          <div className="mt-8 md:mt-12 max-w-xl">
             <a href="https://wa.me/573332781752?text=Hola,%20estoy%20interesado/a%20en%20el%20Laboratorio%20IA%20para%20procesos%20creativos." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-black text-white px-6 py-3 font-headline font-black text-sm md:text-base uppercase tracking-tighter border-2 border-black rounded-none hover:bg-white hover:text-black transition-all w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                ME INTERESA
             </a>
             <p className="mt-3 text-sm font-black font-headline text-black/70 text-center tracking-tight">O escríbenos al teléfono: (+57) 333 278 1752</p>
          </div>
        </div>

        {/* Right Slideshow Panel */}
        <div className="flex-1 lg:w-[50%] py-8 sm:py-10 flex items-center justify-center overflow-hidden bg-background relative group">
          <div 
            className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex-shrink-0 cursor-pointer overflow-hidden px-4 md:px-10"
            onClick={() => setSelectedImage(images[currentImageIndex])}
          >
            <AnimatePresence>
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`Lab Image ${currentImageIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </AnimatePresence>
          </div>
          
          <button 
            className="absolute left-2 sm:left-6 p-2 rounded-full bg-black/50 hover:bg-black text-white transition-all opacity-0 group-hover:opacity-100 z-40"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          <button 
            className="absolute right-2 sm:right-6 p-2 rounded-full bg-black/50 hover:bg-black text-white transition-all opacity-0 group-hover:opacity-100 z-40"
            onClick={handleNext}
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] flex bg-black/90 backdrop-blur-md ${isZoomed ? 'overflow-auto items-start justify-center' : 'overflow-hidden items-center justify-center'}`}
            onClick={() => { setSelectedImage(null); setIsZoomed(false); }}
          >
            <div className="fixed top-4 right-4 sm:top-6 sm:right-6 flex flex-col gap-3 z-[110]">
              <button 
                className="text-white hover:text-accent transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-sm"
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); setIsZoomed(false); }}
              >
                <X className="size-6 md:size-8" />
              </button>
              
              <button 
                className="text-white hover:text-accent transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-sm"
                onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
              >
                {isZoomed ? <ZoomOut className="size-6 md:size-8" /> : <ZoomIn className="size-6 md:size-8" />}
              </button>
              
              <button 
                className="text-white hover:text-accent transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-sm"
                onClick={handleDownload}
              >
                <Download className="size-6 md:size-8" />
              </button>
            </div>

            <motion.div
              layout
              className={`relative z-[105] flex justify-center w-full ${isZoomed ? 'min-h-full py-12 px-4' : 'h-full p-4 md:p-12 items-center'}`}
            >
              <motion.img 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={selectedImage} 
                alt="Expanded view" 
                className={isZoomed ? "w-full max-w-7xl h-auto object-contain cursor-zoom-out shadow-2xl" : "w-full h-full object-contain cursor-zoom-in drop-shadow-2xl"}
                onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
