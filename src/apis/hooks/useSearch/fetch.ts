import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

import API_URL from '@/apis/constants/url';
import { formatSearchDataFromResponse } from '@/apis/utils/formatSearchResultData';
import getAuthToken from '@/apis/utils/getAuthToken';

const PAGE_SIZE = 10;

const options: ReturnFetchDefaultOptions = {
  baseUrl: API_URL.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
};

const fetchService = returnFetch(options);

const searchService = {
  getSearchResults: async (keyword: string, order: string, page: number) => {
    const authToken = getAuthToken();
    const orderString = order === 'popularity' ? 'popularity' : '';
    const response = await fetchService(
      `api/v1/search/article?keyword=${keyword}&page=${page}&size=${PAGE_SIZE}&order=${orderString}`,
      {
        method: 'GET',
        headers: {
          'authorization-token': authToken
        }
      }
    );

    const rawData = await response.json();
    const formatData = formatSearchDataFromResponse(rawData);

    return formatData;
  }
};

export default searchService;
