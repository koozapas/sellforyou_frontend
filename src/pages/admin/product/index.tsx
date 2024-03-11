import React, { useState } from 'react';
// import { Card, Descriptions, Table, Button, message } from "antd";
// import CustomerFilter from "./customer-filter";
// import { useQuery, useMutation } from "@apollo/client";
// import QUERIES from "src/apis/queries";
// import MUTATIONS from "src/apis/mutations";
// import {
//   QuerySelectUsersByAdminArgs,
//   User,
//   UserPurchaseInfo,
//   MutationDeleteStore,
//   MutationExtendMyAccountByUser,
//   Product,
// } from "src/types";
// import ICON from "src/assets/icon";

// interface Props {}

// const { Item } = Descriptions;

// const Customer = (props: Props) => {
//   const [selectedItemIds, setSelectedItemIds] = useState<Array<number>>([]);

//   const { data: userListData, refetch: userListRefetch } = useQuery<
//     { selectProductByAdmin: Product[] },
//     QuerySelectUsersByAdminArgs
//   >(QUERIES.USER_LIST_BY_ADMIN, { fetchPolicy: "no-cache" });
//   // 처음에 데이터 안불러 오게 하려고 이렇게 처리함 .. SELECT_MY_PRODUCT_BY_ADMIN 조건없이 뽑아내면 서버 뻗음 데이터가 너무많아서 .. 일단 첨엔 양식맞춰서 이렇게 들고오자 근데 refetch가 좆같네..
//   // 기존 데이터에서 필터링 하는걸 삽입하는거로 바꿔야겠네;; ㅅㅂ
//   const [deleteStore] = useMutation<
//     { deleteStore: boolean },
//     MutationDeleteStore
//   >(MUTATIONS.DELETE_STORE, {
//     refetchQueries: ["USER_LIST_BY_ADMIN"],
//   });

//   const [pageSize, setPageSize] = useState<Number>(20);

