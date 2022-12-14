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
          ??????{" "}
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
          ?????? ??????{" "}
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
          ?????????{" "}
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
    //       ????????? ??????{" "}
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
          ????????? ??????{" "}
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
    //       ?????? ??????{" "}
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
        title: "?????? ????????? ????????????????????????? (" + props.selectedItemIds?.length + "???)",
        content: (
          <div style={{ color: "red" }}>
            ?????? ???????????? ????????? ????????? ?????? ?????? ??? 
            
            <br />
            
            ?????? ????????? ?????? ???????????? ????????? ??????????????????.
            
            <br />
            <br />

            ?????? ????????? ????????? ?????????????????????????
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
              .then(() => message.success("???????????? ????????? ?????????????????????."))
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
                            ?????? ??????
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
                            <Option value="SearchCollectedDate">????????? ??????</Option>
                            <Option value="SearchRegisteredDate">????????? ??????</Option>
                          </Select>

                          &nbsp;

                          <DatePicker 
                            showTime={{
                              defaultValue: moment('00:00:00', 'HH:mm:ss')
                            }}
                            placeholder={"?????? ??????"}
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
                            placeholder={"?????? ??????"}
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
                            <Option value="All">????????????</Option>
                            <Option value="ProudctId">????????????</Option>
                            <Option value="ProudctOrginalName">?????????(??????)</Option>
                            <Option value="ProudctTranslatedName">?????????(??????)</Option>
                            <Option value="CategoryName">???????????????</Option>
                            <Option value="ShopId">?????????????????????</Option>
                            <Option value="ChannelItemNumber">????????????????????????</Option>
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

                          ????????????

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
                                message.error("????????? ???????????? ???????????????.");
                                return;
                              } else {
                                setUpdateProductPriceModal(true);
                              }
                            }}
                          >
                            ??????
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
                                message.error("????????? ???????????? ???????????????.");
                                return;
                              } else {
                                setUpdateProductTitleModal(true);
                              }
                            }}
                          >
                            ?????????
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
                                message.error("????????? ???????????? ???????????????.");
                                return;
                              } else {
                                setUpdateProductTagModal(true);
                              }
                            }}
                          >
                            ????????????
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
                                message.error("????????? ???????????? ???????????????.");
                                return;
                              } else {
                                setUpdateProductOptionNameModal(true);
                              }
                            }}
                          >
                            ?????????
                          </Button> */}

                          <Button
                            // shape="round"
                            style={{ 
                              padding: 0,
                              width: "80px" 
                            }}
                            onClick={() => {
                              if (props.selectedItemIds?.length === 0) {
                                message.error("????????? ???????????? ???????????????.");
                                return;
                              } else {
                                setMarketCategoryControlModal(true);
                              }
                            }}
                          >
                            ????????????
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
                          ????????????
                        </Button>
                        
                        &nbsp;

                        <Button
                          style={{ width: "90px" }}
                          type={"primary"}
                          danger
                          onClick={() => {
                            if (props.selectedItemIds?.length === 0) {
                              message.error("?????? ????????? ????????????.");
                              return;
                            } else {
                              selectItemDelete();
                            }
                          }}
                        >
                          ????????????
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
                      ?????? ?????? ???
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
                        placeholder="?????? ??????"
                        // enterButton="??????"
                        onSearch={(e) => {
                          var pageInt = parseInt(e);

                          if (isNaN(pageInt)) {
                            message.info("?????? ????????? ?????????????????? ????????????.");

                            return;
                          }

                          if (pageInt <= 0) {
                            message.info("0 ????????? ????????? ????????? ??? ????????????.");

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
                      ?????????
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
                          ??????
                        </Radio>

                        <Radio value={"Y"} style={{padding: "5px 0px 5px 0px"}}>
                          ??????
                        </Radio>

                        <Radio value={"N"} style={{padding: "5px 0px 5px 0px"}}>
                          ??????
                        </Radio>
                      </Radio.Group>
                    </Col>

                    <Col span={2} style={{
                      background: "whitesmoke",
                      padding: "7px 2px 2px 2px",

                      textAlign: "center"
                    }}>
                      ????????? ??????
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
                          ??????
                        </Radio>

                        <Radio value={true} style={{padding: "5px 0px 5px 0px"}}>
                          ??????
                        </Radio>

                        <Radio value={false} style={{padding: "5px 0px 5px 0px"}}>
                          ??????
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
                      ????????? ??????
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
                      
                      ??? ??????

                      &nbsp;

                      <Input style={{
                        width: "30%"
                      }} onChange={(e) => {
                        setPriceEnd(e.target.value);
                      }}/>

                      ??? ??????
                    </Col>

                    <Col span={2} style={{
                      background: "whitesmoke",
                      padding: "7px 2px 2px 2px",

                      textAlign: "center"
                    }}>
                      ??????????????? ??????
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
                      
                      ??? ??????

                      &nbsp;

                      <Input style={{
                        width: "30%"
                      }} onChange={(e) => {
                        setLocalShippingFeeEnd(e.target.value);
                      }}/>

                      ??? ??????
                    </Col>

                    <Col span={2} style={{
                      background: "whitesmoke",
                      padding: "7px 2px 2px 2px",

                      textAlign: "center"
                    }}>
                      ??????????????? ??????
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
                      
                      ??? ??????

                      &nbsp;

                      <Input style={{
                        width: "30%"
                      }} onChange={(e) => {
                        setExtraShippingFeeEnd(e.target.value);
                      }}/>

                      ??? ??????
                    </Col>
                  </Row>
                </Panel>
              </Collapse>
            </Row>
          </TabPane>
        ))}
      </Tabs>
      {/* ?????? ?????? ??????(??????)?????? */}
      <SelectMarketRegistration
        visible={marketRegistrationModal}
        closeMarketRegistrationModal={() => setMarketRegistrationModal(false)}
        selectedItemIds={props.selectedItemIds}
        itemLengthRefetch={() => props.ItemLengthRefetch()}
      />
      {/* ???????????? */}
      <SelectMarketCategoryControlModal
        visible={marketCategoryControlModal}
        closeMarketCategoryControlModal={() =>
          setMarketCategoryControlModal(false)
        }
        selectedItemIds={props.selectedItemIds}
      />
      {/* ???????????? */}
      <UpdateProductPriceModal
        visible={updateProductPriceModal}
        closeUpdateProductPriceModal={() => setUpdateProductPriceModal(false)}
        selectedItemIds={props.selectedItemIds}
      />
      {/* ????????? ?????? */}
      <UpdateProductTitleModal
        visible={updateProductTitleModal}
        closeUpdateProductTitleModal={() => setUpdateProductTitleModal(false)}
        selectedItemIds={props.selectedItemIds}
      />
      {/* ????????? ?????? */}
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
