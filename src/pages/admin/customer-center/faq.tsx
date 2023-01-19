import React, { useEffect, useState } from "react";
import { Card, Tabs, Collapse, Input, Button, Row, Col, message } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import QUERIES from "src/apis/queries";
import {
  FaqCategory,
  MutationCreateFaqCategoryByAdminArgs,
  MutationDeleteFaqByAdminArgs,
  MutationDeleteFaqCategoryByAdminArgs,
  MutationModifyFaqCategoryByAdminArgs,
  MutationSortFaqCategoryByAdminArgs,
} from "src/types";
import MUTATIONS from "src/apis/mutations";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { onApolloError } from "src/common/functions";

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Search } = Input;

interface ISortClassContents extends FaqCategory {
  key: string;
  index: number;
}
interface IonSortEnd {
  oldIndex: number;
  newIndex: number;
}

const SortableItem = SortableElement(({ ...props }) => <div {...props} />);
const SortContainer = SortableContainer(({ ...props }) => <div {...props} />);

const AdminFaq = () => {
  const history = useHistory();

  const [faqData, setFaqData] = useState<Array<FaqCategory>>([]);
  const [sortCategory, setSortCategory] = useState<Array<ISortClassContents>>([]);

  //FAQ 데이터 뽑기
  const { data: faqListData } = useQuery<{
    selectFaqCategoriesByEveryone: FaqCategory[];
  }>(QUERIES.FAQ_DATA_LIST, { onError: onApolloError });

  //카테고리 생성
  const [createFaqCategoryBtAdmin] = useMutation<{ createFaqCategoryByAdmin: FaqCategory }, MutationCreateFaqCategoryByAdminArgs>(
    MUTATIONS.CREATE_FAQ_CATEGORY_BY_ADMIN,
    {
      refetchQueries: ["FAQ_DATA_LIST"],
    }
  );
  //카테고리 삭제
  const [deleteFaqCategoryByAdmin] = useMutation<{ deleteFaqCategoryByAdmin: Boolean }, MutationDeleteFaqCategoryByAdminArgs>(
    MUTATIONS.DELETE_FAQ_CATEGORY_BY_ADMIN,
    {
      refetchQueries: ["FAQ_DATA_LIST"],
    }
  );
  //카테고리 수정
  const [modifyFaqCategoryByAdmin] = useMutation<{ modifyFaqCategoryByAdmin: FaqCategory }, MutationModifyFaqCategoryByAdminArgs>(
    MUTATIONS.MODIFY_FAQ_CATEGORY_BY_ADMIN
  );

  //faq 삭제
  const [deleteFaqByAdmin] = useMutation<{ deleteFaqByAdmin: Number }, MutationDeleteFaqByAdminArgs>(MUTATIONS.DELETE_FAQ_BY_ADMIN, {
    refetchQueries: ["FAQ_DATA_LIST"],
  });

  useEffect(() => {
    if (faqListData?.selectFaqCategoriesByEveryone) setFaqData(faqListData?.selectFaqCategoriesByEveryone);
  }, [faqListData]);

  const createFaqCategory = (e) => {
    if (e) {
      createFaqCategoryBtAdmin({ variables: { name: e } })
        .then((res) => {
          message.success("FAQ 카테고리가 추가되었습니다.");
        })
        .catch((e: ApolloError) => {
          message.error(e.message);
        });
    } else {
      message.error("추가할 카테고리명을 입력해주세요.");
    }
  };

  //카테고리 수정
  const modifyFaqCategory = (id) => {
    const tempData = faqData.filter((v) => v.id === id)[0];
    if (tempData)
      modifyFaqCategoryByAdmin({
        variables: { faqCategoryId: id, name: tempData.name, isActive: true },
      })
        .then((res) => {
          message.success("FAQ 카테고리가 수정되었습니다.");
        })
        .catch((e: ApolloError) => {
          message.error(e.message);
        });
  };

  //카테고리 삭제
  const deleteSelectionFaqCategory = (e) => {
    deleteFaqCategoryByAdmin({ variables: { faqCategoryId: Number(e) } })
      .then((res) => {
        message.success("FAQ 카테고리가 삭제되었습니다.");
      })
      .catch((e: ApolloError) => {
        message.error(e.message);
      });
  };

  //FAQ 삭제
  const deleteSelectionFaq = (e) => {
    deleteFaqByAdmin({ variables: { faqIds: e } })
      .then((res) => {
        message.success("FAQ가 삭제되었습니다.");
      })
      .catch((e: ApolloError) => {
        message.error(e.message);
      });
  };

  //////////sort//////////
  useEffect(() => {
    const createDataSource = (category: FaqCategory[]): ISortClassContents[] => {
      return category.map((v, i) => ({
        key: String(i + 1),
        index: i,
        id: v.id,
        name: v.name,
        order: v.order,
        isActive: v.isActive,
        faq: v.faq,
      }));
    };
    // 쿼리결과에 key, index 추가
    if (faqListData) {
      setSortCategory(createDataSource(faqListData?.selectFaqCategoriesByEveryone));
    }
  }, [faqListData]);

  const onSortEnd = ({ oldIndex, newIndex }: IonSortEnd) => {
    let data;
    if (sortCategory) {
      data = [...sortCategory];
    }
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(data as any), oldIndex, newIndex).filter((el) => !!el);
      setSortCategory(newData);
    }
  };

  const DraggableContainer = ({ ...props }) => <SortContainer useDragHandle disableAutoscroll helperClass="row-dragging" onSortEnd={onSortEnd} {...props} />;

  const DraggableBodyRow = ({ ...props }) => {
    let data;
    if (sortCategory) {
      data = [...sortCategory];
    }
    const index = data?.findIndex((x) => x.index === props["data-row-key"]);
    return <SortableItem index={index ?? 0} {...props} />;
  };

  return (
    <Card>
      <Row align="middle" justify="space-between" style={{ marginBottom: "20px" }}>
        <Row>
          <Col style={{ fontSize: "16px", fontWeight: 600 }}>FAQ</Col>
        </Row>
        <Row>
          <Col>
            <Search
              style={{ width: "300px" }}
              placeholder="카테고리를 입력해주세요."
              enterButton="등록"
              onSearch={(e) => {
                createFaqCategory(e);
              }}
            />
          </Col>
          <Col>
            <Button
              type="primary"
              style={{ marginLeft: "20px" }}
              onClick={() => {
                history.push("/admin/customer-center/write-faq");
              }}
            >
              FAQ 등록하기
            </Button>
          </Col>
        </Row>
      </Row>

      <Tabs
        type="editable-card"
        hideAdd
        onEdit={(targetKey) => {
          deleteSelectionFaqCategory(targetKey);
        }}
        onTabClick={(e) => {
          DraggableContainer(sortCategory);
          DraggableBodyRow(sortCategory);
        }}
      >
        {faqData.map((categoryVal, categoryIndex) => {
          return (
            <TabPane
              key={categoryVal.id}
              tab={
                <Row align="middle">
                  <Col>
                    <Input
                      style={{ padding: 0, width: "150px" }}
                      addonAfter={
                        <span
                          style={{ fontSize: "12px" }}
                          onClick={() => {
                            modifyFaqCategory(categoryVal.id);
                          }}
                        >
                          수정
                        </span>
                      }
                      value={categoryVal.name}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFaqData((p) => {
                          const s = [...p];
                          s.splice(categoryIndex, 1, {
                            ...s[categoryIndex],
                            name: value,
                          });
                          return [...s];
                        });
                      }}
                    />
                  </Col>
                </Row>
              }
            >
              <Collapse accordion>
                {categoryVal.faq.map((faqVal) => (
                  <Panel
                    showArrow={false}
                    key={faqVal.id}
                    header={
                      <Row justify="space-between" align="middle">
                        <Col>
                          <span style={{ fontSize: "16px", fontWeight: 700 }}>Q. {faqVal.title}</span>
                        </Col>
                        <Col>
                          <Button
                            style={{ width: "100px" }}
                            type="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              history.push("/admin/customer-center/write-faq?id=" + faqVal.id);
                            }}
                          >
                            수정
                          </Button>
                          <Button
                            style={{ width: "100px", marginLeft: "20px" }}
                            type="primary"
                            danger
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSelectionFaq(faqVal.id);
                            }}
                          >
                            삭제
                          </Button>
                        </Col>
                      </Row>
                    }
                  >
                    <div dangerouslySetInnerHTML={{ __html: faqVal.content }}></div>
                  </Panel>
                ))}
              </Collapse>
            </TabPane>
          );
        })}
      </Tabs>
    </Card>
  );
};

export default AdminFaq;
