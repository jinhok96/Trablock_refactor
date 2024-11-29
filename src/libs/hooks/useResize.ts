import { useEffect, useRef, useState } from 'react';

export default function useResize() {
  const divRef = useRef<HTMLDivElement>(null);
  const [divWidth, setDivWidth] = useState(0);
  const [divHeight, setDivHeight] = useState(0);

  const updateSize = () => {
    if (!divRef.current) return;
    setDivWidth(divRef.current.clientWidth);
    setDivHeight(divRef.current.clientHeight);
  };

  useEffect(() => {
    updateSize();

    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return { divRef, divWidth, divHeight };
}
