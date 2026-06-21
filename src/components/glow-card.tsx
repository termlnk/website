import { useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

interface IGlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({ children, className, glowColor = 'rgba(59, 130, 246, 0.12)' }: IGlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, ${glowColor}, transparent 60%)`;
  }, [glowColor]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.backgroundImage = '';
  }, []);

  return (
    <div
      ref={ref}
      className={cn('card group relative overflow-hidden rounded-2xl', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
