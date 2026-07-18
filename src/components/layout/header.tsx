"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/app-context';
import { useTranslation } from '@/context/language-context';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export function Header() {
  const { 
    isMenuOpen, 
    setIsMenuOpen, 
    scrolled, 
    setScrolled,
    playSound,
    headerVisible,
    setHeaderVisible,
  } = useApp();
  const { t } = useTranslation();
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  const navLinks = [
    { id: 'home', label: t('header.home'), href: '/' },
    { id: 'nucleo', label: t('header.manifesto'), href: '/manifesto' },
    { id: 'talleres', label: t('header.labs'), href: '/labs' },
    { id: 'miembros', label: t('header.community'), href: '/community' },
    { id: 'obra', label: t('header.showcase'), href: '/showcase' },
    { id: 'radio', label: t('header.radio'), href: '/radio' },
    { id: 'nucleo-channel', label: t('header.channel'), href: '/channel' },
    { id: 'challenges', label: t('header.challenges'), href: '/challenges' },
    { id: 'solutions', label: t('header.solutions'), href: '/solutions' },
    { id: 'contact', label: t('header.contact'), href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrolled, setHeaderVisible]);

  const handleLinkClick = () => {
    playSound('click');
    setIsMenuOpen(false);
  };

  const isDarkVibe = pathname === '/radio';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[60] transition-all duration-300',
          scrolled ? 'bg-background/90 backdrop-blur-md shadow-sm py-4 border-b' : 'bg-transparent py-6 md:py-8',
          isDarkVibe && !scrolled ? 'text-white' : '',
          !headerVisible && !isMenuOpen && '-translate-y-full'
        )}
      >
        <div className="px-4 md:px-12 flex justify-between items-center max-w-[1600px] mx-auto">
          <div className="flex items-center gap-6">
            <Link href="/" onClick={handleLinkClick} onMouseEnter={() => playSound('hover')} className="z-50 relative group flex-shrink-0">
              <span
                className={cn(
                  'text-lg md:text-2xl font-black tracking-tighter border-[3px] px-2 py-1 transition-colors',
                  isDarkVibe && !scrolled && !isMenuOpen
                    ? 'border-white group-hover:bg-white group-hover:text-black'
                    : 'border-foreground bg-foreground text-background group-hover:bg-background group-hover:text-foreground'
                )}
              >
                NÚCLEO
              </span>
            </Link>
          </div>

          <nav className="hidden xl:flex items-center gap-5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onMouseEnter={() => playSound('hover')}
                  onClick={handleLinkClick}
                  className={cn(
                    'text-sm tracking-widest uppercase py-2 transition-all relative group flex items-center gap-1.5',
                    isActive ? 'font-bold' : '',
                    (isDarkVibe && !scrolled && !isMenuOpen)
                      ? (isActive ? 'text-accent' : 'text-neutral-400 hover:text-accent')
                      : (isActive ? 'text-accent' : 'text-muted-foreground hover:text-accent')
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 w-full h-[2px] transform transition-transform duration-300 origin-left',
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50',
                      'bg-accent'
                    )}
                  ></span>
                </Link>
              );
            })}
          </nav>
          
          <div className="flex items-center gap-1 md:gap-2 xl:hidden">
            <button
              className={cn(
                'z-50 p-2 rounded-full',
                isDarkVibe && !scrolled && !isMenuOpen
                  ? 'text-white hover:bg-white/10'
                  : 'text-foreground hover:bg-neutral-100'
              )}
              onClick={() => {
                playSound('click');
                setIsMenuOpen(!isMenuOpen)
              }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-background z-[55] transform transition-transform duration-500 ease-cubic-bezier xl:hidden flex flex-col justify-center items-center overflow-y-auto pt-20',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col gap-2 text-center p-6 w-full max-w-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={handleLinkClick}
                className={cn(
                  'text-xl font-bold tracking-wider uppercase transition-colors py-2 flex items-center justify-center gap-3',
                  isActive
                    ? 'text-primary'
                    : 'text-neutral-500 hover:text-accent'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
