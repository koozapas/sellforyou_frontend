import { Col, Input, Row } from "antd";
import React, { CSSProperties } from "react";

type ColumnType = {
  name: string;
  value: string;
  pClassName: string;
  pStyle: CSSProperties;
  inputStyle: CSSProperties;
  span: number;
};

interface Props {
  asTel: string;
  asInformation: string;
}

const AsRow = ({ asTel, asInformation }: Props) => {
  const columns: ColumnType[] = [
    {
      name: "A/S 전화번호",
      value: asTel,
      pClassName: "whitespace-pre text-center",
      pStyle: {
        width: "100px",
      },
      inputStyle: {
        cursor: "not-allowed", 
        width: "120px",
        height: "40px",
        borderRadius: "4px",
      },
      span: 6,
    },
    {
      name: "A/S 안내내용",
      value: asInformation,
      pClassName: "text-center",
      pStyle: {
        wordBreak: "keep-all",
        whiteSpace: "nowrap",
        width: "100px"
      },
      inputStyle: { 
        cursor: "not-allowed", 
        width: "394px", 
        height: "40px",
        borderRadius: "4px" 
      },
      span: 18,
    },
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
            className="my-2"
            readOnly
            value={v.value}
          />
        </Col>
      ))}
    </Row>
  );
};

export default AsRow;
