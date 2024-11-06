import { useCallback } from 'react';

import { useRouter as useOriginRouter } from 'next/navigation';

export default function useRouter() {
  const router = useOriginRouter();

  const hardPush = useCallback(
    (href: string) => {
      const url = new URL(window.location.origin + href);
      window.location.href = url.toString();
    },
    [router]
  );

  const hardRefresh = useCallback(() => {
    window.location.reload();
  }, [router]);

  return { ...router, hardPush, hardRefresh };
}
