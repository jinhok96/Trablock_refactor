import Button from '@/components/common/buttons/Button';
import Modal, { CustomModalProps } from '@/components/modals/Modal';
import CopySvg from '@/icons/copy.svg';
import KakaoSvg from '@/icons/kakao.svg';
import { COLORS } from '@/libs/constants/colors';
import { EXTERNAL_URLS } from '@/libs/constants/externalUrls';
import useLoadKakaoJsSdkScript from '@/libs/hooks/useLoadKakaoJsSdkScript';
import useToast from '@/libs/hooks/useToast';

export interface ShareLinkModalProps extends CustomModalProps {
  onSubmit: () => void;
  title: string;
  description: string;
  imageUrl?: string;
}

export default function ShareLinkModal({ onSubmit, title, description, imageUrl, ...props }: ShareLinkModalProps) {
  const { isLoaded } = useLoadKakaoJsSdkScript();
  const { showToast } = useToast();

  const currentLink = window.location.href;

  const handleCopyLinkButtonClick = () => {
    navigator.clipboard.writeText(currentLink);
    if (onSubmit) onSubmit();
    showToast('링크 복사 성공!', 'success');
  };

  const handleShareKakaoButtonClick = async () => {
    if (!isLoaded) return;
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl: imageUrl || EXTERNAL_URLS.KAKAO_SHARE_DEFAULT_IMAGE,
        link: {
          mobileWebUrl: currentLink,
          webUrl: currentLink
        }
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: currentLink,
            webUrl: currentLink
          }
        }
      ]
    });

    onSubmit();
  };

  return (
    <Modal {...props}>
      <p className="modal-h1 mx-4 mb-5 mt-2 text-center leading-normal md:mx-2 md:mt-0">공유하기</p>
      <div className="flex-col-center">
        <div className="flex-row-center gap-8">
          <div>
            <Button onClick={handleCopyLinkButtonClick} className="btn-outline size-14 rounded-full p-3">
              <CopySvg color={COLORS.BLACK_01} />
            </Button>
            <Button onClick={handleCopyLinkButtonClick} className="font-caption-2 w-full pt-1 text-center text-gray-01">
              링크 복사
            </Button>
          </div>
          <div>
            <Button onClick={handleShareKakaoButtonClick} className="btn-outline size-14 rounded-full">
              <KakaoSvg />
            </Button>
            <Button
              onClick={handleShareKakaoButtonClick}
              className="font-caption-2 w-full pt-1 text-center text-gray-01"
            >
              카카오톡
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
