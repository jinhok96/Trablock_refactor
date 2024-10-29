const localitySuffixes: {
  [country: string]: string[];
} = {
  대한민국: ['특별시', '광역시', '특별자치시', '시', '군'],
  일본: ['시', '구'],
  중국: ['시', '현'],
  미국: ['시'],
  베트남: ['시']
};

export default function removeLocationSuffix(location: string, country?: string): string {
  if (!country) return location;
  const countryName = country?.split('(')[0];
  const suffix = localitySuffixes?.[countryName]?.find((suffix) => location.endsWith(suffix));
  if (!suffix) return location;
  return location.slice(0, -suffix.length).trim();
}
