import { message, Upload } from "antd";
import React, { Dispatch, SetStateAction } from "react";

import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";

import { IMAGE_SERVER } from "src/apis/client";

import ICON from "src/assets/icon";
import arrayMove from "array-move";

const { Dragger } = Upload;

interface Props {
  thumbnailImage: any[];
  setThumbnailImage: Dispatch<SetStateAction<Props["thumbnailImage"]>>;
}

/** 썸네일 이미지 */
const ProductDetailModalThumbnail = ({
  thumbnailImage,
  setThumbnailImage,
}: Props) => {
  //썸네일 소팅
  const Handle = SortableHandle(({ value, tabIndex }) => (
    <img
      tabIndex={tabIndex}
      src={value}
      width="370px"
      style={{
        display: "inline-block",
        // padding: "10px",
        // border: "1px solid black",
        marginRight: "5px",
      }}
      alt=""
    />
  ));

  const SortableItem = SortableElement(({ value, sortNo }) => {
    return (
      <div
        style={{
          display: "inline-block",
          width: "370px",
          marginRight: "10px",
          verticalAlign: "top",
          zIndex: 10000,
        }}
        key={sortNo}
      >
        {sortNo === 0 ? 
          <div style={{
            backgroundColor: "white",
            border: "1px solid red",
            color: "red",
            fontSize: 20,

            marginTop: 22,
            position: "absolute",

            textAlign: "center",            
          }}>
            대표이미지
          </div> 
        : 
          null
        }

        <img
          className="thumbnail-image-x-btn"
          src={ICON.X_ICON.default}
          onClick={() => {
            setThumbnailImage(
              thumbnailImage.filter(
                (v1) =>
                  (/^https?:\/\//.test(v1.defaultImage)
                    ? v1.defaultImage
                    : /^data:image/.test(v1.defaultImage)
                    ? v1.defaultImage
                    : `${IMAGE_SERVER}/${v1.defaultImage}`) !== value
              )
            );
          }}
          alt=""
        />
        <Handle value={value} tabIndex={sortNo} />
      </div>
    );
  });

  const SortableList = SortableContainer(({ items }) => (
    <div style={{ display: "inline" }}>
      {items.map((v: any, i: number) => {
        const defaultImage = /^https?:\/\//.test(v.defaultImage)
          ? v.defaultImage
          : IMAGE_SERVER + "/" + v.defaultImage;
        const image =
          v.uploadImagePreview === "" ? defaultImage : v.uploadImagePreview;

        const collection = 0;

        return <SortableItem key={`item-${i}`} value={image} index={i} collection={collection} sortNo={i} />;
      })}
    </div>
  ));

  return (
    <>
      <SortableList
        useDragHandle
        items={thumbnailImage}
        axis={"xy"}
        onSortEnd={async({oldIndex, newIndex, collection}) => {
          var imageArray = await arrayMove(thumbnailImage, oldIndex, newIndex);

          setThumbnailImage(imageArray);
        }}
      />

      <Dragger
        style={{
          width: "370px",
          maxHeight: "370px",
          display: "inline-flex",
          top: "20px",
        }}
        multiple={false}
        showUploadList={false}
        beforeUpload={() => false}
        accept="image/*"
        onChange={(e) => {
          if (thumbnailImage.length >= 10) {
            message.error("대표이미지는 최대 10장까지 업로드 가능합니다.");
            return;
          }
          if (!e) return;
          if (e.file) {
            const reader = new FileReader();
            const file = e.file;
            reader.onloadend = () => {
              setThumbnailImage((p) =>
                p.concat({
                  defaultImage: reader.result as string,
                  uploadImage: file as any,
                  uploadImagePreview: reader.result as string,
                })
              );
            };

            reader.readAsDataURL(file as any);
          }
        }}
      >
        <span style={{ fontSize: "60px", lineHeight: "0" }}>+</span>
      </Dragger>
    </>
  );
};

export default ProductDetailModalThumbnail;
