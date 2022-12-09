import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Image, message } from "antd";
import { User } from "src/types";
import { IMAGE_SERVER } from "src/apis/client";
import { fallback } from "src/common/variables";

interface Props {
  myInfo?: User;
}
const TopBottomSelectImg = ({ myInfo }: Props) => {
  const [topFixImgData, setTopFixImgData] = useState<{
    file: File | null;
    previewURL: string;
  }>({ file: null, previewURL: "" });
  const [bottomFixImgData, setBottomFixImgData] = useState<{
    file: File | null;
    previewURL: string;
  }>({ file: null, previewURL: "" });

  useEffect(() => {
    setTopFixImgData({
      ...topFixImgData,
      previewURL: `${IMAGE_SERVER}/${myInfo?.userInfo.fixImageTop}`,
    });
    setBottomFixImgData({
      ...bottomFixImgData,
      previewURL: `${IMAGE_SERVER}/${myInfo?.userInfo.fixImageBottom}`,
    });
  }, [myInfo]);

  const imgDownload = () => {
    var element = document.createElement("a");
    var file = new Blob(
      [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEpFTPjO92tho-jNumNR2HGlRN2VZDZcKqLA&usqp=CAU",
      ],
      { type: "image/*" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "image.jpg";
    element.click();
  };

  return (
    <>
      <Row>
        <Col span={6} className="flex items-center">
          <p className="text-center" style={{
            wordBreak: "keep-all",
            whiteSpace: "nowrap",
            width: "100px"
          }}>
            상단 이미지
          </p>

          {topFixImgData.previewURL.includes("null") ?
            <Button disabled style={{
              width: "120px",
              height: "40px"
            }}>
              미설정
            </Button>
          :
            <Button type="primary" style={{
              width: "120px",
              height: "40px"
            }} onClick={() => { topFixImgData.previewURL.includes("null") ? message.info("no image") : window.open(topFixImgData.previewURL ? `${topFixImgData.previewURL}` : fallback) }}>
              설정됨
            </Button>
          }
        </Col>

        <Col span={6} className="flex items-center">
          <p className="text-center" style={{
            wordBreak: "keep-all",
            whiteSpace: "nowrap",
            width: "100px"
          }}>
            하단 이미지
          </p>

          {bottomFixImgData.previewURL.includes("null") ?
            <Button disabled style={{
              width: "120px",
              height: "40px"
            }}>
              미설정
            </Button>
          :
            <Button type="primary" style={{
              width: "120px",
              height: "40px"
            }} onClick={() => { bottomFixImgData.previewURL.includes("null") ? message.info("no image") : window.open(bottomFixImgData.previewURL ? `${bottomFixImgData.previewURL}` : fallback) }}>
              설정됨
            </Button>
          }
        </Col>
      </Row>
    </>
  );
};

export default TopBottomSelectImg;
