import {
  Button,
  Col,
  Collapse,
  message,
  Modal,
  Row,
  Tabs,
  Input,
  Select,
  DatePicker,
  Radio,
} from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import querystring from "query-string";
import {
  MutationDeleteProductByAdminArgs,
  MutationEndProductSellStateByAdminArgs,
  ProductState,
  QuerySelectProductsCountByAdminArgs,
} from "src/types";
import { transProductState2 } from "src/common/transform";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import MUTATIONS from "src/apis/mutations";
import ICON from "src/assets/icon";
import QUERIES from "src/apis/queries";
import moment, { Moment } from "moment";
import UpdateProductPriceModalAdmin from "src/component/common/update-product-price-modal-admin";
import loadable from "@loadable/component";

const SelectMarketCategoryControlModalAdmin = loadable(
  () =>
    import("src/component/common/select-market-category-control-modal-admin")
);

const SelectUserControlModalAdmin = loadable(
  () => import("src/component/common/select-user-control-modal-admin")
);

const { TabPane } = Tabs;
const { confirm } = Modal;
const { Search } = Input;
const { Option } = Select;
const { Panel } = Collapse;

interface Props {
  // setQueryString?: (e: string) => void; //
  selectedItemIds?: number[];
  selectMyProductRefetch?: ({}) => void; //
  selectProductsCountRefetch?: ({}) => void;
  setPageSize?: (e) => void;
  ItemLengthRefetch?: () => void; //
  selectRadio: string;
  setSelectRadio: (e) => void;
  imageTranslate: null | boolean;
  setImageTranslate: (e) => void;
  pageCount?: number;
  setPageCountNumber: (e) => void;
}

type tabsType =
  | "ALL"
  | "AdminCollected"
  | "Collected"
  | "OnSale"
  | "UloadWaiting"
  | "UploadFailed"
  | "SellDone";

type filterDataType = {
  searchKeyWord: string;
  productStat: string | undefined;
  optionType: boolean;
  store: string | undefined;
  startDate: Moment | undefined;
  endDate: Moment | undefined;
};

const initialFillterData = {
  searchKeyWord: "",
  productStat: undefined,
  optionType: true,
  store: undefined,
  startDate: undefined,
  endDate: undefined,
};

