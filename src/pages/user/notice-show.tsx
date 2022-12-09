import React, { useEffect, useState } from "react";
import querystring from "query-string";
import QUERIES from "src/apis/queries";

import { Button, Card, Descriptions } from "antd";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Notice, QuerySelectNoticesByEveryoneArgs } from "src/types";

const ShowNotice = () => {
  const history = useHistory();

  const queryStringValue = querystring.parse(history.location.search);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");

  const { data: noticesData } = useQuery<
    { selectNoticesByEveryone: Notice[] },
    QuerySelectNoticesByEveryoneArgs
  >(QUERIES.NOTICE_DATA_LIST, {
    variables: { where: { id: { equals: Number(queryStringValue.id) } } },
    skip: !queryStringValue.id,
  });

  useEffect(() => {
    if (noticesData?.selectNoticesByEveryone[0]) {
      const title = noticesData.selectNoticesByEveryone[0].title;
      const content = noticesData.selectNoticesByEveryone[0].content;
      const createdAt = noticesData.selectNoticesByEveryone[0].createdAt;

      setTitle(title);
      setContent(content);
      setCreatedAt(createdAt);
    }
  }, [noticesData]);

  return (
    <Card>
      <Descriptions
        bordered
        labelStyle={{ textAlign: "center", width: "120px" }}
        style={{ marginBottom: "10px" }}
      >
        <Descriptions.Item label="제목" span={3}>
          {title}
        </Descriptions.Item>

        <Descriptions.Item label="작성자" span={3}>
          셀포유 관리자
        </Descriptions.Item>

        <Descriptions.Item label="등록일" span={3}>
          {createdAt.split("T")[0]}
        </Descriptions.Item>
        
        <Descriptions.Item label="내용" span={3}>
          <div dangerouslySetInnerHTML={ {__html: content} } />
        </Descriptions.Item>
      </Descriptions>

      <Button type="primary" onClick={() => {
        history.push(
          `/user/notice/`
        );
      }}>
        목록으로 이동
      </Button>
    </Card>
  );
};

export default ShowNotice;
