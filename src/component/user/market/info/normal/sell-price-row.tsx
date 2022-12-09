import { Col, Input, Row } from "antd";
import React, { CSSProperties } from "react";
import { formatToComma } from "src/common/functions";

type ColumnType = {
  name: string;
  value: number;
  pClassName: string;
  pStyle: CSSProperties;
  etc: string;
};

interface Props {
  cnyRate: number;
  defaultShippingFee: number;
  marginRate: number;
  marginUnitType: string;
  discountAmount: number;
  discountUnitType: string;
}

const SellPriceRow = ({ cnyRate, defaultShippingFee, marginRate, marginUnitType, discountAmount, discountUnitType }: Props) => {
  const columns: ColumnType[] = [
    {
      name: "환율",
      value: cnyRate,
      pClassName: "text-center",
      pStyle: {
        wordBreak: "keep-all",
        whiteSpace: "nowrap",
        width: "100px",
      },
      etc: "원"
    },
    {
      name: "해외배송비\n(배대지)",
      value: defaultShippingFee,
      pClassName: "whitespace-pre text-center",
      pStyle: {
        width: "100px",
      },
      etc: "원"
    },
    {
      name: "일괄마진율",
      value: marginRate,
      pClassName: "text-center",
      pStyle: {
        wordBreak: "keep-all",
        whiteSpace: "nowrap",
        width: "100px",
      },
      etc: marginUnitType === "WON" ? "원" : "%"
    },
    {
      name: "기본할인가",
      value: discountAmount,
      pClassName: "text-center",
      pStyle: {
        wordBreak: "keep-all",
        whiteSpace: "nowrap",
        width: "100px",
      },
      etc: discountUnitType !== "WON" ? "%" : "원"
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
          {v.etc}
        </Col>
      ))}
    </Row>
  );
};

export default SellPriceRow;
