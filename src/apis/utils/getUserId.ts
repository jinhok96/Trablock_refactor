import { decode } from 'jsonwebtoken';

import { HEADERS } from '@/apis/constants/headers';
import { getCookie } from '@/apis/utils/getCookie';

export function getUserId() {
  const token = getCookie(HEADERS.AUTHORIZATION_TOKEN);
  const decodedToken = decode(token) as { userId?: number };
  const userId = decodedToken?.userId;
  return userId || 0;
}
