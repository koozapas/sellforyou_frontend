import React, { useEffect, useRef, useState } from "react";
import QUERIES from "src/apis/queries";

import { Col, Input, Descriptions, Select, message, Row } from "antd";
import { useLazyQuery, useQuery } from "@apollo/client";

import {
  Category,
  CategorySelectType,
  QuerySearchCategoriesBySomeoneArgs,
  QuerySelectCategoriesByHierarchicalBySomeoneArgs,
  QuerySelectCategoriesBySomeoneArgs,
} from "src/types";

const { Option } = Select;

interface IProps {
  searchKeyword: string;
  selectCategoryItem: string | undefined;
  itemTotal: {
    item1: string | undefined;
    item2: string | undefined;
    item3: string | undefined;
    item4: string | undefined;
  };

  setSearchKeyword: (e: string) => void;
  setSelectCategoryItem: (e: string) => void;
  setItemTotal: (e: any) => void;
}

const CategoriWrapPage = ({
  searchKeyword,
  selectCategoryItem,
  itemTotal,

  setSearchKeyword,
  setSelectCategoryItem,
  setItemTotal
}: IProps) => {
  const [itemClickState, setItemClickState] = useState<Boolean>(true);

  //카테고리 검색
  const [searchCategoryToLazyQuery, { data: searcCategoryData }] = useLazyQuery<
    { searchCategoriesBySomeone: Category[] },
    QuerySearchCategoriesBySomeoneArgs
  >(QUERIES.SEARCH_CATEGORY, { fetchPolicy: "no-cache" });

  const searchKeywordRef = useRef<string | null>(null);

  //카테고리 대분류 불러오기
  const { loading: categoryListLoading } = useQuery<{
    selectCategoriesBySomeone: Category[];
  }>(QUERIES.CATEGORY_LIST, {
    fetchPolicy: "no-cache",
    onCompleted: (e) =>
      setSelectCategory0(
        e.selectCategoriesBySomeone.filter(
          (arr, index, callback) =>
            index === callback.findIndex((t) => t.c1 === arr.c1)
        )
      ),
  });

  //카테고리 중, 소, 세 분류 검색
  const [
    selectCategoryToLazyQuery1,
    { data: selectCategoryData1, loading: selectCategoryLoading1 },
  ] = useLazyQuery<
    { selectCategoriesByHierarchicalBySomeone: CategorySelectType[] },
    QuerySelectCategoriesByHierarchicalBySomeoneArgs
  >(QUERIES.SELECT_CATEGORIES_BY_HIERARCHICAL, { fetchPolicy: "no-cache" });
  const [
    selectCategoryToLazyQuery2,
    { data: selectCategoryData2, loading: selectCategoryLoading2 },
  ] = useLazyQuery<
    { selectCategoriesByHierarchicalBySomeone: CategorySelectType[] },
    QuerySelectCategoriesByHierarchicalBySomeoneArgs
  >(QUERIES.SELECT_CATEGORIES_BY_HIERARCHICAL, { fetchPolicy: "no-cache" });
  const [
    selectCategoryToLazyQuery3,
    { data: selectCategoryData3, loading: selectCategoryLoading3 },
  ] = useLazyQuery<
    { selectCategoriesByHierarchicalBySomeone: CategorySelectType[] },
    QuerySelectCategoriesByHierarchicalBySomeoneArgs
  >(QUERIES.SELECT_CATEGORIES_BY_HIERARCHICAL, { fetchPolicy: "no-cache" });

  const [selectCategoriesToLazyQuery] = useLazyQuery<
    { selectCategoriesBySomeone: Category[] },
    QuerySelectCategoriesBySomeoneArgs
  >(QUERIES.SELECT_CATEGORIES_TO_LAZY_QUERY, { fetchPolicy: "no-cache" });

  //카테고리 대분류 목록
  const [selectCategory0, setSelectCategory0] = useState<Category[]>();

  //카테고리 중, 소, 세 분류 목록
  const [selectCategory1, setSelectCategory1] = useState<
    Array<CategorySelectType>
  >([]);
  const [selectCategory2, setSelectCategory2] = useState<
    Array<CategorySelectType>
  >([]);
  const [selectCategory3, setSelectCategory3] = useState<
    Array<CategorySelectType>
  >([]);

  //중분류 검색
  useEffect(() => {
    if (!selectCategoryLoading1) {
      if (selectCategoryData1?.selectCategoriesByHierarchicalBySomeone) {
        setSelectCategory1(
          selectCategoryData1?.selectCategoriesByHierarchicalBySomeone
        );
        const keywordSearchCode = searchKeywordRef.current
          ? selectCategoryData1?.selectCategoriesByHierarchicalBySomeone.find(
              (v) => searchKeywordRef.current.startsWith(v.code)
            )
          : undefined;
        const code = keywordSearchCode
          ? keywordSearchCode.code
          : selectCategoryData1?.selectCategoriesByHierarchicalBySomeone[0]
              ?.code;
        if (code) {
          setItemTotal({
            ...itemTotal,
            item2: code,
          });
          selectCategoryToLazyQuery2({ variables: { code: code } });
        }
      }
    }
  }, [selectCategoryData1]);

  useEffect(() => {
    if (!selectCategoryLoading2) {
      if (selectCategoryData2?.selectCategoriesByHierarchicalBySomeone) {
        if (
          selectCategoryData2?.selectCategoriesByHierarchicalBySomeone
            .length !== 1
        ) {
          setSelectCategory2(
            selectCategoryData2?.selectCategoriesByHierarchicalBySomeone
          );
        } else {
          const keywordSearchCode = searchKeywordRef.current
            ? selectCategoryData2?.selectCategoriesByHierarchicalBySomeone.find(
                (v) => searchKeywordRef.current.startsWith(v.code)
              )
            : undefined;
          const code = keywordSearchCode
            ? keywordSearchCode.code
            : selectCategoryData2?.selectCategoriesByHierarchicalBySomeone[0]
                ?.code;
          setSelectCategoryItem(code);
          selectCategoriesToLazyQuery({
            variables: { where: { code: { equals: code } } },
          });
          setSelectCategory2([]);
          setSelectCategory3([]);
        }
      }
      if (!selectCategoryLoading2) {
        const keywordSearchCode = searchKeywordRef.current
          ? selectCategoryData2?.selectCategoriesByHierarchicalBySomeone.find(
              (v) => searchKeywordRef.current.startsWith(v.code)
            )
          : undefined;
        const code = keywordSearchCode
          ? keywordSearchCode.code
          : selectCategoryData2?.selectCategoriesByHierarchicalBySomeone[0]
              ?.code;
        if (code) {
          const codeValue2 = code
            .split("_")
            .filter((v, i) => i < 2)
            .join("_");
          setItemTotal({
            ...itemTotal,
            item2: codeValue2,
            item3: code === codeValue2 ? undefined : code,
          });
          if (code !== codeValue2) {
            selectCategoryToLazyQuery3({ variables: { code: code } });
          }
        }
      }
    }
  }, [selectCategoryData2]);

  useEffect(() => {
    if (!selectCategoryLoading3) {
      if (selectCategoryData3?.selectCategoriesByHierarchicalBySomeone) {
        if (
          selectCategoryData3?.selectCategoriesByHierarchicalBySomeone
            .length !== 1
        ) {
          setSelectCategory3(
            selectCategoryData3?.selectCategoriesByHierarchicalBySomeone
          );
        } else {
          const keywordSearchCode = searchKeywordRef.current
            ? selectCategoryData3?.selectCategoriesByHierarchicalBySomeone.find(
                (v) => searchKeywordRef.current.startsWith(v.code)
              )
            : undefined;
          const code = keywordSearchCode
            ? keywordSearchCode.code
            : selectCategoryData3?.selectCategoriesByHierarchicalBySomeone[0]
                ?.code;
          setSelectCategoryItem(code);
          selectCategoriesToLazyQuery({
            variables: { where: { code: { equals: code } } },
          });
          setSelectCategory3([]);
        }
      }
      const keywordSearchCode = searchKeywordRef.current
        ? selectCategoryData3?.selectCategoriesByHierarchicalBySomeone.find(
            (v) => searchKeywordRef.current.startsWith(v.code)
          )
        : undefined;
      const code = keywordSearchCode
        ? keywordSearchCode.code
        : selectCategoryData3?.selectCategoriesByHierarchicalBySomeone[0]?.code;

      if (!selectCategoryLoading3) {
        if (code) {
          if (code.split("_").length !== 2) {
            const findItem =
              selectCategoryData3?.selectCategoriesByHierarchicalBySomeone.find(
                (v) => v.code === selectCategoryItem
              );
            const item4 = findItem
              ? findItem.code
              : selectCategoryData3?.selectCategoriesByHierarchicalBySomeone[0]
                  .code;
            setItemTotal({
              ...itemTotal,
              item3: code
                .split("_")
                .filter((v, i) => i !== 3)
                .join("_"),
              item4: item4.split("_").length === 4 ? item4 : undefined,
            });

            if (item4.split("_").length === 4) {
              setSelectCategoryItem(item4);
            } else {
              setSelectCategoryItem(code.split("_").filter((v, i) => i !== 3).join("_"));
            }
          }
        }
      }
    }
  }, [selectCategoryData3]);

  const searchCategoryTest = (e: string) => {
    if (e) {
      const [item1, item2, item3, item4] = e
        .split("_")
        .map((v, i, a) => (v === "" ? undefined : a.slice(0, i + 1).join("_")));
      setItemTotal((p) => {
        if (p.item1 !== item1) {
          selectCategoryToLazyQuery1({ variables: { code: item1 } });
        }
        if (p.item2 !== item2) {
          selectCategoryToLazyQuery2({ variables: { code: item2 } });
        }
        if (p.item3 !== item3) {
          selectCategoryToLazyQuery3({ variables: { code: item3 } });
        }
        return {
          item1,
          item2,
          item3,
          item4,
        };
      });
    }
  };

  const categoryLength = searcCategoryData?.searchCategoriesBySomeone.length;

  return (
    <>
      <Row style={{
        marginBottom: 5
      }}>
        <Col span={4} style={{
          paddingTop: 5,
          fontSize: 16
        }}>
          카테고리 검색
        </Col>

        <Col span={20} style={{
          paddingRight: 5
        }}>
          <Input
            style={{ 
              paddingRight: 3,
              width: "100%" 
            }}
            placeholder="카테고리 검색"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);

              if (e.target.value.length > 0) {   
                searchCategoryToLazyQuery({ variables: { keyword: e.target.value } });

                setItemClickState(false);
              } else {
                setItemClickState(true);
              }
            }}
          />

          {!itemClickState ?
            categoryLength !== undefined && categoryLength !== 0 ? 
              (
                <table
                  className="category-search-table"
                  style={{
                    width: "100%",
                    border: "1px solid lightgray",
                    height: "150px",
                    maxHeight: "150px",
                    overflowY: "auto",
                    display: "block",
                    marginTop: "5px",
                  }}
                >
                  {searcCategoryData?.searchCategoriesBySomeone.map((v, i) => (
                    <tr style={{ 
                      cursor: "pointer",
                    }}>
                      <td
                        style={{ width: "20000px", padding: "3px 0px 3px 10px" }}
                        onClick={() => {
                          searchKeywordRef.current = v.code;

                          const [item1, item2, item3, item4] = v.code.split("_").map((v, i, a) => v === "" ? undefined : a.slice(0, i + 1).join("_"));

                          searchCategoryTest(v.code);

                          setSelectCategoryItem(v.code);
                          
                          setItemTotal({ item1, item2, item3, item4 });
                          setItemClickState(true);
                        }}
                      >
                        {v.c1Name} {v.c2Name !== "" && " > " + v.c2Name}{" "}
                        {v.c3Name !== "" && " > " + v.c3Name}{" "}
                        {v.c4Name !== "" && " > " + v.c4Name}
                      </td>
                    </tr>
                  ))}
                </table>
              ) 
            :
              (
                <div style={{
                  width: "100%",
                  border: "1px solid lightgray",
                  height: "150px",
                  maxHeight: "150px",
                  overflowY: "auto",
                  display: "block",
                  marginTop: "5px",
                  padding: "3px 0px 3px 10px"
                }}>
                  검색 결과가 없습니다.
                </div>
              )
          :
            null
          }
        </Col>
      </Row>

      <Row>
        <Col span={4} style={{
          paddingTop: 5,
          fontSize: 16
        }}>
          카테고리 선택
        </Col>

        <Col span={20}>
          <Select
            placeholder="대분류 선택"
            style={{ 
              width: "25%", 
              display: "inline-block",
              paddingRight: 5
            }}
            value={itemTotal.item1}
            onChange={(e) => {
              searchKeywordRef.current = null;
              setItemTotal({
                item1: e as string,
                item2: undefined,
                item3: undefined,
                item4: undefined,
              });
              setSelectCategory1([]);
              setSelectCategory2([]);
              setSelectCategory3([]);
              selectCategoryToLazyQuery1({ variables: { code: e as string } });
            }}
            loading={categoryListLoading}
          >
            {selectCategory0?.map((v, i) => (
              <Option key={i} value={v.c1}>
                {v.c1Name}
              </Option>
            ))}
          </Select>

          <Select
            placeholder="중분류 선택"
            style={{ 
              width: "25%", 
              display: "inline-block",
              paddingRight: 5
            }}
            value={!selectCategoryLoading1 ? itemTotal.item2 : undefined}
            onChange={(e) => {
              searchKeywordRef.current = null;
              setItemTotal({
                ...itemTotal,
                item2: e,
                item3: undefined,
                item4: undefined,
              });
              setSelectCategory2([]);
              setSelectCategory3([]);
              selectCategoryToLazyQuery2({ variables: { code: e as string } });
            }}
          >
            {selectCategory1.map((v, i) => (
              <Option key={i} value={v.code}>
                {v.name}
              </Option>
            ))}
          </Select>

          <Select
            placeholder="소분류 선택"
            style={{ 
              width: "25%", 
              display: "inline-block",
              paddingRight: 5
            }}
            value={!selectCategoryLoading2 ? itemTotal.item3 : undefined}
            onChange={(e) => {
              searchKeywordRef.current = null;
              setItemTotal({ ...itemTotal, item3: e, item4: undefined });
              setSelectCategory3([]);
              selectCategoryToLazyQuery3({ variables: { code: e as string } });
            }}
          >
            {selectCategory2.map((v, i) => (
              <Option key={i} value={v.code}>
                {v.name}
              </Option>
            ))}
          </Select>

          <Select
            placeholder="세분류 선택"
            style={{ 
              width: "25%", 
              display: "inline-block",
              paddingRight: 5
            }}
            value={!selectCategoryLoading3 ? itemTotal.item4 : undefined}
            onChange={(e) => {
              searchKeywordRef.current = null;
              setItemTotal({ ...itemTotal, item4: e });
              selectCategoriesToLazyQuery({
                variables: { where: { code: { equals: e } } },
              });
            }}
          >
            {selectCategory3.length >= 1 &&
              selectCategory3.map((v, i) => (
                <Option key={i} value={v.code}>
                  {v.name}
                </Option>
              ))}
          </Select>
        </Col>
      </Row>
    </>
  );
};
export default CategoriWrapPage;
