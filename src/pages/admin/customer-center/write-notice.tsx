import { Card, Row, Col, Input, Button, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import MUTATIONS from "src/apis/mutations";
import {
  MutationCreateNoticeByAdminArgs,
  MutationUpdateNoticeByAdminArgs,
  Notice,
  QuerySelectNoticesByEveryoneArgs,
} from "src/types";
import querystring from "query-string";
import QUERIES from "src/apis/queries";

import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImageDrop } from "quill-image-drop-module";
Quill.register("modules/imageDrop", ImageDrop);

const toolbar = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: ["small", false, "large", "huge"] }, { color: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      ['link', 'image', 'video'],
      // ["clean"],
    ],
    // handlers: {},
    // imageDrop: true
  },
  // imageResize,
  // clipboard: { matchVisual: false },
  // imageDrop: true,
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "size",
  "color",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
];

const WriteNotice = () => {
  const history = useHistory();
  const queryStringValue = querystring.parse(history.location.search);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

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
      setTitle(title);
      setContent(content);
    }
  }, [noticesData]);

  const quillRef = useRef<ReactQuill>(null);

  const [createNoticeByAdmin] = useMutation<
    { createNoticeByAdmin: Boolean },
    MutationCreateNoticeByAdminArgs
  >(MUTATIONS.CREATE_NOTICE_BY_ADMIN);

  const [updateNoticeByAdmin] = useMutation<
    { updateNoticeByAdmin: Boolean },
    MutationUpdateNoticeByAdminArgs
  >(MUTATIONS.UPDATE_NOTICE_BY_ADMIN);

  const createButton = () => {
    if (!title) {
      message.error("????????? ??????????????????.");
      return;
    } else if (!content) {
      message.error("????????? ??????????????????.");
      return;
    }
    createNoticeByAdmin({
      variables: { title: title, content: content },
    })
      .then((res) => {
        message.success("??????????????? ?????????????????????.");
        setTimeout(() => history.goBack(), 500);
      })
      .catch((e: ApolloError) => {
        message.error(e);
      });
  };

  const updateButton = () => {
    if (!title) {
      message.error("????????? ??????????????????.");
      return;
    } else if (!content) {
      message.error("????????? ??????????????????.");
      return;
    }
    updateNoticeByAdmin({
      variables: {
        noticeId: Number(queryStringValue.id),
        title: title,
        content: content,
        attachment: null,
      },
    })
      .then((res) => {
        message.success("??????????????? ?????????????????????.");
        setTimeout(() => history.goBack(), 500);
      })
      .catch((e: ApolloError) => {
        message.error(e);
      });
  };

  return (
    <Card
      title={
        <div>
          ???????????? {!noticesData?.selectNoticesByEveryone ? "??????" : "??????"}
        </div>
      }
    >
      <Row align="middle" className="mb-5">
        <Col className="mr-3">??????</Col>
        <Col className="w-11/12">
          <Input
            value={title}
            spellCheck={false}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Col>
      </Row>

      <Row>
        <Col className="mr-3">??????</Col>
        <Col className="w-11/12">
          <ReactQuill
            style={{ width: "100%", height: "300px", display: "inline-block" }}
            ref={quillRef}
            value={content}
            onChange={(content) => setContent(content)}
            modules={toolbar}
            formats={formats}
          />
        </Col>
      </Row>
      <Row justify="center" className="mt-6">
        <Col>
          <Button
            type={"primary"}
            style={{ fontSize: "20px", fontWeight: 700, height: "40px" }}
            onClick={() => {
              !noticesData?.selectNoticesByEveryone
                ? createButton()
                : updateButton();
            }}
          >
            {!noticesData?.selectNoticesByEveryone ? "??????" : "??????"}
          </Button>
        </Col>
        <Col>
          <Button
            style={{
              fontSize: "20px",
              fontWeight: 700,
              height: "40px",
              marginLeft: "20px",
            }}
            onClick={() => {
              history.goBack();
            }}
          >
            ??????
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default WriteNotice;
