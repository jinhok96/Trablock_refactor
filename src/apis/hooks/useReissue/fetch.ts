/* eslint-disable */
'use client';

import Cookies from 'js-cookie';
import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

const authorizationToken = Cookies.get('authorization-token');
const refreshToken = Cookies.get('refresh-token');
const headers: HeadersInit = {
  'Content-Type': 'application/json',
  ...(authorizationToken && { 'Authorization-Token': authorizationToken }),
  ...(refreshToken && { 'Refresh-Token': refreshToken })
};
const options: { [key: string]: ReturnFetchDefaultOptions } = {
  reissue: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: headers
  }
};

const fetchReissue = returnFetch(options.reissue);

const serviceReissueToken = {
  postReissueToken: async () => {
    const response = await fetchReissue('api/v1/auth/reissue-token', {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }
};
export default serviceReissueToken;
