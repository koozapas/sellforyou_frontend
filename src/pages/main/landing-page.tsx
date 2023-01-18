import React from "react";
import Slider from "react-slick";
import ICON from "src/assets/icon";
import IMAGE from "src/assets/image";
import PRICING from "src/assets/image/pricing.png";

import LandingPage2 from "src/pages/user/payment/service-pay";

import { Row, Col, Button } from "antd";

const LandingPage = () => {
  return (
    <>
      <div className="landing-page-form">
        <Row
          style={{
            padding: "120px 0px",
          }}
          align="middle"
        >
          <Col span={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0px 0px",
                width: "600px",
                height: "600px",
                background: "whitesmoke",
              }}
            >
              <iframe
                style={{ display: "flex", textAlign: "center" }}
                width="600px"
                height="400px"
                src="https://www.youtube.com/embed/Dm3xx1y-Oa0"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </Col>

          <Col span={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "100%", marginLeft: 100 }}>
                <div
                  style={{
                    color: "#051A65",
                    fontSize: "24px",
                    fontWeight: 700,
                  }}
                >
                  생활에 여유를 주는
                  <br />
                  풀필먼트 직구셀러 솔루션
                </div>

                <br />
                <br />

                <div
                  style={{
                    color: "#2988FF",
                    fontSize: "64px",
                    fontWeight: 700,
                  }}
                >
                  셀포유
                </div>

                <br />
                <br />

                <div
                  style={{
                    color: "#3c3c3c",
                    fontSize: "24px",
                    fontWeight: 700,
                  }}
                >
                  자유로운 상품 소싱 가능
                  <br />
                  원클릭 상품등록 가능
                  <br />
                  다양한 오픈마켓·소셜커머스 지원
                </div>

                <br />
                <br />

                <div
                  style={{
                    color: "#ff9900",
                    fontSize: "24px",
                    fontWeight: 700,
                  }}
                >
                  셀포유로 초간편 상품소싱, 판매관리까지 한번에!
                </div>

                <Button
                  className="ladingpage-slick-btn"
                  type="primary"
                  onClick={() => {
                    window.open("https://chrome.google.com/webstore/detail/%EC%85%80%ED%8F%AC%EC%9C%A0/cdghhijdbghkgklajgahabkbbpijddlo?hl=ko");
                  }}
                >
                  무료 체험 시작하기
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <Row
          style={{
            padding: "120px 0px",
          }}
          align="middle"
        >
          <Col
            span={12}
            style={{
              textAlign: "center",
            }}
          >
            <img src={ICON.CIRCLE_TEXT_ICON.default} style={{ margin: "auto" }} alt="" />
          </Col>

          <Col span={12}>
            <div
              style={{
                marginLeft: 100,
              }}
            >
              <Row className="landing-form1">
                <Col>
                  <img className="landing-form1-img" src={ICON.QUESTION_MARK.default} alt="" />
                </Col>

                <Col>
                  <span className="landing-form1-text">어떤 상품을 등록</span>
                  해야 될지 모르겠어요.
                </Col>
              </Row>

              <Row className="landing-form1">
                <Col>
                  <img className="landing-form1-img" src={ICON.QUESTION_MARK.default} alt="" />
                </Col>

                <Col>
                  <span className="landing-form1-text">상품 페이지</span>는 어떻게 만들어야 하죠?
                </Col>
              </Row>

              <Row className="landing-form1">
                <Col>
                  <img className="landing-form1-img" src={ICON.QUESTION_MARK.default} alt="" />
                </Col>

                <Col>
                  <span className="landing-form1-text">가격 설정</span>
                  하기가 번거로워요.
                </Col>
              </Row>

              <Row className="landing-form1">
                <Col>
                  <img className="landing-form1-img" src={ICON.QUESTION_MARK.default} alt="" />
                </Col>
                <Col>
                  <span className="landing-form1-text">상품을 보관할 창고</span>가 없어요.
                </Col>
              </Row>
              <Row className="landing-form1">
                <Col>
                  <img className="landing-form1-img" src={ICON.QUESTION_MARK.default} alt="" />
                </Col>
                <Col>
                  <span className="landing-form1-text">해외 판매자와 소통</span>이 어려워요.
                </Col>
              </Row>
              <Row className="landing-form1">
                <Col>
                  <img className="landing-form1-img" src={ICON.QUESTION_MARK.default} alt="" />
                </Col>
                <Col>
                  <span className="landing-form1-text">초기 세팅 비용</span>이 너무 비싸요.
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row
          style={{
            padding: "120px 0px",
          }}
          align="middle"
        >
          <div style={{ fontSize: "50px", fontWeight: 500, lineHeight: "70px", textAlign: "center" }}>
            셀포유에서는 이런 걱정과
            <br />
            <span style={{ fontWeight: 700 }}>고민이 더이상 필요 없어요.</span>
            <img style={{ margin: "-0 auto" }} src={ICON.UNDERLINE_BLUE.default} alt="" />
            <br />
          </div>

          <div style={{ margin: "0 auto" }}>
            <div style={{ fontSize: "26px", fontWeight: 500, color: "#6B6B6B", textAlign: "center" }}>더 이상 어려운 해외 구매대행 창업에 고민하지 마세요!</div>

            <div style={{ marginTop: "60px" }}>
              <Row justify="center" align="middle">
                <Col
                  span={6}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="landing-form2">STEP 1</div>

                  <br />

                  <div className="landing-form3">
                    자유로운 상품 소싱
                    <br />
                    원클릭 상품등록
                  </div>
                </Col>

                <Col
                  span={3}
                  style={{
                    textAlign: "center",
                  }}
                >
                  <img src={ICON.TRIPLE_RIGHT_ARROW.default} alt="" />
                </Col>

                <Col
                  span={6}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="landing-form2">STEP 2</div>

                  <br />

                  <div className="landing-form3">
                    다양한 오픈마켓
                    <br />
                    소셜커머스 지원
                  </div>
                </Col>

                <Col
                  span={3}
                  style={{
                    textAlign: "center",
                  }}
                >
                  <img src={ICON.TRIPLE_RIGHT_ARROW.default} alt="" />
                </Col>

                <Col
                  span={6}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="landing-form2">STEP 3</div>

                  <br />

                  <div className="landing-form3">
                    흩어진 주문 수집
                    <br />
                    배송신청서 자동 작성
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Row>

        {/* <div
          style={{
            background: "#FFF",
            textAlign: "center",
            padding: "50px 0",
          }}
        >
          <div style={{ margin: "0 auto" }}>
            <div
              style={{
                color: "#0F0F0F",
                fontSize: "43px",
                fontWeight: 500,
                lineHeight: "58.5px",
                marginBottom: "50px",
              }}
            >
              셀포유와 함께하면
              <br />
              <span className="lading-from4-underline" style={{ fontSize: "48px", fontWeight: 700 }}>
                이 모든 것이 가능합니다!
              </span>
            </div>
          </div>
        </div> */}

        <Row
          style={{
            padding: "120px 0px",
          }}
          align="middle"
        >
          <Col span={8}>
            <div
              style={{
                fontSize: "50px",
                fontWeight: 700,
              }}
            >
              원클릭으로 상품을
              <br /> 소싱해보세요.
            </div>

            <br />

            <div
              style={{
                fontSize: "25px",
                fontWeight: 500,
              }}
            >
              판매할 상품을 <span style={{ color: "#2988FF" }}>해외쇼핑몰(타오바오, 티몰, 알리익스프레스, 1688, VVIC, 아마존)</span>에서 찾아 담기만 하면 끝!
            </div>
          </Col>

          <Col span={16}>
            <img src={ICON.ITEM4.default} alt="" />
          </Col>
        </Row>

        <Row
          style={{
            padding: "120px 0px",
          }}
          align="middle"
        >
          <Col span={16}>
            <img src={ICON.ITEM5.default} alt="" />
          </Col>

          <Col span={8}>
            <div
              style={{
                fontSize: "50px",
                fontWeight: 700,
              }}
            >
              중국어 상세페이지,
              <br />
              걱정하지 마세요!
            </div>

            <br />

            <div
              style={{
                fontSize: "25px",
                fontWeight: 500,
              }}
            >
              셀포유에서는 상세페이지에 한글을 입력할 수 있을 뿐만 아니라 <span style={{ color: "#2988FF" }}>이미지 편집/번역</span> 기능이 함께 지원되요.
            </div>
          </Col>
        </Row>

        <Row
          style={{
            padding: "120px 0px",
          }}
          align="middle"
        >
          <Col span={8}>
            <div
              style={{
                fontSize: "50px",
                fontWeight: 700,
              }}
            >
              다양한 판매채널을 이용할 수 있어요.
            </div>

            <br />

            <div
              style={{
                fontSize: "25px",
                fontWeight: 500,
              }}
            >
              <span style={{ color: "#2988FF" }}>스마트스토어 외 8개 마켓(쿠팡, 11번가, 지마켓/옥션, 인터파크, 위메프, 롯데온, 티몬)</span>을 한 번에 운영하실
              수 있어요.
            </div>
          </Col>

          <Col
            span={16}
            style={{
              textAlign: "right",
            }}
          >
            <img src={ICON.ITEM7.default} alt="" />
          </Col>
        </Row>

        <Row
          style={{
            padding: "120px 0px",
          }}
          align="middle"
        >
          <Col span={16}>
            <img src={ICON.ITEM9.default} alt="" />
          </Col>

          <Col span={8}>
            <div
              style={{
                fontSize: "50px",
                fontWeight: 700,
              }}
            >
              재고를 고민할
              <br />
              필요가 없어요.
            </div>

            <br />

            <div
              style={{
                fontSize: "25px",
                fontWeight: 500,
              }}
            >
              사입하지 않고, 고객 주문이 있을 때만
              <br />
              현지 발주하여 고객에게 배송하기
              <br />
              때문에 창고가 필요없어요.
            </div>
          </Col>
        </Row>

        <Row
          style={{
            padding: "120px 0px",
          }}
        >
          <Col span={8}>
            <div
              style={{
                fontSize: "50px",
                fontWeight: 700,
              }}
            >
              이용가격
            </div>

            <br />

            <div
              style={{
                fontSize: "25px",
                fontWeight: 500,
              }}
            >
              셀포유의 많은 기능들을 저렴한 가격으로 이용해보세요.
            </div>
          </Col>

          <Col
            span={16}
            style={{
              textAlign: "right",
            }}
          >
            <img src={PRICING} />
          </Col>
        </Row>

        <div
          style={{
            background: "ghostwhite",
            borderRadius: "30px",
            textAlign: "center",
            padding: "30px 0",
            margin: "120px 0",
          }}
        >
          <div style={{ margin: "0 auto" }}>
            <div
              style={{
                fontSize: "32px",
                lineHeight: "71.5px",
                color: "#3c3c3c",
              }}
            >
              <span style={{ fontWeight: 700 }}>
                편안하게 구매대행 시스템을 누릴 수 있는
                <br />
                셀포유를 무료 체험판으로 지금 바로 이용해보세요!
              </span>
            </div>

            <Button
              className="ladingpage-slick-btn"
              type="primary"
              onClick={() => {
                window.open("https://chrome.google.com/webstore/detail/%EC%85%80%ED%8F%AC%EC%9C%A0/cdghhijdbghkgklajgahabkbbpijddlo?hl=ko");
              }}
            >
              무료 체험 시작하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
