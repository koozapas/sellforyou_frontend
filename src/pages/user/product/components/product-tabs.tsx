import React, { useEffect, useState } from "react";
import querystring from "query-string";
import SelectMarketRegistration from "src/component/common/select-market-registration-modal";
import SelectMarketCategoryControlModal from "src/component/common/select-market-category-control-modal";
import MUTATIONS from "src/apis/mutations";
import UpdateProductPriceModal from "src/component/common/update-product-price-modal";
import UpdateProductTitleModal from "src/component/common/update-product-title-modal";
import UpdateProductTagModal from "src/component/common/update-product-tag-modal";
import UpdateProductOptionNameModal from "src/component/common/update-product-option-name-modal";

import moment from "moment";

import { Button, Checkbox, Collapse, Col, message, Modal, Row, Tabs, Input, Select, Radio, DatePicker } from "antd";

import { useHistory } from "react-router";
import { transProductState2 } from "src/common/transform";
import { ApolloError, useMutation } from "@apollo/client";

import {
  MutationDeleteProductByUserArgs,
  MutationEndProductSellStateByUserArgs,
  Product,
  ProductState,
  TranslateTargetEnumType,
} from "src/types";

const { TabPane } = Tabs;
const { confirm } = Modal;
const { Search } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

interface Props {
  getItemLengthData?: Product[];
  setQueryString: (e: string) => void;
  selectedItemIds?: number[];
  selectMyProductRefetch: ({}) => void;
  ItemLengthRefetch: () => void;
  imageTranslate: null | boolean;
  setImageTranslate: (e) => void;
  pageCount?: number;
  setPageCountNumber: (e) => void;
}

type tabsType =
  | "ALL"
  | "Collected"
  | "OnSale"
  | "UloadWaiting"
  | "UploadFailed"
  | "SellDone";

