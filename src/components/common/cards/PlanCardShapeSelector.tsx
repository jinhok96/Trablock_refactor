import Button from '@/components/common/buttons/Button';
import LayoutBarSvg from '@/icons/layout-bar.svg';
import LayoutCardSvg from '@/icons/layout-card.svg';
import { COLORS } from '@/libs/constants/colors';
import { PlanCardShape } from '@/libs/contexts/PlanCardShapeContext';
import useContextPlanCardShape from '@/libs/hooks/useContextPlanCardShape';

export default function PlanCardShapeSelector() {
  const { shape, changeShape } = useContextPlanCardShape();

  const handleChangePlanCardShape = (shape: PlanCardShape) => {
    changeShape(shape);
  };

  if (!shape) return;

  return (
    <div className="flex-row-center gap-2 max-md:hidden">
      <Button className="size-6" onClick={() => handleChangePlanCardShape('card')}>
        <div className={`size-full ${shape !== 'card' && 'hidden'}`}>
          <LayoutCardSvg color={COLORS.BLACK_03} />
        </div>
        <div className={`size-full ${shape == 'card' && 'hidden'}`}>
          <LayoutCardSvg color={COLORS.GRAY_02} />
        </div>
      </Button>
      <div className="h-6 border-r border-gray-02" />
      <Button className="size-6" onClick={() => handleChangePlanCardShape('bar')}>
        <div className={`size-full ${shape !== 'bar' && 'hidden'}`}>
          <LayoutBarSvg color={COLORS.BLACK_03} />
        </div>
        <div className={`size-full ${shape == 'bar' && 'hidden'}`}>
          <LayoutBarSvg color={COLORS.GRAY_02} />
        </div>
      </Button>
    </div>
  );
}
