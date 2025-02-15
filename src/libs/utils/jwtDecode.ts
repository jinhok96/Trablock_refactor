export type BaseJwtPayload<T extends object = Record<string, never>> = T & {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
};

export type JwtPayloadValidation = {
  isValid: boolean; // 토큰 구조 검증
  isNotActive: boolean; // nbf 검증
  isExpired: boolean; // exp 검증
  error: string | null; // 에러 메세지, isValid 연동
};

export type JwtPayload<T extends object = Record<string, never>> = BaseJwtPayload<T> & JwtPayloadValidation;

export function jwtDecode<T extends object = Record<string, never>>(token: string): JwtPayload<T> {
  // 토큰이 없을 경우
  if (!token)
    return {
      isValid: false,
      isNotActive: false,
      isExpired: false,
      error: 'Token is empty.'
    } as JwtPayload<T>;

  try {
    // JWT 구조 검증
    const splittedTokenList = token.split('.');
    if (splittedTokenList.length !== 3)
      return {
        isValid: false,
        isNotActive: false,
        isExpired: false,
        error: 'Invalid token format.'
      } as JwtPayload<T>;

    // Header 검증
    try {
      const decodedHeader = JSON.parse(Buffer.from(splittedTokenList[0], 'base64').toString());
      if (!decodedHeader.alg)
        return {
          isValid: false,
          isNotActive: false,
          isExpired: false,
          error: 'Algorithm is missing in header.'
        } as JwtPayload<T>;
    } catch {
      return {
        isValid: false,
        isNotActive: false,
        isExpired: false,
        error: 'Invalid header format.'
      } as JwtPayload<T>;
    }

    // payload 디코딩
    const base64Payload = splittedTokenList[1];
    const payloadBuffer = Buffer.from(base64Payload, 'base64');
    const decodedPayload = JSON.parse(payloadBuffer.toString()) as BaseJwtPayload<T>;

    // 반환할 payload 기본값
    const payload: JwtPayload<T> = {
      ...decodedPayload,
      isValid: true,
      isNotActive: false,
      isExpired: false,
      error: null
    };

    // 시간 기반 유효성 검증
    const currentTime = Math.floor(Date.now() / 1000);

    // nbf 검사
    if (decodedPayload.nbf && currentTime < decodedPayload.nbf) payload.isNotActive = true;

    // exp 검사
    if (decodedPayload.exp && currentTime > decodedPayload.exp) payload.isExpired = true;

    // 완성된 payload 반환
    return payload;
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Token parsing failed.'
    } as JwtPayload<T>;
  }
}
