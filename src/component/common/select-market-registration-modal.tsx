import {
  Col,
  Form,
  Modal,
  Row,
  Button,
  message,
  Card,
  FormInstance,
} from "antd";
import React, { useRef, useState } from "react";

interface Props {
  visible: boolean;
  closeMarketRegistrationModal: () => void;
  selectedItemIds?: number[];
  itemLengthRefetch?: () => void;
}

export interface ISelect {
  id: number | undefined;
  state: boolean;
  index: number;
}

const SelectMarketRegistrationModal = ({
  visible,
  closeMarketRegistrationModal,
  selectedItemIds,
  itemLengthRefetch,
}: Props) => {
  const filterRef = useRef<FormInstance<any>>(null);

  const [selectSet, setSelectSet] = useState<Array<ISelect>>([]);

  const handleSubmit = () => {};

  return (
    <Modal
      width="600px"
      className="user-market-info-modal"
      visible={visible}
      onCancel={() => {
        closeMarketRegistrationModal();
        setSelectSet([]);
        filterRef.current.resetFields();
      }}
      footer={false}
      mask={true}
      transitionName="fade"
      centered
      closable={false}
    >
      <Row style={{ marginBottom: "30px" }}>
        <Col style={{ margin: "0 auto", fontSize: "20px", fontWeight: "bold" }}>
          선택 상품 마켓 일괄 등록{" "}
          {selectedItemIds?.length !== 0 && `(${selectedItemIds?.length}건)`}
        </Col>
      </Row>
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} ref={filterRef}>
        <div>연동하고자 하는 판매채널 판매자 ID와 세트정보를 선택하세요</div>
        <div>
          11번가, 메이크샵, 마이소호 연동시 세트정보 내에 개별카테고리를 꼭
          설정해주셔야 합니다.
        </div>

        <Card>
          <table>
            <thead>
              <tr>
                <td style={{ width: "40px" }}></td>
                <td style={{ width: "200px" }}>판매채널</td>
                <td style={{ width: "400px" }}>세트 아이디</td>
              </tr>
            </thead>
          </table>
        </Card>
        <Button
          style={{ display: "flex", margin: "20px auto 0 auto" }}
          type="primary"
          htmlType="submit"
          // className='w-full'
          onClick={() => {
            if (selectSet.filter((v) => v.state === true).length === 0) {
              message.error("판매채널을 선택해주세요.");
            } else {
              if (
                selectSet
                  .filter((v) => v.state === true)
                  .find((v) => v.id === undefined)
              ) {
                message.error("세트를 선택해주세요.");
              } else {
                handleSubmit();
              }
            }
          }}
        >
          마켓상품 연동하기
        </Button>
      </Form>
    </Modal>
  );
};

export default SelectMarketRegistrationModal;