//   const rowSelection = {
//     selectedRowKeys: selectedItemIds,
//     onSelect: (
//       record: Product,
//       selected: boolean,
//       selectedRows: Product[],
//       nativeEvent: any
//     ) => {
//       let tempData = [...selectedItemIds];
//       if (selected) {
//         tempData.push(record.id ?? 0);
//         setSelectedItemIds(tempData);
//       } else {
//         setSelectedItemIds(tempData.filter((v) => v !== record.id));
//       }
//     },
//     onSelectAll: (selected: any, selectedRows: any, changeRows: Product[]) => {
//       if (selected) {
//         let tempData = [...selectedItemIds];
//         selectedRows.map((v: User) => v && tempData.push(v.id ?? 0));
//         const set = Array.from(new Set(tempData)); // 중복 제거
//         setSelectedItemIds(set);
//       } else {
//         //한페이지에 선택된 항목만 제거
//         const selectedRowsUserId = changeRows.map((v) => v.id);
//         setSelectedItemIds(
//           selectedItemIds.filter(
//             (v) => !selectedRowsUserId.includes(v as number)
//           )
//         );
//       }
//     },
//   };
//   const columns = [
//     {
//       title: "상품코드",
//       // dataIndex: "siteCode",
//       dataIndex: "email",
//       width: "20%",
//     },
//     {
//       title: "스토어 등록상태",
//       render: (data: User) => {
//         return (
//           <>
//             {data.userInfo.naverStoreUrl !== "" ? (
//               <img
//                 src={ICON.NAVER_ICON1.default}
//                 alt=""
//                 onClick={async (e) => {
//                   console.log(data.userInfo.userId);
//                   let OK = window.confirm(
//                     `${data.email} 스마트스토어 연동 해제하시겠습니까? `
//                   );
//                   if (OK) {
//                     const result = await deleteStore({
//                       variables: {
//                         id: data.userInfo.userId,
//                         store: "smart",
//                       },
//                     }).catch((e) => e as Error);
//                     if (result instanceof Error) {
//                       message.error(result.message);
//                       return false;
//                     }
//                     return result.data.deleteStore as boolean;
//                   }
//                 }}
//               />
//             ) : (
//               <img src={ICON.NAVER_ICON1_GRAY.default} alt="" />
//             )}
//             &nbsp;
//             {data.userInfo.coupangLoginId !== "" &&
//             data.userInfo.coupangVendorId !== "" &&
//             data.userInfo.coupangAccessKey !== "" &&
//             data.userInfo.coupangSecretKey !== "" ? (
//               <img
//                 src={ICON.COUPANG_ICON.default}
//                 alt=""
//                 onClick={async (e) => {
//                   console.log(data.userInfo);
//                   let OK = window.confirm(
//                     `${data.email} 쿠팡 연동 해제하시겠습니까? `
//                   );
//                   if (OK) {
//                     const result = await deleteStore({
//                       variables: {
//                         id: data.userInfo.userId,
//                         store: "coupang",
//                       },
//                     }).catch((e) => e as Error);
//                     if (result instanceof Error) {
//                       message.error(result.message);
//                       return false;
//                     }
//                     return result.data.deleteStore as boolean;
//                   }
//                 }}
//               />
//             ) : (
//               <img src={ICON.COUPANG_ICON_GRAY.default} alt="" />
//             )}
//             &nbsp;
//             {data.userInfo.streetApiKey !== "" ? (
//               <img
//                 src={ICON.STREET_ICON.default}
//                 alt=""
//                 onClick={async (e) => {
//                   console.log(data.userInfo.userId);
//                   let OK = window.confirm(
//                     `${data.email} 11번가 global 연동 해제하시겠습니까? `
//                   );
//                   if (OK) {
//                     const result = await deleteStore({
//                       variables: {
//                         id: data.userInfo.userId,
//                         store: "11street-global",
//                       },
//                     }).catch((e) => e as Error);
//                     if (result instanceof Error) {
//                       message.error(result.message);
//                       return false;
//                     }
//                     return result.data.deleteStore as boolean;
//                   }
//                 }}
//               />
//             ) : (
//               <img src={ICON.STREET_ICON_GRAY.default} alt="" />
//             )}
//             &nbsp;
//             {data.userInfo.streetNormalApiKey !== "" ? (
//               <img
//                 src={ICON.STREET_NORMAL_ICON.default}
//                 alt=""
//                 onClick={async (e) => {
//                   console.log(data.userInfo.userId);
//                   let OK = window.confirm(
//                     `${data.email} 11번가 normal연동 해제하시겠습니까? `
//                   );
//                   if (OK) {
//                     const result = await deleteStore({
//                       variables: {
//                         id: data.userInfo.userId,
//                         store: "11street-normal",
//                       },
//                     }).catch((e) => e as Error);
//                     if (result instanceof Error) {
//                       message.error(result.message);
//                       return false;
//                     }
//                     return result.data.deleteStore as boolean;
//                   }
//                 }}
//               />
//             ) : (
//               <img src={ICON.STREET_NORMAL_ICON_GRAY.default} alt="" />
//             )}
//             &nbsp;
//             {data.userInfo.interparkCertKey !== "" &&
//             data.userInfo.interparkSecretKey !== "" ? (
//               <img
//                 src={ICON.INTERPARK_ICON.default}
//                 alt=""
//                 onClick={async (e) => {
//                   console.log(data.userInfo);
//                   let OK = window.confirm(
//                     `${data.email} 인터파크 연동 해제하시겠습니까? `
//                   );
//                   if (OK) {
//                     const result = await deleteStore({
//                       variables: {
//                         id: data.userInfo.userId,
//                         store: "interpark",
//                       },
//                     }).catch((e) => e as Error);
//                     if (result instanceof Error) {
//                       message.error(result.message);
//                       return false;
//                     }
//                     return result.data.deleteStore as boolean;
//                   }
//                 }}
//               />
//             ) : (
//               <img src={ICON.INTERPARK_ICON_GRAY.default} alt="" />
//             )}
//             &nbsp;
//             {data.userInfo.esmplusGmarketId !== "" ? (
//               <img
//                 src={ICON.GMARKET_ICON.default}
//                 alt=""
//                 onClick={async (e) => {
//                   console.log(data.userInfo);
//                   let OK = window.confirm(
//                     `${data.email} 지마켓 연동 해제하시겠습니까? `
//                   );
//                   if (OK) {
//                     const result = await deleteStore({
//                       variables: {
//                         id: data.userInfo.userId,
//                         store: "gmarket",
//                       },
//                     }).catch((e) => e as Error);
//                     if (result instanceof Error) {
//                       message.error(result.message);
//                       return false;
//                     }
//                     return result.data.deleteStore as boolean;
//                   }
//                 }}
//               />
//             ) : (
//               <img src={ICON.GMARKET_ICON_GRAY.default} alt="" />
//             )}
//             &nbsp;
//             {data.userInfo.esmplusAuctionId !== "" ? (
//               <img
//                 src={ICON.AUCTION_ICON.default}
//                 alt=""
//                 onClick={async (e) => {
//                   console.log(data.userInfo);
//                   let OK = window.confirm(
//                     `${data.email} 옥션 연동 해제하시겠습니까? `
//                   );
//                   if (OK) {
//                     const result = await deleteStore({
//                       variables: {
//                         id: data.userInfo.userId,
//                         store: "aution",
//                       },
//                     }).catch((e) => e as Error);
//                     if (result instanceof Error) {
//                       message.error(result.message);
//                       return false;
//                     }
//                     return result.data.deleteStore as boolean;
//                   }
//                 }}
//               />
//             ) : (
//               <img src={ICON.AUCTION_ICON_GRAY.default} alt="" />
//             )}
//             &nbsp;
//             {data.userInfo.tmonId !== "" ? (
//               <img
//                 src={ICON.TMON_ICON.default}
//                 alt=""
//                 onClick={async (e) => {
//                   console.log(data.userInfo);
//                   let OK = window.confirm(
//                     `${data.email} 티몬 연동 해제하시겠습니까? `
//                   );
//                   if (OK) {
//                     const result = await deleteStore({
//                       variables: {
//                         id: data.userInfo.userId,
//                         store: "tmon",
//                       },
//                     }).catch((e) => e as Error);
//                     if (result instanceof Error) {
//                       message.error(result.message);
//                       return false;
//                     }
//                     return result.data.deleteStore as boolean;
//                   }
//                 }}
//               />
//             ) : (
//               <img src={ICON.TMON_ICON_GRAY.default} alt="" />
//             )}
//             &nbsp;
//             {data.userInfo.wemakepriceId !== "" ? (
//               <img
//                 src={ICON.WEMAKEPRICE_ICON.default}
//                 alt=""
//                 onClick={async (e) => {
//                   console.log(data.userInfo);
//                   let OK = window.confirm(
//                     `${data.email} 위메프 연동 해제하시겠습니까? `
//                   );
//                   if (OK) {
//                     const result = await deleteStore({
//                       variables: {
//                         id: data.userInfo.userId,
//                         store: "wemake",
//                       },
//                     }).catch((e) => e as Error);
//                     if (result instanceof Error) {
//                       message.error(result.message);
//                       return false;
//                     }
//                     return result.data.deleteStore as boolean;
//                   }
//                 }}
//               />
//             ) : (
//               <img src={ICON.WEMAKEPRICE_ICON_GRAY.default} alt="" />
//             )}
//             &nbsp;
//             {data.userInfo.lotteonApiKey !== "" &&
//             data.userInfo.lotteonVendorId !== "" ? (
//               <img
//                 src={ICON.LOTTEON_ICON.default}
//                 alt=""
//                 onClick={async (e) => {
//                   console.log(data.userInfo);
//                   let OK = window.confirm(
//                     `${data.email} 롯데온 연동 해제하시겠습니까? `
//                   );
//                   if (OK) {
//                     const result = await deleteStore({
//                       variables: {
//                         id: data.userInfo.userId,
//                         store: "lotteon",
//                       },
//                     }).catch((e) => e as Error);
//                     if (result instanceof Error) {
//                       message.error(result.message);
//                       return false;
//                     }
//                     return result.data.deleteStore as boolean;
//                   }
//                 }}
//               />
//             ) : (
//               <img src={ICON.LOTTEON_ICON_GRAY.default} alt="" />
//             )}
//           </>
//         );
//       },
//       align: "center",
//       width: "15%",
//     },
//     {
//       title: "",
//       dataIndex: ["userInfo", "phone"],
//       render: (data: number) => <></>,
//       align: "center",
//       width: "15%",
//     },
//     {
//       title: "",
//       dataIndex: "purchaseInfo2",
//       render: (data: UserPurchaseInfo) => <></>,
//       align: "center",
//       width: "10%",
//     },
//     {
//       title: "",
//       render: (data: User) => <></>,
//       align: "center",
//       width: "10%",
//     },
//     {
//       title: "",
//       render: (data: User) => <></>,
//       align: "center",
//       width: "10%",
//     },
//     {
//       title: "",
//       dataIndex: "state",
//       render: (data: string) => <></>,
//       align: "center",
//       width: "10%",
//     },
//     {
//       title: "",
//       dataIndex: "",
//       render: (data: User) => {
//         let plans = JSON.parse(data?.purchaseInfo?.history).filter(
//           (v) => JSON.parse(v.planInfo).planLevel > 1
//         );
//         if (plans.length > 0) {
//           return <></>;
//         }

