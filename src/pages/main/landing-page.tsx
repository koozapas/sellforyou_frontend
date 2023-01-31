import React from "react";
import ICON from "src/assets/icon";
import PRICING from "src/assets/image/pricing.png";

import { Row, Col, Button } from "antd";

const LandingPage = () => {
  const [width, setWidth] = React.useState<number>(window.innerWidth);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  return (
    <>
      <div className="landing-page-form">
        <Row
          style={{
            padding: width < 1200 ? "0px 0px 90px 0px" : "90px 0px",
          }}
          align="middle"
        >
          <Col
            xs={24}
            xl={12}
            style={{
              margin: "30px 0px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                height: width < 1200 ? "auto" : "600px",
                background: "ghostwhite",
              }}
            >
              <iframe
                style={{ display: "flex", textAlign: "center" }}
                width="100%"
                height={width < 1200 ? `275px` : `400px`}
                src="https://www.youtube.com/embed/Dm3xx1y-Oa0"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </Col>

          <Col
            xs={24}
            xl={12}
            style={{
              margin: "30px 0px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: width < 1200 ? "center" : "left",
                marginLeft: width < 1200 ? 0 : 100,
              }}
            >
              <div style={{ width: "100%" }}>
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

                <div
                  style={{
                    color: "#ff9900",
                    fontSize: "24px",
                    fontWeight: 700,
                  }}
                >
                  셀포유로 초간편 상품소싱,
                  <br />
                  판매관리까지 한번에!
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
            padding: "90px 0px",
          }}
          align="middle"
        >
          <Col
            xs={24}
            xl={12}
            style={{
              margin: "30px 0px",
              textAlign: "center",
              padding: "0 25px",
            }}
          >
            <img src={ICON.CIRCLE_TEXT_ICON.default} style={{ margin: "auto" }} alt="" />
          </Col>

          <Col
            xs={24}
            xl={12}
            style={{
              margin: "30px 0px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: width < 1200 ? "18px" : "25px",
                textAlign: "left",
                marginLeft: width < 1200 ? 0 : 90,
              }}
            >
              <div className="landing-form1">
                <img className="landing-form1-img" src={ICON.QUESTION_MARK.default} alt="" />
                <span className="landing-form1-text">어떤 상품을 등록</span>
                해야 될지 모르겠어요.
              </div>

              <div className="landing-form1">
                <img className="landing-form1-img" src={ICON.QUESTION_MARK.default} alt="" />
                <span className="landing-form1-text">상품 페이지</span>는 어떻게 만들어야 하죠?
              </div>

              <div className="landing-form1">
                <img className="landing-form1-img" src={ICON.QUESTION_MARK.default} alt="" />
                <span className="landing-form1-text">가격 설정</span>
                하기가 번거로워요.
              </div>

              <div className="landing-form1">
                <img className="landing-form1-img" src={ICON.QUESTION_MARK.default} alt="" />
                <span className="landing-form1-text">상품을 보관할 창고</span>가 없어요.
              </div>

              <div className="landing-form1">
                <img className="landing-form1-img" src={ICON.QUESTION_MARK.default} alt="" />
                <span className="landing-form1-text">해외 판매자와 소통</span>이 어려워요.
              </div>

              <div className="landing-form1">
                <img className="landing-form1-img" src={ICON.QUESTION_MARK.default} alt="" />
                <span className="landing-form1-text">초기 세팅 비용</span>이 너무 비싸요.
              </div>
            </div>
          </Col>
        </Row>

        <Row
          style={{
            padding: "90px 0px",
          }}
          align="middle"
        >
          <div style={{ fontSize: width < 1200 ? "36px" : "50px", fontWeight: 500, lineHeight: "70px", textAlign: "center", padding: "0 25px" }}>
            셀포유에서는
            <br />
            <span style={{ fontWeight: 700 }}>이런 걱정과 고민이 없어요.</span>
            <img style={{ margin: "-0 auto" }} src={ICON.UNDERLINE_BLUE.default} alt="" />
            <br />
          </div>

          <div style={{ margin: "0 auto" }}>
            <div
              style={{
                fontSize: width < 1200 ? "18px" : "25px",
                fontWeight: 500,
                color: "#6B6B6B",
                textAlign: "center",
                marginBottom: 30,
                padding: "0 50px",
              }}
            >
              더 이상 어려운 해외 구매대행 창업에 고민하지 마세요!
            </div>

            <Row justify="center" align="middle">
              <Col
                xs={24}
                xl={8}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "30px 0px",
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
                xs={24}
                xl={8}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "30px 0px",
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
                xs={24}
                xl={8}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "30px 0px",
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
            padding: "90px 0px",
          }}
          align="middle"
        >
          <Col
            xs={24}
            xl={12}
            style={{
              margin: "30px 0px",
              padding: "0px 40px",
            }}
          >
            <img
              src={ICON.ITEM4.default}
              alt=""
              style={
                {
                  // maxWidth: 600,
                }
              }
            />
          </Col>

          <Col
            xs={24}
            xl={12}
            style={{
              margin: "30px 0px",
              textAlign: width < 1200 ? "center" : "left",
              padding: "0 40px",
            }}
          >
            <div
              style={{
                fontSize: width < 1200 ? "36px" : "50px",
                fontWeight: 700,
              }}
            >
              원클릭으로 상품을
              <br />
              소싱해보세요.
            </div>

            <br />

            <div
              style={{
                fontSize: width < 1200 ? "18px" : "25px",
                fontWeight: 500,
              }}
            >
              판매할 상품을 <span style={{ color: "#2988FF" }}>해외쇼핑몰(타오바오, 티몰, 알리익스프레스, 1688, VVIC, 아마존)</span>에서 찾아 담기만 하면 끝!
            </div>
          </Col>
        </Row>

        <Row
          style={{
            padding: "90px 0px",
          }}
          align="middle"
        >
          <Col
            xs={24}
            xl={12}
            style={{
              margin: "30px 0px",
              padding: "0px 40px",
            }}
          >
            <img src={ICON.ITEM5.default} alt="" />
          </Col>

          <Col
            xs={24}
            xl={12}
            style={{
              margin: "30px 0px",
              textAlign: width < 1200 ? "center" : "left",
              padding: "0 40px",
            }}
          >
            <div
              style={{
                fontSize: width < 1200 ? "36px" : "50px",
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
                fontSize: width < 1200 ? "18px" : "25px",
                fontWeight: 500,
              }}
            >
              셀포유에서는 상세페이지에 한글을 입력할 수 있을 뿐만 아니라 <span style={{ color: "#2988FF" }}>이미지 편집/번역</span> 기능을 함께 지원하고
              있어요.
            </div>
          </Col>
        </Row>

        <Row
          style={{
            padding: "90px 0px",
          }}
          align="middle"
        >
          <Col
            xs={24}
            xl={12}
            style={{
              margin: "30px 0px",
              padding: "0px 40px",
            }}
          >
            <img src={ICON.ITEM7.default} alt="" />
          </Col>

          <Col
            xs={24}
            xl={12}
            style={{
              margin: "30px 0px",
              textAlign: width < 1200 ? "center" : "left",
              padding: "0 40px",
            }}
          >
            <div
              style={{
                fontSize: width < 1200 ? "36px" : "50px",
                fontWeight: 700,
              }}
            >
              다양한 판매채널을
              <br />
              이용할 수 있어요.
            </div>

            <br />

            <div
              style={{
                fontSize: width < 1200 ? "18px" : "25px",
                fontWeight: 500,
              }}
            >
              <span style={{ color: "#2988FF" }}>스마트스토어 외 8개 마켓(쿠팡, 11번가, 지마켓/옥션, 인터파크, 위메프, 롯데온, 티몬)</span>을 한 번에 운영하실
              수 있어요.
            </div>
          </Col>
        </Row>

        <Row
          style={{
            padding: "90px 0px",
          }}
          align="middle"
        >
          <Col
            xs={24}
            xl={12}
            style={{
              margin: "30px 0px",
              padding: "0px 40px",
            }}
          >
            <img src={ICON.ITEM9.default} alt="" />
          </Col>

          <Col
            xs={24}
            xl={12}
            style={{
              margin: "30px 0px",
              textAlign: width < 1200 ? "center" : "left",
              padding: "0 40px",
            }}
          >
            <div
              style={{
                fontSize: width < 1200 ? "36px" : "50px",
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
                fontSize: width < 1200 ? "18px" : "25px",
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
            padding: "90px 0px",
          }}
        >
          <Col
            xs={24}
            xl={12}
            style={{
              margin: "30px 0px",
              textAlign: width < 1200 ? "center" : "left",
              padding: "0 40px",
            }}
          >
            <div
              style={{
                fontSize: width < 1200 ? "36px" : "50px",
                fontWeight: 700,
              }}
            >
              이용가격
            </div>

            <br />

            <div
              style={{
                fontSize: width < 1200 ? "18px" : "25px",
                fontWeight: 500,
              }}
            >
              셀포유의 많은 기능들을 저렴한 가격으로 이용해보세요.
            </div>
          </Col>

          <Col
            xs={24}
            xl={12}
            style={{
              margin: "30px 0px",
              textAlign: "center",
              padding: "0 10px",
            }}
          >
            <img src={PRICING} alt="" />
          </Col>
        </Row>

        <div
          style={{
            background: "ghostwhite",
            borderRadius: "30px",
            textAlign: "center",
            padding: "30px 0",
            margin: "120px 0px",
          }}
        >
          <div style={{ margin: "0 auto" }}>
            <div
              style={{
                fontSize: width < 1200 ? "20px" : "32px",
                color: "#3c3c3c",
                padding: "0 40px",
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
