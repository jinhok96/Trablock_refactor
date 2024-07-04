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

const fetchData = async (url: string) => {
  const authToken = getAuthToken();
  const response = await fetchService(url, {
    method: 'GET',
    headers: {
      'authorization-token': authToken
    }
  });
  return returnData(response);
};

const reviewService = {
  getReviews: async () => {
    const url = `api/v1/banner/reviews`;
    return fetchData(url);
  }
};

export default reviewService;
