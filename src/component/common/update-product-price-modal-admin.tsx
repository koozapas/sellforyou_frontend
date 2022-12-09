import { ApolloError, useMutation } from "@apollo/client";
import { Col, Modal, Row, Button, message, Input } from "antd";
import React, { useEffect, useState } from "react";
import MUTATIONS from "src/apis/mutations";
import { MutationUpdateProductPriceByAdminArgs } from "src/types";

interface Props {
  visible: boolean;
  closeUpdateProductPriceModal: () => void;
  selectedItemIds?: number[];
}

const UpdateProductPriceModalAdmin = ({
  visible,
  closeUpdateProductPriceModal,
  selectedItemIds,
}: Props) => {
  const [marginRate, setMarginRate] = useState("");
  const [cnyRate, setCnyRate] = useState("");
  const [shippingFee, setShippingFee] = useState("");
  const [localShippingFee, setLocalShippingFee] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [updateProductPriceMutation] = useMutation<
    { updateProductPriceByAdmin: number },
    MutationUpdateProductPriceByAdminArgs
  >(MUTATIONS.UPDATE_PRODUCT_PRICE_BY_ADMIN, {
    refetchQueries: ["SELECT_MY_PRODUCT_LIST"],
  });

  const onUpdateProductPriceMutation = async () => {
    if (isProcessing) return;

    if (!cnyRate) {
      alert("환율을 입력해주세요.");

      return;
    }

    if (!marginRate) {
      alert("마진율을 입력해주세요.");

      return;
    }

    if (!localShippingFee) {
      alert("해외비송비를 입력해주세요.");

      return;
    }
    if (!shippingFee) {
      alert("유료배송비를 입력해주세요.");
      return;
    }
    setIsProcessing(true);

    await updateProductPriceMutation({
      variables: {
        productIds: selectedItemIds,
        cnyRate: Number(cnyRate),
        marginRate: Number(marginRate),
        localShippingFee: Number(localShippingFee),
        localShippingCode: Number(0),
        shippingFee: Number(shippingFee),
      },
    })
      .then(() => {
        message.success("가격이 설정되었습니다.");
        closeUpdateProductPriceModal();
      })
      .catch((e: ApolloError) => {
        message.error(e.message);
      })
      .finally(() => setIsProcessing(false));
  };

  useEffect(() => {
    setMarginRate("");
    setCnyRate("");
    setShippingFee("");
    setLocalShippingFee("");
  }, [visible]);

  return (
    <Modal
      width="400px"
      className="user-market-info-modal"
      visible={visible}
      onCancel={() => {
        closeUpdateProductPriceModal();
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
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          가격 변경

          &nbsp;
          
          {selectedItemIds?.length !== 0 && `(${selectedItemIds?.length}건)`}
        </Col>
      </Row>
      <Row justify="center" align="middle" style={{ paddingBottom: "4px" }}>
        <Col span={6}>환율(¥)</Col>
        <Col>
          <Input
            style={{ width: "120px" }}
            maxLength={20}
            value={cnyRate}
            onChange={(e) => setCnyRate(e.target.value.replace(/[^0-9]/, ""))}
          />
        </Col>
      </Row>
      <Row justify="center" align="middle" style={{ padding: "4px 0" }}>
        <Col span={6}>마진율</Col>
        <Col>
          <Input
            style={{ width: "120px" }}
            value={marginRate}
            maxLength={3}
            onChange={(e) => {
              setMarginRate(e.target.value.replace(/[^0-9]/, ""));
            }}
          />
        </Col>
      </Row>
      <Row justify="center" align="middle" style={{ padding: "4px 0" }}>
        <Col span={6}>해외배송비</Col>
        <Col>
          <Input
            style={{ width: "120px" }}
            maxLength={20}
            value={localShippingFee}
            onChange={(e) => {
              setLocalShippingFee(e.target.value.replace(/[^0-9]/, ""));
            }}
          />
        </Col>
      </Row>
      <Row justify="center" align="middle" style={{ padding: "4px 0" }}>
        <Col span={6}>유료배송비</Col>
        <Col>
          <Input
            style={{ width: "120px" }}
            maxLength={20}
            value={shippingFee}
            onChange={(e) => {
              setShippingFee(e.target.value.replace(/[^0-9]/, ""));
            }}
          />
        </Col>
      </Row>

      <Button
        type="primary"
        style={{ display: "flex", margin: "20px auto 0 auto" }}
        onClick={onUpdateProductPriceMutation}
      >
        가격 설정하기
      </Button>
    </Modal>
  );
};

export default UpdateProductPriceModalAdmin;
