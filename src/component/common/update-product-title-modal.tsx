import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { Col, Modal, Row, Button, message, Input } from "antd";
import React, { useEffect, useState } from "react";
import MUTATIONS from "src/apis/mutations";
import { MutationUpdateManyProductNameByUserArgs, User } from "src/types";

interface Props {
  visible: boolean;
  closeUpdateProductTitleModal: () => void;
  selectedItemIds?: number[];
}

const UpdateProductTitleModal = ({
  visible,
  closeUpdateProductTitleModal,
  selectedItemIds,
}: Props) => {
  const [headText, setHeadText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [tailText, setTailText] = useState("");
  
  const [isProcessing, setIsProcessing] = useState(false);

  const [updateProductNameMutation] = useMutation<
    { updateProductNameByUser: number },
    MutationUpdateManyProductNameByUserArgs
  >(MUTATIONS.UPDATE_MANY_PRODUCT_NAME, {
    refetchQueries: ["SELECT_MY_PRODUCT_LIST"],
  });

  const onUpdateProductNameMutation = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);

    await updateProductNameMutation({
      variables: {
        productIds: selectedItemIds,
        headText: headText,
        bodyText: bodyText,
        tailText: tailText
      },
    }).then(() => {
      message.success("키워드가 추가되었습니다.");

      closeUpdateProductTitleModal();
    }).catch((e: ApolloError) => {
      message.error(e.message);
    }).finally(() => setIsProcessing(false));
  };

  useEffect(() => {
    setHeadText("");
    setBodyText("");
    setTailText("");
  }, [visible]);

  return (
    <Modal
      width="600px"
      // className="user-market-info-modal"
      visible={visible}
      onCancel={() => {
        closeUpdateProductTitleModal();
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
          상품명 일괄설정

          &nbsp;

          {selectedItemIds?.length !== 0 && `(${selectedItemIds?.length}건)`}
        </Col>
      </Row>
      <Row align="middle" style={{ 
        paddingBottom: 4,
        fontSize: 16
      }}>
        <Col span={10}>상품명</Col>
        <Col span={14}>
          <Input
            style={{ width: "100%" }}
            value={bodyText}
            onChange={(e) => {
              setBodyText(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row align="middle" style={{ 
        paddingBottom: 4,
        fontSize: 16
      }}>
        <Col span={10}>상품명 앞에 추가될 문구</Col>
        <Col span={14}>
          <Input
            style={{ width: "100%" }}
            value={headText}
            onChange={(e) => {
              setHeadText(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row align="middle" style={{ 
        paddingBottom: 4,
        fontSize: 16
      }}>
        <Col span={10}>상품명 뒤에 추가될 문구</Col>
        <Col span={14}>
          <Input
            style={{ width: "100%" }}
            value={tailText}
            onChange={(e) => {
              setTailText(e.target.value);
            }}
          />
        </Col>
      </Row>

      <br />

      <div style={{textAlign: "center"}}>
        <Button
          type="primary"
          onClick={onUpdateProductNameMutation}
        >
          추가
        </Button>

        &nbsp;

        <Button 
          onClick={closeUpdateProductTitleModal}
        >
          취소
        </Button>
      </div>
    </Modal>
  );
};

export default UpdateProductTitleModal;
