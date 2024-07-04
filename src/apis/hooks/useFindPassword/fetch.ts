import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

const options: {
  [key: string]: ReturnFetchDefaultOptions;
} = {
  postFindPassword: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
  }
};
interface PasswordFindEmailResponse {
  pw_question_id: string;
  username: string;
}
interface PasswordFindVeriResponse {
  pw_question_id: string;
  username: string;
  answer: string;
}
interface PasswordFindRenewResponse {
  username: string;
  password: string;
  pw_question_id: number;
  answer: string;
}

const fetchFindPassword = returnFetch(options.postFindPassword);

const serviceFindPassword = {
  postEmail: async (username: string): Promise<PasswordFindEmailResponse> => {
    const response = await fetchFindPassword('/api/v1/auth/pw-inquiry/email', {
      method: 'POST',
      body: JSON.stringify({ username })
    });
    if (!response.ok) {
      throw new Error('존재하지 않는 이메일');
    }

    return response.json();
  },
  postVerification: async (data: {
    username: string;
    pw_question_id: number;
    answer: string;
  }): Promise<PasswordFindVeriResponse> => {
    const response = await fetchFindPassword('/api/v1/auth/pw-inquiry/verification', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error('올바르지 않은 답변입니다.');
    }
    return response.json();
  },
  postRenewal: async (data: {
    username: string;
    password: string;
    pw_question_id: number;
    answer: string;
  }): Promise<PasswordFindRenewResponse> => {
    const response = await fetchFindPassword('/api/v1/auth/pw-inquiry/renewal', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error('network Error');
    }
    return response.json();
  }
};

export default serviceFindPassword;
