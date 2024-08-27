export type ChevronDirection = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';

export const CHEVRON_DIRECTION: { [key in ChevronDirection]: string } = {
  UP: 'rotate(0)',
  RIGHT: 'rotate(90)',
  DOWN: 'rotate(180)',
  LEFT: 'rotate(-90)'
};
