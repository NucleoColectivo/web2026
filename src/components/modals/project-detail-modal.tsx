
"use client";

import React from 'react';
import Image from 'next/image';
import { X, Cpu, Users, Mail, ShieldCheck, MessageCircle, GitBranch, FlaskConical, TestTube, Search, FileText, Share2, Info, Code, Bot, HardDrive, Image as ImageIcon, ChevronRight, ExternalLink } from 'lucide-react';
import { PROJECTS } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

type Project = (typeof PROJECTS)[0];

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

const DetailSection = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <div>
      <h3 className="font-black uppercase text-[10px] text-muted-foreground mb-3 flex items-center gap-2 font-headline tracking-[0.2em]">
        <Icon size={14} className="text-primary" />
        {title}
      </h3>
      {children}
    </div>
);

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-7xl h-full max-h-[90vh] p-0 overflow-hidden bg-background border-2 border-black rounded-none shadow-2xl flex flex-col md:flex-row">
        <DialogTitle className="sr-only">{project.title}</DialogTitle>
        <DialogDescription className="sr-only">{project.summary}</DialogDescription>
        
        {/* Image Panel */}
        <div className="w-full md:w-4/12 h-80 md:h-auto relative bg-neutral-900 flex-shrink-0 border-b-2 md:border-b-0 md:border-r-2 border-black">
          <Image src={project.media.hero_image} alt={project.title} fill className="object-cover opacity-90" />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 md:p-8">
            <span className="text-accent font-code text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">{project.curatorial_line}</span>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-none font-headline uppercase italic tracking-tighter">{project.title}</h2>
             <div className="flex items-center gap-4 mt-6 border-t border-white/20 pt-4">
                <span className="bg-white/10 text-white px-3 py-1 rounded-none text-[10px] font-black uppercase tracking-widest">{project.year}</span>
                {project.status === 'published' && <span className="flex items-center gap-2 text-[10px] font-black text-accent uppercase tracking-widest"><ShieldCheck size={14} /> VERIFICADO</span>}
              </div>
          </div>
        </div>

        {/* Content Panel */}
        <ScrollArea className="w-full md:w-8/12">
            <div className="p-8 md:p-12">
                <DetailSection icon={Info} title="STATEMENT ARTÍSTICO">
                    <p className="text-xl leading-snug text-foreground/90 font-light italic uppercase">{project.summary}</p>
                </DetailSection>
                
                <Separator className="my-10 bg-black/10" />
                
                <DetailSection icon={FileText} title="DESCRIPCIÓN DEL PROYECTO">
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">{project.description}</p>
                </DetailSection>

                {project.media.gallery && project.media.gallery.length > 0 && (
                    <>
                        <Separator className="my-10 bg-black/10" />
                        <DetailSection icon={ImageIcon} title="GALERÍA DEL PROCESO">
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                {project.media.gallery.map((img, index) => (
                                    <div key={index} className="relative aspect-video rounded-none border border-black overflow-hidden group cursor-pointer bg-neutral-100">
                                        <Image src={img} alt={`${project.title} - imagen de galería ${index + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                ))}
                            </div>
                        </DetailSection>
                    </>
                )}
                
                <Separator className="my-10 bg-black/10" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
                    <DetailSection icon={FlaskConical} title="PROCESO CREATIVO">
                        <ul className="space-y-4 text-xs md:text-sm text-muted-foreground">
                            <li className="flex items-start gap-3"><ChevronRight size={14} className="mt-0.5 text-primary flex-shrink-0"/><div><strong className="text-foreground font-black uppercase tracking-widest block mb-1">CONCEPTO</strong> {project.process?.concept || 'Pendiente de documentación.'}</div></li>
                            <li className="flex items-start gap-3"><ChevronRight size={14} className="mt-0.5 text-primary flex-shrink-0"/><div><strong className="text-foreground font-black uppercase tracking-widest block mb-1">INVESTIGACIÓN</strong> {project.process?.research || 'Proceso en archivo.'}</div></li>
                            <li className="flex items-start gap-3"><ChevronRight size={14} className="mt-0.5 text-primary flex-shrink-0"/><div><strong className="text-foreground font-black uppercase tracking-widest block mb-1">DESARROLLO</strong> {project.process?.development || 'Fase de ejecución técnica.'}</div></li>
                        </ul>
                    </DetailSection>

                    <DetailSection icon={Cpu} title="TECNOLOGÍA Y HERRAMIENTAS">
                         <div className="space-y-5 text-xs md:text-sm text-muted-foreground">
                            {project.technology?.languages && project.technology.languages.length > 0 && <div><strong className="flex items-center gap-2 text-foreground font-black uppercase tracking-[0.2em] mb-2"><Code size={12}/> LENGUAJES</strong> <div className="flex flex-wrap gap-1.5">{project.technology.languages.map(s => <Badge key={s} variant="outline" className="rounded-none border-black font-black uppercase text-[9px]">{s}</Badge>)}</div></div>}
                            {project.technology?.software && project.technology.software.length > 0 && <div><strong className="flex items-center gap-2 text-foreground font-black uppercase tracking-[0.2em] mb-2"><GitBranch size={12}/> SOFTWARE</strong> <div className="flex flex-wrap gap-1.5">{project.technology.software.map(s => <Badge key={s} variant="outline" className="rounded-none border-black font-black uppercase text-[9px]">{s}</Badge>)}</div></div>}
                            {project.technology?.ai_models && project.technology.ai_models.length > 0 && <div><strong className="flex items-center gap-2 text-foreground font-black uppercase tracking-[0.2em] mb-2"><Bot size={12}/> MODELOS IA</strong> <div className="flex flex-wrap gap-1.5">{project.technology.ai_models.map(s => <Badge key={s} variant="outline" className="rounded-none border-black font-black uppercase text-[9px] text-primary border-primary/30">{s}</Badge>)}</div></div>}
                         </div>
                    </DetailSection>
                </div>

                <Separator className="my-10 bg-black/10" />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
                    <DetailSection icon={Users} title="AUTORES Y CRÉDITOS">
                        <ul className="space-y-3">
                        {project.authors.map(author => (
                            <li key={author.id} className="text-sm">
                                <span className="font-black text-foreground uppercase tracking-tight">{author.name}</span>
                                <span className="text-muted-foreground font-light italic"> / {author.role.join(', ')}</span>
                            </li>
                        ))}
                        </ul>
                    </DetailSection>

                    <DetailSection icon={Share2} title="LICENCIA">
                        <p className="text-xs md:text-sm text-muted-foreground font-code uppercase tracking-widest">{project.license}</p>
                        <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:underline mt-2 inline-block">Consultar protocolos de uso</a>
                    </DetailSection>
                </div>

                 <div className="mt-12 pt-8 border-t-2 border-black flex flex-col sm:flex-row gap-4">
                    {project.media.externalUrl && (
                        <a href={project.media.externalUrl} target="_blank" rel="noopener noreferrer" className="bg-black text-white px-8 py-4 font-black uppercase text-[11px] tracking-widest hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-3 text-center rounded-none shadow-[4px_4px_0_0_rgba(248,195,0,1)] hover:shadow-none border-2 border-black italic">
                            VISITAR_PROYECTO_ <ExternalLink size={16} strokeWidth={3} />
                        </a>
                    )}
                    {project.collaboration.open && (
                        <a href={`mailto:${project.collaboration.contact}`} className="bg-accent text-black px-8 py-4 font-black uppercase text-[11px] tracking-widest hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3 text-center rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none border-2 border-black italic">
                            COLABORAR_CORE <Mail size={16} strokeWidth={3} />
                        </a>
                    )}
                </div>
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
