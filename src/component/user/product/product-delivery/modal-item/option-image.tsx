import { Button, Input, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import React, { Dispatch, SetStateAction } from "react";
import { IMAGE_SERVER } from "src/apis/client";
import ICON from "src/assets/icon";
import { OptionValueType } from "../detail-modal";

import {
  CloseOutlined
} from "@ant-design/icons";

const { Dragger } = Upload;

interface Props {
  optionValue: OptionValueType[];
  setOptionValue: Dispatch<SetStateAction<Props["optionValue"]>>;
}

/** 옵션 이미지 */
const ProductDetailModalOptionImage = ({
  optionValue,
  setOptionValue,
}: Props) => {
  const onClickClose = (i: number) => {
    setOptionValue((s) => {
      const p = [...s];
      p.splice(i, 1, {
        ...p[i],
        image: "",
        newImagePreview: "",
      });
      return p;
    });
  };

  const onDrag = (e: UploadChangeParam<UploadFile<any>>, i: number) => {
    if (!e) return;
    if (e.file) {
      const reader = new FileReader();
      const file = e.file;
      reader.onloadend = () => {
        setOptionValue((s) => {
          const p = [...s];
          const tempValue = {
            ...p[i],
            newImage: file as any,
            newImagePreview: reader.result as string,
          };
          p[i] = tempValue;
          return p;
        });
      };

      reader.readAsDataURL(file as any);
    }
  };

  return (
    <>
      {optionValue.length > 0 ? optionValue.map((v, i) => {
        const defaultImage = /^https?:\/\//.test(v.image) ? v.image : IMAGE_SERVER + "/" + v.image;
        const image = v.newImagePreview === "" ? defaultImage : v.newImagePreview;

        return v.image || v.newImagePreview ? (
          <div
            key={i}
            style={{
              display: "inline-block",
              width: "270px",
              margin: "0px 10px 10px 0px",
            }}
          >
            <Input
              style={{
                border: "1px solid lightgray",
                textAlign: "center",
                marginBottom: 3
              }}
              value={v.name}
            />
            <article
              className="relative"
            >
              <Button
                icon={<CloseOutlined />}
                type="primary"
                danger
                style={{
                    position: "absolute",
                    width: 40,
                    height: 40,
                    top: 6,
                    right: 6,
                }}
                onClick={() => {
                  onClickClose(i)
                }}
              />

              <img
                key={i}
                src={`${image}`}
                style={{
                  border: "1px solid lightgray",

                  display: "inline-block",
                }}
                alt=""
              />
            </article>
            
          </div>
        ) : (
          <div
            key={i}
            style={{
              display: "inline-block",
              width: "270px",
              // fontSize: "18px",
              verticalAlign: "bottom",
              margin: "0px 10px 10px 0px",
            }}
          >
            <div style={{ 
              border: "1px solid lightgray",
              textAlign: "center",
              marginBottom: 3,
              padding: 4,
            }}>
              {v.name}
            </div>

            <Dragger
              style={{
                width: "270px",
              }}
              multiple={false}
              showUploadList={false}
              beforeUpload={() => false}
              accept="image/*"
              onChange={(e) => onDrag(e, i)}
            >
              <span
                style={{
                  display: "inline-block",
                  fontSize: "60px",
                  fontWeight: 300,
                  padding: "71px 0 71px 0",
                }}
              >
                +
              </span>
            </Dragger>
          </div>
        );
      }) : "옵션이미지가 없습니다."}
    </>
  );
};

export default ProductDetailModalOptionImage;
