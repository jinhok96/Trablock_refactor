import { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <main className="px-layout m-auto mb-14 mt-[7.5rem] w-full max-w-md">{children}</main>
    </>
  );
}
