import React from "react";
import HeaderComponent from "src/component/common/header";
import FooterComponent from "src/component/common/footer";
import LandingPage from "./landing-page";

import { Layout, Affix } from "antd";

const { Content } = Layout;

const Main = () => {
  return (
    <>
      <Affix offsetTop={0}>
        <HeaderComponent />
      </Affix>

      <Content>
        <LandingPage />
      </Content>

      <FooterComponent />
    </>
  );
};

export default Main;
