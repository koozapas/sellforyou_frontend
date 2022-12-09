import { Layout, Affix } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router";
import HeaderComponent from "src/component/common/header";
import FooterComponent from "src/component/common/footer";
import LandingPage from "./landing-page";
import LandingPage2 from "src/pages/user/payment/service-pay";
import { useQuery } from "@apollo/client";
import QUERIES from "src/apis/queries";

const { Content, Footer } = Layout;

const Main = () => {
  const history = useHistory();
  const [adminLoginModal, setAdminLoginModal] = useState<boolean>(false);
  const { data: whoAmI } = useQuery<{ whoami: String }>(QUERIES.WHO_AM_I);

  return (
    <Layout
      style={{ minHeight: "100vh" }}
    >
      <Affix offsetTop={0}>
        <HeaderComponent />
      </Affix>
      
      <Content>
        <LandingPage />
      </Content>

      <FooterComponent />
    </Layout>
  );
};

export default Main;
