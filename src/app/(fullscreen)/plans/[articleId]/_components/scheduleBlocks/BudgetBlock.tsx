import { ButtonHTMLAttributes } from 'react';

import { Category } from '@/apis/types/common';
import Badge from '@/components/common/Badge';
import { formatNumberAddCommas } from '@/libs/utils/formatNumber';

export interface BudgetBlockProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  category: Category;
  money: string;
}

export default function BudgetBlock({ name, category, money, onClick, ...props }: BudgetBlockProps) {
  const formattedMoney = formatNumberAddCommas(money);

  return (
    <button className="w-full rounded-md p-4 shadow-modal" type="button" onClick={onClick} {...props}>
      <div className="flex w-full gap-2">
        {/* 각종 정보, 이미지 */}
        <div className="flex-row-center w-full justify-between gap-2">
          <div className="flex flex-col items-start">
            {/* 카테고리 */}
            <Badge className="mb-[0.375rem] inline-block" type={category}>
              {category}
            </Badge>
            {/* 장소 */}
            <p className="font-subtitle-2 mb-2 line-clamp-1">{name}</p>
            {/* 비용 */}
            <p className="font-subtitle-2 line-clamp-1 text-point">{formattedMoney}원</p>
          </div>
        </div>
      </div>
    </button>
  );
}
