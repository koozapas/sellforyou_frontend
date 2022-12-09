import React, { useState } from "react";
import loadable from "@loadable/component";

import { Button, Col, Row } from "antd";

const LoginModal = loadable(() => import("src/component/sign/login-modal"));
const JoinModal = loadable(() => import("src/component/sign/join-modal"));

const ServicePay = () => {
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [findModal, setFindModal] = useState<boolean>(false);
  const [joinModal, setJoinModal] = useState<boolean>(false);

  return (
    <div className="service-pay-container pb-16">
      <article className="flex justify-around text-center">
        <section style={{ 
          background: "rgba(41, 136, 255, 0.1)",
          borderRadius: 25,
          boxShadow: "0px 5px 10px gray", 

          padding: 30,

          width: "50%",
        }}>
          <Row style={{
            color: "#4c4c4c",
            fontSize: "xx-large",
            fontWeight: "bold",

            marginBottom: 30
          }}>
            <Col span={11} style={{
              textDecorationLine: "underline",
              
              paddingTop: 10
            }}>
              1개월 ₩99,000
            </Col>

            <Col span={2} />

            <Col span={11}>
              <Button shape="round" 
              onClick={() => {
                window.open("/user/payment")
              }} 
              style={{
                height: "100%",

                width: "100%"
              }}>
                결제하기
              </Button>
            </Col>
          </Row>

          <Row style={{
            color: "#449ee2",
            fontSize: "large",
            fontWeight: "bold",

            margin: 10
          }}>
            <Col span={11} style={{
              background: "white",
              
              padding: 15
            }}>
              VAT 포함
            </Col>

            <Col span={2} />

            <Col span={11} style={{
              background: "white",

              padding: 15
            }}>
              타오바오/티몰 상품수집
            </Col>
          </Row>

          <Row style={{
            color: "#449ee2",
            fontSize: "large",
            fontWeight: "bold",

            margin: 10
          }}>
            <Col span={11} style={{
              background: "white",

              padding: 15
            }}>
              네이버/쿠팡/11번가 업로드
            </Col>

            <Col span={2} />

            <Col span={11} style={{
              background: "white",

              padding: 15
            }}>
              대량수집/대량업로드
            </Col>
          </Row>

          <Row style={{
            color: "#449ee2",
            fontSize: "large",
            fontWeight: "bold",

            margin: 10
          }}>
            <Col span={11} style={{
              background: "white",

              padding: 15
            }}>
              상품정보 자동번역
            </Col>

            <Col span={2} />

            <Col span={11} style={{
              background: "white",

              padding: 15
            }}>
              번역비 무료
            </Col>
          </Row>

          <Row style={{
            color: "#449ee2",
            fontSize: "large",
            fontWeight: "bold",

            margin: 10
          }}>
            <Col span={11} style={{
              background: "white",

              padding: 15
            }}>
              동영상 업로드
            </Col>

            <Col span={2} />

            <Col span={11} style={{
              background: "white",

              padding: 15

            }}>
              상품수 무제한
            </Col>
          </Row>

          <Row style={{
            color: "#449ee2",
            fontSize: "large",
            fontWeight: "bold",

            margin: 10
          }}>
            <Col span={11} style={{
              background: "white",

              padding: 15
            }}>
              트랜져스 연동
            </Col>

            <Col span={2} />

            <Col span={11} style={{
              background: "white",

              padding: 15
            }}>
              셀러캣 무료 지원
            </Col>
          </Row>
        </section>        
      </article>

      <LoginModal
        visible={loginModal}
        closeLoginModal={() => setLoginModal(false)}
        openFindModal={() => setFindModal(true)}
        openJoinModal={() => setJoinModal(true)}
      />
      
      <JoinModal
        visible={joinModal}
        closeJoinModal={() => setJoinModal(false)}
        openLoginModal={() => setLoginModal(true)}
      />
    </div>
  );
};

export default ServicePay;