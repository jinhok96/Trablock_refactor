import { HTMLAttributes, ReactNode } from 'react';

import localFont from 'next/font/local';
import { Metadata } from 'next/types';

import ReactQueryProvider from '@/apis/providers/ReactQueryProvider';
import Toast from '@/components/common/Toast';
import { DropdownProvider } from '@/contexts/DropdownContext';
import { ModalProvider } from '@/libs/contexts/ModalContextProvider';
import { PasswordFindProvider } from '@/libs/contexts/passwordFindContext';
import { UserDataProvider } from '@/libs/contexts/UserDataContextProvider';

import '@/styles/globals.css';
import 'react-day-picker/dist/style.css';
import 'react-toastify/dist/ReactToastify.css';

declare global {
  interface Window {
    Kakao: any;
  }
}

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920'
});

export const metadata: Metadata = {
  title: '트래블록',
  description: '소중한 여행 계획, 트래블록으로 쉽고 편하게!'
};

type RootLayoutProps = HTMLAttributes<ReactNode>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={pretendard.className}>
        <ReactQueryProvider>
          <PasswordFindProvider>
            <UserDataProvider>
              <DropdownProvider>
                <ModalProvider>
                  <div className="m-auto flex min-h-screen flex-col">{children}</div>
                  <div id="modal-root" />
                  <Toast />
                </ModalProvider>
              </DropdownProvider>
            </UserDataProvider>
          </PasswordFindProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
