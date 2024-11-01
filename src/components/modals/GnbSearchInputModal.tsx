import { ChangeEventHandler, FormEvent, KeyboardEventHandler, useEffect, useState } from 'react';

import { usePostGooglePlacesAutocomplete } from '@/apis/services/google/places/useService';
import FormInput from '@/components/common/inputs/FormInput';
import { CityDropdownListItem } from '@/components/common/inputs/GoogleCitySearchInput.type';
import GoogleCitySearchInputDropdownItem from '@/components/common/inputs/GoogleCitySearchInputDropdownItem';
import Modal, { CustomModalProps } from '@/components/modals/Modal';
import ArrowSvg from '@/icons/arrow.svg';
import SearchSvg from '@/icons/search.svg';
import { COLORS } from '@/libs/constants/colors';
import useContextModal from '@/libs/hooks/useContextModal';

interface GnbSearchInputModalProps extends Omit<CustomModalProps, 'id' | 'mobileFullscreen' | 'hideCloseButton'> {
  keyword: string;
  value: string;
  onChange: (value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>, value: string) => void;
  handleCitySelect: (item: CityDropdownListItem) => void;
}

export default function GnbSearchInputModal({
  keyword,
  value,
  onChange,
  handleSubmit,
  handleCitySelect,
  ...modalProps
}: GnbSearchInputModalProps) {
  const [modalInputValue, setModalInputValue] = useState(value);
  const [cityList, setCityList] = useState<string[]>([]);
  const { closeModal } = useContextModal();
  const { mutate: postAutocomplete, reset: postAutocompleteReset } = usePostGooglePlacesAutocomplete();

  const handleGetCityAutocompleteList = (input: string) => {
    if (!input) return setCityList([]);

    postAutocomplete(
      {
        input,
        includedPrimaryTypes: '(cities)'
      },
      {
        onSuccess: (res) => {
          const autocompleteList = res.body.suggestions;
          if (!autocompleteList) return setCityList([]);

          const newCityList: string[] = autocompleteList.map((item) => item.placePrediction.placeId);

          if (!newCityList.length) return setCityList([]);
          setCityList(newCityList);
        }
      }
    );
  };

  const handleCitySearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setModalInputValue(value);
    onChange(value);
    handleGetCityAutocompleteList(value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = () => {
    postAutocompleteReset();
  };

  useEffect(() => {
    if (!keyword) return;
    handleGetCityAutocompleteList(keyword);
  }, [keyword]);

  return (
    <Modal {...modalProps} containerClassName="p-0" mobileFullscreen hideCloseButton>
      <div className="flex-row-center mx-5 mb-5 mt-3 gap-3">
        <ArrowSvg
          className="cursor-pointer"
          width={24}
          height={24}
          color={COLORS.BLACK_01}
          onClick={() => closeModal()}
        />
        <form className="w-full" onSubmit={(e) => handleSubmit(e, modalInputValue)}>
          <FormInput
            id="gnbSearchInputModalFormInput"
            className="font-caption-2 h-10 w-full rounded-md bg-gray-03 pl-3 text-black-02"
            value={modalInputValue}
            onChange={handleCitySearchChange}
            onKeyDown={handleKeyDown}
            buttonClassName="right-3"
            buttonChildren={<SearchSvg width={20} height={20} color={COLORS.GRAY_01} strokeWidth="1.5" />}
            buttonType="submit"
            onButtonClick={() => handleGetCityAutocompleteList(modalInputValue)}
            placeholder="여행할 도시를 입력해주세요."
            autoFocus
          />
        </form>
      </div>
      <p className={`font-caption-2 text-center text-gray-01 ${modalInputValue && 'hidden'}`}>검색 결과가 없습니다.</p>
      <ul className="mb-10">
        {cityList?.map((placeId) => (
          <GoogleCitySearchInputDropdownItem
            className="!px-5"
            iconClassName="size-[1.125rem] mr-2"
            key={placeId}
            placeId={placeId}
            handleDropdownSelect={handleCitySelect}
            icon={<SearchSvg width={18} height={18} color={COLORS.BLACK_01} />}
          />
        ))}
      </ul>
    </Modal>
  );
}
