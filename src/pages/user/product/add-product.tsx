import React from "react";
import { Card, Descriptions, Input } from "antd";
import Dragger from "antd/lib/upload/Dragger";

const { Search } = Input;

const AddProduct = () => {
  const productEnrollment = (value: string) => {
    //
  };
  return (
    <Card>
      <div style={{ marginBottom: "20px" }}>
        <span
          style={{ fontSize: "18px", fontWeight: 600, marginRight: "50px" }}
        >
          상품 등록
        </span>
      </div>
      <Card style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <span
            style={{ fontSize: "16px", fontWeight: 600, marginRight: "50px" }}
          >
            상품 링크 등록
          </span>
        </div>
        <Descriptions bordered>
          <Descriptions.Item label="링크(url)">
            <Search
              placeholder="URL"
              allowClear
              enterButton="상품 등록"
              onSearch={productEnrollment}
            />
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card>
        <div style={{ marginBottom: "20px" }}>
          <span
            style={{ fontSize: "16px", fontWeight: 600, marginRight: "50px" }}
          >
            상품 대량 등록
          </span>
        </div>
        <Dragger
          style={{ width: "100%", padding: "20px 0" }}
          // multiple
          accept={
            "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          }
          onChange={(e) => {
            if (!e) return;
          }}
        >
          <span style={{ fontSize: "18px" }}>
            파일을 해당 영역에 드래그 하거나 업로드 하세요.
          </span>
        </Dragger>
        {/* 데이터 있을경우 테이블 생성 해야됨 */}
      </Card>
    </Card>
  );
};

export default AddProduct;
