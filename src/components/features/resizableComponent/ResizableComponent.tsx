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
  const [startSize, setStartSize] = useState(0);
  const [startPosition, setStartPosition] = useState(0);
  const [minSizePx, setMinSizePx] = useState(0);
  const [maxSizePx, setMaxSizePx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const resizerRef = useRef<HTMLButtonElement>(null);

  const updateSizes = useCallback(() => {
    setMinSizePx(calculateSize(minSize, isHorizontal));
    setMaxSizePx(calculateSize(maxSize, isHorizontal));
    const initialSizePx = calculateSize(initialSize, isHorizontal);
    setSize(initialSizePx);
  }, [calculateSize, initialSize, minSize, maxSize]);

  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
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

  const handleDragMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!resizerRef.current) return;

      if (isHorizontal) {
        const newSize = startSize + (clientX - startPosition);
        if (newSize >= minSizePx && newSize <= maxSizePx) {
          setSize(newSize);
        }
      } else {
        const newSize = startSize - (clientY - startPosition);
        if (newSize >= minSizePx && newSize <= maxSizePx) {
          setSize(newSize);
        }
      }
    },
    [isHorizontal, minSizePx, maxSizePx, startSize, startPosition]
  );

  const handleDragMouseMove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      handleDragMove(e.clientX, e.clientY);
    },
    [handleDragMove]
  );

  const handleDragTouchMove = useCallback(
    (e: TouchEvent) => {
      const touch = e.touches[0];
      handleDragMove(touch.clientX, touch.clientY);
    },
    [handleDragMove]
  );

  const handleDragEnd = () => {
    setIsDragging(false);
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
      document.addEventListener('touchend', handleDragEnd);
    } else {
      document.removeEventListener('mousemove', handleDragMouseMove);
      document.removeEventListener('touchmove', handleDragTouchMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleDragMouseMove);
      document.removeEventListener('touchmove', handleDragTouchMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMouseMove, handleDragTouchMove]);

  return (
    <div className={`relative flex grow ${className}`}>
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
        className={`absolute bottom-0 left-0 flex bg-white-01 shadow-modal ${isHorizontal ? `top-0 pr-5` : `right-0 rounded-t-2xl pt-7 h-[${size}px]`} `}
        style={{ width: isHorizontal ? size + 'px' : 'auto', height: isHorizontal ? 'auto' : size + 'px' }}
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