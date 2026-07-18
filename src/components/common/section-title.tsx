
import { cn } from "@/lib/utils";

type SectionTitleProps = {
  children: React.ReactNode;
  subtitle?: string;
  dark?: boolean;
  centered?: boolean;
  className?: string;
};

export function SectionTitle({ children, subtitle, dark = false, centered = false, className }: SectionTitleProps) {
  return (
    <div className={cn("mb-12 md:mb-16", centered && "text-center flex flex-col items-center", className)}>
      <h2 className={cn(
        "text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-4 uppercase",
        dark ? 'text-white' : 'text-foreground'
      )}>
        {children}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-xl max-w-2xl font-light",
          dark ? 'text-neutral-400' : 'text-neutral-500'
        )}>
          {subtitle}
        </p>
      )}
      <div className={cn(
        "h-1 w-20 mt-6",
        dark ? 'bg-accent' : 'bg-primary'
      )}></div>
    </div>
  );
}
