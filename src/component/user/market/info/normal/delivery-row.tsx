import { Col, Input, Row } from "antd";
import React, { CSSProperties } from "react";
import { formatToComma } from "src/common/functions";

type ColumnType = {
  name: string;
  value: number;
  pClassName: string;
  pStyle: CSSProperties;
};

interface Props {
  additionalShippingFeeJeju: number;
  refundShippingFee: number;
  exchangeShippingFee: number;
}

const DeliveryRow = ({
  additionalShippingFeeJeju,
  exchangeShippingFee,
  refundShippingFee,
}: Props) => {
  const columns: ColumnType[] = [
    {
      name: "제주/도서산간\n추가배송비",
      value: additionalShippingFeeJeju,
      pClassName: "whitespace-pre text-center",
      pStyle: {
        width: "100px",
      },
    },
    {
      name: "반품배송비",
      value: refundShippingFee,
      pClassName: "text-center",
      pStyle: {
        wordBreak: "keep-all",
        whiteSpace: "nowrap",
        width: "100px",
      },
    },
    {
      name: "교환배송비",
      value: exchangeShippingFee,
      pClassName: "text-center",
      pStyle: {
        wordBreak: "keep-all",
        whiteSpace: "nowrap",
        width: "100px",
      },
    },
  ];

  return (
    <Row align="middle">
      {columns.map((v, i) => (
        <Col key={i} span={6} className="flex items-center">
          <p className={v.pClassName} style={v.pStyle}>
            {v.name}
          </p>
          <Input
            style={{ cursor: "not-allowed", width: "120px", borderRadius: "4px", textAlign: "right", height: "40px", }}
            className="my-2 mr-2"
            readOnly
            value={formatToComma(v.value)}
          />
          원
        </Col>
      ))}
    </Row>
  );
};

export default DeliveryRow;
