export function removeQueryParams(url: string) {
  const urlObject = new URL(url);
  return urlObject.origin + urlObject.pathname;
}
