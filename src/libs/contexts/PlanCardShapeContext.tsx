'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';

import { HEADERS } from '@/apis/constants/headers';
import { handleGetCookie, handleSetCookie } from '@/app/actions/cookieActions';

export type PlanCardShape = 'bar' | 'card';

export type PlanCardShapeStateContextType = PlanCardShape | null;
type PlanCardShapeDispatchContextType = {
  change: (shape: PlanCardShape) => Promise<void>;
};

export const PlanCardShapeStateContext = createContext<PlanCardShapeStateContextType>(null);
export const PlanCardShapeDispatchContext = createContext<PlanCardShapeDispatchContextType>({ change: async () => {} });

type PlanCardShapeProviderProps = {
  children: ReactNode;
  initShape: PlanCardShapeStateContextType;
};

export function PlanCardShapeProvider({ children, initShape }: PlanCardShapeProviderProps) {
  const [shape, setShape] = useState<PlanCardShapeStateContextType>(initShape);

  const change = async (shape: PlanCardShape) => {
    setShape(shape);
    await handleSetCookie(HEADERS.PLAN_CARD_SHAPE, shape);
  };

  const dispatch: PlanCardShapeDispatchContextType = { change };

  useEffect(() => {
    const getShape = async () => {
      if (initShape) return;

      const newShape = (await handleGetCookie(HEADERS.PLAN_CARD_SHAPE)) as PlanCardShapeStateContextType;

      if (!newShape) return await change('card');
      await change(newShape);
    };

    getShape();
  }, []);

  return (
    <PlanCardShapeStateContext.Provider value={shape}>
      <PlanCardShapeDispatchContext.Provider value={dispatch}>{children}</PlanCardShapeDispatchContext.Provider>
    </PlanCardShapeStateContext.Provider>
  );
}
