import React from "react";
import { Col, Input, Row } from "antd";

type ColumnType = {
  name: string;
  value: string;
  span: number;
};

interface Props {
  /** 원산지 코드 */
  naverOriginCode: string;
  /** 수입산 */
  naverOrigin: string;
  naverStoreOnly: string;
}

const SmartStoreRow = ({ naverOriginCode, naverOrigin, naverStoreOnly }: Props) => {
  const columns: ColumnType[] = [
    {
      name: "원산지코드",
      value: naverOriginCode,
      span: 6,
    },
    {
      name: "수입사",
      value: naverOrigin,
      span: 6,
    },
    {
      name: "스토어 전용\n상품명 사용",
      value: naverStoreOnly,
      span: 6
    }
  ];
  return (
    <Row align="middle">
      {columns.map((v, i) => (
        <Col key={i} span={v.span} className="flex items-center">
          <p className={"whitespace-pre text-center"} style={{ width: "100px" }}>
            {v.name}
          </p>
          <Input
            style={{ cursor: "not-allowed", width: "120px", borderRadius: "4px", height: "40px", textAlign: "right" }}
            className="my-2"
            readOnly
            value={v.value}
          />
        </Col>
      ))}
    </Row>
  );
};

export default SmartStoreRow;
