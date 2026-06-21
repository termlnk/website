import type { TocHeading } from '@/lib/types';
import { createContext, useContext } from 'react';

type HeadingsExtractedFn = (headings: TocHeading[]) => void;

const HeadingsContext = createContext<HeadingsExtractedFn>(() => {});

export const HeadingsProvider = HeadingsContext.Provider;

export function useHeadingsExtracted(): HeadingsExtractedFn {
  return useContext(HeadingsContext);
}
