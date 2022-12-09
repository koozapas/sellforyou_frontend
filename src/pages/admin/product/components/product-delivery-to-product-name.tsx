import React, { useEffect, useState } from "react";
import {
  MutationDeleteProductByUserArgs,
  MutationTranslateProductTextByUserArgs,
  Product,
} from "src/types";
import { ApolloError, useMutation } from "@apollo/client";
import MUTATIONS from "src/apis/mutations";
import { Button, Modal, message, Input } from "antd";
import { transProductState } from "src/common/transform";

const { confirm } = Modal;

interface Props {
  proudctData: Product;
  setSelectProductId: React.Dispatch<React.SetStateAction<number>>;
}

const ProductDeliveryToProductName = ({
  proudctData,
  setSelectProductId,
}: Props) => {
  const [data, setData] = useState<Product>(proudctData);

  // const [updateProductData] = useMutation<{ updateProductByUser: Product }, MutationUpdateProductByUserArgs>(MUTATIONS.UPDATE_PRODUCT_DATA, {
  // });
  const [updateProductName] = useMutation<
    { updateProductNameByAdmin: Product },
    { productId: Number; name: String }
  >(MUTATIONS.UPDATE_PRODUCT_NAME_BY_ADMIN, {});

  const [deleteProductData] = useMutation<
    { deleteProductByUser: Boolean },
    MutationDeleteProductByUserArgs
  >(MUTATIONS.DELETE_PRODUCT, {
    refetchQueries: ["SELECT_MY_PRODUCT_LIST", "GET_ITEM_STATE"],
  });

  const [translateProduct] = useMutation<
    { translateProductTextByUser: String },
    MutationTranslateProductTextByUserArgs
  >(MUTATIONS.TRANSLATE_PRODUCT_TEXT, {
    refetchQueries: ["SELECT_MY_PRODUCT_LIST"],
  });

  const deleteProduct = (id: number, state: string) => {
    // if (state !== "COLLECTED") {
    message.info(
      '선택 상품은 "' + transProductState(state) + '" 인 상품입니다.'
    );
    // }
    confirm({
      title: "선택 상품을 삭제하시겠습니까?",
      content: (
        <div style={{ color: "red" }}>
          스토어에 연동된 상품일 경우 <br /> 삭제 시 관련 정보도 함께
          삭제됩니다. <br />
          정말 삭제하시겠습니까?
        </div>
      ),
      centered: true,
      onOk() {
        deleteProductData({ variables: { productId: id } })
          .then((result) => message.success("상품이 삭제되었습니다."))
          .catch((e: ApolloError) => {
            message.error(e.message);
          });
      },
    });
  };

  useEffect(() => {
    setData(proudctData);
  }, [proudctData]);

  return (
    <>
      <div
        style={{ display: "inline-block", cursor: "default", width: "450px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Input
          value={data.taobaoProduct.name}
          spellCheck={false}
          style={{ width: "370px", height: "25px", fontSize: "12px" }}
        />

        &nbsp;

        <button
          className="table-detail-button"
          style={{ width: "70px", height: "25px", padding: "0px" }}
          onClick={() => setSelectProductId(data.id)}
        >
          상세보기
        </button>
        <div style={{ marginTop: "2px" }}>
          <Input
            style={{ width: "370px", height: "25px", color: "#1890ff", fontSize: "12px" }}
            spellCheck={false}
            value={data.name}
            onChange={(e) => {
              const tempData = { ...data, name: e.target.value };
              setData(tempData);
            }}
          />

          &nbsp;

          <Button
            style={{ width: "70px", height: "25px", padding: "0px" }}
            onClick={() => {
              // updateProductData({
              //   variables: {
              //     productId: data.id,
              //     name: data.name,
              //     options: data.productOption.map(v => ({ id: v.id, isActive: v.isActive, price: v.price })),
              //     optionNames: data.productOptionName.map(v => ({ id: v.id, name: v.name })),
              //     optionValues: data.productOptionName.map(v => v.productOptionValue).flat().map(v1 => ({ id: v1.id, name: v1.name, image: v1.image })),
              //   }
              // })
              updateProductName({
                variables: {
                  productId: data.id,
                  name: data.name,
                },
              })
                .then((res) => {
                  message.success("상품명이 변경되었습니다.");
                })
                .catch((e: ApolloError) => {
                  message.error(e.message);
                });
            }}
          >
            <span>　저장　</span>
          </Button>
        </div>
      </div>
    </>
  );
};
export default ProductDeliveryToProductName;
