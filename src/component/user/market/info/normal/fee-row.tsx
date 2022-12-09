import { Col, Input, Row } from "antd";
import React, { CSSProperties } from "react";

type ColumnType = {
  name: string;
  value: number;
  pClassName: string;
  pStyle: CSSProperties;
  span: number;
};

interface Props {
  naverFee: number;
  coupangFee: number;
  streetFee: number;
  gmarketFee: number;
  auctionFee: number;
  interparkFee: number;
}

const FeeRow = ({ naverFee, coupangFee, streetFee, gmarketFee, auctionFee, interparkFee }: Props) => {
  const columns: ColumnType[] = [
    {
        name: "스마트스토어",
        value: naverFee,
        pClassName: "whitespace-pre text-center",
        pStyle: {
            width: "100px",
        },
        span: 6,
    },
    {
        name: "쿠팡",
        value: coupangFee,
        pClassName: "whitespace-pre text-center",
        pStyle: {
          width: "100px",
        },
        span: 6,
      },
      {
        name: "11번가",
        value: streetFee,
        pClassName: "whitespace-pre text-center",
        pStyle: {
          width: "100px",
        },
        span: 6,
      },
      {
        name: "G마켓",
        value: gmarketFee,
        pClassName: "whitespace-pre text-center",
        pStyle: {
          width: "100px",
        },
        span: 6,
      },
      {
        name: "옥션",
        value: auctionFee,
        pClassName: "whitespace-pre text-center",
        pStyle: {
          width: "100px",
        },
        span: 6,
      },
      {
        name: "인터파크",
        value: interparkFee,
        pClassName: "whitespace-pre text-center",
        pStyle: {
          width: "100px",
        },
        span: 6,
      }
  ];
  return (
    <Row align="middle">
      {columns.map((v, i) => (
        <Col key={i} span={v.span} className="flex items-center">
          <p className={v.pClassName} style={v.pStyle}>
            {v.name}
          </p>
          <Input
            style={{
                cursor: "not-allowed", 
                width: "120px",
                height: "40px",
                borderRadius: "4px",
                textAlign:"right",
            }}
            className="my-2 mr-1"
            readOnly
            value={v.value}
          />
          %
        </Col>
      ))}
    </Row>
  );
};

export default FeeRow;
