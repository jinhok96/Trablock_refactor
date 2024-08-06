import React from 'react';

import localFont from 'next/font/local';
import { Metadata } from 'next/types';

import ReactQueryProvider from '@/apis/providers/ReactQueryProvider';
import { DropdownProvider } from '@/contexts/DropdownContext';
import { LoginContextProvider } from '@/contexts/LoginContext';
import ModalProvider from '@/contexts/ModalProvider';
import { PasswordFindProvider } from '@/contexts/passwordFindContext';

import '@/styles/globals.css';
import 'react-day-picker/dist/style.css';

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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/icons/favicon.ico" />
      </head>
      <body className={pretendard.className}>
        <PasswordFindProvider>
          <LoginContextProvider>
            <DropdownProvider>
              <ReactQueryProvider>
                <ModalProvider>{children}</ModalProvider>
                <div id="modal-root" />
              </ReactQueryProvider>
            </DropdownProvider>
          </LoginContextProvider>
        </PasswordFindProvider>
      </body>
    </html>
  );
}
