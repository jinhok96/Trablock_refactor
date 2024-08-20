import { ReturnFetchDefaultOptions } from 'return-fetch';

import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';

const options: ReturnFetchDefaultOptions = {
  baseUrl: API_URL.API_BASE_URL
};

export const fetchJsonDefault = returnFetchJson(options);
