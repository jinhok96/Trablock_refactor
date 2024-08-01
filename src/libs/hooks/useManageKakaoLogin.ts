import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { usePostCodeReturnKakaoToken, usePostReturnKakaoUserData } from '@/apis/services/kakao/useService';
import { PostOAuthPayload } from '@/apis/services/oAuth/type';
import { usePostOAuth } from '@/apis/services/oAuth/useService';
import { APP_URLS } from '@/libs/constants/appUrls';

export default function useManageKakaoLogin() {
  const router = useRouter();
  const params = useSearchParams();
  const kakaoParams = {
    status: params.get('status'),
    code: params.get('code'),
    error: params.get('error'),
    errorDescription: params.get('error-description')
  };

  const { mutate: mutateCodeReturnKakaoToken } = usePostCodeReturnKakaoToken();
  const { mutate: mutateReturnKakaoUserData } = usePostReturnKakaoUserData();
  const { mutate: mutateOAuth } = usePostOAuth();

  useEffect(() => {
    if (!kakaoParams.code) return;
    mutateCodeReturnKakaoToken(kakaoParams.code, {
      onSuccess: () => {
        mutateReturnKakaoUserData(void 0, {
          onSuccess: (response) => {
            const payload: PostOAuthPayload = {
              profile_nickname: response?.kakao_account?.profile?.nickname || '',
              profile_img_url: response?.kakao_account?.profile?.profile_image_url || '',
              account_email: response?.kakao_account?.email || '',
              is_agreement: true
            };
            mutateOAuth(payload, {
              onSuccess: () => {
                router.push(APP_URLS.HOME);
              }
            });
          }
        });
      }
    });
  }, [kakaoParams.code]);
}
