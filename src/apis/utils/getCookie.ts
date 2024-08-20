function getClientCookie(name: string): string {
  const Cookies = require('js-cookie');
  return Cookies.get(name) || '';
}

function getServerCookie(name: string): string {
  const { cookies } = require('next/headers');
  return cookies().get(name)?.value || '';
}

export function getCookie(name: string) {
  if (typeof window === 'undefined') {
    return getServerCookie(name);
  }
  return getClientCookie(name);
}
