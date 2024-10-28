import { useSearchParams } from 'next/navigation';

export default function useUpdateSearchParams() {
  const params = useSearchParams();

  const updatePath = (name: string, value: string) => {
    const currentPath = window.location.pathname;
    const currentParams = new URLSearchParams(Array.from(params.entries()));

    currentParams.set(name, value);

    const newParams = currentParams.toString();
    const query = newParams ? `?${newParams}` : '';

    return currentPath + query;
  };

  return { params, updatePath };
}
