import { ReactNode } from 'react';

export type ConditionalRenderProps = {
  condition: boolean | null | undefined;
  children: ReactNode;
};

export default function ConditionalRender({ condition, children }: ConditionalRenderProps) {
  if (condition) return children;
  return null;
}
