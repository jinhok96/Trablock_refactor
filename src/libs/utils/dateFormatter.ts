// yyyy.m.d
export const dateDotFormat = (date: Date) => `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

// yyyy-mm-dd
export const dateRequestFormat = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
};
