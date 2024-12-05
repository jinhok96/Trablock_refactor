export type JwtPayload = {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
};

export function jwtDecode<T = JwtPayload>(token: string): T | null {
  if (!token) return null;

  try {
    const base64Payload = token.split('.')[1];
    const payloadBuffer = Buffer.from(base64Payload, 'base64');
    const decodedPayload = JSON.parse(payloadBuffer.toString()) as T;
    return decodedPayload;
  } catch (error) {
    console.log('jwtDecode error', error);
  }

  return null;
}
