import { ReactNode } from 'react';

type SearchPageLayoutProps = {
  children: ReactNode;
};

export default function SearchPageLayout({ children }: SearchPageLayoutProps) {
  return (
    <div className="px-layout">
      <div className="m-auto max-w-screen-xl">{children}</div>
    </div>
  );
}
