import { ChangeEvent, FormEventHandler, useState } from 'react';

import {
  EtcBlockDetailData,
  OnBudgetDetailEdit,
  PlaceBlockDetailData,
  TransportBlockDetailData
} from '@/app/(fullscreen)/plans/[articleId]/_types/modalData.type';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/buttons/Button';
import FormInput from '@/components/common/inputs/FormInput';
import Modal, { CustomModalProps } from '@/components/modals/Modal';
import { formatNumberAddCommas, formatNumberRemoveCommas } from '@/libs/utils/formatNumber';

export interface BlockDetailBudgetModalProps extends CustomModalProps {
  blockData: PlaceBlockDetailData | TransportBlockDetailData | EtcBlockDetailData;
  onSubmit?: OnBudgetDetailEdit;
  isEditMode?: boolean;
  onClose: () => void;
}

// edit 모드 여부 설정해야 함
export default function BlockDetailBudgetModal({
  blockData,
  onSubmit,
  isEditMode = false,
  onClose,
  ...modalProps
}: BlockDetailBudgetModalProps) {
  const { budget, category, name } = blockData;
  const [money, setMoney] = useState(formatNumberAddCommas(budget));

  const handleMoneyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMoney(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const budget = formatNumberRemoveCommas(money).toString();
    if (onSubmit) onSubmit({ budget });
  };

  const handleSubmitButtonClick = () => {
    if (isEditMode) return;
    onClose();
  };

  return (
    <Modal {...modalProps} containerClassName={`md:w-[24rem] ${modalProps.containerClassName}`} mobileFullscreen>
      <div className="mb-10">
        <Badge type={category} className="mb-2">
          {category}
        </Badge>
        <p className="modal-h1 mb-3">{name}</p>
      </div>
      <form className="flex grow flex-col justify-between" onSubmit={handleSubmit}>
        <div className="mb-10">
          <p className="modal-h2 mb-4">비용</p>
          <FormInput
            id="blockDetailExpense"
            containerClassName={`${!isEditMode && 'hidden'}`}
            value={money}
            onChange={handleMoneyChange}
            type="money"
            buttonChildren="원"
            buttonClassName="right-4 !cursor-default"
          />
          <p className={`${isEditMode && 'hidden'}`}>{money} 원</p>
        </div>
        <Button
          type={isEditMode ? 'submit' : 'button'}
          onClick={handleSubmitButtonClick}
          className="btn-lg btn-solid w-full flex-shrink-0"
        >
          확인
        </Button>
      </form>
    </Modal>
  );
}
