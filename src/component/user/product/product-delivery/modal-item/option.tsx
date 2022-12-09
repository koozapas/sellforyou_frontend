import { ApolloError, useMutation } from "@apollo/client";
import React, { useEffect, useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { Button, Checkbox, Col, Collapse, Divider, Input, InputNumber, Modal, message, Row } from "antd";
import { transMoneyFormat } from "src/common/transform";
import { Product, ProductOption, ProductOptionName, MutationDisableUserOptionArgs } from "src/types";
import { OptionCollapseItem } from ".";
import { CalculatePriceType, ItemInputType, OptionValueType } from "../detail-modal";
import { CloseOutlined, EditOutlined, PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import MUTATIONS from "src/apis/mutations";

const { Panel } = Collapse;

const { confirm } = Modal;

interface Props {
  optionData: ProductOptionName[];
  optionValue: OptionValueType[];

  itemData: Product;
  itemInput: ItemInputType;
  itemOptionData: ProductOption[];
  itemDescription: string;

  selectProductId: number;

  thumbnailImage: any[];

  calculatePriceData: CalculatePriceType;
  shippingCode: number;
  selectCategoryItem: string;
  sillData: string;
  searchTags: string;

  onChangeOptionData: (e: ChangeEvent<HTMLInputElement>, i: any) => void;
  onChangeOptionValue: (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;

  setItemOptionData: Dispatch<SetStateAction<ProductOption[]>>;

  onProductRefetch: () => void;

  setOptionValue: Dispatch<SetStateAction<Props["optionValue"]>>;
}

const ProductDetailModalOption = ({
  optionData,
  optionValue,

  itemData,
  itemInput,
  itemOptionData,
  itemDescription,

  selectProductId,

  thumbnailImage,
  
  calculatePriceData,
  shippingCode,
  selectCategoryItem,
  sillData,
  searchTags,

  setItemOptionData,

  onChangeOptionData,
  onChangeOptionValue,

  onProductRefetch,

  setOptionValue
}: Props) => {
  const [currentWord, setCurrentWord] = useState<string>("");
  const [replaceWord, setReplaceWord] = useState<string>("");

  const [currentPrice, setCurrentPrice] = useState<number>(0);

  const [checkboxArray, setCheckboxArray] = useState([]);

  useEffect(() => {
    const array = [];

    itemOptionData.map((v) => {
      array.push(false);
    })

    setCheckboxArray(array);
  }, []);

  const [disableUserOption] = useMutation<
    { disableUserOption: Boolean },
    MutationDisableUserOptionArgs
  >(MUTATIONS.DISABLE_USER_OPTION, {
    refetchQueries: ["SELECT_MY_PRODUCT_DETAIL"],
  });

  return (
    <article>
      <Row>
        <Col span={24}>
          <Input size="small" style={{
            width: 150,
            marginRight: 5,
            textAlign: "center"
          }} value={currentWord}
          onChange={(e) => {
            setCurrentWord(e.target.value)
          }} />

          <span style={{
            marginRight: 5
          }}>
            →
          </span>

          <Input size="small" style={{
            width: 150,
            marginRight: 5,
            textAlign: "center"
          }} value={replaceWord}
          onChange={(e) => {
            setReplaceWord(e.target.value)
          }} />

          <Button size="small" style={{
              color: "gray",
              marginRight: 5
            }} onClick={() => {
              var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
              var regstr = currentWord;

              if(reg.test(currentWord)){
                  regstr = "\\".concat(currentWord);
              }

              setOptionValue(optionValue.map((v1, i1) => {
                return { ...v1, "name": v1.name.replace(new RegExp(regstr, "g"), replaceWord) };
              }));

              setCurrentWord("");
              setReplaceWord("");
            }}>
              옵션명 일괄변경
          </Button>
        </Col>
      </Row>

      <Divider />

      <Row>
        {optionData?.map((v, i) => (
          <Col key={i} span={24 / optionData.length} style={{
            paddingRight: 3,
          }}>
            <Row style={{
              margin: "0px 0px 5px 1px",
            }}>
              <Button size="small" icon={<EditOutlined />} style={{
                color: "gray",
                marginRight: 5
              }} onClick={() => {
                setOptionValue(optionValue.map((v1, i1) => {
                  for (var i in v.productOptionValue) {
                    if (v1.id === v.productOptionValue[i].id) {
                      return { ...v1, "name": (parseInt(i) + 1).toString().padStart(2, "0") };
                    }
                  }

                  return { ...v1 };
                }));
              }}>
                일괄 수정(0-9)
              </Button>

              <Button size="small" icon={<EditOutlined />} style={{
                  color: "gray",
                  marginRight: 5
                }} onClick={() => {
                  setOptionValue(optionValue.map((v1, i1) => {
                    for (var i in v.productOptionValue) {
                      if (v1.id === v.productOptionValue[i].id) {
                        var s = '', t: any;
                        var i2 = parseInt(i) + 1;

                        while (i2 > 0) {
                          t = (i2 - 1) % 26;
                          s = String.fromCharCode(65 + t) + s;
                          i2 = (i2 - t) / 26 | 0;
                        }

                        return { ...v1, "name": s };
                      }
                    }

                    return { ...v1 };
                  }));
                }}>
                  일괄 수정(A-Z)
              </Button>

              {/* <Button size="small" icon={<ReloadOutlined />} style={{
                color: "gray",
                marginRight: 5
              }} onClick={() => {
                console.log(itemOptionData);

                setOptionValue(optionValue.map((v1, i1) => {
                  for (var i in v.productOptionValue) {
                    if (v1.id === v.productOptionValue[i].id) {
                      return { ...v1, "name": (parseInt(i) + 1).toString().padStart(2, "0") };
                    }
                  }

                  return { ...v1 };
                }));
              }}>
                원래대로
              </Button> */}
            </Row>

            <Collapse style={{
              margin: "1px",
            }}>
              <Panel
                key={i + 1}
                className="detail-page-panel"
                header={
                  <React.Fragment>
                    <Row>
                      <Col span={20} style={{ 
                      fontSize: "16px", 
                      color: "#1890ff" 
                      }}>
                        옵션 {i + 1}. {optionData[i].name}
                      </Col>
                      
                      <Col span={4} style={{
                        textAlign: "right"
                      }}>
                        <Button icon={<CloseOutlined />} danger size="small" type="primary" onClick={(e) => {
                          e.stopPropagation();

                          confirm({
                            title: `"${optionData[i].name}" 옵션을 삭제하시겠습니까?`,
                            content: '삭제 후에는 다시 원래대로 되돌릴 수 없습니다.',
                            onOk() {
                              const variables: MutationDisableUserOptionArgs = {
                                id: optionData[i].id
                              };
    
                              disableUserOption({
                                variables
                              }).then(() => {
                                message.success(`"${optionData[i].name}" 옵션이 삭제되었습니다.`);
                              })
                              .catch((e: ApolloError) => {
                                message.error(e.message);
                              });
                            },
                            onCancel() {
                              //
                            },
                            okText: "예",
                            cancelText: "아니오"
                          });
                        }} />
                      </Col>
                    </Row>
                  </React.Fragment>
                }
              >
                <div
                  style={{
                    // display: "flex",
                    padding: "0 0 5px 0px",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <Row>
                    <Col span={3} />
                      
                    <Col span={6} style={{textAlign: "left", padding: "0px 8px 2px 0px"}}>
                      <Input
                        disabled
                        style={{
                          cursor: "text",
                          color: "gray"
                        }}
                        value={itemData?.taobaoProduct.options.optionName.find((val) => val.taobaoPid === v.taobaoPid)?.name}
                      />
                    </Col>

                    <Col span={15} style={{textAlign: "left", padding: "0px 8px 2px 0px"}}>
                      <div style={{position: "relative"}}>
                        <Input
                          value={optionData[i].name}
                          onChange={(e) => {
                            onChangeOptionData(e, i)
                          }}
                        />

                        <Input 
                          disabled
                          style={{
                            cursor: "text",
                            color: "gray",
                            position: "absolute",
                            width: "75px",
                            marginLeft: 1,
                            textAlign: "center",
                            right: "0"
                          }}
                          value={optionData[i].name.length.toString() + "/25"} 
                        />
                      </div>
                      
                    </Col>
                  </Row>
                </div>

                {v.productOptionValue.map((v1, i1) => {
                  return (
                    <OptionCollapseItem
                      id={v1.id}
                      key={i1}
                      index={i1}
                      isNotLast={optionData.length - 1 !== i1}
                      isActive={v1.isActive}
                      name={
                        itemData?.taobaoProduct.options.optionValue.find(
                          (val) => val.taobaoVid === v1.taobaoVid
                        )?.name
                      }
                      optionData={optionData}
                      optionValue={optionValue}
                      itemOptionData={itemOptionData}
                      itemInput={itemInput}
                      itemDescription={itemDescription}
                      thumbnailImage={thumbnailImage}
                      selectProductId={selectProductId}
                      calculatePriceData={calculatePriceData}
                      shippingCode={shippingCode}
                      selectCategoryItem={selectCategoryItem}
                      sillData={sillData}
                      searchTags={searchTags}
                      imageValue={
                        optionValue.find((optVal) => optVal.id === v1.id)?.image
                      }
                      inputValue={
                        optionValue.find((optVal) => optVal.id === v1.id)?.name
                      }
                      inputOnChange={(e) => onChangeOptionValue(e, v1.id)}
                      onProductRefetch={onProductRefetch}
                    />
                  );
                })}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>

      <Divider />

      {itemOptionData.length === 0 ?
        "옵션이 없습니다."
      :
        <>
          <div style={{
            marginTop: 10
          }}>
            <Input size="small" style={{
              textAlign: "right",
              width: 125
            }} value={currentPrice} onChange={(e) => {
              let price = parseInt(e.target.value);

              if (isNaN(price) || price < 0) {
                message.warn("금액은 0원 이상 숫자형태로 입력해주세요.")

                return;
              }

              setCurrentPrice(price);
            }} placeholder="금액을 입력하세요." />
            
            &nbsp;

            <Button icon={<PlusCircleOutlined />} size="small" style={{
              color: "gray"
            }} onClick={() => {
              const array = [...itemOptionData];

              array.map((v, i) => {
                if (checkboxArray[i]) {
                  v.price += currentPrice;
                }

                return;
              });
              
              setItemOptionData(array);
            }}>
              판매가 일괄 인상
            </Button>

            &nbsp;

            <Button icon={<MinusCircleOutlined />} size="small" style={{
              color: "gray"
            }} onClick={() => {
              const array = [...itemOptionData];

              array.map((v, i) => {
                if (checkboxArray[i]) {
                  v.price -= currentPrice;
                }

                if (v.price < 0) {
                  v.price = 0;
                }
                
                return;
              });
              
              setItemOptionData(array);
            }}>
              판매가 일괄 인하
            </Button>
          </div>
        
          <div style={{
            border: "1px solid lightgray",
            display: "flex",
            marginTop: "5px",
            width: "100%",
            maxHeight: "500px",
            overflowY: "scroll",
            // justifyContent: "center" 
          }}>
            <table
              style={{
                background: "white",
                marginTop: "5px",
                width: "100%",
              }}
            >
              <thead style={{ 
                background: "whitesmoke",
                boxShadow: "0px 0px 1px gray",
              }}>
                <tr style={{ 
                  // fontWeight: "bold",
                  height: "30px" 
                }}>
                  <td style={{ textAlign: "right", width: "3%" }}>
                    <Checkbox onChange={(e) => {
                      let result = checkboxArray.map(() => {
                        return e.target.checked;
                      })

                      console.log(result);

                      setCheckboxArray(result);
                    }} style={{
                      width: 14,
                      height: 14,
                    }} />
                  </td>

                  <td style={{ textAlign: "center", width: "7%" }}>
                    순번
                  </td>
                  
                  <td style={{ textAlign: "left", width: "45%" }}>
                    상품명
                  </td>

                  <td style={{ textAlign: "center", width: "10%" }}>
                    도매가
                  </td>

                  <td style={{ textAlign: "center", width: "15%" }}>
                    판매가
                  </td>

                  <td style={{ textAlign: "center", width: "10%" }}>
                    재고수량
                  </td>

                  <td style={{ textAlign: "right", width: "10%" }}>
                    기준가 대비
                  </td>
                </tr>
              </thead>
              
              <tbody style={{}}>
                {itemOptionData?.map((value, index) => (
                  <tr key={index} style={{
                    boxShadow: "0px 0px 1px gray",
                  }}>
                    <td style={{
                      textAlign: "right",
                      width: "3%"
                    }}>
                      <Checkbox checked={checkboxArray[index]} style={{
                        width: 14,
                        height: 14,
                      }} onChange={(e) => {
                        let array = checkboxArray.map((v) => { return v; });

                        array[index] = e.target.checked;

                        setCheckboxArray(array);
                      }} />
                    </td>

                    <td style={{
                      textAlign: "center",
                      width: "7%"
                    }}>
                      {value.optionString}
                    </td>
                    
                    <td style={{
                      textAlign: "left",
                      width: "45%"
                    }}>
                      {/* <span>
                        {itemData?.taobaoProduct.options.option.map(
                          (v) => v.taobaoSkuId === value.taobaoSkuId && v.name
                        )}
                      </span>

                      <br /> */}

                      <span style={{ 
                        color: "#1890ff" 
                      }}>
                        {itemOptionData[index].name}
                      </span>

                      {/* <Input
                        className="optionsInput"
                        style={{ color: "#1890ff" }}
                        readOnly
                        value={itemOptionData[index].name}
                        onChange={(e) => {
                          const array = [...itemOptionData];
                          const changeValue = {
                            ...array[index],
                            name: e.target.value,
                          };
                          array[index] = changeValue;
                          setItemOptionData(array);
                        }}
                      /> */}
                    </td>

                    <td style={{
                      textAlign: "center",
                      width: "10%"
                    }}>
                      {JSON.parse(itemData?.taobaoProduct.originalData).shop_id === "express" ? "￦" : "¥"} {transMoneyFormat(value.priceCny)}
                    </td>

                    <td style={{
                      textAlign: "center",
                      width: "15%"
                    }}>
                      <span>
                        <InputNumber
                          style={{ width: "100px", height: "30px" }}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          value={value.price}
                          onChange={(e) => {
                            const array = [...itemOptionData];
                            const changeValue = {
                              ...array[index],
                              price: Number(e),
                            };
                            array[index] = changeValue;
                            setItemOptionData(array);
                          }}
                        />
                      </span>

                      &nbsp;

                      원
                    </td>

                    <td style={{
                      textAlign: "center",
                      width: "10%"
                    }}>
                      <span>
                        <InputNumber
                          style={{ width: "75px", height: "30px" }}
                          // formatter={(value) =>
                          //   `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          // }
                          // parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          value={value.stock}
                          onChange={(e) => {
                            const array = [...itemOptionData];
                            const changeValue = {
                              ...array[index],
                              stock: Number(e),
                            };
                            array[index] = changeValue;
                            setItemOptionData(array);
                          }}
                        />
                      </span>

                      &nbsp;

                      개
                    </td>

                    <td style={{
                      textAlign: "right",
                      width: "10%"
                    }}>
                      <span style={{
                        // color: "gray",
                      }}>
                        {Math.round((value.price / itemData.price - 1) * 100)} %
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      }
    </article>
  );
};

export default ProductDetailModalOption;
