import { Col, Input, Row } from "antd";
import React, { CSSProperties } from "react";

type ColumnType = {
  name: string;
  value: number;
  pClassName: string;
  pStyle: CSSProperties;
  inputStyle: CSSProperties;
  span: number;
};

interface Props {
  collectTimeout: number;
}

const CollectRow = ({ collectTimeout }: Props) => {
  const columns: ColumnType[] = [
    {
      name: "상품수집\n제한시간",
      value: collectTimeout,
      pClassName: "whitespace-pre text-center",
      pStyle: {
        width: "100px",
      },
      inputStyle: {
        cursor: "not-allowed", 
        width: "120px",
        borderRadius: "4px",
        textAlign:"right",
        height: "40px"
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
            style={v.inputStyle}
            className="my-2 mr-1"
            readOnly
            value={v.value}
          />
          초
        </Col>
      ))}
    </Row>
  );
};

export default CollectRow;
