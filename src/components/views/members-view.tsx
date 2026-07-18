
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from '@/context/language-context';
import { SectionTitle } from '@/components/common/section-title';
import { ARTISTS } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ArtistDetailModal } from '@/components/modals/artist-detail-modal';
import { useApp } from '@/context/app-context';

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

const MemberCard = ({ member, onClick }: { member: typeof ARTISTS[0], onClick: () => void }) => {
    const { t } = useTranslation();

    const name = t(`artists.${member.id}.name`);
    const primaryRoles = t(`artists.${member.id}.primary_roles`);
    const bioIntro = t(`artists.${member.id}.bio_intro`);

    return (
        <SpatialSection className="h-full">
            <div className="group flex flex-col bg-white rounded-none border-2 border-black transition-all duration-300 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] h-full overflow-hidden">
                <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden border-b-2 border-black">
                    <Image 
                        src={member.avatar} 
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" 
                    />
                    <div className="absolute top-4 left-4 bg-black text-white px-2 py-1 text-[8px] font-black uppercase tracking-widest z-10 font-code">
                        NODE_ID: {member.id.toUpperCase()}
                    </div>
                </div>
                
                <div className="p-6 md:p-8 flex flex-col flex-grow bg-white relative">
                    <h3 className="text-2xl md:text-3xl font-black font-headline text-foreground mb-1 uppercase italic tracking-tighter leading-none group-hover:text-primary transition-colors">{name}</h3>
                    <p className="font-code text-primary font-bold text-[10px] uppercase tracking-widest leading-tight mb-4 min-h-[40px]">
                        {primaryRoles}
                    </p>
                    
                    <p className="text-sm text-neutral-600 leading-relaxed mb-8 font-medium italic">
                        {bioIntro}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t-2 border-black flex items-center justify-center">
                        <button 
                            onClick={onClick}
                            className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 font-black uppercase text-[10px] tracking-widest italic hover:bg-accent hover:text-black transition-all shadow-[4px_4px_0_0_rgba(248,195,0,1)] hover:shadow-none border-2 border-black"
                        >
                            {t('members.view_profile')} <ArrowRight size={14} strokeWidth={3} />
                        </button>
                    </div>
                </div>
            </div>
        </SpatialSection>
    );
};

export function MembersView() {
    const { t } = useTranslation();
    const { playSound } = useApp();
    const [selectedMember, setSelectedMember] = useState<typeof ARTISTS[0] | null>(null);
    
    return (
        <div className="relative px-6 md:px-12 pt-48 pb-20 max-w-[1600px] mx-auto animate-fade-in font-body min-h-screen overflow-hidden">
            {/* Background Grid with 40% opacity (60% reduction) */}
            <div 
                className="absolute inset-0 -z-10 opacity-40 pointer-events-none" 
                style={{ 
                    backgroundImage: "url('https://www.transparenttextures.com/patterns/graphy.png')",
                    backgroundRepeat: 'repeat'
                }}
            />

            <SpatialSection>
                <SectionTitle subtitle={t('members.subtitle')}>{t('members.title')}</SectionTitle>
                <p className="text-xl md:text-2xl text-neutral-500 max-w-3xl -mt-12 mb-16 font-light italic leading-relaxed">{t('members.intro')}</p>
            </SpatialSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-start">
                {ARTISTS.map(member => (
                    <MemberCard 
                        key={member.id} 
                        member={member} 
                        onClick={() => {
                            playSound('click');
                            setSelectedMember(member);
                        }}
                    />
                ))}
            </div>

            <SpatialSection className="mt-32 text-center border-t-8 border-black pt-20">
                <h3 className="text-4xl md:text-7xl font-black font-headline mb-6 text-foreground uppercase italic tracking-tighter leading-none">{t('members.cta.title')}</h3>
                <p className="text-neutral-500 mb-10 max-w-xl mx-auto text-lg md:text-xl font-light">
                   {t('members.cta.description')}
                </p>
                <a
                    href="https://forms.gle/smy3CpQaSMLeMYXj6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xl px-12 py-6 uppercase tracking-[0.2em] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all"
                >
                    {t('members.cta.button')}
                </a>
            </SpatialSection>

            <ArtistDetailModal 
                member={selectedMember} 
                onClose={() => setSelectedMember(null)} 
            />
        </div>
    );
}
