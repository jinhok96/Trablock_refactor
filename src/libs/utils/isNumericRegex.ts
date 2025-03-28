export function isNumericRegex(str: string) {
  if (!str) return false;
  return /^\d+$/.test(str);
}
