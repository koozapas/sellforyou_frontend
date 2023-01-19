import React from "react";
import { StarOutlined } from "@ant-design/icons";

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
export const adminSideMenu: IMenu[] = [
  createMenu("유저관리", "/admin/customer?", <StarOutlined />, [], 'A'),

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

