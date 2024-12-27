import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export type CookieOptions = Omit<ResponseCookie, 'name' | 'value'>;
