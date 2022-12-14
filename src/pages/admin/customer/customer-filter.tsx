import React, { useState } from "react";
import {
  Row,
  Col,
  Input,
  Select,
  Button,
  Tooltip,
  message,
  DatePicker,
} from "antd";
import { useMutation } from "@apollo/client";
import MUTATIONS from "src/apis/mutations";
import {
  MutationSetMaxProductLimitByAdminArgs,
  MutationSetPurchaseInfoByAdminArgs,
  MutationsetUserStopTest,
} from "src/types";
import { Moment } from "moment";
import moment from "moment";

const { Search } = Input;
const { Option } = Select;
interface IProps {
  userListRefetch: ({}) => void;
  selectedItemIds?: Array<number>;
  setSelectedItemIds: (e) => void;
  setPageSize: (e) => void;
}

const CustomerFilter = ({
  userListRefetch,
  selectedItemIds,
  setSelectedItemIds,
  setPageSize,
}: IProps) => {
  const [expiredAt, setExpiredAt] = useState<Moment | null>(null);
  const [changeSelectBox, setChangeSelectBox] = useState<string>("email");
  const [purchaseInfoLevel, setPurchaseInfoLevel] = useState<number>(null);
  const [maxLimit, setMaxLimit] = useState<string>("");
  const [isSetPurchaseInfoAvailable, setIsSetPurchaseInfoAvailable] = useState<boolean>(true);
  const [isSetMaxProductLimitAvailable, setIsSetMaxProductLimitAvailable] = useState<boolean>(true);
  const [isSetUserStopAvailable,setIsSetUserStopAvailable] = useState<boolean>(true);
  const [setPurchaseInfoByAdmin] = useMutation<
    { setPurchaseInfoByAdmin: boolean },
    MutationSetPurchaseInfoByAdminArgs
  >(MUTATIONS.SET_PURCHASE_INFO_BY_ADMIN, {
    refetchQueries: ["USER_LIST_BY_ADMIN"],
  });

  const [setUserStopTest] = useMutation<
  { setUserStopTest : Boolean},
  MutationsetUserStopTest
  >(MUTATIONS.SET_USER_STOP_TEST,{
    refetchQueries : ["USER_LIST_BY_ADMIN"],
  })
  
  const [setMaxProductLimitByAdmin] = useMutation<
    { setMaxProductLimitByAdmin: boolean },
    MutationSetMaxProductLimitByAdminArgs
  >(MUTATIONS.SET_MAX_PRODUCT_LIMIT_BY_ADMIN, {
    refetchQueries: ["USER_LIST_BY_ADMIN"],
  });

  const search = (e: string) => {
    const filtered = e.trim();

    if (changeSelectBox === "email") {
      userListRefetch({ where: { email: { contains: filtered } } });
    } else if (changeSelectBox === "siteUserId") {
      userListRefetch({
        where: { userInfo: { naverStoreUrl: { contains: filtered === "" ? null : filtered } } },
      });
    } else if (changeSelectBox === "phone") {
      userListRefetch({
        where: { userInfo: { phone: { contains: filtered === "" ? null : filtered } } },
      });
    }
  };

  return (
    <Row justify="space-between">
      <Row className="mb-4">
        <Col style={{ marginRight: "5px" }}>
          <Select
            style={{ width: "150px" }}
            defaultValue="?????????"
            onChange={(e) => {
              setChangeSelectBox(e);
            }}
          >
            <Option value={"email"}>?????????</Option>
            <Option value={"phone"}>???????????????</Option>
            <Option value={"siteUserId"}>?????????????????? ID</Option>
          </Select>
        </Col>

        <Col style={{ marginRight: "50px" }}>
          <Search
            style={{ width: " 300px" }}
            enterButton="??????"
            onSearch={(e) => {
              search(e);
            }}
          />
        </Col>

        <Col style={{ marginRight: "50px" }}>
          <Search
            type="number"
            placeholder="?????? ???"
            enterButton="??????"
            style={{ width: "150px" }}
            onSearch={(e) => {
              setPageSize(e);
            }}
          />
        </Col>
        
        <Col style={{ marginRight: "5px" }}>
          <Select
            placeholder="?????? ??????"
            style={{ width: "150px" }}
            onChange={(e) => {
              if (typeof e === "string") {
                const level = parseInt(e);
                if (!isNaN(level)) setPurchaseInfoLevel(level);
              }
            }}
          >
            <Option value={"1"}>1??????</Option>
            <Option value={"2"}>2??????</Option>
            <Option value={"3"}>3??????</Option>
            <Option value={"4"}>4??????</Option>
            <Option value={"5"}>????????????</Option>
          </Select>
        </Col>

        <Col style={{ marginRight: "5px" }}>
          <DatePicker
            value={expiredAt}
            disabledDate={(date) => date.isBefore(moment().subtract(1, "day"))}
            showTime={{ defaultValue: moment("23:59:59", "HH:mm:ss") }}
            onChange={(e) => {
              console.log(e);
              setExpiredAt(e);
            }}
            placeholder="?????? ??????"
            style={{ width: "150px" }}
          />
        </Col>

        <Col style={{ marginRight: "50px" }}>
          <Button
            type="primary"
            disabled={!isSetPurchaseInfoAvailable}
            onClick={() => {
              if (!purchaseInfoLevel) {
                message.error("?????? ????????? ???????????????.");
                return;
              } else if (selectedItemIds.length === 0) {
                message.error("????????? ???????????????.");
                return;
              }
              setIsSetPurchaseInfoAvailable(false);
              Promise.all(
                selectedItemIds.map(async (v) => {
                  const result = await setPurchaseInfoByAdmin({
                    variables: {
                      userId: v,
                      planInfoId: purchaseInfoLevel,
                      expiredAt: expiredAt
                        ? expiredAt.toISOString()
                        : expiredAt,
                    },
                  }).catch((e) => e as Error);
                  if (result instanceof Error) {
                    message.error(result.message);
                    return false;
                  }
                  return result.data.setPurchaseInfoByAdmin as boolean;
                })
              )
                .then((result) => {
                  const successCount = result.filter((v) => v === true).length;
                  if (successCount > 0)
                    message.info(
                      `${successCount}?????? ?????? ????????? ??????????????????.`
                    );
                  else message.error(`?????? ?????? ????????? ??????????????????.`);
                })
                .finally(() => {
                  setSelectedItemIds([]);
                  setIsSetPurchaseInfoAvailable(true);
                });

              // message.error("??????????????????.");
              // alert("??????????????????.");
            }}
          >
            ??????
          </Button>
        </Col>

        <Col style={{ marginRight: "5px" }}>
          <Tooltip
            trigger={["focus"]}
            title={"?????? ????????? ??????????????? ???????????????."}
            placement="topLeft"
            overlayClassName="numeric-input"
          >
            <Input
              placeholder="?????? ??????"
              style={{ width: "100px" }}
              value={maxLimit}
              onChange={(e) => {
                const { value } = e.target;
                const reg = /^\d*$/;
                if (
                  (!isNaN(parseFloat(value)) && reg.test(value)) ||
                  value === ""
                ) {
                  // this.props.onChange(value);
                  if (value === "" || parseInt(value) < 2147483647)
                    setMaxLimit(value);
                }
              }}
            ></Input>
          </Tooltip>
        </Col>

        <Col style={{ marginRight: "50px" }}>
          <Button
            type="primary"
            disabled={!isSetMaxProductLimitAvailable}
            onClick={() => {
              if (selectedItemIds.length === 0) {
                message.error("????????? ???????????????.");
                return;
              }
              const productLimit = isNaN(parseInt(maxLimit))
                ? null
                : parseInt(maxLimit);
              setIsSetMaxProductLimitAvailable(false);
              Promise.all(
                selectedItemIds.map(async (v) => {
                  const result = await setMaxProductLimitByAdmin({
                    variables: { userId: v, productLimit },
                  }).catch((e) => e as Error);
                  if (result instanceof Error) {
                    message.error(result.message);
                    return false;
                  }
                  return result.data.setMaxProductLimitByAdmin as boolean;
                })
              )
                .then((result) => {
                  const successCount = result.filter((v) => v === true).length;
                  if (successCount > 0)
                    message.info(
                      `${successCount}?????? ?????? ????????? ??????????????????.`
                    );
                  else message.error(`?????? ?????? ????????? ??????????????????.`);
                })
                .finally(() => {
                  setSelectedItemIds([]);
                  setIsSetMaxProductLimitAvailable(true);
                });

              // message.error("??????????????????.");
              // alert("??????????????????.");
            }}
          >
            ??????
          </Button>
        </Col>

        <Col>
          <Button
            danger
            disabled={!isSetUserStopAvailable}
            style={{ marginRight: "5px" }}
            onClick={() => {
              //todo
              if (selectedItemIds.length === 0) {
                message.error("????????? ???????????????.");
                return;
              }
              setIsSetUserStopAvailable(false);
              Promise.all(
                selectedItemIds.map(async (v) => {
                  const result = await setUserStopTest({
                    variables: {
                      userId: v,
                    },
                  }).catch((e) => e as Error);
                  if (result instanceof Error) {
                    message.error(result.message);
                    return false;
                  }
                  return result.data.setUserStopTest as boolean;
                })
              )
                .then((result) => {
                  const successCount = result.filter((v) => v === true).length;
                  if (successCount > 0)
                    message.info(
                      `${successCount}?????? ?????? ????????? ??????????????????.`
                    );
                  else message.error(`?????? ?????? ????????? ??????????????????.`);
                })
                .finally(() => {
                  setIsSetUserStopAvailable(true);
                });
            }}
          >
            ?????? ??????
          </Button>
          <Button
            danger
            type={"primary"}
            onClick={() => {
              alert("??????????????????.");
            }}
          >
            ?????? ??????
          </Button>
        </Col>
      </Row>
    </Row>
  );
};

export default CustomerFilter;
