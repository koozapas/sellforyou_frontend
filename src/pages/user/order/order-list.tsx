import React, { useState } from "react";
import OrderListFilter from "./order-list-filter";
import { Card, Table, Tabs } from "antd";
import { Resizable } from "react-resizable";
import { ColumnsType } from "antd/lib/table";
import { useQuery } from "@apollo/client";
import QUERIES from "src/apis/queries";
import {
  Order,
  OrderState,
  QuerySelectOrdersByUserArgs,
  User,
} from "src/types";
import { format } from "date-fns";
import { PlayAutoOrderState } from "src/common/playauto";
import { transCNYMoneyFormat, transWONMoneyFormat } from "src/common/transform";
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;

interface Props {}

const ResizeableTitle = (props: {
  [x: string]: any;
  onResize: any;
  width: any;
}) => {
  const { onResize, width, ...restProps } = props;
  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const OrderList = (props: Props) => {
  const history = useHistory();
  const [changeSelectBox, setChangeSelectBox] =
    useState<String>("orderProductNumber");
  const [selectedItemIds, setSelectedItemIds] = useState<Array<number>>([]);
  const [orderState, setOrderState] = useState<string>("NEW");
  const [pageSize, setPageSize] = useState<Number>(20);

  const {
    loading: selectOrdersLoading,
    error: selectOrdersError,
    data: selectOrdersData,
    refetch: selectOrdersRefetch,
  } = useQuery<{ selectOrdersByUser: Order[] }, QuerySelectOrdersByUserArgs>(
    QUERIES.SELECT_ORDERS_BY_USER,
    {
      variables: {
        where: {
          state: { equals: orderState as OrderState },
        },
      },
    }
  );
  const {
    loading: countLoading,
    error: countError,
    data: countsData,
    refetch: countRefetch,
  } = useQuery<{ selectOrdersByUser: Order[] }, QuerySelectOrdersByUserArgs>(
    QUERIES.SELECT_ORDERS_BY_USER_COUNT
  );

  const searching = (e: string) => {
    switch (changeSelectBox) {
      case "orderProductNumber": //??????????????????
        selectOrdersRefetch({ where: { orderProductNumber: { contains: e } } });
        break;
      case "storeProductId": //????????????
        selectOrdersRefetch({ where: { storeProductId: { contains: e } } });
        break;
      case "buyerName": //?????????
        selectOrdersRefetch({ where: { buyerName: { contains: e } } });
        break;
      case "receiverName": //?????????
        selectOrdersRefetch({ where: { receiverName: { contains: e } } });
        break;
      case "customId": //????????????
        selectOrdersRefetch({ where: { customId: { contains: e } } });
        break;
    }
  };

  const windowOpenItemDetail = (e: number) => {
    window.open(
      `/order-item-detail?id=${e}`,
      "new window",
      "scrollbars=yes,resizable=no width=900 height=850"
    );
  };

  const [columns, setColumns] = useState([
    {
      title: "",
      // render: (data: Order) => (
      //   <img
      //     style={{ cursor: 'pointer', width: '20px', minWidth: '20px', height: '20px' }}
      //     src={shopIcon[data.userShopData.siteCode]}
      //     onClick={() => {
      //       if (data.storeUrl) window.open(data.storeUrl)
      //     }}
      //   />
      // ),
      width: 40,
      ellipsis: true,
    },
    {
      title: "????????????",
      dataIndex: ["userShopData", "siteUserId"],
      width: 70,
      ellipsis: true,
    },
    {
      title: "??????????????????",
      render: (data: Order) => (
        <a
          onClick={(e) => {
            windowOpenItemDetail(Number(data.id));
          }}
        >
          {data.orderProductNumber}
        </a>
      ),
      width: 160,
      ellipsis: true,
    },

    {
      title: "??????????????????",
      // dataIndex: 'storeProductId',
      render: (data: Order) => (
        <a href={data.storeUrl} target={"_blank"}>
          {data.storeProductId}
        </a>
      ),
      width: 110,
      ellipsis: true,
    },
    {
      title: "????????????",
      dataIndex: "orderState",
      render: (data: number) => <div>{PlayAutoOrderState[data]}</div>,
      width: 70,
      ellipsis: true,
    },
    {
      title: "?????????",
      dataIndex: "productName",
      width: 180,
      ellipsis: true,
    },
    {
      title: "??????",
      dataIndex: "optionName",
      width: 180,
      ellipsis: true,
    },
    {
      title: "??????",
      dataIndex: "quantity",
      render: (data: Number) => (
        <div style={{ color: data > 1 ? "red" : "black" }}>{data}</div>
      ),
      width: 42,
      ellipsis: true,
    },
    {
      title: "????????????",
      // dataIndex: ['product', 'id'],
      // render: (data: Order) => <>{data?.product?.id ? "SFY_" + Number(data.id)?.toString(36) : ""}</>,
      render: (data: Order) => <>{data?.sellerProductCode}</>,
      width: 66,
      ellipsis: true,
    },
    {
      title: "????????????",
      // dataIndex: ['product', 'taobaoProduct', 'price'],
      render: (data: Order) => (
        <>
          {data?.product?.taobaoProduct?.price
            ? transCNYMoneyFormat(data.product?.taobaoProduct?.price)
            : ""}
        </>
      ),
      width: 66,
      ellipsis: true,
    },
    {
      title: "????????????",
      dataIndex: "payPrice",
      render: (data: number) => <div>{transWONMoneyFormat(data)}</div>,
      width: 90,
      ellipsis: true,
    },
    {
      title: "?????????",
      dataIndex: "shippingFee",
      render: (data: number) => <div>{transWONMoneyFormat(data)}</div>,
      width: 75,
      ellipsis: true,
    },
    {
      title: "?????????",
      dataIndex: "buyerName",
      width: 60,
      ellipsis: true,
    },
    {
      title: "?????????",
      // dataIndex: 'receiverName',
      render: (data: Order) => (
        <span
          style={{
            color:
              data.isCustomIdValid === null
                ? "#FF9900"
                : data.isCustomIdValid
                ? ""
                : "red",
          }}
        >
          {data.receiverName}
        </span>
      ),
      width: 60,
      ellipsis: true,
    },
    {
      title: "????????????",
      // dataIndex: 'customId',
      render: (data: Order) => (
        <span
          style={{
            color:
              data.isCustomIdValid === null
                ? "#FF9900"
                : data.isCustomIdValid
                ? ""
                : "red",
          }}
        >
          {data.customId}
        </span>
      ),
      width: 130,
      ellipsis: true,
    },
    {
      title: "?????????",
      dataIndex: "orderedAt",
      render: (date: string) => format(new Date(date), "yyyy.MM.dd"),
      width: 95,
      ellipsis: true,
    },
    {
      title: "???????????????",
      dataIndex: "deliveryExpiredAt",
      render: (date: string) => format(new Date(date), "yyyy.MM.dd"),
      // width: 70,
      ellipsis: true,
    },
  ]);

  const components = {
    header: {
      cell: ResizeableTitle,
    },
  };

  const handleResize =
    (index: number) =>
    (e: any, { size }: any) => {
      let nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return setColumns(nextColumns);
    };

  const columns2 = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column: { width: number }) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  const rowSelection = {
    selectedRowKeys: selectedItemIds,
    onSelect: (
      record: Order,
      selected: boolean,
      selectedRows: Order[],
      nativeEvent: any
    ) => {
      let tempData = [...selectedItemIds];
      if (selected) {
        tempData.push(Number(record.id) ?? 0);
        setSelectedItemIds(tempData);
      } else {
        setSelectedItemIds(tempData.filter((v) => v !== Number(record.id)));
      }
    },
    onSelectAll: (selected: any, selectedRows: any, changeRows: Order[]) => {
      if (selected) {
        let tempData = [...selectedItemIds];
        selectedRows.map((v: Order) => v && tempData.push(Number(v.id) ?? 0));
        const set = Array.from(new Set(tempData)); // ?????? ??????
        setSelectedItemIds(set);
      } else {
        //??????????????? ????????? ????????? ??????
        const selectedRowsUserId = changeRows.map((v) => v.id);
        setSelectedItemIds(
          selectedItemIds.filter((v) => !selectedRowsUserId.includes(`${v}`))
        );
      }
    },
  };
  const { data: myInfoData } = useQuery<{ selectMyInfoByUser: User }>(
    QUERIES.SELECT_MY_INFO
  );
  const myInfo = myInfoData?.selectMyInfoByUser.purchaseInfo.level;

  // useEffect(() => {
  //   console.log(myInfo)
  //   if (myInfo !== undefined && myInfo <= 1) {
  //     alert('?????????????????? ?????????????????????.')
  //     history.push('/user/payment/service-pay')
  //   }
  // }, [myInfoData])

  const orderStateData = countsData?.selectOrdersByUser.map((v) => v.state);

  const orderStateAtNew = orderStateData
    ?.map((v) => v === "NEW")
    .filter((v) => v === true).length;
  const orderStateAtOrdered = orderStateData
    ?.map((v) => v === "ORDERED")
    .filter((v) => v === true).length;
  const orderStateAtShipping = orderStateData
    ?.map((v) => v === "SHIPPING")
    .filter((v) => v === true).length;
  const orderStateAtDelivered = orderStateData
    ?.map((v) => v === "DELIVERED")
    .filter((v) => v === true).length;
  const orderStateAtClaimed = orderStateData
    ?.map((v) => v === "CLAIMED")
    .filter((v) => v === true).length;

  return (
    <Card>
      <Tabs
        defaultActiveKey="1"
        type="card"
        onChange={(e) => {
          setOrderState(e);
        }}
      >
        {/* <TabPane tab={<div className="taps-label-style">?????? ()</div>} key="1" /> */}
        <TabPane
          tab={
            <div className="taps-label-style">
              ?????? ( {orderStateAtNew ? orderStateAtNew : 0} )
            </div>
          }
          key="NEW"
        />
        <TabPane
          tab={
            <div className="taps-label-style">
              ???????????? ( {orderStateAtOrdered ? orderStateAtOrdered : 0} )
            </div>
          }
          key="ORDERED"
        />
        <TabPane
          tab={
            <div className="taps-label-style">
              ????????? ( {orderStateAtShipping ? orderStateAtShipping : 0} )
            </div>
          }
          key="SHIPPING"
        />
        <TabPane
          tab={
            <div className="taps-label-style">
              ???????????? ( {orderStateAtDelivered ? orderStateAtDelivered : 0} )
            </div>
          }
          key="DELIVERED"
        />
        <TabPane
          tab={
            <div className="taps-label-style">
              ??????/??????/?????? ( {orderStateAtClaimed ? orderStateAtClaimed : 0} )
            </div>
          }
          key="CLAIMED"
        />
      </Tabs>
      {/* ???????????? ?????? */}
      <OrderListFilter
        setChangeSelectBox={(e) => {
          setChangeSelectBox(e);
        }}
        searching={(e) => searching(e)}
        selectedItemIds={selectedItemIds}
        myInfo={myInfo}
        setPageSize={(e) => setPageSize(e)}
      />
      {/* ???????????? */}
      {/* <OrderCollection /> */}
      <div>
        <Table
          className="oredr-list-table"
          size="small"
          style={{ maxWidth: "1638px", overflow: "auto" }}
          rowKey={(record: Order) => record.id ?? 0}
          rowSelection={
            myInfo && (myInfo === 2 || myInfo === 4) ? rowSelection : undefined
          } // ????????? ??????????????? ?????? ??????   xxx ? rowSelection : undefined
          loading={selectOrdersLoading}
          pagination={{
            showSizeChanger: true,
            pageSize: pageSize as number,
          }}
          onChange={(e) => setPageSize(e.pageSize)}
          bordered
          components={components}
          columns={columns2 as ColumnsType<any> | undefined}
          dataSource={selectOrdersData?.selectOrdersByUser}
          scroll={{ x: 0 }}
        />
      </div>
      {/* ?????? ????????????. */}
    </Card>
  );
};

export default OrderList;
