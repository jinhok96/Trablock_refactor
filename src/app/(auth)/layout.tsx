import { HTMLAttributes, ReactNode } from 'react';

type AuthLayoutProps = HTMLAttributes<ReactNode>;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <main className="px-layout mt-[7.5rem]">{children}</main>
    </>
  );
}
