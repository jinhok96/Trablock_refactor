import { ReactNode } from 'react';

type SearchPageLayoutProps = {
  children: ReactNode;
};

export default function SearchPageLayout({ children }: SearchPageLayoutProps) {
  return (
    <div className="px-layout mt-7 md:mt-10">
      <div className="m-auto max-w-screen-xl">{children}</div>
    </div>
  );
}
