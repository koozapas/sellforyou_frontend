import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { Col, Modal, Row, Button, message, Input } from "antd";
import React, { useEffect, useState } from "react";
import MUTATIONS from "src/apis/mutations";
import { MutationUpdateManyProductTagByUserArgs, User } from "src/types";
import { EditOutlined } from "@ant-design/icons";

interface Props {
  visible: boolean;
  closeUpdateProductOptionNameModal: () => void;
  selectedItemIds?: number[];
}

const UpdateProductOptionNameModal = ({
  visible,
  closeUpdateProductOptionNameModal,
  selectedItemIds,
}: Props) => {
  const [searchTags, setSearchTags] = useState("");
  
  const [isProcessing, setIsProcessing] = useState(false);

  const [updateProductTagMutation] = useMutation<
    { updateProductTagByUser: number },
    MutationUpdateManyProductTagByUserArgs
  >(MUTATIONS.UPDATE_MANY_PRODUCT_TAG, {
    refetchQueries: ["SELECT_MY_PRODUCT_LIST"],
  });

  const onUpdateProductTagMutation = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);

    await updateProductTagMutation({
      variables: {
        productIds: selectedItemIds,
        searchTags: searchTags
      },
    }).then(() => {
      message.success("옵션명이 변경되었습니다.");

      closeUpdateProductOptionNameModal();
    }).catch((e: ApolloError) => {
      message.error(e.message);
    }).finally(() => setIsProcessing(false));
  };

  useEffect(() => {
    setSearchTags("")
  }, [visible]);

  return (
    <Modal
      width="600px"
      visible={visible}
      onCancel={() => {
        closeUpdateProductOptionNameModal();
      }}
      footer={false}
      mask={true}
      transitionName="fade"
      centered
      closable={false}
    >
      <Row>
        <Col
          style={{
            margin: "0 auto 30px auto",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          옵션명 일괄설정

          &nbsp;

          {selectedItemIds?.length !== 0 && `(${selectedItemIds?.length}건)`}
        </Col>
      </Row>
      <Row align="middle" style={{ 
        paddingBottom: 4,
        fontSize: 16
      }}>
        <Col span={24} style={{
          textAlign: "center"
        }}>
          <Button size="middle" icon={<EditOutlined />} style={{
            color: "gray",
            marginRight: 5
          }} onClick={() => {
            // setOptionValue(optionValue.map((v1, i1) => {
            //   for (var i in v.productOptionValue) {
            //     if (v1.id === v.productOptionValue[i].id) {
            //       return { ...v1, "name": (parseInt(i) + 1).toString().padStart(2, "0") };
            //     }
            //   }

            //   return { ...v1 };
            // }));
          }}>
            일괄수정(0-9)
          </Button>

          <Button size="middle" icon={<EditOutlined />} style={{
              color: "gray",
              marginRight: 5
            }} onClick={() => {
              // setOptionValue(optionValue.map((v1, i1) => {
              //   for (var i in v.productOptionValue) {
              //     if (v1.id === v.productOptionValue[i].id) {
              //       var s = '', t: any;
              //       var i2 = parseInt(i) + 1;

              //       while (i2 > 0) {
              //         t = (i2 - 1) % 26;
              //         s = String.fromCharCode(65 + t) + s;
              //         i2 = (i2 - t) / 26 | 0;
              //       }

              //       return { ...v1, "name": s };
              //     }
              //   }

              //   return { ...v1 };
              // }));
            }}>
              일괄수정(A-Z)
          </Button>
        </Col>
      </Row>

      <br />

      <div style={{textAlign: "center"}}>
        <Button
          type="primary"
          onClick={onUpdateProductTagMutation}
        >
          변경
        </Button>

        &nbsp;

        <Button 
          onClick={closeUpdateProductOptionNameModal}
        >
          취소
        </Button>
      </div>
    </Modal>
  );
};

export default UpdateProductOptionNameModal;
