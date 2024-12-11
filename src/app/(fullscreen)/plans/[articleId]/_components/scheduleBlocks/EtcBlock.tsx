import CoreBlock, { CoreBlockProps } from '@/app/(fullscreen)/plans/[articleId]/_components/scheduleBlocks/CoreBlock';

/**
 * 숙소, 관광지, 식당, 액티비티, 기타 등의 블록입니다.
 * @param name string; 이름
 * @param tag string; 태그
 * @param memo string; (optional) 메모
 * @param imageUrl string; (optional) 이미지 주소
 */
export default function EtcBlock({
  index,
  name,
  category,
  memo,
  startAt,
  duration,
  onClick,
  ...props
}: CoreBlockProps) {
  return (
    <CoreBlock
      index={index}
      name={name}
      category={category}
      memo={memo}
      startAt={startAt}
      duration={duration}
      onClick={onClick}
      {...props}
    />
  );
}
