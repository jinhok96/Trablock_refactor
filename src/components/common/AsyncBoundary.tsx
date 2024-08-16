import { Component, FunctionComponent, HTMLAttributes, ReactElement, ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface AsyncBoundaryProps extends HTMLAttributes<ReactNode> {
  errorFallback?: ReactElement<unknown, string | typeof Component | FunctionComponent> | null;
  loadingFallback?: ReactNode;
}

export default function AsyncBoundary({ errorFallback = null, loadingFallback = null, children }: AsyncBoundaryProps) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
