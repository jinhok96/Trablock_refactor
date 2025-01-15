import { useEffect, useState } from 'react';

/**
 * 미디어 쿼리를 반환하는 훅
 * @param query string; ex) 'min-width: 768px'
 * @returns boolean; query를 만족하는지 여부
 */
export default function useMediaQuery(minMax: 'min' | 'max', width: number): { isMatch: boolean; isLoaded: boolean } {
  const query = `(${minMax}-width: ${width}px)`;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsLoaded(true);

    const mediaQuery = window.matchMedia(query);
    setIsMatch(mediaQuery.matches);

    const documentChangeHandler = () => setIsMatch(mediaQuery.matches);
    mediaQuery.addEventListener('change', documentChangeHandler);
    return () => mediaQuery.removeEventListener('change', documentChangeHandler);
  }, [typeof window, query]);

  return { isMatch, isLoaded };
}
