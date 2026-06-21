import { cn } from '@/lib/utils';

interface IGradientButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function GradientButton({ variant = 'primary', className, children, ...props }: IGradientButtonProps) {
  if (variant === 'secondary') {
    return (
      <a
        className={cn(
          'inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium no-underline transition-all duration-200',
          'border border-border bg-surface text-muted hover:border-fg/20 hover:bg-surface-raised hover:text-text',
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      className={cn(
        'relative inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold no-underline transition-all duration-200',
        'bg-accent text-white shadow-[0_0_20px_rgba(217,119,87,0.3)] hover:shadow-[0_0_30px_rgba(217,119,87,0.5)] hover:brightness-110',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
