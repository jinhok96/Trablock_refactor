// 숫자에 콤마를 추가하는 함수
export const formatNumberAddCommas = (value: number | string | null) => {
  if (!value || value === '0') return '0';

  const valueString = typeof value === 'string' ? value : value.toString();

  // 숫자 이외의 문자 제거
  const integer = valueString.replace(/[^\d]|^0+(?!$)/g, '') || '0';
  if (Number(integer) === 0) return '0';

  // 정수 부분에 세 자리마다 콤마를 추가
  const formattedInt = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return formattedInt;
};

// 콤마를 포함한 숫자 문자열을 number로 변경하는 함수
export const formatNumberRemoveCommas = (value: string) => {
  const cleanNum = value.replace(/,/g, '');
  const parsedNumber = parseFloat(cleanNum);

  // 정수이거나 소수점 이하가 모두 0인 경우 소수점 이하 제거
  if (Number.isInteger(parsedNumber) || cleanNum.match(/\.0+$/)) {
    return parseInt(cleanNum, 10);
  }
  return parsedNumber;
};
