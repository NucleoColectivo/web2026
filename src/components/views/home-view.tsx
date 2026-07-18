
"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/app-context';
import { useTranslation } from '@/context/language-context';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, FlaskConical, Users, Archive, BrainCircuit } from 'lucide-react';
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
                <p className="w-full text-lg md:text-3xl font-bold text-foreground tracking-tight break-all">{t('home.platform_system')}</p>
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
                  <h3 className="text-xl md:text-2xl font-black italic uppercase font-headline mb-3 text-foreground">{t(`home_v2.what_to_do.${item.title}`)}</h3>
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
            <p className="text-xl md:text-2xl text-foreground/80 -mt-8 mb-12 md:mb-16 max-w-2xl font-light leading-relaxed">{t('home_v2.who_is_it_for.p1')}</p>
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
                      <Image 
                          src={project.media.hero_image}
                          alt={t(`projects_data.${project.id}.title`)}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
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
