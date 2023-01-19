import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Layout, Menu } from "antd";
import { IMenu } from "./sideMenuElement";
import { useSelector, useDispatch } from "react-redux";
import { LogoutOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { CoreState } from "src/redux/store";
import { toggleSidemenu } from "src/redux/reducer/sidemenu-slice";
import { MutationCreateUserLogArgs } from "src/types";

import QUERIES from "src/apis/queries";
import MUTATIONS from "src/apis/mutations";

const { SubMenu } = Menu;

const { Sider } = Layout;

interface ISideMenu {
  sideMenuElement: IMenu[];
}

const SideMenu = ({ sideMenuElement }: ISideMenu) => {
  const history = useHistory();
  const Dispatch = useDispatch();
  const sidemenu = useSelector((state: CoreState) => state.sidemenu);

  const rootSubmenuKeys = ["공지사항", "마켓관리", "상품관리", "주문관리", "결제관리", "배송관리", "매출통계", "고객센터"];

  const [openKeys, setOpenKeys] = useState(["1"]);
  const [selectedKeys, setSelectedKeys] = useState("");

  const [createUserLogByUserMutation] = useMutation<{ createUserLogByUser: boolean }, MutationCreateUserLogArgs>(MUTATIONS.CREATE_USER_LOG_BY_USER, {});

  const { data: whoAmiData } = useQuery<{ whoami: String }>(QUERIES.WHO_AM_I);

  const onOpenChange = (keys: any) => {
    const latestOpenKey = keys.find((key: string) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  //뒤로가기 클릭시에도 사이드메뉴 따라 움직이기 작동은 되나 수정할 필요가 있다고 느껴짐
  useEffect(() => {
    //어드민
    if (window.location.pathname.includes("admin")) {
      if (window.location.pathname === "/admin/product/product-delivery") {
        setSelectedKeys("/admin/product/product-delivery?type=1");
      } else {
        setSelectedKeys(window.location.pathname + "?");
      }

      if (window.location.pathname === "/admin") {
        setOpenKeys(["1"]);
      } else if (window.location.pathname === "/admin/customer") {
        setSelectedKeys("유저관리");
      } else if (window.location.pathname === ("/admin/product/product-collection" || "/admin/product/product-delivery")) {
        setOpenKeys(["상품관리"]);
      } else if (window.location.pathname === "/admin/order/order)") {
        setOpenKeys(["주문관리"]);
      } else if (window.location.pathname === ("/admin/payment/order-pay" || "/admin/payment/service-pay")) {
        setOpenKeys(["결제관리"]);
      }
      // else if (window.location.pathname === ()) {
      //   setOpenKeys(['배송관리'])
      // }
      else if (window.location.pathname === ("/admin/sales/sales-by-term" || "/admin/sales/sales-by-product" || "/admin/sales/sales-by-store")) {
        setOpenKeys(["매출통계"]);
      } else if (window.location.pathname === ("/admin/customer-center/notice" || "/admin/customer-center/faq" || "/admin/customer-center/inquiry")) {
        setOpenKeys(["고객센터"]);
      } else if (window.location.pathname === "/admin/manage-admin") {
        setSelectedKeys("관리자설정");
      } else if (window.location.pathname === "/admin/preferences") {
        setSelectedKeys("환경설정");
      }
    }
  }, [window.location.pathname]);

  const subMenuHasChild = (obj: IMenu) => (
    <SubMenu
      key={obj.title}
      title={
        <span>
          {obj.icon}
          <span>{obj.title}</span>
        </span>
      }
    >
      {obj.list.map((v) => (
        <Menu.Item key={v.path}>
          <Link to={v.path}>
            {v.icon}
            <span>{v.title}</span>
          </Link>
        </Menu.Item>
      ))}
    </SubMenu>
  );

  const subMenuNoChild = (obj: IMenu) => (
    <Menu.Item key={obj.title}>
      <Link to={obj.path}>
        {obj.icon}
        <span>{obj.title}</span>
      </Link>
    </Menu.Item>
  );

  const confirmLogout = async () => {
    const result = window.confirm("로그아웃하시겠습니까?");

    if (result) {
      localStorage.clear();

      history.push("/");
    }
  };

  return (
    <Sider theme="light" width={209} className="sidemenu" collapsed={sidemenu} onCollapse={() => Dispatch(toggleSidemenu())}>
      <div className={`app-log`} onClick={() => history.push("/")} />

      <Menu style={{ width: "210px" }} theme="light" selectedKeys={[selectedKeys]} mode="inline" openKeys={openKeys} onOpenChange={onOpenChange}>
        {sideMenuElement.map((value, index) => (value.list.length === 0 ? value?.grade && subMenuNoChild(value) : value?.grade && subMenuHasChild(value)))}
        <Menu.Item key={-1} onClick={() => confirmLogout()}>
          <LogoutOutlined />

          <span>로그아웃</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideMenu;
