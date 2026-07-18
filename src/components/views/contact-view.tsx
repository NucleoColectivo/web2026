
'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/context/language-context';
import { SectionTitle } from '@/components/common/section-title';
import { SocialButton } from '@/components/common/social-button';
import { Mail, MapPin, ArrowRight, Instagram, Video, MessageCircle } from 'lucide-react';
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

export function ContactView() {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = `Contacto desde la web de Núcleo Colectivo - de ${name}`;
        const body = `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`;
        window.location.href = `mailto:nucleo.colectivo.art@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <div className="px-6 md:px-12 pt-48 pb-20 max-w-[1600px] mx-auto animate-fade-in">
            <SpatialSection>
              <SectionTitle subtitle={t('contact.subtitle')}>{t('contact.title')}</SectionTitle>
            </SpatialSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <SpatialSection className="space-y-8">
                    <p className="text-xl leading-relaxed text-muted-foreground">{t('contact.intro')}</p>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-foreground">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm uppercase text-muted-foreground">{t('contact.email_label')}</h4>
                                <a href="mailto:nucleo.colectivo.art@gmail.com" className="text-lg font-medium hover:text-primary transition-colors">{t('contact.email_value')}</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-foreground">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm uppercase text-muted-foreground">{t('contact.location_label')}</h4>
                                <p className="text-lg font-medium">{t('contact.location_value')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t">
                        <h4 className="font-bold mb-4">{t('contact.follow_us')}</h4>
                        <div className="flex gap-4 items-center">
                            <SocialButton icon={Instagram} url="https://www.instagram.com/nucleo_colectivo_art/" label="Instagram" />
                            <SocialButton icon={Video} url="https://www.tiktok.com/@ncleo.colectivo" label="TikTok" />
                             <a 
                              href="https://wa.me/573006101221" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              aria-label="WhatsApp"
                              className="w-14 h-14 flex items-center justify-center rounded-full bg-[#25D366] text-white hover:bg-[#128C7E] transition-all duration-300 transform hover:scale-110 shadow-lg shadow-[#25D366]/40 hover:shadow-xl hover:shadow-[#25D366]/60"
                            >
                                <MessageCircle size={28} fill="white"/>
                            </a>
                        </div>
                    </div>
                </SpatialSection>
                <SpatialSection className="bg-muted/50 p-8 rounded-2xl border">
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                        <div>
                            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">{t('contact.form_name')}</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 bg-background border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-all" placeholder={t('contact.form_name_placeholder')} required />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">{t('contact.form_email')}</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 bg-background border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-all" placeholder={t('contact.form_email_placeholder')} required />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">{t('contact.form_message')}</label>
                            <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-3 bg-background border rounded-lg focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-all" placeholder={t('contact.form_message_placeholder')} required></textarea>
                        </div>
                        <button type="submit" className="w-full bg-foreground text-background py-4 font-bold rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-2">{t('contact.form_submit')} <ArrowRight size={18} /></button>
                    </form>
                </SpatialSection>
            </div>
            <SpatialSection className="text-center mt-16 border-t pt-16">
                <h3 className="text-2xl font-bold font-headline mb-4">{t('contact.cta_title')}</h3>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t('contact.cta_description')}</p>
                <a
                    href="https://forms.gle/smy3CpQaSMLeMYXj6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-accent text-accent-foreground px-10 py-5 text-lg font-bold rounded-lg hover:bg-yellow-400 transition-all group shadow-lg hover:shadow-yellow-500/50 transform hover:-translate-y-1"
                >
                    {t('contact.cta_button')}
                </a>
            </SpatialSection>
        </div>
    );
}
