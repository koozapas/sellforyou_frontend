import React, { useState } from "react";
import { Card, Table, Button, Row, Col, Input, message } from "antd";
import { useHistory } from "react-router-dom";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import QUERIES from "src/apis/queries";
import { Notice, MutationDeleteNoticeByAdminArgs, QuerySelectNoticesByEveryoneArgs } from "src/types";
import MUTATIONS from "src/apis/mutations";
import { format } from "date-fns";

const { Search } = Input;

interface Props {}

const columns = [
  {
    title: "순번",
    dataIndex: "id",
    width: "10%",
  },
  {
    title: "제목",
    dataIndex: "title",
    ellipsis: true,
    width: "70%",
  },
  {
    title: "등록일자",
    dataIndex: "createdAt",
    render: (data: string) => format(new Date(data), "yyyy-MM-dd"),
    width: "20%",
  },
];

const NoticeWrapPage = (props: Props) => {
  const history = useHistory();
  const [pageSize, setPageSize] = useState<number>(10); // n개씩 보기
  const [selectedItemIds, setSelectedItemIds] = useState<Array<number>>([]);

  const { data: noticesData, loading: noticesLoading } = useQuery<{ selectNoticesByEveryone: Notice[] }, QuerySelectNoticesByEveryoneArgs>(
    QUERIES.NOTICE_DATA_LIST
  );

  const [deleteNoticeByAdmin] = useMutation<{ deleteNoticeByAdmin: number }, MutationDeleteNoticeByAdminArgs>(MUTATIONS.DELETA_NOTICE_BY_ADMIN, {
    refetchQueries: ["NOTICE_DATA_LIST"],
  });

  const rowSelection = {
    selectedRowKeys: selectedItemIds,
    onSelect: (record: Notice, selected: boolean, selectedRows: Notice[], nativeEvent: any) => {
      let tempData = [...selectedItemIds];
      if (selected) {
        tempData.push(record.id ?? 0);
        setSelectedItemIds(tempData);
      } else {
        setSelectedItemIds(tempData.filter((v) => v !== record.id));
      }
    },
    onSelectAll: (selected: any, selectedRows: any, changeRows: Notice[]) => {
      if (selected) {
        let tempData = [...selectedItemIds];
        selectedRows.map((v: Notice) => v && tempData.push(v.id ?? 0));
        const set = Array.from(new Set(tempData)); // 중복 제거
        setSelectedItemIds(set);
      } else {
        //한페이지에 선택된 항목만 제거
        const selectedRowsUserId = changeRows.map((v) => v.id);
        setSelectedItemIds(selectedItemIds.filter((v) => !selectedRowsUserId.includes(v as number)));
      }
    },
  };

  return (
    <Card>
      <Row className="mr-20px" justify="space-between">
        <Row align="middle">
          <Col style={{ fontSize: "16px", fontWeight: 600, marginRight: "50px" }}>공지사항</Col>
        </Row>
        <Row>
          <Col style={{ marginRight: "20px" }}>
            <Search
              style={{ display: "inline-block", width: "227px" }}
              type="number"
              placeholder="데이터 출력 수"
              enterButton="변경"
              onSearch={(e) => {
                setPageSize(Number(e));
              }}
            />
          </Col>
          <Col style={{ marginRight: "20px" }}>
            <Button
              type="primary"
              onClick={() => {
                history.push("/admin/customer-center/write-notice");
              }}
            >
              공지사항 등록
            </Button>
          </Col>
          <Col>
            <Button
              danger
              type="primary"
              onClick={() => {
                if (selectedItemIds.length === 0) {
                  message.error("선택하신 공지사항이 없습니다.");
                  return;
                }

                deleteNoticeByAdmin({
                  variables: { noticeIds: selectedItemIds },
                })
                  .then((res) => {
                    message.success("공지사항이 삭제 되었습니다.");
                  })
                  .catch((e: ApolloError) => message.error(e));
              }}
            >
              삭제
            </Button>
          </Col>
        </Row>
      </Row>
      <Table
        size="middle"
        style={{ marginTop: "20px" }}
        rowKey={(record: Notice) => record.id ?? 0}
        rowSelection={rowSelection}
        columns={columns}
        pagination={{
          pageSize: pageSize,
          showSizeChanger: false,
        }}
        loading={noticesLoading}
        dataSource={noticesData?.selectNoticesByEveryone}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              history.push(`/admin/customer-center/write-notice?id=${record.id}`);
            },
          };
        }}
      />
    </Card>
  );
};

export default NoticeWrapPage;
