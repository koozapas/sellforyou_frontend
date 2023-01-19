import { ApolloError } from "@apollo/client";

export const onApolloError = (error: ApolloError) => {
  if (error) {
    // alert(error.message);
    console.log(error.message);
  }
};

/**
 * 콤마 파싱 함수
 * @param value 숫자 혹은 숫자로 이루어진 문자
 * @param option prefix: 접두사, suffix: 접미사
 * @returns 콤마가 붙은 숫자
 */
export const formatToComma = (value: string | number, option?: { prefix?: string; suffix?: string }): string => {
  let result = value;

  switch (typeof result) {
    case "string":
      result = Number(result.replace(/[^0-9]/g, "")).toLocaleString();
      break;
    case "number":
      result = result.toLocaleString();
      break;
    default:
      result = "0";
      break;
  }

  return `${option?.prefix ?? ""}${result}${option?.suffix ?? ""}`;
};
