'use client';

import { FormEvent, KeyboardEventHandler, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { GetArticleResponse } from '@/apis/services/article/reader/type';
import {
  PostArticlePayload,
  PutArticlePayload,
  TravelCompanion,
  TravelStyle
} from '@/apis/services/article/writer/type';
import { usePostArticle, usePutArticle } from '@/apis/services/article/writer/useService';
import { translateErrorCode } from '@/apis/utils/translateErrorCode';
import PlanOverviewDatePickerInput from '@/app/(focused)/plans/overview/_components/PlanOverviewDatePickerInput';
import PlanOverviewTagInput from '@/app/(focused)/plans/overview/_components/PlanOverviewTagInput';
import { TRAVEL_COMPANION_LIST, TRAVEL_STYLE_LIST } from '@/app/(focused)/plans/overview/_constants/constants';
import Button from '@/components/common/buttons/Button';
import ButtonWithLoading from '@/components/common/buttons/ButtonWithLoading';
import NextClientImage from '@/components/common/images/NextClientImage';
import FormInput from '@/components/common/inputs/FormInput';
import GoogleCitySearchInput from '@/components/common/inputs/GoogleCitySearchInput';
import { CityDropdownListItem } from '@/components/common/inputs/GoogleCitySearchInput.type';
import Tag from '@/components/common/Tag';
import DeleteSvg from '@/icons/x-circle-black.svg?url';
import { APP_URLS } from '@/libs/constants/appPaths';
import { VALIDATE } from '@/libs/constants/validate';
import useToast from '@/libs/hooks/useToast';
import { formatDate } from '@/libs/utils/formatDate';
import { formatNumberAddCommas, formatNumberRemoveCommas } from '@/libs/utils/formatNumber';

type PlanOverviewFormProps = {
  articleId?: number;
  initialValues?: GetArticleResponse;
};

export default function PlanOverviewForm({ articleId, initialValues }: PlanOverviewFormProps) {
  const defaultValues: PostArticlePayload = {
    title: initialValues?.title || '',
    locations: initialValues?.locations || [],
    start_at: initialValues?.start_at || '',
    end_at: initialValues?.end_at || '',
    expense: formatNumberAddCommas(initialValues?.expense || '0'),
    travel_companion: initialValues?.travel_companion || TRAVEL_COMPANION_LIST[0],
    travel_styles: initialValues?.travel_styles || [TRAVEL_STYLE_LIST[0]]
  };

  const router = useRouter();
  const [googleCitySearchInputValue, setGoogleCitySearchInputValue] = useState('');
  const { mutate: postArticle, isPending: isPostArticleLoading } = usePostArticle();
  const { mutate: putArticle, isPending: isPutArticleLoading } = usePutArticle(articleId || 0);
  const { showToast } = useToast();
  const {
    register,
    getValues,
    watch,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<PostArticlePayload>({
    mode: 'onSubmit',
    defaultValues
  });

  const registerList = {
    title: register('title', VALIDATE.CREATE_PLAN.title),
    expense: register('expense', VALIDATE.CREATE_PLAN.expense)
  };

  const selectedLocationList = watch('locations');
  const selectedTravelCompanionList = [watch('travel_companion')];
  const selectedTravelStyleList = watch('travel_styles');

  const handleGoogleCitySearchInputChange = (value: string) => {
    setGoogleCitySearchInputValue(value);
  };

  const handleLocationDropdownSelect = (item: CityDropdownListItem) => {
    const { place_id, address, city } = item;
    const newLocationList = getValues('locations');
    if (newLocationList.some((location) => location.place_id === place_id)) return;
    newLocationList.push({ place_id, address, city });
    setValue('locations', newLocationList);
    clearErrors('locations');
  };

  const handleLocationTagDelete = (place_id: string) => {
    const newLocationList = getValues('locations');
    setValue(
      'locations',
      newLocationList.filter((location) => location.place_id !== place_id)
    );
  };

  const handleDateRangeChange = (range?: DateRange) => {
    if (!range) return;
    const { from, to } = range;
    if (!from || !to) return;
    setValue(
      'start_at',
      formatDate(from, { yearFormat: 'yyyy', monthFormat: 'mm', dayFormat: 'dd', parser: '-' }) || ''
    );
    setValue('end_at', formatDate(to, { yearFormat: 'yyyy', monthFormat: 'mm', dayFormat: 'dd', parser: '-' }) || '');
    clearErrors(['start_at', 'end_at']);
  };

  const handleTravelCompanionSelect = (tag: TravelCompanion) => {
    setValue('travel_companion', tag);
  };

  const handleTravelStyleSelect = (tag: TravelStyle) => {
    const travelStyleList = getValues('travel_styles');
    const isSelected = selectedTravelStyleList.some((style) => style === tag);
    if (isSelected) {
      if (selectedTravelStyleList.length === 1) return;
      return setValue(
        'travel_styles',
        travelStyleList.filter((style) => style !== tag)
      );
    }
    setValue('travel_styles', [...travelStyleList, tag]);
  };

  const handlePostForm = (data: PostArticlePayload) => {
    const expense = formatNumberRemoveCommas(data.expense || '0').toString() || '0';
    if (!articleId) {
      const payload: PostArticlePayload = { ...data, expense };
      postArticle(payload, {
        onSuccess: (res) => {
          const { data, error } = res.body;
          if (!data || error) return showToast(translateErrorCode(error?.code), 'error');
          showToast('여행 계획 생성 성공!', 'success');
          router.push(APP_URLS.PLAN_DETAIL(data.article_id));
        }
      });
      return;
    }
    const payload: PutArticlePayload = { ...data, expense };
    putArticle(payload, {
      onSuccess: (res) => {
        const { data, error } = res.body;
        if (!data || error) return showToast(translateErrorCode(error?.code), 'error');
        showToast('여행 계획 저장 성공!', 'success');
        router.push(APP_URLS.PLAN_DETAIL(articleId));
      }
    });
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = getValues();
    if (!values.locations.length) setError('locations', { message: '여행 장소를 선택해주세요.' });
    if (!values.start_at || !values.end_at) setError('start_at', { message: '여행 날짜를 선택해주세요.' });
    handleSubmit(handlePostForm)(e);
  };

  const handlePreventEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  return (
    <form className="mb-14" onSubmit={handleOnSubmit}>
      <FormInput
        id="title"
        containerClassName="mb-10"
        labelClassName="font-title-4 pb-2"
        register={registerList.title}
        message={errors.title?.message}
        error={!!errors.title?.message}
        placeholder="멋진 여행 타이틀을 작성해보세요!"
      >
        여행 타이틀
      </FormInput>
      <div className="mb-10">
        <GoogleCitySearchInput
          id="locations"
          value={googleCitySearchInputValue}
          onChange={handleGoogleCitySearchInputChange}
          placeholder="여행할 도시를 입력해주세요."
          onDropdownSelect={handleLocationDropdownSelect}
          onKeyDown={handlePreventEnter}
          selectedList={selectedLocationList}
          message={errors.locations?.message}
          error={!!errors.locations?.message}
        >
          여행 장소
        </GoogleCitySearchInput>
        <div className="mt-2">
          {selectedLocationList.map((item) => {
            return (
              <div key={item.place_id} className="inline-flex">
                <Tag type="location">
                  <div className="flex-row-center">
                    <p className="mr-1">{item.city}</p>
                    <Button className="size-4" onClick={() => handleLocationTagDelete(item.place_id)}>
                      <NextClientImage src={DeleteSvg} sizes={16} alt="deleteSvg" />
                    </Button>
                  </div>
                </Tag>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mb-10">
        <PlanOverviewDatePickerInput
          id="datePicker"
          initRange={{
            from: defaultValues.start_at ? new Date(defaultValues.start_at) : undefined,
            to: defaultValues.end_at ? new Date(defaultValues.end_at) : undefined
          }}
          onDateRangeChange={handleDateRangeChange}
          message={errors.start_at?.message}
          error={!!errors.start_at?.message}
          disabled={!!initialValues}
        />
      </div>
      <FormInput
        id="expense"
        containerClassName="mb-10"
        labelClassName="font-title-4 pb-2"
        register={registerList.expense}
        message={errors.expense?.message}
        error={!!errors.expense?.message}
        type="money"
        placeholder="여행 경비를 입력해주세요."
        buttonChildren="원"
        buttonClassName="right-4 !cursor-default"
      >
        여행 경비
      </FormInput>
      <div className="mb-10">
        <p className="font-title-4 mb-6">여행 태그</p>
        <PlanOverviewTagInput
          className="mb-4"
          list={TRAVEL_COMPANION_LIST}
          selectedList={selectedTravelCompanionList}
          onClick={handleTravelCompanionSelect}
        >
          누구와
        </PlanOverviewTagInput>
        <PlanOverviewTagInput
          list={TRAVEL_STYLE_LIST}
          selectedList={selectedTravelStyleList}
          onClick={handleTravelStyleSelect}
        >
          여행 스타일
        </PlanOverviewTagInput>
      </div>
      <ButtonWithLoading
        className="btn-solid btn-md w-full"
        type="submit"
        isLoading={isPostArticleLoading || isPutArticleLoading}
      >
        {initialValues ? '완료하기' : '일정 짜러 가기'}
      </ButtonWithLoading>
    </form>
  );
}
