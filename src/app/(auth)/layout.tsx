import { HTMLAttributes, ReactNode } from 'react';

type AuthLayoutProps = HTMLAttributes<ReactNode>;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <main className="m-auto">{children}</main>
    </>
  );
}
