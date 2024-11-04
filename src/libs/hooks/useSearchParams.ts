import { useCallback } from 'react';

import { useSearchParams as useOriginSearchParams } from 'next/navigation';

export default function useSearchParams() {
  const params = useOriginSearchParams();

  const updateQuery = useCallback(
    (name: string, value: string) => {
      const current = new URLSearchParams(Array.from(params.entries()));
      current.set(name, value);

      return current.toString();
    },
    [params]
  );

  return { ...params, updateQuery };
}
