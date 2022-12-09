import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import { Button, Card, Descriptions, message } from "antd";
import ICON from "src/assets/icon";
import ChangePasswordModal from "src/component/common/change-password-modal";
import TopBottomSelectImg from "src/component/common/top-bottom-select-img";
import { Link, useHistory } from "react-router-dom";
import NaverLogin from "src/component/sign/naver-login";
import KaKaoLogin from "react-kakao-login";
import { ApolloError, useMutation } from "@apollo/client";
import MUTATIONS from "src/apis/mutations";
import {
  MutationConnectSocialIdByUserArgs,
  MutationSignInUserByEveryoneArgs,
  SignInType,
  User,
  UserSocialType,
} from "src/types";
import { format } from "date-fns";
import DeliveryRow from "./delivery-row";
import SellPriceRow from "./sell-price-row";
import AsRow from "./as-row";
import SmartStoreRow from "./smart-store-row";
import CoupangRow from "./coupang-row";
import CollectRow from "./collect-rows";
import FeeRow from "./fee-row";

const { Item } = Descriptions;

/** 수직 수평 센터 속성 */
const matrixCenter: CSSProperties = {
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  verticalAlign: "middle",
  fontWeight: 600,
};

interface Props {
  myInfoData: {
    selectMyInfoByUser: User;
  };
}

