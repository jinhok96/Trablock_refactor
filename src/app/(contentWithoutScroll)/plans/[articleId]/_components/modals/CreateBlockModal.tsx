/* eslint-disable no-undef */
import { useState } from 'react';

import { Category } from '@/apis/types/common';
import CreateBlockModalContent, {
  CreateBlockModalContentProps
} from '@/app/(contentWithoutScroll)/plans/[articleId]/_components/modals/CreateBlockModalContent';
import TagChipButton from '@/components/common/buttons/TagChipButton';
import Modal, { CustomModalProps } from '@/components/modals/Modal';
import { CATEGORY_LIST, DEFAULT_CATEGORY } from '@/libs/constants/modal';

export interface CreateBlockModalProps
  extends CustomModalProps,
    Pick<CreateBlockModalContentProps, 'onPlaceSelect' | 'onTransportSelect' | 'onEtcSelect'> {}

export default function CreateBlockModal({
  onPlaceSelect,
  onTransportSelect,
  onEtcSelect,
  ...modalProps
}: CreateBlockModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>(DEFAULT_CATEGORY);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  return (
    <Modal {...modalProps}>
      <p className="modal-h1 mb-[3.125rem] mt-5 text-center md:mb-[3.75rem] md:mt-0">일정 추가</p>
      <div className="mb-10">
        <div className="flex-row-center mb-3 gap-2">
          <p className="modal-h2">종류 선택</p>
          <p className="font-caption-2 text-black-03 ">1개 선택</p>
        </div>
        <div className="flex-row-center flex-wrap gap-[0.375rem]">
          {CATEGORY_LIST.map((category) => (
            <TagChipButton
              key={category}
              selected={category === selectedCategory}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </TagChipButton>
          ))}
        </div>
      </div>
      {/* 장소 검색 */}
      <CreateBlockModalContent
        category={selectedCategory}
        onPlaceSelect={onPlaceSelect}
        onTransportSelect={onTransportSelect}
        onEtcSelect={onEtcSelect}
      />
    </Modal>
  );
}
