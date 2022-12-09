import React from "react";
import Slider from "react-slick";
import ICON from "src/assets/icon";
import IMAGE from "src/assets/image";

import LandingPage2 from "src/pages/user/payment/service-pay";

import { Row, Col } from "antd";

const LandingPage = () => {
  const slickSettings = {
    autoplay: false,
    speed: 500,
    Infinity: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <img src={ICON.RIGHT_ARROW.default} alt="" />,
    prevArrow: <img src={ICON.LEFT_ARROW.default} alt="" />,
  };

  return (
    <>
      <div className="landing-page-form">
        <Slider className="lading-page-slick-item" {...slickSettings}>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "1350px",
                height: "590px",
                margin: "50px auto 0 auto",
              }}
            >
              <iframe style={{display: "flex", textAlign: "center"}} width="100%" height="100%" src="https://www.youtube.com/embed/Dm3xx1y-Oa0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            </div>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                width: "1350px",
                height: "590px",
                margin: "110px auto 0 auto",
              }}
            >
              <div style={{ paddingLeft: "8%" }}>
                <span
                  style={{
                    color: "#051A65",
                    fontSize: "24px",
                    fontWeight: 700,
                  }}
                >
                  생활에 여유를 주는 
                  
                  <br />
                  
                  풀필먼트 직구셀러 솔루션
                </span>

                <br />
                <br />

                <span
                  style={{
                    color: "#2988FF",
                    fontSize: "64px",
                    fontWeight: 700,
                  }}
                >
                  셀포유
                </span>

                <br />
                <br />

                <span
                  style={{
                    color: "#6B6B6B",
                    fontSize: "24px",
                    fontWeight: 700,
                  }}
                >
                  자유로운 상품 소싱 가능
                  
                  <br />
                  
                  원클릭 상품등록 가능
                  
                  <br />
                  
                  다양한 오픈마켓·소셜커머스 지원
                </span>

                <br />
                
                <button
                  className="ladingpage-slick-btn"
                  onClick={() => {
                    window.open("https://chrome.google.com/webstore/detail/%EC%85%80%ED%8F%AC%EC%9C%A0/cdghhijdbghkgklajgahabkbbpijddlo?hl=ko");
                  }}
                >
                  시작하기
                </button>
              </div>
              
              <div style={{ margin: "0 auto" }}>
                <img
                  style={{ objectFit: "contain" }}
                  src={ICON.SLIDER_IMG1.default}
                  alt=""
                />
              </div>
            </div>
          </div>
        </Slider>

        <div
          style={{
            background: "#2988FF",
            color: "#fff",
            padding: "50px 0",
          }}
        >
          <div style={{ width: "1350px", margin: "0 auto" }}>
            <div style={{ fontSize: "40px", textAlign: "center" }}>
              <span style={{ fontWeight: 700 }}>
                셀포유로 초간편 상품소싱, 판매관리까지 한번에!
              </span>

              
              <br />
            </div>
            <div style={{ fontSize: "24px", textAlign: "center" }}>
            <span style={{ 
              color: "yellow",
              fontWeight: 700
              }}>
            생활에 여유를 주는 풀필먼트 직구셀러 솔루션
              </span>

              
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div
          style={{
            background: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "1350px",
              margin: "0 auto",
              padding: "50px 0",
            }}
          >
            <div style={{ width: "50%", display: "flex" }}>
              <img
                src={ICON.CIRCLE_TEXT_ICON.default}
                style={{ margin: "auto" }}
                alt=""
              />
            </div>
            <div style={{ width: "50%", paddingLeft: "50px" }}>
              <Row className="landing-form1">
                <Col>
                  <img
                    className="landing-form1-img"
                    src={ICON.QUESTION_MARK.default}
                    alt=""
                  />
                </Col>

                <Col>
                  <span className="landing-form1-text">
                    어떤 상품을 등록
                  </span>

                  해야 될지 모르겠어요.
                </Col>
              </Row>

              <Row className="landing-form1">
                <Col>
                  <img
                    className="landing-form1-img"
                    src={ICON.QUESTION_MARK.default}
                    alt=""
                  />
                </Col>

                <Col>
                  <span className="landing-form1-text">
                    상품 페이지
                  </span>
                  
                  는 어떻게 만들어야 하죠?
                </Col>
              </Row>

              <Row className="landing-form1">
                <Col>
                  <img
                    className="landing-form1-img"
                    src={ICON.QUESTION_MARK.default}
                    alt=""
                  />
                </Col>

                <Col>
                  <span className="landing-form1-text">
                    가격 설정
                  </span>
                  
                  하기가 번거로워요.
                </Col>
              </Row>

              <Row className="landing-form1">
                <Col>
                  <img
                    className="landing-form1-img"
                    src={ICON.QUESTION_MARK.default}
                    alt=""
                  />
                </Col>
                <Col>
                  <span className="landing-form1-text">
                    상품을 보관할 창고
                  </span>

                  가 없어요.
                </Col>
              </Row>
              <Row className="landing-form1">
                <Col>
                  <img
                    className="landing-form1-img"
                    src={ICON.QUESTION_MARK.default}
                    alt=""
                  />
                </Col>
                <Col>
                  <span className="landing-form1-text">
                    해외 판매자와 소통
                  </span>

                  이 어려워요.
                </Col>
              </Row>
              <Row className="landing-form1">
                <Col>
                  <img
                    className="landing-form1-img"
                    src={ICON.QUESTION_MARK.default}
                    alt=""
                  />
                </Col>
                <Col>
                  <span className="landing-form1-text">
                    초기 세팅 비용
                  </span>
                  
                  이 너무 비싸요.
                </Col>
              </Row>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            textAlign: "center",
            padding: "50px 0",
          }}
        >
          <div style={{ width: "1350px", margin: "0 auto" }}>
            <div
              style={{ fontSize: "50px", fontWeight: 500, lineHeight: "69px" }}
            >
              셀포유에서는 이런 걱정과

              <br />

              <span style={{ fontWeight: 700 }}>
                고민을 할 필요가 없습니다!
              </span>
            </div>

            <img
              style={{ margin: "-32px auto 0 auto" }}
              src={ICON.UNDERLINE_BLUE.default}
              alt=""
            />

            <div
              style={{ fontSize: "26px", fontWeight: 500, color: "#6B6B6B" }}
            >
              더 이상 어려운 해외 구매대행 창업에 고민하지 마세요!
            </div>

            <div style={{ marginTop: "60px" }}>
              <Row justify="center" align="middle">
                <Col className="landing-form2">STEP 1</Col>

                <Col style={{ padding: "0 101px" }}>
                  <img src={ICON.TRIPLE_RIGHT_ARROW.default} alt="" />
                </Col>

                <Col className="landing-form2">STEP 2</Col>

                <Col style={{ padding: "0 101px" }}>
                  <img src={ICON.TRIPLE_RIGHT_ARROW.default} alt="" />
                </Col>

                <Col className="landing-form2">STEP 3</Col>
              </Row>
            </div>

            <div style={{ marginTop: "50px" }}>
              <Row justify="center">
                <Col className="landing-form3">
                  <span style={{ fontWeight: 700 }}>
                    자유로운 상품 소싱 
                    
                    <br />

                    원클릭 상품등록
                  </span>
                </Col>

                <Col className="landing-form3" style={{ margin: "0 80px " }}>
                  <span style={{ fontWeight: 700 }}>
                    다양한 오픈마켓

                    <br />

                    소셜커머스 지원
                  </span>
                </Col>

                <Col className="landing-form3">
                  <span style={{ fontWeight: 700 }}>
                    흩어진 주문 수집

                    <br />

                    배송신청서 자동 작성
                  </span>
                </Col>
              </Row>
            </div>

            <div style={{ marginTop: "10px" }}>
              <Row justify="center">
                <Col>
                  <img src={ICON.ITEM1.default} alt="" />
                </Col>

                <Col style={{ margin: "0 50px " }}>
                  <img src={ICON.ITEM2.default} alt="" />
                </Col>

                <Col>
                  <img src={ICON.ITEM3.default} alt="" />
                </Col>
              </Row>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#FFF",
            textAlign: "center",
            padding: "50px 0",
          }}
        >
          <div style={{ width: "1350px", margin: "0 auto" }}>
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

              <span
                className="lading-from4-underline"
                style={{ fontSize: "48px", fontWeight: 700 }}
              >
                이 모든 것이 가능합니다!
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "50px 0px",
          }}
        >
          <div style={{ width: "1350px", margin: "0 auto" }}>
            <div style={{ display: "flex" }}>
              <div style={{ margin: "30px 0 0 50px" }}>
                <div
                  style={{
                    fontSize: "51px",
                    fontWeight: 700,
                    lineHeight: "32px",
                    marginBottom: "33px",
                  }}
                >
                  01. 간단한 상품소싱
                </div>

                <div
                  style={{
                    fontSize: "25px",
                    fontWeight: 500,
                    lineHeight: "36.5px",
                    color: "#333333",
                  }}
                >
                  판매하고 싶은 상품을 타오바오에서 찾아

                  <br />
                  
                  {" "}

                  <span style={{ fontWeight: 700, color: "#2988FF" }}>
                    담기만 하면 끝!
                  </span>
                  
                  {" "}

                  개별/대량 소싱이 가능해요.
                </div>
              </div>

              <img
                style={{ marginLeft: "50px" }}
                src={ICON.ITEM4.default}
                alt=""
              />
            </div>
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "50px 0px",
          }}
        >
          <div style={{ width: "1350px", margin: "0 auto" }}>
            <div style={{ display: "flex" }}>
              <img src={ICON.ITEM5.default} alt="" />

              <div style={{ margin: "100px 0 0 130px" }}>
                <div
                  style={{
                    fontSize: "51px",
                    fontWeight: 700,
                    lineHeight: "61px",
                    marginBottom: "33px",
                  }}
                >
                  02. 중국어 상세페이지?

                  <br /> 
                  
                  NO걱정!
                </div>

                <div
                  style={{
                    fontSize: "25px",
                    fontWeight: 500,
                    lineHeight: "36.5px",
                    color: "#333333",
                  }}
                >
                  셀포유에서는 상세페이지에 한글 입력이 가능해요.

                  <br />

                  또한 {" "}

                  <span style={{ fontWeight: 700, color: "#2988FF" }}>
                    이미지 자동번역
                  </span>{" "}

                  또는 {" "}

                  <span style={{ fontWeight: 700, color: "#2988FF" }}>
                    이미지 수작업 한글화
                  </span>

                  <br />

                  서비스가 가능해요.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "50px 0px",
          }}
        >
          <div style={{ width: "1350px", margin: "0 auto" }}>
            <div style={{ display: "flex" }}>
              <div style={{ margin: "30px 0 0 50px" }}>
                <div
                  style={{
                    fontSize: "51px",
                    fontWeight: 700,
                    lineHeight: "32px",
                    marginBottom: "33px",
                  }}
                >
                  03. 다양한 판매채널
                </div>

                <div
                  style={{
                    fontSize: "25px",
                    fontWeight: 500,
                    lineHeight: "36.5px",
                    color: "#333333",
                  }}
                >
                  <span style={{ fontWeight: 700, color: "#2988FF" }}>
                    스마트스토어, 쿠팡, G마켓, 옥션, 11번가
                  </span>
                  
                  {" "} 등 
                  
                  <br />

                  여러 쇼핑몰에 입점하여 한 번에 운영하실 수 있어요.
                </div>
              </div>

              <img
                style={{ marginLeft: "50px" }}
                src={ICON.ITEM7.default}
                alt=""
              />
            </div>
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "50px 0px",
          }}
        >
          <div style={{ width: "1350px", margin: "0 auto" }}>
            <div style={{ display: "flex" }}>
              <img src={ICON.ITEM9.default} alt="" />

              <div style={{ margin: "100px 0 0 130px" }}>
                <div
                  style={{
                    fontSize: "51px",
                    fontWeight: 700,
                    lineHeight: "61px",
                    marginBottom: "33px",
                  }}
                >
                  04. 재고가 없으니 사무실, 창고가 필요없어요!
                </div>
                
                <div
                  style={{
                    fontSize: "25px",
                    fontWeight: 500,
                    lineHeight: "36.5px",
                    color: "#333333",
                  }}
                >
                  사입하지 않고, 고객 주문이 있을 때만 현지 발주하여 

                  <br />

                  고객에게 배송하기 때문에 창고가 필요없어요.

                  <br />

                  <span style={{ fontWeight: 700, color: "#2988FF" }}>
                    상품 소싱만 PC로 편리하게
                  </span>
                  
                  {" "} 어디서든 할 수 있어요.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "white",
            textAlign: "center",
            padding: "50px 0px",
          }}
        >
          <div style={{ width: "1350px", margin: "0 auto" }}>
            <div
              style={{
                fontSize: "50px",
                fontWeight: 700,
                marginBottom: "75px",
              }}
            >
              이용 요금 안내
            </div>

            <LandingPage2 />
          </div>
        </div>

        <div
          style={{
            background: "#FFF",
            textAlign: "center",
            height: "523px",
            backgroundImage: `url(${IMAGE.LANDING_PAGE_BOTTOMMOST_IMG.default})`,
          }}
        >
          <div
            style={{
              height: "523px",
              background: "rgba(5, 26, 101, 0.75)",
            }}
          >
            <div style={{ width: "1350px", margin: "0 auto" }}>
              <div
                style={{
                  fontSize: "45px",
                  lineHeight: "71.5px",
                  color: "#ffffff",
                  padding: "100px 0 0 0",
                }}
              >
                <span style={{ fontWeight: 700 }}>
                  편안하게 구매대행 시스템을 누릴수 있는

                  <br />
                
                  셀포유를 무료로 시작해보세요!
                </span>
              </div>

              <button
                className="ladingpage-slick-btn"
                onClick={() => {
                  window.open("https://chrome.google.com/webstore/detail/%EC%85%80%ED%8F%AC%EC%9C%A0/cdghhijdbghkgklajgahabkbbpijddlo?hl=ko");
                }}
              >
                시작하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