const UserMarketNormalInfo = ({ myInfoData }: Props) => {
  const userInfo = myInfoData?.selectMyInfoByUser?.userInfo;
  /** 네이버 원산지 코드 */
  const naverOriginCode = userInfo?.naverOriginCode;
  /** 네이버 수입사 */
  const naverOrigin = userInfo?.naverOrigin;
  /** 쿠팡 배송출고 소요 기간 */
  const coupangOutboundShippingTimeDay =
    userInfo?.coupangOutboundShippingTimeDay;
  /** 쿠팡 묶음 배송 여부 */
  const coupangUnionDeliveryType = userInfo?.coupangUnionDeliveryType;
  /** 쿠팡 1인당 최대구매수량 */
  const coupangMaximumBuyForPerson = userInfo?.coupangMaximumBuyForPerson;

  // const [accountModal, setAccountModal] = useState<boolean>(false);
  const [passwordModal, setPasswordModal] = useState<boolean>(false);
  // const [phoneNumberModal, setPhoneNumberModal] = useState<boolean>(false);
  const history = useHistory();

  const [signInUser] = useMutation<
    { signInUserByEveryone: SignInType },
    MutationSignInUserByEveryoneArgs
  >(MUTATIONS.SIGN_IN_USER, { fetchPolicy: "no-cache" });

  const [connectSocialId] = useMutation<
    { connectSocialIdByUser: User },
    MutationConnectSocialIdByUserArgs
  >(MUTATIONS.CONNECT_SOCIAL_ID, { fetchPolicy: "no-cache" });
  // const [updateMyInfo] = useMutation<
  //   { updateMyDataByUser: Boolean },
  //   MutationUpdateMyDataByUserArgs
  // >(MUTATIONS.UPDATE_MY_INFO, {
  //   refetchQueries: ["SELECT_MY_INFO"],
  // });

  const [info, setInfo] = useState<User>();

  useEffect(() => {
    if (myInfoData?.selectMyInfoByUser) setInfo(myInfoData?.selectMyInfoByUser);
  }, [myInfoData]);

  const [marginRate, setMarginRate] = useState(info?.userInfo?.marginRate);
  const [marginUnitType, setMarginUnitType] = useState(info?.userInfo?.marginUnitType);

  const [defaultShippingFee, setDefaultShippingFee] = useState(
    info?.userInfo?.defaultShippingFee
  );
  const [cnyRate, setCnyRate] = useState(info?.userInfo?.cnyRate);
  const [additionalShippingFeeJeju, setAdditionalShippingFeeJeju] =
    useState<number>(info?.userInfo?.additionalShippingFeeJeju ?? 0);
  const [asTel, setAsTel] = useState<string>(info?.userInfo?.asTel ?? "");
  const [asInformation, setAsInformation] = useState<string>(
    info?.userInfo?.asInformation ?? ""
  );
  const [refundShippingFee, setRefundShippingFee] = useState<number>(
    info?.userInfo?.refundShippingFee ?? 0
  );
  const [exchangeShippingFee, setExchangeShippingFee] = useState<number>(
    info?.userInfo?.exchangeShippingFee ?? 0
  );
  const [collectTimeout, setCollectTimeout] = useState<number>(
    info?.userInfo?.collectTimeout ?? 0
  )

  const [naverFee, setNaverFee] = useState(info?.userInfo?.naverFee);
  const [coupangFee, setCoupangFee] = useState(info?.userInfo?.coupangFee);
  const [streetFee, setStreetFee] = useState(info?.userInfo?.streetFee);
  const [gmarketFee, setGmarketFee] = useState(info?.userInfo?.gmarketFee);
  const [auctionFee, setAuctionFee] = useState(info?.userInfo?.auctionFee);
  const [interparkFee, setInterparkFee] = useState(info?.userInfo?.interparkFee);

  const [discountAmount, setDiscountAmount] = useState<number>(
    info?.userInfo?.discountAmount ?? 0
  )
  const [discountUnitType, setDiscountUnitType] = useState<string>(
    info?.userInfo?.discountUnitType ?? ""
  )

  const [naverStoreOnly, setNaverStoreOnly] = useState<string>(
    info?.userInfo?.naverStoreOnly ?? ""
  )

  const [coupangImageOpt, setCoupangImageOpt] = useState<string>(
    info?.userInfo?.coupangImageOpt ?? ""
  )

  useEffect(() => {
    setMarginRate(info?.userInfo?.marginRate);
    setMarginUnitType(info?.userInfo?.marginUnitType);
    setDefaultShippingFee(info?.userInfo?.defaultShippingFee);
    setCnyRate(info?.userInfo?.cnyRate);
    setAdditionalShippingFeeJeju(info?.userInfo?.additionalShippingFeeJeju);
    setAsTel(info?.userInfo?.asTel);
    setAsInformation(info?.userInfo?.asInformation);
    setRefundShippingFee(info?.userInfo?.refundShippingFee);
    setExchangeShippingFee(info?.userInfo?.exchangeShippingFee);
    setCollectTimeout(info?.userInfo.collectTimeout);
    setNaverFee(info?.userInfo?.naverFee);
    setCoupangFee(info?.userInfo?.coupangFee);
    setStreetFee(info?.userInfo?.streetFee);
    setGmarketFee(info?.userInfo?.gmarketFee);
    setAuctionFee(info?.userInfo?.auctionFee);
    setInterparkFee(info?.userInfo?.interparkFee);
    setDiscountAmount(info?.userInfo?.discountAmount);
    setDiscountUnitType(info?.userInfo?.discountUnitType);
    setNaverStoreOnly(info?.userInfo?.naverStoreOnly);
    setCoupangImageOpt(info?.userInfo?.coupangImageOpt);
  }, [info]);

  function deleteUser() {
    var result = window.confirm("셀포유 계정을 완전히 삭제하시겠습니까?");

    if (result) {
      console.log(info);
    }
  }

  return (
    <Card style={{ marginBottom: "50px" }}>
      <span style={{ fontWeight: "bold" }}>
        <span style={{ color: "red" }}>
          이 페이지에서는 미리보기만 지원됩니다.

          <br />
          
          기본정보는 [셀포유 크롬 확장프로그램 {">"} 기본설정] 에서 변경하실 수 있습니다.
        </span>
      </span>

      <br />
      <br />
      
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
          ...matrixCenter,
        }}
      >
        <Item
          label="로그인 계정(ID)"
          contentStyle={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
          span={1}
        >
          {info?.email}

          <Button style={{ height: 40, marginLeft: "20px" }} onClick={() => setPasswordModal(true)}>
            비밀번호 변경하기
          </Button>

          <ChangePasswordModal
            visible={passwordModal}
            closeChangePasswordModal={() => setPasswordModal(false)}
          />
        </Item>
        {/* <Item
          label="소셜 연동"
          contentStyle={{
            display: "flex",
            alignItems: "center",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
          span={1}
        >
          <KaKaoLogin
            className="info-social-login"
            style={{ width: "100px", marginRight: "10px" }}
            token={"25b66547acb37a941a2391967727d94b"}
            onSuccess={(result) => {
              connectSocialId({
                variables: {
                  userType: "KAKAO" as UserSocialType,
                  socialId: String(result.profile?.id),
                },
              })
                .then((result) =>
                  message.success("소셜 인증에 성공하였습니다.")
                )
                .catch((e: ApolloError) => {
                  message.error(e.message);
                });
            }}
            onFail={console.error}
            onLogout={console.info}
          >
            <div
              style={{
                display: "inline-block",
                borderRadius: "3px",
                background: "#F5E05A",
              }}
            >
              <div
                style={{
                  padding: "4px 12px",
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{
                    display: "inline-block",
                    marginRight: "10px",
                    width: "15px",
                    height: "15px",
                    cursor: "pointer",
                  }}
                  src={ICON.KAKAOTALK_ICON.default}
                  alt=""
                />
                <span style={{ color: "#444444", cursor: "pointer" }}>
                  카카오
                </span>
              </div>
            </div>
          </KaKaoLogin>

          <NaverLogin
            clientId="q3_k1vVmyS1DYRqYJb7u"
            callbackUrl="http://localhost:3000/user/market/info"
            onSuccess={(result) => {
              history.location.pathname === "/user/market/info" ||
              history.location.pathname === "/user/market/info#"
                ? connectSocialId({
                    variables: {
                      userType: "NAVER" as UserSocialType,
                      socialId: result.id,
                    },
                  })
                    .then((result) =>
                      message.success("소셜 인증에 성공하였습니다.")
                    )
                    .catch((e: ApolloError) => {
                      message.error(e.message);
                    })
                : signInUser({
                    variables: {
                      userType: "NAVER" as UserSocialType,
                      email: result.id,
                      password: "",
                    },
                  })
                    .then((response: any) => {
                      const token = response.data?.signInUserByEveryone;
                      localStorage.setItem("accessToken", token.accessToken);
                      localStorage.setItem("refreshToken", token.refreshToken);
                    })
                    .catch((e: ApolloError) => {
                      message.error(e.message);
                    });
            }}
            onFailure={() => {
              // 
            }}
            render={(props: any) => (
              <button
                onClick={props.onClick}
                className="info-social-login"
                style={{ width: "100px" }}
              >
                <div
                  style={{
                    display: "inline-block",
                    borderRadius: "3px",
                    background: "#03CF5D",
                  }}
                >
                  <div
                    style={{
                      padding: "4px 12px",
                      display: "flex",
                      justifyItems: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      style={{
                        display: "inline-block",
                        marginRight: "10px",
                        width: "15px",
                        height: "15px",
                        cursor: "pointer",
                      }}
                      src={ICON.NAVER_ICON.default}
                      alt=""
                    />
                    <span style={{ color: "#fff", cursor: "pointer" }}>
                      네이버
                    </span>
                  </div>
                </div>
              </button>
            )}
          />
        </Item> */}
        <Item
          label="이용중인 서비스"
          span={2}
          contentStyle={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
        >
          <span style={{ fontWeight: "bold", color: "#2988FF" }}>
            {info?.purchaseInfo.level + "단계"}
          </span>

          &nbsp;

          <span>
            [이용기간:

            &nbsp;

            (~{info?.purchaseInfo.levelExpiredAt
              ? format(new Date(info?.purchaseInfo.levelExpiredAt), "yyyy-MM-dd HH:mm") : ""})]
          </span>
          
          <Link to="/user/payment/service-pay">
            <Button type="primary" style={{ height: 40, marginLeft: "20px" }}>
              이용료 결제하기
            </Button>
          </Link>
        </Item>
        
        <Item label="판매가 설정정보" span={2}>
          <SellPriceRow
            cnyRate={cnyRate}
            defaultShippingFee={defaultShippingFee}
            marginRate={marginRate}
            marginUnitType={marginUnitType}
            discountAmount={discountAmount}
            discountUnitType={discountUnitType}
          />
        </Item>
        <Item label="배송비 설정정보" span={2}>
          <DeliveryRow
            additionalShippingFeeJeju={additionalShippingFeeJeju}
            exchangeShippingFee={exchangeShippingFee}
            refundShippingFee={refundShippingFee}
          />
        </Item>
        <Item label="A/S 설정정보" span={2}>
          <AsRow asTel={asTel} asInformation={asInformation} />
        </Item>
        <Item label="오픈마켓 수수료율 설정정보" span={2}>
          <FeeRow 
            naverFee={naverFee}
            coupangFee={coupangFee}
            streetFee={streetFee}
            gmarketFee={gmarketFee}
            auctionFee={auctionFee}
            interparkFee={interparkFee}
          />
        </Item>
        <Item label={"상/하단 이미지 설정정보"} span={2} contentStyle={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
          <TopBottomSelectImg myInfo={info} />
        </Item>
        <Item label="스마트스토어 설정정보" span={2}>
          <SmartStoreRow
            naverOriginCode={naverOriginCode}
            naverOrigin={naverOrigin}
            naverStoreOnly={naverStoreOnly}
          />
        </Item>
        <Item label="쿠팡 설정정보" span={2}>
          <CoupangRow
            coupangOutboundShippingTimeDay={coupangOutboundShippingTimeDay}
            coupangUnionDeliveryType={coupangUnionDeliveryType}
            coupangMaximumBuyForPerson={coupangMaximumBuyForPerson}
            coupangImageOpt={coupangImageOpt}
          />
        </Item>
        <Item label={"수집 설정정보"} span={2}>
          <CollectRow
            collectTimeout={collectTimeout}
          />
        </Item>
        {/* <Item
          label="회원 탈퇴"
          contentStyle={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
        >
          <Button danger type={"primary"} size="small" onClick={deleteUser}>
            회원 탈퇴
          </Button>
        </Item> */}
      </Descriptions>
    </Card>
  );
};

export default UserMarketNormalInfo;
