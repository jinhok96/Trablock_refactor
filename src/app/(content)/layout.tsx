import { HTMLAttributes, ReactNode } from 'react';

import Gnb from '@/components/features/gnb/Gnb';

type ContentLayoutProps = HTMLAttributes<ReactNode>;

export default function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <>
      <header className="m-auto">
        <Gnb />
      </header>
      <main className="m-auto">{children}</main>
    </>
  );
}
