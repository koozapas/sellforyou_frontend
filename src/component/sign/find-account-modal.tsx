import {
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Statistic,
  Button,
} from "antd";
import React, { useState } from "react";
import { regexPattern } from "src/common/regex";

const { Countdown } = Statistic;
const { confirm } = Modal;
interface Props {
  visible: boolean;
  closeFindModal: () => void;
  openLoginModal: () => void;
}
interface IIdInputs {
  name: string;
  phone: string;
  verifyNumber: string;
}
interface IPwInputs extends IIdInputs {
  email: string;
}

const initialIdInputs: IIdInputs = {
  name: "",
  phone: "",
  verifyNumber: "",
};

const initialPwInputs: IPwInputs = {
  email: "",
  name: "",
  phone: "",
  verifyNumber: "",
};

const FindAccountModal = ({
  visible,
  closeFindModal,
  openLoginModal,
}: Props) => {
  const [findPhase, setFindPhase] = useState<boolean>(false); // 아디 비번 전환
  const [idInputs, setIdInputs] = useState<IIdInputs>(initialIdInputs); // ID찾기 인풋
  const [pwInputs, setPwInputs] = useState<IPwInputs>(initialPwInputs); // PW찾기 인풋
  const [isIdVerifySend, setIsIdVerifySend] = useState<boolean>(false); // id 인증 요청 유무
  const [isPwVerifySend, setIsPwVerifySend] = useState<boolean>(false); // ps 인증 요청 유무

  const changeIdInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setIdInputs((p) => ({ ...p, [name]: value }));
  }; // id찾기 입력

  const changePwInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setPwInputs((p) => ({ ...p, [name]: value }));
  }; // pw찾기 입력

  const requestVerify = (
    value: string,
    isVerify: boolean,
    setVerifySend: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!regexPattern.phone.test(value)) {
      message.error("휴대전화를 입력해주세요.");
    } else if (isVerify) {
      message.error("인증을 완료해주세요.");
    } else {
      message.info("인증번호를 확인해주세요. (임시로 111111)");
      setVerifySend(true);
    }
  }; // 인증 요청

  const onCountDown = (
    isVerifySend: boolean,
    setVerifySend: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (isVerifySend) {
      return (
        <span
          onClick={() => {
            if (isVerifySend) {
              confirm({
                title: "번호를 변경 하시겠습니까?",
                // content: <div style={{ color: 'red' }}>카테고리 미입력 시 상품관리 메뉴에서 각 상품마다 개별적인 설정이 필요합니다.<br /> 입력을 안하고 수집하시겠습니까?</div>,
                centered: true,
                onOk() {
                  setVerifySend(false)
                  setIdInputs(initialIdInputs)
                  setPwInputs(initialPwInputs)
                },
              })
              return;
            }
          }}
        >
          <Countdown
            style={{ width: '48px' }}
            value={Date.now() + 1000 * 10 * 60}
            format={"mm:ss"}
            valueStyle={{ fontSize: "14px", color: "#fff" }}
            onFinish={() => setVerifySend(false)}
          />
        </span>
      );
    } else {
      return "인증요청";
    }
  }; // 카운트다운

  const onVerify = (
    value: string,
    isVerify: boolean,
    setVerifySend: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!isVerify) {
      message.error("인증 요청을 해주세요.");
    } else if (value !== "111111") {
      message.error("올바른 인증번호가 아닙니다.");
    } else {
      message.success("인증되었습니다.");
      setVerifySend(false);
    }
  }; // 인증 완료

  return (
    <Modal
      visible={visible}
      onCancel={() => {
        closeFindModal();
        setIdInputs(initialIdInputs);
        setPwInputs(initialPwInputs);
      }}
      footer={false}
      transitionName=""
      centered
      closable={false}
      className="find-modal"
      width={"auto"}
    >
      <Row className="account-title" justify={"center"} align={"middle"}>
        내 계정 찾기
      </Row>
      <Row justify={"space-between"} gutter={8}>
        <Col span={12}>
          <Button
            className={`w-full  find-top-id-button ${!findPhase ? "active" : ""} `}
            type={!findPhase ? "primary" : "default"}
            onClick={() => {
              setFindPhase(false);
              setPwInputs(initialPwInputs);
            }}
          >
            ID찾기
          </Button>
        </Col>
        <Col span={12}>
          <Button
            className={`w-full find-top-pw-button ${findPhase ? "active" : ""}`}
            type={findPhase ? "primary" : "default"}
            onClick={() => {
              setFindPhase(true);
              setIdInputs(initialIdInputs);
            }}
          >
            PW찾기
          </Button>
        </Col>
      </Row>
      {!findPhase ? (
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          className="find-form"
        >
          <Form.Item label="이름" className="mb-4">
            <Input
              name={"name"}
              value={idInputs.name}
              onChange={changeIdInputs}
              spellCheck={false}
            />
          </Form.Item>
          <Form.Item label="휴대전화" className="mb-4">
            <Row>
              <Col span={24}>
                <Input.Search
                  name={"phone"}
                  value={idInputs.phone}
                  onChange={changeIdInputs}
                  spellCheck={false}
                  enterButton={onCountDown(isIdVerifySend, setIsIdVerifySend)}
                  maxLength={15}
                  onSearch={(value) => {
                    requestVerify(value, isIdVerifySend, setIsIdVerifySend);
                  }}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="인증번호">
            <Input.Search
              name={"verifyNumber"}
              value={idInputs.verifyNumber}
              onChange={changeIdInputs}
              spellCheck={false}
              enterButton={"　인증　"}
              onSearch={(value) => {
                onVerify(value, isIdVerifySend, setIsIdVerifySend);
              }}
            />
          </Form.Item>
          <Button type='primary' htmlType="submit" className="find-button">
            찾기
          </Button>
        </Form>
      ) : (
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          className="find-form"
        >
          <Form.Item label="아이디" className="mb-4">
            <Input
              name={"email"}
              value={pwInputs.email}
              onChange={changePwInputs}
              spellCheck={false}
            />
          </Form.Item>
          <Form.Item label="이름" className="mb-4">
            <Input
              name={"name"}
              value={pwInputs.name}
              onChange={changePwInputs}
              spellCheck={false}
            />
          </Form.Item>
          <Form.Item label="휴대전화" className="mb-4">
            <Input.Search
              name={"phone"}
              value={pwInputs.phone}
              onChange={changePwInputs}
              spellCheck={false}
              enterButton={onCountDown(isPwVerifySend, setIsPwVerifySend)}
              maxLength={15}
              onSearch={(value) => {
                requestVerify(value, isPwVerifySend, setIsPwVerifySend);
              }}
            />
          </Form.Item>
          <Form.Item label="인증번호">
            <Input.Search
              name={"verifyNumber"}
              value={pwInputs.verifyNumber}
              onChange={changePwInputs}
              spellCheck={false}
              enterButton={"　인증　"}
              onSearch={(value) => {
                onVerify(value, isPwVerifySend, setIsPwVerifySend);
              }}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="find-button">
            찾기
          </Button>
        </Form>
      )}
      <Row>
        <Col
          onClick={() => {
            closeFindModal();
            openLoginModal();
            setFindPhase(false);
            setIdInputs(initialIdInputs);
            setPwInputs(initialPwInputs);
          }}
          className="mt-4 cursor-pointer login-back"
        >
          로그인으로 돌아가기
        </Col>
      </Row>
    </Modal>
  );
};

export default FindAccountModal;
