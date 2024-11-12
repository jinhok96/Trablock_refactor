import { ReactNode } from 'react';

type ProfilePageLayoutProps = {
  children: ReactNode;
};

export default function ProfilePageLayout({ children }: ProfilePageLayoutProps) {
  return (
    <div className="px-layout mt-7 md:mt-10">
      <div className="m-auto max-w-screen-xl">{children}</div>
    </div>
  );
}
