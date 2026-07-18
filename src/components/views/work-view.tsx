
"use client";

import React, { useState, useMemo } from 'react';
import NextImage from 'next/image';
import { useApp } from '@/context/app-context';
import { useTranslation } from '@/context/language-context';
import { SectionTitle } from '@/components/common/section-title';
import { ProjectDetailModal } from '@/components/modals/project-detail-modal';
import { VideoPlayerModal } from '@/components/modals/video-player-modal';
import { PROJECTS, SPECIAL_PROJECTS } from '@/lib/data';
import { Plus, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type Project = (typeof PROJECTS)[0] & { type?: string };

type Video = {
  id: string;
  titulo: string;
  canal: string;
  url: string;
  descripcion: string;
};

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

const FilterButton = ({ children, active, ...props }: { children: React.ReactNode, active: boolean, [key: string]: any }) => (
  <button
    {...props}
    className={cn(
      "px-4 py-2 text-sm font-bold rounded-none transition-colors whitespace-nowrap border-2",
      active
        ? "bg-primary text-primary-foreground border-primary"
        : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80"
    )}
  >
    {children}
  </button>
);

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void; }) => {
  const { t } = useTranslation();
  const title = project.type === 'special' 
    ? t(`special_projects.${project.id}.title`)
    : t(`projects_data.${project.id}.title`);
  const summary = project.type === 'special'
    ? t(`special_projects.${project.id}.description`)
    : t(`projects_data.${project.id}.summary`);
  const curatorialLine = project.curatorial_line || project.authors.map(a => t(`artists.${a.id}.name`)).join(', ');
  
  return (
    <div onClick={onClick} className="group block cursor-pointer bg-white rounded-none overflow-hidden border border-border transition-all duration-300 hover:shadow-2xl h-full flex flex-col">
      {/* Top Part: Black Background & Visual impact */}
      <div className="relative overflow-hidden aspect-square bg-[#0a0a0a] p-6 md:p-8 flex flex-col justify-center">
        {/* Year Badge */}
        <div className="absolute top-4 right-4 bg-zinc-300 text-black text-[10px] px-3 py-1 font-black shadow-md z-20">
          {project.year}
        </div>
        
        {/* Decoration & Branding */}
        <div className="flex items-center gap-2 mb-6 opacity-80">
           <div className="w-6 h-6 relative">
             <NextImage src="https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/imagen/ICONO%20LOGO%20AMARILLO.png" alt="Logo" fill className="object-contain" />
           </div>
           <span className="text-[8px] font-black text-white uppercase tracking-widest">NÚCLEO COLECTIVO</span>
        </div>

        {/* Title Block with Pink Line */}
        <div className="relative pl-6 border-l-2 border-primary mb-8">
          <h4 className="text-white font-black font-headline text-2xl sm:text-3xl lg:text-4xl uppercase italic leading-[0.9] group-hover:text-accent transition-colors break-words">
            {title}
          </h4>
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <div className="inline-flex items-center gap-2 bg-zinc-400 text-black px-4 py-1.5 text-[8px] font-black uppercase italic rounded-full shadow-lg group-hover:bg-accent transition-colors">
            INGRESAR AL SISTEMA <ArrowRight size={10} strokeWidth={3} />
          </div>
        </div>

        {/* Background Image (Subtle) */}
        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
           <NextImage 
            src={project.media.hero_image} 
            alt={title} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-110" 
          />
        </div>
      </div>

      {/* Bottom Part: White Background & Metadata */}
      <div className="p-6 flex flex-col flex-grow bg-white">
        <p className="text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-4">
          {curatorialLine}
        </p>
        <p className="text-sm text-neutral-500 line-clamp-3 mb-6 flex-grow font-light leading-relaxed">
          {summary}
        </p>
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-100">
              {project.tags.map(tag => (
                  <span key={tag} className="text-[9px] bg-neutral-100 text-neutral-500 font-bold uppercase px-3 py-1 rounded-none border border-neutral-200">
                    {tag}
                  </span>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};


export function WorkView() {
  const { playSound } = useApp();
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const allProjects = useMemo(() => {
    const formattedSpecial = SPECIAL_PROJECTS.map(p => ({
        ...p,
        summary: p.description,
        media: { ...p.media, hero_image: p.media.hero_image || p.media.gallery[0] },
        type: 'special'
    }));
    const regularProjects = PROJECTS.map(p => ({ ...p, type: 'regular' }));
    
    const combined: Project[] = [...formattedSpecial, ...regularProjects];
    const priorityIds = ['cosiaca', 'criaturas-imposibles'];

    return combined.sort((a, b) => {
      const aPriority = priorityIds.indexOf(a.id);
      const bPriority = priorityIds.indexOf(b.id);
      if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;
      if (aPriority !== -1) return -1;
      if (bPriority !== -1) return 1;
      return b.year - a.year;
    });
  }, []);

  const filters = [
    { key: 'all', label: t('work.filters.all') },
    { key: 'special', label: t('work.filters.special') },
    { key: 'interactive', label: t('work.filters.interactive') },
    { key: 'ai', label: t('work.filters.ai') },
    { key: 'video', label: t('work.filters.video') }
  ];

  const filteredProjects = useMemo(() => {
    switch (activeFilter) {
      case 'all': return allProjects;
      case 'special': return allProjects.filter(p => p.type === 'special');
      case 'interactive': return allProjects.filter(p => p.curatorial_line?.toLowerCase().includes('interactivo'));
      case 'ai': return allProjects.filter(p => p.curatorial_line?.toLowerCase().includes('ia'));
      case 'video': return allProjects.filter(p => p.curatorial_line?.toLowerCase().includes('videoarte'));
      default: return allProjects;
    }
  }, [activeFilter, allProjects]);

  const handleProjectClick = (project: Project) => {
    playSound('click');
    if (project.media.externalUrl?.includes('youtube.com')) {
      setSelectedVideo({
        id: project.id,
        titulo: t(project.type === 'special' ? `special_projects.${project.id}.title` : `projects_data.${project.id}.title`),
        canal: project.authors.map(a => t(`artists.${a.id}.name`)).join(', '),
        url: project.media.externalUrl,
        descripcion: t(project.type === 'special' ? `special_projects.${project.id}.description` : `projects_data.${project.id}.summary`),
      });
    } else if (project.media.externalUrl) {
      window.open(project.media.externalUrl, '_blank');
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <div className="px-6 md:px-12 pt-48 pb-20 max-w-[1600px] mx-auto animate-fade-in">
      <SpatialSection>
        <SectionTitle subtitle={t('work.subtitle')}>{t('work.title')}</SectionTitle>
        
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-border pb-8">
          {filters.map(filter => (
            <FilterButton 
              key={filter.key} 
              active={activeFilter === filter.key} 
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </FilterButton>
          ))}
        </div>
      </SpatialSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProjects.map((project) => (
          <SpatialSection key={project.id} className="h-full">
            <ProjectCard project={project} onClick={() => handleProjectClick(project)} />
          </SpatialSection>
        ))}
        <SpatialSection className="h-full">
          <a href="https://forms.gle/smy3CpQaSMLeMYXj6" target="_blank" rel="noopener noreferrer" className="border-2 border-dashed border-accent/50 rounded-none flex flex-col items-center justify-center aspect-square bg-neutral-900 cursor-pointer hover:border-accent hover:bg-neutral-800 transition-all duration-300 group">
            <div className="text-center p-8">
              <h3 className="text-2xl md:text-3xl font-bold font-headline text-neutral-400 group-hover:text-white uppercase italic tracking-tighter">{t('work.placeholder.title')}</h3>
              <p className="text-xs md:text-sm text-neutral-500 group-hover:text-neutral-300 mt-4 leading-relaxed max-w-[240px] mx-auto">{t('work.placeholder.description')}</p>
              <div className="mt-10">
                <div className="w-14 h-14 rounded-full border-2 border-neutral-700 flex items-center justify-center mx-auto mb-4 group-hover:border-accent transition-all group-hover:scale-110">
                    <Plus size={28} className="text-neutral-600 transition-colors group-hover:text-accent" />
                </div>
                <p className="text-neutral-500 font-black uppercase tracking-[0.2em] text-[10px] transition-colors group-hover:text-accent">{t('work.placeholder.cta')}</p>
              </div>
            </div>
          </a>
        </SpatialSection>
      </div>

      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <VideoPlayerModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </div>
  );
}
