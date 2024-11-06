import { useContext } from 'react';

import { LOCAL_STORAGE } from '@/libs/constants/localStorage';
import {
  PlanCardShape,
  PlanCardShapeDispatchContext,
  PlanCardShapeStateContext
} from '@/libs/contexts/PlanCardShapeContext';

export default function useContextPlanCardShape() {
  const shape = useContext(PlanCardShapeStateContext);
  const { change } = useContext(PlanCardShapeDispatchContext);

  const changeShape = (shape: PlanCardShape) => {
    localStorage.setItem(LOCAL_STORAGE.PLAN_CARD_SHAPE, shape);
    change(shape);
  };

  return { shape, changeShape };
}
