import React, { useState } from "react";
import { Button, Row, Input, Form, Typography, message, Col } from "antd";
import MUTATIONS from "src/apis/mutations";
import { useDispatch } from "react-redux";
import { ApolloError, useMutation } from "@apollo/client";
import LOGO from "src/assets/image/logo.png";
// import {
//   Admin,
//   MutationAddAdminArgs,
//   MutationAdminSignInArgs,
//   SignInType,
// } from "src/types";
import { useHistory } from "react-router-dom";
import { regexPattern } from "src/common/regex";

const FormItem = Form.Item;
const { Text } = Typography;

export interface ISignInFrom {
  id: string;
  password: string;
}

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [adminSignIn, { loading: adminLoading }] = useMutation<
  //   { adminSignIn: SignInType },
  //   MutationAdminSignInArgs
  // >(MUTATIONS.SIGN_IN);

  // const [addAdmin] = useMutation<{ addAdmin: Admin }, MutationAddAdminArgs>(
  //   MUTATIONS.ADD_ADMIN
  // );

  // const onAdminSignIn = (data: ISignInFrom) => {
  //   adminSignIn({ variables: { id: data.id, password: data.password } })
  //     .then((response) => {
  //       const token = response.data?.adminSignIn;
  //       token?.accessToken &&
  //         localStorage.setItem("celebAdminToken", token?.accessToken);
  //       token?.refreshToken &&
  //         localStorage.setItem("refreshCelebAdminToken", token?.refreshToken);
  //       history.push("/");
  //     })
  //     .catch((error: ApolloError) => {
  //       message.error("로그인 실패");
  //       console.log(error.message);
  //     });
  // };

  // const adminSignIn = (data: ISignInFrom) => {
  //   setLoading(true);
  //   client
  //     .mutate({
  //       mutation: MUTATIONS.SIGN_IN,
  //       variables: { data: { id: data.id, password: data.password } },
  //     })
  //     .then((response: any) => {
  //       const token = response.data.adminSignIn;
  //       localStorage.setItem("celebAdminToken", token.accessToken);
  //       localStorage.setItem("refreshCelebAdminToken", token.refreshToken);
  //       client
  //         .query({ query: QUERIES.ADMIN_MYINFO })
  //         .then((result) => {
  //           const adminInfo = result.data.admin;
  //           Dispatch(
  //             userAction.logInSuccess({
  //               adminId: adminInfo.adminId,
  //               id: adminInfo.id,
  //               level: adminInfo.level,
  //             })
  //           );
  //           setLoading(false);
  //           browserHistory.push("/");
  //         })
  //         .catch((error: ApolloError) => {
  //           console.log("Statistic query error : ", error.message);
  //         });
  //     })
  //     .catch((error: ApolloError) => {
  //       setLoading(false);
  //       alert("로그인 실패");
  //     });
  // };

  return (
    <div className="sign-root">
      <div className="signin-wrap">
        <Form
          className="signin-contents-wrap"
          // onFinish={(e: ISignInFrom) => onAdminSignIn(e)}
        >
          <Row className="logo-wrap">
            <Row>
              <img className="logo" alt="logo" src={LOGO} />
              <Text strong className="logo-text">
                마스터 관리자
              </Text>
            </Row>
          </Row>
          <FormItem
            label="아이디ㅤ"
            labelAlign="right"
            name="id"
            rules={[
              {
                required: true,
                message: "아이디를 입력해 주세요",
              },
            ]}
            hasFeedback
          >
            <Input
              placeholder={"아이디"}
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </FormItem>
          <FormItem
            label="비밀번호"
            name="password"
            rules={[
              {
                required: true,
                message: "비밀번호를 입력해 주세요",
              },
            ]}
            hasFeedback
          >
            <Input
              type="password"
              placeholder={"비밀번호"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormItem>
          <Col>
            <Button
              block
              type="primary"
              htmlType="submit"
              // loading={adminLoading}
            >
              로그인
            </Button>
          </Col>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
