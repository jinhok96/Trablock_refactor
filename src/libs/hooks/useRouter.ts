import { useRouter as useOriginRouter } from 'next/navigation';

export default function useRouter() {
  const router = useOriginRouter();

  const hardPush = (href: string) => {
    const url = new URL(window.location.origin + href);
    window.location.href = url.toString();
  };

  const hardRefresh = () => {
    window.location.reload();
  };

  return { ...router, hardPush, hardRefresh };
}
