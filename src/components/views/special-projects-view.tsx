import React from 'react';
import { SectionTitle } from '@/components/common/section-title';
import { SPECIAL_PROJECTS } from '@/lib/data';
import { cn } from '@/lib/utils';

export function SpecialProjectsView() {
    return (
        <div className="px-6 md:px-12 py-20 max-w-[1600px] mx-auto animate-fade-in">
            <SectionTitle subtitle="Iniciativas Especiales">PROYECTOS</SectionTitle>
            <div className="grid grid-cols-1 gap-12">
                {SPECIAL_PROJECTS.map(project => (
                    <div key={project.id} className="bg-foreground text-background rounded-2xl overflow-hidden relative min-h-[400px] flex items-center">
                        <div className={cn("absolute top-0 right-0 w-full h-full opacity-20 bg-gradient-to-l from-accent to-transparent")}></div>
                        <div className="relative z-10 p-12 md:p-20 max-w-3xl">
                            <span className="text-accent font-code text-sm uppercase tracking-widest mb-2 block">{project.subtitle}</span>
                            <h3 className="text-5xl md:text-7xl font-black mb-6 font-headline">{project.title}</h3>
                            <p className="text-xl md:text-2xl text-neutral-300 font-light mb-8">{project.description}</p>
                            <button 
                                onClick={() => window.open(project.externalUrl, '_blank')}
                                className="bg-background text-foreground px-8 py-3 font-bold hover:bg-accent hover:text-accent-foreground transition-colors">
                                Explorar Universo
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
