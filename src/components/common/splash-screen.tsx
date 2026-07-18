'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslation } from '@/context/language-context';

export function SplashScreen({ isVisible }: { isVisible: boolean }) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isVisible || !mounted) return null;

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.4, delay: 0, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { delay: 0.8, duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(15px)' }}
      transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#F8C300]"
    >
      <div className="w-full max-w-[320px] md:max-w-[650px] px-6">
        <svg
          viewBox="0 0 884.2 387.8"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto fill-black"
        >
          <motion.g
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          >
            <path d="M180.7,206.9l21.8,11.9c0.5,0.3,1,0.4,1.5,0.4s1-0.1,1.5-0.4l21.8-11.9c1-0.6,1.6-1.6,1.6-2.8v-23.8 c0-1.2-0.6-2.2-1.6-2.8l-21.8-11.9c-0.9-0.5-2.1-0.5-3,0l-21.8,11.9c-1,0.6-1.6,1.6-1.6,2.8v23.8 C179.1,205.3,179.7,206.3,180.7,206.9z M185.3,182.2L204,172l18.7,10.2v20.1L204,212.4l-18.7-10.2V182.2z"/>
            <path d="M313.8,196.4l-61-33.3c-0.1-0.1-0.1-0.1-0.2-0.1c0,0-0.1-0.1-0.1-0.1c-0.2-0.1-0.4-0.3-0.6-0.4l-35.7-19.4l14.2-7.7 c26.1,14.3,61.6,34.3,62,34.5c0.5,0.3,1,0.4,1.5,0.4c1.1,0,2.2-0.6,2.7-1.6c0.9-1.5,0.3-3.4-1.2-4.3 c-0.4-0.2-32.8-18.5-58.5-32.6l17.2-9.4l41.5,22.9c0.2,0.1,0.5,0.2,0.8,0.2c0.6,0,1.1-0.3,1.4-0.8c0.4-0.8,0.1-1.7-0.6-2.1 l-39.7-21.9l13.7-7.4c2.8-1.5,3.8-5,2.3-7.8c-1.5-2.8-5-3.8-7.8-2.3l-63.4,34.5c-0.3,0.1-0.6,0.2-1,0.4l-36.5,19.9V143l82.7-44.9 c1.5-0.8,2.1-2.7,1.3-4.3c-0.8-1.5-2.7-2.1-4.3-1.3l-79.7,43.2v-19.4l40-21.8c0.8-0.4,1-1.4,0.6-2.1c-0.4-0.8-1.4-1-2.1-0.6 l-38.5,21V97.8c0-3.2-2.6-5.8-5.8-5.8s-5.8,2.6-5.8,5.8v68.8c-0.1,0.3-0.1,0.7-0.1,1v39.3l-14-7.6v-68.1c0-1.7-1.4-3.1-3.1-3.1 s-3.1,1.4-3.1,3.1v64.7l-18-9.8v-41.9c0-0.9-0.7-1.6-1.6-1.6s-1.6,0.7-1.6,1.6v40.2l-13.7-7.4c-2.8-1.5-6.3-0.5-7.8,2.3 c-1.5,2.8-0.5,6.3,2.3,7.8l62.8,34.2c0.2,0.2,0.5,0.4,0.8,0.5l36.2,19.8l-13.2,7.2l-44.2-24.1L114,212.9 c-1.5-0.9-3.4-0.3-4.3,1.2c-0.9,1.5-0.3,3.4,1.2,4.3l20.9,11.8l40.6,22.1l-18.1,9.9c-5.3-2.9-12.3-6.8-19-10.5 c-9-5-17.6-9.7-21.3-11.7c-0.8-0.4-1.7-0.1-2.1,0.6c-0.4,0.8-0.1,1.7,0.6,2.1c3.7,2,12.2,6.7,21.3,11.7 c6.1,3.3,12.2,6.8,17.3,9.5l-13.2,7.2c-2.8,1.5-3.8,5-2.3,7.8c1,1.9,3,3,5.1,3c0.9,0,1.9-0.2,2.8-0.7l99.9-54.4V241l-40.9,22.6 l-20.9,11.8c-1.5,0.9-2,2.8-1.2,4.3c0.6,1,1.6,1.6,2.7,1.6c0.5,0,1.1-0.1,1.5-0.4l20.9-11.8l37.8-20.9v19.6l-40.1,21.9 c-0.8,0.4-1,1.4-0.6,2.1c0.3,0.5,0.8,0.8,1.4,0.8c0.3,0,0.5-0.1,0.8-0.2l38.6-21.1v14.2c0,3.2,2.6,5.8,5.8,5.8s5.8-2.6,5.8-5.8 v-68.9v-39.2l14,7.6V252c0,1.7,1.4,3.1,3.1,3.1s3.1-1.4,3.1-3.1v-63.5l18,9.8v42.6c0,0.9,0.7,1.6,1.6,1.6s1.6-0.7,1.6-1.6V200 l12,6.5c0.9,0.5,1.8,0.7,2.8,0.7c2,0,4-1.1,5.1-3C317.6,201.5,316.6,198,313.8,196.4z M204,149.6l39.3,21.5v42.2L204,234.7 l-37.1-20.3c-0.3-0.2-0.5-0.4-0.8-0.5l-1.3-0.7V171L204,149.6z"/>
          </motion.g>
        </svg>
      </div>

      <motion.div
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="mt-12 text-center"
      >
        <p className="text-black font-headline font-black text-xs md:text-sm tracking-[0.3em] uppercase px-4 max-w-lg mx-auto leading-relaxed">
          {t('splash.welcome')}
        </p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="h-[2px] w-24 bg-black mx-auto mt-4"
        />
      </motion.div>
    </motion.div>
  );
}
