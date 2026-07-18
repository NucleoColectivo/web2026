
import React from 'react';
import { LucideIcon, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';

type SocialButtonProps = {
  icon: LucideIcon;
  url: string;
  label: string;
  className?: string;
};

export function SocialButton({ icon: Icon, url, label, className }: SocialButtonProps) {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "p-2 border border-neutral-300 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors group",
        className
      )}
      aria-label={label}
    >
      <Icon size={18} className="text-muted-foreground group-hover:text-primary-foreground transition-colors" />
    </a>
  );
};

type MultiInstagramButtonProps = {
    urls: string[];
};

export function MultiInstagramButton({ urls }: MultiInstagramButtonProps) {
  if (!urls || urls.length === 0) return null;
  if (urls.length === 1) {
    return <SocialButton icon={Instagram} url={urls[0]} label="Instagram" />;
  }
  return (
    <div className="relative group">
      <button className="p-2 border border-neutral-300 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Instagram size={18} className="text-muted-foreground group-hover:text-primary-foreground transition-colors" />
      </button>
      <div className="absolute bottom-full left-0 mb-2 w-48 bg-background border border-border rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden shadow-xl z-[100]">
        {urls.map((url, index) => {
          const username = url.split('.com/')[1]?.replace(/\/$/, '') || 'Perfil';
          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-code hover:bg-muted text-left truncate flex items-center gap-2"
            >
              <Instagram size={12} />
              @{username}
            </a>
          );
        })}
      </div>
    </div>
  );
};

type MultiUrlButtonProps = {
    icon: LucideIcon;
    urls: {url: string, label: string}[];
    ariaLabel: string;
};

export function MultiUrlButton({ icon: Icon, urls, ariaLabel }: MultiUrlButtonProps) {
    if (!urls || urls.length === 0) return null;
    if (urls.length === 1) {
        return <SocialButton icon={Icon} url={urls[0].url} label={urls[0].label} />;
    }
    return (
        <div className="relative group">
            <button className="p-2 border border-neutral-300 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground" aria-label={ariaLabel}>
                <Icon size={18} className="text-muted-foreground group-hover:text-primary-foreground transition-colors" />
            </button>
            <div className="absolute bottom-full left-0 mb-2 w-56 bg-background border border-border rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden shadow-xl z-[100]">
                {urls.map((link, index) => (
                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-xs font-code hover:bg-muted text-left truncate flex items-center gap-2">
                        <Icon size={12} />
                        {link.label}
                    </a>
                ))}
            </div>
        </div>
    );
}
