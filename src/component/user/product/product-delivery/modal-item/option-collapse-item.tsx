import { ApolloError, useMutation } from "@apollo/client";
import { Checkbox, Image, Input, message, Col, Row } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { ChangeEvent, useState, Dispatch, SetStateAction } from "react";
import MUTATIONS from "src/apis/mutations";
import { onApolloError } from "src/common/functions";
import { CalculatePriceType, ItemInputType, OptionValueType } from "../detail-modal";
import {
  Mutation,
  MutationSetVisibleStateToProductOptionValueBySomeoneArgs,
  MutationUpdateProductByUserArgs,

  Product,
  ProductOption,
  ProductOptionName,
  ProductOptionNameUpdateInput,
  ProductOptionUpdateInput,
  ProductOptionValueUpdateInput,
  ProductThumbnailUpdateInput,
  QuerySelectMyProductByUserArgs,
} from "src/types";

interface Props {
  id: number;
  isNotLast: boolean;
  index: number;
  name: string;
  itemInput: ItemInputType;
  itemOptionData: ProductOption[];
  itemDescription: string;
  optionData: ProductOptionName[];
  optionValue: OptionValueType[];
  thumbnailImage: any[];
  selectProductId: number;
  calculatePriceData: CalculatePriceType;
  shippingCode: number;
  selectCategoryItem: string;
  sillData: string;
  searchTags: string;
  inputValue: string;
  imageValue: string;
  inputOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isActive: boolean;
  onProductRefetch: () => void;
}

const OptionCollapseItem = ({
  id,
  isNotLast,
  index,
  name,
  inputValue,
  imageValue,
  itemInput,
  itemOptionData,
  itemDescription,
  optionData,
  optionValue,
  thumbnailImage,
  selectProductId,
  calculatePriceData,
  shippingCode,
  selectCategoryItem,
  sillData,
  searchTags,
  inputOnChange,
  isActive,
  onProductRefetch
}: Props) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [setVisibleStateToProductOptionValueBySomeone] = useMutation<
    {
      setVisibleStateToProductOptionValueBySomeone: Mutation["setVisibleStateToProductOptionValueBySomeone"];
    },
    MutationSetVisibleStateToProductOptionValueBySomeoneArgs
  >(MUTATIONS.SET_VISIBLE_STATE_TO_PRODUCT_OPTION_VALUE_BY_SOMEONE);

  const [updateProductByUser] = useMutation<
    { updateProductByUser: Product },
    MutationUpdateProductByUserArgs
  >(MUTATIONS.UPDATE_PRODUCT_DATA);

  const onUpdateProduct = async () => {
    const options: ProductOptionUpdateInput[] = itemOptionData.map((v) => ({
      id: v.id,
      isActive: v.isActive,
      price: v.price,
      stock: v.stock
    }));
    const optionNames: ProductOptionNameUpdateInput[] = optionData.map((v) => ({
      id: v.id,
      name: v.name,
    }));
    const optionValues: ProductOptionValueUpdateInput[] = optionValue.map(
      (v) => ({
        id: v.id,
        isActive: v.isActive,
        name: v.name,
        image: v.image,
        newImage: v.newImage,
      })
    );
    const thumbnails: ProductThumbnailUpdateInput[] = thumbnailImage.map(
      (v) => {
        const { uploadImagePreview, ...etc } = v;
        return etc;
      }
    );
    const variables: MutationUpdateProductByUserArgs = {
      productId: selectProductId,
      name: itemInput.name,
      price: itemInput.price,
      description: itemDescription,
      shippingFee: itemInput.shippingFee,
      localShippingFee: calculatePriceData.localShippingFee,
      localShippingCode: shippingCode,
      options,
      optionNames,
      optionValues,
      thumbnails,
      categoryCode: selectCategoryItem ? selectCategoryItem : null,
      siilCode: sillData ? sillData : null,
      searchTags: searchTags ? searchTags : "",
    };
    await updateProductByUser({
      variables,
    })
      .then(() => {
        message.success("상품 정보가 변경되었습니다.");
      })
      .catch((e: ApolloError) => {
        message.error(e.message);
      });
  };

  const onCheck = async (e: CheckboxChangeEvent) => {
    if (isProcessing) return;

    setIsProcessing(true);
    
    await onUpdateProduct();

    await setVisibleStateToProductOptionValueBySomeone({
      variables: { 
        productOptionValueId: id, 
        isActive: e.target.checked 
      },
    }).then(async() => {
      await onProductRefetch();
    })
    .catch(onApolloError)
    .finally(() => setIsProcessing(false));
  };

  return (
    <div>
      <Row>
        <Col span={1} style={{textAlign: "center", paddingTop: 12}}>
          <Checkbox checked={isActive} onChange={onCheck} />
        </Col>

        <Col span={1} style={{textAlign: "center", paddingTop: 12}}>
          {`${index + 1}`.padStart(2, "0")}
        </Col>

        <Col span={1} style={{textAlign: "center", paddingTop: 8}}>
          {imageValue ? <Image src={/^https?:\/\//.test(imageValue) ? imageValue : `http://img.sellforyou.co.kr/sellforyou/${imageValue}`} height={32} alt="" /> : null}
        </Col>
        
        <Col span={6} style={{textAlign: "left", padding: "8px 8px 0px 0px"}}>
          <Input
            disabled
            style={{
              cursor: "text",
              color: "gray",
            }}
            value={name}
          />
        </Col>

        <Col span={15} style={{textAlign: "left", padding: "8px 8px 0px 0px"}}>
          <div style={{position: "relative"}}>
            <Input
              style={{
                position: "absolute",
                width: "100%"
              }}
              value={inputValue}
              onChange={inputOnChange}
            />

            <Input 
              disabled
              style={{
                cursor: "text",
                color: "gray",
                position: "absolute",
                width: "75px",
                marginLeft: 1,
                textAlign: "center",
                right: "0"
              }}
              value={inputValue.length.toString() + "/25"} 
            />
          </div>
        </Col>
      </Row>

    </div>

    // <div
    //   className="flex"
    //   style={{
    //     padding: "5px 0 5px 20px",
    //     borderBottom: isNotLast ? "1px solid #e0e0e0" : "",
    //   }}
    // >
    //   <Checkbox checked={isActive} onChange={onCheck} />
    //   <span className="ml-2" style={{ width: "181px" }}>
    //     {`${index + 1}`.padStart(2, "0")}.{name}
    //   </span>
    //   <Input
    //     className="optionsInput"
    //     style={{
    //       width: "100%"
    //     }}
    //     value={inputValue}
    //     onChange={inputOnChange}
    //   />
    // </div>
  );
};

export default OptionCollapseItem;
