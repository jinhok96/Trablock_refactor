import { useSearchParams as useOriginSearchParams } from 'next/navigation';

export default function useSearchParams() {
  const params = useOriginSearchParams();

  const updateQuery = (name: string, value: string) => {
    const current = new URLSearchParams(Array.from(params.entries()));
    current.set(name, value);

    return current.toString();
  };

  return { ...params, updateQuery };
}
