import { HTMLAttributes, ReactNode } from 'react';

import Footer from '@/components/features/footer/Footer';
import Gnb from '@/components/features/gnb/Gnb';

type DashboardLayoutProps = HTMLAttributes<ReactNode>;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <header className="border-b-1-inner bg-white-01">
        <Gnb />
      </header>
      <main className="flex-grow">{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
