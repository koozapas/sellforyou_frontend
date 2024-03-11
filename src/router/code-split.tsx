import React from 'react';
import loadable from '@loadable/component';
import Loading from 'src/component/common/loading';

const fallback = {
	fallback: <Loading />,
};

export const Main = loadable(() => import('src/pages/main'), fallback);

//관리자 - 유저관리
export const AdminCustomer = loadable(() => import('src/pages/admin/customer'), fallback);
// export const AdminProduct = loadable(() => import("src/pages/admin/product"), fallback);

//관리자 - 결제관리
export const AdminServicePay = loadable(() => import('src/pages/admin/payment/service-pay'), fallback);

//관리자 - 고객센터
export const AdminNotice = loadable(() => import('src/pages/admin/customer-center/notice'), fallback);
export const AdminWriteNotice = loadable(() => import('src/pages/admin/customer-center/write-notice'), fallback);
export const AdminFaq = loadable(() => import('src/pages/admin/customer-center/faq'), fallback);
export const AdminWriteFAQ = loadable(() => import('src/pages/admin/customer-center/write-faq'), fallback);
export const AdminInquiry = loadable(() => import('src/pages/admin/customer-center/inquiry'), fallback);
export const AdminInquiryDetail = loadable(() => import('src/pages/admin/customer-center/inquiry-detail'), fallback);

//관리자 - 관리자설정
export const ManageAdmin = loadable(() => import('src/pages/admin/manage-admin'), fallback);

//관리자 - 환경설정
export const AdminPreferences = loadable(() => import('src/pages/admin/preferences'), fallback);

//에러 페이지
export const WrongPage = loadable(() => import('src/component/common/wrongApproach'), fallback);
