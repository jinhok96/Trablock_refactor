import { DEFAULT_ERROR_MESSAGE, ERROR_CODES } from '@/apis/constants/errorCodes';

export function translateErrorCode(code?: number) {
  const statusCode = code || 0;
  const message = ERROR_CODES?.[statusCode] || DEFAULT_ERROR_MESSAGE;
  return message;
}
