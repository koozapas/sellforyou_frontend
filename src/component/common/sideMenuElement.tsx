import React from "react";
import {
  StarOutlined,
  ShopOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined,
  ShoppingOutlined,
  PlusSquareOutlined,
  CreditCardOutlined,
  DownloadOutlined
} from "@ant-design/icons";
import 'remixicon/fonts/remixicon.css'


export interface IMenuItem {
  title: string;
  icon: any;
  path: string;
  list?: IMenuItem[];
  grade?: string;
}
export interface IMenu {
  title: string;
  icon: any;
  path: string;
  list: IMenuItem[];
  grade?: string;
}

const createMenu = (
  title: string,
  path: string,
  icon: any,
  list: IMenuItem[],
  grade?: string
): IMenu => ({ title, path, list, icon, grade });

// 객체로 다 적게 되면 가독성 떨어짐

export const userSideMenu: IMenu[] = [
  createMenu("공지사항", "/user/notice?", <StarOutlined />, [], 'G'),

  createMenu("마켓관리", "", <ShopOutlined />, [
    createMenu("기본정보", "/user/market/info?", <InfoCircleOutlined />, [], '0'),
    createMenu("금지어/치환단어 설정", "/user/market/set-word?", <PlusCircleOutlined />, [], '0'),
  ], '0'),

  createMenu("상품관리", "/user/product/product-delivery?type=ALL", <ShoppingOutlined />, [], '1'),

  createMenu("자료실", "/user/downloads?", <DownloadOutlined />, [], 'G'),

  // createMenu("상품관리", "", <ShoppingOutlined />, [
  //   createMenu("상품관리", "/user/product/product-delivery?type=ALL", <StarOutlined />, [], '1'),
  // ], '1'),

  // createMenu("주문관리", "", <i className="ri-inbox-line" style={{ marginRight: '10px' }} />, [
    // createMenu("주문 목록", "/user/order/order-list?", <OrderedListOutlined />, [], '2'),
  // ], '2'),

  createMenu("결제관리", "", <CreditCardOutlined />, [
    createMenu("서비스 결제", "/user/payment/service-pay?", <PlusSquareOutlined />, [], '0'),
  ], '1'),
];

export const adminSideMenu: IMenu[] = [
  createMenu("유저관리", "/admin/customer?", <StarOutlined />, [], 'A'),

  createMenu("상품관리", "/admin/product/product-delivery?type=ALL", <StarOutlined />, [], "B"),

  createMenu("결제관리", "", <StarOutlined />, [
    createMenu("이용료결제", "/admin/payment/service-pay?", <StarOutlined />, []),
  ], 'D'),

  createMenu("고객센터", "", <StarOutlined />, [
    createMenu("공지사항", "/admin/customer-center/notice?", <StarOutlined />, [], "F"),
    // createMenu("FAQ", "/admin/customer-center/faq?", <StarOutlined />, []),
    // createMenu("고객문의", "/admin/customer-center/inquiry?", <SolutionOutlined />, []),
  ], 'F'),

  // createMenu("관리자설정", "/admin/manage-admin?", <StarOutlined />, [], 'G'),
  // createMenu("환경설정", "/admin/preferences?", <StarOutlined />, [], 'H'),
];

