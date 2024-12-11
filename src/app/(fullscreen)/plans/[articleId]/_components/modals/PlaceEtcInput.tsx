import { FormEventHandler, useState } from 'react';

import Button from '@/components/common/buttons/Button';
import FormInput from '@/components/common/inputs/FormInput';

interface PlaceEtcInputProps {
  className?: string;
  onPlaceInput: (name: string) => void;
}

export default function PlaceEtcInput({ className, onPlaceInput }: PlaceEtcInputProps) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (!name) return;
    onPlaceInput(name);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    if (!name) e.preventDefault();
    handleSubmit();
  };

  return (
    <div className={`flex h-full flex-col justify-between ${className}`} style={{ maxHeight: 'calc(100% - 282px)' }}>
      <form onSubmit={handleFormSubmit}>
        <FormInput
          id="placeInput"
          containerClassName="mb-20"
          labelClassName="modal-h2 mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="장소 이름을 입력해주세요."
        >
          장소 입력
        </FormInput>
        <Button
          type="submit"
          className="btn-lg btn-solid w-full flex-shrink-0"
          disabledClassName="btn-disabled"
          disabled={!name}
        >
          완료하기
        </Button>
      </form>
    </div>
  );
}
