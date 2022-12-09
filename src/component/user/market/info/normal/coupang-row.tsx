import { Col, Input, Row } from "antd";
import React, { CSSProperties } from "react";

type ColumnType = {
  name: string;
  value: string | number;
  pClassName: string;
  pStyle: CSSProperties;
  suffix: string;
};

interface Props {
  coupangOutboundShippingTimeDay: number;
  coupangUnionDeliveryType: string;
  coupangMaximumBuyForPerson: number;
  coupangImageOpt: string;
}

const CoupangRow = ({
  coupangOutboundShippingTimeDay,
  coupangUnionDeliveryType,
  coupangMaximumBuyForPerson,
  coupangImageOpt
}: Props) => {
  const columns: ColumnType[] = [
    {
      name: "배송출고\n소요기간",
      value: coupangOutboundShippingTimeDay,
      pClassName: "whitespace-pre text-center",
      pStyle: {
        width: "100px",
      },
      suffix: "일",
    },
    {
      name: "묶음배송여부",
      value: coupangUnionDeliveryType,
      pClassName: "text-center",
      pStyle: {
        wordBreak: "keep-all",
        whiteSpace: "nowrap",
        width: "100px",
      },
      suffix: "",
    },
    {
      name: "1인당\n최대구매수량",
      value: coupangMaximumBuyForPerson,
      pClassName: "whitespace-pre text-center",
      pStyle: {
        width: "100px",
      },
      suffix: "개",
    },
    {
      name: "옵션이미지를\n대표로 사용",
      value: coupangImageOpt,
      pClassName: "whitespace-pre text-center",
      pStyle: {
        width: "100px",
      },
      suffix: "",
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
            value={v.value}
          />
          {v.suffix}
        </Col>
      ))}
    </Row>
  );
};

export default CoupangRow;
