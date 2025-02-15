import { ButtonHTMLAttributes } from 'react';

import { Category, Transport } from '@/apis/types/common';
import Badge from '@/components/common/Badge';
import ConditionalRender from '@/components/common/ConditionalRender';
import NextClientImage from '@/components/common/images/NextClientImage';
import ClockSvg from '@/icons/clock.svg';
import TransportBicycleSvg from '@/icons/transport-bicycle.svg';
import TransportCarSvg from '@/icons/transport-car.svg';
import TransportTrainSvg from '@/icons/transport-train.svg';
import TransportWalkSvg from '@/icons/transport-walk.svg';
import { COLORS } from '@/libs/constants/colors';
import { CATEGORY_COLOR } from '@/libs/constants/mapStyle';

const PLACE_PHOTO_SIZE = 92;

export interface CoreBlockProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  category: Category;
  transport?: Transport;
  index: number;
  imageUrl?: string;
  startAt: string;
  duration: string;
  memo?: string;
  hideImage?: boolean;
}

export default function CoreBlock({
  index,
  name,
  category,
  transport,
  memo,
  imageUrl,
  startAt,
  duration,
  onClick,
  hideImage,
  ...buttonProps
}: CoreBlockProps) {
  const indexStyle = {
    backgroundColor: CATEGORY_COLOR[category].bg,
    color: CATEGORY_COLOR[category].text
  };

  return (
    <button className="w-full rounded-md p-3 shadow-modal" type="button" onClick={onClick} {...buttonProps}>
      <div className="flex w-full gap-2">
        <div className={`font-tag relative size-6 flex-shrink-0 rounded-full text-center`} style={indexStyle}>
          <p className="absolute-center">{index}</p>
        </div>
        <div className="w-full">
          <div className="flex-row-center w-full justify-between gap-2">
            <div className="flex flex-col items-start overflow-hidden">
              <p className="font-tag mb-2 mt-[0.1875rem] text-gray-01">{startAt}</p>
              <Badge className="mb-[0.375rem] inline-block" type={category}>
                {category}
              </Badge>
              <p className="font-subtitle-2 mb-2 line-clamp-1">{name}</p>
              <div className="font-caption-2 flex-row-center gap-[0.125rem] text-gray-01">
                <ClockSvg width={16} height={16} color={COLORS.GRAY_01} />
                <p className="leading-none">{duration}</p>
              </div>
            </div>
            <ConditionalRender condition={!hideImage}>
              <ConditionalRender condition={!transport && !!imageUrl}>
                <NextClientImage
                  className="aspect-square w-[5.75rem] shrink-0 rounded-md"
                  src={imageUrl}
                  alt="placePhoto"
                  sizes={PLACE_PHOTO_SIZE * 1.5}
                />
              </ConditionalRender>
              <ConditionalRender condition={!!transport}>
                <div className="w-[5.75rem] shrink-0">
                  <ConditionalRender condition={transport === '자전거'}>
                    <TransportBicycleSvg color={COLORS.GRAY_01} />
                  </ConditionalRender>
                  <ConditionalRender condition={transport === '도보'}>
                    <TransportWalkSvg color={COLORS.GRAY_01} />
                  </ConditionalRender>
                  <ConditionalRender condition={transport === '자동차'}>
                    <TransportCarSvg color={COLORS.GRAY_01} />
                  </ConditionalRender>
                  <ConditionalRender condition={transport === '대중교통'}>
                    <TransportTrainSvg color={COLORS.GRAY_01} />
                  </ConditionalRender>
                </div>
              </ConditionalRender>
            </ConditionalRender>
          </div>
          <ConditionalRender condition={!!memo}>
            <p className="font-caption-2 mt-3 line-clamp-1">{memo}</p>
          </ConditionalRender>
        </div>
      </div>
    </button>
  );
}
