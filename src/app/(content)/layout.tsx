import { HTMLAttributes, ReactNode } from 'react';

import Gnb from '@/components/features/gnb/Gnb';

type ContentLayoutProps = HTMLAttributes<ReactNode>;

export default function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <>
      <header className="border-b-1-inner bg-white-01">
        <Gnb />
      </header>
      <main>{children}</main>
    </>
  );
}
