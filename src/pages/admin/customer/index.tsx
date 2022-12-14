import React, { useState } from "react";
import { Card, Descriptions, Input, Modal, Select, Table, Button, message } from "antd";
import CustomerFilter from "./customer-filter";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import QUERIES from "src/apis/queries";
import MUTATIONS from "src/apis/mutations";
import { QuerySelectUsersByAdminArgs, User, UserPurchaseInfo ,MutationDeleteStore, MutationExtendMyAccountByUser} from "src/types";
import { transformPurchaseInfo, transPhoneFormat } from "src/common/transform";
import ICON from "src/assets/icon";
import { useHistory } from "react-router";
import { format } from 'date-fns';

const { Option } = Select;

interface Props {}

const sort = (a: any, b: any) => {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
};

const { Item } = Descriptions;

const Customer = (props: Props) => {
  const history = useHistory();
  const [currentData, setCurrentData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<Array<number>>([]);

  const [searchInput, setSearchInput] = useState("");
  
  const [currentUserInfo, setCurrentUserInfo] = useState([]);
  const [searchUserInfo, setSearchUserInfo] = useState([]);

  const {
    loading: userListLoading,
    error: userListError,
    data: userListData,
    refetch: userListRefetch,
  } = useQuery<{ selectUsersByAdmin: User[] }, QuerySelectUsersByAdminArgs>(QUERIES.USER_LIST_BY_ADMIN,{ fetchPolicy: "no-cache" });

  const [ userDetailQuery, { data: userDetailData, loading: userDetailLoading } ] = 
  useLazyQuery<{ selectUsersByAdmin: User[] }, QuerySelectUsersByAdminArgs>(QUERIES.USER_LIST_BY_ADMIN, { 
    onCompleted(data) {
      let result = data.selectUsersByAdmin;
      
      setCurrentUserInfo(result);
    },

    onError() {
      setCurrentUserInfo([]);
    },

    fetchPolicy: "no-cache" 
  });

  const [extendAccount] = useMutation<
  { extendMyAccountByUser: boolean },
  MutationExtendMyAccountByUser
>(MUTATIONS.EXTEND_MY_ACCOUNT_BY_USER, {
});

  const [ userDetail2Query, { data: userDetail2Data, loading: userDetail2Loading } ] = 
  useLazyQuery<{ selectUsersByAdmin: User[] }, QuerySelectUsersByAdminArgs>(QUERIES.USER_LIST_BY_ADMIN, { 
    onCompleted(data) {
      let result = data.selectUsersByAdmin;
      
      if (result.length === 1) {
        extendAccount({
          variables: {
            masterId: currentData?.masterUserId,
            slaveIds: [result[0].masterUserId]
          }
        }).then(() => {
          alert("OK");
        });
      } else {
        return;
      }
    },

    onError() {
      setSearchUserInfo([]);
    },

    fetchPolicy: "no-cache" 
  });

  const [deleteStore] = useMutation<
  { deleteStore: boolean },
  MutationDeleteStore
>(MUTATIONS.DELETE_STORE, {
  refetchQueries: ["USER_LIST_BY_ADMIN"],
});

  const [pageSize, setPageSize] = useState<Number>(20);

  const rowSelection = {
    selectedRowKeys: selectedItemIds,
    onSelect: (
      record: User,
      selected: boolean,
      selectedRows: User[],
      nativeEvent: any
    ) => {
      let tempData = [...selectedItemIds];
      if (selected) {
        tempData.push(record.id ?? 0);
        setSelectedItemIds(tempData);
      } else {
        setSelectedItemIds(tempData.filter((v) => v !== record.id));
      }
    },
    onSelectAll: (selected: any, selectedRows: any, changeRows: User[]) => {
      if (selected) {
        let tempData = [...selectedItemIds];
        selectedRows.map((v: User) => v && tempData.push(v.id ?? 0));
        const set = Array.from(new Set(tempData)); // ?????? ??????
        setSelectedItemIds(set);
      } else {
        //??????????????? ????????? ????????? ??????
        const selectedRowsUserId = changeRows.map((v) => v.id);
        setSelectedItemIds(
          selectedItemIds.filter(
            (v) => !selectedRowsUserId.includes(v as number)
          )
        );
      }
    },
  };
  const columns = [
    {
      title: "?????????",
      dataIndex: "email",
      width: "20%",
    },
    {
      title: "????????? ????????????",
      render: (data: User) => {
        return <>
          {data.userInfo.naverStoreUrl !== "" ? 
            <img src={ICON.NAVER_ICON1.default} alt="" onClick={ async (e) => {
              console.log(data.userInfo.userId);
              let OK = window.confirm(`${data.email} ?????????????????? ?????? ????????????????????????? `)
              if(OK){
                const result = await deleteStore({
                  variables : {
                    id : data.userInfo.userId,
                    store : "smart"
                  },
                }).catch((e) => e as Error);
                if(result instanceof Error) {
                  message.error(result.message);
                  return false;
                }
                return result.data.deleteStore as boolean;
              }
            }}/> 
          : 
            <img src={ICON.NAVER_ICON1_GRAY.default} alt="" />
          }

          &nbsp;
          
          {data.userInfo.coupangLoginId !== "" && 
          data.userInfo.coupangVendorId !== "" && 
          data.userInfo.coupangAccessKey !== "" && 
          data.userInfo.coupangSecretKey !== "" ? 
            <img src={ICON.COUPANG_ICON.default} alt="" onClick={ async(e) => {
              console.log(data.userInfo);
              let OK = window.confirm(`${data.email} ?????? ?????? ????????????????????????? `)
              if(OK){
                const result = await deleteStore({
                  variables : {
                    id : data.userInfo.userId,
                    store : "coupang"
                  },
                }).catch((e) => e as Error);
                if(result instanceof Error) {
                  message.error(result.message);
                  return false;
                }
                return result.data.deleteStore as boolean;
              }
            }} /> 
          : 
            <img src={ICON.COUPANG_ICON_GRAY.default} alt="" />
          }

          &nbsp;

          {data.userInfo.streetApiKey !== "" ? 
            <img src={ICON.STREET_ICON.default} alt="" onClick={async(e) => {
              console.log(data.userInfo.userId);
              let OK = window.confirm(`${data.email} 11?????? global ?????? ????????????????????????? `)
              if(OK){
                const result = await deleteStore({
                  variables : {
                    id : data.userInfo.userId,
                    store : "11street-global"
                  },
                }).catch((e) => e as Error);
                if(result instanceof Error) {
                  message.error(result.message);
                  return false;
                }
                return result.data.deleteStore as boolean;
              }
            }}/> 
          : 
            <img src={ICON.STREET_ICON_GRAY.default} alt="" />
          }

          &nbsp;

          {data.userInfo.streetNormalApiKey !== "" ? 
            <img src={ICON.STREET_NORMAL_ICON.default} alt="" onClick={async(e) => {
              console.log(data.userInfo.userId);
              let OK = window.confirm(`${data.email} 11?????? normal?????? ????????????????????????? `)
              if(OK){
                const result = await deleteStore({
                  variables : {
                    id : data.userInfo.userId,
                    store : "11street-normal"
                  },
                }).catch((e) => e as Error);
                if(result instanceof Error) {
                  message.error(result.message);
                  return false;
                }
                return result.data.deleteStore as boolean;
              }
            }}/> 
          : 
            <img src={ICON.STREET_NORMAL_ICON_GRAY.default} alt="" />
          }

          &nbsp;

          {data.userInfo.interparkCertKey !== "" && 
          data.userInfo.interparkSecretKey !== "" ? 
            <img src={ICON.INTERPARK_ICON.default} alt="" onClick={async(e) => {
              console.log(data.userInfo);
              let OK = window.confirm(`${data.email} ???????????? ?????? ????????????????????????? `)
              if(OK){
                const result = await deleteStore({
                  variables : {
                    id : data.userInfo.userId,
                    store : "interpark"
                  },
                }).catch((e) => e as Error);
                if(result instanceof Error) {
                  message.error(result.message);
                  return false;
                }
                return result.data.deleteStore as boolean;
              }
            }}/> 
          : 
            <img src={ICON.INTERPARK_ICON_GRAY.default} alt="" />
          }

          &nbsp;

          {data.userInfo.esmplusGmarketId !== "" ? 
            <img src={ICON.GMARKET_ICON.default} alt="" onClick={async(e) => {
              console.log(data.userInfo);
              let OK = window.confirm(`${data.email} ????????? ?????? ????????????????????????? `)
              if(OK){
                const result = await deleteStore({
                  variables : {
                    id : data.userInfo.userId,
                    store : "gmarket"
                  },
                }).catch((e) => e as Error);
                if(result instanceof Error) {
                  message.error(result.message);
                  return false;
                }
                return result.data.deleteStore as boolean;
              }
            }}/> 
          : 
            <img src={ICON.GMARKET_ICON_GRAY.default} alt="" />
          }

          &nbsp;

          {data.userInfo.esmplusAuctionId !== "" ? 
            <img src={ICON.AUCTION_ICON.default} alt="" onClick={async(e) => {
              console.log(data.userInfo);
              let OK = window.confirm(`${data.email} ?????? ?????? ????????????????????????? `)
              if(OK){
                const result = await deleteStore({
                  variables : {
                    id : data.userInfo.userId,
                    store : "aution"
                  },
                }).catch((e) => e as Error);
                if(result instanceof Error) {
                  message.error(result.message);
                  return false;
                }
                return result.data.deleteStore as boolean;
              }
            }}/> 
          : 
            <img src={ICON.AUCTION_ICON_GRAY.default} alt="" />
          }

          &nbsp;

          {data.userInfo.tmonId !== "" ? 
            <img src={ICON.TMON_ICON.default} alt="" onClick={async(e) => {
              console.log(data.userInfo);
              let OK = window.confirm(`${data.email} ?????? ?????? ????????????????????????? `)
              if(OK){
                const result = await deleteStore({
                  variables : {
                    id : data.userInfo.userId,
                    store : "tmon"
                  },
                }).catch((e) => e as Error);
                if(result instanceof Error) {
                  message.error(result.message);
                  return false;
                }
                return result.data.deleteStore as boolean;
              }
            }}/> 
          : 
            <img src={ICON.TMON_ICON_GRAY.default} alt="" />
          }

          &nbsp;

          {data.userInfo.wemakepriceId !== "" ? 
            <img src={ICON.WEMAKEPRICE_ICON.default} alt="" onClick={async(e) => {
              console.log(data.userInfo);
              let OK = window.confirm(`${data.email} ????????? ?????? ????????????????????????? `)
              if(OK){
                const result = await deleteStore({
                  variables : {
                    id : data.userInfo.userId,
                    store : "wemake"
                  },
                }).catch((e) => e as Error);
                if(result instanceof Error) {
                  message.error(result.message);
                  return false;
                }
                return result.data.deleteStore as boolean;
              }
            }}/> 
          : 
            <img src={ICON.WEMAKEPRICE_ICON_GRAY.default} alt="" />
          }

          &nbsp;

          {data.userInfo.lotteonApiKey !== "" &&
          data.userInfo.lotteonVendorId !== ""? 
            <img src={ICON.LOTTEON_ICON.default} alt="" onClick={async(e) => {
              console.log(data.userInfo);
              let OK = window.confirm(`${data.email} ????????? ?????? ????????????????????????? `)
              if(OK){
                const result = await deleteStore({
                  variables : {
                    id : data.userInfo.userId,
                    store : "lotteon"
                  },
                }).catch((e) => e as Error);
                if(result instanceof Error) {
                  message.error(result.message);
                  return false;
                }
                return result.data.deleteStore as boolean;
              }
            }}/> 
          : 
            <img src={ICON.LOTTEON_ICON_GRAY.default} alt="" />
          }
          
        </>;
      },
      align: "center",
      width: "15%",
    },
    {
      title: "????????? ??????",
      dataIndex: ["userInfo", "phone"],
      render: (data: number) => data && transPhoneFormat(data),
      align: "center",
      width: "15%",
    },
    {
      title: "?????? ??????",
      dataIndex: "purchaseInfo",
      render: (data: UserPurchaseInfo) => <>{transformPurchaseInfo(data)}</>,
      align: "center",
      width: "10%",
    },
    {
      title: "?????? ??????",
      render: (data: User) => (
        <>{`${data.productCount}/${
          data.userInfo?.maxProductLimit ?? "?????????"
        }`}</>
      ),
      align: "center",
      width: "10%",
    },
    {
      title: "????????????",
      dataIndex: "state",
      render: (data: string) => (
        <>{data === "ACTIVE" ? "?????????" : "????????????"}</>
      ),
      align: "center",
      width: "10%",
    },
    {
      title: "???????????????",
      dataIndex: "",
      render: (data: User) => {
        let plans = JSON.parse(data?.purchaseInfo?.history).filter(v => JSON.parse(v.planInfo).planLevel > 1);
        if (plans.length > 0) {
          return <>
            {format(new Date(data.purchaseInfo.levelExpiredAt), "dd")}
          </>;
        }

        return null;
      },
      align: "center",
      width: "10%"
    },
    {
      title: "??????",
      dataIndex: "",
      render: (data: User) => (
        <Button
          type="link"
          onClick={async () => {
            await userDetailQuery({ variables: { where: { masterUserId: { equals: data.masterUserId}}}});

            setIsModalVisible(true);
            setCurrentData(data);
          }}
        >
          ????????????
        </Button>
      ),
      align: "center",
      width: "10%",
    },
  ];

  return (
    <>
      <Card style={{ marginBottom: "60px" }}>
        <CustomerFilter
          userListRefetch={(e) => {
            userListRefetch(e);
          }}
          selectedItemIds={selectedItemIds}
          setSelectedItemIds={setSelectedItemIds}
          setPageSize={(e) => setPageSize(e)}
        />

        <br />
        
        <Table
          size="small"
          columns={columns as any}
          rowKey={(record: User) => record.id ?? 0}
          rowSelection={rowSelection}
          onChange={(e) => setPageSize(e.pageSize)}
          pagination={{
            pageSize: pageSize as number,
            showSizeChanger: true,
          }}
          loading={userListLoading}
          dataSource={userListData?.selectUsersByAdmin}
          
        />
      </Card>

      <Modal title={`?????? ????????????`} width={1200} visible={isModalVisible} footer={false} onCancel={() => {
        setIsModalVisible(false);
      }}>
        <div>
          ????????????
        </div>

        <Descriptions size="small" bordered column={1} style={{
          marginBottom: 10
        }}>
          <Item label="?????????">
            {currentData?.email}
          </Item>

          <Item label="???????????????">
            {currentData?.master ?
              <div style={{
                display: "flex",
                marginBottom: 10
              }}>
                <Input value={searchInput} style={{
                  width: 200
                }} onChange={(e) => {
                  const input = e.target.value;

                  setSearchInput(input);
                }} />

                &nbsp;
                
                <Button onClick={async () => {
                  await userDetail2Query({ variables: { where: { email: { equals: searchInput }}}});
                }}>
                  ????????????
                </Button>
              </div>
              :
              null
            }

            {currentUserInfo.map((v) => {
              return <div>
                {v.email} ({v.master ? "?????????" : "????????????"})
              </div>;
            })}
          </Item>

          <Item label="????????? ??????">
            {currentData?.userInfo?.phone}
          </Item>

          <Item label="???????????? ?????????">
            <span style={{ whiteSpace: "pre-line" }}>
              {currentData?.purchaseInfo
                ? transformPurchaseInfo(currentData?.purchaseInfo, {
                    isNeedDate: true,
                    itemDelimiter: "\n",
                  })
                : ""}
            </span>
          </Item>

          <Item label="??????(??????) ??????">
            {currentData?.purchaseInfo?.history ? JSON.parse(currentData?.purchaseInfo?.history).map((v: any, i: number) => {
              var detail = JSON.parse(v.planInfo);
              
              if (detail.planLevel < 2) {
                return null;
              } 

              return <div>?????? ??????: {detail.name} ?????? ({format(new Date(v.purchasedAt), "yyyy.MM.dd HH:mm")} ~ {format(new Date(v.expiredAt), "yyyy.MM.dd HH:mm")})</div>;
            }) : "??????"}
          </Item>

          <Item label="?????? ??????">
            <>
              {currentData
                ? `${currentData.productCount}/${
                  currentData.userInfo?.maxProductLimit ?? "?????????"
                  }`
                : ""}
            </>
          </Item>
        </Descriptions>

        <div>
          ????????????
        </div>

        <Descriptions size="small" bordered column={2}>
          <Item label="?????????????????? ??????">
            {currentData?.userInfo?.naverStoreUrl}
          </Item>

          <Item label="????????? ID">
            {currentData?.userInfo?.wemakepriceId}
          </Item>

          <Item label="?????? ?????????">
            {currentData?.userInfo?.coupangLoginId}
          </Item>

          <Item label="?????? ????????????">
            {currentData?.userInfo?.coupangVendorId}
          </Item>

          <Item label="?????? ????????????">
            {currentData?.userInfo?.coupangAccessKey}
          </Item>

          <Item label="?????? ????????????">
            {currentData?.userInfo?.coupangSecretKey}
          </Item>

          <Item label="11?????? G-Open API Key">
            {currentData?.userInfo?.streetApiKey}
            {currentData?.userInfo?.streetApiKey2}
            {currentData?.userInfo?.streetApiKey3}
            {currentData?.userInfo?.streetApiKey4}
          </Item>

          <Item label="11?????? N-Open API Key">
            {currentData?.userInfo?.streetNormalApiKey}
            {currentData?.userInfo?.streetNormalApiKey2}
            {currentData?.userInfo?.streetNormalApiKey3}
            {currentData?.userInfo?.streetNormalApiKey4}
          </Item>

          <Item label="???????????? ???????????? ?????????">
            {currentData?.userInfo?.interparkCertKey}
          </Item>

          <Item label="???????????? ???????????? ????????????">
            {currentData?.userInfo?.interparkSecretKey}
          </Item>

          <Item label="???????????? ???????????? ?????????">
            {currentData?.userInfo?.interparkEditCertKey}
          </Item>

          <Item label="???????????? ???????????? ????????????">
            {currentData?.userInfo?.interparkEditSecretKey}
          </Item>

          <Item label="G?????? ID">
            {currentData?.userInfo?.esmplusGmarketId}
          </Item>

          <Item label="?????? ID">
            {currentData?.userInfo?.esmplusAuctionId}
          </Item>
          
          <Item label="????????? Vendor ID">
            {currentData?.userInfo?.lotteonVendorId}
          </Item>

          <Item label="????????? API ???">
            {currentData?.userInfo?.lotteonApiKey}
          </Item>
          
          <Item label="?????? ID">
            {currentData?.userInfo?.tmonId}
          </Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default Customer;
