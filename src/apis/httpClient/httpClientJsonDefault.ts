import { ReturnFetchDefaultOptions } from 'return-fetch';

import httpClientJson from '@/apis/httpClient/httpClientJson';
import { ENV } from '@/libs/constants/env';

const options: ReturnFetchDefaultOptions = {
  baseUrl: ENV.API_BASE_URL
};

export const httpClientJsonDefault = httpClientJson(options);
