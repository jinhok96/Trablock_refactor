import { ReturnFetchDefaultOptions } from 'return-fetch';

import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import { ENV } from '@/libs/constants/env';

const options: ReturnFetchDefaultOptions = {
  baseUrl: ENV.API_BASE_URL
};

export const fetchJsonDefault = returnFetchJson(options);
