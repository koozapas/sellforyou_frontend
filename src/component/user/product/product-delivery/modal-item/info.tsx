import { ApolloError, useMutation, useLazyQuery } from "@apollo/client";
import { Button, Image, Input, InputNumber, Modal, Row, Col, Select, Tooltip, message, Descriptions } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import QUERIES from "src/apis/queries";
import MUTATIONS from "src/apis/mutations";
import CategoriWrapPage from "src/pages/user/product/detail/categori-wrap-page";
import { MutationUpdateProductPriceByUserArgs, Product, User } from "src/types";
import { CalculatePriceType, ItemInputType } from "../detail-modal";
import ICON from "src/assets/icon";
import { QuestionCircleTwoTone } from '@ant-design/icons';

import {
  CategoryInformationType,
  QuerySearchCategoriesBySomeoneArgs,
} from "src/types";

const { Option } = Select;
const { confirm } = Modal;

interface Props {
  myInfoData: {
    selectMyInfoByUser: User;
  };
  itemData: Product | undefined;
  itemInput: ItemInputType;
  calculatePriceData: CalculatePriceType;
  chkImage: any;
  shippingCode: number;
  searchTags: string;
  selectProductId: number;
  selectCategoryItem: string;
  searchKeyword: string;
  itemTotal: {
    item1: string | undefined;
    item2: string | undefined;
    item3: string | undefined;
    item4: string | undefined;
  };

  categoryA077: string;
  categoryB378: string;
  categoryA112: string;
  categoryA027: string;
  categoryA001: string;
  categoryA006: string;
  categoryB719: string;
  categoryA113: string;
  categoryA524: string;
  categoryA525: string;
  categoryB956: string;

  categoryA077Name: string;
  categoryB378Name: string;
  categoryA112Name: string;
  categoryA027Name: string;
  categoryA001Name: string;
  categoryA006Name: string;
  categoryB719Name: string;
  categoryA113Name: string;
  categoryA524Name: string;
  categoryA525Name: string;
  categoryB956Name: string;

  onChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePrice: (e: number | string) => void;
  onChangeShippingFee: (e: number | string) => void;
  onChangeShippingCode: (e: number | string) => void;
  onChangeCalculatePrice: (e: string | number, name: string) => void;
  onChangeSearchTags: (e: ChangeEvent<HTMLInputElement>) => void;
  setSelectCategoryItem: React.Dispatch<React.SetStateAction<string>>;
  setSearchKeyword: (e: string) => void;
  setItemTotal: (e: any) => void;

  setCategoryA077: (e: any) => void;
  setCategoryB378: (e: any) => void;
  setCategoryA112: (e: any) => void;
  setCategoryA027: (e: any) => void;
  setCategoryA001: (e: any) => void;
  setCategoryA006: (e: any) => void;
  setCategoryB719: (e: any) => void;
  setCategoryA113: (e: any) => void;
  setCategoryA524: (e: any) => void;
  setCategoryA525: (e: any) => void;
  setCategoryB956: (e: any) => void;

  setCategoryA077Name: (e: any) => void;
  setCategoryB378Name: (e: any) => void;
  setCategoryA112Name: (e: any) => void;
  setCategoryA027Name: (e: any) => void;
  setCategoryA001Name: (e: any) => void;
  setCategoryA006Name: (e: any) => void;
  setCategoryB719Name: (e: any) => void;
  setCategoryA113Name: (e: any) => void;
  setCategoryA524Name: (e: any) => void;
  setCategoryA525Name: (e: any) => void;
  setCategoryB956Name: (e: any) => void;
}

