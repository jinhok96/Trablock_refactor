import { HTMLAttributes, ReactNode } from 'react';

import Gnb from '@/components/features/gnb/Gnb';

type DashboardLayoutProps = HTMLAttributes<ReactNode>;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <header className="border-b-1-inner bg-white-01">
        <Gnb />
      </header>
      <main>{children}</main>
      <footer>푸터</footer>
    </>
  );
}
