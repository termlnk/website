import { useEffect, useRef, useState } from 'react';

interface ISubstateOptions<T> {
  active: boolean;
  steps: readonly T[];
  /** Duration in ms for each step (cycled if shorter than steps) */
  durations: readonly number[];
}

/**
 * Drives an internal "sub-state" that auto-advances while the parent scene is active.
 * Returns the current step plus its index. Resets to step 0 whenever `active` flips on.
 */
export function useSceneSubstate<T>({ active, steps, durations }: ISubstateOptions<T>): {
  step: T;
  index: number;
  total: number;
} {
  const [index, setIndex] = useState(0);
  const stepsRef = useRef(steps);
  const durationsRef = useRef(durations);
  stepsRef.current = steps;
  durationsRef.current = durations;

  useEffect(() => {
    if (!active) return;
    let cur = 0;
    setIndex(0);
    let timer: ReturnType<typeof setTimeout> | null = null;
    const tick = () => {
      const wait = durationsRef.current[cur % durationsRef.current.length];
      timer = setTimeout(() => {
        cur = (cur + 1) % stepsRef.current.length;
        setIndex(cur);
        tick();
      }, wait);
    };
    tick();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [active]);

  return { step: steps[index], index, total: steps.length };
}
