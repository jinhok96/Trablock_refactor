import { CITIES } from '@/constants/mockCitiesKorean';

const selectMatchingCities = (value: string) => {
  if (CITIES[value]) {
    return CITIES[value];
  }

  return Object.values(CITIES)
    .flat()
    .filter((city) => city.includes(value));
};

export default selectMatchingCities;
