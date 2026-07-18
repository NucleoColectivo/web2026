"use client";

import { useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { AppProvider, useApp } from '@/context/app-context';
import { LanguageProvider } from '@/context/language-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LoginModal } from '@/components/modals/login-modal';
import { RadioPlayer } from '@/components/radio/radio-player';
import { motion } from 'framer-motion';
import './globals.css';

function GlobalLayout({ children }: { children: React.ReactNode }) {
  const { 
    isLoginOpen,
    currentStation,
    setCurrentStation,
    isPlaying,
    setIsPlaying,
    isPlayerExpanded,
    setIsPlayerExpanded,
    setAudioAnalyser,
    volume,
    isMuted,
    initAudio,
    playSound
  } = useApp();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleFirstInteraction = () => {
      initAudio();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [initAudio]);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col min-h-screen"
    >
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      {isLoginOpen && <LoginModal />}
      {currentStation && (
        <RadioPlayer
          currentStation={currentStation}
          isPlaying={isPlaying}
          onTogglePlay={() => {
            playSound('click');
            setIsPlaying(!isPlaying);
          }}
          isExpanded={isPlayerExpanded}
          setIsExpanded={setIsPlayerExpanded}
          onAnalyserReady={setAudioAnalyser}
          volume={volume}
          isMuted={isMuted}
          onClose={() => setCurrentStation(null)}
        />
      )}
    </motion.div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js" async></script>
      </head>
      <body className="font-body antialiased bg-background">
        <FirebaseClientProvider>
          <AppProvider>
            <LanguageProvider>
              <GlobalLayout>
                {children}
              </GlobalLayout>
              <Toaster />
            </LanguageProvider>
          </AppProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
