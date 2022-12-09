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
            defaultValue="아이디"
            onChange={(e) => {
              setChangeSelectBox(e);
            }}
          >
            <Option value={"email"}>아이디</Option>
            <Option value={"phone"}>휴대폰번호</Option>
            <Option value={"siteUserId"}>스마트스토어 ID</Option>
          </Select>
        </Col>

        <Col style={{ marginRight: "50px" }}>
          <Search
            style={{ width: " 300px" }}
            enterButton="검색"
            onSearch={(e) => {
              search(e);
            }}
          />
        </Col>

        <Col style={{ marginRight: "50px" }}>
          <Search
            type="number"
            placeholder="출력 수"
            enterButton="변경"
            style={{ width: "150px" }}
            onSearch={(e) => {
              setPageSize(e);
            }}
          />
        </Col>
        
        <Col style={{ marginRight: "5px" }}>
          <Select
            placeholder="등급 선택"
            style={{ width: "150px" }}
            onChange={(e) => {
              if (typeof e === "string") {
                const level = parseInt(e);
                if (!isNaN(level)) setPurchaseInfoLevel(level);
              }
            }}
          >
            <Option value={"1"}>1단계</Option>
            <Option value={"2"}>2단계</Option>
            <Option value={"3"}>3단계</Option>
            <Option value={"4"}>4단계</Option>
            <Option value={"5"}>트랜져스</Option>
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
            placeholder="결제 기간"
            style={{ width: "150px" }}
          />
        </Col>

        <Col style={{ marginRight: "50px" }}>
          <Button
            type="primary"
            disabled={!isSetPurchaseInfoAvailable}
            onClick={() => {
              if (!purchaseInfoLevel) {
                message.error("결제 등급을 선택하세요.");
                return;
              } else if (selectedItemIds.length === 0) {
                message.error("유저를 선택하세요.");
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
                      `${successCount}명의 유저 설정에 성공했습니다.`
                    );
                  else message.error(`모든 유저 설정에 실패했습니다.`);
                })
                .finally(() => {
                  setSelectedItemIds([]);
                  setIsSetPurchaseInfoAvailable(true);
                });

              // message.error("준비중입니다.");
              // alert("준비중입니다.");
            }}
          >
            적용
          </Button>
        </Col>

        <Col style={{ marginRight: "5px" }}>
          <Tooltip
            trigger={["focus"]}
            title={"공백 입력시 무제한으로 적용됩니다."}
            placement="topLeft"
            overlayClassName="numeric-input"
          >
            <Input
              placeholder="수집 제한"
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
                message.error("유저를 선택하세요.");
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
                      `${successCount}명의 유저 설정에 성공했습니다.`
                    );
                  else message.error(`모든 유저 설정에 실패했습니다.`);
                })
                .finally(() => {
                  setSelectedItemIds([]);
                  setIsSetMaxProductLimitAvailable(true);
                });

              // message.error("준비중입니다.");
              // alert("준비중입니다.");
            }}
          >
            적용
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
                message.error("유저를 선택하세요.");
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
                      `${successCount}명의 유저 정지에 성공했습니다.`
                    );
                  else message.error(`모든 유저 정지에 실패했습니다.`);
                })
                .finally(() => {
                  setIsSetUserStopAvailable(true);
                });
            }}
          >
            이용 정지
          </Button>
          <Button
            danger
            type={"primary"}
            onClick={() => {
              alert("준비중입니다.");
            }}
          >
            계정 삭제
          </Button>
        </Col>
      </Row>
    </Row>
  );
};

export default CustomerFilter;
