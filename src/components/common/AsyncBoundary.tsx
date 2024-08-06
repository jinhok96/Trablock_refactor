import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface AsyncBoundaryProps {
  errorFallback?: React.ReactElement<unknown, string | typeof React.Component | React.FunctionComponent> | null;
  loadingFallback?: React.ReactNode;
  children: React.ReactNode;
}

export default function AsyncBoundary({ errorFallback = null, loadingFallback = null, children }: AsyncBoundaryProps) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
