'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import esTranslations from '@/lib/i18n/es.json';

type Language = 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => any;
}

const translations: Record<Language, any> = {
  es: esTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Fijamos el idioma en español permanentemente para evitar errores de hidratación y etiquetas vacías
  const [language] = useState<Language>('es');

  const t = useCallback((key: string): any => {
    const keys = key.split('.');
    let current = translations[language];
    
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        // Para depuración, devuelve la clave en mayúsculas si no existe
        return key.toUpperCase();
      }
    }
    return current;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: () => {}, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
