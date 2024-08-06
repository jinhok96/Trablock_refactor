import { ReturnFetchDefaultOptions } from 'return-fetch';

export type ReturnFetchOptions<T extends string> = { [key in T]: ReturnFetchDefaultOptions };
