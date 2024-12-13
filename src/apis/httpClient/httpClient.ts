import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

const httpClient = (args?: ReturnFetchDefaultOptions) => ({
  get: returnFetch(args),
  post: returnFetch({ ...args, headers: { ...args?.headers, method: 'POST' } }),
  put: returnFetch({ ...args, headers: { ...args?.headers, method: 'PUT' } }),
  patch: returnFetch({ ...args, headers: { ...args?.headers, method: 'PATCH' } }),
  delete: returnFetch({ ...args, headers: { ...args?.headers, method: 'DELETE' } })
});

export default httpClient;
