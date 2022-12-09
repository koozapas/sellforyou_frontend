import React from "react";
import { Card, Button, Row, Col } from "antd";
import { sample } from "lodash";

const DownloadsPage = () => {
  return (
    <>
        <Card style={{ marginBottom: "60px" }}>
            <Row className="mr-20px" justify="space-between">
                <Row align="middle">
                <Col
                    style={{ fontSize: "16px", fontWeight: 600, marginRight: "50px" }}
                >
                    자료실
                </Col>
                </Row>
            </Row>

            <br />
            
                <Row align="middle">
                    <Col span={6} style={{
                        fontSize: 16,
                        // fontWeight: "bold",

                        textAlign: "left",
                    }}>
                        엑셀 대량수집 양식 다운로드
                    </Col>

                    <Col span={6} style={{
                        textAlign: "right",
                    }}>
                        <Button size="large" type="primary" style={{
                        }}
                        onClick={async () => {
                            let sample_resp = await fetch('/sample.xlsx');
                            let sample_blob = await sample_resp.blob();

                            let url = window.URL.createObjectURL(sample_blob);
                            
                            let a = document.createElement('a');
                            
                            a.href = url;
                            a.download = "셀포유_엑셀_대량수집_양식.xlsx";
                            
                            document.body.appendChild(a);
                            
                            a.click();
                            a.remove();
                        }}>
                            다운로드
                        </Button>
                    </Col>

                    <Col span={12} />
                </Row>
        </Card>
    </>
  );
};

export default DownloadsPage;
