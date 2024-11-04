import { ReactNode } from 'react';

import Footer from '@/components/features/footer/Footer';
import Gnb from '@/components/features/gnb/Gnb';

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <header className="z-10">
        <Gnb />
      </header>
      <main className="mt-7 grow md:mt-10">{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
