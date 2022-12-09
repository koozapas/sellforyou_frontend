import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { Button, message, Modal, Tabs } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IMAGE_SERVER } from "src/apis/client";
import QUERIES from "src/apis/queries";
import { onApolloError } from "src/common/functions";
import {
  MutationUpdateProductByAdminArgs,
  Product,
  ProductOption,
  ProductOptionName,
  ProductOptionNameUpdateInput,
  ProductOptionUpdateInput,
  ProductOptionValueUpdateInput,
  ProductThumbnailUpdateInput,
  QuerySelectProductsByAdminArgs,
} from "src/types";
import {
  ProductDetailModalDetailPage,
  ProductDetailModalOption,
  ProductDetailModalOptionImage,
  ProductDetailModalThumbnail,
} from "src/component/user/product/product-delivery/modal-item";

import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  CalculatePriceType,
  ItemInputType,
  OptionValueType,
} from "src/component/user/product/product-delivery/detail-modal";
import AdminProductDetailModalInfo from "./info";
import MUTATIONS from "src/apis/mutations";


const { TabPane } = Tabs;
const { confirm } = Modal;

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

const AdminProductDetailModal = ({ selectProductId, onCancel }: Props) => {
  const [selectKey, setSelectKey] = useState("1"); // 탭메뉴
  const [sillData, setSillData] = useState(""); // 고시정보 출력
  const [itemInput, setItemInput] = useState(initialItemInput); // 상품명, 판매가, 유료배송비
  const [thumbnailImage, setThumbnailImage] = useState([]); // 썸네일이미지, 옵션이미지
  const [optionValue, setOptionValue] = useState<OptionValueType[]>([]);
  const [optionData, setOptionData] = useState<ProductOptionName[]>([]); // 옵션 정보 스테이트
  const [itemOptionData, setItemOptionData] = useState<ProductOption[]>([]); // 테이블 정보 스테이트
  const [itemDescription, setItemDescription] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const [shippingCode, setShippingCode] = useState(0);
  const [calculatePriceData, setCalculatePriceData] = useState(
    initialCalculatePriceData
  ); // 가격설정
  const [selectCategoryItem, setSelectCategoryItem] = useState<string>(); // 카테고리 선택

  const { data: productDetailData, refetch } = useQuery<
    { selectProductsByAdmin: Product[] },
    QuerySelectProductsByAdminArgs
  >(QUERIES.SELECT_PRODUCT_BY_ADMIN, {
    variables: { where: { id: { equals: selectProductId } } },
    skip: !selectProductId,
    onError: onApolloError,
  });

  const itemData = productDetailData?.selectProductsByAdmin[0];

  const [updateProductByAdmin] = useMutation<
    { updateProductByAdmin: Product },
    MutationUpdateProductByAdminArgs
  >(MUTATIONS.UPDATE_PRODUCT_DATA_BY_ADMIN, {
    refetchQueries: ["SELECT_PRODUCT_BY_ADMIN"],
  });

  const onUpdateProduct = async () => {
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
        name: v.name,
        image: v.image,
        newImage: v.newImage,
      })
    );
    const thumbnails: ProductThumbnailUpdateInput[] = thumbnailImage.map(
      (v) => {
        const { uploadImagePreview, ...etc } = v;
        return etc;
      }
    );
    const variables: MutationUpdateProductByAdminArgs = {
      productId: selectProductId,
      name: itemInput.name,
      price: itemInput.price,
      description: itemDescription,
      shippingFee: itemInput.shippingFee,
      localShippingFee: calculatePriceData.localShippingFee,
      options,
      optionNames,
      optionValues,
      thumbnails,
      categoryCode: selectCategoryItem ? selectCategoryItem : null,
      siilCode: sillData ? sillData : null,
    };
    await updateProductByAdmin({
      variables,
    })
      .then(() => {
        message.success("상품 정보가 변경되었습니다.");
      })
      .catch((e: ApolloError) => {
        message.error(e.message);
      });
  };

  useEffect(() => {
    if (itemData) {
      setItemInput({
        name: itemData?.name ?? "",
        price: itemData?.price ?? 0,
        shippingFee: itemData?.shippingFee ?? 0,
      });
      setCalculatePriceData({
        cnyRate: itemData?.cnyRate,
        marginRate: itemData?.marginRate,
        marginUnitType: itemData?.marginUnitType,
        localShippingFee: itemData?.localShippingFee,
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
      setCalculatePriceData((p) => ({
        ...p,
        cnyRate: itemData?.cnyRate ?? 0,
        marginRate: itemData?.marginRate ?? 0,
        marginUnitType: itemData?.marginUnitType ?? "",
        localShippingFee: itemData?.localShippingFee ?? 0,
      }));
    }

    if (itemData?.productOptionName) {
      setOptionData(itemData?.productOptionName);
    }

    if (itemData?.productOption) {
      setItemOptionData(itemData?.productOption);

      ///주석된것 BraftEditor 사용할시
      if (/^product\/\d+/.test(itemData?.description)) {
        const externalHtml = `${IMAGE_SERVER}/${itemData?.description}`;
        fetch(externalHtml, { cache: "no-cache" })
          .then((res) => res.text())
          .then((html) => setItemDescription(html))
          .catch((error) => console.log(error));
      } else {
        setItemDescription(itemData?.description);
      }
    }
  }, [itemData]);

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

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setItemInput({ ...itemInput, name: e.target.value });
  };
  const onChangePrice = (e: string | number) => {
    setItemInput({ ...itemInput, price: Number(e) });
  };
  const onChangeShippingFee = (e: string | number) => {
    setItemInput({ ...itemInput, shippingFee: Number(e) });
  };
  const onChangeCalculatePrice = (e: string | number, name: string) => {
    setCalculatePriceData({
      ...calculatePriceData,
      [name]: e as number,
    });
  };
  const onChangeOptionData = (e: ChangeEvent<HTMLInputElement>, i) => {
    setOptionData((s) => {
      const p = [...s];
      p.splice(i, 1, { ...p[i], name: e.target.value });
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

  const onProductRefetch = () => refetch();

  useEffect(() => {
    setSelectKey("1");
  }, [selectProductId]);

  return (
    <Modal
      visible={Boolean(selectProductId)}
      onCancel={() => {
        confirm({
          title: '상세페이지를 닫으시겠습니까?',
          content: '저장하지 않고 나갈 경우, 수정된 내용이 상품에 반영되지 않을 수 있습니다.',
          onOk() {
            onCancel();
          },
          onCancel() {
            //
          },
          okText: "예",
          cancelText: "아니오"
        });
      }}
      footer={false}
      transitionName=""
      closable={false}
      bodyStyle={{ padding: "4px 16px" }}
      style={{ top: "20px", paddingBottom: 0 }}
      width={"1500px"}
    >
      <Tabs
        type="card"
        activeKey={selectKey}
        onChange={setSelectKey}
        className="pb-4"
      >
        <TabPane tab="기본정보" key={"1"}>
          <AdminProductDetailModalInfo
            itemData={itemData}
            itemInput={itemInput}
            calculatePriceData={calculatePriceData}
            chkImage={chkImage}
            selectProductId={selectProductId}
            selectCategoryItem={selectCategoryItem}
            onChangeName={onChangeName}
            onChangePrice={onChangePrice}
            onChangeShippingFee={onChangeShippingFee}
            onChangeCalculatePrice={onChangeCalculatePrice}
            setSelectCategoryItem={setSelectCategoryItem}
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
      <div className="absolute flex gap-2" style={{ top: 6, right: 16 }}>
        <Button
          onClick={onUpdateProduct}
          type="primary"
        >
          저장
        </Button>
        <Button
          type="primary"
          onClick={() => {
            confirm({
              title: '상세페이지를 닫으시겠습니까?',
              content: '저장하지 않고 나갈 경우, 수정된 내용이 상품에 반영되지 않을 수 있습니다.',
              onOk() {
                onCancel();
              },
              onCancel() {
                //
              },
              okText: "예",
              cancelText: "아니오"
            });
          }}
        >
          닫기
        </Button>
      </div>
    </Modal>
  );
};

export default AdminProductDetailModal;
