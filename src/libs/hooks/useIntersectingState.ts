import { useEffect, useRef, useState } from 'react';

function useIntersectingState<T extends Element>(initialState?: boolean) {
  const [isIntersecting, setIsIntersecting] = useState(initialState || false);
  const ref = useRef<T>(null);

  const callback = ([entry]: IntersectionObserverEntry[]) => {
    setIsIntersecting(entry.isIntersecting);
  };

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(callback);

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref.current, callback]);

  return { isIntersecting, ref };
}

export default useIntersectingState;
