import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

function useIntersectingState<T extends Element>(): [boolean, RefObject<T>];

function useIntersectingState<T extends Element>(initialState: null): [boolean | null, RefObject<T>];

function useIntersectingState<T extends Element>(initialState?: null): [boolean | (boolean | null), RefObject<T>] {
  const [isIntersecting, setIsIntersecting] = useState(initialState === null ? null : false);
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

  return [isIntersecting, ref];
}

export default useIntersectingState;
