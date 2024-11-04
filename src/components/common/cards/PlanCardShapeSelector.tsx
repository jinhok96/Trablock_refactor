import Button from '@/components/common/buttons/Button';
import { PlanCardShape } from '@/components/common/cards/PlanCard';
import LayoutBarSvg from '@/icons/layout-bar.svg';
import LayoutCardSvg from '@/icons/layout-card.svg';
import { COLORS } from '@/libs/constants/colors';
import { LOCAL_STORAGE } from '@/libs/constants/localStorage';

type PlanCardShapeSelectorProps = {
  planCardShape: PlanCardShape;
  onChangePlanCardShape: (shape: PlanCardShape) => void;
};

export default function PlanCardShapeSelector({ planCardShape, onChangePlanCardShape }: PlanCardShapeSelectorProps) {
  const handleChangePlanCardShape = (shape: PlanCardShape) => {
    onChangePlanCardShape(shape);
    localStorage.setItem(LOCAL_STORAGE.PLAN_CARD_SHAPE, shape);
  };

  return (
    <div className="flex-row-center mb-1.5 gap-2 max-md:hidden md:mb-2">
      <Button className="size-6" onClick={() => handleChangePlanCardShape('card')}>
        <div className={`size-full ${planCardShape !== 'card' && 'hidden'}`}>
          <LayoutCardSvg color={COLORS.BLACK_03} />
        </div>
        <div className={`size-full ${planCardShape == 'card' && 'hidden'}`}>
          <LayoutCardSvg color={COLORS.GRAY_02} />
        </div>
      </Button>
      <div className="h-6 border-r border-gray-02" />
      <Button className="size-6" onClick={() => handleChangePlanCardShape('bar')}>
        <div className={`size-full ${planCardShape !== 'bar' && 'hidden'}`}>
          <LayoutBarSvg color={COLORS.BLACK_03} />
        </div>
        <div className={`size-full ${planCardShape == 'bar' && 'hidden'}`}>
          <LayoutBarSvg color={COLORS.GRAY_02} />
        </div>
      </Button>
    </div>
  );
}
