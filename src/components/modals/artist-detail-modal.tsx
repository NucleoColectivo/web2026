
'use client';

import React from 'react';
import Image from 'next/image';
import { X, Globe, Video, Facebook, MessageCircle, Youtube, Linkedin, UserCircle, Briefcase, Wrench, GraduationCap, Heart, Building2, MapPin, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/context/language-context';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { SocialButton, MultiInstagramButton, MultiUrlButton } from '@/components/common/social-button';
import { motion } from 'framer-motion';

type Artist = {
    id: string;
    slug: string;
    location: string;
    social: any;
    avatar: string;
};

interface ArtistDetailModalProps {
    member: Artist | null;
    onClose: () => void;
}

const ModalSection = ({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
    <div className="mb-10">
        <h4 className="font-black text-[9px] uppercase tracking-[0.3em] text-neutral-400 mb-4 font-code flex items-center gap-2">
            <Icon size={14} className="text-primary" /> {title}
        </h4>
        <div className="relative">
            {children}
        </div>
    </div>
);

export function ArtistDetailModal({ member, onClose }: ArtistDetailModalProps) {
    const { t } = useTranslation();

    if (!member) return null;

    const name = t(`artists.${member.id}.name`);
    const primaryRoles = t(`artists.${member.id}.primary_roles`);
    const bioIntro = t(`artists.${member.id}.bio_intro`);
    const bioFull = t(`artists.${member.id}.bio`);
    const academic = t(`artists.${member.id}.academic`);
    const volunteer = t(`artists.${member.id}.volunteer`);
    const clients = t(`artists.${member.id}.portfolio_clients`);
    
    const secondaryRolesStr = t(`artists.${member.id}.secondary_roles`);
    const secondaryRoles = (secondaryRolesStr && !secondaryRolesStr.includes('artists.')) ? secondaryRolesStr.split(',') : [];
    
    const nucleoRolesStr = t(`artists.${member.id}.nucleo_roles`);
    const nucleoRoles = (nucleoRolesStr && !nucleoRolesStr.includes('artists.')) ? nucleoRolesStr.split(',') : [];

    return (
        <Dialog open={!!member} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-7xl h-full max-h-[95vh] md:max-h-[90vh] p-0 overflow-hidden bg-white border-2 border-black rounded-none shadow-[24px_24px_0_0_rgba(0,0,0,1)] flex flex-col md:flex-row">
                <DialogTitle className="sr-only">{name}</DialogTitle>
                <DialogDescription className="sr-only">{bioIntro}</DialogDescription>

                {/* Cover / Image Side */}
                <div className="w-full md:w-5/12 h-64 md:h-auto relative bg-neutral-950 flex-shrink-0 border-b-2 md:border-b-0 md:border-r-2 border-black overflow-hidden">
                    <Image src={member.avatar} alt={name} fill className="object-cover opacity-80 grayscale" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                        <div className="bg-white text-black px-2 py-1 text-[8px] font-black uppercase tracking-widest inline-block mb-4 font-code">
                            NODE_ID: {member.id.toUpperCase()}
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-none font-headline uppercase italic tracking-tighter mb-4">
                            {name}
                        </h2>
                        <div className="flex items-center gap-2 text-accent font-code text-[10px] font-bold uppercase tracking-widest">
                            <MapPin size={12} /> {member.location}
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <ScrollArea className="w-full md:w-7/12 bg-white">
                    <div className="p-8 md:p-16">
                        <header className="mb-12">
                            <p className="font-code text-primary font-bold text-xs uppercase tracking-[0.2em] mb-6">
                                {primaryRoles}
                            </p>
                            <p className="text-xl md:text-2xl font-bold leading-tight text-black italic uppercase border-l-4 border-accent pl-6">
                                {bioIntro}
                            </p>
                        </header>

                        <ModalSection icon={Briefcase} title={t('members.sections.experience')}>
                            <div className="text-sm md:text-base text-neutral-600 leading-relaxed font-light space-y-4" dangerouslySetInnerHTML={{ __html: bioFull }}></div>
                        </ModalSection>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {academic && !academic.includes('artists.') && (
                                <ModalSection icon={GraduationCap} title={t('members.sections.academic')}>
                                    <p className="text-sm text-neutral-600 italic font-medium">{academic}</p>
                                </ModalSection>
                            )}

                            {clients && !clients.includes('artists.') && (
                                <ModalSection icon={Building2} title={t('members.sections.clients')}>
                                    <p className="text-sm text-neutral-600 italic font-medium">{clients}</p>
                                </ModalSection>
                            )}
                        </div>

                        {secondaryRoles.length > 0 && (
                            <ModalSection icon={Wrench} title={t('members.sections.skills')}>
                                <div className="flex flex-wrap gap-2">
                                    {secondaryRoles.map((role: string) => (
                                        <span key={role} className="text-[10px] bg-neutral-100 text-neutral-600 font-bold uppercase px-3 py-1 rounded-none border border-neutral-200">{role.trim()}</span>
                                    ))}
                                </div>
                            </ModalSection>
                        )}

                        {nucleoRoles.length > 0 && (
                            <ModalSection icon={UserCircle} title={t('members.sections.roles')}>
                                <div className="flex flex-wrap gap-2">
                                    {nucleoRoles.map((role: string) => (
                                        <span key={role} className="text-[10px] bg-black text-white font-black uppercase px-3 py-1 rounded-none shadow-[4px_4px_0px_0px_rgba(248,195,0,1)]">{role.trim()}</span>
                                    ))}
                                </div>
                            </ModalSection>
                        )}

                        <Separator className="my-12 bg-black/10" />

                        <footer className="flex flex-col sm:flex-row items-center justify-between gap-8">
                            <div className="flex flex-wrap gap-3 items-center">
                                {member.social.instagram && (
                                    <MultiInstagramButton urls={Array.isArray(member.social.instagram) ? member.social.instagram : [member.social.instagram]} />
                                )}
                                {member.social.websites && (
                                    <MultiUrlButton 
                                        icon={Globe} 
                                        urls={member.social.websites.map((w: any) => ({...w, label: t(w.label) }))} 
                                        ariaLabel="Websites" 
                                    />
                                )}
                                {member.social.youtube && (
                                    <MultiUrlButton 
                                        icon={Youtube} 
                                        urls={member.social.youtube.map((y: any) => ({...y, label: t(y.label) }))} 
                                        ariaLabel="YouTube" 
                                    />
                                )}
                                {member.social.facebook && <SocialButton icon={Facebook} url={member.social.facebook} label="Facebook" />}
                                {member.social.tiktok && <SocialButton icon={Video} url={member.social.tiktok} label="TikTok" />}
                                {member.social.linkedin && <SocialButton icon={Linkedin} url={member.social.linkedin} label="LinkedIn" />}
                                {member.social.whatsapp && (
                                    <a
                                        href={member.social.whatsapp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 border-2 border-black hover:bg-[#25D366] hover:text-white transition-all transform hover:-translate-y-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                                        aria-label="WhatsApp"
                                    >
                                        <MessageCircle size={20} />
                                    </a>
                                )}
                            </div>

                            <button onClick={onClose} className="bg-black text-white px-8 py-4 font-black uppercase text-[11px] tracking-widest hover:bg-accent hover:text-black transition-all border-2 border-black italic font-code shadow-[4px_4px_0_0_rgba(248,195,0,1)] hover:shadow-none">
                                CERRAR_EXPEDIENTE_
                            </button>
                        </footer>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
