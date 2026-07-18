'use client';

import React, { useState } from 'react';
import Script from 'next/script';
import { Mic, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/context/language-context';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 'agent-id': string };
    }
  }
}

export function VoiceAgentActivation() {
  const [isActive, setIsActive] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      {isActive && (
        <>
          <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="afterInteractive" />
          <elevenlabs-convai agent-id="agent_01jvahqbrgff9tky3wf1brsssp"></elevenlabs-convai>
        </>
      )}
      
      <button
        onClick={() => setIsActive(!isActive)}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all",
          isActive 
            ? "bg-red-500/10 border-red-500 text-red-500 hover:bg-red-500 hover:text-white" 
            : "bg-primary/10 border-primary/30 text-primary hover:bg-primary hover:text-white"
        )}
      >
        {isActive ? <X size={14} /> : <Mic size={14} />}
        {isActive ? "Voz IA" : "Voz IA"}
      </button>
    </div>
  );
}