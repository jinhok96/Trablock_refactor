import { APP_QUERIES } from '@/libs/constants/appPaths';

type SearchPageProps = {
  searchParams: Record<string, string>;
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const keyword = searchParams[APP_QUERIES.KEYWORD];

  return <div>{keyword}</div>;
}
