import { useQuery } from "@apollo/client";
import { Card, Table, Button, Image } from "antd";
import { ColumnsType } from "antd/lib/table";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import QUERIES from "src/apis/queries";
import {
  transCNYMoneyFormat,
  transProductState,
  transProductState2,
  transWONMoneyFormat,
} from "src/common/transform";
import {
  Product,
  ProductState,
  ProductWhereInput,
  QuerySelectProductsByAdminArgs,
  QuerySelectProductsCountByAdminArgs,
} from "src/types";
import ProductTabsByAdmin from "./product-tab-page";
import { useHistory, useLocation } from "react-router-dom";
import querystring from "query-string";
import { shopIcon, sillList } from "src/common/playauto";
import { IMAGE_SERVER } from "src/apis/client";
import ProductDeliveryToProductName from "./components/product-delivery-to-product-name";
import ICON from "src/assets/icon";
import AdminProductDetailModal from "src/component/admin/product-delivery/detail-modal";

const ProductDelivery = () => {
  const history = useHistory();
  const location = useLocation();
  const queryStringValue = querystring.parse(history.location.search);
  const [selectedItemIds, setSelectedItemIds] = useState<Array<number>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const { type = "ALL", search, page, pageCount = "10" } = queryStringValue;
  const [selectProductId, setSelectProductId] = useState(0);
  const pageNumber = isNaN(parseInt(page as string)) ? 1 : parseInt(page as string);
  const [whereInput, setWhereInput] = useState<ProductWhereInput>(undefined);

  // let pageCountNumber = isNaN(parseInt(pageCount as string))
  //   ? 10
  //   : parseInt(pageCount as string);

  // if (![10, 20, 50, 100].includes(pageCountNumber)) pageCountNumber = 10;

  const [pageCountNumber, setPageCountNumber] = useState<number>(100);

  const productState = transProductState2(queryStringValue.type as string);

  //이미지 번역 여부
  const [imageTranslate, setImageTranslate] = useState<null | boolean>(null);

  //판매중 라디오 버튼
  const [selectRadio, setSelectRadio] = useState<string>("전체");

  let variables: ProductWhereInput = {};
  if (queryStringValue.type === "ALL") {
    variables = { state: { equals: null } };
  } else if (queryStringValue.type === "AdminCollected") {
    variables = {
      AND: [
        { user: null },
        { state: { equals: productState as ProductState } },
      ],
    };
  } else if (queryStringValue.type === "OnSale") {
    if (selectRadio === "전체") {
      variables = { state: { equals: productState as ProductState } };
    } else if (selectRadio === "관리자") {
      variables = {
        AND: [
          { user: null },
          { state: { equals: productState as ProductState } },
        ],
      };
    } else if (selectRadio === "사용자") {
      variables = {
        AND: [
          { user: { id: { gt: 1 } } },
          { state: { equals: productState as ProductState } },
        ],
      };
    }
  } else {
    variables = { state: { equals: productState as ProductState } };
  }

  if (imageTranslate !== null) {
    Object.assign(variables, { isImageTranslated: { equals: imageTranslate } });
  }

  //상품 목록
  const {
    loading: selectProudctListLoading,
    error: selectProudctListError,
    data: selectProudctListData,
    refetch: selectProudctListRefetch,
  } = useQuery<
    { selectProductsByAdmin: Product[] },
    QuerySelectProductsByAdminArgs
  >(QUERIES.SELECT_PRODUCT_LIST_BY_ADMIN, {
    variables: {
      where: whereInput,
      skip: pageCountNumber * (pageNumber - 1),
      take: pageCountNumber,
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data?.selectProductsByAdmin) {
        setSelectedItemIds((p) => {
          return p.filter(
            (v) =>
              data.selectProductsByAdmin.findIndex((v2) => v2.id === v) !== -1
          );
        });
      }
    },
  });

  //상품목록 카운트
  const { data: selectProductsCountData, refetch: selectProductsCountRefetch } =
    useQuery<
      { selectProductsCountByAdmin: number },
      QuerySelectProductsCountByAdminArgs
    >(QUERIES.SELECT_PRODUCT_COUNT_BY_ADMIN, {
      notifyOnNetworkStatusChange: true,
    });

  // const [totalItem, setTotalItem] = useState<number>(0);

  // useEffect(() => {
  //   //아이템 갯수 세기(페이지네이션을 위한거임)
  //   if (selectProductsCountData) {
  //     setTotalItem(
  //       selectProductsCountData?.selectProductsCountByAdmin === 0
  //         ? selectProductsCountData?.selectProductsCountByAdmin
  //         : 0
  //     );
  //   }
  // }, [selectProductsCountData]);

  useEffect(() => {
    switch (queryStringValue.type) {
      case "ALL":
        selectProudctListRefetch({
          where: { id: { gt: 0 } },
          skip: pageCountNumber * (pageNumber - 1),
          take: pageCountNumber,
        });
        selectProductsCountRefetch({ where: { id: { gt: 0 } } });
        break;
      case "AdminCollected":
        selectProudctListRefetch({
          where: {
            AND: [
              { user: null },
              { state: { equals: ProductState.Collected } },
            ],
          },
          skip: pageCountNumber * (pageNumber - 1),
          take: pageCountNumber,
        });
        selectProductsCountRefetch({
          where: {
            AND: [
              { user: null },
              { state: { equals: ProductState.Collected } },
            ],
          },
        });
        break;
      case "Collected":
        selectProudctListRefetch({
          where: { state: { equals: ProductState.Collected } },
          skip: pageCountNumber * (pageNumber - 1),
          take: pageCountNumber,
        });
        selectProductsCountRefetch({
          where: { state: { equals: ProductState.Collected } },
        });
        break;
      case "OnSale":
        if (selectRadio === "전체") {
          selectProudctListRefetch({
            where: { state: { equals: ProductState.OnSale } },
            skip: pageCountNumber * (pageNumber - 1),
            take: pageCountNumber,
          });
          selectProductsCountRefetch({
            where: { state: { equals: ProductState.OnSale } },
          });
        } else if (selectRadio === "관리자") {
          selectProudctListRefetch({
            where: {
              AND: [{ user: null }, { state: { equals: ProductState.OnSale } }],
            },
            skip: pageCountNumber * (pageNumber - 1),
            take: pageCountNumber,
          });
          selectProductsCountRefetch({
            where: {
              AND: [{ user: null }, { state: { equals: ProductState.OnSale } }],
            },
          });
        } else if (selectRadio === "사용자") {
          selectProudctListRefetch({
            where: {
              AND: [
                { user: { id: { gt: 1 } } },
                { state: { equals: ProductState.OnSale } },
              ],
            },
            skip: pageCountNumber * (pageNumber - 1),
            take: pageCountNumber,
          });
          selectProductsCountRefetch({
            where: {
              AND: [
                { user: { id: { gt: 1 } } },
                { state: { equals: ProductState.OnSale } },
              ],
            },
          });
        }
        break;
      case "UloadWaiting":
        selectProudctListRefetch({
          where: { state: { equals: ProductState.UploadWaiting } },
          skip: pageCountNumber * (pageNumber - 1),
          take: pageCountNumber,
        });
        selectProductsCountRefetch({
          where: { state: { equals: ProductState.UploadWaiting } },
        });
        break;
      case "UploadFailed":
        selectProudctListRefetch({
          where: { state: { equals: ProductState.UploadFailed } },
          skip: pageCountNumber * (pageNumber - 1),
          take: pageCountNumber,
        });
        selectProductsCountRefetch({
          where: { state: { equals: ProductState.UploadFailed } },
        });
        break;
      case "SellDone":
        selectProudctListRefetch({
          where: { state: { equals: ProductState.SellDone } },
          skip: pageCountNumber * (pageNumber - 1),
          take: pageCountNumber,
        });
        selectProductsCountRefetch({
          where: { state: { equals: ProductState.SellDone } },
        });
        break;
    }
    setSelectRadio("전체");
    setImageTranslate(null);
    setSelectedItemIds([]);
  }, [window.location.pathname, queryStringValue.type]);

  const onSort = (a: any, b: any) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  };

  const columns: ColumnsType<Product> = [
    {
      title: "사용자",
      align: "center",
      width: "150px",
      render: (data: Product) => {
        return (
          <div style={{
            width: "150px",
            fontSize: "12px"
          }}>
            {data.user ? data.user.email : null}
          </div>
        )
      },
      sorter: (a: Product, b: Product) => {
        return onSort(a.user.email, b.user.email);
      }
    },
    {
      title: "이미지",
      align: "center",
      width: "75px",
      render: (data: Product) => {
        const image = /^https?:\/\//.test(data.imageThumbnail[0])
          ? data.imageThumbnail[0]
          : IMAGE_SERVER + "/" + data.imageThumbnail[0];
        return (
          <div style={{
            width: "75px",
            position: "relative"
          }}>
            {data.isImageTranslated && (
              <img src={ICON.TRANGERS_ICON.default} alt="" style={{
                position: "absolute",
                zIndex: 2000000001
              }} />
            )}
            <Image
              src={
                data.imageThumbnail.length > 0
                  ? image
                  : data.taobaoProduct.imageThumbnail
              }
              style={{
                width: "60px",
                height: "60px",
              }}
              onClick={(e) => e.stopPropagation()}
              fallback="data:image/png;base64,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"
            />
          </div>
        );
      },
    },
    {
      title: "상품명",
      align: "center",
      width: "450px",
      render: (data: Product) => (
        <ProductDeliveryToProductName
          proudctData={data}
          setSelectProductId={setSelectProductId}
        />
      ),
      sorter: (a: Product, b: Product) => {
        return onSort(a.name, b.name);
      }
    },
    {
      title: "구매처",
      align: "center",
      width: "60px",
      render: (data: Product) => {
        var origin = JSON.parse(data.taobaoProduct.originalData);

        var icon, icon_link;

        switch (origin.shop_id) {
          case "express": {
            icon = ICON.ICON_EXPRESS.default;
            icon_link = `https://ko.aliexpress.com/item/${data.taobaoProduct.taobaoNumIid}.html`;

            break;
          }

          case "1688": {
            icon = ICON.ICON_1688.default;
            icon_link = `https://detail.1688.com/offer/${data.taobaoProduct.taobaoNumIid}.html`;

            break;
          }

          case "vvic": {
            icon = ICON.ICON_VVIC.default;
            icon_link = `https://www.vvic.com/item/${data.taobaoProduct.taobaoNumIid}`;

            break;
          }

          default: {
            icon = origin.tmall ? ICON.ICON_TMALL.default : ICON.ICON_TAOBAO.default;
            icon_link = `https://item.taobao.com/item.htm?id=${data.taobaoProduct.taobaoNumIid}`;

            break;
          }
        }

        return (<img src={icon} alt="" onClick={(e) => {
          window.open(icon_link, "_blank");
        }} />);
      }
    },
    {
      title: "옵션",
      align: "center",
      width: "40px",
      render: (data: Product) => (
        <div style={{ fontSize: "12px", width: "30px" }}>
          {data.productOption.length !== 0 ? "Y" : "N"}
        </div>
      ),
    },
    {
      title: "상태",
      align: "center",
      width: "75px",
      dataIndex: "state",
      render: (data: string, data2) => (
        <div style={{ fontSize: "12px", width: "70px" }}>
          {transProductState(data)}
        </div>
      ),
    },
    {
      title: "비고",
      align: "center",
      width: "175px",
      render: (_, data) => (
        <div style={{ fontSize: "12px", width: "175px" }}>
          {data?.productStore[0]?.productStoreLog[0] ?.errorMessage ?? ""}
        </div>
      ),
      sorter: (a: Product, b: Product) => {
        return onSort(a.activeProductStore[0] ? a.activeProductStore[0].productStoreLog[0].errorMessage : "", b.activeProductStore[0] ? b.activeProductStore[0].productStoreLog[0].errorMessage : "")
      }
    },
    {
      title: (
        <div style={{ fontSize: "12px" }}>
          도매가
          <br />
          판매가
          <br />
          유료배송비
        </div>
      ),
      align: "center",
      width: "75px",
      render: (data: Product) => (
        <div style={{ fontSize: "12px", width: "70px" }}>
          {JSON.parse(data.taobaoProduct.originalData).shop_id === "express" ? transWONMoneyFormat(data.taobaoProduct.price) : transCNYMoneyFormat(data.taobaoProduct.price)}
          <br />
          {transWONMoneyFormat(data.price)}
          <br />
          {transWONMoneyFormat(data.shippingFee)}
        </div>
      ),
      sorter: (a: Product, b: Product) => {
        return onSort(a.price, b.price);
      }
    },
    {
      title: "상품코드",
      align: "center",
      width: "75px",
      render: (data: Product) => (
        <div style={{ fontSize: "12px", width: "80px" }}>
          {data.productCode}
        </div>
      ),
      sorter: (a: Product, b: Product) => {
        return onSort(a.productCode, b.productCode);
      }
    },
    {
      title: "판매채널",
      align: "center",
      width: "75px",
      render: (_, data: Product) => {
        return data.productStore.map((v, i) => (
          <>
            {v.state === 2 && (
              <img
                id={'ICON-' + v.siteCode}
                // key={i}
                style={{ cursor: "pointer", width: "16px", margin: "1px" }}
                src={shopIcon[v.siteCode]}
                alt=""
                onClick={(e) => {
                  switch (v.siteCode) {
                    case "B378": {
                      e.stopPropagation();

                      if (v.storeProductId === "0") {
                        if (v.etcVendorItemId === "0") {
                          alert("상품이 존재하지 않습니다.");
                        } else {
                          alert("사용자가 아직 상품에 대한 승인을 받지 않았습니다.");
                        }
                      } else {
                        window.open(v.storeUrl);
                      }

                      break;
                    }

                    default: {
                      e.stopPropagation();

                      if (v.storeUrl) window.open(v.storeUrl);

                      break;
                    }
                  }
                }}
              />
            )}
          </>
        ));
      },
    },
    {
      title: "카테고리",
      align: "center",
      width: "125px",
      render: (data: Product) => (
        <div style={{ fontSize: "12px", width: "125px" }}>
          {data.category?.c1Name && data.category?.c1Name}
          {data.category?.c2Name && " > " + data.category?.c2Name}
          <br />
          {data.category?.c3Name && data.category?.c3Name}
          {data.category?.c4Name && " > " + data.category?.c4Name}
          <br />
          {sillList.map((v) => v.code === data.siilCode && "[" + v.name + "]")}
        </div>
      ),
      sorter: (a: Product, b: Product) => {
        return onSort(a.category ? a.category.c1Name : "", b.category ? b.category.c1Name : "");
      }
    },
    {
      title: "등록일",
      align: "center",
      width: "75px",
      render: (data: Product) => (
        <div style={{ fontSize: "12px", width: "70px" }}>
          {format(new Date(data.createdAt), "yyyy-MM-dd HH:mm:ss")}
        </div>
      ),
      sorter: (a: Product, b: Product) => {
        return onSort(Date.parse(a.createdAt), Date.parse(b.createdAt));
      },
    },
    {
      title: "동영상",
      align: "center",
      width: "50px",
      dataIndex: ["taobaoProduct", "videoUrl"],
      render: (data: string) =>
        data ? (
          <div style={{width: "50px"}}>
            <a
              onClick={(e) => {
                e.stopPropagation();
              }}
              download
              href={data}
              target="_blank"
              rel="noreferrer"
            >
              <img src={ICON.DOWNLOAD_ICON.default} alt="" />
            </a>
          </div>
        ) : (
          <div style={{width: "50px"}}>
          </div>
        ),
    },
  ];

  const rowSelection = {
    selectedRowKeys: selectedItemIds,
    onSelect: (
      record: Product,
      selected: boolean,
      selectedRows: Product[],
      nativeEvent: any
    ) => {
      let tempData = [...selectedItemIds];
      if (selected) {
        tempData.push(record.id ?? 0);
        setSelectedItemIds(tempData);
      } else {
        setSelectedItemIds(tempData.filter((v) => v !== record.id));
      }
    },
    onSelectAll: (selected: any, selectedRows: any, changeRows: Product[]) => {
      if (selected) {
        let tempData = [...selectedItemIds];
        selectedRows.map((v: Product) => v && tempData.push(v.id ?? 0));
        const set = Array.from(new Set(tempData)); // 중복 제거
        setSelectedItemIds(set);
      } else {
        //한페이지에 선택된 항목만 제거
        const selectedRowsUserId = changeRows.map((v) => v.id);
        setSelectedItemIds(
          selectedItemIds.filter(
            (v) => !selectedRowsUserId.includes(v as number)
          )
        );
      }
    },
  };

  const cancelDetailModal = () => setSelectProductId(0);

  const selectMyProductRefetch = (
    variables?: Partial<QuerySelectProductsByAdminArgs>
  ) => {
    setWhereInput(variables?.where);
    selectProudctListRefetch(variables);
  };
  
  return (
    <Card style={{ marginBottom: "60px" }}>
      <ProductTabsByAdmin
        selectMyProductRefetch={selectMyProductRefetch}
        selectProductsCountRefetch={selectProductsCountRefetch}
        setPageSize={(e) => setPageSize(e)}
        selectedItemIds={selectedItemIds}
        selectRadio={selectRadio}
        setSelectRadio={setSelectRadio}
        imageTranslate={imageTranslate}
        setImageTranslate={setImageTranslate}
        pageCount={pageCountNumber}
        setPageCountNumber={setPageCountNumber}
      />

      <Table
        size="small"
        bordered
        scroll={{ x: 1600 }}
        rowKey={(record: Product) => record.id ?? 0}
        loading={selectProudctListLoading}
        columns={columns}
        dataSource={selectProudctListData?.selectProductsByAdmin}
        rowSelection={rowSelection}
        onChange={(e) => setPageSize(e.pageSize)}
        pagination={{
          showSizeChanger: true,
          pageSize: pageCountNumber,
          current: pageNumber,
          total: selectProductsCountData?.selectProductsCountByAdmin ?? 0,
          onChange: (page, pageSize) => {
            // setSelectedItemIds([]);

            history.replace(
              location.pathname +
                "?type=" +
                type +
                `${
                  search ? "&search=" + search : ""
                }&page=${page}&pageCount=${pageSize}`
            );
          },
        }}

        // onRow={(record, rowIndex) => {
        //   return {
        //     onClick: (event) => {
        //       setSelectedItemIds((p) => {
        //         // 이미 존재할 시 제거
        //         if (p.some((v) => v === record.id)) {
        //           return Array.from(new Set(p.filter((v) => v !== record.id)));
        //         } else {
        //           // 추가
        //           return Array.from(new Set(p.concat(record.id)));
        //         }
        //       });
        //     },
        //   };
        // }}
      />

      <AdminProductDetailModal
        selectProductId={selectProductId}
        onCancel={cancelDetailModal}
      />
    </Card>
  );
};

export default ProductDelivery;
