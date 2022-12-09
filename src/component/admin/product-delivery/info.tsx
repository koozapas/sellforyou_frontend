import { ApolloError, useMutation } from "@apollo/client";
import { Button, Input, InputNumber, message } from "antd";
import React, { ChangeEvent, useState } from "react";
import MUTATIONS from "src/apis/mutations";
import { transMoneyFormat } from "src/common/transform";
import CategoriWrapPage from "src/pages/user/product/detail/categori-wrap-page";
import { sillList } from "src/pages/user/product/detail/select-siil-wrap-page";
import { MutationUpdateProductPriceByAdminArgs, Product } from "src/types";
import {
  CalculatePriceType,
  ItemInputType,
} from "src/component/user/product/product-delivery/detail-modal";

interface Props {
  itemData: Product | undefined;
  itemInput: ItemInputType;
  calculatePriceData: CalculatePriceType;
  chkImage: any;
  selectProductId: number;
  selectCategoryItem: string;

  onChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePrice: (e: number | string) => void;
  onChangeShippingFee: (e: number | string) => void;
  onChangeCalculatePrice: (e: string | number, name: string) => void;
  setSelectCategoryItem: React.Dispatch<React.SetStateAction<string>>;
}

/** 기본정보 */
const AdminProductDetailModalInfo = ({
  itemData,
  itemInput,
  calculatePriceData,
  chkImage,
  selectProductId,
  selectCategoryItem,
  onChangeName,
  onChangePrice,
  onChangeShippingFee,
  onChangeCalculatePrice,
  setSelectCategoryItem,
}: Props) => {
  //마진율,해외배송비,환율 변경
  const [updateProductPriceMutation] = useMutation<
    { updateProductPriceByAdmin: number },
    MutationUpdateProductPriceByAdminArgs
  >(MUTATIONS.UPDATE_PRODUCT_PRICE_BY_ADMIN, {
    refetchQueries: ["SELECT_MY_PRODUCT_LIST"],
  });

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

  return (
    <>
      {/* 상단 */}
      <div className="mb-4 flex justify-between gap-2">
        <div>
          <img
            src={chkImage ?? itemData?.taobaoProduct.imageThumbnail}
            style={{ width: "500px", aspectRatio: "1/1" }}
            alt=""
          />
        </div>
        <div
          style={{
            border: "2px solid #d9d9d9",
            padding: "5px 30px 5px 30px",
          }}
        >
          <div className="product-detail-container">
            <span className="product-detail-title">상품명</span>
            <span>{itemData?.taobaoProduct.name}</span>

            <div style={{ display: "flex", margin: "5px 0 0 150px" }}>
              <Input
                style={{
                  display: "inline-block",
                  width: "75%",
                  fontSize: "16px",
                }}
                value={itemInput.name}
                onChange={onChangeName}
              />
            </div>
          </div>

          <div className="product-detail-container">
            <span className="product-detail-title">도매가(¥)</span>
            <span style={{ color: "red" }}>
              ¥ {transMoneyFormat(itemData?.taobaoProduct.price)}
            </span>
          </div>

          <div className="product-detail-container">
            <span className="product-detail-title">판매가(￦)</span>
            <span
              style={{
                border: "1px solid blue",
                height: "30px",
                display: "inline-block",
                color: "blue",
                padding: "0 5px",
              }}
            >
              ￦
              <InputNumber
                className="optionsInput"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                style={{
                  display: "inline-block",
                  width: "130px",
                  border: "none",
                  fontSize: "16px",
                  color: "blue",
                  height: "28px",
                }}
                value={itemInput?.price}
                onChange={onChangePrice}
              />
              원
            </span>
          </div>

          <div className="product-detail-container">
            <span className="product-detail-title">유료배송비(￦)</span>
            <span
              style={{
                border: "1px solid #d9d9d9",
                height: "30px",
                display: "inline-block",
                padding: "0 5px",
              }}
            >
              ￦
              <InputNumber
                className="optionsInput"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                style={{
                  display: "inline-block",
                  width: "120px",
                  border: "none",
                  fontSize: "16px",
                  height: "28px",
                }}
                value={itemInput?.shippingFee}
                onChange={onChangeShippingFee}
              />
              원
            </span>
            <span
              style={{
                fontSize: "16px",
                marginLeft: "20px",
                color: "#b1b1b1",
                display: "inline-block",
              }}
            >
              {" "}
              * 0원 이상 설정 시 스토어 내 배송비가 유료로 설정됩니다.
            </span>
          </div>
          <div className="product-detail-container">
            <span className="product-detail-title">브랜드</span>
            {itemData?.taobaoProduct.brand}
          </div>
          <div className="product-detail-container">
            <span className="product-detail-title">설정 카테고리</span>
            {itemData?.category ? (
              <>
                {itemData?.category?.c1Name}
                {itemData?.category?.c2Name !== "" && " > "}
                {itemData?.category?.c2Name}
                {itemData?.category?.c3Name !== "" && " > "}
                {itemData?.category?.c3Name}
                {itemData?.category?.c4Name !== "" && " > "}
                {itemData?.category?.c4Name}
              </>
            ) : (
              <span style={{ color: "gray" }}>
                카테고리를 설정해주세요.
              </span>
            )}
          </div>
          <div className="product-detail-container">
            <span className="product-detail-title">고시 정보</span>
            {itemData?.siilCode ? (
              sillList.map((v) => v.code === itemData?.siilCode && v.name)
            ) : (
              <span style={{ fontSize: "14px", color: "red" }}>
                고시정보가 없습니다
              </span>
            )}
          </div>
          <div className="product-detail-container flex items-center">
            <span className="product-detail-title">가격설정</span>
            <span className="flex items-center mr-4">
              환율
              <InputNumber
                value={calculatePriceData.cnyRate}
                style={{ display: "inline-block", width: "100px" }}
                className="ml-4 mr-1"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                onChange={(e) => onChangeCalculatePrice(e, "cnyRate")}
              />
              원
            </span>
            <span className="flex items-center mr-4">
              <span className="whitespace-pre text-center">
                {"해외배송비\n(배대지)"}
              </span>
              <InputNumber
                value={calculatePriceData.localShippingFee}
                style={{ display: "inline-block", width: "100px" }}
                className="ml-4 mr-1"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                onChange={(e) => onChangeCalculatePrice(e, "localShippingFee")}
              />
              원
            </span>
            <span className="flex items-center mr-4">
              마진율
              <InputNumber
                value={calculatePriceData.marginRate}
                style={{ display: "inline-block", width: "100px" }}
                className="ml-4 mr-1"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                onChange={(e) => onChangeCalculatePrice(e, "marginRate")}
              />
              %
            </span>
            <Button
              type="primary"
              style={{ marginLeft: "20px" }}
              onClick={() => {
                updateProductPriceMutation({
                  variables: {
                    productIds: [selectProductId],
                    marginRate: calculatePriceData.marginRate,
                    shippingFee: itemInput.shippingFee,
                    cnyRate: calculatePriceData.cnyRate,
                    localShippingFee: calculatePriceData.localShippingFee,
                    localShippingCode: 0,
                  },
                })
                  .then(() => {
                    message.success("판매가가 변경되었습니다");
                  })
                  .catch((e: ApolloError) => {
                    message.error(e.message);
                  });
              }}
            >
              적용하기
            </Button>
          </div>
          <div style={{ paddingTop: "15px", float: "right" }}>
            <Button
              type="primary"
              style={{
                width: "160px",
                height: "38px",
                lineHeight: "30px",
                fontSize: "16px",
                fontWeight: 500,
              }}
              onClick={() => {
                const url = `https://item.taobao.com/item.htm?id=${itemData?.taobaoProduct.taobaoNumIid}`;
                window.open(url, "_blank");
              }}
            >
              구매처 바로가기
            </Button>
          </div>
        </div>
      </div>
      {/* 하단(카테고리) */}
      <article className="border-gray-500 p-2 border-2">
        {/* <h2 className="text-center text-3xl font-bold mb-4 ">카테고리 변경</h2> */}
        <CategoriWrapPage
          searchKeyword={searchKeyword}
          selectCategoryItem={selectCategoryItem}
          itemTotal={itemTotal}

          setSearchKeyword={setSearchKeyword}
          setSelectCategoryItem={setSelectCategoryItem}
          setItemTotal={setItemTotal}
        />
      </article>
    </>
  );
};

export default AdminProductDetailModalInfo;
