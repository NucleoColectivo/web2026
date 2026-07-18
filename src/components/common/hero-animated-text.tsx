
'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function HeroAnimatedText() {
  const [index, setIndex] = useState(0);
  const { t, language } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const slides = useMemo(() => [
    {
      id: 1,
      content: (
        <div className="leading-tight">
          <div>{t('hero_animated_text.slide1.line1') || 'ARTE'}<span className="text-primary">.</span></div>
          <div>{t('hero_animated_text.slide1.line2') || 'CULTURA'}<span className="text-accent">.</span></div>
          <div className="flex items-baseline">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('hero_animated_text.slide1.line3') || 'TECNOLOGÍA'}
            </span>
            <span className="text-primary">.</span>
          </div>
        </div>
      ),
      duration: 6000,
      className: "font-black text-foreground"
    },
    {
      id: 2,
      content: <div dangerouslySetInnerHTML={{ __html: t('hero_animated_text.slide2') || '' }} />,
      duration: 6000,
      className: "font-light !text-4xl sm:!text-5xl md:!text-7xl"
    },
    {
      id: 3,
      content: <div dangerouslySetInnerHTML={{ __html: t('hero_animated_text.slide3') || '' }} />,
      duration: 6000,
      className: "font-light !text-4xl sm:!text-5xl md:!text-7xl"
    },
    {
      id: 4,
      content: <div dangerouslySetInnerHTML={{ __html: t('hero_animated_text.slide4') || '' }} />,
      duration: 6000,
      className: "font-black"
    },
    {
      id: 5,
      content: <div dangerouslySetInnerHTML={{ __html: t('hero_animated_text.slide5') || '' }} />,
      duration: 6000,
      className: "font-light !text-4xl sm:!text-5xl md:!text-7xl"
    },
    {
      id: 6,
      content: <div dangerouslySetInnerHTML={{ __html: t('hero_animated_text.slide6') || '' }} />,
      duration: 6000,
      className: "font-black !text-4xl sm:!text-5xl md:!text-7xl"
    },
    {
      id: 7,
      content: <div dangerouslySetInnerHTML={{ __html: t('hero_animated_text.slide7') || '' }} />,
      duration: 6000,
      className: "font-black"
    },
    {
      id: 8,
      content: <div dangerouslySetInnerHTML={{ __html: t('hero_animated_text.slide8') || '' }} />,
      duration: 6000,
      className: "font-light !text-4xl sm:!text-5xl md:!text-7xl"
    },
    {
      id: 9,
      content: <div dangerouslySetInnerHTML={{ __html: t('hero_animated_text.slide9') || '' }} />,
      duration: 6000,
      className: "font-bold text-primary"
    },
  ], [t]);

  useEffect(() => {
    if (!mounted) return;
    const currentDuration = slides[index].duration || 6000;
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, currentDuration);

    return () => clearTimeout(timer);
  }, [index, slides, mounted]);

  if (!mounted) return <div className="min-h-[16rem] sm:min-h-[20rem] md:min-h-[24rem] lg:min-h-[28rem]" />;

  const currentSlide = slides[index];

  return (
    <div className="relative flex items-center justify-start text-left min-h-[16rem] sm:min-h-[20rem] md:min-h-[24rem] lg:min-h-[28rem] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentSlide.id}-${language}`}
          initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "w-full text-[12vw] md:text-[9vw] lg:text-[7.5vw] tracking-tighter leading-none font-body break-all md:break-words",
            currentSlide.className
          )}
        >
          {currentSlide.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
