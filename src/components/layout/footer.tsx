
"use client";

import Link from 'next/link';
import { useApp } from '@/context/app-context';
import { useTranslation } from '@/context/language-context';
import { Instagram, Mail, Users, Video, MessageCircle } from 'lucide-react';

export function Footer() {
  const { setIsLoginOpen } = useApp();
  const { t } = useTranslation();
  
  return (
    <footer className="bg-foreground text-background px-6 md:px-12 py-12 md:py-20 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        <div className="max-w-xs">
          <h2 className="text-2xl font-bold tracking-tighter mb-4">{t('footer.title')}</h2>
          <p className="text-neutral-400 text-sm leading-relaxed mb-6">{t('footer.description')}</p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/nucleo_colectivo_art/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 border border-neutral-700 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-colors">
              <Instagram size={18} />
            </a>
            <a href="mailto:nucleo.colectivo.art@gmail.com" aria-label="Email" className="w-10 h-10 border border-neutral-700 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-colors">
              <Mail size={18} />
            </a>
            <a href="https://www.tiktok.com/@ncleo.colectivo" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-neutral-700 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-colors" aria-label="TikTok">
              <Video size={18} />
            </a>
            <a href="https://wa.me/573006101221" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 border border-neutral-700 flex items-center justify-center rounded-full hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-20 text-sm w-full md:w-auto">
          <div>
            <h4 className="font-bold mb-4 uppercase text-neutral-500 tracking-widest text-xs">{t('footer.explore')}</h4>
            <ul className="space-y-3">
              <li><Link href="/showcase" className="hover:text-white text-neutral-400 transition-colors">{t('footer.showcase')}</Link></li>
              <li><Link href="/community" className="hover:text-white text-neutral-400 transition-colors">{t('footer.community')}</Link></li>
              <li><Link href="/radio" className="hover:text-white text-neutral-400 transition-colors">{t('footer.radio_archive')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-neutral-500 tracking-widest text-xs">{t('footer.legal')}</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="hover:text-white text-neutral-400 transition-colors">{t('footer.privacy')}</Link></li>
              <li><Link href="/terms" className="hover:text-white text-neutral-400 transition-colors">{t('footer.terms')}</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold mb-4 uppercase text-neutral-500 tracking-widest text-xs">{t('footer.member_access')}</h4>
            <button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors border border-neutral-800 px-4 py-2 rounded-sm text-xs uppercase font-bold">
              <Users size={14} /> {t('footer.login')}
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
        <p>{t('footer.copyright')}</p>
        <p className="mt-2 md:mt-0 font-code tracking-widest">{t('footer.location')}</p>
      </div>
    </footer>
  );
}
