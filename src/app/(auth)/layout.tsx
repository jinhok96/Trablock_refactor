import { HTMLAttributes, ReactNode } from 'react';

type AuthLayoutProps = HTMLAttributes<ReactNode>;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <main className="px-layout m-auto mb-14 mt-[7.5rem] max-w-[22.5rem]">{children}</main>
    </>
  );
}
