import ConditionalRender from '@/components/common/ConditionalRender';
import { COLORS } from '@/libs/constants/colors';

interface LoadingProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
  visible?: boolean;
  strokeWidth?: number | string;
  radius?: number | string;
}

export default function Loading({
  className,
  width = '100%',
  height = '100%',
  color = COLORS.WHITE_01,
  visible = true,
  strokeWidth = 4,
  radius = 1
}: LoadingProps) {
  const strokeWidthNum = parseInt(String(strokeWidth));
  const viewBoxValue = strokeWidthNum + 36;
  const halfStrokeWidth = strokeWidthNum / 2;
  const processedRadius = halfStrokeWidth + parseInt(String(radius)) - 1;

  return (
    <ConditionalRender condition={visible}>
      <div
        className={`flex-row-center justify-center ${className}`}
        data-testid="tail-spin-loading"
        aria-label="tail-spin-loading"
        aria-busy="true"
        role="progressbar"
        style={{ width, height }}
      >
        <svg
          className="h-full w-full"
          viewBox={`0 0 ${viewBoxValue} ${viewBoxValue}`}
          xmlns="http://www.w3.org/2000/svg"
          data-testid="tail-spin-svg"
        >
          <defs>
            <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
              <stop stopColor={color} stopOpacity="0" offset="0%" />
              <stop stopColor={color} stopOpacity=".631" offset="63.146%" />
              <stop stopColor={color} offset="100%" />
            </linearGradient>
          </defs>
          <g className="origin-center animate-spin">
            <path
              d={`M${36 + halfStrokeWidth} ${18 + halfStrokeWidth}c0-9.94-8.06-18-18-18`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
            />
            <circle fill="#fff" cx={36 + halfStrokeWidth} cy={18 + halfStrokeWidth} r={processedRadius} />
          </g>
        </svg>
      </div>
    </ConditionalRender>
  );
}