//         return null;
//       },
//       align: "center",
//       width: "10%",
//     },
//     {
//       title: "",
//       dataIndex: "",
//       render: (data: User) => (
//         <Button type="link" onClick={async () => {}}></Button>
//       ),
//       align: "center",
//       width: "10%",
//     },
//   ];

//   return (
//     <>
//       <Card>
//         <CustomerFilter
//           userListRefetch={(e) => {
//             userListRefetch(e);
//           }}
//           selectedItemIds={selectedItemIds}
//           setSelectedItemIds={setSelectedItemIds}
//           setPageSize={(e) => setPageSize(e)}
//         />
//         <br />
//         <Table
//           size="small"
//           columns={columns as any}
//           rowKey={(record: Product) => record.id ?? 0}
//           rowSelection={rowSelection}
//           onChange={(e) => setPageSize(e.pageSize)}
//           pagination={false}
//           dataSource={userListData?.selectProductByAdmin}
//         />
//       </Card>
//     </>
//     //   <Card title="결제 정보">
//     //   <Table
//     //     rowKey={(record: PlanInfo) => record.id}
//     //     columns={columns}
//     //     dataSource={planInfo}
//     //     pagination={false}
//     //     expandRowByClick={true}
//     //     expandable={{
//     //       expandedRowRender: (record) => (
//     //         <Card className="mx-auto">
//     //           <UpdatePlanInfoPage info={record} />
//     //         </Card>
//     //       ),
//     //     }}
//     //   />
//     // </Card>
//   );
// };

// export default Customer;
