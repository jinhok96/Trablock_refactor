import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

import { oauthProps } from '@/apis/hooks/oauthLogin/oauth.type';

const options: {
  [key: string]: ReturnFetchDefaultOptions;
} = {
  oauth: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
  }
};

const fetchOauth = returnFetch(options.oauth);

const serviceOauth = {
  postOauthLogin: async (data: oauthProps) => {
    const response = await fetchOauth('api/v1/oauth/login', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error('error');
    }
    return response;
  }
};

export default serviceOauth;
