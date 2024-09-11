import { FieldValues, Path, RegisterOptions } from 'react-hook-form';

import { PostArticlePayload } from '@/apis/services/article/writer/type';
import {
  PostPwInquiryEmailPayload,
  PostPwInquiryRenewalPayload,
  PostPwInquiryVerificationPayload
} from '@/apis/services/pwInquiry/type';
import { PostLoginPayload } from '@/apis/services/user/authentication/type';
import { PostJoinPayload } from '@/apis/services/user/registration/type';

export type PostLoginPayloadForm = PostLoginPayload & { auto_login: boolean };
export type PostJoinPayloadForm = PostJoinPayload & {
  password_check: string;
};
export type PostPwInquiryEmailPayloadForm = PostPwInquiryEmailPayload;
export type PostPwInquiryVerificationPayloadForm = PostPwInquiryVerificationPayload;
export type PostPwInquiryRenewalPayloadForm = PostPwInquiryRenewalPayload & {
  password_check: string;
};
export type PostArticlePayloadForm = PostArticlePayload;
type Form<T extends FieldValues> = {
  [K in keyof T]: RegisterOptions<T, K & Path<T>>;
};
type VALIDATE = {
  LOGIN: Form<PostLoginPayloadForm>;
  JOIN: Form<PostJoinPayloadForm>;
  PW_INQUIRY_EMAIL: Form<PostPwInquiryEmailPayloadForm>;
  PW_INQUIRY_VERIFICATION: Form<PostPwInquiryVerificationPayloadForm>;
  PW_INQUIRY_RENEWAL: Form<PostPwInquiryRenewalPayloadForm>;
  CREATE_PLAN: Form<PostArticlePayloadForm>;
};

export const VALIDATE: VALIDATE = {
  LOGIN: {
    username: {
      required: '이메일을 입력해 주세요.',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: '올바른 이메일 형식이 아닙니다.'
      }
    },
    password: {
      required: '비밀번호를 입력해 주세요.'
    },
    auto_login: {}
  },
  JOIN: {
    nickname: {
      required: '닉네임을 입력해 주세요.',
      minLength: {
        value: 3,
        message: '닉네임은 3자리 이상이어야 합니다.'
      },
      maxLength: {
        value: 12,
        message: '닉네임은 12자리 이하여야 합니다.'
      },
      pattern: {
        value: /^[ㄱ-ㅎㅏ-ㅣ가-힣A-Za-z0-9]+$/,
        message: '닉네임은 한글, 영문, 숫자만 사용 가능합니다.'
      }
    },
    username: {
      required: '이메일을 입력해 주세요.',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: '올바른 이메일 형식이 아닙니다.'
      }
    },
    password: {
      required: '비밀번호를 입력해 주세요.',
      pattern: {
        value: /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[0-9])(?=.*[a-zA-Z])+/,
        message: '최소 한 개 이상의 영문, 숫자, 특수 문자를 모두 포함해주세요.'
      },
      minLength: {
        value: 8,
        message: '비밀번호는 8자리 이상이어야 합니다.'
      },
      maxLength: {
        value: 64,
        message: '비밀번호는 64자리 이하여야 합니다.'
      }
    },
    password_check: {
      required: '비밀번호 확인을 입력해 주세요.',
      validate: (value, { password }) => value === password || '비밀번호가 일치하지 않습니다.'
    },
    pw_question_id: {
      required: '질문을 입력해 주세요'
    },
    pw_answer: {
      required: '답변을 입력해 주세요'
    },
    is_agreement: {
      required: '약관에 동의해주세요.'
    }
  },
  PW_INQUIRY_EMAIL: {
    username: {
      required: '이메일을 입력해 주세요.',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: '올바른 이메일 형식이 아닙니다.'
      }
    }
  },
  PW_INQUIRY_VERIFICATION: {
    username: {
      required: '이메일을 입력해 주세요.',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: '올바른 이메일 형식이 아닙니다.'
      }
    },
    pw_question_id: {
      required: '질문을 입력해 주세요'
    },
    answer: {
      required: '답변을 입력해 주세요'
    }
  },
  PW_INQUIRY_RENEWAL: {
    username: {
      required: '이메일을 입력해 주세요.',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: '올바른 이메일 형식이 아닙니다.'
      }
    },
    password: {
      required: '비밀번호를 입력해 주세요.',
      pattern: {
        value: /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[0-9])(?=.*[a-zA-Z])+/,
        message: '최소 한 개 이상의 영문, 숫자, 특수 문자를 모두 포함해주세요.'
      },
      minLength: {
        value: 8,
        message: '비밀번호는 8자리 이상이어야 합니다.'
      },
      maxLength: {
        value: 64,
        message: '비밀번호는 64자리 이하여야 합니다.'
      }
    },
    password_check: {
      required: '비밀번호 확인을 입력해 주세요.',
      validate: (value, { password }) => value === password || '비밀번호가 일치하지 않습니다.'
    },
    pw_question_id: {
      required: '질문을 입력해 주세요'
    },
    answer: {
      required: '답변을 입력해 주세요'
    }
  },
  CREATE_PLAN: {
    title: {
      required: '여행 타이틀을 입력해주세요.'
    },
    locations: {
      required: '여행 장소를 선택해주세요.'
    },
    start_at: {
      required: '여행 시작일을 선택해주세요.'
    },
    end_at: {
      required: '여행 종료일을 선택해주세요.'
    },
    expense: {},
    travel_companion: {
      required: '여행 태그(누구와)를 선택해주세요.'
    },
    travel_styles: {
      required: '여행 스타일을 선택해주세요.'
    }
  }
};
