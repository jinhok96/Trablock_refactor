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

const bookmarkService = {
  toggleBookmark: async (articleId: number) => {
    const authToken = getAuthToken();
    const response = await fetchService(`api/v1/bookmark/${articleId}`, {
      method: 'PATCH',
      headers: {
        'authorization-token': authToken
      }
    });
    return returnData(response);
  }
};

export default bookmarkService;
