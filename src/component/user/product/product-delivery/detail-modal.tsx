import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { Spin, Button, message, Modal, Tabs, Row, Col } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IMAGE_SERVER } from "src/apis/client";
import QUERIES from "src/apis/queries";
import { onApolloError } from "src/common/functions";
import {
  MutationInitProductImageArgs,
  MutationUpdateProductByUserArgs,
  Product,
  ProductOption,
  ProductOptionName,
  ProductOptionNameUpdateInput,
  ProductOptionUpdateInput,
  ProductOptionValueUpdateInput,
  ProductThumbnailUpdateInput,
  QuerySelectMyProductByUserArgs,
  User
} from "src/types";
import {
  ProductDetailModalDetailPage,
  ProductDetailModalInfo,
  ProductDetailModalOption,
  ProductDetailModalOptionImage,
  ProductDetailModalThumbnail,
} from "./modal-item";

import MUTATIONS from "src/apis/mutations";
import { withWarn } from "antd/lib/modal/confirm";

const { TabPane } = Tabs;
const { confirm } = Modal;

export type ItemInputType = {
  name: string;
  price: number;
  shippingFee: number;
};
export type OptionValueType = {
  id: number;
  isActive: boolean;
  name: string;
  image: string;
  newImage: File | null;
  newImagePreview: string;
};
export type CalculatePriceType = {
  marginRate: number;
  marginUnitType: string;
  localShippingFee: number;
  cnyRate: number;
};
const initialItemInput: ItemInputType = {
  name: "",
  price: 0,
  shippingFee: 0,
};
const initialCalculatePriceData: CalculatePriceType = {
  marginRate: 0,
  marginUnitType: "",
  localShippingFee: 0,
  cnyRate: 0,
};
interface Props {
  selectProductId: number;
  onCancel: () => void;
}

