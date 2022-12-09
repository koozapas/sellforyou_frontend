import React, { useEffect, useState } from "react";
import { Product } from "src/types";
import { ApolloError, useMutation } from "@apollo/client";
import MUTATIONS from "src/apis/mutations";
import { Button, Row, message, Input } from "antd";

interface Props {
  proudctData: Product;
  setSelectProductId: (v: number) => void;
}

const ProductDeliveryToProductName = ({
  proudctData,
  setSelectProductId,
}: Props) => {
  const [data, setData] = useState<Product>(proudctData);

  const [updateProductName] = useMutation<
    { updateProductNameByUser: Product },
    { productId: Number; name: String }
  >(MUTATIONS.UPDATE_PRODUCT_NAME, {});

  useEffect(() => {
    setData(proudctData);
  }, [proudctData]);

  return (
    <>
      <div
        style={{ display: "inline-block", cursor: "default", width: "450px", padding: "5px 0px 5px 0px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Row>
          <Input
            value={data.taobaoProduct.name}
            spellCheck={false}
            style={{ width: "370px", height: "25px", fontSize: "12px" }}
          />

          &nbsp;

          <Button
            type="primary"
            style={{ width: "70px", height: "25px", padding: "0px" }}
            onClick={() => setSelectProductId(data.id)}
          >
            상세보기
          </Button>
        </Row>

        <Row style={{
          marginTop: 3
        }}>
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
            type="default"
            style={{ width: "70px", height: "25px", padding: "0px" }}
            onClick={() => {
              updateProductName({
                variables: {
                  productId: data.id,
                  name: data.name,
                },
              })
                .then((res) => {
                  message.success("상품명이 변경되었습니다.");

                  let rows = document.getElementsByTagName('tr');

                  for (let i = 0; i < rows.length; i++) {
                    if (rows[i].getAttribute('data-row-key') === data.id.toString()) {
                      rows[i].style.backgroundColor = "rgba(50, 205, 50, 0.2)";
                    } 
                  }
                })
                .catch((e: ApolloError) => {
                  message.error(e.message);
                });
            }}
          >
            저장
          </Button>
        </Row>
      </div>
    </>
  );
};
export default ProductDeliveryToProductName;
