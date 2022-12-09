import React, { useState } from "react";
import {
  Card,
  Descriptions,
  Input,
  Button,
  Row,
  Col,
  Tabs,
  Radio,
  message,
  Affix,
  Spin,
  Modal,
  InputNumber,
} from "antd";
import Dragger from "antd/lib/upload/Dragger";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import MUTATIONS from "src/apis/mutations";
import {
  Category,
  ExcelSampleEnum,
  MutationGetTaobaoItemsByAdminArgs,
  MutationGetTaobaoItemUsingNumIidsByAdminArgs,
  QueryGetExcelSampleUrlBySomeoneArgs,
  TaobaoItemOrderBy,
} from "src/types";
import QUERIES from "src/apis/queries";
import { IMAGE_SERVER } from "src/apis/client";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import CollectionCategoriWrapPage from "./components/collection-categori-wrap-page";
import CollectionSelectSiilWrapPage from "./components/collection-select-siil-wrap-page";
import querystring from 'query-string';
import { useHistory } from "react-router";

const { Search } = Input;
const { confirm } = Modal;
const { TabPane } = Tabs;

const ProductSearch = () => {
  // const queryStringValue = queryString.parse(history.location.search);
  const [searchId, setSearchId] = useState<string>("");
  const [searchWord, setSearchWord] = useState<string>("");
  const [price, setPrice] = useState<{
    startPrice: null | Number;
    endPrice: null | Number;
  }>({
    startPrice: null,
    endPrice: null,
  });
  const [count, setCount] = useState(1);
  const [radioButtonValue, setRadioButtonValue] = useState("SALE");

  //카테고리 대분류 불러오기
  const { data: categoryListData, loading: categoryListLoading } = useQuery<{
    selectCategoriesBySomeone: Category[];
  }>(QUERIES.CATEGORY_LIST, {
    onCompleted: (e) =>
      setSelectCategory0(
        e.selectCategoriesBySomeone.filter(
          (arr, index, callback) =>
            index === callback.findIndex((t) => t.c1 === arr.c1)
        )
      ),
  });

  //카테고리 대분류 목록
  const [selectCategory0, setSelectCategory0] = useState<Category[]>();

  //검색어로 상품 수집
  const [
    getTaobaoItemsUsingWordByAdmin,
    { loading: getTaobaoItemsUsingWordLoading },
  ] = useMutation<
    { getTaobaoItemsByAdmin: Boolean },
    MutationGetTaobaoItemsByAdminArgs
  >(MUTATIONS.GET_TAOBAO_ITEM_WORD_BY_ADMIN);
  const productSearchWord = () => {
    if (price.startPrice || price.endPrice) {
      if (price.startPrice! >= price.endPrice!) {
        message.error("가격 입력이 올바르지 않습니다.");
        return;
      }
    }
    getTaobaoItemsUsingWordByAdmin({
      variables: {
        query: searchWord,
        orderBy: radioButtonValue as TaobaoItemOrderBy,
        startPrice: Number(price.startPrice),
        endPrice: Number(price.endPrice),
        pageCount: count,
        categoryCode: selectCategoryItem2 ? selectCategoryItem2 : null,
        siilCode: sillData2 ? sillData2 : null,
      },
    })
      .then((result) => {
        message.success("검색어로 상품 수집 요청 완료");
      })
      .catch((e: ApolloError) => {
        message.error(e.message);
      });
  };

  //아이디로 상품수집
  const [
    getTaobaoItemUsingIdByAdmin,
    { loading: getTaobaoItemUsingIdLoading },
  ] = useMutation<
    { getTaobaoItemUsingNumIidsByAdmin: Number },
    MutationGetTaobaoItemUsingNumIidsByAdminArgs
  >(MUTATIONS.GET_TAOBAO_ITEM_ID_BY_ADMIN);
  const productSearchId = () => {
    getTaobaoItemUsingIdByAdmin({
      variables: {
        taobaoIds: [searchId],
        categoryCode:
          selectCategoryItem1 !== undefined ? selectCategoryItem1 : null,
        siilCode: sillData1 !== undefined ? sillData1 : null,
      },
    })
      .then((result) => {
        message.success("아이디로 상품 수집 요청 완료");
      })
      .catch((e: ApolloError) => {
        message.error(e.message);
      });
  };

  //엑셀 양식 다운로드
  const { data: getExcelSampleUrlData } = useQuery<
    { getExcelSampleUrlBySomeone: String },
    QueryGetExcelSampleUrlBySomeoneArgs
  >(QUERIES.GET_EXCEL_SAMPLE_URL_BY_SOMEONE, {
    variables: { type: "COLLECT_PRODUCT" as ExcelSampleEnum },
  });

  //카테고리
  const [selectCategoryItem1, setSelectCategoryItem1] = useState<string>();
  const [selectCategoryItem2, setSelectCategoryItem2] = useState<string>();

  //고시정보
  const [sillData1, setSillData1] = useState<string>();
  const [sillData2, setSillData2] = useState<string>();

  //엑셀로 수집
  const [uploadExcelFileByAdmin] = useMutation<
    { getTaobaoItemUsingExcelFileByAdmin: Number },
    {
      data: any;
      categoryCode: String | null;
      siilCode: String | null;
      userId: Number | null;
    }
  >(MUTATIONS.UPLOAD_EXCEL_FILE_BY_ADMIN);

  const handleExcelChangeFile = (event: UploadChangeParam<UploadFile<any>>) => {
    if (!event) return;
    if (event.file) {
      uploadExcelFileByAdmin({
        variables: {
          data: event.file,
          categoryCode: selectCategoryItem2
            ? (selectCategoryItem2 as String)
            : null,
          siilCode: sillData2 ? sillData2 : null,
          userId: null,
        },
      })
        .then((result: any) => {
          message.success("업로드가 완료 되었습니다.");
        })
        .catch((e: ApolloError) => {
          message.error(e.message);
        });
    }
  };

  const sillChange1 = (e: string) => {
    setSillData1(e);
  };
  const sillChange2 = (e: string) => {
    setSillData2(e);
  };


  const history = useHistory();
  const query = querystring.parse(history.location.search);
  const [isDebug] = useState(query.debug === 'true');

  return (
    <Card>
      {(getTaobaoItemUsingIdLoading || getTaobaoItemsUsingWordLoading) && (
        <Affix
          offsetTop={10}
          style={{ position: "absolute", left: "45%", top: "-100px" }}
        >
          <Spin tip="상품 수집중..." />
        </Affix>
      )}

      <Tabs defaultActiveKey="1" type="card">
        {/* 단일상품수집 */}
        <TabPane
          tab={<div className="taps-label-style">단일 상품수집</div>}
          key="1"
        >
          <CollectionCategoriWrapPage
            setSelectCategoryItem={(e) => setSelectCategoryItem1(e)}
            selectCategoryItem={selectCategoryItem1}
            sillChange={(e) => sillChange1(e)}
            selectCategory={selectCategory0}
            categoryListLoading={categoryListLoading}
          />

          <Row align="middle" style={{ marginTop: "4px" }}>
            <div
              style={{
                margin: "10px 30px 10px 0",
                color: "#000000",
                fontSize: "16px",
              }}
            >
              상품 고시정보
            </div>
            <CollectionSelectSiilWrapPage
              setSillData={(e) => setSillData1(e)}
              sillData={sillData1}
            />
          </Row>
          {isDebug && <div>{selectCategoryItem1}<p />{sillData1}</div>}

          <Descriptions bordered style={{ marginTop: "10px" }}>
            <Descriptions.Item label="상품 아이디 / url 수집">
              <Search
                style={{ width: "40%" }}
                placeholder="상품 아이디 또는 url 을 입력해주세요."
                value={searchId}
                enterButton="상품 수집"
                onChange={(e) => setSearchId(e.target.value)}
                onSearch={(e) => {
                  if (searchId !== "") {
                    if (
                      selectCategoryItem1 === undefined ||
                      sillData1 === undefined
                    ) {
                      confirm({
                        title: "상품을 수집하시겠습니까?",
                        content: (
                          <div style={{ color: "red" }}>
                            카테고리 미입력 시 상품관리 메뉴에서 각 상품마다
                            개별적인 설정이 필요합니다.
                            <br /> 입력을 안하고 수집하시겠습니까?
                          </div>
                        ),
                        centered: true,
                        onOk() {
                          productSearchId();
                          setSearchId("");
                        },
                      });
                      return;
                    } else {
                      productSearchId();
                      setSearchId("");
                      return;
                    }
                  }
                  message.error("상품 아이디를 입력해주세요.");
                }}
              />
            </Descriptions.Item>
          </Descriptions>
        </TabPane>

        {/* 대량상품수집 */}
        <TabPane
          tab={<div className="taps-label-style">대량 상품수집</div>}
          key="2"
        >
          <span style={{ fontSize: "12px", color: "red" }}>
            * 대량수집은 시간소요가 발생합니다.
          </span>
          <div style={{ marginBottom: "10px" }}>
            <span
              style={{ fontSize: "16px", fontWeight: 600, marginRight: "50px" }}
            >
              검색어로 수집
            </span>
            <span style={{ marginRight: "15px" }}>
              <Radio.Group
                value={radioButtonValue}
                onChange={(e) => setRadioButtonValue(e.target.value)}
              >
                <Radio value={"SALE"}>판매순</Radio>
                <Radio value={"CREDIT"}>판매자 등급</Radio>
              </Radio.Group>
            </span>
            <span style={{ marginRight: "15px" }}>
              {" "}
              가격 입력 : &nbsp;
              <InputNumber
                style={{ width: "150px" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                onChange={(e) => setPrice({ ...price, startPrice: Number(e) })}
              />
              &nbsp;~&nbsp;
              <InputNumber
                style={{ width: "150px" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                onChange={(e) => setPrice({ ...price, endPrice: Number(e) })}
              />
            </span>
            <span style={{ marginRight: "15px" }}>
              수집 묶음수 : &nbsp;
              <Input
                type="number"
                style={{ width: "70px" }}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
              />
              <span
                style={{
                  fontSize: "12px",
                  color: "#6e6e6e",
                  display: "inline-block",
                  verticalAlign: "bottom",
                  margin: "0 0 -10px 15px",
                }}
              >
                {" "}
                * 1묶음당 20개의 상품을 수집합니다 <br />
                &nbsp;&nbsp;&nbsp;&nbsp;예) 5 입력시 100개 수집
              </span>
            </span>
          </div>

          <CollectionCategoriWrapPage
            setSelectCategoryItem={(e) => setSelectCategoryItem2(e)}
            selectCategoryItem={selectCategoryItem2}
            sillChange={(e) => sillChange2(e)}
            selectCategory={selectCategory0}
            categoryListLoading={categoryListLoading}
          />

          <Row align="middle" style={{ marginTop: "15px" }}>
            <div
              style={{
                margin: "10px 30px 10px 0",
                color: "#000000",
                fontSize: "16px",
              }}
            >
              상품 고시정보
            </div>
            <CollectionSelectSiilWrapPage
              setSillData={(e) => setSillData2(e)}
              sillData={sillData2}
            />
          </Row>

          <Descriptions bordered style={{ margin: "20px 0 0 0" }}>
            <Descriptions.Item label="상품 검색어">
              <Search
                style={{ width: "40%" }}
                placeholder="중국어 또는 영어로 검색해주세요."
                value={searchWord}
                enterButton="상품 수집"
                onChange={(e) => setSearchWord(e.target.value)}
                onSearch={(e) => {
                  if (searchWord !== "") {
                    if (
                      selectCategoryItem2 === undefined ||
                      sillData2 === undefined
                    ) {
                      confirm({
                        title: "상품을 수집하시겠습니까?",
                        content: (
                          <div style={{ color: "red" }}>
                            카테고리 미입력 시 상품관리 메뉴에서 각 상품마다
                            개별적인 설정이 필요합니다.
                            <br /> 입력을 안하고 수집하시겠습니까?
                          </div>
                        ),
                        centered: true,
                        onOk() {
                          productSearchWord();
                          setSearchWord("");
                        },
                      });
                      return;
                    } else {
                      productSearchWord();
                      setSearchWord("");
                      return;
                    }
                  }
                  message.error("상품 검색어를 입력해주세요.");
                }}
              />
            </Descriptions.Item>
          </Descriptions>
        </TabPane>

        {/* 엑셀로 수집 */}
        <TabPane
          tab={<div className="taps-label-style">엑셀로 수집</div>}
          key="3"
        >
          <div>
            <Row style={{ margin: "0 0 10px 0" }} align="middle">
              <Col
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  marginRight: "50px",
                }}
              >
                엑셀로 수집
              </Col>
              <Col>
                <a
                  download
                  href={`${IMAGE_SERVER}/${getExcelSampleUrlData?.getExcelSampleUrlBySomeone}`}
                >
                  <Button>양식 다운로드</Button>
                </a>
              </Col>
            </Row>
            <Dragger
              style={{ width: "100%", padding: "20px 0" }}
              // multiple
              maxCount={1}
              accept={
                "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              }
              beforeUpload={() => false}
              onChange={(e) => {
                if (!e) return;
                if (e.file) {
                  handleExcelChangeFile(e);
                }
              }}
            >
              <span style={{ fontSize: "18px" }}>
                파일을 해당 영역에 드래그 하거나 업로드 하세요.
              </span>
            </Dragger>
          </div>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default ProductSearch;
