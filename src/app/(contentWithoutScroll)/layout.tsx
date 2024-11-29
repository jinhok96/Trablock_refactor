import { ReactNode } from 'react';

import Gnb from '@/components/features/gnb/Gnb';

type ContentLayoutProps = {
  children: ReactNode;
};

export default function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <>
      <header className="z-10">
        <Gnb widthMaxFull />
      </header>
      <main className="flex grow">{children}</main>
    </>
  );
}
