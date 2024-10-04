import { HTMLAttributes, ReactNode } from 'react';

import Gnb from '@/components/features/gnb/Gnb';

type ContentLayoutProps = HTMLAttributes<ReactNode>;

export default function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <>
      <header className="z-10">
        <Gnb />
      </header>
      <main className="flex grow">{children}</main>
    </>
  );
}
