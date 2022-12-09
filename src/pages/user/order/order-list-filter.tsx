import React, { useState } from "react";
import { Row, Col, Input, Select, Button, message } from "antd";
import { useMutation, ApolloError } from "@apollo/client";
import MUTATIONS from "src/apis/mutations";
import {
  MutationChangeOrderStateByUserArgs,
  MutationScrapOrderByUserArgs,
  OrderState,
} from "src/types";

const { Option } = Select;
const { Search } = Input;
interface IProps {
  setChangeSelectBox: (e: string) => void;
  searching: (e: string) => void;
  selectedItemIds: Array<number>;
  myInfo?: number;
  setPageSize: (e) => void;
}

const OrderListFilter = ({
  setChangeSelectBox,
  searching,
  selectedItemIds,
  myInfo,
  setPageSize,
}: IProps) => {
  // const { loading: selectMyShopListLoading, error: selectMyShopListError, data: selectMyShopListData } = useQuery<{ selectMyShopDataByUser: UserShopData[] }, QuerySelectMyShopDataByUserArgs>(QUERIES.SELECT_MY_SHOP_LIST);

  const [changeOrderStateMutation] = useMutation<
    { changeOrderStateByUser: String },
    MutationChangeOrderStateByUserArgs
  >(MUTATIONS.CHANGE_ORDER_STATE_BY_USER);
  const [selectOrderState, setSelectOrderState] = useState<string>("NEW");

  const [scrapOrder] = useMutation<
    { scrapOrderByUser: String },
    MutationScrapOrderByUserArgs
  >(MUTATIONS.SCRAP_ORDER, {
    refetchQueries: ["SELECT_ORDERS_BY_USER", "SELECT_ORDERS_BY_USER_COUNT"],
  });

  const handleCollectionButton = () => {
    // const data = selectMyShopListData.selectMyShopDataByUser
    // if (data) {
    //   Promise.all(data.map(async (v, i) => {
    //     await scrapOrder({
    //       variables: {
    //         shopDataId: Number(v.id),
    //         collectNewOrder: true
    //       }
    //     })
    //   }))
    //     .then((res) => message.success('주문 수집이 완료되었습니다.'))
    //     .catch((e: ApolloError) => { message.error(e.message); })
    // }
  };

  return (
    // <Row justify="space-between">
    <Row className="mb-4" justify="space-between">
      <Col>
        <Row>
          {/* <Col style={{ marginRight: "15px" }}>
            <Button
              id="sfy-collect-order"
              style={{ width: "130px" }}
              type={"primary"}
              onClick={() => {
                handleCollectionButton();
              }}
            >
              주문수집
            </Button>
          </Col> */}
          <Col style={{ marginRight: "5px" }}>
            <Select
              style={{ width: "120px" }}
              defaultValue="orderProductNumber"
              onChange={(e) => {
                setChangeSelectBox(e);
              }}
            >
              <Option value={"orderProductNumber"}>마켓주문번호</Option>
              <Option value={"storeProductId"}>상품번호</Option>
              <Option value={"buyerName"}>구매자</Option>
              <Option value={"receiverName"}>수취인</Option>
              <Option value={"customId"}>통관부호</Option>
            </Select>
          </Col>
          <Col>
            <Search
              onSearch={(e) => {
                searching(e);
              }}
            />
          </Col>
          {(myInfo === 2 || myInfo === 4) && (
            <Col className="ml-5">
              <Select
                style={{ width: "135px" }}
                defaultValue="NEW"
                onChange={(e) => {
                  setSelectOrderState(e);
                }}
              >
                <Option value={"NEW"}>신규</Option>
                <Option value={"ORDERED"}>발주완료</Option>
                <Option value={"SHIPPING"}>배송중</Option>
                <Option value={"DERIVERED"}>배송완료</Option>
                <Option value={"CLAIMED"}>취소/교환/환불</Option>
              </Select>

              &nbsp;
              
              <Button
                onClick={() => {
                  if (selectedItemIds.length === 0) {
                    message.error("선택한 주문이 없습니다.");
                    return;
                  }
                  changeOrderStateMutation({
                    variables: {
                      orderIds: selectedItemIds as any,
                      destState: selectOrderState as OrderState,
                    },
                  })
                    .then((res) =>
                      message.success("주문상태 변경을 완료했습니다.")
                    )
                    .catch((e: ApolloError) => {
                      message.error(e.message);
                    });
                }}
              >
                상태변경
              </Button>
            </Col>
          )}
        </Row>
      </Col>
      <Col>
        <Search
          type="number"
          placeholder="데이터 출력 수"
          enterButton="변경"
          onSearch={(e) => {
            setPageSize(e);
          }}
        />
      </Col>
    </Row>
    //<OrderCollection />
    // </Row >
  );
};

export default OrderListFilter;
