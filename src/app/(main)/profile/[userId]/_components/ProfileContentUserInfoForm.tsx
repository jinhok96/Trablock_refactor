import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';

import { GetUserProfileResponse } from '@/apis/services/userProfile/reader/type';
import { usePatchEditUserProfile, usePutUserProfileImage } from '@/apis/services/userProfile/writer/useService';
import { translateErrorCode } from '@/apis/utils/translateErrorCode';
import Button from '@/components/common/buttons/Button';
import ButtonWithLoading from '@/components/common/buttons/ButtonWithLoading';
import NextClientImage from '@/components/common/images/NextClientImage';
import FileInput from '@/components/common/inputs/FileInput';
import FormInput from '@/components/common/inputs/FormInput';
import FormTextArea from '@/components/common/inputs/FormTextArea';
import Loading from '@/components/common/Loading';
import DefaultProfileSvg from '@/icons/default-profile.svg?url';
import PhotoSvg from '@/icons/photo.svg';
import { COLORS } from '@/libs/constants/colors';
import { PostUserProfilePayloadForm, VALIDATE } from '@/libs/constants/validate';
import useContextUserData from '@/libs/hooks/useContextUserData';
import useRouter from '@/libs/hooks/useRouter';
import useToast from '@/libs/hooks/useToast';

type ProfileContentUserInfoFormProps = {
  className?: string;
  userProfileData: GetUserProfileResponse;
  handleFinishUserProfileEdit: () => void;
};

export default function ProfileContentUserInfoForm({
  className,
  userProfileData,
  handleFinishUserProfileEdit
}: ProfileContentUserInfoFormProps) {
  const { name: defaultNickname, introduce: defaultIntroduce, profile_img_url: defaultProfileImage } = userProfileData;

  const router = useRouter();
  const [profileImage, setProfileImage] = useState<File | string>(defaultProfileImage);
  const { showToast } = useToast();
  const { update } = useContextUserData();
  const { mutate: putUserProfileImage, isPending: putUserProfileImageLoading } = usePutUserProfileImage();
  const { mutate: patchUserProfile, isPending: patchUserProfileLoading } = usePatchEditUserProfile();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<PostUserProfilePayloadForm>({
    defaultValues: {
      nickname: defaultNickname,
      introduce: defaultIntroduce
    }
  });

  const registerList = {
    nickname: register('nickname', VALIDATE.USER_PROFILE.nickname),
    introduce: register('introduce', VALIDATE.USER_PROFILE.introduce)
  };

  const handleProfileImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    putUserProfileImage(
      { file },
      {
        onSuccess: (res) => {
          const { data, error } = res.body;
          if (!data || error) {
            const message = translateErrorCode(error?.code);
            return showToast(message, 'error');
          }
          setProfileImage(data.profile_img_url);
        }
      }
    );
  };

  const handlePostForm = async () => {
    const values = getValues();
    patchUserProfile(values, {
      onSuccess: async (res) => {
        const { data, error } = res.body;
        if (!data || error) {
          const message = translateErrorCode(error?.code);
          return showToast(message, 'error');
        }

        await update();

        handleFinishUserProfileEdit();
        showToast('프로필 편집 성공!', 'success');
        router.refresh();
      }
    });
  };

  const handleUserProfileSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { nickname, introduce } = errors;
    const errorMessage = nickname?.message || introduce?.message;

    if (errorMessage) return showToast(errorMessage, 'error');

    handleSubmit(handlePostForm)(e);
  };

  return (
    <form className={className} onSubmit={handleUserProfileSubmit}>
      <div className="flex-row-center xl:flex-col-center">
        <div
          className={`relative mr-4 size-20 shrink-0 overflow-hidden rounded-full md:mr-6 md:size-[7.5rem] xl:mb-6 xl:mr-0 xl:size-40 ${!profileImage && 'border border-gray-02'}`}
        >
          <NextClientImage sizes={176} alt="profile" src={profileImage || DefaultProfileSvg} priority />
          <FileInput
            id="profileImage"
            className="absolute inset-0 size-full cursor-pointer bg-overlay-light"
            onChange={handleProfileImageChange}
          >
            <div className="absolute-center size-8 md:size-9 xl:size-10">
              <PhotoSvg className={`${putUserProfileImageLoading && 'hidden'}`} color={COLORS.WHITE_01} />
              <Loading visible={putUserProfileImageLoading} />
            </div>
          </FileInput>
        </div>
        <div className="w-full xl:mx-5 xl:text-center">
          <FormInput
            id="name"
            className="mb-3"
            labelClassName="font-semibold mb-1"
            register={registerList.nickname}
            placeholder="닉네임을 입력해주세요."
          >
            닉네임
          </FormInput>
          <FormTextArea
            id="introduce"
            rows={3}
            className="h-full leading-snug"
            labelClassName="font-semibold mb-1"
            {...registerList.introduce}
            placeholder="한 줄 소개를 입력해주세요."
          >
            한 줄 소개
          </FormTextArea>
        </div>
      </div>
      <div className="flex-row-center mt-3 flex w-full justify-end gap-2 xl:mt-5">
        <Button className="btn-ghost btn-sm w-20 xl:w-full" onClick={handleFinishUserProfileEdit}>
          취소
        </Button>
        <ButtonWithLoading
          className="btn-solid btn-sm w-20 xl:w-full"
          type="submit"
          loadingIndicatorColor={COLORS.WHITE_01}
          isLoading={patchUserProfileLoading}
        >
          완료하기
        </ButtonWithLoading>
      </div>
    </form>
  );
}
