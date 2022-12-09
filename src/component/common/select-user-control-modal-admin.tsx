import { useQuery } from "@apollo/client";
import {
  Col,
  Input,
  Modal,
  Row,
  Button,
  message,
  Select,
  Card,
  Table,
  Checkbox,
} from "antd";
import React, { useState } from "react";
import QUERIES from "src/apis/queries";
import MUTATIONS from "src/apis/mutations";

import { shopDataNameInfo } from "src/common/playauto";
import { SHOP_LIST } from "src/common/shop-list";
import { transPhoneFormat, transShopCode } from "src/common/transform";
import { QuerySelectUsersByAdminArgs, User } from "src/types";

const { Option } = Select;
const { Search } = Input;
interface Props {
  visible: boolean;
  closeUserControlModal: () => void;
  selectedItemIds?: number[];
}

interface ICheckBox {
  userId: number;
  shopIds: { siteCode: string; id: number }[];
}

const SelectUserControlModalAdmin = ({
  visible,
  closeUserControlModal: closeMarketSillControlModal,
  selectedItemIds,
}: Props) => {
  const [selectedUserIds, setSelectedUserIds] = useState<Array<number>>([]);
  const [pageSize, setPageSize] = useState<Number>(20);
  const [changeSelectBox, setChangeSelectBox] = useState<string>("email");
  const [selectedShop, setSelectedShop] = useState([]);

  const [checkBox, setCheckBox] = useState<ICheckBox[]>([]);

  const {
    loading: userListLoading,
    data: userListData,
    refetch: userListRefetch,
  } = useQuery<{ selectUsersByAdmin: User[] }, QuerySelectUsersByAdminArgs>(
    QUERIES.USER_LIST_BY_ADMIN,
    {
      fetchPolicy: "no-cache",
    }
  );
  
  const handleSelect = (
    userId: number,
    shopIds: { siteCode: string; id: number }
  ) => {
    if (checkBox.find((v) => v.userId === userId)) {
      let tempCheckBox = [...checkBox];
      if (
        tempCheckBox
          .find((v) => v.userId === userId)
          .shopIds.find((v) => v.siteCode === shopIds.siteCode)
      ) {
        tempCheckBox
          .find((v) => v.userId === userId)
          .shopIds.find((v) => v.siteCode === shopIds.siteCode).id = shopIds.id;
      } else {
        tempCheckBox.find((v) => v.userId === userId).shopIds.push(shopIds);
      }
      setCheckBox(tempCheckBox);
    } else {
      setCheckBox([...checkBox, { userId: userId, shopIds: [shopIds] }]);
    }
  };

  const search = (e: string) => {
    if (changeSelectBox === "email") {
      userListRefetch({ where: { email: { contains: e } } });
    } else if (changeSelectBox === "phone") {
      userListRefetch({
        where: { userInfo: { phone: { contains: e === "" ? null : e } } },
      });
    }
  };

  const handleSubmit = () => {
    if (selectedUserIds.length === 0) {
      message.error("연동하실 유저를 선택해 주세요.");
      return;
    }
    if (selectedShop.length > 0) {
    } else {
      message.error("연동하실 마켓을 선택해 주세요.");
    }
  };
  return (
    <Modal
      width="1200px"
      className="user-market-info-modal"
      visible={visible}
      onCancel={() => {
        closeMarketSillControlModal();
      }}
      footer={false}
      mask={true}
      transitionName="fade"
      centered
      closable={false}
    >
      <Row style={{ marginBottom: "30px" }}>
        <Col style={{ margin: "0 auto", fontSize: "20px", fontWeight: "bold" }}>
          마켓등록{" "}
          {selectedItemIds?.length !== 0 &&
            `(선택상품 ${selectedItemIds?.length}건)`}
        </Col>
      </Row>
      <Row justify="space-between" align="middle" className="w-full mb-4">
        <Col span={12}>
          총{" "}
          <span style={{ fontSize: "18px" }}>
            {selectedUserIds.length ?? 0}
          </span>{" "}
          명 선택
        </Col>

        <Col span={12}>
          <Row justify="end" align="middle">
            <Col style={{ marginRight: "5px" }}>
              <Select
                placeholder="필터"
                style={{ width: "110px" }}
                onChange={(e) => {
                  setChangeSelectBox(e.toString());
                }}
              >
                <Option value="email">아이디</Option>
                <Option value="phone">휴대폰</Option>
              </Select>
            </Col>
            <Col>
              <Search
                style={{ width: "350px" }}
                onSearch={(e) => {
                  search(e);
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Table
        size="small"
        rowKey={(record: User) => record.id ?? 0}
        rowSelection={{
          onChange: (changeSelectedRowKeys, changeSelectedRows) => {
            setSelectedUserIds(changeSelectedRowKeys as number[]);
          },
        }}
        onChange={(e) => setPageSize(e.pageSize)}
        pagination={{
          pageSize: pageSize as number,
          showSizeChanger: true,
        }}
        loading={userListLoading}
        dataSource={userListData?.selectUsersByAdmin}
        columns={[
          {
            title: "아이디",
            dataIndex: "email",
          },
          {
            title: "연동스토어",
            render: (data: User) => {
              const arr = data.product.flatMap((v) =>
                v.activeProductStore.map((v2) => transShopCode(v2.siteCode))
              );
              return arr.join(" ");
            },
          },
          {
            title: "휴대폰",
            dataIndex: ["userInfo", "phone"],
            render: (data: number) => data && transPhoneFormat(data),
          },
          {
            title: "서비스",
            dataIndex: ["purchaseInfo", "level"],
            render: (data: number) => <>{data + "단계"} </>,
          },
        ]}
        expandable={{
          expandedRowRender: (record) => {
            const setArr = Array.from([]);
            return (
              <Card bodyStyle={{ padding: "8px 24px" }}>
                <Row align="middle">
                  {setArr.map((v) => (
                    <>
                      <Col style={{ margin: "0 15px" }}>
                        {shopDataNameInfo[v]}:
                      </Col>
                      <Col>
                        <Select
                          style={{ width: "200px" }}
                          className={`select${record.id}${v}`}
                          onChange={(e) => {
                            handleSelect(record.id, {
                              siteCode: v,
                              id: Number(e),
                            });
                          }}
                        ></Select>
                      </Col>
                    </>
                  ))}
                </Row>
              </Card>
            );
          },
        }}
      />
      <Row justify="center" className="mb-6">
        <Col>
          <Checkbox.Group onChange={(e) => setSelectedShop(e)}>
            {SHOP_LIST.map((v, i) => (
              <Checkbox style={{ marginRight: "10px" }} value={v.code}>
                {v.title}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Button
            type="primary"
            style={{ width: "120px", fontWeight: 600 }}
            onClick={() => handleSubmit()}
          >
            마켓연동
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default SelectUserControlModalAdmin;
