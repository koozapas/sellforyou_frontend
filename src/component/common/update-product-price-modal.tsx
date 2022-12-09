import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { Col, Modal, Row, Button, Select, message, Input } from "antd";
import React, { useEffect, useState } from "react";
import MUTATIONS from "src/apis/mutations";
import QUERIES from "src/apis/queries";
import { MutationUpdateProductPriceByUserArgs, User } from "src/types";

const { Option } = Select;

interface Props {
  visible: boolean;
  closeUpdateProductPriceModal: () => void;
  selectedItemIds?: number[];
}

const UpdateProductPriceModal = ({
  visible,
  closeUpdateProductPriceModal,
  selectedItemIds,
}: Props) => {
  const [marginRate, setMarginRate] = useState("");
  const [marginUnitType, setMarginUnitType] = useState("PERCENT");
  const [cnyRate, setCnyRate] = useState("");
  const [shippingFee, setShippingFee] = useState("");
  const [localShippingFee, setLocalShippingFee] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [updateProductPriceMutation] = useMutation<
    { updateProductPriceByUser: number },
    MutationUpdateProductPriceByUserArgs
  >(MUTATIONS.UPDATE_PRODUCT_PRICE_BY_USER, {
    refetchQueries: ["SELECT_MY_PRODUCT_LIST"],
  });


  const onUpdateProductPriceMutation = async () => {
    if (isProcessing) {
      return;
    }
    if (!cnyRate) {
      alert("환율을 입력해주세요.");

      return;
    }

    if (!marginRate) {
      alert("마진율을 입력해주세요.");

      return;
    }

    if (!marginUnitType) {
      alert("마진율 단위를 입력해주세요.");
      
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
        marginUnitType: String(marginUnitType),
        localShippingFee: Number(localShippingFee),
        localShippingCode: null,
        shippingFee: Number(shippingFee),
      },
    }).then(() => {
      message.success("가격이 설정되었습니다.");
      closeUpdateProductPriceModal();
    }).catch((e: ApolloError) => {
      message.error(e.message);
    }).finally(() => setIsProcessing(false));
  };

  return (
    <Modal
      width="400px"
      // className="user-market-info-modal"
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
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          가격 일괄설정

          &nbsp;
          
          {selectedItemIds?.length !== 0 && `(${selectedItemIds?.length}건)`}
        </Col>
      </Row>

      <Row align="middle" style={{ 
        paddingBottom: 24
      }}>
        <Col span={24} style={{
          color: "red",
          fontSize: 14,

          textAlign: "center",
        }}>
          알리익스프레스의 경우 환율과 해외배송비 설정이 무시됩니다.
        </Col>
      </Row>

      <Row align="middle" style={{ 
        paddingBottom: 4
      }}>
        <Col span={12} style={{
          fontSize: 16
        }}>
          환율(¥)
        </Col>

        <Col span={12}>
          <Input
            style={{ 
              width: "100%" 
            }}
            maxLength={20}
            value={cnyRate}
            onChange={(e) => setCnyRate(e.target.value.replace(/[^0-9]/, ""))}
          />
        </Col>
      </Row>
      
      <Row align="middle" style={{ 
        paddingBottom: 4,
        fontSize: 16
      }}>
        <Col span={12}>
          마진율
        </Col>

        <Col span={6}>
          <Input
            style={{ 
              width: "100%" 
            }}
            value={marginRate}
            onChange={(e) => {
              setMarginRate(e.target.value.replace(/[^0-9]/, ""));
            }}
          />
        </Col>

        <Col span={6}>
          <Select style={{
            paddingLeft: 3,
            textAlign: "left",
            width: "100%"
          }} value={marginUnitType} onChange={(e) => {
            setMarginUnitType(e);
          }}>
            <Option value="PERCENT">
              %
            </Option>

            <Option value="WON">
              원
            </Option>
          </Select>
        </Col>
      </Row>

      <Row align="middle" style={{ 
        paddingBottom: 4,
        fontSize: 16
      }}>
        <Col span={12}>
          해외배송비(￦)
        </Col>

        <Col span={12}>
          <Input
            style={{ 
              width: "100%"
            }}
            maxLength={20}
            value={localShippingFee}
            onChange={(e) => {
              setLocalShippingFee(e.target.value.replace(/[^0-9]/, ""));
            }}
          />
        </Col>
      </Row>
      <Row align="middle" style={{ 
        paddingBottom: 4,
        fontSize: 16
      }}>
        <Col span={12}>
          유료배송비(￦)
        </Col>

        <Col span={12}>
          <Input
            style={{ 
              width: "100%"
            }}
            maxLength={20}
            value={shippingFee}
            onChange={(e) => {
              setShippingFee(e.target.value.replace(/[^0-9]/, ""));
            }}
          />
        </Col>
      </Row>

      <br />

      <div style={{textAlign: "center"}}>
        <Button
          type="primary"
          onClick={onUpdateProductPriceMutation}
        >
          변경
        </Button>

        &nbsp;

        <Button 
          onClick={closeUpdateProductPriceModal}
        >
          취소
        </Button>
      </div>
    </Modal>
  );
};

export default UpdateProductPriceModal;
