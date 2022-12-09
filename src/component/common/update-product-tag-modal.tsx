import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { Col, Modal, Row, Button, message, Input } from "antd";
import React, { useEffect, useState } from "react";
import MUTATIONS from "src/apis/mutations";
import { MutationUpdateManyProductTagByUserArgs, User } from "src/types";

interface Props {
  visible: boolean;
  closeUpdateProductTagModal: () => void;
  selectedItemIds?: number[];
}

const UpdateProductTagModal = ({
  visible,
  closeUpdateProductTagModal,
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
      message.success("검색태그가 변경되었습니다.");

      closeUpdateProductTagModal();
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
        closeUpdateProductTagModal();
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
          검색태그 일괄설정

          &nbsp;

          {selectedItemIds?.length !== 0 && `(${selectedItemIds?.length}건)`}
        </Col>
      </Row>
      <Row align="middle" style={{ 
        paddingBottom: 4,
        fontSize: 16
      }}>
        <Col span={6}>
          검색태그
        </Col>

        <Col span={18}>
          <Input
            style={{ width: "100%" }}
            value={searchTags}
            onChange={(e) => {
              setSearchTags(e.target.value);
            }}
          />
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
          onClick={closeUpdateProductTagModal}
        >
          취소
        </Button>
      </div>
    </Modal>
  );
};

export default UpdateProductTagModal;
