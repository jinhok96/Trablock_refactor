import { ReturnFetchDefaultOptions } from 'return-fetch';

export type ReturnFetchOptions<T extends string> = { [key in T]: ReturnFetchDefaultOptions };

export type HeaderTokens = {
  Authorization: string;
  'Authorization-Token': string;
  'Refresh-Token': string;
};
