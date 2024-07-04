import { redirect } from 'next/navigation';
import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

import API_URL from '@/apis/constants/url';
import getAuthToken from '@/apis/utils/getAuthToken';
import { returnData } from '@/apis/utils/utils';

const options: { [key: string]: ReturnFetchDefaultOptions } = {
  default: {
    baseUrl: API_URL.API_BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    interceptors: {
      response: async (response) => {
        const result = await response.json();
        if (!response.ok) {
          console.log('▷▶▷▶ response error', result);
          redirect('/');
        }
        return result;
      }
    }
  }
};

const fetchService = returnFetch(options.default);

const bannerService = {
  getBannerArticles: async () => {
    const authToken = getAuthToken();
    const endpoint = authToken ? '/api/v1/auth/banner/articles' : '/api/v1/banner/articles';
    const response = await fetchService(endpoint, {
      method: 'GET',
      headers: authToken ? { 'authorization-token': authToken } : {}
    });
    return returnData(response);
  }
};

export default bannerService;
