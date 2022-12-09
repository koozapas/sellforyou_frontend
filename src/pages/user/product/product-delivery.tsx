import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import querystring from "query-string";
import ProductTabs from "./components/product-tabs";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  Product,
  ProductState,
  QuerySelectMyProductByUserArgs,
  QuerySelectMyProductsCountByUserArgs,
  ProductWhereInput
} from "src/types";
import QUERIES from "src/apis/queries";
import { transProductState2 } from "src/common/transform";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { CoreState } from "src/redux/store";
import {
  ProductDeliveryTable,
  ProductDetailModal,
} from "src/component/user/product/product-delivery";
import { onApolloError } from "src/common/functions";

const ProductDelivery = () => {
  /** 수집 결과 데이터 받기 */
  const subscriptionRedux = useSelector(
    (state: CoreState) => state.subscription
  );

  const history = useHistory();
  const location = useLocation();
  const queryString = querystring;
  const pathname = location.pathname;

  const [selectProductId, setSelectProductId] = useState(0); // 내가 선택한 상품의 id
  const [productList, setProductList] = useState<Array<Product>>([]);
  const [selectedItemIds, setSelectedItemIds] = useState<Array<number>>([]); // 체크한 테이블 열 개수
  const [imageTranslate, setImageTranslate] = useState<null | boolean>(null); // 이미지 번역 여부
  const [pageCountNumber, setPageCountNumber] = useState<number>(100);
  const [whereInput, setWhereInput] = useState<ProductWhereInput>(undefined);

  const {
    type = "ALL",
    search,
    page,
    pageCount = "10",
  } = queryString.parse(history.location.search);

  const pageNumber = isNaN(parseInt(page as string))
    ? 1
    : parseInt(page as string);
  // let pageCountNumber = isNaN(parseInt(pageCount as string))
    // ? 10
    // : parseInt(pageCount as string);
  // if (![10, 20, 50, 100].includes(pageCountNumber)) pageCountNumber = 10;

  const productState = transProductState2(type as string);

  const where = {
    state: {
      equals: type === "ALL" ? undefined : (productState as ProductState),
    },

    isImageTranslated: { equals: imageTranslate },
  };

  const { loading: selectMyProductLoading, refetch: selectMyProductRefetch2 } =
    useQuery<
      { selectMyProductByUser: Product[] },
      QuerySelectMyProductByUserArgs
    >(QUERIES.SELECT_MY_PRODUCT_LIST, {
      variables: {
        where: whereInput,
        skip: pageCountNumber * (pageNumber - 1),
        take: pageCountNumber,
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        console.log("fuck you");

        setProductList(data?.selectMyProductByUser);

        if (data?.selectMyProductByUser) {
          setSelectedItemIds((p) => {
            return p.filter(
              (v) =>
                data.selectMyProductByUser.findIndex((v2) => v2.id === v) !== -1
            );
          });
        }
      },
      onError: onApolloError,
    });

  const {
    data: selectMyProductDataCount,
    refetch: selectMyProductCountRefetch,
  } = useQuery<
    { selectMyProductsCountByUser: number },
    QuerySelectMyProductsCountByUserArgs
  >(QUERIES.SELECT_MY_PRODUCT_LIST_COUNT, {
    variables: {
      where: whereInput,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    onError: onApolloError,
  });

  const { data: getItemLengthData, refetch: getItemLengthRefetch } = useQuery<
    { selectMyProductByUser: Product[] },
    QuerySelectMyProductByUserArgs
  >(QUERIES.GET_ITEM_STATE, {
    fetchPolicy: "no-cache",
    onError: onApolloError,
  });

  const selectMyProductRefetch = (
    variables?: Partial<QuerySelectMyProductByUserArgs>
  ) => {
    setWhereInput(variables?.where);

    selectMyProductCountRefetch({ where: variables?.where ?? undefined });
    selectMyProductRefetch2(variables);
  };

  //탭 수량 리페치
  const itemLengthRefetch = () => {
    getItemLengthRefetch({ where: { id: { not: null } } });
  };

  const setQueryString = (e: string) => {
    history.push(pathname + "?type=" + type + "&search=" + e);
  };

  const onPagination = (page: number, pageSize: number | undefined) => {
    // setSelectedItemIds([]);
    // prettier-ignore
    
    const url = `${pathname}?type=${type}${search ? `&search=${search}` : ""}&page=${page}&pageCount=${pageSize}`

    history.replace(url);
  };

  useEffect(() => {
    if (type !== "ALL") {
      selectMyProductRefetch({
        where: { productStateEnum: { state: { equals: productState } } },
        skip: pageCountNumber * (pageNumber - 1),
        take: pageCountNumber,
      });
    } else {
      selectMyProductRefetch({
        // where: { productStateEnum: { state: { equals: null } } },
        skip: pageCountNumber * (pageNumber - 1),
        take: pageCountNumber,
      });
    }
    itemLengthRefetch();

  }, [type, subscriptionRedux]);

  const cancelDetailModal = () => setSelectProductId(0);

  return (
    <Card style={{ marginBottom: "80px" }}>
      {/* 상품 관리 메뉴들 */}
      <ProductTabs
        getItemLengthData={getItemLengthData?.selectMyProductByUser}
        setQueryString={setQueryString}
        selectedItemIds={selectedItemIds}
        selectMyProductRefetch={selectMyProductRefetch}
        ItemLengthRefetch={itemLengthRefetch}
        imageTranslate={imageTranslate}
        setImageTranslate={setImageTranslate}
        pageCount={pageCountNumber}
        setPageCountNumber={setPageCountNumber}
      />

      <ProductDeliveryTable
        dataSource={productList}
        loading={selectMyProductLoading}
        selectedRowKeys={selectedItemIds}
        setSelectedRowKeys={setSelectedItemIds}
        current={pageNumber}
        pageSize={pageCountNumber}
        total={selectMyProductDataCount?.selectMyProductsCountByUser}
        onPagination={onPagination}
        setSelectProductId={setSelectProductId}
      />

      <ProductDetailModal
        selectProductId={selectProductId}
        onCancel={cancelDetailModal}
      />
    </Card>
  );
};

export default ProductDelivery;
