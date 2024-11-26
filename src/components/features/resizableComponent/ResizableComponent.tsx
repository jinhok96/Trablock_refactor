import { MouseEventHandler, ReactNode, TouchEventHandler, useCallback, useEffect, useRef, useState } from 'react';

import Button from '@/components/common/buttons/Button';
import PartitionSvg from '@/icons/partition.svg';
import { COLORS } from '@/libs/constants/colors';
import calculateSize from '@/libs/utils/calculateSize';

export type Position = 'left' | 'bottom';

interface ResizableComponentProps {
  className?: string;
  childrenClassName?: string;
  isHorizontal: boolean;
  initialSize: string;
  minSize: string;
  maxSize: string;
  children: ReactNode;
  outerChildren?: ReactNode;
}

export default function ResizableComponent({
  className,
  childrenClassName,
  isHorizontal,
  initialSize,
  minSize,
  maxSize,
  children,
  outerChildren
}: ResizableComponentProps) {
  const [size, setSize] = useState(0);
  const [ratio, setRatio] = useState<number | null>(null);
  const [startSize, setStartSize] = useState(0);
  const [startPosition, setStartPosition] = useState(0);
  const [minSizePx, setMinSizePx] = useState(0);
  const [maxSizePx, setMaxSizePx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartTime, setDragStartTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLButtonElement>(null);

  // 컨테이너 크기에 따른 초기 사이즈 설정
  const updateSizes = useCallback(() => {
    if (!containerRef.current) return;

    const containerSize = isHorizontal ? containerRef.current.clientWidth : containerRef.current.clientHeight;

    setMinSizePx(calculateSize(minSize, isHorizontal));
    setMaxSizePx(calculateSize(maxSize, isHorizontal));

    if (ratio !== null) {
      // 저장된 비율이 있으면 그 비율로 크기 설정
      const newSize = containerSize * ratio;
      if (newSize >= minSizePx && newSize <= maxSizePx) {
        setSize(newSize);
      }
    } else {
      // 초기 사이즈 설정 및 비율 저장
      const initialSizePx = calculateSize(initialSize, isHorizontal);
      setSize(initialSizePx);
      const initialRatio = initialSizePx / containerSize;
      setRatio(initialRatio);
    }
  }, [ratio, isHorizontal, initialSize, minSize, maxSize]);

  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStartTime(Date.now());
    setStartSize(size);
    if (isHorizontal) return setStartPosition(clientX);
    setStartPosition(clientY);
  };

  const handleDragMouseDownStart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    handleDragStart(e.clientX, e.clientY);
  };

  const handleDragTouchStart: TouchEventHandler<HTMLButtonElement> = (e) => {
    const touch = e.touches[0];
    handleDragStart(touch.clientX, touch.clientY);
  };

  const handleClickToggleMinMax = useCallback(() => {
    if (!containerRef.current) return;

    const containerSize = isHorizontal ? containerRef.current.clientWidth : containerRef.current.clientHeight;
    const currentRatio = size / containerSize;

    let newSize;

    if (currentRatio < 0.5) {
      newSize = maxSizePx;
    } else {
      newSize = minSizePx;
    }

    setSize(newSize);
    setRatio(newSize / containerSize);
  }, [size, minSizePx, maxSizePx, isHorizontal]);

  const handleDragMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!resizerRef.current || !containerRef.current) return;

      const containerSize = isHorizontal ? containerRef.current.clientWidth : containerRef.current.clientHeight;

      let newSize;
      if (isHorizontal) {
        newSize = startSize + (clientX - startPosition);
      } else {
        newSize = startSize - (clientY - startPosition);
      }

      if (newSize >= minSizePx && newSize <= maxSizePx) {
        setSize(newSize);
        // 새로운 비율 저장
        const newRatio = newSize / containerSize;
        setRatio(newRatio);
      }
    },
    [isHorizontal, minSizePx, maxSizePx, startSize, startPosition]
  );

  const handleDragMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    handleDragMove(e.clientX, e.clientY);
  };

  const handleDragTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    handleDragMove(touch.clientX, touch.clientY);
  };

  const handleDragEnd = () => {
    const dragDuration = Date.now() - dragStartTime;
    setIsDragging(false);
    // 드래그 시간이 100ms 미만이고 마우스가 이동하지 않았다면 클릭으로 간주
    if (dragDuration < 100) handleClickToggleMinMax();
  };

  useEffect(() => {
    updateSizes();
  }, [updateSizes]);

  useEffect(() => {
    const handleResize = () => {
      updateSizes();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateSizes]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDragMouseMove);
      document.addEventListener('touchmove', handleDragTouchMove);
      document.addEventListener('mouseup', handleDragEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleDragMouseMove);
      document.removeEventListener('touchmove', handleDragTouchMove);
      document.removeEventListener('mouseup', handleDragEnd);
    };
  }, [isDragging, handleDragMouseMove, handleDragTouchMove, handleDragEnd]);

  return (
    <div ref={containerRef} className={`relative flex grow ${className}`}>
      <style>{`
        body {
          ${isDragging ? 'select-none' : 'select-auto'};
          ${isDragging ? 'touch-action: none;' : ''};
        }
      `}</style>
      {/* 외부 콘텐츠 */}
      <div className="flex grow flex-col xl:flex-row">{outerChildren}</div>
      {/* 드래그 가능한 창 */}
      <div
        className={`absolute bottom-0 left-0 flex bg-white-01 shadow-modal ${!isDragging && 'transition-[width,height]'} ${
          isHorizontal ? `top-0 pr-5` : `right-0 rounded-t-2xl pt-7`
        }`}
        style={{
          width: isHorizontal ? `${size}px` : 'auto',
          height: isHorizontal ? 'auto' : `${size}px`
        }}
      >
        {/* 내부 콘텐츠 */}
        <div className={`scrollbar flex w-full flex-col overflow-auto ${childrenClassName}`}>{children}</div>
        {/* 드래그 바 */}
        <Button
          className={`absolute top-0 !cursor-grab ${
            isHorizontal
              ? 'flex-row-center right-0 h-full w-5 cursor-ew-resize'
              : 'flex-col-center top-0 h-5 w-full cursor-ns-resize pt-2'
          } ${isDragging && '!cursor-grabbing'}`}
          onMouseDown={handleDragMouseDownStart}
          onTouchStart={handleDragTouchStart}
          ref={resizerRef}
        >
          <PartitionSvg className={`${!isHorizontal && 'hidden'}`} width={20} height={20} color={COLORS.GRAY_01} />
          <div className={`h-[0.3125rem] w-16 rounded-full bg-gray-02 ${isHorizontal && 'hidden'}`} />
        </Button>
      </div>
    </div>
  );
}
