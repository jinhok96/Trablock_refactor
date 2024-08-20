import { ReturnFetchDefaultOptions } from 'return-fetch';

import { API_URLS } from '@/apis/constants/apiUrls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';

const options: ReturnFetchDefaultOptions = {
  baseUrl: API_URLS.API_BASE_URL
};

export const fetchJsonDefault = returnFetchJson(options);
