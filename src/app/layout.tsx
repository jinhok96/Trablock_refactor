import { ReactNode } from 'react';

import localFont from 'next/font/local';
import Script from 'next/script';
import { Metadata } from 'next/types';

import ReactQueryProvider from '@/apis/providers/ReactQueryProvider';
import userProfileReaderServices from '@/apis/services/userProfile/reader/fetch';
import Toast from '@/components/common/Toast';
import { DropdownProvider } from '@/contexts/DropdownContext';
import { ENV } from '@/libs/constants/env';
import { ModalProvider } from '@/libs/contexts/ModalContext';
import { UserDataProvider, UserDataStateContextType } from '@/libs/contexts/UserDataContext';
import { getServerAuthorizationTokenHeader, getServerUserId } from '@/libs/utils/serverCookies';
import '@/styles/globals.css';
import 'react-day-picker/dist/style.css';
import 'react-toastify/dist/ReactToastify.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920'
});

export const metadata: Metadata = {
  title: '트래블록',
  description: '소중한 여행 계획, 트래블록으로 쉽고 편하게!'
};

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const userId = (await getServerUserId()) || 0;
  console.log('userId', userId);
  const headers = await getServerAuthorizationTokenHeader();
  const userProfile = await userProfileReaderServices.getUserProfile(userId, headers);
  const initUserData: UserDataStateContextType = userProfile.body.data ? { userId, ...userProfile.body.data } : null;

  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <Script
          src={ENV.KAKAO_JS_SDK_SRC}
          integrity={ENV.KAKAO_JS_SDK_INTEGRITY}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className={pretendard.className}>
        <ReactQueryProvider>
          <UserDataProvider initUserData={initUserData}>
            <DropdownProvider>
              <ModalProvider>
                <div className="m-auto flex min-h-screen flex-col">{children}</div>
                <div id="modal-root" />
                <Toast />
              </ModalProvider>
            </DropdownProvider>
          </UserDataProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
