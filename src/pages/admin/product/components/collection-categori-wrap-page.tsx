import React, { useEffect, useRef, useState } from "react";
import { Input, Select, message } from "antd";
import { useLazyQuery } from "@apollo/client";
import QUERIES from "src/apis/queries";
import {
  Category,
  CategorySelectType,
  QuerySearchCategoriesBySomeoneArgs,
  QuerySelectCategoriesByHierarchicalBySomeoneArgs,
  QuerySelectCategoriesBySomeoneArgs,
} from "src/types";

const { Search } = Input;
const { Option } = Select;

interface IProps {
  setSelectCategoryItem: (e: string) => void;
  selectCategoryItem: string | undefined;
  sillChange: (e: string) => void;
  selectCategory?: Category[];
  categoryListLoading: boolean;
}
const CollectionCategoriWrapPage = ({
  setSelectCategoryItem,
  selectCategoryItem,
  sillChange,
  selectCategory,
  categoryListLoading,
}: IProps) => {
  //카테고리 검색
  const [searchCategoryToLazyQuery, { data: searcCategoryData }] = useLazyQuery<
    { searchCategoriesBySomeone: Category[] },
    QuerySearchCategoriesBySomeoneArgs
  >(QUERIES.SEARCH_CATEGORY, { fetchPolicy: "no-cache" });

  const searchKeywordRef = useRef<string | null>(null);

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

  const [selectCategoriesToLazyQuery, { data: CategoriesToLazyQueryData }] =
    useLazyQuery<
      { selectCategoriesBySomeone: Category[] },
      QuerySelectCategoriesBySomeoneArgs
    >(QUERIES.SELECT_CATEGORIES_TO_LAZY_QUERY, { fetchPolicy: "no-cache" });

  //카테고리 대분류 목록
  const [selectCategory0, setSelectCategory0] = useState<Category[]>();
  useEffect(() => {
    setSelectCategory0(selectCategory);
  }, [selectCategory]);

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

  //카테고리 선택 state
  const [itemTotal, setItemTotal] = useState<{
    item1: string | undefined;
    item2: string | undefined;
    item3: string | undefined;
    item4: string | undefined;
  }>({
    item1: undefined,
    item2: undefined,
    item3: undefined,
    item4: undefined,
  });

  //카테고리 검색에서 카테고리 선택시 true/false
  const [itemClickState, setItemClickState] = useState<Boolean>(false);

  useEffect(() => {
    if (searcCategoryData?.searchCategoriesBySomeone.length === 0) {
      message.error("입력하신 검색어에 대한 카테고리가 없습니다.");
    }
  }, [searcCategoryData]);

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
              // item3: selectCategoryData3?.selectCategoriesByHierarchicalBySomeone.length === 1 ? codeValue.substr(0, 17) + "_" : codeValue.substr(0, 26),
              // item4: selectCategoryData3?.selectCategoriesByHierarchicalBySomeone.length !== 1 ? selectCategoryItem : undefined
              item3: code
                .split("_")
                .filter((v, i) => i !== 3)
                .join("_"),
              item4: item4.split("_").length === 4 ? item4 : undefined,
            });
            if (item4.split("_").length === 4) setSelectCategoryItem(item4);
            else
              setSelectCategoryItem(
                code
                  .split("_")
                  .filter((v, i) => i !== 3)
                  .join("_")
              );
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
          // ...itemTotal,
          // item1: e.substr(0, 8),
          // item4: (selectCategoryData3?.selectCategoriesByHierarchicalBySomeone.length! > 1 ? e : undefined)
        };
      });
    }
  };

  useEffect(() => {
    if (CategoriesToLazyQueryData?.selectCategoriesBySomeone[0]) {
      const siilCode =
        CategoriesToLazyQueryData?.selectCategoriesBySomeone[0].siilCode;
      if (siilCode !== "") sillChange(siilCode);
      setSelectCategoryItem(
        CategoriesToLazyQueryData?.selectCategoriesBySomeone[0].code
      );
    }
  }, [CategoriesToLazyQueryData]);
  const categoryLength = searcCategoryData?.searchCategoriesBySomeone.length;

  return (
    <>
      <div style={{ margin: "0 0 10px 0", color: "#000000", fontSize: "16px" }}>
        카테고리 설정
      </div>
      <Search
        style={{ width: "300px", marginRight: "20px" }}
        placeholder="카테고리 검색"
        enterButton="카테고리 검색"
        onSearch={(e) => {
          if (e.length !== 0) {
            searchCategoryToLazyQuery({ variables: { keyword: e } });
          } else {
            message.error("카테고리 검색어를 입력해주세요.");
          }
          setItemClickState(false);
        }}
      />

      <Select
        placeholder="===== 대분류 선택 ====="
        style={{ width: 220, display: "inline-block", marginRight: "10px" }}
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
        placeholder="===== 중분류 선택 ====="
        style={{ width: 220, display: "inline-block", marginRight: "10px" }}
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
        placeholder="===== 소분류 선택 ====="
        style={{ width: 220, display: "inline-block", marginRight: "10px" }}
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
        placeholder="===== 세분류 선택 ====="
        style={{ width: 220, display: "inline-block" }}
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

      {categoryLength !== undefined && categoryLength !== 0 && !itemClickState && (
        <table
          className="category-search-table"
          style={{
            width: "100%",
            border: "1px solid black",
            height: "150px",
            maxHeight: "150px",
            overflowY: "auto",
            display: "block",
            marginTop: "10px",
          }}
        >
          {searcCategoryData?.searchCategoriesBySomeone.map((v, i) => (
            <tr style={{ cursor: "pointer" }}>
              <td
                style={{ width: "20000px", padding: "3px 0" }}
                onClick={() => {
                  searchKeywordRef.current = v.code;
                  const [item1, item2, item3, item4] = v.code
                    .split("_")
                    .map((v, i, a) =>
                      v === "" ? undefined : a.slice(0, i + 1).join("_")
                    );
                  searchCategoryTest(v.code);
                  setSelectCategoryItem(v.code);
                  setItemClickState(true);
                  sillChange(v.siilCode);
                  setItemTotal({ item1, item2, item3, item4 });
                }}
              >
                {v.c1Name} {v.c2Name !== "" && " > " + v.c2Name}{" "}
                {v.c3Name !== "" && " > " + v.c3Name}{" "}
                {v.c4Name !== "" && " > " + v.c4Name}
              </td>
            </tr>
          ))}
        </table>
      )}
    </>
  );
};
export default CollectionCategoriWrapPage;
