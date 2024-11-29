import { useContext } from 'react';

import {
  PlanCardShape,
  PlanCardShapeDispatchContext,
  PlanCardShapeStateContext
} from '@/libs/contexts/PlanCardShapeContext';

export default function useContextPlanCardShape() {
  const shape = useContext(PlanCardShapeStateContext);
  const { change } = useContext(PlanCardShapeDispatchContext);

  const changeShape = async (shape: PlanCardShape) => {
    await change(shape);
  };

  return { shape, changeShape };
}
