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

  const [loginModal, setLoginModal] = useState<boolean>(false); // 로그인용
  const [findModal, setFindModal] = useState<boolean>(false); // 계정찾기용
  const [joinModal, setJoinModal] = useState<boolean>(false); //회원가입용

  const nowLocation = window.location.pathname;

  const [createUserLogByUserMutation] = useMutation<
    { createUserLogByUser: boolean },
    MutationCreateUserLogArgs
  >(MUTATIONS.CREATE_USER_LOG_BY_USER, {});

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
  } = useSubscription<{ subscribeUserEvent: UserLog }>(
    SUBSCRIPTIONS.PRODUCT_COLLECTION_SUBSCRIPTION,
    {
      fetchPolicy: "no-cache",
      skip: !(
        whoAmiData?.whoami !== undefined && whoAmiData?.whoami.includes("User")
      ),
    }
  );
  const dispatch = useDispatch();

  const [reset, setReset] = useState<UserLogPayload>();

  useEffect(() => {
    if (
      whoAmiData?.whoami !== undefined &&
      whoAmiData?.whoami.includes("User")
    ) {
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
      if (
        nowLocation === "/user/product/product-delivery" ||
        nowLocation === "/user/order/order-list"
      ) {
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
            textAlign: "center",
            width: history.location.pathname === "/" ? "100%" : "",
          }}
        >
          <div
            style={{
              width: history.location.pathname === "/" ? "1320px" : "",
              margin: "0 auto",
            }}
          >
            <Row justify={"space-between"}>
              <Col
                style={{ 
                  paddingTop: 3
                }}
              >
                <Row align="middle">
                  <Col
                    style={{
                      // width: 125
                    }}
                    onClick={() => {
                      window.location.href = "/";
                    }}
                  >
                    <img
                      src={FOOTTER_LOGO}
                      style={{ 
                        cursor: "pointer",
                      }}
                      alt="logo"
                    />
                  </Col>

                  <Col style={{ width: 50 }} />
                  
                  {history.location.pathname === "/" ? <>
                    <Col className="navigators-menu"
                      style={{
                        width: 125
                      }}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      셀포유란?
                    </Col>

                    <Col className="navigators-menu"
                      style={{
                        width: 125
                      }}
                      onClick={() => {
                        window.scrollTo({ top: 2250, behavior: "smooth" });
                      }}
                    >
                      셀포유 장점
                    </Col>

                    <Col className="navigators-menu"
                      style={{
                        width: 125
                      }}
                      onClick={() => {
                        window.scrollTo({ top: 4950, behavior: "smooth" });
                      }}
                    >
                      이용 요금
                    </Col>

                    <Col className="navigators-menu"
                      style={{
                        width: 125
                      }}
                      onClick={() => {
                        window.scrollTo({ top: 7000, behavior: "smooth" });
                      }}
                    >
                      시작하기
                    </Col>
                  </> : null}
                </Row>
              </Col>

              {history.location.pathname === "/" ? (
                <Row gutter={14}>
                  <Col>
                    <a target="_blank" href="https://cafe.naver.com/sellfor">
                      <Button type="default" size="large" style={{
                      }}>
                        네이버 카페
                      </Button>
                    </a>
                  </Col>

                  <Col>
                    <a target="_blank" href="https://panoramic-butternut-291.notion.site/2619a31e8a93438fa308dcfaae76666a">
                      <Button type="default" size="large" style={{
                      }}>
                        유저 가이드
                      </Button>
                    </a>
                  </Col>

                  <Col>
                    {localStorage.getItem("accessToken") === null ? <Button
                      style={{
                      }}

                      type="primary"
                      size="large"

                      onClick={() => {
                        setLoginModal(true);
                      }}
                    >
                      로그인
                    </Button>
                    :
                    <Button
                      style={{
                      }}

                      type="primary"
                      size="large"

                      onClick={() => {
                        confirmLogout();
                      }}
                    >
                      로그아웃
                    </Button>}
                  </Col>
                </Row>
              ) : null}
            </Row>
          </div>
        </div>
      </Header>

      <LoginModal
        visible={loginModal}
        closeLoginModal={() => setLoginModal(false)}
        openFindModal={() => setFindModal(true)}
        openJoinModal={() => setJoinModal(true)}
      />

      <FindAccountModal
        visible={findModal}
        closeFindModal={() => setFindModal(false)}
        openLoginModal={() => setLoginModal(true)}
      />

      <JoinModal
        visible={joinModal}
        closeJoinModal={() => setJoinModal(false)}
        openLoginModal={() => setLoginModal(true)}
      />
    </>
  );
};

export default HeaderComponent;
