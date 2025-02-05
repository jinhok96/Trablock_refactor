import ButtonWithLoading, { ButtonWithLoadingProps } from '@/components/common/buttons/ButtonWithLoading';
import ConditionalRender from '@/components/common/ConditionalRender';
import BookmarkSvg from '@/icons/bookmark.svg';
import { COLORS } from '@/libs/constants/colors';

export interface BookmarkButtonProps
  extends Omit<ButtonWithLoadingProps, 'disabledClassName' | 'loadingIndicatorSize' | 'loadingIndicatorColor'> {
  containerClassName?: string;
  isBookmarked?: boolean;
}

export default function BookmarkButton({
  containerClassName,
  className,
  isBookmarked,
  onClick,
  isLoading,
  ...restButtonWithLoadingProps
}: BookmarkButtonProps) {
  return (
    <div className={containerClassName}>
      <ButtonWithLoading
        {...restButtonWithLoadingProps}
        className={className}
        disabledClassName="bg-none border-none"
        onClick={onClick}
        isLoading={isLoading}
        loadingIndicatorColor={COLORS.GRAY_01}
        loadingIndicatorSize="100%"
      >
        <ConditionalRender condition={!isBookmarked}>
          <div className="size-full">
            <BookmarkSvg color="transparent" stroke={COLORS.GRAY_01} />
          </div>
        </ConditionalRender>
        <ConditionalRender condition={isBookmarked}>
          <div className="size-full">
            <BookmarkSvg color={COLORS.POINT} stroke={COLORS.POINT} />
          </div>
        </ConditionalRender>
      </ButtonWithLoading>
    </div>
  );
}
