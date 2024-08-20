export const VALIDATE = {
  LOGIN: {
    username: {
      required: '이메일을 입력해 주세요.'
    },
    password: {
      required: '비밀번호를 입력해 주세요.'
    }
  },
  JOIN: {
    nickname: {
      required: '사용할 닉네임을 입력하세요'
    },
    username: {
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: '올바른 이메일 주소가 아닙니다.'
      },
      required: '이메일을 입력해 주세요.',
      submit: '이메일을 확인해 주세요.'
    },
    password: {
      pattern: {
        value: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/,
        message: '최소 한 개 이상의 특수문자를 포함해주세요.'
      },
      minLength: {
        value: 8,
        message: '비밀번호는 8자리 이상이어야 합니다.'
      },
      required: '비밀번호를 입력해 주세요.'
    },
    pw_answer: {
      required: '답변을 입력해 주세요'
    }
  }
};
