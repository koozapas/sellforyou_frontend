import React from "react";
import { Card, Descriptions, Input } from "antd";

const { Item } = Descriptions;

type U<T> = T | undefined;
interface Props {
  naverStoreUrl: U<string>;
  coupangLoginId: U<string>;
  coupangVendorId: U<string>;
  coupangAccessKey: U<string>;
  coupangSecretKey: U<string>;
  streetApiKey: U<string>;
  interparkCertKey: U<string>;
  interparkSecretKey: U<string>;
  esmplusAuctionId: U<string>;
  esmplusGmarketId: U<string>;
  streetNormalApiKey: U<string>;
  wemakepriceId: U<string>;
  lotteonApiKey: U<string>;
  tmonId: U<string>;
}

/** 마켓관리 / 기본정보 / 계정목록 */
const UserMarketAccountInfo = ({
  naverStoreUrl,
  coupangLoginId,
  coupangVendorId,
  coupangAccessKey,
  coupangSecretKey,
  streetApiKey,
  interparkCertKey,
  interparkSecretKey,
  esmplusAuctionId,
  esmplusGmarketId,
  streetNormalApiKey,
  wemakepriceId,
  lotteonApiKey,
  tmonId
}: Props) => {
  return (
    <>
    <span style={{ fontWeight: "bold" }}>
            <span style={{ color: "red" }}>
              이 페이지에서는 연동여부만 확인가능합니다.

              <br />
              
              오픈마켓 연동은 [셀포유 크롬 확장프로그램 {">"} 기본설정 {">"} 오픈마켓 계정 연동] 에서 진행하실 수 있습니다.
            </span>
            
            <br />
            <br />
            
            스마트스토어는 판매자센터에 반드시 로그인이 되어 있어야 연동이 가능합니다.
            
            <br />
            
            한 번 연동된 오픈마켓은 수정하실 수 없으니 반드시 본인의 계정으로 연동해주세요.
          </span>

      <br />
      <br />

      {/* <div style={{background: "white", width: "100vw", height: "100vh"}}>
        <Card className="mb-3" style={{ width: "60%" }}>
          <span style={{ fontWeight: "bold" }}>
            <span style={{ color: "red" }}>
              이 페이지에서는 미리보기만 지원됩니다.

              <br />
              
              오픈마켓 연동은 [셀포유 크롬 확장프로그램 {">"} 기본설정 {">"} 오픈마켓 계정 연동] 에서 진행하실 수 있습니다.
            </span>
            
            <br />
            <br />
            
            스마트스토어는 판매자센터에 반드시 로그인이 되어 있어야 연동이 가능합니다.
            
            <br />
            
            한 번 연동된 오픈마켓은 수정하실 수 없으니 반드시 본인의 계정으로 연동해주세요.
          </span>

          <br />
          <br />

          <article
            className="grid text-center info-account-grid"
            style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "4px" }}
          >
            <span style={{background: "#2988ff"}}>스마트스토어</span>
            <span style={{background: "#2988ff"}}>쿠팡</span>
            <section>
              {arrayGenerator([["스마트스토어 주소", naverStoreUrl]])}
            </section>
            <section>
              {arrayGenerator([
                ["아이디", coupangLoginId],
                ["업체코드", coupangVendorId],
                ["Access Key", coupangAccessKey],
                ["Secret Key", coupangSecretKey],
              ])}
            </section>
          </article>
        </Card>

        <br />

        <Card
          style={{ width: "60%" }}
          bodyStyle={{ paddingTop: 20, paddingBottom: 0 }}
        >
          <article
            className="grid text-center info-account-grid"
            style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "4px" }}
          >
            <span style={{background: "#2988ff"}}>11번가</span>
            <span style={{background: "#2988ff"}}>인터파크</span>
            <section>
              {arrayGenerator([
                ["Open API Key", streetApiKey],
              ])}
            </section>
            <section>
              {arrayGenerator([
                ["상품등록 인증키", interparkCertKey],
                ["상품등록 비밀키", interparkSecretKey],
              ])}
            </section>
          </article>
        </Card>

        <br />

        <Card
          className="mb-3"
          style={{ width: "60%" }}
          bodyStyle={{ paddingTop: 20, paddingBottom: 0 }}
        >
          <article
            className="grid text-center info-account-grid "
            style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "4px" }}
          >
            <span style={{background: "#2988ff"}}>G마켓</span>
            <span style={{background: "#2988ff"}}>옥션</span>
            <section>
              {arrayGenerator([
                ["G마켓 ID", esmplusGmarketId],
              ])}
            </section>
            <section>
              {arrayGenerator([
                ["옥션 ID", esmplusAuctionId],
              ])}
            </section>
          </article>
        </Card>
      </div> */}

      <Descriptions
        className="user-market-info-description "
        style={{ overflow: "auto", width: "90%" }}
        // title="기본 정보"
        bordered
        column={1}
        labelStyle={{
          width: "180px",
          wordBreak: "keep-all",
          whiteSpace: "pre",
          // ...matrixCenter,
        }}
      >
        <Item
          label="오픈마켓명"
          contentStyle={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
          span={1}
        >
          연동여부
        </Item>

        <Item
          label="스마트스토어"
          contentStyle={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
          span={1}
        >
          {naverStoreUrl ? "Y" : "N"}
        </Item>

        <Item
          label="쿠팡"
          contentStyle={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
          span={1}
        >
          {coupangLoginId && coupangVendorId && coupangAccessKey && coupangSecretKey ? "Y" : "N"}
        </Item>

        <Item
          label="11번가 글로벌"
          contentStyle={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
          span={1}
        >
          {streetApiKey ? "Y" : "N"}
        </Item>

        <Item
          label="11번가 일반"
          contentStyle={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
          span={1}
        >
          {streetNormalApiKey ? "Y" : "N"}
        </Item>

        <Item
          label="G마켓"
          contentStyle={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
          span={1}
        >
          {esmplusGmarketId ? "Y" : "N"}
        </Item>

        <Item
          label="옥션"
          contentStyle={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
          span={1}
        >
          {esmplusAuctionId ? "Y" : "N"}
        </Item>

        <Item
          label="인터파크"
          contentStyle={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
          span={1}
        >
          {interparkCertKey && interparkSecretKey ? "Y" : "N"}
        </Item>

        <Item
          label="위메프"
          contentStyle={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
          span={1}
        >
          {wemakepriceId ? "Y" : "N"}
        </Item>

        <Item
          label="롯데온"
          contentStyle={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
          span={1}
        >
          {lotteonApiKey ? "Y" : "N"}
        </Item>

        <Item
          label="티몬"
          contentStyle={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
          span={1}
        >
          {tmonId ? "Y" : "N"}
        </Item>
      </Descriptions>
    </>
  );
};

export default UserMarketAccountInfo;

const arrayGenerator = (arr: [string, string][]) =>
  arr.map((v, i) => (
    <div className="flex items-center my-2" key={i}>
      <div style={{ width: "200px" }}>{v[0]}</div>
      <Input style={{ cursor: "not-allowed" }} readOnly value={v[1]} />
    </div>
  ));

const Empty = () => <section style={{ padding: 10 }}>
  연동 정보가 없습니다.
</section>;
