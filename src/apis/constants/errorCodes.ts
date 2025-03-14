export const DEFAULT_ERROR_MESSAGE = '예상치 못한 문제가 발생했습니다.';

/**
 * 백엔드 Error Code 메세지 변환
 */
export const ERROR_CODES: { [key: number]: string } = {
  // 회원가입
  1000: '개인정보 수집에 동의해주세요.',
  1001: '이미 존재하는 이메일입니다.',
  1002: '중복된 닉네임입니다.',

  // 로그인
  1003: '가입한 이메일을 찾을 수 없습니다.',
  1004: '잘못된 비밀번호입니다.',

  1010: '사용자를 찾을 수 없습니다.',

  // 토큰 관련
  2000: '유효하지 않은 액세스 토큰입니다.',
  2001: '만료된 액세스 토큰입니다.',
  2002: '액세스 토큰이 존재하지 않습니다.',
  2003: '액세스 토큰 관련 알 수 없는 에러로 인증에 실패했습니다.',
  2004: '유효하지 않은 리프레시 토큰입니다.',
  2005: '만료되지 않은 액세스 토큰입니다.',
  2008: '만료된 리프레시 토큰입니다. 다시 로그인해주세요.',
  2009: '리프레시 토큰 관련 알 수 없는 에러가 발생했습니다.',

  // 비밀번호 관련
  2010: '유효하지 않은 질문입니다.',
  2011: '유효하지 않은 이메일입니다.',
  2012: '올바르지 않은 답변입니다.',

  // 유저 관련
  3000: '존재하지 않는 사용자입니다.',
  3001: '중복된 닉네임입니다.',

  // 후기 관련
  4000: '본인의 후기가 아닙니다.',
  4001: '유효하지 않은 여행 계획입니다.',
  4002: '유효하지 않은 후기입니다.',
  4003: '각 여행 계획에 대한 후기는 한 개만 작성할 수 있습니다.',
  4040: '유효하지 않은 후기입니다.',
  4050: '유효하지 않은 여행 계획입니다.',
  4051: '여행 계획 작성자만 해당 여행 계획의 후기를 작성할 수 있습니다.',
  4052: '각 여행 계획에 대한 후기는 한 개만 작성할 수 있습니다.',
  4053: '상세 일정 작성 후 후기 작성이 가능합니다.',
  4060: '유효하지 않은 사용자입니다.',

  // 후기 좋아요
  4100: '유효하지 않은 후기입니다.',

  // 댓글 관련
  5000: '본인의 댓글이 아닙니다.',
  5001: '유효하지 않은 후기입니다.',
  5002: '유효하지 않은 댓글입니다.',
  5040: '유효하지 않은 후기입니다.',

  // 댓글 좋아요
  5100: '유효하지 않은 댓글입니다.',

  // 일정 상세 관련
  10002: '올바르지 않은 일정이 포함되어 있습니다.',
  10010: '유효하지 않은 여행 계획입니다.',
  10012: '유효하지 않은 일정입니다.',
  10020: '유효하지 않은 여행 계획입니다.',
  10040: '유효하지 않은 여행 계획입니다.',
  10041: '해당 여행 계획에 접근 권한 없습니다.',

  // 아티클 관련
  6000: '존재 하지 않는 여행 계획입니다.',
  6001: '본인의 여행 계획이 아닙니다.',

  // Style 관련
  7000: '유효하지 않은 여행 스타일입니다.',

  // Companion 관련
  8000: '유효하지 않은 여행 누구와입니다.',

  // 북마크 관련
  9000: '존재 하지 않는 북마크입니다.',

  // 기타 에러
  9404: '올바르지 않은 요청입니다.',
  9405: '올바른 JSON 형식이 아닙니다.',
  9406: '요청 속성이 비어 있어 사용자 식별 정보를 확인할 수 없습니다.',
  9407: '요청 속성에 사용자 식별 정보가 존재하지 않습니다.',
  9408: '파일을 보내지 않았습니다.',
  9997: '파일 업로드에 실패했습니다.',
  9998: '예상치 못한 문제가 발생했습니다.',
  9999: '내부 서버 오류가 발생했습니다.',

  // 파일 업로드 관련
  100001: '파일이 비어 있습니다.',
  100002: '파일 이름이 비어 있습니다.',
  100003: '파일 크기가 1byte 이상이어야 합니다.',
  100004: '파일 형식이 존재하지 않습니다. 올바른 파일을 업로드 해주세요.',
  100005: '지원하지 않는 파일 형식입니다. (지원 형식: .png, .jpg, .jpeg, .webp, .avif)',
  100006: '이미지 파일 리사이징 혹은 압축 실패하였습니다.',
  110001: '이미지 파일 리사이징 혹은 압축 실패하였습니다.',
  110002: '이미지 파일의 크기를 지원하지 않습니다. 더 작은 크기의 이미지 파일을 업로드 해주세요. (5MB 미만 권장)'
};