const ProductDetailModal = ({ selectProductId, onCancel }: Props) => {
  const { data: myInfoData } = useQuery<{ selectMyInfoByUser: User }>(
    QUERIES.SELECT_MY_INFO,
    {
      fetchPolicy: "no-cache",
      onError: onApolloError,
    }
  );

  const {
    loading: selectedMyProductLoading,
    data: selectedMyProductData,
    refetch: selectedMyProductRefetch,
  } = useQuery<
    { selectMyProductByUser: Product[] },
    QuerySelectMyProductByUserArgs
  >(QUERIES.SELECT_MY_PRODUCT_DETAIL, {
    variables: { where: { id: { equals: selectProductId } } },
    skip: !selectProductId,
    onError: onApolloError,
  });

  const itemData = selectedMyProductData?.selectMyProductByUser[0];

  const [selectKey, setSelectKey] = useState("1"); // 탭메뉴
  const [shippingCode, setShippingCode] = useState(0);
  const [sillData, setSillData] = useState(""); // 고시정보 출력
  const [itemInput, setItemInput] = useState(initialItemInput); // 상품명, 판매가, 유료배송비
  const [thumbnailImage, setThumbnailImage] = useState([]); // 썸네일이미지, 옵션이미지
  const [optionValue, setOptionValue] = useState<OptionValueType[]>([]);
  const [optionData, setOptionData] = useState<ProductOptionName[]>([]); // 옵션 정보 스테이트
  const [itemOptionData, setItemOptionData] = useState<ProductOption[]>([]); // 테이블 정보 스테이트
  const [itemDescription, setItemDescription] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const [calculatePriceData, setCalculatePriceData] = useState(
    initialCalculatePriceData
  ); // 가격설정
  const [selectCategoryItem, setSelectCategoryItem] = useState<string>(); // 카테고리 선택
  const [searchKeyword, setSearchKeyword] = useState<string>("");

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

  const [initProductImageByUser] = useMutation<
    { initProductImageByUser: Product },
    MutationInitProductImageArgs
  >(MUTATIONS.INIT_PRODUCT_IMAGE, {
    refetchQueries: ["SELECT_MY_PRODUCT_DETAIL", "SELECT_MY_PRODUCT_LIST"],
  });

  const [updateProductByUser] = useMutation<
    { updateProductByUser: Product },
    MutationUpdateProductByUserArgs
  >(MUTATIONS.UPDATE_PRODUCT_DATA, {
    refetchQueries: ["SELECT_MY_PRODUCT_DETAIL", "SELECT_MY_PRODUCT_LIST"],
  });

  const initProductImage = () => {
    const variables: MutationInitProductImageArgs = {
      productId: selectProductId,
    };

    initProductImageByUser({
      variables,
    }).then(() => {
      message.success("이미지 정보가 초기화되었습니다.");
    }).catch((e: ApolloError) => {
      message.error(e.message);
    });
  }

  const onUpdateProduct = () => {
    const thumbnails: ProductThumbnailUpdateInput[] = thumbnailImage.map(
      (v) => {
        const { uploadImagePreview, ...etc } = v;

        return etc;
      }
    );

    const options: ProductOptionUpdateInput[] = itemOptionData.map((v) => ({
      id: v.id,
      isActive: v.isActive,
      price: v.price,
      stock: v.stock
    }));

    const optionNames: ProductOptionNameUpdateInput[] = optionData.map((v) => ({
      id: v.id,
      name: v.name,
    }));

    const optionValues: ProductOptionValueUpdateInput[] = optionValue.map(
      (v) => ({
        id: v.id,
        isActive: v.isActive,
        name: v.name,
        image: v.image,
        newImage: v.newImage,
      })
    );

    const variables: MutationUpdateProductByUserArgs = {
      productId: selectProductId,
      name: itemInput.name,
      price: itemInput.price,
      description: itemDescription,
      shippingFee: itemInput.shippingFee,
      localShippingFee: calculatePriceData.localShippingFee,
      localShippingCode: shippingCode,
      options,
      optionNames,
      optionValues,
      thumbnails,
      categoryCode: selectCategoryItem ? selectCategoryItem : null,
      categoryA077: itemData?.categoryA077 !== categoryA077 ? categoryA077 : null,
      categoryA077Name: itemData?.categoryA077 !== categoryA077 ? categoryA077Name : null,
      categoryB378: itemData?.categoryB378 !== categoryB378 ? categoryB378 : null,
      categoryB378Name: itemData?.categoryB378 !== categoryB378 ? categoryB378Name : null,
      categoryA112: itemData?.categoryA112 !== categoryA112 ? categoryA112 : null,
      categoryA112Name: itemData?.categoryA112 !== categoryA112 ? categoryA112Name : null,
      categoryA027: itemData?.categoryA027 !== categoryA027 ? categoryA027 : null,
      categoryA027Name: itemData?.categoryA027 !== categoryA027 ? categoryA027Name : null,
      categoryA001: itemData?.categoryA001 !== categoryA001 ? categoryA001 : null,
      categoryA001Name: itemData?.categoryA001 !== categoryA001 ? categoryA001Name : null,
      categoryA006: itemData?.categoryA006 !== categoryA006 ? categoryA006 : null,
      categoryA006Name: itemData?.categoryA006 !== categoryA006 ? categoryA006Name : null,
      categoryB719: itemData?.categoryB719 !== categoryB719 ? categoryB719 : null,
      categoryB719Name: itemData?.categoryB719 !== categoryB719 ? categoryB719Name : null,
      categoryA113: itemData?.categoryA113 !== categoryA113 ? categoryA113 : null,
      categoryA113Name: itemData?.categoryA113 !== categoryA113 ? categoryA113Name : null,
      categoryA524: itemData?.categoryA524 !== categoryA524 ? categoryA524 : null,
      categoryA524Name: itemData?.categoryA524 !== categoryA524 ? categoryA524Name : null,
      categoryA525: itemData?.categoryA525 !== categoryA525 ? categoryA525 : null,
      categoryA525Name: itemData?.categoryA525 !== categoryA525 ? categoryA525Name : null,
      categoryB956: itemData?.categoryB956 !== categoryB956 ? categoryB956 : null,
      categoryB956Name: itemData?.categoryB956 !== categoryB956 ? categoryB956Name : null,
      siilCode: sillData ? sillData : null,
      searchTags: searchTags ? searchTags : "",
    };

    updateProductByUser({
      variables,
    }).then(() => {
      setSelectCategoryItem(null);
      setSearchKeyword("");
      setItemTotal({
        item1: undefined,
        item2: undefined,
        item3: undefined,
        item4: undefined
      });
      
      message.success("상품 정보가 변경되었습니다.");

      let rows = document.getElementsByTagName('tr');
      
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].getAttribute('data-row-key') === selectProductId.toString()) {
          rows[i].style.backgroundColor = "rgba(50, 205, 50, 0.2)";
        } 
      }
    }).catch((e: ApolloError) => {
      message.error(e.message);
    });
  };

  useEffect(() => {
    if (itemData) {
      if (!selectedMyProductLoading) {
        setShippingCode(itemData?.localShippingCode ?? 0);
        setSearchTags(itemData?.searchTags);
        setItemInput({
          name: itemData?.name ?? "",
          price: itemData?.price ?? 0,
          shippingFee: itemData?.shippingFee ?? 0,
        });

        var origin = JSON.parse(itemData?.taobaoProduct.originalData);

        setCalculatePriceData({
          cnyRate: itemData?.cnyRate,
          marginRate: itemData?.marginRate,
          marginUnitType: itemData?.marginUnitType,
          localShippingFee: origin.shop_id === "express" ? origin.props[itemData?.localShippingCode].value : itemData?.localShippingFee,
        });
        setSillData(itemData.siilCode ? itemData.siilCode : "");
        setThumbnailImage(
          itemData.imageThumbnail.map((v) => ({
            defaultImage: v,
            uploadImage: null,
            uploadImagePreview: "",
          }))
        );
        setOptionValue(
          itemData.productOptionName.flatMap((v) =>
            v.productOptionValue.flatMap((v1) => ({
              id: v1.id,
              isActive: v1.isActive,
              name: v1.name,
              image: v1.image as string,
              newImage: null,
              newImagePreview: "",
            }))
          )
        );

        if (itemData?.productOptionName) {
          setOptionData(itemData?.productOptionName);
        }
    
        if (itemData?.productOption) {
          setItemOptionData(itemData?.productOption);
        }
    
        if (/^product\/\d+/.test(itemData?.description)) {
          const externalHtml = `${IMAGE_SERVER}/${itemData?.description}`;
  
          fetch(externalHtml, { cache: "no-cache" })
          .then((res) => res.text())
          .then((html) => setItemDescription(html))
          .catch((error) => {
            console.log("상세페이지 오류:", error);

            alert("상세페이지를 불러오는 도중 오류가 발생했습니다. 다시 시도 바랍니다.");

            onCancel();
          });
        } else {
          setItemDescription(itemData?.description);
        }
      }
    }
  }, [selectedMyProductData, selectedMyProductLoading, itemData]);

  let thumbnailChk;
  let chkImage;
  if (thumbnailImage[0]) {
    thumbnailChk = /^https?:\/\//.test(thumbnailImage[0].defaultImage)
      ? thumbnailImage[0].defaultImage
      : IMAGE_SERVER + "/" + thumbnailImage[0].defaultImage;
    chkImage =
      thumbnailImage[0].uploadImagePreview === ""
        ? thumbnailChk
        : thumbnailImage[0].uploadImagePreview;
  }

  const onChangeSearchTags = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTags(e.target.value);
  };
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setItemInput({ ...itemInput, name: e.target.value });
  };
  const onChangePrice = (e: string | number) => {
    setItemInput({ ...itemInput, price: Number(e) });
  };
  const onChangeShippingFee = (e: string | number) => {
    setItemInput({ ...itemInput, shippingFee: Number(e) });
  };
  const onChangeShippingCode = (e: any) => {
    setShippingCode(e);
  };
  const onChangeCalculatePrice = (e: string | number, name: string) => {
    setCalculatePriceData({
      ...calculatePriceData,
      [name]: e as number,
    });
  };
  const onChangeOptionData = (e: ChangeEvent<HTMLInputElement>, i: any) => {
    var value = e.target.value;

    setOptionData((s) => {
      const p = [...s];

      p.splice(i, 1, { ...p[i], name: value });
      return [...p];
    });
  };

  const onChangeOptionValue = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    const p = [...optionValue];
    const tempValue = p.find((pVal) => pVal.id === index);
    if (tempValue) {
      tempValue.name = value;
    }
    setOptionValue(p);
  };

  const onProductRefetch = () => selectedMyProductRefetch();

  useEffect(() => {
    setSelectKey("1");
  }, [selectProductId]);

  return (<>
      <Modal
        visible={Boolean(selectProductId)}
        // centered
        onCancel={() => {
          confirm({
            title: '상세페이지를 닫으시겠습니까?',
            content: '저장하지 않고 나갈 경우, 수정된 내용이 상품에 반영되지 않을 수 있습니다.',
            onOk() {
              setSelectCategoryItem(null);
              setSearchKeyword("");
              setItemTotal({
                item1: undefined,
                item2: undefined,
                item3: undefined,
                item4: undefined
              });

              onCancel();
            },
            onCancel() {
              //
            },
            okText: "예",
            cancelText: "아니오"
          });
        }}
        bodyStyle={{
          padding: 10
        }}
        footer={false}
        closable={false}
        transitionName=""
        width={"1500px"}
      >
        {selectedMyProductLoading ? 
          <>
              <Row style={{
                padding: 10,
              }}>
                <Col span={24} style={{
                  textAlign: "center"
                }}>
                  <Spin spinning={selectedMyProductLoading} />

                  &nbsp;

                  상품 정보를 가져오는 중입니다...
                </Col>
              </Row>

          </>
        :
          <>
            <Row style={{
              padding: 5,
              marginBottom: 10
            }}>
              <Col span={2} style={{
                fontSize: 18,
                paddingTop: 5
              }}>
                <span style={{
                  color: "#2988ff",

                  fontWeight: "bold",
                }}>
                  {itemData?.productCode}
                </span>
              </Col>

              <Col span={8}>
                <Button
                  onClick={() => {
                    confirm({
                      title: '원본이미지로 복구를 진행하시겠습니까?',
                      content: '이미지 편집 및 번역한 모든 데이터가 초기화됩니다.',
                      
                      onOk() {
                        initProductImage();
                      },
                      onCancel() {

                      },

                      okText: "예",
                      cancelText: "아니오"
                    });
                  }}
                  style={{
                    height: 35
                  }}
                >
                  이미지 초기화
                </Button>

                &nbsp;

                <Button
                  onClick={() => {
                    window.open(`chrome-extension://cdghhijdbghkgklajgahabkbbpijddlo/main/trangers.html?id=${itemData.id}`);

                    onCancel();
                  }}
                  type="primary"
                  style={{
                    height: 35
                  }}
                >
                  이미지 편집/번역
                </Button>
              </Col>

              <Col span={10} />

              <Col span={4} style={{
                textAlign: "right"
              }}>
                <Button
                  onClick={onUpdateProduct}
                  type="primary"
                  style={{
                    height: 35
                  }}
                >
                  저장
                </Button>

                &nbsp;

                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    confirm({
                      title: '상세페이지를 닫으시겠습니까?',
                      content: '저장하지 않고 나갈 경우, 수정된 내용이 상품에 반영되지 않을 수 있습니다.',
                      onOk() {
                        setSelectCategoryItem(null);
                        setSearchKeyword("");
                        setItemTotal({
                          item1: undefined,
                          item2: undefined,
                          item3: undefined,
                          item4: undefined
                        });

                        onCancel();
                      },
                      onCancel() {
                        //
                      },
                      okText: "예",
                      cancelText: "아니오"
                    });
                  }}
                  style={{
                    height: 35
                  }}
                >
                  닫기
                </Button>
              </Col>
            </Row>

            <Tabs
              type="card"
              activeKey={selectKey}
              onChange={setSelectKey}
            >
              <TabPane tab="기본정보" key={"1"}>
                <ProductDetailModalInfo
                  searchKeyword={searchKeyword}
                  myInfoData={myInfoData}
                  itemData={itemData}
                  itemInput={itemInput}
                  calculatePriceData={calculatePriceData}
                  chkImage={chkImage}
                  shippingCode={shippingCode}
                  searchTags={searchTags}
                  selectProductId={selectProductId}
                  selectCategoryItem={selectCategoryItem}
                  itemTotal={itemTotal}
                  categoryA077={categoryA077}
                  categoryB378={categoryB378}
                  categoryA112={categoryA112}
                  categoryA027={categoryA027}
                  categoryA001={categoryA001}
                  categoryA006={categoryA006}
                  categoryB719={categoryB719}
                  categoryA113={categoryA113}
                  categoryA524={categoryA524}
                  categoryA525={categoryA525}
                  categoryB956={categoryB956}
                  categoryA077Name={categoryA077Name}
                  categoryB378Name={categoryB378Name}
                  categoryA112Name={categoryA112Name}
                  categoryA027Name={categoryA027Name}
                  categoryA001Name={categoryA001Name}
                  categoryA006Name={categoryA006Name}
                  categoryB719Name={categoryB719Name}
                  categoryA113Name={categoryA113Name}
                  categoryA524Name={categoryA524Name}
                  categoryA525Name={categoryA525Name}
                  categoryB956Name={categoryB956Name}
                  setSearchKeyword={setSearchKeyword}
                  onChangeSearchTags={onChangeSearchTags}
                  onChangeName={onChangeName}
                  onChangePrice={onChangePrice}
                  onChangeShippingFee={onChangeShippingFee}
                  onChangeShippingCode={onChangeShippingCode}
                  onChangeCalculatePrice={onChangeCalculatePrice}
                  setSelectCategoryItem={setSelectCategoryItem}
                  setItemTotal={setItemTotal}
                  setCategoryA077={setCategoryA077}
                  setCategoryB378={setCategoryB378}
                  setCategoryA112={setCategoryA112}
                  setCategoryA027={setCategoryA027}
                  setCategoryA001={setCategoryA001}
                  setCategoryA006={setCategoryA006}
                  setCategoryB719={setCategoryB719}
                  setCategoryA113={setCategoryA113}
                  setCategoryA524={setCategoryA524}
                  setCategoryA525={setCategoryA525}
                  setCategoryB956={setCategoryB956}
                  setCategoryA077Name={setCategoryA077Name}
                  setCategoryB378Name={setCategoryB378Name}
                  setCategoryA112Name={setCategoryA112Name}
                  setCategoryA027Name={setCategoryA027Name}
                  setCategoryA001Name={setCategoryA001Name}
                  setCategoryA006Name={setCategoryA006Name}
                  setCategoryB719Name={setCategoryB719Name}
                  setCategoryA113Name={setCategoryA113Name}
                  setCategoryA524Name={setCategoryA524Name}
                  setCategoryA525Name={setCategoryA525Name}
                  setCategoryB956Name={setCategoryB956Name}
                />
              </TabPane>

              <TabPane tab="옵션" key={"2"}>
                <ProductDetailModalOption
                  optionData={optionData}
                  itemData={itemData}
                  optionValue={optionValue}
                  itemOptionData={itemOptionData}
                  onChangeOptionData={onChangeOptionData}
                  onChangeOptionValue={onChangeOptionValue}
                  setItemOptionData={setItemOptionData}
                  onProductRefetch={onProductRefetch}
                  itemInput={itemInput}
                  thumbnailImage={thumbnailImage}
                  selectProductId={selectProductId}
                  itemDescription={itemDescription}
                  calculatePriceData={calculatePriceData}
                  shippingCode={shippingCode}
                  selectCategoryItem={selectCategoryItem}
                  sillData={sillData}
                  searchTags={searchTags}
                  setOptionValue={setOptionValue}
                />
              </TabPane>

              <TabPane tab="상세페이지" key={"3"}>
                <ProductDetailModalDetailPage
                  itemDescription={itemDescription}
                  setItemDescription={setItemDescription}
                />
              </TabPane>

              <TabPane tab="썸네일이미지" key={"4"} style={{ overflowY: "auto" }}>
                <ProductDetailModalThumbnail
                  thumbnailImage={thumbnailImage}
                  setThumbnailImage={setThumbnailImage}
                />
              </TabPane>

              <TabPane tab="옵션이미지" key={"5"} style={{ overflowY: "auto" }}>
                <ProductDetailModalOptionImage
                  optionValue={optionValue}
                  setOptionValue={setOptionValue}
                />
              </TabPane>
            </Tabs>
          </>
        }
      </Modal>
    </>
  );
};

export default ProductDetailModal;
