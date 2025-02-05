import { ReactNode } from 'react';

import { Category } from '@/apis/types/common';
import ConditionalRender from '@/components/common/ConditionalRender';

type BadgeType = Category | '해시태그' | '태그';

const BADGE_STYLE: {
  [key in BadgeType]: string;
} = {
  숙소: 'bg-block-pink-02 text-block-pink-01',
  식당: 'bg-block-orange-02 text-block-orange-01',
  교통: 'bg-primary-02 text-primary-01',
  액티비티: 'bg-block-green-02 text-block-green-01',
  관광지: 'bg-block-purple-02 text-block-purple-01',
  기타: 'bg-secondary-02 text-secondary-01',
  해시태그: 'bg-secondary-02 text-secondary-01',
  태그: 'bg-secondary-02 text-secondary-01'
};

type BadgeProps = {
  type: BadgeType;
  className?: string;
  children: ReactNode;
};

export default function Badge({ type, className, children }: BadgeProps) {
  return (
    <div
      className={`font-tag inline-flex h-5 items-center justify-center gap-3 rounded-md px-2 py-px ${BADGE_STYLE[type]} ${className}`}
    >
      <ConditionalRender condition={type === '해시태그'}>
        <span>#</span>
      </ConditionalRender>
      {children}
    </div>
  );
}
