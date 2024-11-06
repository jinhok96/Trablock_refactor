import { ReactNode, Suspense } from 'react';

import localFont from 'next/font/local';
import Script from 'next/script';
import { Metadata } from 'next/types';

import { HEADERS } from '@/apis/constants/headers';
import ReactQueryProvider from '@/apis/providers/ReactQueryProvider';
import userProfileReaderServices from '@/apis/services/userProfile/reader/fetch';
import Toast from '@/components/common/Toast';
import { DropdownProvider } from '@/contexts/DropdownContext';
import { ENV } from '@/libs/constants/env';
import { ModalProvider } from '@/libs/contexts/ModalContext';
import {
  PlanCardShape,
  PlanCardShapeProvider,
  PlanCardShapeStateContextType
} from '@/libs/contexts/PlanCardShapeContext';
import { UserDataProvider, UserDataStateContextType } from '@/libs/contexts/UserDataContext';
import { getServerAuthorizationTokenHeader, getServerUserId, handleGetServerCookie } from '@/libs/utils/serverCookies';
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

async function getInitUserData(): Promise<UserDataStateContextType> {
  const userId = await getServerUserId();
  const headers = await getServerAuthorizationTokenHeader();

  if (!userId || !headers['Authorization-Token']) return null;

  const { body } = await userProfileReaderServices.getUserProfile(userId, headers);
  if (!body.data) return null;

  return { userId, ...body.data };
}

async function getInitPlanCardShape(): Promise<PlanCardShapeStateContextType> {
  const shape = await handleGetServerCookie(HEADERS.PLAN_CARD_SHAPE);
  if (!shape) return null;

  return shape as PlanCardShape;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const initUserData: UserDataStateContextType = await getInitUserData();
  const initPlanCardShape: PlanCardShapeStateContextType = await getInitPlanCardShape();

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
        <Suspense>
          <ReactQueryProvider>
            <UserDataProvider initUserData={initUserData}>
              <DropdownProvider>
                <PlanCardShapeProvider initShape={initPlanCardShape}>
                  <ModalProvider>
                    <div className="m-auto flex min-h-screen flex-col">{children}</div>
                    <div id="modal-root" />
                    <Toast />
                  </ModalProvider>
                </PlanCardShapeProvider>
              </DropdownProvider>
            </UserDataProvider>
          </ReactQueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
