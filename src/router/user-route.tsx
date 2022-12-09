import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb, BackTop } from "antd";
import HeaderComponent from "src/component/common/header";
import FooterComponent from "src/component/common/footer";
import SideMenu from "src/component/common/sideMenu";
import { userSideMenu } from "src/component/common/sideMenuElement";
import { useLocation, useHistory } from "react-router-dom";
import PrivateRoute from "./private-route";
import { useQuery } from "@apollo/client";
import QUERIES from "src/apis/queries";
import { User } from "src/types";
import { UpOutlined } from '@ant-design/icons';

const { Content } = Layout;

const UserComponent = () => {
  const location = useLocation();
  const history = useHistory();

  const { data: whoAmIData } = useQuery<{ whoami: String }>(QUERIES.WHO_AM_I);
  const { data: purchaseLevelData } = useQuery<{ selectMyInfoByUser: User }>(
    QUERIES.MY_PURCHASE_LEVEL,
    {
      skip:
        whoAmIData?.whoami === undefined ||
        whoAmIData?.whoami.includes("Admin") ||
        whoAmIData?.whoami === "Unknown",
    }
  );

  const myLevel = purchaseLevelData?.selectMyInfoByUser?.purchaseInfo?.level;
  const nowLocation = window.location.pathname;

  const findPathName = () => {
    const tempPathname = location.pathname;
    let pathTitle: string[] = [];
    userSideMenu.forEach((parertPath) => {
      const pPath = parertPath.path.substring(0, parertPath.path.indexOf("?"));
      if (pPath === tempPathname) pathTitle.push(parertPath.title);
      if (parertPath.list.length !== 0) {
        parertPath.list.forEach((childPath) => {
          const cPath = childPath.path.substring(
            0,
            childPath.path.indexOf("?")
          );
          if (cPath === tempPathname) {
            pathTitle.push(parertPath.title);
            pathTitle.push(childPath.title);
          }
        });
      }
    });
    return pathTitle;
  };

  const [path, setPath] = useState(findPathName());

  useEffect(() => {
    window.scrollTo(0, 0); //페이지 이동시 상단으로 이동
    setPath(findPathName());
  }, [location.pathname]);

  useEffect(() => {
    if (
      whoAmIData?.whoami.includes("User") &&
      whoAmIData?.whoami !== undefined &&
      myLevel !== undefined
    ) {
      switch (myLevel) {
        case 0:
          if (
            nowLocation === "/user/product/product-collection" ||
            nowLocation === "/user/product/product-delivery" ||
            nowLocation === "/user/order/order-list" ||
            nowLocation === "/user/payment/order-pay" ||
            nowLocation === "/user/delivery/delivery-excel" ||
            nowLocation === "/user/delivery/delivery-buy" ||
            nowLocation === "/user/delivery/delivery-sale" ||
            nowLocation === "/user/sales/sales-by-term" ||
            nowLocation === "/user/sales/sales-by-product" ||
            nowLocation === "/user/sales/sales-by-store"
          ) {
            alert("결제 이후에 이용 가능합니다.");
            history.goBack();
          }
          break;
        case 1:
          if (
            nowLocation === "/user/order/order-list" ||
            nowLocation === "/user/delivery/delivery-excel" ||
            nowLocation === "/user/delivery/delivery-buy" ||
            nowLocation === "/user/delivery/delivery-sale" ||
            nowLocation === "/user/sales/sales-by-term" ||
            nowLocation === "/user/sales/sales-by-product" ||
            nowLocation === "/user/sales/sales-by-store"
          ) {
            alert("결제 이후에 이용 가능합니다.");
            history.goBack();
          }
          break;
        case 2:
          if (
            nowLocation === "/user/delivery/delivery-excel" ||
            nowLocation === "/user/delivery/delivery-buy" ||
            nowLocation === "/user/delivery/delivery-sale" ||
            nowLocation === "/user/sales/sales-by-term" ||
            nowLocation === "/user/sales/sales-by-product" ||
            nowLocation === "/user/sales/sales-by-store"
          ) {
            alert("결제 이후에 이용 가능합니다.");
            history.goBack();
          }
          break;
        case 3:
          if (
            nowLocation === "/user/sales/sales-by-term" ||
            nowLocation === "/user/sales/sales-by-product" ||
            nowLocation === "/user/sales/sales-by-store"
          ) {
            alert("결제 이후에 이용 가능합니다.");
            history.goBack();
          }
          break;
        default:
          break;
      }
    }
  }, [location.pathname, myLevel]);

  return (
    // <Layout style={{ minHeight: "100vh" }}>
    //   <BackTop>
    //     <div style={{
    //       height: 50,
    //       width: 50,
    //       lineHeight: '50px',
    //       borderRadius: 30,
    //       backgroundColor: '#1088e9',
    //       color: '#fff',
    //       textAlign: 'center',
    //       fontSize: 20,
    //     }}>
    //       <UpOutlined />
    //     </div>
    //   </BackTop>
    //   <HeaderComponent />
    //   <Layout>
    //     <SideMenu sideMenuElement={userSideMenu} />
        
    //     <Content style={{ margin: "0 10px" }}>
    //       <Breadcrumb separator=">" style={{ 
    //         margin: "16px 0" 
    //       }}>
    //         {path.map((v, i) => (
    //           <Breadcrumb.Item key={v + i}>
    //             {v}
    //           </Breadcrumb.Item>
    //         ))}
    //       </Breadcrumb>
          <PrivateRoute />
    //     </Content>
    //   </Layout>

    //   <FooterComponent />
    // </Layout>
  );
};

export default UserComponent;
