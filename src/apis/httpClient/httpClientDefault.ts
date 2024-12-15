import { ReturnFetchDefaultOptions } from 'return-fetch';

import httpClient from '@/apis/httpClient/httpClient';
import { ENV } from '@/libs/constants/env';

const options: ReturnFetchDefaultOptions = {
  baseUrl: ENV.API_BASE_URL
};

export const httpClientDefault = httpClient(options);
