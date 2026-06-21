interface ISectionHeadingProps {
  eyebrow?: string;
  title: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, className }: ISectionHeadingProps) {
  return (
    <div className={className}>
      {eyebrow && (
        <div className="mb-5 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
          {eyebrow}
        </div>
      )}
      <h2 className="text-center text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] tracking-[-0.02em] text-text">
        {title}
      </h2>
    </div>
  );
}
