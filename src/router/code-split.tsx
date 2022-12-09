import React from "react";
import loadable from "@loadable/component";
import Loading from "src/component/common/loading";

const fallback = {
  fallback: <Loading />,
};

export const Main = loadable(() => import("src/pages/main"), fallback);

export const UserNotice = loadable(() => import("src/pages/user/notice"), fallback);
export const UserShowNotice = loadable(() => import("src/pages/user/notice-show"), fallback);

// export const UserShowNotice = loadable(
//   () => import("src/pages/admin/customer-center/write-faq"),
//   fallback
// );

//유저 - 마켓관리
export const UserMarketInfo = loadable(
  () => import("src/pages/user/market/info"),
  fallback
);
export const UserMarketSetWord = loadable(
  () => import("src/pages/user/market/set-word"),
  fallback
);

//유저 - 상품관리
export const UserProductDelivery = loadable(
  () => import("src/pages/user/product/product-delivery"),
  fallback
);

//유저 - 상품관리
export const UserDownloads = loadable(
  () => import("src/pages/user/downloads"),
  fallback
);


//유저 - 주문관리
export const UserOrderList = loadable(
  () => import("src/pages/user/order/order-list"),
  fallback
);

//유저 - 결제관리
export const UserServicePay = loadable(
  () => import("src/pages/user/payment/service-pay"),
  fallback
);

//유저 - 결재
export const Test = loadable(
  () => import("src/pages/user/payment/Test"),
  fallback
);

//관리자 - 유저관리
export const AdminCustomer = loadable(
  () => import("src/pages/admin/customer"),
  fallback
);

//관리자 - 상품관리
export const AdminProductCollection = loadable(
  () => import("src/pages/admin/product/product-collection"),
  fallback
);
export const AdminProductDelivery = loadable(
  () => import("src/pages/admin/product/product-delivery"),
  fallback
);

//관리자 - 결제관리
export const AdminServicePay = loadable(
  () => import("src/pages/admin/payment/service-pay"),
  fallback
);

//관리자 - 고객센터
export const AdminNotice = loadable(
  () => import("src/pages/admin/customer-center/notice"),
  fallback
);
export const AdminWriteNotice = loadable(
  () => import("src/pages/admin/customer-center/write-notice"),
  fallback
);
export const AdminFaq = loadable(
  () => import("src/pages/admin/customer-center/faq"),
  fallback
);
export const AdminWriteFAQ = loadable(
  () => import("src/pages/admin/customer-center/write-faq"),
  fallback
);
export const AdminInquiry = loadable(
  () => import("src/pages/admin/customer-center/inquiry"),
  fallback
);
export const AdminInquiryDetail = loadable(
  () => import("src/pages/admin/customer-center/inquiry-detail"),
  fallback
);

//관리자 - 관리자설정
export const ManageAdmin = loadable(
  () => import("src/pages/admin/manage-admin"),
  fallback
);

//관리자 - 환경설정
export const AdminPreferences = loadable(
  () => import("src/pages/admin/preferences"),
  fallback
);

//에러 페이지
export const WrongPage = loadable(
  () => import("src/component/common/wrongApproach"),
  fallback
);
