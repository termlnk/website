interface IIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function WindowsIcon({ size = 16, className, style }: IIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style} aria-hidden="true">
      <path d="M2 4.05 10.2 2.9v8.58H2V4.05Zm9.1-1.28L22 1.25v10.23H11.1V2.77ZM2 12.52h8.2v8.58L2 19.95v-7.43Zm9.1 0H22v10.23l-10.9-1.52v-8.71Z" />
    </svg>
  );
}
