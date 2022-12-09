import { useMutation, useLazyQuery } from "@apollo/client";
import { Col, Modal, Row, Button, Select, message, Card, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import QUERIES from "src/apis/queries";
import MUTATIONS from "src/apis/mutations";
import { onApolloError } from "src/common/functions";
import CategoriWrapPage from "src/pages/user/product/detail/categori-wrap-page";
import { MutationUpdateManyProductCategoryByUserArgs } from "src/types";
import ICON from "src/assets/icon";

import {
  CategoryInformationType,
  QuerySearchCategoriesBySomeoneArgs,
} from "src/types";

const { Option } = Select;

interface Props {
  visible: boolean;
  closeMarketCategoryControlModal: () => void;
  selectedItemIds?: number[];
}

const SelectMarketCategoryControlModal = ({
  visible,
  closeMarketCategoryControlModal,
  selectedItemIds,
}: Props) => {
  const [selectCategoryItem, setSelectCategoryItem] = useState<string>();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [itemTotal, setItemTotal] = useState<{
    item1: string | undefined;
    item2: string | undefined;
    item3: string | undefined;
    item4: string | undefined;
  }>({
    item1: undefined,
    item2: undefined,
    item3: undefined,
    item4: undefined,
  });

  const [categoryA077, setCategoryA077] = useState("");
  const [categoryB378, setCategoryB378] = useState("");
  const [categoryA112, setCategoryA112] = useState("");
  const [categoryA027, setCategoryA027] = useState("");
  const [categoryA001, setCategoryA001] = useState("");
  const [categoryA006, setCategoryA006] = useState("");
  const [categoryB719, setCategoryB719] = useState("");
  const [categoryA113, setCategoryA113] = useState("");
  const [categoryA524, setCategoryA524] = useState("");
  const [categoryA525, setCategoryA525] = useState("");
  const [categoryB956, setCategoryB956] = useState("");

  const [categoryA077Name, setCategoryA077Name] = useState("");
  const [categoryB378Name, setCategoryB378Name] = useState("");
  const [categoryA112Name, setCategoryA112Name] = useState("");
  const [categoryA027Name, setCategoryA027Name] = useState("");
  const [categoryA001Name, setCategoryA001Name] = useState("");
  const [categoryA006Name, setCategoryA006Name] = useState("");
  const [categoryB719Name, setCategoryB719Name] = useState("");
  const [categoryA113Name, setCategoryA113Name] = useState("");
  const [categoryA524Name, setCategoryA524Name] = useState("");
  const [categoryA525Name, setCategoryA525Name] = useState("");
  const [categoryB956Name, setCategoryB956Name] = useState("");

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

  const [updateManyProductCategory] = useMutation<
    { updateManyProductCategory: number },
    MutationUpdateManyProductCategoryByUserArgs
  >(MUTATIONS.UPDATE_MANY_PRODUCT_CATEGORY);

  const onUpdateManyProductCategory = async () => {
    await updateManyProductCategory({
      variables: {
        productIds: selectedItemIds,
        categoryA077,
        categoryA077Name,
        categoryB378,
        categoryB378Name,
        categoryA112,
        categoryA112Name,
        categoryA027,
        categoryA027Name,
        categoryA001,
        categoryA001Name,
        categoryA006,
        categoryA006Name,
        categoryB719,
        categoryB719Name,
        categoryA113,
        categoryA113Name,
        categoryA524,
        categoryA524Name,
        categoryA525,
        categoryA525Name,
        categoryB956,
        categoryB956Name
      },
      refetchQueries: ["SELECT_MY_PRODUCT_LIST"],
    }).then(() => {
      message.success("카테고리가 변경되었습니다.");

      setCategoryA077("");
      setCategoryB378("");
      setCategoryA112("");
      setCategoryA027("");
      setCategoryA001("");
      setCategoryA006("");
      setCategoryB719("");
      setCategoryA113("");
      setCategoryA524("");
      setCategoryA525("");
      setCategoryB956("");

      setCategoryA077Name("");
      setCategoryB378Name("");
      setCategoryA112Name("");
      setCategoryA027Name("");
      setCategoryA001Name("");
      setCategoryA006Name("");
      setCategoryB719Name("");
      setCategoryA113Name("");
      setCategoryA524Name("");
      setCategoryA525Name("");
      setCategoryB956Name("");
      
      closeMarketCategoryControlModal();
    }).catch(onApolloError);
  };

  useEffect(() => {
    setSelectCategoryItem("");
  }, [visible]);

  return (
    <Modal
      width="700px"
      visible={visible}
      onCancel={() => {
        closeMarketCategoryControlModal();
      }}
      footer={false}
      mask={true}
      transitionName="fade"
      centered
      closable={false}
    >
      <Row style={{ marginBottom: "30px" }}>
        <Col style={{ 
          margin: "0 auto", 
          fontSize: "18px", 
          fontWeight: "bold" 
        }}>
          카테고리 일괄설정

          &nbsp;
          
          {selectedItemIds?.length !== 0 && `(${selectedItemIds?.length}건)`}
        </Col>
      </Row>

      <Row style={{
        border: "1px solid whitesmoke",
        // padding: "5px 10px 5px 10px",
      }}>
        <Col span={6} style={{
          fontSize: "12px",
          marginTop: "5px",
          color: "green",
          textAlign: "center"
        }}>
          스마트스토어 기준
          
          <br />
          
          카테고리 자동설정
        </Col>

        <Col span={18} style={{
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
              console.log("ONSEARCH EVENT");

              let keyword = e.trim();

              if (keyword.length > 0) {
                searchCategoryInfoA077ToLazyQuery({ variables: { keyword: keyword } });
              }
            }} 

            onChange={(e) => {
              console.log("ONCHANGE EVENT");

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

      <Row style={{
        marginTop: 30
      }}>
        <Col span={24} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={6} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="스마트스토어">
                <img src={ICON.NAVER_ICON1.default} />
              </Tooltip>
            </Col>
            
            <Col span={18}>
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

        <Col span={24} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={6} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="쿠팡">
                <img src={ICON.COUPANG_ICON.default} />
              </Tooltip>
            </Col>
            
            <Col span={18}>
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

        <Col span={24} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={6} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="인터파크">
                <img src={ICON.INTERPARK_ICON.default} />
              </Tooltip>
            </Col>
            
            <Col span={18}>
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

        <Col span={24} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={6} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="11번가 글로벌">
                <img src={ICON.STREET_ICON.default} />
              </Tooltip>
            </Col>
            
            <Col span={18}>
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

        <Col span={24} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={6} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="11번가 일반">
                <img src={ICON.STREET_NORMAL_ICON.default} />
              </Tooltip>
            </Col>
            
            <Col span={18}>
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

        <Col span={24} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={6} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="위메프">
                <img src={ICON.WEMAKEPRICE_ICON.default} />
              </Tooltip>
            </Col>
            
            <Col span={18}>
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

        <Col span={24} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={6} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="롯데온 글로벌">
                <img src={ICON.LOTTEON_ICON.default} />
              </Tooltip>
            </Col>
            
            <Col span={18}>
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

        <Col span={24} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={6} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="롯데온 일반">
                <img src={ICON.LOTTEON_NORMAL_ICON.default} />
              </Tooltip>
            </Col>
            
            <Col span={18}>
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

        <Col span={24} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={6} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="티몬">
                <img src={ICON.TMON_ICON.default} />
              </Tooltip>
            </Col>
            
            <Col span={18}>
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
                      searchCategoryInfoA001ToLazyQuery({ variables: { code: v.code } });
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

        <Col span={24} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={6} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="G마켓">
                <img src={ICON.GMARKET_ICON.default} />
              </Tooltip>
            </Col>
            
            <Col span={18}>
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

        <Col span={24} style={{
          border: "1px solid whitesmoke",
        }}>
          <Row>
            <Col span={6} style={{
              textAlign: "center",
              paddingTop: 5
            }}>
              <Tooltip title="옥션">
                <img src={ICON.AUCTION_ICON.default} />
              </Tooltip>
            </Col>
            
            <Col span={18}>
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

      <br />

      <div style={{textAlign: "center"}}>
        <Button
          type="primary"
          onClick={onUpdateManyProductCategory}
        >
          변경
        </Button>

        &nbsp;

        <Button 
          onClick={closeMarketCategoryControlModal}
        >
          취소
        </Button>
      </div>
    </Modal>
  );
};

export default SelectMarketCategoryControlModal;
