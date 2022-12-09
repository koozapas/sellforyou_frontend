import React, { Dispatch, SetStateAction, useState } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, message, Upload } from "antd";
import { IMAGE_SERVER } from "src/apis/client";

import {
    CloseOutlined
  } from "@ant-design/icons";

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
    const [imageExtension, setImageExtension] = useState<any>({});

    const handleChange = (result) => {
        if (!result.destination) return;

        const items = [...thumbnailImage];
        const [reorderedItem] = items.splice(result.source.index, 1);

        items.splice(result.destination.index, 0, reorderedItem);
    
        setThumbnailImage(items);
    };

    return (
        <div style={{
            display: "inline"
        }}>
            <DragDropContext onDragEnd={handleChange}>
                <Droppable droppableId="todos" direction="horizontal">
                    {(provided) => (
                    <ul
                        className="todos"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                            display: 'flex',
                            overflow: "scroll"
                        }}
                    >
                        {thumbnailImage.map((v, i) => {
                            const defaultImage = /^https?:\/\//.test(v.defaultImage) ? v.defaultImage : IMAGE_SERVER + "/" + v.defaultImage;
                            const image = v.uploadImagePreview === "" ? defaultImage : v.uploadImagePreview;

                            return <Draggable key={i + 1} draggableId={(i + 1).toString()} index={i}>
                                {(provided) => (
                                <li
                                    ref={provided.innerRef}
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                >
                                    <div style={{
                                            border: "1px solid lightgray",
                                            marginRight: "10px",
                                            position: "relative",
                                            width: "270px",
                                        }}
                                    >
                                        {i === 0 ? 
                                            <div style={{
                                                backgroundColor: "white",
                                                border: "1px solid red",
                                                color: "red",
                                                fontSize: 16,
                                                height: 40,
                                                left: 5,
                                                padding: "7px 4px 4px 4px",
                                                position: "absolute",
                                                textAlign: "center",     
                                                top: 5,
                                            }}>
                                                대표이미지
                                            </div> 
                                            : 
                                            null
                                        }

                                        <img src={image} alt="" onLoad={async () => {
                                            // let image_resp = await fetch(image);
                                            // let image_blob = await image_resp.blob();
                                            // let image_ext = image_blob.type.split("/")[1];
                                            // let image_list = imageExtension;

                                            // image_list[i] = image_ext === "jpeg" ? "JPG" : image_ext.toUpperCase();

                                            // setImageExtension(image_list);

                                            // console.log(JSON.stringify(image_list));
                                        }} />
                                        
                                        <Button
                                            icon={<CloseOutlined />}
                                            type="primary"
                                            danger
                                            style={{
                                                position: "absolute",
                                                width: 40,
                                                height: 40,
                                                top: 5,
                                                left: 224,
                                            }}
                                            onClick={() => {
                                                setThumbnailImage(
                                                    thumbnailImage.filter(
                                                        (v1) =>
                                                            (/^https?:\/\//.test(v1.defaultImage)
                                                            ? v1.defaultImage
                                                            : /^data:image/.test(v1.defaultImage)
                                                            ? v1.defaultImage
                                                            : `${IMAGE_SERVER}/${v1.defaultImage}`) !== image
                                                    )
                                                );
                                            }}
                                        />

                                        {/* <div style={{
                                            backgroundColor: "white",
                                            border: "1px solid black",
                                            bottom: 5,
                                            color: "black",
                                            fontSize: 16,
                                            height: 40,
                                            left: 5,
                                            padding: "7px 4px 4px 4px",
                                            position: "absolute",
                                            textAlign: "center",     
                                            width: 40,
                                        }}>
                                            {imageExtension[i] ?? "..."}
                                        </div> */}
                                    </div>
                                </li>
                                )}
                            </Draggable>;
                        })}
                        {provided.placeholder}
                    </ul>
                    )}
                </Droppable>
            </DragDropContext>

            <Dragger
                style={{
                width: "270px",
                maxHeight: "270px",
                display: "inline-flex",
                top: "10px",
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
                <span style={{ 
                  display: "inline-block",
                  fontSize: "60px",
                  fontWeight: 300,
                  padding: "60px 0 120px 0",
                }}>
                    +
                </span>
            </Dragger>
        </div>
    );
};
  
export default ProductDetailModalThumbnail;