const ProductTabs = (props: Props) => {
  const history = useHistory();
  const queryStringValue = querystring.parse(history.location.search);
  const [marketRegistrationModal, setMarketRegistrationModal] =
    useState<boolean>(false);
  // const [marketSillControlModal, setMarketSillControlModal] =
  //   useState<boolean>(false);
  const [marketCategoryControlModal, setMarketCategoryControlModal] =
    useState<boolean>(false);
  const [updateProductPriceModal, setUpdateProductPriceModal] =
    useState<boolean>(false);
  const [updateProductTitleModal, setUpdateProductTitleModal] =
    useState<boolean>(false);
  const [updateProductTagModal, setUpdateProductTagModal] = 
    useState<boolean>(false);
  const [updateProductOptionNameModal, setUpdateProductOptionNameModal] = 
    useState<boolean>(false);

  const [searchInputValue, setSearchInputValue] = useState<string>("");

  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");

  const [localShippingFeeStart, setLocalShippingFeeStart] = useState<string>("");
  const [localShippingFeeEnd, setLocalShippingFeeEnd] = useState<string>("");

  const [extraShippingFeeStart, setExtraShippingFeeStart] = useState<string>("");
  const [extraShippingFeeEnd, setExtraShippingFeeEnd] = useState<string>("");
  
  const [priceStart, setPriceStart] = useState<string>("");
  const [priceEnd, setPriceEnd] = useState<string>("");

  const [hasShipping, setHasShipping] = useState<string>("");
  const [hasVideo, setHasVideo] = useState<string>("");
  const [hasTranslated, setHasTranslated] = useState<boolean>(undefined);

  const [type, setType] = useState<tabsType>(queryStringValue.type as tabsType);
  useEffect(() => {
    setType(queryStringValue.type as tabsType);
  }, [queryStringValue.type]);

  const allLength = props.getItemLengthData?.length;
  const collectedLength = props.getItemLengthData
    ?.map((v) => v.productStateEnum.state === "COLLECTED")
    .filter((v) => v === true).length;
  const onSalecollectedLength = props.getItemLengthData
    ?.map((v) => v.productStateEnum.state === "ON_SALE")
    .filter((v) => v === true).length;
  const uploadWaitingcollectedLength = props.getItemLengthData
    ?.map((v) => v.productStateEnum.state === "UPLOAD_WAITING")
    .filter((v) => v === true).length;
  const uploadFailedcollectedLength = props.getItemLengthData
    ?.map((v) => v.productStateEnum.state === "UPLOAD_FAILED")
    .filter((v) => v === true).length;
  const sellDonecollectedLength = props.getItemLengthData
    ?.map((v) => v.productStateEnum.state === "SELL_DONE")
    .filter((v) => v === true).length;

  const [deleteProductData] = useMutation<
    { deleteProductByUser: Boolean },
    MutationDeleteProductByUserArgs
  >(MUTATIONS.DELETE_PRODUCT, {
    refetchQueries: ["SELECT_MY_PRODUCT_LIST", "GET_ITEM_STATE"],
  });

  const [endProductSellState] = useMutation<
    { endProductSellStateByUser: number },
    MutationEndProductSellStateByUserArgs
  >(MUTATIONS.END_PRODUCT_SELL_STATE_BY_USER, {
    refetchQueries: ["SELECT_MY_PRODUCT_LIST", "GET_ITEM_STATE"],
  });

  useEffect(() => {
    setSearchInputValue("");
  }, [queryStringValue.type, props.imageTranslate]);

  const tabs = [
    {
      label: (
        <div
          className="taps-label-style"
          onClick={() => {
            props.selectMyProductRefetch({ where: null });
            props.ItemLengthRefetch();
          }}
        >
          전체{" "}
          <span className="taps-label-number">
            ( {allLength ? allLength : 0} )
          </span>
        </div>
      ),
      key: 1,
      value: "ALL",
    },
    {
      label: (
        <div className="taps-label-style">
          수집 상품{" "}
          <span className="taps-label-number">
            ( {collectedLength ? collectedLength : 0} )
          </span>
        </div>
      ),
      key: 2,
      value: "Collected",
    },
    {
      label: (
        <div className="taps-label-style">
          판매중{" "}
          <span className="taps-label-number">
            ( {onSalecollectedLength ? onSalecollectedLength : 0} )
          </span>
        </div>
      ),
      key: 3,
      value: "OnSale",
    },
    // {
    //   label: (
    //     <div className="taps-label-style">
    //       업로드 대기{" "}
    //       <span className="taps-label-number">
    //         ( {uploadWaitingcollectedLength ? uploadWaitingcollectedLength : 0}{" "}
    //         )
    //       </span>
    //     </div>
    //   ),
    //   key: 4,
    //   value: "UloadWaiting",
    // },
    {
      label: (
        <div className="taps-label-style">
          업로드 실패{" "}
          <span className="taps-label-number">
            ( {uploadFailedcollectedLength ? uploadFailedcollectedLength : 0} )
          </span>
        </div>
      ),
      key: 5,
      value: "UploadFailed",
    },
    // {
    //   label: (
    //     <div className="taps-label-style">
    //       판매 종료{" "}
    //       <span className="taps-label-number">
    //         ( {sellDonecollectedLength ? sellDonecollectedLength : 0} )
    //       </span>
    //     </div>
    //   ),
    //   key: 6,
    //   value: "SellDone",
    // },
  ];

  const selectItemDelete = () => {
    if (props.selectedItemIds?.length !== 0) {
      confirm({
        title: "선택 상품을 삭제하시겠습니까? (" + props.selectedItemIds?.length + "건)",
        content: (
          <div style={{ color: "red" }}>
            이미 스토어에 등록된 상품의 경우 삭제 시 
            
            <br />
            
            관련 정보도 함께 삭제되며 복구가 불가능합니다.
            
            <br />
            <br />

            해당 상품을 완전히 삭제하시겠습니까?
          </div>
        ),
        centered: true,
        onOk() {
          if (props.selectedItemIds)
            Promise.all(
              props.selectedItemIds.map(async (v, i) => {
                await deleteProductData({ variables: { productId: v } });
              })
            )
              .then(() => message.success("선택하신 상품이 삭제되었습니다."))
              .catch((e: ApolloError) => {
                // message.error(e.message);
                console.log(e);
              });
        },
      });
    }
  };

  const [changeSearchBox, setChangeSearchBox] = useState("SearchCollectedDate");
  const [changeSelectBox, setChangeSelectBox] = useState("All");

  const productState = transProductState2(type as string);

  const search = (e: string) => {
    console.log(changeSearchBox, dateStart, dateEnd);

    const where = {
      AND: [
        { productStateEnum: { state: { equals: productState === "" ? undefined : (productState as ProductState) }}},

        { createdAt: { gte: changeSearchBox === "SearchCollectedDate" && dateStart !== "" ? new Date(dateStart) : undefined }},
        { createdAt: { lte: changeSearchBox === "SearchCollectedDate" && dateEnd !== "" ? new Date(dateEnd) : undefined }},

        { productStore: { some: changeSearchBox === "SearchRegisteredDate" && dateStart !== "" ? { AND: [ { state: { equals: 2 } }, { connectedAt: { gte: new Date(dateStart) }} ] } : undefined }},
        { productStore: { some: changeSearchBox === "SearchRegisteredDate" && dateEnd !== "" ? { AND: [ { state: { equals: 2 } }, { connectedAt: { lte: new Date(dateEnd) }} ] } : undefined }},

        { shippingFee: { gte: extraShippingFeeStart === "" ? undefined : parseInt(extraShippingFeeStart) }},
        { shippingFee: { lte: extraShippingFeeEnd === "" ? undefined : parseInt(extraShippingFeeEnd) }},
        
        { isImageTranslated: { equals: hasTranslated } },
        
        { taobaoProduct: { videoUrl: hasVideo === "" ? undefined : hasVideo === "Y" ? { not: { equals: "" } } : { equals: "" } } },

        { price: { gte: priceStart === "" ? undefined : parseInt(priceStart) } },
        { price: { lte: priceEnd === "" ? undefined : parseInt(priceEnd) } },

        { localShippingFee: { gte: localShippingFeeStart === "" ? undefined : parseInt(localShippingFeeStart) } },
        { localShippingFee: { lte: localShippingFeeEnd === "" ? undefined : parseInt(localShippingFeeEnd) } },
      ],
    };

    if (type !== null) {
      switch (changeSelectBox) {
        case "All":
          if (e) {
            Object.assign(where, {
              OR: [
                { taobaoProduct: { name: { contains: e === "" ? undefined : e } } },
                { taobaoProduct: { taobaoNumIid: { contains: e === "" ? undefined : e } } },
  
                { name: { contains: e === "" ? undefined : e } },
  
                { productStore: { some: { storeProductId: { contains: e === "" ? undefined : e } } } },
                { productCode: { contains: e === "" ? undefined : e } },
  
                { categoryA077Name: { contains: e === "" ? undefined : e } },
                { categoryB378Name: { contains: e === "" ? undefined : e } },
                { categoryA112Name: { contains: e === "" ? undefined : e } },
                { categoryA113Name: { contains: e === "" ? undefined : e } },
                { categoryA027Name: { contains: e === "" ? undefined : e } },
                { categoryA001Name: { contains: e === "" ? undefined : e } },
                { categoryA006Name: { contains: e === "" ? undefined : e } },
                { categoryB719Name: { contains: e === "" ? undefined : e } },
                { categoryA524Name: { contains: e === "" ? undefined : e } },
                { categoryA525Name: { contains: e === "" ? undefined : e } },
                { categoryB956Name: { contains: e === "" ? undefined : e } }
              ]
            });
          }

          break;

        case "ProudctId":
          Object.assign(where, { productCode: { contains: e } });

          break;

        case "ProudctOrginalName":
          Object.assign(where, { taobaoProduct: { name: { contains: e } } });

          break;

        case "ProudctTranslatedName":
          Object.assign(where, { name: { contains: e } });

          break;

        case "ShopId":
          Object.assign(where, { taobaoProduct: { taobaoNumIid: { contains: e } } });

          break;

        case "CategoryName":
          Object.assign(where, { 
            OR: [ 
              { categoryA077Name: { contains: e } },
              { categoryB378Name: { contains: e } },
              { categoryA112Name: { contains: e } },
              { categoryA113Name: { contains: e } },
              { categoryA027Name: { contains: e } },
              { categoryA001Name: { contains: e } },
              { categoryA006Name: { contains: e } },
              { categoryB719Name: { contains: e } },
              { categoryA524Name: { contains: e } },
              { categoryA525Name: { contains: e } },
              { categoryB956Name: { contains: e } }
            ]
          });

          break;

        case "ChannelItemNumber":
          Object.assign(where, {
            productStore: { some: { storeProductId: { contains: e } } },
          });

          break;
      }
    }

    props.selectMyProductRefetch({ where: where });
  };

  return (
    <>
      <Tabs
        type="card"
        key={type}
        defaultActiveKey={type}
        onChange={(value) => {
          history.push(
            `${history.location.pathname}?type=${value}${
              props.pageCount && props.pageCount !== 10
                ? `&pageCount=${props.pageCount}`
                : ""
            }`
          );
          setType(value as tabsType);
        }}
        className="mb-4"
      >
        {tabs.map((v) => (
          <TabPane tab={v.label} key={v.value}>
            <Row>
              <Collapse style={{
                width: "100%",
              }}>
                <Panel
                  key={0}
                  showArrow={false}
                  header={
                    <React.Fragment>
                      <Row style={{width: "100%"}}>
                        <Col span={2} style={{
                          paddingRight: 5
                        }}>
                          <Button style={{
                            width: "100%"
                          }}>
                            검색 옵션
                          </Button>
                        </Col>

                        <Col span={19} 
                        style={{ 
                          fontSize: "14px", 
                          color: "#1890ff" 
                        }} 
                        onClick={
                          event => event.stopPropagation()
                        } 
                        onKeyPress={
                          event => event.stopPropagation()
                        }>
                          <span style={{
                            borderRight: "1px solid lightgray",

                            margin: "0px 10px 0px 6px"
                          }} />

                          <Select
                            value={changeSearchBox}
                            style={{ 
                              textAlign: "left",
                              width: 115,
                            }}
                            onChange={(e) => {
                              setChangeSearchBox(e as string);
                            }}
                          >
                            <Option value="SearchCollectedDate">수집일 기준</Option>
                            <Option value="SearchRegisteredDate">등록일 기준</Option>
                          </Select>

                          &nbsp;

                          <DatePicker 
                            showTime={{
                              defaultValue: moment('00:00:00', 'HH:mm:ss')
                            }}
                            placeholder={"시작 날짜"}
                            style={{
                              marginRight: "5px",

                              width: 115
                            }}
                            onChange={(e, date) => {
                              setDateStart(date)
                            }}
                          />

                          <DatePicker 
                            showTime={{
                              defaultValue: moment('23:59:59', 'HH:mm:ss')
                            }}
                            placeholder={"종료 날짜"}
                            style={{
                              marginRight: "5px",

                              width: 115
                            }}
                            onChange={(e, date) => {
                              setDateEnd(date)
                            }}
                          />

                          <Select
                            value={changeSelectBox}
                            style={{ 
                              textAlign: "left",
                              width: 145,
                              marginRight: "5px" 
                            }}
                            onChange={(e) => {
                              setChangeSelectBox(e as string);
                            }}
                          >
                            <Option value="All">통합검색</Option>
                            <Option value="ProudctId">상품코드</Option>
                            <Option value="ProudctOrginalName">상품명(원문)</Option>
                            <Option value="ProudctTranslatedName">상품명(번역)</Option>
                            <Option value="CategoryName">카테고리명</Option>
                            <Option value="ShopId">구매처상품번호</Option>
                            <Option value="ChannelItemNumber">판매채널상품번호</Option>
                          </Select>

                          <Search
                            allowClear
                            style={{ 
                              marginRight: "5px",
                              width: 230
                             }}
                            value={searchInputValue}
                            onChange={(e) => {
                              setSearchInputValue(e.target.value);
                            }}
                            onSearch={(e) => {
                              search(searchInputValue);
                            }}
                          />

                          <span style={{
                            borderRight: "1px solid lightgray",

                            margin: "0px 10px 0px 6px"
                          }} />

                          일괄설정

                          &nbsp;

                          <Button
                            // shape="round"
                            style={{ 
                              marginRight: 5,
                              padding: 0,
                              width: "80px" 
                            }}
                            onClick={() => {
                              if (props.selectedItemIds?.length === 0) {
                                message.error("상품이 선택되지 않았습니다.");
                                return;
                              } else {
                                setUpdateProductPriceModal(true);
                              }
                            }}
                          >
                            가격
                          </Button>

                          <Button
                            // shape="round"
                            style={{ 
                              marginRight: 5,
                              padding: 0,
                              width: "80px" 
                            }}
                            onClick={() => {
                              if (props.selectedItemIds?.length === 0) {
                                message.error("상품이 선택되지 않았습니다.");
                                return;
                              } else {
                                setUpdateProductTitleModal(true);
                              }
                            }}
                          >
                            상품명
                          </Button>

                          <Button
                            // shape="round"
                            style={{ 
                              marginRight: 5,
                              padding: 0,
                              width: "80px" 
                            }}
                            onClick={() => {
                              if (props.selectedItemIds?.length === 0) {
                                message.error("상품이 선택되지 않았습니다.");
                                return;
                              } else {
                                setUpdateProductTagModal(true);
                              }
                            }}
                          >
                            검색태그
                          </Button>

                          {/* <Button
                            // shape="round"
                            style={{ 
                              marginRight: 5,
                              padding: 0,
                              width: "80px" 
                            }}
                            onClick={() => {
                              if (props.selectedItemIds?.length === 0) {
                                message.error("상품이 선택되지 않았습니다.");
                                return;
                              } else {
                                setUpdateProductOptionNameModal(true);
                              }
                            }}
                          >
                            옵션명
                          </Button> */}

                          <Button
                            // shape="round"
                            style={{ 
                              padding: 0,
                              width: "80px" 
                            }}
                            onClick={() => {
                              if (props.selectedItemIds?.length === 0) {
                                message.error("상품이 선택되지 않았습니다.");
                                return;
                              } else {
                                setMarketCategoryControlModal(true);
                              }
                            }}
                          >
                            카테고리
                          </Button>
                      </Col>

                      <Col span={3} style={{
                        textAlign: "right"
                      }} onClick={event => event.stopPropagation()} >
                        <Button
                          style={{ width: "90px" }}
                          type={"primary"}
                          onClick={() => {
                            props.selectMyProductRefetch({
                              where: {
                                state: {
                                  equals:
                                    productState.length === 0
                                      ? null
                                      : (productState as ProductState),
                                },
                              },
                            });
                            props.ItemLengthRefetch();
                          }}
                        >
                          새로고침
                        </Button>
                        
                        &nbsp;

                        <Button
                          style={{ width: "90px" }}
                          type={"primary"}
                          danger
                          onClick={() => {
                            if (props.selectedItemIds?.length === 0) {
                              message.error("선택 상품이 없습니다.");
                              return;
                            } else {
                              selectItemDelete();
                            }
                          }}
                        >
                          선택삭제
                        </Button>
                       </Col>
                      </Row>
                    </React.Fragment>
                  }
                >
                  <Row>
                    <Col span={2} style={{
                      background: "whitesmoke",
                      padding: "7px 2px 2px 2px",

                      textAlign: "center"
                    }}>
                      상품 노출 수
                    </Col>

                    <Col span={4} style={{
                      background: "white",
                      padding: 2,

                      textAlign: "center"
                    }}>
                      <Search
                        style={{ 
                          width: "80%"
                        }}

                        type="number"
                        placeholder="숫자 입력"
                        // enterButton="적용"
                        onSearch={(e) => {
                          var pageInt = parseInt(e);

                          if (isNaN(pageInt)) {
                            message.info("숫자 형태로 입력해주시기 바랍니다.");

                            return;
                          }

                          if (pageInt <= 0) {
                            message.info("0 이하의 숫자는 입력할 수 없습니다.");

                            return;
                          }

                          props.setPageCountNumber(pageInt);
                        }}
                      />
                    </Col>

                    <Col span={2} style={{
                      background: "whitesmoke",
                      padding: "7px 2px 2px 2px",

                      textAlign: "center",
                    }}>
                      동영상
                    </Col>

                    <Col span={4} style={{
                      background: "white",
                      padding: 2,

                      textAlign: "center"
                    }}>
                      <Radio.Group value={hasVideo} onChange={(e) => {
                        setHasVideo(e.target.value)
                      }}>
                        <Radio value={""} style={{padding: "5px 0px 5px 0px"}}>
                          모두
                        </Radio>

                        <Radio value={"Y"} style={{padding: "5px 0px 5px 0px"}}>
                          있음
                        </Radio>

                        <Radio value={"N"} style={{padding: "5px 0px 5px 0px"}}>
                          없음
                        </Radio>
                      </Radio.Group>
                    </Col>

                    <Col span={2} style={{
                      background: "whitesmoke",
                      padding: "7px 2px 2px 2px",

                      textAlign: "center"
                    }}>
                      이미지 번역
                    </Col>

                    <Col span={4} style={{
                      background: "white",
                      padding: 2,

                      textAlign: "center"
                    }}>
                      <Radio.Group value={hasTranslated} onChange={(e) => {
                        setHasTranslated(e.target.value)
                      }}>
                        <Radio value={undefined} style={{padding: "5px 0px 5px 0px"}}>
                          모두
                        </Radio>

                        <Radio value={true} style={{padding: "5px 0px 5px 0px"}}>
                          있음
                        </Radio>

                        <Radio value={false} style={{padding: "5px 0px 5px 0px"}}>
                          없음
                        </Radio>
                      </Radio.Group>
                    </Col>
                  </Row>

                  <div style={{
                    height: 5
                  }} />
                  
                  <Row>
                    <Col span={2} style={{
                      background: "whitesmoke",
                      padding: "7px 2px 2px 2px",

                      textAlign: "center"
                    }}>
                      판매가 범위
                    </Col>

                    <Col span={4} style={{
                      background: "white",
                      padding: 2,

                      textAlign: "center"
                    }}>
                      <Input style={{
                        width: "30%"
                      }} onChange={(e) => {
                        setPriceStart(e.target.value);
                      }}/>
                      
                      원 이상

                      &nbsp;

                      <Input style={{
                        width: "30%"
                      }} onChange={(e) => {
                        setPriceEnd(e.target.value);
                      }}/>

                      원 이하
                    </Col>

                    <Col span={2} style={{
                      background: "whitesmoke",
                      padding: "7px 2px 2px 2px",

                      textAlign: "center"
                    }}>
                      해외배송비 범위
                    </Col>

                    <Col span={4} style={{
                      background: "white",
                      padding: 2,

                      textAlign: "center"
                    }}>
                      <Input style={{
                        width: "30%"
                      }} onChange={(e) => {
                        setLocalShippingFeeStart(e.target.value);
                      }}/>
                      
                      원 이상

                      &nbsp;

                      <Input style={{
                        width: "30%"
                      }} onChange={(e) => {
                        setLocalShippingFeeEnd(e.target.value);
                      }}/>

                      원 이하
                    </Col>

                    <Col span={2} style={{
                      background: "whitesmoke",
                      padding: "7px 2px 2px 2px",

                      textAlign: "center"
                    }}>
                      유료배송비 범위
                    </Col>

                    <Col span={4} style={{
                      background: "white",
                      padding: 2,

                      textAlign: "center"
                    }}>
                      <Input style={{
                        width: "30%"
                      }} onChange={(e) => {
                        setExtraShippingFeeStart(e.target.value);
                      }}/>
                      
                      원 이상

                      &nbsp;

                      <Input style={{
                        width: "30%"
                      }} onChange={(e) => {
                        setExtraShippingFeeEnd(e.target.value);
                      }}/>

                      원 이하
                    </Col>
                  </Row>
                </Panel>
              </Collapse>
            </Row>
          </TabPane>
        ))}
      </Tabs>
      {/* 선택 마켓 등록(팝업)모달 */}
      <SelectMarketRegistration
        visible={marketRegistrationModal}
        closeMarketRegistrationModal={() => setMarketRegistrationModal(false)}
        selectedItemIds={props.selectedItemIds}
        itemLengthRefetch={() => props.ItemLengthRefetch()}
      />
      {/* 카테고리 */}
      <SelectMarketCategoryControlModal
        visible={marketCategoryControlModal}
        closeMarketCategoryControlModal={() =>
          setMarketCategoryControlModal(false)
        }
        selectedItemIds={props.selectedItemIds}
      />
      {/* 가격설정 */}
      <UpdateProductPriceModal
        visible={updateProductPriceModal}
        closeUpdateProductPriceModal={() => setUpdateProductPriceModal(false)}
        selectedItemIds={props.selectedItemIds}
      />
      {/* 상품명 변경 */}
      <UpdateProductTitleModal
        visible={updateProductTitleModal}
        closeUpdateProductTitleModal={() => setUpdateProductTitleModal(false)}
        selectedItemIds={props.selectedItemIds}
      />
      {/* 검색어 태그 */}
      <UpdateProductTagModal
        visible={updateProductTagModal}
        closeUpdateProductTagModal={() => setUpdateProductTagModal(false)}
        selectedItemIds={props.selectedItemIds}
      />
      <UpdateProductOptionNameModal
        visible={updateProductOptionNameModal}
        closeUpdateProductOptionNameModal={() => setUpdateProductOptionNameModal(false)}
        selectedItemIds={props.selectedItemIds}
      />
    </>
  );
};

export default ProductTabs;
