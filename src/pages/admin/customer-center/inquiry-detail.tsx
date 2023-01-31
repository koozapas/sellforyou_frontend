import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { Button, Card, Descriptions, Input, message } from "antd";
import MUTATIONS from "src/apis/mutations";
import React, { useEffect, useState } from "react";
import { MutationUpdateUserQuestionByAdminArgs, QuerySelectUserQuestionBySomeoneArgs, UserQuestion } from "src/types";
import { useHistory } from "react-router-dom";
import QUERIES from "src/apis/queries";
import querystring from "query-string";
import { IMAGE_SERVER } from "src/apis/client";
import { onApolloError } from "src/common/functions";

const { TextArea } = Input;

const AdminInquiryDetail = () => {
  const history = useHistory();
  const queryStringValue = querystring.parse(history.location.search);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const { data: questionData } = useQuery<{ selectUserQuestionBySomeone: UserQuestion[] }, QuerySelectUserQuestionBySomeoneArgs>(QUERIES.QUESTION_BY_SOMEONE, {
    variables: { where: { id: { equals: Number(queryStringValue.id) } } },
    skip: !queryStringValue.id,
    onError: onApolloError,
  });

  const [updateQuestion] = useMutation<{ updateUserQuestionByAdmin: Boolean }, MutationUpdateUserQuestionByAdminArgs>(MUTATIONS.UPDATE_USER_QUESTION_BY_ADMIN);

  const dataInfo = questionData?.selectUserQuestionBySomeone[0];
  useEffect(() => {
    if (dataInfo) {
      setTitle(dataInfo.title);
      setContent(dataInfo.content);
      setAnswer(dataInfo.answer);
    }
  }, [dataInfo, questionData]);

  const updateHandle = () => {
    updateQuestion({
      variables: {
        answer: answer,
        userQuestionId: Number(queryStringValue.id),
      },
    })
      .then(() => {
        message.success("문의글 답변이 완료되었습니다.");
        setTimeout(() => history.goBack(), 500);
      })
      .catch((e: ApolloError) => {
        message.error(e);
      });
  };

  return (
    <div>
      <Card>
        <Descriptions title="문의하기" bordered labelStyle={{ width: "150px" }} style={{ marginBottom: "30px" }}>
          <Descriptions.Item label="제목" span={3}>
            <Input
              value={title}
              style={{ width: "100%" }}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              readOnly={!queryStringValue.id ? false : true}
            />
          </Descriptions.Item>

          <Descriptions.Item label="내용" span={3}>
            <TextArea
              value={content}
              autoSize={{ minRows: 8, maxRows: 15 }}
              name={"content"}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              readOnly={!queryStringValue.id ? false : true}
              showCount={true}
              maxLength={4000}
              spellCheck={false}
            />
          </Descriptions.Item>

          <Descriptions.Item label="첨부파일" span={3}>
            {questionData?.selectUserQuestionBySomeone[0].attachmentFiles.map((v, i) => (
              <a style={{ marginRight: "10px" }} key={i} href={`${IMAGE_SERVER}/${v}`} download target="_blank" rel="noreferrer">
                {" "}
                첨부파일{i + 1}
              </a>
            ))}
          </Descriptions.Item>

          <Descriptions.Item label="답변 내용" span={3}>
            <TextArea
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              autoSize={{ minRows: 8, maxRows: 15 }}
              name={"answer"}
              maxLength={4000}
              spellCheck={false}
            />
          </Descriptions.Item>
        </Descriptions>

        <Button
          type="primary"
          style={{
            width: "100px",
            height: "50px",
            fontSize: "20px",
            fontWeight: 600,
            marginRight: "30px",
          }}
          onClick={() => {
            updateHandle();
          }}
        >
          답변
        </Button>
        <Button
          type="primary"
          style={{
            width: "100px",
            height: "50px",
            fontSize: "20px",
            fontWeight: 600,
          }}
          onClick={() => {
            history.goBack();
          }}
        >
          목록
        </Button>
      </Card>
    </div>
  );
};

export default AdminInquiryDetail;
