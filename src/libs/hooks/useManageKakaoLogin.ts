'use client';

import { useSearchParams } from 'next/navigation';

export default function useManageKakaoLogin() {
  const params = useSearchParams();
  const code = params.get('code');
  const errorMessage = params.get('error-description');
  const status = params.get('status');
  const error = params.get('error');
  if (code) {
    return {
      status,
      code,
      error: null,
      errorMessage: null
    };
  }
  return { status: null, code: null, error, errorMessage };
}
