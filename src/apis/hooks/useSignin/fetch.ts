import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

import { signinProps } from '@/apis/hooks/useSignin/type';

const options: { [key: string]: ReturnFetchDefaultOptions } = {
  signin: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
  }
};

const fetchSignin = returnFetch(options.signin);

const serviceSignin = {
  postSignin: async (data: signinProps) => {
    const response = await fetchSignin('api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const responseBody = await response.json();

    if (!response.ok) {
      const errorMessage = responseBody.local_message || 'An unknown error occurred';
      throw new Error(errorMessage);
    }

    return { response, responseBody };
  }
};

export default serviceSignin;
