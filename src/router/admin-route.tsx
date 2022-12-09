import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Breadcrumb, BackTop } from "antd";
import HeaderComponent from "src/component/common/header";
import FooterComponent from "src/component/common/footer";
import SideMenuComponent from "src/component/common/sideMenu";
import { adminSideMenu } from "src/component/common/sideMenuElement";
import PrivateRoute from "./private-route";
import { UpOutlined } from '@ant-design/icons';

const { Content } = Layout;

const AdminComponent = () => {
  const location = useLocation();
  const findPathName = () => {
    const tempPathname = location.pathname;
    let pathTitle: string[] = [];
    adminSideMenu.forEach((parertPath) => {
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
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <BackTop>
        <div style={{
          height: 50,
          width: 50,
          lineHeight: '50px',
          borderRadius: 30,
          backgroundColor: '#1088e9',
          color: '#fff',
          textAlign: 'center',
          fontSize: 20,
        }}>
          <UpOutlined />
        </div>
      </BackTop>
      <HeaderComponent />
      <Layout>
        <SideMenuComponent sideMenuElement={adminSideMenu} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb separator=">" style={{ margin: "16px 0" }}>
            {path.map((v, i) => (
              <Breadcrumb.Item key={v + i}>{v}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <PrivateRoute />
        </Content>
      </Layout>

      <FooterComponent />
    </Layout>
  );
};

export default AdminComponent;
