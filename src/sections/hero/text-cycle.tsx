import { useCallback, useEffect, useRef, useState } from 'react';

interface ITextCycleProps {
  items: string[];
  colors: Record<string, string>;
  className?: string;
}

const SCRAMBLE_CHARS = '01+-*:.';
const INTERVAL_FIRST = 4500;
const INTERVAL_REST = 2500;
const CHAR_DELAY = 40;
const ROUNDS = 4;
const STAGGER = 30;

export function TextCycle({ items, colors, className }: ITextCycleProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const isFirstRef = useRef(true);
  const pausedRef = useRef(false);
  const [color, setColor] = useState(colors[items[0]] || '#e5e5e5');

  const prefersReducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  const setText = useCallback((text: string, newColor: string) => {
    const el = containerRef.current;
    if (!el) return;
    el.textContent = text;
    setColor(newColor);
  }, []);

  const scrambleTransition = useCallback((target: string, newColor: string) => {
    const el = containerRef.current;
    if (!el) return;

    const currentText = el.textContent || '';
    const maxLen = Math.max(currentText.length, target.length);
    const padded = currentText.padEnd(maxLen);

    el.textContent = '';
    setColor(newColor);

    const spans: HTMLSpanElement[] = [];
    for (let i = 0; i < maxLen; i++) {
      const span = document.createElement('span');
      span.textContent = padded[i] || ' ';
      el.appendChild(span);
      spans.push(span);
    }

    for (let i = 0; i < maxLen; i++) {
      const targetChar = i < target.length ? target[i] : '';
      let remaining = ROUNDS;
      const delay = i * STAGGER;

      const tick = () => {
        if (remaining > 0) {
          spans[i].textContent = SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
          remaining--;
          setTimeout(tick, CHAR_DELAY);
        } else {
          spans[i].textContent = targetChar;
        }
      };

      setTimeout(tick, delay);
    }

    const totalDuration = maxLen * STAGGER + ROUNDS * CHAR_DELAY + 50;
    setTimeout(() => {
      el.textContent = target;
    }, totalDuration);
  }, []);

  const advance = useCallback(() => {
    indexRef.current = (indexRef.current + 1) % items.length;
    const next = items[indexRef.current];
    const nextColor = colors[next] || '#e5e5e5';

    if (prefersReducedMotion.current) {
      const el = containerRef.current;
      if (el) {
        el.style.transition = 'opacity 300ms ease';
        el.style.opacity = '0';
        setTimeout(() => {
          setText(next, nextColor);
          el.style.opacity = '1';
        }, 300);
      }
    } else {
      scrambleTransition(next, nextColor);
    }

    scheduleNext();
  }, [items, colors, setText, scrambleTransition]);

  const scheduleNext = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (pausedRef.current) return;
    const delay = isFirstRef.current ? INTERVAL_FIRST : INTERVAL_REST;
    isFirstRef.current = false;
    timerRef.current = setTimeout(advance, delay);
  }, [advance]);

  useEffect(() => {
    setText(items[0], colors[items[0]] || '#e5e5e5');
    scheduleNext();

    const onVisChange = () => {
      pausedRef.current = document.hidden;
      if (!pausedRef.current) scheduleNext();
    };

    document.addEventListener('visibilitychange', onVisChange);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      document.removeEventListener('visibilitychange', onVisChange);
    };
  }, [items, colors, setText, scheduleNext]);

  return (
    <span
      ref={containerRef}
      className={className}
      style={{ color, transition: 'color 0.3s' }}
    />
  );
}
