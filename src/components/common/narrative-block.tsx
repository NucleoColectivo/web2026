
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface NarrativeBlockProps {
  children: React.ReactNode;
  quote?: boolean;
  className?: string;
}

export function NarrativeBlock({ children, quote, className }: NarrativeBlockProps) {
  return (
    <div className={cn(
      "relative py-12 px-6 md:px-12 my-12 border-l-4 border-primary bg-muted/20",
      quote && "italic font-serif text-2xl md:text-3xl leading-relaxed text-foreground/90",
      !quote && "text-lg font-light text-muted-foreground",
      className
    )}>
      {quote && (
        <span className="absolute -top-6 -left-2 text-7xl text-primary/20 font-serif pointer-events-none select-none">“</span>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
