import React from "react";
import { Card, Tabs } from "antd";
import { useHistory } from "react-router";
import {
  UserMarketAccountInfo,
  UserMarketNormalInfo,
} from "src/component/user/market/info";
import queryString from "query-string";
import { useQuery } from "@apollo/client";
import QUERIES from "src/apis/queries";
import { User } from "src/types";
import { onApolloError } from "src/common/functions";

const { TabPane } = Tabs;

const InfoPage = () => {
  const history = useHistory();
  const qs = queryString.parse(history.location.search);
  const isNormalView = Object.keys(qs).length === 0;

  const { data: myInfoData } = useQuery<{ selectMyInfoByUser: User }>(
    QUERIES.SELECT_MY_INFO,
    {
      fetchPolicy: "no-cache",
      onError: onApolloError,
    }
  );

  const userInfo = myInfoData?.selectMyInfoByUser?.userInfo;
  const naverStoreUrl = userInfo?.naverStoreUrl;
  const coupangLoginId = userInfo?.coupangLoginId;
  const coupangVendorId = userInfo?.coupangVendorId;
  const coupangAccessKey = userInfo?.coupangAccessKey;
  const coupangSecretKey = userInfo?.coupangSecretKey;
  const streetApiKey = userInfo?.streetApiKey;
  const interparkCertKey = userInfo?.interparkCertKey;
  const interparkSecretKey = userInfo?.interparkSecretKey;
  const esmplusAuctionId = userInfo?.esmplusAuctionId;
  const esmplusGmarketId = userInfo?.esmplusGmarketId;
  const streetNormalApiKey = userInfo?.streetNormalApiKey;
  const wemakepriceId = userInfo?.wemakepriceId;
  const lotteonApiKey = userInfo?.lotteonApiKey;
  const tmonId = userInfo?.tmonId;

  return (
    <>
      <Card >
        <Tabs type='card'>
          <TabPane tab={<div className="taps-label-style" >기본정보</div>} key='1'>
            <UserMarketNormalInfo myInfoData={myInfoData} />
          </TabPane>

          <TabPane tab={<div className="taps-label-style" >오픈마켓 계정목록</div>} key='2'>
            <UserMarketAccountInfo
              naverStoreUrl={naverStoreUrl}
              coupangLoginId={coupangLoginId}
              coupangVendorId={coupangVendorId}
              coupangAccessKey={coupangAccessKey}
              coupangSecretKey={coupangSecretKey}
              streetApiKey={streetApiKey}
              interparkCertKey={interparkCertKey}
              interparkSecretKey={interparkSecretKey}
              esmplusAuctionId={esmplusAuctionId}
              esmplusGmarketId={esmplusGmarketId}
              streetNormalApiKey={streetNormalApiKey}
              wemakepriceId={wemakepriceId}
              lotteonApiKey={lotteonApiKey}
              tmonId={tmonId}
            />
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default InfoPage;
