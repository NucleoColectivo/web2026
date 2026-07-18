
'use client';

import React from 'react';
import { useTranslation } from '@/context/language-context';
import { FlaskConical, Archive, FolderGit2 } from 'lucide-react';
import { Logo } from '@/components/common/logo';
import { motion } from 'framer-motion';

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

export function NucleoView() {
    const { t } = useTranslation();

    return (
        <div className="px-6 md:px-12 py-20 max-w-4xl mx-auto overflow-hidden">
            
            <SpatialSection className="mb-24 mt-12">
                <div className="w-48 mb-4">
                    <Logo /> 
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter font-headline uppercase">
                    {t('manifesto.title')}
                </h1>
                <p className="text-lg text-muted-foreground font-headline tracking-wider uppercase">
                    {t('manifesto.subtitle')}
                </p>
                <div className="h-1 w-20 mt-6 bg-primary"></div>
            </SpatialSection>
            
            <div className="space-y-32 text-xl font-light leading-relaxed text-foreground/80 pb-40">
                <SpatialSection>
                    <p className="mb-8">{t('manifesto.p1')}</p>
                    <p className="text-2xl font-bold text-foreground">{t('manifesto.p2')}</p>
                </SpatialSection>
                
                <SpatialSection>
                    <div className="text-2xl md:text-3xl font-headline tracking-tight mb-8" dangerouslySetInnerHTML={{ __html: t('manifesto.p3') }} />
                    <p className="text-xl" dangerouslySetInnerHTML={{ __html: t('manifesto.p4') }} />
                </SpatialSection>
                
                <SpatialSection>
                    <p className="text-3xl font-bold text-primary mb-6">{t('manifesto.p5')}</p>
                    <p>{t('manifesto.p6')}</p>
                </SpatialSection>
                
                <SpatialSection className="py-12 my-12 border-y border-border">
                    <p className="text-xl text-muted-foreground mb-12">{t('manifesto.p7')}</p>
                    <div className="space-y-12">
                        <div className="flex items-start gap-6 group">
                            <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                <FlaskConical className="w-10 h-10"/>
                            </div>
                            <div>
                                <p className="text-3xl font-bold font-headline text-foreground">{t('manifesto.li1')}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-6 group">
                            <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                <Archive className="w-10 h-10"/>
                            </div>
                            <div>
                                <p className="text-3xl font-bold font-headline text-foreground">{t('manifesto.li2')}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-6 group">
                            <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                <FolderGit2 className="w-10 h-10"/>
                            </div>
                            <div>
                                <p className="text-3xl font-bold font-headline text-foreground">{t('manifesto.li3')}</p>
                            </div>
                        </div>
                    </div>
                </SpatialSection>

                <SpatialSection className="space-y-8">
                    <p>{t('manifesto.p8')}</p>
                    <p>{t('manifesto.p9')}</p>
                </SpatialSection>

                <SpatialSection className="space-y-8">
                    <p>{t('manifesto.p10')}</p>
                    <p>{t('manifesto.p11')}</p>
                    <p className="text-3xl font-black text-foreground pt-4 font-headline uppercase tracking-tighter">
                        {t('manifesto.p12')}
                    </p>
                </SpatialSection>

                <SpatialSection className="text-center pt-16">
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://forms.gle/smy3CpQaSMLeMYXj6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-accent text-accent-foreground px-12 py-6 text-xl font-bold rounded-xl hover:bg-yellow-400 transition-all group shadow-2xl hover:shadow-yellow-500/50"
                    >
                        {t('manifesto.cta')}
                    </motion.a>
                </SpatialSection>
            </div>
        </div>
    );
}
