import returnFetch, { FetchArgs, ReturnFetchDefaultOptions } from 'return-fetch';

type RequestInit = Omit<NonNullable<FetchArgs[1]>, 'body'> & { body?: BodyInit | object };

export type ResponseGenericBody<T> = Omit<Awaited<ReturnType<typeof fetch>>, keyof Body | 'clone'> & {
  body: T;
};

const parseJsonSafely = (text: string): object | string => {
  try {
    return JSON.parse(text);
  } catch (e) {
    if ((e as Error).name !== 'SyntaxError') throw e;
    return text.trim();
  }
};

const createRequestBody = (body?: BodyInit | object): BodyInit | null | undefined => {
  if (body === null || body === undefined) return body;

  // string
  if (typeof body === 'string') return body;

  // FormData
  if (body instanceof FormData) return body;

  // URLSearchParams
  if (body instanceof URLSearchParams) return body;

  // Blob
  if (body instanceof Blob) return body;

  // ArrayBuffer, ArrayBufferView
  if (body instanceof ArrayBuffer || ArrayBuffer.isView(body)) return body;

  // ReadableStream
  if (body instanceof ReadableStream) return body;

  // object
  if (typeof body === 'object') return JSON.stringify(body);

  throw new TypeError(
    'Unsupported body type. Body must be a string, Blob, ArrayBuffer, TypedArray, DataView, FormData, URLSearchParams, ReadableStream or plain object'
  );
};

const getHeaderValue = (headers: HeadersInit | undefined, key: string): string | undefined => {
  if (!headers) return undefined;

  // Headers
  if (headers instanceof Headers) return headers.get(key) || undefined;

  // [string, string][]
  if (Array.isArray(headers)) {
    const header = headers.find(([k]) => k.toLowerCase() === key.toLowerCase());
    return header?.[1];
  }

  // Record<string, string>, 대소문자 구분 없이 검색
  const headerKey = Object.keys(headers).find((k) => k.toLowerCase() === key.toLowerCase());
  return headerKey ? headers[headerKey] : undefined;
};

const getContentTypeForBody = (body?: BodyInit | null): string | undefined => {
  if (body === null || body === undefined) return undefined;

  // FormData
  if (body instanceof FormData) return undefined;

  // URLSearchParams
  if (body instanceof URLSearchParams) return 'application/x-www-form-urlencoded';

  // Blob
  if (body instanceof Blob) return body.type || 'application/octet-stream';

  // ArrayBuffer, ArrayBufferView
  if (body instanceof ArrayBuffer || ArrayBuffer.isView(body)) return 'application/octet-stream';

  // ReadableStream
  if (body instanceof ReadableStream) {
    return 'application/octet-stream';
  }

  // string
  if (typeof body === 'string') {
    try {
      parseJsonSafely(body);
      return 'application/json';
    } catch {
      return 'text/plain';
    }
  }

  return 'application/json';
};

const createHeaders = (baseHeaders: HeadersInit = {}, baseBody?: BodyInit | null): HeadersInit => {
  const contentType = getHeaderValue(baseHeaders, 'Content-Type');
  const contentTypeForBody = getContentTypeForBody(baseBody);

  // 기존 헤더를 객체로 변환
  const headers: Record<string, string> = {
    ...Object.fromEntries(
      baseHeaders instanceof Headers
        ? Array.from(baseHeaders.entries())
        : Array.isArray(baseHeaders)
          ? baseHeaders
          : Object.entries(baseHeaders)
    )
  };

  // Content-Type이 명시적으로 설정되지 않은 경우에만 자동 설정
  if (!contentType && contentTypeForBody) headers['Content-Type'] = contentTypeForBody;

  return headers;
};

const handleResponseBody = async (response: Response) => {
  const contentType = response.headers.get('Content-Type');

  try {
    // Json
    if (contentType?.includes('application/json')) return await response.json();

    // Blob
    if (
      contentType?.includes('application/octet-stream') ||
      contentType?.includes('application/pdf') ||
      contentType?.includes('image/')
    )
      return await response.blob();

    // Text
    if (contentType?.includes('text/')) return await response.text();

    // FormData
    if (contentType?.includes('multipart/form-data')) return await response.formData();

    // ArrayBuffer
    if (contentType?.includes('application/arraybuffer')) return await response.arrayBuffer();

    // 기본값 text
    return await response.text();
  } catch (e) {
    console.error('Response parsing error:', e);
    throw new Error('Failed to parse response');
  }
};

const ApiReturnFetch = (method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', args?: ReturnFetchDefaultOptions) => {
  const fetch = returnFetch(args);

  return async <T>(url: FetchArgs[0], init?: RequestInit): Promise<ResponseGenericBody<T>> => {
    const body: BodyInit | null | undefined = createRequestBody(init?.body);
    const headers: HeadersInit = createHeaders({ ...args?.headers, ...init?.headers }, body);

    const response = await fetch(url, {
      ...init,
      method,
      body,
      headers
    });

    const responseBody = (await handleResponseBody(response)) as T;

    return {
      headers: response.headers,
      ok: response.ok,
      redirected: response.redirected,
      status: response.status,
      statusText: response.statusText,
      type: response.type,
      url: response.url,
      body: responseBody
    };
  };
};

const httpClient = (args?: ReturnFetchDefaultOptions) => ({
  get: ApiReturnFetch('GET', args),
  post: ApiReturnFetch('POST', args),
  put: ApiReturnFetch('PUT', args),
  patch: ApiReturnFetch('PATCH', args),
  delete: ApiReturnFetch('DELETE', args)
});

export default httpClient;
