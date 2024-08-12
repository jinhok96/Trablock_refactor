export default function isValidRegexValue(regex?: RegExp, value?: string) {
  console.log('regex', regex);
  console.log('test', regex?.test(value || ''));
  if (!regex) return true;
  return regex.test(value || '');
}
