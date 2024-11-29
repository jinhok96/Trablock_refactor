import { ChangeEventHandler, MouseEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

import { HEADERS } from '@/apis/constants/headers';
import { usePatchUserUnregistration } from '@/apis/services/user/unregistration/useService';
import { translateErrorCode } from '@/apis/utils/translateErrorCode';
import { handleDeleteCookie } from '@/app/actions/cookieActions';
import Button from '@/components/common/buttons/Button';
import ButtonWithLoading from '@/components/common/buttons/ButtonWithLoading';
import FormInput from '@/components/common/inputs/FormInput';
import Modal, { CustomModalProps } from '@/components/modals/Modal';
import { APP_URLS } from '@/libs/constants/appPaths';
import useToast from '@/libs/hooks/useToast';

export interface UserUnregistrationModalProps extends CustomModalProps {
  nickname: string;
}

export default function UserUnregistrationModal({ nickname, onRequestClose, ...props }: UserUnregistrationModalProps) {
  const router = useRouter();
  const [confirmNickname, setConfirmNickname] = useState('');
  const { showToast } = useToast();
  const { mutate: patchUserUnregistration, isPending: patchUserUnregistrationLoading } = usePatchUserUnregistration();
  const [isUnregistrationLoading, setIsUnregistrationLoading] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setConfirmNickname(e.target.value);
  };

  const handleSubmitButtonClick = (e: MouseEvent) => {
    setIsUnregistrationLoading(true);
    patchUserUnregistration(void 0, {
      onSuccess: async (res) => {
        const { data, error } = res.body;
        if (!data || error) {
          setIsUnregistrationLoading(false);
          const message = translateErrorCode(error?.code);
          return showToast(message, 'error');
        }
        await handleDeleteCookie(HEADERS.AUTHORIZATION_TOKEN);
        await handleDeleteCookie(HEADERS.REFRESH_TOKEN);
        await handleDeleteCookie(HEADERS.AUTO_LOGIN);
        setIsUnregistrationLoading(false);
        onRequestClose?.(e);
        showToast('계정 삭제 완료', 'success');
        router.push(APP_URLS.HOME);
      }
    });
  };

  return (
    <Modal
      {...props}
      className="!max-w-[26rem]"
      onRequestClose={(e) => {
        setConfirmNickname('');
        onRequestClose?.(e);
      }}
    >
      <div className="font-subtitle-2 md:font-title-4 mt-3 text-center leading-normal md:mt-0">
        <p>계정을 삭제하시겠습니까?</p>
      </div>
      <FormInput
        id="nicknameInput"
        containerClassName="mt-3 mb-5 md:mt-5 md:mb-7"
        className="text-sm focus:border-red-01 md:text-base"
        labelClassName="font-caption-2 !font-bold md:font-subtitle-2 mb-1 group-focus-within:text-red-01"
        value={confirmNickname}
        onChange={handleChange}
        placeholder={nickname}
      >
        닉네임
      </FormInput>
      <div className="flex flex-col gap-10">
        <div className="flex-row-center gap-3">
          <Button
            onClick={(e) => {
              setConfirmNickname('');
              onRequestClose?.(e);
            }}
            className="font-btn-3 md:font-btn-2 btn-outline h-12 w-full gap-x-2.5 rounded-md"
          >
            취소하기
          </Button>
          <ButtonWithLoading
            onClick={handleSubmitButtonClick}
            className="font-btn-3 md:font-btn-2 btn-red h-12 w-full gap-x-2.5 rounded-md"
            disabledClassName="btn-disabled"
            isLoading={patchUserUnregistrationLoading || isUnregistrationLoading}
            disabled={nickname !== confirmNickname}
          >
            삭제하기
          </ButtonWithLoading>
        </div>
      </div>
    </Modal>
  );
}