/** 기본정보 */
const ProductDetailModalInfo = ({
  myInfoData,
  itemData,
  itemInput,
  calculatePriceData,
  chkImage,
  shippingCode,
  selectProductId,
  selectCategoryItem,
  searchTags,
  searchKeyword,
  itemTotal,

  categoryA077,
  categoryB378,
  categoryA112,
  categoryA027,
  categoryA001,
  categoryA006,
  categoryB719,
  categoryA113,
  categoryA524,
  categoryA525,
  categoryB956,

  categoryA077Name,
  categoryB378Name,
  categoryA112Name,
  categoryA027Name,
  categoryA001Name,
  categoryA006Name,
  categoryB719Name,
  categoryA113Name,
  categoryA524Name,
  categoryA525Name,
  categoryB956Name,

  onChangeSearchTags,
  onChangeName,
  onChangePrice,
  onChangeShippingFee,
  onChangeShippingCode,
  onChangeCalculatePrice,
  setSelectCategoryItem,
  setSearchKeyword,
  setItemTotal,

  setCategoryA077,
  setCategoryB378,
  setCategoryA112,
  setCategoryA027,
  setCategoryA001,
  setCategoryA006,
  setCategoryB719,
  setCategoryA113,
  setCategoryA524,
  setCategoryA525,
  setCategoryB956,

  setCategoryA077Name,
  setCategoryB378Name,
  setCategoryA112Name,
  setCategoryA027Name,
  setCategoryA001Name,
  setCategoryA006Name,
  setCategoryB719Name,
  setCategoryA113Name,
  setCategoryA524Name,
  setCategoryA525Name,
  setCategoryB956Name
}: Props) => {
  const [searchCategoryInfoA077ToLazyQuery, { data: searchCategoryA077Data, variables: searchCategoryA077Args }] = useLazyQuery<
    { searchCategoryInfoA077BySomeone: CategoryInformationType[] },
    QuerySearchCategoriesBySomeoneArgs
  >(QUERIES.SEARCH_CATEGORY_INFO_A077, { 
    onCompleted(data) {
      let result = data.searchCategoryInfoA077BySomeone;
      
      if (searchCategoryA077Args.code && result.length === 1) {
        setCategoryA077(result[0].code);
        setCategoryA077Name(result[0].name);
      }
    },

    onError() {
      setCategoryA077("");
      setCategoryA077Name("");
    },

    fetchPolicy: "no-cache" 
  });

  const [searchCategoryInfoB378ToLazyQuery, { data: searchCategoryB378Data }] = useLazyQuery<
    { searchCategoryInfoB378BySomeone: CategoryInformationType[] },
    QuerySearchCategoriesBySomeoneArgs
  >(QUERIES.SEARCH_CATEGORY_INFO_B378, { 
    onCompleted(data) {
      let result = data.searchCategoryInfoB378BySomeone;
      
      if (result.length === 1) {
        setCategoryB378(result[0].code);
        setCategoryB378Name(result[0].name);
      }
    },

    onError() {
      setCategoryB378("");
      setCategoryB378Name("");
    },

    fetchPolicy: "no-cache" 
  });

  const [searchCategoryInfoA112ToLazyQuery, { data: searchCategoryA112Data }] = useLazyQuery<
    { searchCategoryInfoA112BySomeone: CategoryInformationType[] },
    QuerySearchCategoriesBySomeoneArgs
  >(QUERIES.SEARCH_CATEGORY_INFO_A112, { 
    onCompleted(data) {
      let result = data.searchCategoryInfoA112BySomeone;
      
      if (result.length === 1) {
        setCategoryA112(result[0].code);
        setCategoryA112Name(result[0].name);
      }
    },

    onError() {
      setCategoryA112("");
      setCategoryA112Name("");
    },

    fetchPolicy: "no-cache" 
  });

  const [searchCategoryInfoA027ToLazyQuery, { data: searchCategoryA027Data }] = useLazyQuery<
    { searchCategoryInfoA027BySomeone: CategoryInformationType[] },
    QuerySearchCategoriesBySomeoneArgs
  >(QUERIES.SEARCH_CATEGORY_INFO_A027, { 
    onCompleted(data) {
      let result = data.searchCategoryInfoA027BySomeone;
      
      if (result.length === 1) {
        setCategoryA027(result[0].code);
        setCategoryA027Name(result[0].name);
      }
    },

    onError() {
      setCategoryA027("");
      setCategoryA027Name("");
    },

    fetchPolicy: "no-cache" 
  });

  const [searchCategoryInfoA001ToLazyQuery, { data: searchCategoryA001Data }] = useLazyQuery<
    { searchCategoryInfoA001BySomeone: CategoryInformationType[] },
    QuerySearchCategoriesBySomeoneArgs
  >(QUERIES.SEARCH_CATEGORY_INFO_A001, { 
    onCompleted(data) {
      let result = data.searchCategoryInfoA001BySomeone;
      
      if (result.length === 1) {
        setCategoryA001(result[0].code);
        setCategoryA001Name(result[0].name);
      }
    },

    onError() {
      setCategoryA001("");
      setCategoryA001Name("");
    },

    fetchPolicy: "no-cache" 
  });

  const [searchCategoryInfoA006ToLazyQuery, { data: searchCategoryA006Data }] = useLazyQuery<
    { searchCategoryInfoA006BySomeone: CategoryInformationType[] },
    QuerySearchCategoriesBySomeoneArgs
  >(QUERIES.SEARCH_CATEGORY_INFO_A006, { 
    onCompleted(data) {
      let result = data.searchCategoryInfoA006BySomeone;
      
      if (result.length === 1) {
        setCategoryA006(result[0].code);
        setCategoryA006Name(result[0].name);
      }
    },

    onError() {
      setCategoryA006("");
      setCategoryA006Name("");
    },

    fetchPolicy: "no-cache" 
  });

  const [searchCategoryInfoB719ToLazyQuery, { data: searchCategoryB719Data }] = useLazyQuery<
    { searchCategoryInfoB719BySomeone: CategoryInformationType[] },
    QuerySearchCategoriesBySomeoneArgs
  >(QUERIES.SEARCH_CATEGORY_INFO_B719, { 
    onCompleted(data) {
      let result = data.searchCategoryInfoB719BySomeone;
      
      if (result.length === 1) {
        setCategoryB719(result[0].code);
        setCategoryB719Name(result[0].name);
      }
    },

    onError() {
      setCategoryB719("");
      setCategoryB719Name("");
    },

    fetchPolicy: "no-cache" 
  });

  const [searchCategoryInfoA113ToLazyQuery, { data: searchCategoryA113Data }] = useLazyQuery<
    { searchCategoryInfoA113BySomeone: CategoryInformationType[] },
    QuerySearchCategoriesBySomeoneArgs
  >(QUERIES.SEARCH_CATEGORY_INFO_A113, { 
    onCompleted(data) {
      let result = data.searchCategoryInfoA113BySomeone;
      
      if (result.length === 1) {
        setCategoryA113(result[0].code);
        setCategoryA113Name(result[0].name);
      }
    },

    onError() {
      setCategoryA113("");
      setCategoryA113Name("");
    },

    fetchPolicy: "no-cache" 
  });

  const [searchCategoryInfoA524ToLazyQuery, { data: searchCategoryA524Data }] = useLazyQuery<
    { searchCategoryInfoA524BySomeone: CategoryInformationType[] },
    QuerySearchCategoriesBySomeoneArgs
  >(QUERIES.SEARCH_CATEGORY_INFO_A524, { 
    onCompleted(data) {
      let result = data.searchCategoryInfoA524BySomeone;
      
      if (result.length === 1) {
        setCategoryA524(result[0].code);
        setCategoryA524Name(result[0].name);
      }
    },

    onError() {
      setCategoryA524("");
      setCategoryA524Name("");
    },

    fetchPolicy: "no-cache" 
  });

  const [searchCategoryInfoA525ToLazyQuery, { data: searchCategoryA525Data }] = useLazyQuery<
    { searchCategoryInfoA525BySomeone: CategoryInformationType[] },
    QuerySearchCategoriesBySomeoneArgs
  >(QUERIES.SEARCH_CATEGORY_INFO_A525, { 
    onCompleted(data) {
      let result = data.searchCategoryInfoA525BySomeone;
      
      if (result.length === 1) {
        setCategoryA525(result[0].code);
        setCategoryA525Name(result[0].name);
      }
    },

    onError() {
      setCategoryA525("");
      setCategoryA525Name("");
    },

    fetchPolicy: "no-cache" 
  });

  const [searchCategoryInfoB956ToLazyQuery, { data: searchCategoryB956Data }] = useLazyQuery<
    { searchCategoryInfoB956BySomeone: CategoryInformationType[] },
    QuerySearchCategoriesBySomeoneArgs
  >(QUERIES.SEARCH_CATEGORY_INFO_B956, { 
    onCompleted(data) {
      let result = data.searchCategoryInfoB956BySomeone;
      
      if (result.length === 1) {
        setCategoryB956(result[0].code);
        setCategoryB956Name(result[0].name);
      }
    },

    onError() {
      setCategoryB956("");
      setCategoryB956Name("");
    },

    fetchPolicy: "no-cache" 
  });

  useEffect(() => {
    searchCategoryInfoA077ToLazyQuery({ variables: { code: itemData?.categoryA077 } });
    searchCategoryInfoB378ToLazyQuery({ variables: { code: itemData?.categoryB378 } });
    searchCategoryInfoA112ToLazyQuery({ variables: { code: itemData?.categoryA112 } });
    searchCategoryInfoA027ToLazyQuery({ variables: { code: itemData?.categoryA027 } });
    searchCategoryInfoA001ToLazyQuery({ variables: { code: itemData?.categoryA001 } });
    searchCategoryInfoA006ToLazyQuery({ variables: { code: itemData?.categoryA006 } });
    searchCategoryInfoB719ToLazyQuery({ variables: { code: itemData?.categoryB719 } });
    searchCategoryInfoA113ToLazyQuery({ variables: { code: itemData?.categoryA113 } });
    searchCategoryInfoA524ToLazyQuery({ variables: { code: itemData?.categoryA524 } });
    searchCategoryInfoA525ToLazyQuery({ variables: { code: itemData?.categoryA525 } });
    searchCategoryInfoB956ToLazyQuery({ variables: { code: itemData?.categoryB956 } });
  }, [])

  //마진율,해외배송비,환율 변경
  const [updateProductPriceByUser] = useMutation<
    { updateProductPriceByUser: number },
    MutationUpdateProductPriceByUserArgs
  >(MUTATIONS.UPDATE_PRODUCT_PRICE_BY_USER, {
    refetchQueries: ["SELECT_MY_PRODUCT_DETAIL"],
  });

  const userInfo = myInfoData?.selectMyInfoByUser?.userInfo;

  

  return (
    <>
      <Row style={{
        marginBottom: "5px"
      }}>
        <Col span={8} style={{
          background: "black",
          border: "1px solid whitesmoke",
          textAlign: "center",
        }}>
          <div style={{
            aspectRatio: '1.15/1'
          }}>
            <img src={chkImage ?? itemData?.taobaoProduct.imageThumbnail} alt="" style={{ 
              height: "100%"
            }} />
          </div>
        </Col>

        <Col span={16} style={{
          fontSize: 16,
          paddingLeft: 5
        }}>
          <Row style={{
            border: "1px solid whitesmoke",
            padding: "5px 10px 5px 10px",
            marginBottom: "5px"
          }}>
            <Col span={3} style={{
              fontWeight: "bold",
              textAlign: "center",
              paddingTop: 7
            }}>
              상품명
            </Col>

            <Col span={21} style={{
              paddingBottom: 5
            }}>
              <Input
                disabled
                style={{
                  cursor: "text",
                  color: "gray",
                  fontSize: "14px",
                  height: "35px"
                }}
                value={itemData?.taobaoProduct.name}
              />

              <Input 
                disabled
                style={{
                  position: "absolute",
                  cursor: "text",
                  color: "gray",
                  fontSize: "14px",
                  right: "0",
                  textAlign: "center",
                  width: "75px",
                  height: "35px"
                }}
                value={itemData?.taobaoProduct.name.length.toString() + "/50"}
              />
            </Col>

            <Col span={3} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <img src={itemData?.taobaoProduct ?
                  JSON.parse(itemData?.taobaoProduct.originalData).shop_id === "express" ? 
                    ICON.ICON_EXPRESS.default
                  :
                    JSON.parse(itemData?.taobaoProduct.originalData).shop_id === "1688" ?
                      ICON.ICON_1688.default
                    :
                      JSON.parse(itemData?.taobaoProduct.originalData).shop_id === "vvic" ?
                        ICON.ICON_VVIC.default
                      :
                        JSON.parse(itemData?.taobaoProduct.originalData).tmall ?
                          ICON.ICON_TMALL.default
                        :
                          ICON.ICON_TAOBAO.default
                :
                  null
              } alt="" style={{
                cursor: "pointer"
              }}
              onClick={() => {
                var shopId = JSON.parse(itemData?.taobaoProduct.originalData).shop_id;

                var taobaoUrl = null;

                switch (shopId) {
                  case "express": {
                    taobaoUrl = `https://ko.aliexpress.com/item/${itemData?.taobaoProduct.taobaoNumIid}.html`;
                    
                    break;
                  }

                  case "1688": {
                    taobaoUrl = `https://detail.1688.com/offer/${itemData?.taobaoProduct.taobaoNumIid}.html`;

                    break;
                  }

                  case "vvic": {
                    taobaoUrl = `https://www.vvic.com/item/${itemData?.taobaoProduct.taobaoNumIid}`;

                    break;
                  }

                  default: {
                    taobaoUrl = `https://item.taobao.com/item.htm?id=${itemData?.taobaoProduct.taobaoNumIid}`;

                    break;
                  }
                }

                window.open(taobaoUrl, "_blank");
              }}/>
            </Col>

            <Col span={21}>
              <Input
                style={{
                  fontSize: "14px",
                  height: "35px"
                }}
                value={itemInput.name}
                onChange={onChangeName}
              />

              <Input 
                disabled
                style={{
                  position: "absolute",
                  cursor: "text",
                  color: "gray",
                  fontSize: "14px",
                  width: "75px",
                  textAlign: "center",
                  right: "0",
                  height: "35px"
                }}
                value={itemInput.name.length.toString() + "/50"}
              />
            </Col>
          </Row>

          <Row style={{
            border: "1px solid whitesmoke",
            padding: "5px 10px 5px 10px",
            marginBottom: "5px"
          }}>
            <Col span={3} style={{
              fontWeight: "bold",
              textAlign: "center",
              paddingTop: 7
            }}>
              가격 정보
            </Col>

            <Col span={21}>
              <Row>
                <Col span={8} style={{
                  borderRight: "1px solid whitesmoke",

                  padding: "5px 10px 5px 10px"
                }}>
                  <Row>
                    <Col span={12} style={{
                      fontSize: 14,
                      paddingTop: 5,
                    }}>
                      도매가({itemData ? JSON.parse(itemData?.taobaoProduct.originalData).shop_id === 'express' ? "￦" : "¥" : null})
                    </Col>

                    <Col span={12}>
                      <InputNumber
                        disabled
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        style={{
                          fontSize: "14px",
                          color: "gray",
                          height: "35px",
                          width: "100%",
                        }}
                        value={itemData?.taobaoProduct.price}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={8} style={{
                  borderRight: "1px solid whitesmoke",

                  padding: "5px 10px 5px 10px"
                }}>
                  <Row>
                    <Col span={12} style={{
                      fontSize: 14,
                      paddingTop: 5
                    }}>
                      판매가(￦)
                    </Col>

                    <Col span={12}>
                      <InputNumber
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        style={{
                          fontSize: "14px",
                          // color: "#2988ff",
                          height: "35px",
                          width: "100%",
                        }}
                        value={itemInput?.price}
                        onChange={onChangePrice}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={8} style={{
                  padding: "5px 10px 5px 10px"
                }}>
                  <Row>
                    <Col span={12} style={{
                      fontSize: 14,
                      paddingTop: 5
                    }}>
                      유료배송비(￦) 

                      &nbsp;
                      
                      <Tooltip title="유료배송비 설정 시 오픈마켓 배송비가 유료로 설정됩니다.">
                        <QuestionCircleTwoTone />
                      </Tooltip> 
                    </Col>

                    <Col span={12}>
                      <InputNumber
                        className="optionsInput"
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        style={{
                          fontSize: "14px",
                          // color: "#2988ff",
                          height: "35px",
                          width: "100%",
                        }}
                        value={itemInput?.shippingFee}
                        onChange={onChangeShippingFee}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={1} />
              </Row>
            </Col>

            <br />
            <br />
            
            <Col span={3} style={{
              color: "#2988ff",
              fontSize: "12px",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 25
            }}>
              오픈마켓별 
            
              <br />
            
              수수료율 적용가
            </Col>

            <Col span={21}>
              <Row>
                <Col span={4} style={{
                  borderRight: "1px solid whitesmoke",

                  padding: "5px 10px 5px 10px"
                }}>
                  <Row>
                    <Col span={5} style={{
                      paddingTop: 2
                    }}>
                      <Tooltip title={"스마트스토어: " + userInfo?.naverFee + "%"}>
                        <img src={ICON.NAVER_ICON1.default} alt="" />
                      </Tooltip>
                    </Col>

                    <Col span={1} />

                    <Col span={18}>
                      <InputNumber
                        disabled
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        style={{
                          fontSize: "14px",
                          color: "gray",
                          height: "35px",
                          width: "100%"
                        }}
                        value={Math.round(itemInput?.price / (100 - userInfo?.naverFee)) * 100}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={4} style={{
                  borderRight: "1px solid whitesmoke",

                  padding: "5px 10px 5px 10px"
                }}>
                  <Row>
                    <Col span={5} style={{
                      paddingTop: 2
                    }}>
                      <Tooltip title={"쿠팡: " + userInfo?.coupangFee + "%"}>
                        <img src={ICON.COUPANG_ICON.default} alt="" />
                      </Tooltip>
                    </Col>

                    <Col span={1} />

                    <Col span={18}>
                      <InputNumber
                        disabled
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        style={{
                          fontSize: "14px",
                          color: "gray",
                          height: "35px",
                          width: "100%"
                        }}
                        value={Math.round(itemInput?.price / (100 - userInfo?.coupangFee)) * 100}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={4} style={{
                  borderRight: "1px solid whitesmoke",

                  padding: "5px 10px 5px 10px"
                }}>
                  <Row>
                    <Col span={5} style={{
                      paddingTop: 2
                    }}>
                      <Tooltip title={"인터파크: " + userInfo?.interparkFee + "%"}>
                        <img src={ICON.INTERPARK_ICON.default} alt="" />
                      </Tooltip>
                    </Col>

                    <Col span={1} />

                    <Col span={18}>
                      <InputNumber
                        disabled
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        style={{
                          fontSize: "14px",
                          color: "gray",
                          height: "35px",
                          width: "100%"
                        }}
                        value={Math.round(itemInput?.price / (100 - userInfo?.interparkFee)) * 100}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={4} style={{
                  borderRight: "1px solid whitesmoke",

                  padding: "5px 10px 5px 10px"
                }}>
                  <Row>
                    <Col span={5} style={{
                      paddingTop: 2
                    }}>
                      <Tooltip title={"11번가 글로벌: " + userInfo?.streetFee + "%"}>
                        <img src={ICON.STREET_ICON.default} alt="" />
                      </Tooltip>
                    </Col>

                    <Col span={1} />

                    <Col span={18}>
                      <InputNumber
                        disabled
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        style={{
                          fontSize: "14px",
                          color: "gray",
                          height: "35px",
                          width: "100%"
                        }}
                        value={Math.round(itemInput?.price / (100 - userInfo?.streetFee)) * 100}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={4} style={{
                  borderRight: "1px solid whitesmoke",

                  padding: "5px 10px 5px 10px"
                }}>
                  <Row>
                    <Col span={5} style={{
                      paddingTop: 2
                    }}>
                      <Tooltip title={"11번가 일반: " + userInfo?.streetNormalFee + "%"}>
                        <img src={ICON.STREET_NORMAL_ICON.default} alt="" />
                      </Tooltip>
                    </Col>

                    <Col span={1} />

                    <Col span={18}>
                      <InputNumber
                        disabled
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        style={{
                          fontSize: "14px",
                          color: "gray",
                          height: "35px",
                          width: "100%"
                        }}
                        value={Math.round(itemInput?.price / (100 - userInfo?.streetNormalFee)) * 100}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={4} style={{
                  borderRight: "1px solid whitesmoke",

                  padding: "5px 10px 5px 10px"
                }}>
                  <Row>
                    <Col span={5} style={{
                      paddingTop: 2
                    }}>
                      <Tooltip title={"위메프: " + userInfo?.wemakepriceFee + "%"}>
                        <img src={ICON.WEMAKEPRICE_ICON.default} alt="" />
                      </Tooltip>
                    </Col>

                    <Col span={1} />

                    <Col span={18}>
                      <InputNumber
                        disabled
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        style={{
                          fontSize: "14px",
                          color: "gray",
                          height: "35px",
                          width: "100%"
                        }}
                        value={Math.round(itemInput?.price / (100 - userInfo?.wemakepriceFee)) * 100}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={4} style={{
                  borderRight: "1px solid whitesmoke",

                  padding: "5px 10px 5px 10px"
                }}>
                  <Row>
                    <Col span={5} style={{
                      paddingTop: 2
                    }}>
                      <Tooltip title={"롯데온 글로벌: " + userInfo?.lotteonFee + "%"}>
                        <img src={ICON.LOTTEON_ICON.default} alt="" />
                      </Tooltip>
                    </Col>

                    <Col span={1} />

                    <Col span={18}>
                      <InputNumber
                        disabled
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        style={{
                          fontSize: "14px",
                          color: "gray",
                          height: "35px",
                          width: "100%"
                        }}
                        value={Math.round(itemInput?.price / (100 - userInfo?.lotteonFee)) * 100}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={4} style={{
                  borderRight: "1px solid whitesmoke",

                  padding: "5px 10px 5px 10px"
                }}>
                  <Row>
                    <Col span={5} style={{
                      paddingTop: 2
                    }}>
                      <Tooltip title={"롯데온 일반: " + userInfo?.lotteonNormalFee + "%"}>
                        <img src={ICON.LOTTEON_NORMAL_ICON.default} alt="" />
                      </Tooltip>
                    </Col>

                    <Col span={1} />

                    <Col span={18}>
                      <InputNumber
                        disabled
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        style={{
                          fontSize: "14px",
                          color: "gray",
                          height: "35px",
                          width: "100%"
                        }}
                        value={Math.round(itemInput?.price / (100 - userInfo?.lotteonNormalFee)) * 100}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={4} style={{
                  borderRight: "1px solid whitesmoke",

                  padding: "5px 10px 5px 10px"
                }}>
                  <Row>
                    <Col span={5} style={{
                      paddingTop: 2
                    }}>
                      <Tooltip title={"티몬: " + userInfo?.tmonFee + "%"}>
                        <img src={ICON.TMON_ICON.default} alt="" />
                      </Tooltip>
                    </Col>

                    <Col span={1} />

                    <Col span={18}>
                      <InputNumber
                        disabled
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        style={{
                          fontSize: "14px",
                          color: "gray",
                          height: "35px",
                          width: "100%"
                        }}
                        value={Math.round(itemInput?.price / (100 - userInfo?.tmonFee)) * 100}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={4} style={{
                  borderRight: "1px solid whitesmoke",

                  padding: "5px 10px 5px 10px"
                }}>
                  <Row>
                    <Col span={5} style={{
                      paddingTop: 2
                    }}>
                      <Tooltip title={"G마켓: " + userInfo?.gmarketFee + "%"}>
                        <img src={ICON.GMARKET_ICON.default} alt="" />
                      </Tooltip>
                    </Col>

                    <Col span={1} />

                    <Col span={18}>
                      <InputNumber
                        disabled
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        style={{
                          fontSize: "14px",
                          color: "gray",
                          height: "35px",
                          width: "100%"
                        }}
                        value={Math.round(itemInput?.price / (100 - userInfo?.gmarketFee)) * 100}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={4} style={{
                  padding: "5px 10px 5px 10px"
                }}>
                  <Row>
                    <Col span={5} style={{
                      paddingTop: 2
                    }}>
                      <Tooltip title={"옥션: " + userInfo?.auctionFee + "%"}>
                        <img src={ICON.AUCTION_ICON.default} alt="" />
                      </Tooltip>
                    </Col>

                    <Col span={1} />

                    <Col span={18}>
                      <InputNumber
                        disabled
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        style={{
                          fontSize: "14px",
                          color: "gray",
                          height: "35px",
                          width: "100%"
                        }}
                        value={Math.round(itemInput?.price / (100 - userInfo?.auctionFee)) * 100}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={1} />
              </Row>
            </Col>
          </Row>

          <Row style={{
            border: "1px solid whitesmoke",
            padding: "5px 10px 5px 10px",
            marginBottom: "5px"
          }}>
            <Col span={3} style={{
              fontWeight: "bold",
              textAlign: "center",
              paddingTop: 7
            }}>
              가격 설정
            </Col>

            <Col span={21}>
              {itemData ? JSON.parse(itemData?.taobaoProduct.originalData).shop_id === 'express' ?
                <>
                <Row>
                    <Col span={16} style={{
                      borderRight: "1px solid whitesmoke",

                      padding: "5px 10px 5px 10px"
                    }}>
                      <Row>
                        <Col span={6} style={{
                          fontSize: 14,
                          paddingTop: 5
                        }}>
                          해외배송비(￦)

                          &nbsp;

                          <Tooltip title="배대지 이용 시 발생하는 수수료입니다.">
                            <QuestionCircleTwoTone />
                          </Tooltip> 
                        </Col>

                        <Col span={18} style={{
                        }}>
                          <Select
                            value={shippingCode}
                            dropdownStyle={{ 
                              minWidth: "500px"
                            }}
                            style={{ 
                              width: "100%" 
                            }}
                            onChange={(e: number, index: any) => {
                              onChangeShippingCode(e);
                              onChangeCalculatePrice(index.data, "localShippingFee");
                            }}
                          >
                            {itemData ? JSON.parse(itemData?.taobaoProduct.originalData).props.map((v: any, i: number) => (
                              <Option data={v.value} value={i}>
                                ({v.format}) {v.name}
                              </Option>
                            )) : null}
                          </Select>
                        </Col>
                      </Row>
                    </Col>

                    <Col span={8} style={{
                      padding: "5px 10px 5px 10px"
                    }}>
                      <Row>
                        <Col span={12} style={{
                          fontSize: 14,
                          paddingTop: 5
                        }}>
                          마진율
                          
                          &nbsp;

                          <Select style={{
                            width: "50%"
                          }} size="small" value={calculatePriceData.marginUnitType ?? "PERCENT"} onChange={(e) => {
                            onChangeCalculatePrice(e, "marginUnitType");
                          }}>
                            <Option value="WON">
                              ￦
                            </Option>

                            <Option value="PERCENT">
                              %
                            </Option>
                          </Select>
                        </Col>

                        <Col span={12}>
                          <InputNumber
                            value={calculatePriceData.marginRate}
                            style={{ 
                              fontSize: "14px",
                              width: "100%",
                              height: "35px" 
                            }}
                            formatter={(value) =>
                              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                            onChange={(e) => onChangeCalculatePrice(e, "marginRate")}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={16} style={{
                      fontSize: "12px",
                      marginTop: "5px",
                      color: "red",
                    }}>
                      <div>
                        가격 설정 시 저장되지 않은 정보는 소실됩니다. (카테고리 / 태그 / 옵션명 / 옵션가격 / 상세페이지 등)
                      </div>

                      <div>
                        가격 설정 이외의 변동사항이 있는 경우 반드시 저장을 먼저 하신 뒤 가격설정을 해주시기 바랍니다.
                      </div>
                    </Col>

                    <Col span={8} style={{
                      padding: "5px 10px 5px 10px"
                    }}>
                      <Row>
                        <Col span={12} />

                        <Col span={12}>
                          <Button
                            type="primary"
                            style={{ 
                              width: "100%",
                              height: "35px"
                            }}
                            onClick={() => {
                              confirm({
                                title: '가격을 설정하시겠습니까?',
                                content: '가격설정 시 저장되지 않은 나머지 정보는 소실됩니다.',

                                onOk() {
                                  updateProductPriceByUser({
                                    variables: {
                                      productIds: [selectProductId],
                                      marginRate: calculatePriceData.marginRate,
                                      marginUnitType: calculatePriceData.marginUnitType ?? "PERCENT",
                                      shippingFee: itemInput.shippingFee,
                                      cnyRate: 1,
                                      localShippingFee: calculatePriceData.localShippingFee,
                                      localShippingCode: shippingCode
                                    },
                                  }).then(() => {
                                      message.success("판매가가 변경되었습니다.");
                                  }).catch((e: ApolloError) => {
                                    message.error(e.message);
                                  });
                                },

                                okText: "예",
                                cancelText: "아니오"
                              });
                            }}
                          >
                            가격 적용하기
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </>
              :
                <>
                  <Row>
                    <Col span={8} style={{
                      borderRight: "1px solid whitesmoke",

                      padding: "5px 10px 5px 10px"
                    }}>
                      <Row>
                        <Col span={12} style={{
                          fontSize: 14,
                          paddingTop: 5
                        }}>
                          환율(￦)
                        </Col>

                        <Col span={12}>
                          <InputNumber
                            value={calculatePriceData.cnyRate}
                            style={{ 
                              width: "100%",
                              height: "35px" 
                            }}
                            formatter={(value) =>
                              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                            onChange={(e) => onChangeCalculatePrice(e, "cnyRate")}
                          />
                        </Col>
                      </Row>
                    </Col>

                    <Col span={8} style={{
                      borderRight: "1px solid whitesmoke",

                      padding: "5px 10px 5px 10px"
                    }}>
                      <Row>
                        <Col span={12} style={{
                          fontSize: 14,
                          paddingTop: 5
                        }}>
                          해외배송비(￦)

                          &nbsp;

                          <Tooltip title="배대지 이용 시 발생하는 수수료입니다.">
                            <QuestionCircleTwoTone />
                          </Tooltip> 
                        </Col>

                        <Col span={12}>
                          <InputNumber
                            value={calculatePriceData.localShippingFee}
                            style={{ 
                              fontSize: "14px",
                              width: "100%",
                              height: "35px" 
                            }}
                            formatter={(value) =>
                              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                            onChange={(e) => onChangeCalculatePrice(e, "localShippingFee")}
                          />
                        </Col>
                      </Row>
                    </Col>

                    <Col span={8} style={{
                      padding: "5px 10px 5px 10px"
                    }}>
                      <Row>
                        <Col span={12} style={{
                          fontSize: 14,
                          paddingTop: 5
                        }}>
                          마진율
                          
                          &nbsp;

                          <Select style={{
                            width: "50%"
                          }} size="small" value={calculatePriceData.marginUnitType ?? "PERCENT"} onChange={(e) => {
                            onChangeCalculatePrice(e, "marginUnitType");
                          }}>
                            <Option value="WON">
                              ￦
                            </Option>

                            <Option value="PERCENT">
                              %
                            </Option>
                          </Select>
                        </Col>

                        <Col span={12}>
                          <InputNumber
                            value={calculatePriceData.marginRate}
                            style={{ 
                              fontSize: "14px",
                              width: "100%",
                              height: "35px" 
                            }}
                            formatter={(value) =>
                              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                            onChange={(e) => onChangeCalculatePrice(e, "marginRate")}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={16} style={{
                      fontSize: "12px",
                      marginTop: "5px",
                      color: "red",
                    }}>
                      <div>
                        가격 설정 시 저장되지 않은 정보는 소실됩니다. (카테고리 / 태그 / 옵션명 / 옵션가격 / 상세페이지 등)
                      </div>

                      <div>
                        가격 설정 이외의 변동사항이 있는 경우 반드시 저장을 먼저 하신 뒤 가격설정을 해주시기 바랍니다.
                      </div>
                    </Col>

                    <Col span={8} style={{
                      padding: "5px 10px 5px 10px"
                    }}>
                      <Row>
                        <Col span={12} />

                        <Col span={12}>
                          <Button
                            type="primary"
                            style={{ 
                              width: "100%",
                              height: "35px"
                            }}
                            onClick={() => {
                              confirm({
                                title: '가격을 설정하시겠습니까?',
                                content: '가격설정 시 저장되지 않은 나머지 정보는 소실됩니다.',

                                onOk() {
                                  updateProductPriceByUser({
                                    variables: {
                                      productIds: [selectProductId],
                                      marginRate: calculatePriceData.marginRate,
                                      marginUnitType: calculatePriceData.marginUnitType ?? "PERCENT",
                                      shippingFee: itemInput.shippingFee,
                                      cnyRate: calculatePriceData.cnyRate,
                                      localShippingFee: calculatePriceData.localShippingFee,
                                      localShippingCode: 0
                                    },
                                  })
                                  .then(() => {
                                    message.success("판매가가 변경되었습니다.");
                                  })
                                  .catch((e: ApolloError) => {
                                    message.error(e.message);
                                  });
                                },

                                okText: "예",
                                cancelText: "아니오"
                              });
                            }}
                          >
                            가격 적용하기
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </>
              :
                null
              }
            </Col>
          </Row>

          <Row style={{
            border: "1px solid whitesmoke",
            padding: "5px 10px 5px 10px",
            marginBottom: "5px"
          }}>
            <Col span={3} style={{
              fontWeight: "bold",
              textAlign: "center",
              paddingTop: 7
            }}>
              검색태그
            </Col>

            <Col span={21}>
              <Input 
                style={{ 
                  display: "inline-block", 
                  width: "100%",
                  height: "35px"
                }} 
                value={searchTags} 
                onChange={onChangeSearchTags}>
              </Input>

              <Row>
                <span
                    style={{
                      fontSize: "12px",
                      marginTop: "10px",
                      color: "red",
                    }}
                  >
                  검색태그는 쿠팡 업로드시 적용되며 여러 개 입력 시 ,(쉼표)로 구분하여 입력해주시기 바랍니다. (ex: 멋진, 아름다운)
                </span>
              </Row>
            </Col>
          </Row>

          <Row style={{
            border: "1px solid whitesmoke",
            padding: "5px 10px 5px 10px",
          }}>
            <Col span={3} style={{
              color: "green",
              fontSize: "12px",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "5px",
            }}>
              스마트스토어 기준
              
              <br />
              
              카테고리 자동설정
            </Col>

            <Col span={21} style={{
              fontSize: 14,
              paddingTop: 7
            }}>
              <Select 
                showSearch 
                value={categoryA077}
                optionFilterProp="children"
                dropdownMatchSelectWidth={false}
                placeholder="카테고리를 설정해주세요."

                style={{
                  width: "100%"
                }} 
                
                onSearch={(e) => {
                  let keyword = e.trim();

                  if (keyword.length > 0) {
                    searchCategoryInfoA077ToLazyQuery({ variables: { keyword: keyword } });
                  }
                }} 

                onChange={(e) => {
                  searchCategoryA077Data?.searchCategoryInfoA077BySomeone.map((v) => {
                    if (v.code === e) {
                      searchCategoryInfoA077ToLazyQuery({ variables: { code: v.code } });
                      searchCategoryInfoB378ToLazyQuery({ variables: { code: v.code_b378 } });
                      searchCategoryInfoA112ToLazyQuery({ variables: { code: v.code_a112 } });
                      searchCategoryInfoA027ToLazyQuery({ variables: { code: v.code_a027 } });
                      searchCategoryInfoA001ToLazyQuery({ variables: { code: v.code_a001 } });
                      searchCategoryInfoA006ToLazyQuery({ variables: { code: v.code_a006 } });
                      searchCategoryInfoB719ToLazyQuery({ variables: { code: v.code_b719 } });
                      searchCategoryInfoA113ToLazyQuery({ variables: { code: v.code_a113 } });
                      searchCategoryInfoA524ToLazyQuery({ variables: { code: v.code_a524 } });
                      searchCategoryInfoA525ToLazyQuery({ variables: { code: v.code_a525 } });
                      searchCategoryInfoB956ToLazyQuery({ variables: { code: v.code_b956 } });
                    }
                  })
                }}
                
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {searchCategoryA077Data?.searchCategoryInfoA077BySomeone.map((v) => {
                  return <Option value={v.code}>{v.name}</Option>
                })}
              </Select>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row style={{
        marginTop: 10
      }}>
        {/* <Col span={24} style={{
          border: "1px solid whitesmoke",
          padding: 5,
        }}>
          <CategoriWrapPage
            searchKeyword={searchKeyword}
            selectCategoryItem={selectCategoryItem}
            itemTotal={itemTotal}
            
            setSearchKeyword={setSearchKeyword}
            setSelectCategoryItem={setSelectCategoryItem}
            setItemTotal={setItemTotal}
          />
        </Col> */}

        <Col span={24} style={{
          fontSize: 16,
          fontWeight: "bold",
          padding: 5,
          textAlign: "left"
        }}>
          카테고리 설정 정보
        </Col>

        <Col span={8} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={2} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="스마트스토어">
                <img src={ICON.NAVER_ICON1.default} />
              </Tooltip>
            </Col>
            
            <Col span={22}>
              <Select 
                showSearch 
                value={categoryA077}
                optionFilterProp="children"
                dropdownMatchSelectWidth={false}
                placeholder="카테고리를 설정해주세요."

                style={{
                  width: "100%"
                }} 
                
                onSearch={(e) => {
                  let keyword = e.trim();

                  if (keyword.length > 0) {
                    searchCategoryInfoA077ToLazyQuery({ variables: { keyword: keyword } });
                  }
                }} 

                onChange={(e) => {
                  searchCategoryA077Data?.searchCategoryInfoA077BySomeone.map((v) => {
                    if (v.code === e) {
                      searchCategoryInfoA077ToLazyQuery({ variables: { code: v.code } });
                    }
                  });
                }}
                
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {searchCategoryA077Data?.searchCategoryInfoA077BySomeone.map((v) => {
                  return <Option value={v.code}>{v.name}</Option>
                })}
              </Select>
            </Col>
          </Row>
        </Col>

        <Col span={8} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={2} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="쿠팡">
                <img src={ICON.COUPANG_ICON.default} />
              </Tooltip>
            </Col>
            
            <Col span={22}>
              <Select 
                showSearch 
                value={categoryB378}
                optionFilterProp="children"
                dropdownMatchSelectWidth={false}
                placeholder="카테고리를 설정해주세요."

                style={{
                  width: "100%"
                }} 
                
                onSearch={(e) => {
                  let keyword = e.trim();

                  if (keyword.length > 0) {
                    searchCategoryInfoB378ToLazyQuery({ variables: { keyword: keyword } });
                  }
                }} 

                onChange={(e) => {
                  searchCategoryB378Data?.searchCategoryInfoB378BySomeone.map((v) => {
                    if (v.code === e) {
                      searchCategoryInfoB378ToLazyQuery({ variables: { code: v.code } });
                    }
                  });
                }}
                
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {searchCategoryB378Data?.searchCategoryInfoB378BySomeone.map((v) => {
                  return <Option value={v.code}>{v.name}</Option>
                })}
              </Select>
            </Col>
          </Row>
        </Col>

        <Col span={8} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={2} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="인터파크">
                <img src={ICON.INTERPARK_ICON.default} />
              </Tooltip>
            </Col>
            
            <Col span={22}>
              <Select 
                showSearch 
                value={categoryA027}
                optionFilterProp="children"
                dropdownMatchSelectWidth={false}
                placeholder="카테고리를 설정해주세요."

                style={{
                  width: "100%"
                }} 
                
                onSearch={(e) => {
                  let keyword = e.trim();

                  if (keyword.length > 0) {
                    searchCategoryInfoA027ToLazyQuery({ variables: { keyword: keyword } });
                  }
                }} 

                onChange={(e) => {
                  searchCategoryA027Data?.searchCategoryInfoA027BySomeone.map((v) => {
                    if (v.code === e) {
                      searchCategoryInfoA027ToLazyQuery({ variables: { code: v.code } });
                    }
                  });
                }}
                
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {searchCategoryA027Data?.searchCategoryInfoA027BySomeone.map((v) => {
                  return <Option value={v.code}>{v.name}</Option>
                })}
              </Select>
            </Col>
          </Row>
        </Col>

        <Col span={8} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={2} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="11번가 글로벌">
                <img src={ICON.STREET_ICON.default} />
              </Tooltip>
            </Col>
            
            <Col span={22}>
              <Select 
                showSearch 
                value={categoryA112}
                optionFilterProp="children"
                dropdownMatchSelectWidth={false}
                placeholder="카테고리를 설정해주세요."

                style={{
                  width: "100%"
                }} 
                
                onSearch={(e) => {
                  let keyword = e.trim();

                  if (keyword.length > 0) {
                    searchCategoryInfoA112ToLazyQuery({ variables: { keyword: keyword } });
                  }
                }} 

                onChange={(e) => {
                  searchCategoryA112Data?.searchCategoryInfoA112BySomeone.map((v) => {
                    if (v.code === e) {
                      searchCategoryInfoA112ToLazyQuery({ variables: { code: v.code } });
                    }
                  });
                }}
                
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {searchCategoryA112Data?.searchCategoryInfoA112BySomeone.map((v) => {
                  return <Option value={v.code}>{v.name}</Option>
                })}
              </Select>
            </Col>
          </Row>
        </Col>

        <Col span={8} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={2} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="11번가 일반">
                <img src={ICON.STREET_NORMAL_ICON.default} />
              </Tooltip>
            </Col>
            
            <Col span={22}>
              <Select 
                showSearch 
                value={categoryA113}
                optionFilterProp="children"
                dropdownMatchSelectWidth={false}
                placeholder="카테고리를 설정해주세요."

                style={{
                  width: "100%"
                }} 
                
                onSearch={(e) => {
                  let keyword = e.trim();

                  if (keyword.length > 0) {
                    searchCategoryInfoA113ToLazyQuery({ variables: { keyword: keyword } });
                  }
                }} 

                onChange={(e) => {
                  searchCategoryA113Data?.searchCategoryInfoA113BySomeone.map((v) => {
                    if (v.code === e) {
                      searchCategoryInfoA113ToLazyQuery({ variables: { code: v.code } });
                    }
                  });
                }}
                
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {searchCategoryA113Data?.searchCategoryInfoA113BySomeone.map((v) => {
                  return <Option value={v.code}>{v.name}</Option>
                })}
              </Select>
            </Col>
          </Row>
        </Col>

        
        <Col span={8} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={2} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="위메프">
                <img src={ICON.WEMAKEPRICE_ICON.default} />
              </Tooltip>
            </Col>
            
            <Col span={22}>
              <Select 
                showSearch 
                value={categoryB719}
                optionFilterProp="children"
                dropdownMatchSelectWidth={false}
                placeholder="카테고리를 설정해주세요."

                style={{
                  width: "100%"
                }} 
                
                onSearch={(e) => {
                  let keyword = e.trim();

                  if (keyword.length > 0) {
                    searchCategoryInfoB719ToLazyQuery({ variables: { keyword: keyword } });
                  }
                }} 

                onChange={(e) => {
                  searchCategoryB719Data?.searchCategoryInfoB719BySomeone.map((v) => {
                    if (v.code === e) {
                      searchCategoryInfoB719ToLazyQuery({ variables: { code: v.code } });
                    }
                  });
                }}
                
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {searchCategoryB719Data?.searchCategoryInfoB719BySomeone.map((v) => {
                  return <Option value={v.code}>{v.name}</Option>
                })}
              </Select>
            </Col>
          </Row>
        </Col>

        <Col span={8} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={2} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="롯데온 글로벌">
                <img src={ICON.LOTTEON_ICON.default} />
              </Tooltip>
            </Col>
            
            <Col span={22}>
              <Select 
                showSearch 
                value={categoryA524}
                optionFilterProp="children"
                dropdownMatchSelectWidth={false}
                placeholder="카테고리를 설정해주세요."

                style={{
                  width: "100%"
                }} 
                
                onSearch={(e) => {
                  let keyword = e.trim();

                  if (keyword.length > 0) {
                    searchCategoryInfoA524ToLazyQuery({ variables: { keyword: keyword } });
                  }
                }} 

                onChange={(e) => {
                  searchCategoryA524Data?.searchCategoryInfoA524BySomeone.map((v) => {
                    if (v.code === e) {
                      searchCategoryInfoA524ToLazyQuery({ variables: { code: v.code } });
                    }
                  });
                }}
                
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {searchCategoryA524Data?.searchCategoryInfoA524BySomeone.map((v) => {
                  return <Option value={v.code}>{v.name}</Option>
                })}
              </Select>
            </Col>
          </Row>
        </Col>

        <Col span={8} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={2} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="롯데온 일반">
                <img src={ICON.LOTTEON_NORMAL_ICON.default} />
              </Tooltip>
            </Col>
            
            <Col span={22}>
              <Select 
                showSearch 
                value={categoryA525}
                optionFilterProp="children"
                dropdownMatchSelectWidth={false}
                placeholder="카테고리를 설정해주세요."

                style={{
                  width: "100%"
                }} 
                
                onSearch={(e) => {
                  let keyword = e.trim();

                  if (keyword.length > 0) {
                    searchCategoryInfoA525ToLazyQuery({ variables: { keyword: keyword } });
                  }
                }} 

                onChange={(e) => {
                  searchCategoryA525Data?.searchCategoryInfoA525BySomeone.map((v) => {
                    if (v.code === e) {
                      searchCategoryInfoA525ToLazyQuery({ variables: { code: v.code } });
                    }
                  });
                }}
                
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {searchCategoryA525Data?.searchCategoryInfoA525BySomeone.map((v) => {
                  return <Option value={v.code}>{v.name}</Option>
                })}
              </Select>
            </Col>
          </Row>
        </Col>

        <Col span={8} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={2} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="티몬">
                <img src={ICON.TMON_ICON.default} />
              </Tooltip>
            </Col>
            
            <Col span={22}>
              <Select 
                showSearch 
                value={categoryB956}
                optionFilterProp="children"
                dropdownMatchSelectWidth={false}
                placeholder="카테고리를 설정해주세요."

                style={{
                  width: "100%"
                }} 
                
                onSearch={(e) => {
                  let keyword = e.trim();

                  if (keyword.length > 0) {
                    searchCategoryInfoB956ToLazyQuery({ variables: { keyword: keyword } });
                  }
                }} 

                onChange={(e) => {
                  searchCategoryB956Data?.searchCategoryInfoB956BySomeone.map((v) => {
                    if (v.code === e) {
                      searchCategoryInfoB956ToLazyQuery({ variables: { code: v.code } });
                    }
                  });
                }}
                
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {searchCategoryB956Data?.searchCategoryInfoB956BySomeone.map((v) => {
                  return <Option value={v.code}>{v.name}</Option>
                })}
              </Select>
            </Col>
          </Row>
        </Col>

        <Col span={8} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={2} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="G마켓">
                <img src={ICON.GMARKET_ICON.default} />
              </Tooltip>
            </Col>
            
            <Col span={22}>
              <Select 
                showSearch 
                value={categoryA006}
                optionFilterProp="children"
                dropdownMatchSelectWidth={false}
                placeholder="카테고리를 설정해주세요."

                style={{
                  width: "100%"
                }} 
                
                onSearch={(e) => {
                  let keyword = e.trim();

                  if (keyword.length > 0) {
                    searchCategoryInfoA006ToLazyQuery({ variables: { keyword: keyword } });
                  }
                }} 

                onChange={(e) => {
                  searchCategoryA006Data?.searchCategoryInfoA006BySomeone.map((v) => {
                    if (v.code === e) {
                      searchCategoryInfoA006ToLazyQuery({ variables: { code: v.code } });
                    }
                  });
                }}
                
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {searchCategoryA006Data?.searchCategoryInfoA006BySomeone.map((v) => {
                  return <Option value={v.code}>{v.name}</Option>
                })}
              </Select>
            </Col>
          </Row>
        </Col>
        
        <Col span={8} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={2} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="옥션">
                <img src={ICON.AUCTION_ICON.default} />
              </Tooltip>
            </Col>
            
            <Col span={22}>
              <Select 
                showSearch 
                value={categoryA001}
                optionFilterProp="children"
                dropdownMatchSelectWidth={false}
                placeholder="카테고리를 설정해주세요."

                style={{
                  width: "100%"
                }} 
                
                onSearch={(e) => {
                  let keyword = e.trim();

                  if (keyword.length > 0) {
                    searchCategoryInfoA001ToLazyQuery({ variables: { keyword: keyword } });
                  }
                }} 

                onChange={(e) => {
                  searchCategoryA001Data?.searchCategoryInfoA001BySomeone.map((v) => {
                    if (v.code === e) {
                      searchCategoryInfoA001ToLazyQuery({ variables: { code: v.code } });
                    }
                  });
                }}
                
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {searchCategoryA001Data?.searchCategoryInfoA001BySomeone.map((v) => {
                  return <Option value={v.code}>{v.name}</Option>
                })}
              </Select>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );

  // return (
  //   <>
  //     {/* 상단 */}
  //     <div className="mb-4 flex justify-between gap-2">
  //       <div style={{border: "1px solid #d9d9d9"}}>
  //         <img
  //           src={chkImage ?? itemData?.taobaoProduct.imageThumbnail}
  //           style={{ width: "500px", aspectRatio: "1/1" }}
  //           alt=""
  //         />
  //       </div>
  //       <div
  //         style={{
  //           border: "1px solid #d9d9d9",
  //           padding: "5px 35px 5px 35px",
  //         }}
  //       >
  //         <div className="product-detail-container">
  //           <Row>
  //             <Col span={4}>
  //               <span 
  //               className="product-detail-title"
  //               style={{
  //                 paddingTop: 5,
  //                 height: 40
  //               }}>
  //                 상품명
  //               </span>
  //             </Col>

  //             <Col span={20} style={{position: "relative"}}>
  //               <Input
  //                 disabled
  //                 style={{
  //                   position: "absolute",
  //                   cursor: "text",
  //                   color: "gray",
  //                   fontSize: "16px",
  //                 }}
  //                 value={itemData?.taobaoProduct.name}
  //               />

  //               <Input 
  //                 disabled
  //                 style={{
  //                   position: "absolute",
  //                   cursor: "text",
  //                   color: "gray",
  //                   fontSize: "16px",
  //                   right: "0",
  //                   textAlign: "center",
  //                   width: "75px"
  //                 }}
  //                 value={itemData?.taobaoProduct.name.length.toString() + "/50"}
  //               />
  //             </Col>
  //           </Row>

  //           <Row style={{marginBottom: 5}}>
  //             <Col span={4}>
  //               <Button
  //                 type="primary"
  //                 onClick={() => {
  //                   var shopId = JSON.parse(itemData?.taobaoProduct.originalData).shop_id;

  //                   var taobaoUrl = null;

  //                   switch (shopId) {
  //                     case "express": {
  //                       taobaoUrl = `https://ko.aliexpress.com/item/${itemData?.taobaoProduct.taobaoNumIid}.html`;
                        
  //                       break;
  //                     }

  //                     case "1688": {
  //                       taobaoUrl = `https://detail.1688.com/offer/${itemData?.taobaoProduct.taobaoNumIid}.html`;

  //                       break;
  //                     }

  //                     case "vvic": {
  //                       taobaoUrl = `https://www.vvic.com/item/${itemData?.taobaoProduct.taobaoNumIid}`;

  //                       break;
  //                     }

  //                     default: {
  //                       taobaoUrl = `https://item.taobao.com/item.htm?id=${itemData?.taobaoProduct.taobaoNumIid}`;

  //                       break;
  //                     }
  //                   }

  //                   window.open(taobaoUrl, "_blank");
  //                 }}
  //               >
  //                 구매처 바로가기
  //               </Button>
  //             </Col>

  //             <Col span={20} style={{position: "relative"}}>
  //               <Input
  //                 style={{
  //                   position: "absolute",
  //                   fontSize: "16px",
  //                 }}
  //                 value={itemInput.name}
  //                 onChange={onChangeName}
  //               />

  //               <Input 
  //                 disabled
  //                 style={{
  //                   position: "absolute",
  //                   cursor: "text",
  //                   color: "gray",
  //                   fontSize: "16px",
  //                   width: "75px",
  //                   textAlign: "center",
  //                   right: "0"
  //                 }}
  //                 value={itemInput.name.length.toString() + "/50"}
  //               />
  //             </Col>
  //           </Row>
  //         </div>

  //         <div className="product-detail-container">
  //           <span className="product-detail-title">
  //             가격 정보
  //           </span>

  //           <span style={{
  //             marginRight: 60
  //           }}>
  //             <span>
  //               도매가
  //             </span>

  //             &nbsp;

  //             <span
  //               style={{
  //                 background: "whitesmoke",
  //                 border: "1px solid lightgray",
  //                 borderRadius: "2px",
  //                 color: "gray",
  //                 height: "35px",
  //                 display: "inline-block",
  //                 padding: "2px 5px",
  //               }}
  //             >
  //               {itemData ? JSON.parse(itemData?.taobaoProduct.originalData).shop_id === 'express' ? "￦" : "¥" : null}

  //               &nbsp;

  //               <InputNumber
  //                 disabled
  //                 className="optionsInput"
  //                 formatter={(value) =>
  //                   `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  //                 }
  //                 parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
  //                 style={{
  //                   display: "inline-block",
  //                   width: "120px",
  //                   border: "none",
  //                   fontSize: "14px",
  //                   color: "gray",
  //                   height: "28px",
  //                 }}
  //                 value={itemData?.taobaoProduct.price}
  //               />
  //             </span>
  //           </span>

  //           |

  //           <span style={{
  //             marginRight: 55
  //           }}>
  //             <span>
  //               판매가
  //             </span>

  //             &nbsp;

  //             <span
  //               style={{
  //                 border: "1px solid #2988ff",
  //                 borderRadius: "2px",
  //                 height: "35px",
  //                 display: "inline-block",
  //                 color: "#2988ff",
  //                 padding: "2px 5px",
  //               }}
  //             >
  //               ￦
  //               <InputNumber
  //                 className="optionsInput"
  //                 formatter={(value) =>
  //                   `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  //                 }
  //                 parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
  //                 style={{
  //                   display: "inline-block",
  //                   width: "120px",
  //                   border: "none",
  //                   fontSize: "14px",
  //                   color: "#2988ff",
  //                   height: "28px",
  //                 }}
  //                 value={itemInput?.price}
  //                 onChange={onChangePrice}
  //               />
  //             </span>
  //           </span>

  //           <span>
  //             <span
  //               style={{
  //                 width: 100
  //               }}
  //             >
  //               배송비
  //             </span>

  //             &nbsp;

  //             <span
  //               style={{
  //                 border: "1px solid #d9d9d9",
  //                 borderRadius: "2px",
  //                 height: "35px",
  //                 display: "inline-block",
  //                 padding: "2px 5px",
  //                 width: 150
  //               }}
  //             >
  //               ￦
  //               <InputNumber
  //                 className="optionsInput"
  //                 formatter={(value) =>
  //                   `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  //                 }
  //                 parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
  //                 style={{
  //                   display: "inline-block",
  //                   width: "120px",
  //                   border: "none",
  //                   fontSize: "14px",
  //                   height: "28px",
  //                 }}
  //                 value={itemInput?.shippingFee}
  //                 onChange={onChangeShippingFee}
  //               />
  //             </span>
  //           </span>

  //           <br />

  //           <span
  //             style={{
  //               fontSize: "13px",
  //               marginTop: "5px",
  //               color: "red",
  //               display: "inline-block",
  //               fontWeight: "normal"
  //             }}
  //           >
  //             ＊ 0원 이상 설정 시 스토어 내 배송비가 유료로 설정됩니다.
  //           </span>
  //         </div>

  //         <div className="product-detail-container">
  //           <div style={{
  //             marginBottom: 5
  //           }}>
  //             <span className="product-detail-title">
  //               수수료 적용 판매가
  //             </span>

  //             <span style={{
  //               color: "gray",
  //               marginRight: 30
  //             }}>
  //               <span style={{
  //                 textAlign: "center",
  //                 marginRight: 30
  //               }}>
  //                 <img src={ICON.NAVER_ICON1.default} alt="" />
  //               </span>

  //               <span style={{
  //                 background: "whitesmoke",
  //                 border: "1px solid lightgray",
  //                 borderRadius: "2px",
  //                 color: "gray",
  //                 height: "35px",
  //                 display: "inline-block",
  //                 padding: "2px 5px",
  //               }}>
  //                 ￦
  //                 <InputNumber
  //                   disabled
  //                   className="optionsInput"
  //                   formatter={(value) =>
  //                     `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  //                   }
  //                   parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
  //                   style={{
  //                     display: "inline-block",
  //                     width: "120px",
  //                     border: "none",
  //                     fontSize: "14px",
  //                     color: "gray",
  //                     height: "28px",
  //                   }}
  //                   value={Math.round(itemInput?.price / (100 - userInfo?.naverFee)) * 100}
  //                 />
  //               </span>
  //             </span>

  //             <span style={{
  //               color: "gray",
  //               marginRight: 30
  //             }}>
  //               <span style={{
  //                 textAlign: "center",
  //                 marginRight: 30
  //               }}>
  //                 <img src={ICON.COUPANG_ICON.default} alt="" />
  //               </span>

  //               <span style={{
  //                 background: "whitesmoke",
  //                 border: "1px solid lightgray",
  //                 borderRadius: "2px",
  //                 color: "gray",
  //                 height: "35px",
  //                 display: "inline-block",
  //                 padding: "2px 5px",
  //               }}>
  //                 ￦
  //                 <InputNumber
  //                   disabled
  //                   className="optionsInput"
  //                   formatter={(value) =>
  //                     `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  //                   }
  //                   parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
  //                   style={{
  //                     display: "inline-block",
  //                     width: "120px",
  //                     border: "none",
  //                     fontSize: "14px",
  //                     color: "gray",
  //                     height: "28px",
  //                   }}
  //                   value={Math.round(itemInput?.price / (100 - userInfo?.coupangFee)) * 100}
  //                 />
  //               </span>
  //             </span>

  //             <span style={{
  //               color: "gray",
  //             }}>
  //               <span style={{
  //                 textAlign: "center",
  //                 marginRight: 30
  //               }}>
  //                 <img src={ICON.STREET_ICON.default} alt="" />
  //               </span>

  //               <span style={{
  //                 background: "whitesmoke",
  //                 border: "1px solid lightgray",
  //                 borderRadius: "2px",
  //                 color: "gray",
  //                 height: "35px",
  //                 display: "inline-block",
  //                 padding: "2px 5px",
  //               }}>
  //                 ￦
  //                 <InputNumber
  //                   disabled
  //                   className="optionsInput"
  //                   formatter={(value) =>
  //                     `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  //                   }
  //                   parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
  //                   style={{
  //                     display: "inline-block",
  //                     width: "120px",
  //                     border: "none",
  //                     fontSize: "14px",
  //                     color: "gray",
  //                     height: "28px",
  //                   }}
  //                   value={Math.round(itemInput?.price / (100 - userInfo?.streetFee)) * 100}
  //                 />
  //               </span>
  //             </span>
  //           </div>

  //           <div>
  //             <span className="product-detail-title"></span>

  //             <span style={{
  //               color: "gray",
  //               marginRight: 30
  //             }}>
  //               <span style={{
  //                 textAlign: "center",
  //                 marginRight: 30
  //               }}>
  //                 <img src={ICON.INTERPARK_ICON.default} alt="" />
  //               </span>

  //               <span style={{
  //                 background: "whitesmoke",
  //                 border: "1px solid lightgray",
  //                 borderRadius: "2px",
  //                 color: "gray",
  //                 height: "35px",
  //                 display: "inline-block",
  //                 padding: "2px 5px",
  //               }}>
  //                 ￦
  //                 <InputNumber
  //                   disabled
  //                   className="optionsInput"
  //                   formatter={(value) =>
  //                     `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  //                   }
  //                   parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
  //                   style={{
  //                     display: "inline-block",
  //                     width: "120px",
  //                     border: "none",
  //                     fontSize: "14px",
  //                     color: "gray",
  //                     height: "28px",
  //                   }}
  //                   value={Math.round(itemInput?.price / (100 - userInfo?.interparkFee)) * 100}
  //                 />
  //               </span>
  //             </span>

  //             <span style={{
  //               color: "gray",
  //               marginRight: 30
  //             }}>
  //               <span style={{
  //                 textAlign: "center",
  //                 marginRight: 30
  //               }}>
  //                 <img src={ICON.GMARKET_ICON.default} alt="" />
  //               </span>

  //               <span style={{
  //                 background: "whitesmoke",
  //                 border: "1px solid lightgray",
  //                 borderRadius: "2px",
  //                 color: "gray",
  //                 height: "35px",
  //                 display: "inline-block",
  //                 padding: "2px 5px",
  //               }}>
  //                 ￦
  //                 <InputNumber
  //                   disabled
  //                   className="optionsInput"
  //                   formatter={(value) =>
  //                     `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  //                   }
  //                   parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
  //                   style={{
  //                     display: "inline-block",
  //                     width: "120px",
  //                     border: "none",
  //                     fontSize: "14px",
  //                     color: "gray",
  //                     height: "28px",
  //                   }}
  //                   value={Math.round(itemInput?.price / (100 - userInfo?.gmarketFee)) * 100}
  //                 />
  //               </span>
  //             </span>

  //             <span style={{
  //               color: "gray",
  //             }}>
  //               <span style={{
  //                 textAlign: "center",
  //                 marginRight: 30
  //               }}>
  //                 <img src={ICON.AUCTION_ICON.default} alt="" />
  //               </span>

  //               <span style={{
  //                 background: "whitesmoke",
  //                 border: "1px solid lightgray",
  //                 borderRadius: "2px",
  //                 color: "gray",
  //                 height: "35px",
  //                 display: "inline-block",
  //                 padding: "2px 5px",
  //               }}>
  //                 ￦
  //                 <InputNumber
  //                   disabled
  //                   className="optionsInput"
  //                   formatter={(value) =>
  //                     `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  //                   }
  //                   parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
  //                   style={{
  //                     display: "inline-block",
  //                     width: "120px",
  //                     border: "none",
  //                     fontSize: "14px",
  //                     color: "gray",
  //                     height: "28px",
  //                   }}
  //                   value={Math.round(itemInput?.price / (100 - userInfo?.auctionFee)) * 100}
  //                 />
  //               </span>
  //             </span>
  //           </div>
  //         </div>

  //         <div className="product-detail-container">
  //           <span className="product-detail-title">설정 카테고리</span>
  //           {itemData?.category ? (
  //             <>
  //               {itemData?.category?.c1Name}
  //               {itemData?.category?.c2Name !== "" && " > "}
  //               {itemData?.category?.c2Name}
  //               {itemData?.category?.c3Name !== "" && " > "}
  //               {itemData?.category?.c3Name}
  //               {itemData?.category?.c4Name !== "" && " > "}
  //               {itemData?.category?.c4Name}
  //             </>
  //           ) : (
  //             <span style={{ color: "gray" }}>
  //               카테고리를 설정해주세요.
  //             </span>
  //           )}
  //         </div>

  //         {/* <div className="product-detail-container">
  //           <span className="product-detail-title">고시 정보</span>
  //           {itemData?.siilCode ? (
  //             sillList.map((v) => v.code === itemData?.siilCode && v.name)
  //           ) : (
  //             <span style={{ fontSize: "14px", color: "red" }}>
  //               고시정보가 없습니다
  //             </span>
  //           )}
  //         </div> */}

  //         <div className="product-detail-container items-center">
  //           {itemData ? JSON.parse(itemData?.taobaoProduct.originalData).shop_id === 'express' ?
  //             <Row>
  //               <span className="product-detail-title">
  //                 가격설정
  //               </span>

  //               <span className="flex items-center mr-4">
  //                 <span className="whitespace-pre text-center">
  //                   해외배송비(배대지)
  //                 </span>

  //                 <Select
  //                   value={shippingCode}
  //                   dropdownStyle={{ minWidth: "500px" }}
  //                   style={{ display: "inline-block", width: "250px" }}
  //                   className="ml-4 mr-1"
  //                   onChange={(e: number, index: any) => {
  //                     onChangeShippingCode(e);
  //                     onChangeCalculatePrice(index.data, "localShippingFee");
  //                   }}
  //                 >
  //                   {itemData ? JSON.parse(itemData?.taobaoProduct.originalData).props.map((v: any, i: number) => (
  //                     <Option data={v.value} value={i}>
  //                       ({v.format}) {v.name}
  //                     </Option>
  //                   )) : null}
  //                 </Select>
  //                 원
  //               </span>

  //               <span className="flex items-center ml-4 mr-4">
  //                   마진율(%)
  //                   <InputNumber
  //                     value={calculatePriceData.marginRate}
  //                     style={{ display: "inline-block", width: "75px" }}
  //                     className="ml-4 mr-1"
  //                     formatter={(value) =>
  //                       `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  //                     }
  //                     parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
  //                     onChange={(e) => onChangeCalculatePrice(e, "marginRate")}
  //                   />
  //                   %
  //               </span>

  //               <Button
  //                 type="primary"
  //                 style={{ marginLeft: "4px" }}
  //                 onClick={() => {
  //                   confirm({
  //                     title: '가격을 설정하시겠습니까?',
  //                     content: '가격설정 시 저장되지 않은 나머지 정보는 소실됩니다.',

  //                     onOk() {
  //                       updateProductPriceByUser({
  //                         variables: {
  //                           productIds: [selectProductId],
  //                           marginRate: calculatePriceData.marginRate,
  //                           shippingFee: itemInput.shippingFee,
  //                           cnyRate: 1,
  //                           localShippingFee: calculatePriceData.localShippingFee,
  //                           localShippingCode: shippingCode
  //                         },
  //                       }).then(() => {
  //                           message.success("판매가가 변경되었습니다.");
  //                       }).catch((e: ApolloError) => {
  //                         message.error(e.message);
  //                       });
  //                     },

  //                     okText: "예",
  //                     cancelText: "아니오"
  //                   });
  //                 }}
  //               >
  //                 적용
  //               </Button>
  //             </Row>
  //           :
  //             <Row>
  //               <span className="product-detail-title">
  //                 가격설정
  //               </span>

  //               <span className="flex items-center mr-4">
  //                 환율
  //                 <InputNumber
  //                   value={calculatePriceData.cnyRate}
  //                   style={{ display: "inline-block", width: "75px" }}
  //                   className="ml-4 mr-1"
  //                   formatter={(value) =>
  //                     `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  //                   }
  //                   parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
  //                   onChange={(e) => onChangeCalculatePrice(e, "cnyRate")}
  //                 />
  //                 원
  //               </span>

  //               <span className="flex items-center ml-4 mr-4">
  //                 <span className="whitespace-pre text-center">
  //                   {"해외배송비(배대지)"}
  //                 </span>

  //                 <InputNumber
  //                   value={calculatePriceData.localShippingFee}
  //                   style={{ display: "inline-block", width: "75px" }}
  //                   className="ml-4 mr-1"
  //                   formatter={(value) =>
  //                     `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  //                   }
  //                   parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
  //                   onChange={(e) => onChangeCalculatePrice(e, "localShippingFee")}
  //                 />
  //                 원
  //               </span>

  //               <span className="flex items-center ml-4 mr-4">
  //                 마진율(%)
  //                 <InputNumber
  //                   value={calculatePriceData.marginRate}
  //                   style={{ display: "inline-block", width: "75px" }}
  //                   className="ml-4 mr-1"
  //                   formatter={(value) =>
  //                     `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  //                   }
  //                   parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
  //                   onChange={(e) => onChangeCalculatePrice(e, "marginRate")}
  //                 />
  //                 %
  //               </span>

  //               <Button
  //                 type="primary"
  //                 style={{ marginLeft: "4px" }}
  //                 onClick={() => {
  //                   confirm({
  //                     title: '가격을 설정하시겠습니까?',
  //                     content: '가격설정 시 저장되지 않은 나머지 정보는 소실됩니다.',

  //                     onOk() {
  //                       updateProductPriceByUser({
  //                         variables: {
  //                           productIds: [selectProductId],
  //                           marginRate: calculatePriceData.marginRate,
  //                           shippingFee: itemInput.shippingFee,
  //                           cnyRate: calculatePriceData.cnyRate,
  //                           localShippingFee: calculatePriceData.localShippingFee,
  //                           localShippingCode: 0
  //                         },
  //                       })
  //                       .then(() => {
  //                         message.success("판매가가 변경되었습니다.");
  //                       })
  //                       .catch((e: ApolloError) => {
  //                         message.error(e.message);
  //                       });
  //                     },

  //                     okText: "예",
  //                     cancelText: "아니오"
  //                   });
  //                 }}
  //               >
  //                 적용
  //               </Button>
  //             </Row>
  //           :
  //             null
  //           }

  //           <Row>
  //             <span
  //               style={{
  //                 fontSize: "13px",
  //                 marginTop: "5px",
  //                 color: "red",
  //                 display: "inline-block",
  //                 fontWeight: "normal"
  //               }}
  //             >
  //                 ＊ 가격 설정 시 저장되지 않은 정보는 소실됩니다. (카테고리/태그/옵션명/옵션가격/상세페이지 등)

  //                 <br />

  //                 ＊ 가격 설정 이외의 변동사항이 있는 경우 반드시 저장을 먼저 하신 뒤 가격설정을 해주시기 바랍니다.
  //             </span>
  //           </Row>
  //         </div>

  //         <div className="product-detail-container items-center">
  //           <Row>
  //             <span className="product-detail-title">
  //               검색어 태그
  //             </span>

  //             <Input 
  //               style={{ 
  //                 display: "inline-block", 
  //                 width: "600px" 
  //               }} 
  //               value={searchTags} 
  //               onChange={onChangeSearchTags}>
  //             </Input>
  //           </Row>

  //           <Row>
  //             <span
  //               style={{
  //                 fontSize: "13px",
  //                 marginTop: "5px",
  //                 color: "red",
  //                 display: "inline-block",
  //                 fontWeight: "normal"
  //               }}
  //             >
  //                 ＊ 검색어 태그는 쿠팡 업로드에만 적용됩니다.

  //                 <br />

  //                 ＊ 여러 개 입력 시  ,(쉼표)로 구분하여 입력해주시기 바랍니다. (ex: 멋진, 아름다운)
  //             </span>
  //           </Row>
  //         </div>

  //         <div style={{ float: "right" }}>
            
  //         </div>
  //       </div>
  //     </div>
  //     {/* 하단(카테고리) */}
  //     <article style={{border: "1px solid #d9d9d9"}}>
  //       {/* <h2 className="text-center text-2xl font-bold mb-4 ">카테고리 변경</h2> */}
  //       <CategoriWrapPage
  //         setSelectCategoryItem={setSelectCategoryItem}
  //         selectCategoryItem={selectCategoryItem}
  //       />
  //     </article>
  //   </>
  // );
};

export default ProductDetailModalInfo;
