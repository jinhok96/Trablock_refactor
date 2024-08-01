import Cookies from 'js-cookie';

export default function isTokenExpired() {
  const expiresAt = Cookies.get('expires_at') || '1970-01-01T00:00:00.000Z';

  const localTime = new Date();
  const givenTime = new Date(expiresAt);

  const isTokenExpiredAnswer = localTime > givenTime;

  return isTokenExpiredAnswer;
}