const ProductTabsByAdmin = (props: Props) => {
  const history = useHistory();
  const queryStringValue = querystring.parse(history.location.search);

  // const [marketRegistrationModal, setMarketRegistrationModal] =
  //   useState<boolean>(false);
  // const [marketSillControlModal, setMarketSillControlModal] =
  //   useState<boolean>(false);

  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);

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

  const [userListModal, setUserListModal] = useState<boolean>(false);
  const [type, setType] = useState<tabsType>(queryStringValue.type as tabsType);
  const productState = transProductState2(type as string); //????????????

  const [searchInputValue, setSearchInputValue] = useState<string>("");

  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");

  const [priceStart, setPriceStart] = useState<string>("");
  const [priceEnd, setPriceEnd] = useState<string>("");

  const [hasShipping, setHasShipping] = useState<string>("");
  const [hasVideo, setHasVideo] = useState<string>("");
  const [hasTranslated, setHasTranslated] = useState<boolean>(undefined);

  const [changeSelectBox, setChangeSelectBox] = useState("All");

  useEffect(() => {
    setType(queryStringValue.type as tabsType);
  }, [queryStringValue.type]);

  const { data: allLengthData } = useQuery<
    { selectProductsCountByAdmin: number },
    QuerySelectProductsCountByAdminArgs
  >(QUERIES.PRODUCT_COUNT_TO_TABS);

  const { data: adminCollectedLengthData } = useQuery<
    { selectProductsCountByAdmin: number },
    QuerySelectProductsCountByAdminArgs
  >(QUERIES.PRODUCT_COUNT_TO_TABS, {
    variables: {
      where: {
        AND: [
          { user: null },
          { state: { equals: "COLLECTED" as ProductState } },
        ],
      },
    },
  });

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

  const { data: collectedLengthData } = useQuery<
    { selectProductsCountByAdmin: number },
    QuerySelectProductsCountByAdminArgs
  >(QUERIES.PRODUCT_COUNT_TO_TABS, {
    variables: { where: { state: { equals: "COLLECTED" as ProductState } } },
  });

  const { data: onSalecollectedLengthData } = useQuery<
    { selectProductsCountByAdmin: number },
    QuerySelectProductsCountByAdminArgs
  >(QUERIES.PRODUCT_COUNT_TO_TABS, {
    variables: { where: { state: { equals: "ON_SALE" as ProductState } } },
  });

  const { data: uploadWaitingcollectedLengthData } = useQuery<
    { selectProductsCountByAdmin: number },
    QuerySelectProductsCountByAdminArgs
  >(QUERIES.PRODUCT_COUNT_TO_TABS, {
    variables: {
      where: { state: { equals: "UPLOAD_WAITING" as ProductState } },
    },
  });

  const { data: uploadFailedcollectedLengthData } = useQuery<
    { selectProductsCountByAdmin: number },
    QuerySelectProductsCountByAdminArgs
  >(QUERIES.PRODUCT_COUNT_TO_TABS, {
    variables: {
      where: { state: { equals: "UPLOAD_FAILED" as ProductState } },
    },
  });
  
  const { data: sellDonecollectedLengthData } = useQuery<
    { selectProductsCountByAdmin: number },
    QuerySelectProductsCountByAdminArgs
  >(QUERIES.PRODUCT_COUNT_TO_TABS, {
    variables: { where: { state: { equals: "SELL_DONE" as ProductState } } },
  });

  const tabs = [
    {
      label: (
        <div
          className="taps-label-style"
          onClick={() => {
            props.selectMyProductRefetch({ where: null }); props.ItemLengthRefetch()
          }}
        >
          ??????{" "}
          <span className="taps-label-number">
            ( {allLengthData?.selectProductsCountByAdmin} )
          </span>
        </div>
      ),
      key: 1,
      value: "ALL",
    },
    {
      label: (
        <div className="taps-label-style">
          ????????? ????????????{" "}
          <span className="taps-label-number">
            ( {adminCollectedLengthData?.selectProductsCountByAdmin} )
          </span>
        </div>
      ),
      key: 2,
      value: "AdminCollected",
    },
    {
      label: (
        <div className="taps-label-style">
          ????????? ????????????{" "}
          <span className="taps-label-number">
            ( {collectedLengthData?.selectProductsCountByAdmin} )
          </span>
        </div>
      ),
      key: 3,
      value: "Collected",
    },
    {
      label: (
        <div className="taps-label-style">
          ?????????{" "}
          <span className="taps-label-number">
            ( {onSalecollectedLengthData?.selectProductsCountByAdmin} )
          </span>
        </div>
      ),
      key: 4,
      value: "OnSale",
    },
    // {
    //   label: (
    //     <div className="taps-label-style">
    //       ????????? ??????{" "}
    //       <span className="taps-label-number">
    //         ( {uploadWaitingcollectedLengthData?.selectProductsCountByAdmin} )
    //       </span>
    //     </div>
    //   ),
    //   key: 5,
    //   value: "UloadWaiting",
    // },
    {
      label: (
        <div className="taps-label-style">
          ????????? ??????{" "}
          <span className="taps-label-number">
            ( {uploadFailedcollectedLengthData?.selectProductsCountByAdmin} )
          </span>
        </div>
      ),
      key: 6,
      value: "UploadFailed",
    },
    {
      label: (
        <div className="taps-label-style">
          ?????? ??????{" "}
          <span className="taps-label-number">
            ( {sellDonecollectedLengthData?.selectProductsCountByAdmin} )
          </span>
        </div>
      ),
      key: 7,
      value: "SellDone",
    },
  ];

  //???????????? ?????? ??????
  const [deleteProductData] = useMutation<
    { deleteProductByAdmin: Boolean },
    MutationDeleteProductByAdminArgs
  >(MUTATIONS.DELETE_PRODUCT_BY_ADMIN, {
    refetchQueries: [
      "SELECT_PRODUCT_LIST_BY_ADMIN",
      "SELECT_PRODUCT_COUNT_BY_ADMIN",
    ],
  });

  //?????? ??????
  const [endProductSellState] = useMutation<
    { endProductSellStateByAdmin: number },
    MutationEndProductSellStateByAdminArgs
  >(MUTATIONS.END_PRODUCT_SELL_STATE_BY_ADMIN, {
    refetchQueries: [
      "SELECT_PRODUCT_LIST_BY_ADMIN",
      "SELECT_PRODUCT_COUNT_BY_ADMIN",
    ],
  });
  
  const search = (e: string) => {
    const where = {
      AND: [
        { state: { equals: productState === "" ? undefined : (productState as ProductState) }},
        { createdAt : { gte: dateStart === "" ? undefined : new Date(dateStart) } },
        { createdAt : { lte: dateEnd === "" ? undefined : new Date(dateEnd) } },
        { shippingFee : { gt: hasShipping === "" ? undefined : hasShipping === "Y" ? 0 : -1 } },
        { isImageTranslated : { equals: hasTranslated } },
        
        { taobaoProduct: { videoUrl: hasVideo === "" ? undefined : hasVideo === "Y" ? { not: { equals: "" } } : { equals: "" } } },

        { price: { gte: priceStart === "" ? undefined : parseInt(priceStart) } },
        { price: { lte: priceEnd === "" ? undefined : parseInt(priceEnd) } },
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
  
                { category: { c1Name : { contains: e === "" ? undefined : e } } },
                { category: { c2Name : { contains: e === "" ? undefined : e } } },
                { category: { c3Name : { contains: e === "" ? undefined : e } } },
                { category: { c4Name : { contains: e === "" ? undefined : e } } }
              ]
            });
          }

          break;

        case "Email":
          Object.assign(where, { user: { email: { contains: e } } });

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
            category: { 
              OR: [ 
                {c1Name : { contains: e }},
                {c2Name : { contains: e }},
                {c3Name : { contains: e }},
                {c4Name : { contains: e }}
              ]
            }
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
    props.selectProductsCountRefetch({ where: where });
  };

  // const [filterData, setFilterData] = useState<filterDataType>(initialFillterData);

  // const where = {};

  // if (queryStringValue.type === "AdminCollected") {
  //   Object.assign(where, {
  //     AND: [
  //       { user: null },
  //       { state: { equals: productState as ProductState } },
  //     ],
  //   });
  // } else {
  //   Object.assign(where, {
  //     state: { equals: productState ? (productState as ProductState) : null },
  //   });
  // }

  // if (filterData.productStat !== undefined) {
  //   Object.assign(where, {
  //     productStore: {
  //       some: {
  //         userSetData: {
  //           userShopData: { siteCode: { equals: filterData.productStat } },
  //         },
  //       },
  //     },
  //   });
  // }

  // if (filterData.optionType === false) {
  //   Object.assign(where, { productOption: { none: { id: { gt: 0 } } } });
  // }

  // if (filterData.store !== undefined) {
  //   Object.assign(where, {
  //     productStore: {
  //       some: {
  //         userSetData: {
  //           userShopData: { siteCode: { equals: filterData.store } },
  //         },
  //       },
  //     },
  //   });
  // }

  // if (filterData.startDate !== undefined || filterData.endDate !== undefined) {
  //   Object.assign(where, {
  //     createdAt: { gt: filterData.startDate, lt: filterData.endDate },
  //   });
  // }

  // switch (changeSelectBox) {
  //   case "All":
  //     Object.assign(where, {
  //       OR: [
  //         { user: { email: { contains: filterData.searchKeyWord } } },
  //         { taobaoProduct: { name: { contains: filterData.searchKeyWord } } },
  //         { name: { contains: filterData.searchKeyWord } },
  //         {
  //           taobaoProduct: {
  //             taobaoNumIid: { contains: filterData.searchKeyWord },
  //           },
  //         },
  //         {
  //           productStore: {
  //             some: { storeProductId: { contains: filterData.searchKeyWord } },
  //           },
  //         },
  //       ],
  //     });
  //     break;
  //   case "Email":
  //     Object.assign(where, {
  //       user: { email: { contains: filterData.searchKeyWord } },
  //     });
  //     break;
  //   case "ProudctId":
  //     Object.assign(where, {
  //       productCode: { contains: filterData.searchKeyWord },
  //     });
  //     break;
  //   case "ProudctName":
  //     Object.assign(where, { name: { contains: filterData.searchKeyWord } });
  //     break;
  //   case "ChannelItemNumber":
  //     Object.assign(where, {
  //       productStore: {
  //         some: { storeProductId: { contains: filterData.searchKeyWord } },
  //       },
  //     });
  //     break;
  //   default:
  //     break;
  // }

  // const searchHandle = () => {
  //   if (props.selectMyProductRefetch)
  //     props.selectMyProductRefetch({ where: where });
  //   if (props.selectProductsCountRefetch)
  //     props.selectProductsCountRefetch({ where: where });
  // };

  // useEffect(() => {
  //   setFilterData(initialFillterData);
  // }, [type, props.selectRadio, props.imageTranslate]);

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
        {tabs.map((value) => (
          <TabPane tab={value.label} key={value.value}>
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

                          ????????????

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
                              width: 150,
                              marginRight: "5px" 
                            }}
                            onChange={(e) => {
                              setChangeSelectBox(e as string);
                            }}
                          >
                            <Option value="All">????????????</Option>
                            <Option value="Email">?????????ID</Option>
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

                          {(() => {
                            switch (type) {
                              case "Collected":
                                return (
                                  <>
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
                                  </>
                                );

                              case "OnSale":
                              case "UploadFailed":
                                return (
                                  <>
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
                                  </>
                                );
                                
                              default:
                                return (
                                  <>
                                  </>
                                );
                            }
                          }
                        )()}
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
                  </Row>

                  <div style={{
                    height: 5
                  }} />
                  
                  <Row>
                    <Col span={2} style={{
                      background: "whitesmoke",
                      padding: "7px 2px 2px 2px",

                      textAlign: "center",
                    }}>
                      ???????????????
                    </Col>

                    <Col span={4} style={{
                      background: "white",
                      padding: 2,

                      textAlign: "center"
                    }}>
                      <Radio.Group value={hasShipping} onChange={(e) => {
                        setHasShipping(e.target.value)
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
                </Panel>
              </Collapse>
            </Row>
          </TabPane>
        ))}
      </Tabs>

      <SelectMarketCategoryControlModalAdmin
        visible={marketCategoryControlModal}
        closeMarketCategoryControlModal={() =>
          setMarketCategoryControlModal(false)
        }
        selectedItemIds={props.selectedItemIds}
      />

      <UpdateProductPriceModalAdmin
        visible={updateProductPriceModal}
        closeUpdateProductPriceModal={() => setUpdateProductPriceModal(false)}
        selectedItemIds={props.selectedItemIds}
      />

      <SelectUserControlModalAdmin
        visible={userListModal}
        closeUserControlModal={() => setUserListModal(false)}
        selectedItemIds={props.selectedItemIds}
      />
    </>
  );
};

export default ProductTabsByAdmin;
