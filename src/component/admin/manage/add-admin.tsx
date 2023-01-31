import { ApolloError, useMutation } from "@apollo/client";
import { Button, Card, Form, Input, message } from "antd";
import React, { useState } from "react";
import MUTATIONS from "src/apis/mutations";
import { MutationSignUpAdminByAdminArgs } from "src/types";

interface ISignUpInputs {
  id: string;
  password: string;
}

const ISignUpInputsInitData = {
  id: "",
  password: "",
};

const AddAdminPage = () => {
  const [signUpInputs, setSignUpInputs] = useState<ISignUpInputs>(ISignUpInputsInitData);

  const signUpInputsHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSignUpInputs((p) => ({ ...p, [name]: value }));
  };

  const [adminSignUp] = useMutation<{ signUpAdminByAdmin: Boolean }, MutationSignUpAdminByAdminArgs>(MUTATIONS.SIGN_UP_ADMIN);

  return (
    <Card title="관리자 추가" className="mt-4">
      <Form
        style={{ width: "330px" }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 20 }}
        onFinish={() => {
          if (signUpInputs.id.length === 0 || signUpInputs.password.length === 0) {
            message.error("아이디와 비밀번호를 입력해주세요.");
          } else if (signUpInputs.password.length < 8) {
            message.error("비밀번호는 8자리 이상으로 설정해주세요.");
          } else {
            adminSignUp({ variables: { id: signUpInputs.id, password: signUpInputs.password } })
              .then((response: any) => {
                setSignUpInputs(ISignUpInputsInitData);
                message.success("관리자가 추가되었습니다.");
              })
              .catch((e: ApolloError) => {
                message.error(e.message);
              });
          }
        }}
      >
        <Form.Item label="아이디" className="mb-3">
          <Input placeholder="아이디 입력" name="id" value={signUpInputs.id} onChange={signUpInputsHandle} spellCheck={false} />
        </Form.Item>
        <Form.Item label="비밀번호">
          <Input.Password placeholder="비밀번호 입력" name="password" value={signUpInputs.password} onChange={signUpInputsHandle} spellCheck={false} />
        </Form.Item>
        <Button
          // type="submit"
          type="primary"
          htmlType="submit"
          style={{ margin: "15px 0 0 110px" }}
        >
          관리자 추가
        </Button>
      </Form>
    </Card>
  );
};

export default AddAdminPage;
