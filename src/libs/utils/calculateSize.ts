type Unit = 'px' | 'vw' | 'vh' | '%' | 'rem';

export default function calculateSize(size: string, isHorizontal: boolean): number {
  const rootRemSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const splittedSizeList = size.split(/(?=[-+])/);
  let total = 0;

  for (const item of splittedSizeList) {
    const value = parseFloat(item);
    const unit = (item.replace(/[-+]?\d*\.?\d+/, '') as Unit) || ('px' as Unit);

    if (isNaN(value)) {
      throw new Error(`Invalid size value: ${item}`);
    }

    switch (unit) {
      case 'px':
        total += value;
        break;
      case 'vw':
        total += (value / 100) * window.innerWidth;
        break;
      case 'vh':
        total += (value / 100) * window.innerHeight;
        break;
      case '%':
        total += (value / 100) * (isHorizontal ? window.innerWidth : window.innerHeight);
        break;
      case 'rem':
        total += value * rootRemSize;
        break;
      default:
        throw new Error(`지원하지 않는 계산식입니다.`);
    }
  }

  return total;
}
