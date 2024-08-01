import { ReturnFetchJsonDefaultOptions } from 'return-fetch-json';

export type ReturnFetchOptions<T extends string> = { [key in T]: ReturnFetchJsonDefaultOptions };
