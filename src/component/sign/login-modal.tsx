import React, { useState } from "react";

import MUTATIONS from "src/apis/mutations";

import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import { ApolloError, useMutation } from "@apollo/client";

import {
  MutationSignInUserByEveryoneArgs,
  MutationCreateUserLogArgs,
  SignInType,
  UserSocialType,
} from "src/types";

import { useHistory } from "react-router-dom";

interface Props {
  visible: boolean;
  closeLoginModal: () => void;
  openFindModal: () => void;
  openJoinModal: () => void;
}

interface IInputs {
  email: string;
  password: string;
}
const initialInputs = {
  email: "",
  password: "",
};

const LoginModal = ({
  visible,
  closeLoginModal,
  openFindModal,
  openJoinModal,
}: Props) => {
  const history = useHistory();

  const [inputs, setInputs] = useState<IInputs>(initialInputs);
  
  const changeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs((p) => ({ ...p, [name]: value }));
  };

  const [createUserLogByUserMutation] = useMutation<
    { createUserLogByUser: boolean },
    MutationCreateUserLogArgs
  >(MUTATIONS.CREATE_USER_LOG_BY_USER, {});

  const [signInUser] = useMutation<
    { signInUserByEveryone: SignInType },
    MutationSignInUserByEveryoneArgs
  >(MUTATIONS.SIGN_IN_USER, { fetchPolicy: "no-cache" });

  return (
    <Modal
      visible={visible}
      onCancel={() => {
        closeLoginModal();
        setInputs(initialInputs);
      }}
      footer={false}
      transitionName=""
      centered
      closable={false}
      className="login-modal"
      width={"auto"}
    >
      <Row className="account-title" justify={"center"} align={"middle"}>
        로그인
      </Row>

      <Form
        onFinish={() => {
          signInUser({
            variables: {
              userType: "EMAIL" as UserSocialType,
              email: inputs.email,
              password: inputs.password,
            },
          })
          .then(async (response: any) => {
            const token = response.data?.signInUserByEveryone;

            localStorage.setItem("accessToken", token.accessToken);
            localStorage.setItem("refreshToken", token.refreshToken);

            alert("로그인되었습니다.");
            
            closeLoginModal();

            setInputs(initialInputs);
          })
          .catch((e: ApolloError) => {
            message.error(e.message);
          });
        }}
      >
        <Form.Item label="" className="mb-2">
          <Input
            placeholder="아이디"
            name="email"
            size="large"
            value={inputs.email}
            onChange={changeInputs}
            spellCheck={false}
          />
        </Form.Item>

        <Form.Item label="" className="mb-4">
          <Input.Password
            placeholder="비밀번호"
            name="password"
            size="large"
            value={inputs.password}
            onChange={changeInputs}
            spellCheck={false}
          />
        </Form.Item>

        <Button
          className="w-full mb-2"
          style={{
            height: "44px",
            borderRadius: "4px",
            fontSize: "16px",
          }}
          type="primary"
          htmlType="submit"
        >
          로그인
        </Button>

        <Button
          className="w-full"
          style={{
            height: "44px",
            borderRadius: "4px",
            fontSize: "16px",
          }}
          onClick={() => {
            alert("확장프로그램에서 회원가입 진행해주세요")
            window.open("https://chrome.google.com/webstore/detail/%EC%85%80%ED%8F%AC%EC%9C%A0/cdghhijdbghkgklajgahabkbbpijddlo?hl=ko");
          }}
        >
          회원가입
        </Button>
      </Form>
    </Modal>
  );
};

export default LoginModal;
