import returnFetch, { FetchArgs, ReturnFetchDefaultOptions } from 'return-fetch';

// Use as a replacer of `RequestInit`
type JsonRequestInit = Omit<NonNullable<FetchArgs[1]>, 'body'> & { body?: object };

// Use as a replacer of `Response`
export type ResponseGenericBody<T> = Omit<Awaited<ReturnType<typeof fetch>>, keyof Body | 'clone'> & {
  body: T;
};

export type JsonResponse<T> = T extends object ? ResponseGenericBody<T> : ResponseGenericBody<unknown>;

// this resembles the default behavior of axios json parser
// https://github.com/axios/axios/blob/21a5ad34c4a5956d81d338059ac0dd34a19ed094/lib/defaults/index.js#L25
const parseJsonSafely = (text: string): object | string => {
  try {
    return JSON.parse(text);
  } catch (e) {
    if ((e as Error).name !== 'SyntaxError') {
      throw e;
    }

    return text.trim();
  }
};

// Write your own high order function to serialize request body and deserialize response body.
const returnFetchJson = (args?: ReturnFetchDefaultOptions) => {
  const fetch = returnFetch(args);

  return async <T>(url: FetchArgs[0], init?: JsonRequestInit): Promise<JsonResponse<T>> => {
    const response = await fetch(url, {
      ...init,
      body: init?.body && (init.body instanceof FormData ? init.body : JSON.stringify(init.body))
    });

    const body = parseJsonSafely(await response.text()) as T;

    return {
      headers: response.headers,
      ok: response.ok,
      redirected: response.redirected,
      status: response.status,
      statusText: response.statusText,
      type: response.type,
      url: response.url,
      body
    } as JsonResponse<T>;
  };
};

export default returnFetchJson;
