'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';

import { LOCAL_STORAGE } from '@/libs/constants/localStorage';

export type PlanCardShape = 'bar' | 'card';

export type PlanCardShapeStateContextType = PlanCardShape | null;
type PlanCardShapeDispatchContextType = {
  change: (shape: PlanCardShape) => void;
};

export const PlanCardShapeStateContext = createContext<PlanCardShapeStateContextType>(null);
export const PlanCardShapeDispatchContext = createContext<PlanCardShapeDispatchContextType>({ change: () => {} });

type PlanCardShapeProviderProps = {
  children: ReactNode;
};

export function PlanCardShapeProvider({ children }: PlanCardShapeProviderProps) {
  const [shape, setShape] = useState<PlanCardShape | null>(null);

  const change = (shape: PlanCardShape) => {
    setShape(shape);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const newShape = localStorage.getItem(LOCAL_STORAGE.PLAN_CARD_SHAPE) as PlanCardShape | null;

    if (!newShape) return change('card');
    change(newShape);
  }, []);

  return (
    <PlanCardShapeStateContext.Provider value={shape}>
      <PlanCardShapeDispatchContext.Provider value={{ change }}>{children}</PlanCardShapeDispatchContext.Provider>
    </PlanCardShapeStateContext.Provider>
  );
}
