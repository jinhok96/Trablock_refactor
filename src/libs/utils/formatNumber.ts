// 숫자에 콤마를 추가하는 함수
export const formatNumberAddCommas = (value: number | string) => {
  const valueString = typeof value === 'string' ? value : value.toString();

  // 숫자와 소수점 이외의 문자 제거
  const cleanNum = valueString.replace(/[^\d.]/g, '');
  // 소수점이 하나만 남도록 함
  const parts = cleanNum.split('.');
  const integerPart = parts[0].replace(/^0+(?!$)/, '') || '0';
  let decimalPart = parts[1] ? `.${parts[1]}` : '';

  // 소수점 아래 숫자가 너무 많을 경우 4자리까지만 남기고 반올림
  if (decimalPart.length > 5) {
    const roundedDecimal = parseFloat(`0${decimalPart}`).toFixed(4).slice(1);
    decimalPart = roundedDecimal;
  }

  // 정수 부분에 세 자리마다 콤마를 추가
  const formattedInt = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  let formattedNumber = formattedInt + decimalPart;

  // 소수점 이하가 모두 0인 경우 제거
  formattedNumber = formattedNumber.replace(/\.0+$/, '');
  return formattedNumber;
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
