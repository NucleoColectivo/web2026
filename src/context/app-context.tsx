
"use client";

import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction, useRef } from 'react';
import { STATIONS_DATA } from '@/lib/data';

type Station = typeof STATIONS_DATA[0]['stations'][0];

interface AppContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  scrolled: boolean;
  setScrolled: Dispatch<SetStateAction<boolean>>;
  currentStation: Station | null;
  setCurrentStation: Dispatch<SetStateAction<Station | null>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  isPlayerExpanded: boolean;
  setIsPlayerExpanded: Dispatch<SetStateAction<boolean>>;
  audioAnalyser: AnalyserNode | null;
  setAudioAnalyser: Dispatch<SetStateAction<AnalyserNode | null>>;
  isLoginOpen: boolean;
  setIsLoginOpen: Dispatch<SetStateAction<boolean>>;
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
  isMuted: boolean;
  setIsMuted: Dispatch<SetStateAction<boolean>>;
  playSound: (type: string) => void;
  initAudio: () => Promise<void>;
  headerVisible: boolean;
  setHeaderVisible: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentStation, setCurrentStation] = useState<Station | null>(STATIONS_DATA[0].stations[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const [audioAnalyser, setAudioAnalyser] = useState<AnalyserNode | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  
  const audioInitialized = useRef(false);

  const initAudio = async () => {
    if (typeof window !== 'undefined' && (window as any).Tone && !audioInitialized.current) {
        await (window as any).Tone.start();
        audioInitialized.current = true;
        console.log("Audio Engine Initialized.");
    }
  };

  const playSound = (type: string) => {
      if (typeof window === 'undefined' || !(window as any).Tone || !audioInitialized.current) return;
      
      const Tone = (window as any).Tone;
      const now = Tone.now();
      
      Tone.Destination.volume.value = -12;

      const sounds: Record<string, () => void> = {
          'start': () => {
              const synth = new Tone.PolySynth(Tone.Synth, { oscillator: { type: "triangle" }, envelope: { attack: 0.05, decay: 0.5, sustain: 0.1, release: 2 } }).toDestination();
              synth.triggerAttackRelease(["D4", "F#4", "A4"], "1.5", now);
          },
          'click': () => {
              const synth = new Tone.MembraneSynth({ envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.1 }, octaves: 2, pitchDecay: 0.01 }).toDestination();
              synth.triggerAttackRelease("G5", "32n", now);
          },
          'success': () => {
              const synth = new Tone.PolySynth(Tone.Synth, { oscillator: { type: "sine" }, envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 1 } }).toDestination();
              synth.triggerAttackRelease(["D5", "A5", "C#6"], "0.3", now);
          },
          'hover': () => {
              const synth = new Tone.Synth({ oscillator: { type: "sine" }, envelope: { attack: 0.005, decay: 0.05, sustain: 0, release: 0.05 } }).toDestination();
              synth.volume.value = -18;
              synth.triggerAttackRelease("C6", "64n", now);
          },
          'close': () => {
              const synth = new Tone.Synth({ oscillator: { type: 'triangle' }, envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.1 } }).toDestination();
              synth.volume.value = -15;
              synth.triggerAttackRelease('A3', '32n', now);
          }
      };

      if (sounds[type]) {
          sounds[type]();
      }
  };

  const value = {
    isMenuOpen,
    setIsMenuOpen,
    scrolled,
    setScrolled,
    currentStation,
    setCurrentStation,
    isPlaying,
    setIsPlaying,
    isPlayerExpanded,
    setIsPlayerExpanded,
    audioAnalyser,
    setAudioAnalyser,
    isLoginOpen,
    setIsLoginOpen,
    volume,
    setVolume,
    isMuted,
    setIsMuted,
    playSound,
    initAudio,
    headerVisible,
    setHeaderVisible
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
