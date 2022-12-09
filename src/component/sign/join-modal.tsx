import React, { useState } from "react";

import MUTATIONS from "src/apis/mutations";

import {
  MutationRequestPhoneVerificationByEveryoneArgs,
  MutationSignInUserByEveryoneArgs,
  MutationSignUpUserByEveryoneArgs,
  MutationVerifyPhoneByEveryoneArgs,
  SignInType,
  UserSocialType,
} from "src/types";

import { regexPattern } from "src/common/regex";
import { ApolloError, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Col, Form, Input, message, Modal, Row, Button, Statistic } from "antd";

const { Search } = Input;
const { Countdown } = Statistic;

interface Props {
  visible: boolean;
  closeJoinModal: () => void;
  openLoginModal: () => void;
}

interface IInputs {
  email: string;
  password: string;
  passwordCheck: string;
  address: string;
  addressDetail: string;
  phone: string;
  verifyNumber: string;
}

const initialInputs: IInputs = {
  email: "",
  password: "",
  passwordCheck: "",
  address: "",
  addressDetail: "",
  phone: "",
  verifyNumber: "",
};

const JoinModal = ({ visible, closeJoinModal, openLoginModal }: Props) => {
  const history = useHistory();

  const [inputs, setInputs] = useState<IInputs>(initialInputs);
  const [isVerifySend, setIsVerifySend] = useState<boolean>(false); // 인증 요청 유무
  const [isVerifySend2, setIsVerifySend2] = useState<boolean>(false); // 인증 체크
  const [isVerifySend3, setIsVerifySend3] = useState<boolean>(false); // 인증 번호 체크
  
  const changeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs((p) => ({ ...p, [name]: value }));
  };

  const [signInUser] = useMutation<
    { signInUserByEveryone: SignInType },
    MutationSignInUserByEveryoneArgs
  >(MUTATIONS.SIGN_IN_USER, { fetchPolicy: "no-cache" });

  const [signUpUser] = useMutation<
    { signUpUserByEveryone: String },
    MutationSignUpUserByEveryoneArgs
  >(MUTATIONS.SIGN_UP_USER, { fetchPolicy: "no-cache" });

  const [requestPhoneVerification] = useMutation<
    { requestPhoneVerificationByEveryone: Boolean },
    MutationRequestPhoneVerificationByEveryoneArgs
  >(MUTATIONS.REQUEST_PHONE_VERIFICATION);

  const [verifyPhone] = useMutation<
    { verifyPhoneByEveryone: Number },
    MutationVerifyPhoneByEveryoneArgs
  >(MUTATIONS.VERIFY_PHONE);

  const successSignUp = () => {
    signInUser({
      variables: {
        userType: "EMAIL" as UserSocialType,
        email: inputs.email,
        password: inputs.password,
      },
    })
    .then((response: any) => {
      const token = response.data?.signInUserByEveryone;
      localStorage.setItem("accessToken", token.accessToken);
      localStorage.setItem("refreshToken", token.refreshToken);
      closeJoinModal();
      setInputs(initialInputs);
    })
    .catch((e: ApolloError) => {
      message.error(e.message);
    });
  };

  return (
    <>
      <Modal
        visible={visible}

        onCancel={() => {
          setInputs(initialInputs);
          closeJoinModal();
        }}

        footer={false}
        transitionName=""
        centered
        closable={false}
        className="join-modal"
        width={"auto"}
      >
        <Row className="account-title" justify={"center"} align={"middle"}>
          회원가입
        </Row>

        <Form
          autoComplete={"off"}
          onFinish={() => {
            const { email, password, passwordCheck, phone } = inputs;

            if (!regexPattern.email.test(email)) {
              message.error("이메일을 형식에 맞게 입력해주세요.");
              return;
            }
            if (password !== passwordCheck) {
              message.error("비밀번호를 확인해주세요.");
              return;
            }
            if (password.length < 7) {
              message.error("비밀번호는 8자리 이상으로 입력해주세요.");
              return;
            }
            if (!regexPattern.phone.test(phone)) {
              message.error("휴대전화를 형식에 맞게 입력해주세요.");
              return;
            }
            if (!isVerifySend3) {
              message.error("전화번호 인증을 완료해주세요.");
              return;
            }

            signUpUser({
              variables: {
                email,
                password,
                phone,
                verificationId: 0,
              },
            })
              .then(() => {
                alert("회원가입이 완료되었습니다.");
                closeJoinModal();
                setInputs(initialInputs);
                successSignUp();
              })
              .catch((e: ApolloError) => {
                message.error(e.message);
              });
          }}
        >
          <Form.Item label="" className="mb-2">
            <Input
              autoComplete={"off"}
              type="email"
              size="large"
              placeholder="이메일"
              name="email"
              value={inputs.email}
              onChange={changeInputs}
              spellCheck={false}
            />
          </Form.Item>

          <Form.Item label="" className="mb-2">
            <Input.Password
              autoComplete={"new-password"}
              name="password"
              size="large"
              placeholder="비밀번호"
              value={inputs.password}
              onChange={changeInputs}
              spellCheck={false}
            />
          </Form.Item>

          <Form.Item label="" className="mb-2">
            <Input.Password
              name="passwordCheck"
              size="large"
              placeholder="비밀번호 확인"
              value={inputs.passwordCheck}
              onChange={changeInputs}
              spellCheck={false}
            />
          </Form.Item>

          <Form.Item label="" className="mb-4">
            <Search
              type="tel"
              name={"phone"}
              size="large"
              placeholder="휴대전화"
              readOnly={isVerifySend2}
              value={inputs.phone}
              onChange={changeInputs}
              spellCheck={false}
              enterButton={
                isVerifySend && !isVerifySend3 ? (
                  <span
                    onClick={() => {
                      if (isVerifySend) {
                        return;
                      }
                    }}
                  >
                    <Countdown
                      style={{ width: "48px" }}
                      value={Date.now() + 1000 * 1 * 60}
                      format={"mm:ss"}
                      valueStyle={{ fontSize: "14px", color: "#fff" }}
                      onFinish={() => setIsVerifySend(false)}
                    />
                  </span>
                ) : (
                  "인증요청"
                )
              }
              maxLength={15}
              onSearch={(value) => {
                if (!isVerifySend3)
                  if (!regexPattern.phone.test(value)) {
                    message.error("휴대전화를 입력해주세요");
                  }
                  else if (isVerifySend) {
                    message.error("인증을 완료해주세요");
                  }
                  else {
                    if (!isVerifySend) {
                      requestPhoneVerification({
                        variables: { phoneNumber: value },
                      })
                      .then((res) => {
                        setInputs({ ...inputs, phone: value });
                        
                        setIsVerifySend(true);
                        setIsVerifySend2(true);
                      })
                      .catch((e: ApolloError) => {
                        message.info(e.message, 10);
                      });
                    }
                  }
              }}
            />
          </Form.Item>
          
          {isVerifySend2 && !isVerifySend3 ?
            <Form.Item label="" className="mb-4">
              <Search
                size="large"
                placeholder="인증번호"
                onChange={changeInputs}
                spellCheck={false}
                enterButton="인증"
                onSearch={(value) => {
                  verifyPhone({
                    variables: { 
                      phoneNumber: inputs.phone,
                      verificationNumber: value
                    },
                  })
                    .then((res) => {
                      message.success("인증이 완료되었습니다.")
                    })
                    .catch((e: ApolloError) => {
                      message.info(e.message, 10);
                    });
                  setIsVerifySend3(true);
                }}
              />
            </Form.Item>
          :
            null
          }

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
            회원가입
          </Button>

          <Button
            className="w-full"
            style={{
              height: "44px",
              borderRadius: "4px",
              fontSize: "16px",
            }}
            onClick={() => {
              openLoginModal();
              closeJoinModal();
              setInputs(initialInputs);
            }}
          >
            로그인으로 돌아가기
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default JoinModal;
