import React, { useEffect, useState } from "react";

import { useMutation } from "@apollo/client";
import { Badge, Button, Col, Layout, message, Row, Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import { useQuery, useSubscription } from "@apollo/client";
import { MutationCreateUserLogArgs, UserLog } from "src/types";
import { useDispatch } from "react-redux";
import { setSubscription } from "src/redux/reducer/subscription-slice";

import LoginModal from "src/component/sign/login-modal";
import FindAccountModal from "src/component/sign/find-account-modal";
import JoinModal from "src/component/sign/join-modal";

import FOOTTER_LOGO from "src/assets/image/footer-logo.png";
import ICON from "src/assets/icon";
import SUBSCRIPTIONS from "src/apis/subscriptions";
import QUERIES from "src/apis/queries";
import MUTATIONS from "src/apis/mutations";
import Cookies from "js-cookie";

const { Header } = Layout;

export interface UserLogPayload {
  type: "scrapOrder" | "registerProduct" | "getTaobaoItem" | "purchaseRenewed";
  title: string;
  renewedAccessToken?: string;
}

const HeaderComponent = () => {
  const history = useHistory();

  const [width, setWidth] = React.useState<number>(window.innerWidth);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  const [loginModal, setLoginModal] = useState<boolean>(false); // 로그인용
  const [findModal, setFindModal] = useState<boolean>(false); // 계정찾기용
  const [joinModal, setJoinModal] = useState<boolean>(false); //회원가입용

  const nowLocation = window.location.pathname;

  const [createUserLogByUserMutation] = useMutation<{ createUserLogByUser: boolean }, MutationCreateUserLogArgs>(MUTATIONS.CREATE_USER_LOG_BY_USER, {});

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      if (nowLocation !== "/") alert("토큰이 만료되었습니다.\n다시 로그인 바랍니다.");
      history.push("/");
    }
  }, [nowLocation]);

  const confirmLogout = async () => {
    const result = window.confirm("로그아웃하시겠습니까?");

    if (result) {
      localStorage.clear();

      alert("로그아웃되었습니다.");

      history.push("/");
    }
  };

  const { data: whoAmiData } = useQuery<{ whoami: String }>(QUERIES.WHO_AM_I);

  const {
    data: subscriptionData,
    loading: subscriptionLoading,
    error: subscriptionError,
  } = useSubscription<{ subscribeUserEvent: UserLog }>(SUBSCRIPTIONS.PRODUCT_COLLECTION_SUBSCRIPTION, {
    fetchPolicy: "no-cache",
    skip: !(whoAmiData?.whoami !== undefined && whoAmiData?.whoami.includes("User")),
  });
  const dispatch = useDispatch();

  const [reset, setReset] = useState<UserLogPayload>();

  useEffect(() => {
    if (whoAmiData?.whoami !== undefined && whoAmiData?.whoami.includes("User")) {
      if (subscriptionLoading) {
        return;
      }
      if (subscriptionError) {
        return;
      }
      if (subscriptionData?.subscribeUserEvent) {
        message.success(`${subscriptionData?.subscribeUserEvent.title}`, 5);
        dispatch(setSubscription(subscriptionData?.subscribeUserEvent));
      }
    }
    if (subscriptionData?.subscribeUserEvent.payloadData) {
      setReset(JSON.parse(subscriptionData?.subscribeUserEvent.payloadData));
    }
  }, [subscriptionData]);

  useEffect(() => {
    if (reset !== undefined && reset.renewedAccessToken) {
      localStorage.setItem("accessToken", reset.renewedAccessToken);
      if (nowLocation === "/user/product/product-delivery" || nowLocation === "/user/order/order-list") {
        window.location.reload();
      }
    }
  }, [reset]);

  Cookies.remove("NID_SES", { path: "/user/market/info" });

  return (
    <>
      <Header className="header">
        <div
          style={{
            margin: "0 auto",
            width: 1200,
          }}
        >
          <Row>
            <Col
              span={18}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
              }}
            >
              <img
                src={FOOTTER_LOGO}
                style={{
                  cursor: "pointer",
                  height: 40,
                  marginRight: 25,
                }}
                alt="logo"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />

              {width > 1200 ? (
                <>
                  <div
                    className="navigators-menu"
                    onClick={() => {
                      window.scrollTo({ top: 5150, behavior: "smooth" });
                    }}
                  >
                    이용요금
                  </div>

                  <div
                    className="navigators-menu"
                    onClick={() => {
                      window.open("https://open.kakao.com/o/gWfPuzDe");
                    }}
                  >
                    오픈카톡방
                  </div>

                  <div
                    className="navigators-menu"
                    onClick={() => {
                      window.open("https://cafe.naver.com/sellfor");
                    }}
                  >
                    네이버카페
                  </div>

                  <div
                    className="navigators-menu"
                    onClick={() => {
                      window.open("https://panoramic-butternut-291.notion.site/2619a31e8a93438fa308dcfaae76666a");
                    }}
                  >
                    이용가이드
                  </div>
                </>
              ) : null}
            </Col>

            <Col
              span={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "right",
              }}
            >
              <Button
                type="primary"
                onClick={() => {
                  window.open("https://chrome.google.com/webstore/detail/%EC%85%80%ED%8F%AC%EC%9C%A0/cdghhijdbghkgklajgahabkbbpijddlo?hl=ko");
                }}
              >
                무료 체험 시작하기
              </Button>
            </Col>
          </Row>
        </div>
      </Header>
    </>
  );
};

export default HeaderComponent;
