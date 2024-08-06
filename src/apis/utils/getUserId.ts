import { jwtDecode } from 'jwt-decode';

import { HEADERS } from '@/apis/constants/headers';
import { getCookie } from '@/apis/utils/getHeader';

export function getUserId() {
  const token = getCookie(HEADERS.AUTHORIZATION_TOKEN);
  const decoded: { userId: number } = jwtDecode(token);
  return decoded.userId;
}
