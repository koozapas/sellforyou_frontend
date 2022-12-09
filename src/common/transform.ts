import { format } from "date-fns";
import { ApolloError } from "@apollo/client";
import { message } from "antd";
import { UserPurchaseInfo } from "src/types";
// import { OrderWhereInput } from "src/types";

export const transUtcToDate = (dateTime = ""): string => {
  return format(new Date(dateTime), "yyyy-MM-dd");
};

// export function headers(): any {
//   const accessToken = window.localStorage.getItem("celebAdminToken");
//   return {
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//   };
// }

export function transElipse(text: string, number: number) {
  if (text.length > number) {
    return text.slice(0, number) + "...";
  }
  return text;
}

export function transMoneyFormat(value = 0): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function transWONMoneyFormat(value = 0): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₩";
}
export function transCNYMoneyFormat(value = 0): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ¥";
}

export function transPhoneFormat(value: number): string {
  return value
    .toString()
    .replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
}

//쇼핑몰 컬럼
export function transShopCode(value = ""): string {
  switch (value) {
    case "A077":
      return "스마트스토어";
    case "B378":
      return "쿠팡";
    case "A112":
      return "11번가";
    case "A001":
      return "옥션";
    case "A006":
      return "G마켓";
    default:
      return "";
  }
}

export function transProductState(value = ""): string {
  switch (value) {
    case "COLLECTED":
      return "수집상품";
    case "ON_SALE":
      return "판매중";
    case "UPLOAD_WAITING":
      return "업로드 대기";
    case "UPLOAD_FAILED":
      return "업로드 실패";
    case "SELL_DONE":
      return "판매 종료";
    default:
      return "";
  }
}

export function transProductState2(value = ""): string {
  switch (value) {
    case "ALL":
      return "";
    case "AdminCollected":
      return "COLLECTED";
    case "Collected":
      return "COLLECTED";
    case "OnSale":
      return "ON_SALE";
    case "UloadWaiting":
      return "UPLOAD_WAITING";
    case "UploadFailed":
      return "UPLOAD_FAILED";
    case "SellDone":
      return "SELL_DONE";
    // default:
    //   return ''
  }
}

export const transformPurchaseInfo = (
  data: UserPurchaseInfo,
  option?: { isNeedDate?: boolean; itemDelimiter?: string }
) => {
  const isNeedDate = option?.isNeedDate ?? false;
  const itemDelimiter = option?.itemDelimiter ?? ", ";
  const levelString = data?.level === 0 ? "" : data?.level + "단계";
  const expireString = data.levelExpiredAt
    ? ` (~${format(new Date(data.levelExpiredAt), "yyyy.MM.dd HH:mm")})`
    : "";
  const additionalInfoString = [
    levelString !== "" ? levelString + (isNeedDate ? expireString : "") : null,
  ]
    .concat(
      data?.additionalInfo.map((v) => {
        const type = v.type === "IMAGE_TRANSLATE" ? "트랜져스" : "";
        const expireString = v.expiredAt
          ? ` (~${format(new Date(v.expiredAt), "yyyy.MM.dd HH:mm")})`
          : "";
        return `${type}${isNeedDate ? expireString : ""}`;
      })
    )
    .filter((v): v is string => v !== null);
  return additionalInfoString.join(itemDelimiter);
};
