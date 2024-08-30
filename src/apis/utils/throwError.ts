import { ERROR_CODES } from '@/apis/constants/errorCodes';
import { ErrorResponse } from '@/apis/types/common';

export function throwError(error?: ErrorResponse | null) {
  if (!error) return;
  const message = ERROR_CODES?.[error.code] || '예상치 못한 문제가 발생했습니다.';
  throw new Error(message);
}
