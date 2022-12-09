// 인식
import { ApolloError, useMutation } from "@apollo/client";
import { Button, notification, Table, Tooltip, Image, Row, Col, message } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import { useHistory } from "react-router";
import { IMAGE_SERVER } from "src/apis/client";
import ICON from "src/assets/icon";
import {
  transCNYMoneyFormat,
  transProductState,
  transWONMoneyFormat,
} from "src/common/transform";
import ProductDeliveryToProductName from "src/pages/user/product/components/product-delivery-to-product-name";
import { Product } from "src/types";
import querystring from "query-string";
import { format } from "date-fns";
import { sillList } from "src/pages/user/product/detail/select-siil-wrap-page";
import { shopIcon } from "src/common/playauto";
import { MutationUpdateProductStoreUrlInfoBySomeoneArgs } from "src/types";
import MUTATIONS from "src/apis/mutations";
import { FileExcelOutlined, VideoCameraOutlined } from "@ant-design/icons";

var FileSaver = require("file-saver");
var XLSX = require("xlsx");

interface Props<T> {
  dataSource: T[];
  loading: boolean;
  current: number;
  pageSize: number;
  total: number | undefined;
  onPagination: (page: number, pageSize: number | undefined) => void;
  selectedRowKeys: number[];
  setSelectedRowKeys: Dispatch<SetStateAction<Props<T>["selectedRowKeys"]>>;
  setSelectProductId: (v: number) => void;
}

const ProductDeliveryTable = ({
  dataSource,
  loading,
  current,
  pageSize,
  total,
  onPagination,
  selectedRowKeys,
  setSelectedRowKeys,
  setSelectProductId,
}: Props<Product>) => {
  const history = useHistory();
  const { type = "ALL" } = querystring.parse(history.location.search);

  const openNotificationWithIcon = (direction, type, title, description) => {
    notification[type]({
      message: title,
      description: description,
      placement: direction
    });
  };

  const [updateProductStoreUrlInfoBySomeone] = useMutation<
    { updateProductStoreUrlInfoBySomeone: String },
    MutationUpdateProductStoreUrlInfoBySomeoneArgs
  >(MUTATIONS.UPDATE_PRODUCT_STORE_URL_DATA, {
    refetchQueries: ["SELECT_MY_PRODUCT_DETAIL", "SELECT_MY_PRODUCT_LIST"],
  });

  async function setRefreshUrlCoupang(v) { 
    var variables = {
      "productStoreId": v.id,
      "etcVendorItemId": v.etcVendorItemId
    }
        
    await updateProductStoreUrlInfoBySomeone({
      variables,
    }).then((res) => {
      var result = res.data.updateProductStoreUrlInfoBySomeone;

      if (result.includes("OK")) {
        window.open("https://www.coupang.com/vp/products/" + result.replace("(OK)", ""), "_blank");
      } else {
        if (result === "승인반려") {
          openNotificationWithIcon("bottomLeft", "info", "쿠팡", "상품이 반려되었습니다. 쿠팡 WING에서 확인 후 다시 업로드 해주시기 바랍니다.");
        } else {
          openNotificationWithIcon("bottomLeft", "info", "쿠팡", `상품이 다음과 같은 이유로 승인되지 않았습니다. (${result})`);
        }
      }
    }).catch((e: ApolloError) => {
      message.error(e.message);
    });
  }

  function stringToArrayBuffer(s: any) {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);

    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }

    return buf;
  }

  function convertJsonToExcel(object: any) {
    let wb = XLSX.utils.book_new();
    let newWorksheet = XLSX.utils.json_to_sheet(object);

    XLSX.utils.book_append_sheet(wb, newWorksheet, '상품관리');

    let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    FileSaver.saveAs(new Blob([stringToArrayBuffer(wbout)], {type: "application/octet-stream"}), '셀포유_상품목록.xlsx');
  }

  const onSort = (a: any, b: any) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  };

  // 테이블의 한 열을 클릭 시
  const onClickRow = (id: number) => {
    setSelectedRowKeys((p) => {
      // 이미 존재할 시 제거
      if (p.some((v) => v === id)) {
        return Array.from(new Set(p.filter((v) => v !== id)));
      } else {
        // 추가
        return Array.from(new Set(p.concat(id)));
      }
    });
  };

  return (
    <>
      <Row>
        <Col span={24} style={{
          textAlign: "right"
        }}>
          <Button icon={<FileExcelOutlined />} onClick={() => {
            let excelData = dataSource.map((v) => {
              const origin = JSON.parse(v.taobaoProduct.originalData);

              let originUrl = null;
              let imageUrl = /^https?:\/\//.test(v.imageThumbnail[0]) ? v.imageThumbnail[0] : "http://img.sellforyou.co.kr/sellforyou/" + v.imageThumbnail[0];

              switch (origin.shop_id) {
                case "express": {
                  originUrl = `https://ko.aliexpress.com/item/${v.taobaoProduct.taobaoNumIid}.html`;

                  break;
                }

                case "1688": {
                  originUrl = `https://detail.1688.com/offer/${v.taobaoProduct.taobaoNumIid}.html`;

                  break;
                }

                case "vvic": {
                  originUrl = `https://www.vvic.com/item/${v.taobaoProduct.taobaoNumIid}`;

                  break;
                }

                default: {
                  originUrl = `https://item.taobao.com/item.htm?id=${v.taobaoProduct.taobaoNumIid}`;

                  break;
                }
              }

              let connectedInfo = [
                {
                  "siteCode": "A077",
                  "isConnected": "X",
                },

                {
                  "siteCode": "B378",
                  "isConnected": "X",
                },

                {
                  "siteCode": "A112",
                  "isConnected": "X",
                },

                {
                  "siteCode": "A027",
                  "isConnected": "X",
                },

                {
                  "siteCode": "A006",
                  "isConnected": "X",
                },

                {
                  "siteCode": "A001",
                  "isConnected": "X",
                },
              ];

              let connectedAt = "";

              v.activeProductStore.map((w) => {
                if (w.state === 2) {
                  for (var i in connectedInfo) {
                    if (w.siteCode === connectedInfo[i].siteCode) {
                      connectedInfo[i].isConnected = "O";
                      connectedAt = w.connectedAt;
                    }
                  }
                }
              });

              let currentState = null;

              switch (v.productStateEnum.state) {
                case "COLLECTED": {
                  currentState = "수집 상품";

                  break;
                }

                case "ON_SALE": {
                  currentState = "판매중";

                  break;
                }

                case "SELL_DONE": {
                  currentState = "전체";

                  break;
                }
                
                case "UPLOAD_FAILED": {
                  currentState = "업로드 실패";

                  break;
                }

                case "UPLOAD_WAITING": {
                  currentState = "업로드 대기";

                  break;
                }

                default: {
                  currentState = "";

                  break;
                }
              }

              return {
                "상품명": v.name,
                "대표이미지": imageUrl,
                "구매처URL": originUrl ?? "",
                "상태": currentState ?? "",
                "도매가": v.taobaoProduct.price,
                "판매가": v.price,
                "해외배송비": v.localShippingFee,
                "유료배송비": v.shippingFee,
                "상품코드": v.productCode,
                "수집일": new Date(v.createdAt),
                "등록일": new Date(connectedAt),
                "검색태그": v.searchTags,
                "스마트스토어카테고리명": v.categoryA077Name,
                "쿠팡카테고리명": v.categoryB378Name,
                "11번가카테고리명": v.categoryA112Name,
                "인터파크카테고리명": v.categoryA027Name,
                "G마켓카테고리명": v.categoryA006Name,
                "옥션카테고리명": v.categoryA001Name,
                "스마트스토어등록여부": connectedInfo[0].isConnected,
                "쿠팡등록여부": connectedInfo[1].isConnected,
                "11번가등록여부": connectedInfo[2].isConnected,
                "인터파크등록여부": connectedInfo[3].isConnected,
                "G마켓등록여부": connectedInfo[4].isConnected,
                "옥션등록여부": connectedInfo[5].isConnected
              }
            })

            convertJsonToExcel(excelData);
          }}>
            검색 결과 엑셀 다운로드
          </Button>
        </Col>
      </Row>

      <Table
        bordered
        size="small"
        // scroll={{ x: 1400 }}
        loading={loading}
        rowKey={(record) => record.id ?? 0}
        dataSource={dataSource}
        pagination={{
          showSizeChanger: true,
          current,
          pageSize,
          total,
          onChange: onPagination,
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedRowKeys: number[], selectedRows: Product[]) => {
            let tempData = [];

            for (var i in selectedRows) {
              tempData.push(selectedRows[i].id);
            }

            setSelectedRowKeys(tempData);
          },
          // onSelect: (record: Product, selected: boolean) => {
          //   console.log(record, selected);

          //   let tempData = [...selectedRowKeys];
          //   if (selected) {
          //     tempData.push(record.id ?? 0);
          //     setSelectedRowKeys(tempData);
          //   } else {
          //     setSelectedRowKeys(tempData.filter((v) => v !== record.id));
          //   }
          // },
          onSelectAll: (
            selected: any,
            selectedRows: any,
            changeRows: Product[]
          ) => {
            if (selected) {
              let tempData = [...selectedRowKeys];
              selectedRows.map((v: Product) => v && tempData.push(v.id ?? 0));
              const set = Array.from(new Set(tempData)); // 중복 제거
              setSelectedRowKeys(set);
            } else {
              //한페이지에 선택된 항목만 제거
              const selectedRowsUserId = changeRows.map((v) => v.id);
              setSelectedRowKeys(
                selectedRowKeys.filter(
                  (v) => !selectedRowsUserId.includes(v as number)
                )
              );
            }
          },
        }}
        style={{
          overflowX: "scroll",
          width: "100%",
          marginTop: 5,
        }}
        // onRow={(record) => {
        //   return {
        //     onClick: () => onClickRow(record.id),
        //   };
        // }}
        columns={[
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
                  position: "relative", 
                  width: "75px"
                }}>
                  {data.isImageTranslated && (
                    <div style={{
                      background: "rgba(0, 0, 0, 0.4)",

                      color: "white",

                      paddingTop: 18,
                      position: "absolute",

                      left: 8,

                      width: "60px",
                      height: "60px",

                      zIndex: 1,
                    }}>수정됨</div>
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
                      // marginLeft: data.isImageTranslated ? 0 : "15px",
                    }}
                    alt=""
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
                {data?.activeProductStore.map((s, i) => (
                  <div>
                    {s.productStoreLog[0]?.errorMessage ?? ""}
                  </div>
                ))}
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
            // sorter: (a: Product, b: Product) => {
            //   return onSort(a.price, b.price);
            // }
          },
          {
            title: "상품코드",
            align: "center",
            width: "80px",
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
            width: "90px",
            render: (_, data) => {
              var defaultImages = [
                {
                  "id": 0,
                  "state": 0,
                  "siteCode": "A077",
                  "default": ICON.NAVER_ICON1_GRAY.default,
                  "storeProductId": "",
                  "etcVendorItemId": "",
                  "storeUrl": ""
                },

                {
                  "id": 0,
                  "state": 0,
                  "siteCode": "B378",
                  "default": ICON.COUPANG_ICON_GRAY.default,
                  "storeProductId": "",
                  "etcVendorItemId": "",
                  "storeUrl": ""
                },

                {
                  "id": 0,
                  "state": 0,
                  "siteCode": "A027",
                  "default": ICON.INTERPARK_ICON_GRAY.default,
                  "storeProductId": "",
                  "etcVendorItemId": "",
                  "storeUrl": ""
                },

                {
                  "id": 0,
                  "state": 0,
                  "siteCode": "A112",
                  "default": ICON.STREET_ICON_GRAY.default,
                  "storeProductId": "",
                  "etcVendorItemId": "",
                  "storeUrl": ""
                },

                {
                  "id": 0,
                  "state": 0,
                  "siteCode": "A113",
                  "default": ICON.STREET_NORMAL_ICON_GRAY.default,
                  "storeProductId": "",
                  "etcVendorItemId": "",
                  "storeUrl": ""
                },

                {
                  "id": 0,
                  "state": 0,
                  "siteCode": "B719",
                  "default": ICON.WEMAKEPRICE_ICON_GRAY.default,
                  "storeProductId": "",
                  "etcVendorItemId": "",
                  "storeUrl": ""
                },

                {
                  "id": 0,
                  "state": 0,
                  "siteCode": "A524",
                  "default": ICON.LOTTEON_ICON_GRAY.default,
                  "storeProductId": "",
                  "etcVendorItemId": "",
                  "storeUrl": ""
                },

                {
                  "id": 0,
                  "state": 0,
                  "siteCode": "A525",
                  "default": ICON.LOTTEON_NORMAL_ICON_GRAY.default,
                  "storeProductId": "",
                  "etcVendorItemId": "",
                  "storeUrl": ""
                },

                {
                  "id": 0,
                  "state": 0,
                  "siteCode": "B956",
                  "default": ICON.TMON_ICON_GRAY.default,
                  "storeProductId": "",
                  "etcVendorItemId": "",
                  "storeUrl": ""
                },

                {
                  "id": 0,
                  "state": 0,
                  "siteCode": "A006",
                  "default": ICON.GMARKET_ICON_GRAY.default,
                  "storeProductId": "",
                  "etcVendorItemId": "",
                  "storeUrl": ""
                },

                {
                  "id": 0,
                  "state": 0,
                  "siteCode": "A001",
                  "default": ICON.AUCTION_ICON_GRAY.default,
                  "storeProductId": "",
                  "etcVendorItemId": "",
                  "storeUrl": ""
                }
              ];

              data.activeProductStore.map((v) => {
                if (v.state === 2) {
                  for (var i in defaultImages) {
                    if (v.siteCode === defaultImages[i].siteCode) {
                      defaultImages[i].id = v.id;
                      defaultImages[i].state = v.state;
                      defaultImages[i].default = shopIcon[v.siteCode];
                      defaultImages[i].storeProductId = v.storeProductId;
                      defaultImages[i].etcVendorItemId = v.etcVendorItemId;
                      defaultImages[i].storeUrl = v.storeUrl;
                    }
                  }
                }
              });

              return <div style={{
                textAlign: "left",
              }}>
                {defaultImages.map((v, i) => (
                  <img
                    id={'ICON-' + v.siteCode}
                    key={i}
                    style={{ cursor: "pointer", width: "16px", margin: "1px" }}
                    src={v.default}
                    alt=""
                    onClick={(e) => {
                      if (v.state !== 2) {
                        return;
                      }

                      switch (v.siteCode) {
                        case "B378": {
                          e.stopPropagation();

                          if (v.storeProductId === "0") {
                            if (v.etcVendorItemId === "0") {
                              alert("상품이 존재하지 않습니다.")
                            } else {
                              setRefreshUrlCoupang(v);
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
                ))}
              </div>
            },
          },
          {
            title: "카테고리",
            align: "center",
            width: "125px",
            render: (data: Product) => {
              let listA077 = data.categoryA077Name ? data.categoryA077Name.split(">") : ["설정됨"];
              let lastA077 = listA077[listA077.length - 1].trim();

              let listB378 = data.categoryB378Name ? data.categoryB378Name.split(">") : ["설정됨"];
              let lastB378 = listB378[listB378.length - 1].trim();

              let listA112 = data.categoryA112Name ? data.categoryA112Name.split(">") : ["설정됨"];
              let lastA112 = listA112[listA112.length - 1].trim();

              let listA027 = data.categoryA027Name ? data.categoryA027Name.split(">") : ["설정됨"];
              let lastA027 = listA027[listA027.length - 1].trim();

              let listA006 = data.categoryA006Name ? data.categoryA006Name.split(">") : ["설정됨"];
              let lastA006 = listA006[listA006.length - 1].trim();

              let listA001 = data.categoryA001Name ? data.categoryA001Name.split(">") : ["설정됨"];
              let lastA001 = listA001[listA001.length - 1].trim();

              let listB719 = data.categoryB719Name ? data.categoryB719Name.split(">") : ["설정됨"];
              let lastB719 = listB719[listB719.length - 1].trim();

              let listA113 = data.categoryA113Name ? data.categoryA113Name.split(">") : ["설정됨"];
              let lastA113 = listA113[listA113.length - 1].trim();

              let listA524 = data.categoryA524Name ? data.categoryA524Name.split(">") : ["설정됨"];
              let lastA524 = listA524[listA524.length - 1].trim();

              let listA525 = data.categoryA525Name ? data.categoryA525Name.split(">") : ["설정됨"];
              let lastA525 = listA525[listA525.length - 1].trim();

              let listB956 = data.categoryB956Name ? data.categoryB956Name.split(">") : ["설정됨"];
              let lastB956 = listB956[listB956.length - 1].trim();

              return <div style={{
                fontSize: 12,
                height: 60,
                overflowY: "scroll"
              }}>
                <Row style={{
                  textAlign: "left"
                }}>
                  <Col span={5} style={{
                    marginBottom: 3
                  }}>

                    <Tooltip title={`스마트스토어: ${data.categoryA077 ? data.categoryA077Name ? data.categoryA077Name : "설정됨" : "미설정"}`}>
                      <img src={data.categoryA077 ? ICON.NAVER_ICON1.default : ICON.NAVER_ICON1_GRAY.default} alt="" />
                    </Tooltip>
                  </Col>

                  <Col span={19} style={{
                    marginBottom: 3
                  }}>
                    {data.categoryA077 ? lastA077 : "미설정"}
                  </Col>

                  <Col span={5} style={{
                    marginBottom: 3
                  }}>
                    <Tooltip title={`쿠팡: ${data.categoryB378 ? data.categoryB378Name ? data.categoryB378Name : "설정됨" : "미설정"}`}>
                      <img src={data.categoryB378 ? ICON.COUPANG_ICON.default : ICON.COUPANG_ICON_GRAY.default} alt="" />
                    </Tooltip>
                  </Col>

                  <Col span={19} style={{
                    marginBottom: 3
                  }}>
                    {data.categoryB378 ? lastB378 : "미설정"}
                  </Col>

                  <Col span={5} style={{
                    marginBottom: 3
                  }}>
                    <Tooltip title={`인터파크: ${data.categoryA027 ? data.categoryA027Name ? data.categoryA027Name : "설정됨" : "미설정"}`}>
                      <img src={data.categoryA027 ? ICON.INTERPARK_ICON.default : ICON.INTERPARK_ICON_GRAY.default} alt="" />
                    </Tooltip>
                  </Col>

                  <Col span={19} style={{
                    marginBottom: 3
                  }}>
                    {data.categoryA027 ? lastA027 : "미설정"}
                  </Col>

                  <Col span={5} style={{
                    marginBottom: 3
                  }}>
                    <Tooltip title={`11번가 글로벌: ${data.categoryA112 ? data.categoryA112Name ? data.categoryA112Name : "설정됨" : "미설정"}`}>
                      <img src={data.categoryA112 ? ICON.STREET_ICON.default : ICON.STREET_ICON_GRAY.default} alt="" />
                    </Tooltip>
                  </Col>

                  <Col span={19} style={{
                    marginBottom: 3
                  }}>
                    {data.categoryA112 ? lastA112 : "미설정"}
                  </Col>

                  <Col span={5} style={{
                    marginBottom: 3
                  }}>
                    <Tooltip title={`11번가 일반: ${data.categoryA113 ? data.categoryA113Name ? data.categoryA113Name : "설정됨" : "미설정"}`}>
                      <img src={data.categoryA113 ? ICON.STREET_NORMAL_ICON.default : ICON.STREET_NORMAL_ICON_GRAY.default} alt="" />
                    </Tooltip>
                  </Col>

                  <Col span={19} style={{
                    marginBottom: 3
                  }}>
                    {data.categoryA113 ? lastA113 : "미설정"}
                  </Col>

                  <Col span={5} style={{
                    marginBottom: 3
                  }}>
                    <Tooltip title={`위메프: ${data.categoryB719 ? data.categoryB719Name ? data.categoryB719Name : "설정됨" : "미설정"}`}>
                      <img src={data.categoryB719 ? ICON.WEMAKEPRICE_ICON.default : ICON.WEMAKEPRICE_ICON_GRAY.default} alt="" />
                    </Tooltip>
                  </Col>

                  <Col span={19} style={{
                    marginBottom: 3
                  }}>
                    {data.categoryB719 ? lastB719 : "미설정"}
                  </Col>

                  <Col span={5} style={{
                    marginBottom: 3
                  }}>
                    <Tooltip title={`롯데온 글로벌: ${data.categoryA524 ? data.categoryA524Name ? data.categoryA524Name : "설정됨" : "미설정"}`}>
                      <img src={data.categoryA524 ? ICON.LOTTEON_ICON.default : ICON.LOTTEON_ICON_GRAY.default} alt="" />
                    </Tooltip>
                  </Col>

                  <Col span={19} style={{
                    marginBottom: 3
                  }}>
                    {data.categoryA524 ? lastA524 : "미설정"}
                  </Col>

                  <Col span={5} style={{
                    marginBottom: 3
                  }}>
                    <Tooltip title={`롯데온 일반: ${data.categoryA525 ? data.categoryA525Name ? data.categoryA525Name : "설정됨" : "미설정"}`}>
                      <img src={data.categoryA525 ? ICON.LOTTEON_NORMAL_ICON.default : ICON.LOTTEON_NORMAL_ICON_GRAY.default} alt="" />
                    </Tooltip>
                  </Col>

                  <Col span={19} style={{
                    marginBottom: 3
                  }}>
                    {data.categoryA525 ? lastA525 : "미설정"}
                  </Col>

                  <Col span={5} style={{
                    marginBottom: 3
                  }}>
                    <Tooltip title={`티몬: ${data.categoryB956 ? data.categoryB956Name ? data.categoryB956Name : "설정됨" : "미설정"}`}>
                      <img src={data.categoryB956 ? ICON.TMON_ICON.default : ICON.TMON_ICON_GRAY.default} alt="" />
                    </Tooltip>
                  </Col>

                  <Col span={19} style={{
                    marginBottom: 3
                  }}>
                    {data.categoryB956 ? lastB956 : "미설정"}
                  </Col>

                  <Col span={5} style={{
                    marginBottom: 3
                  }}>
                    <Tooltip title={`G마켓: ${data.categoryA006 ? data.categoryA006Name ? data.categoryA006Name : "설정됨" : "미설정"}`}>
                      <img src={data.categoryA006 ? ICON.GMARKET_ICON.default : ICON.GMARKET_ICON_GRAY.default} alt="" />
                    </Tooltip>
                  </Col>

                  <Col span={19} style={{
                    marginBottom: 3
                  }}>
                    {data.categoryA006 ? lastA006 : "미설정"}
                  </Col>

                  <Col span={5} style={{
                    marginBottom: 3
                  }}>
                    <Tooltip title={`옥션: ${data.categoryA001 ? data.categoryA001Name ? data.categoryA001Name : "설정됨" : "미설정"}`}>
                      <img src={data.categoryA001 ? ICON.AUCTION_ICON.default : ICON.AUCTION_ICON_GRAY.default} alt="" />
                    </Tooltip>
                  </Col>

                  <Col span={19} style={{
                    marginBottom: 3
                  }}>
                    {data.categoryA001 ? lastA001 : "미설정"}
                  </Col>
                </Row>
              </div>
            },
            sorter: (a: Product, b: Product) => {
              return onSort(a.category ? a.category.c1Name : "", b.category ? b.category.c1Name : "");
            }
          },
          {
            title: (
              <div style={{ fontSize: "12px" }}>
                상품수집일
                <br />
                상품등록일
              </div>
            ),
            align: "center",
            width: "75px",
            render: (data: Product) => (
              <div style={{ fontSize: "12px", width: "70px" }}>
                {format(new Date(data.createdAt), "yyyy-MM-dd")}
                <br />
                {data.activeProductStore.filter((v: any) => v.state == 2).length > 0 ? format(new Date(data.activeProductStore.filter((v: any) => v.state == 2)[0]?.connectedAt), "yyyy-MM-dd") : "-"}
              </div>
            ),
            // sorter: (a: Product, b: Product) => {
            //   return onSort(Date.parse(a.createdAt), Date.parse(b.createdAt));
            // },
          },
          {
            title: "동영상",
            align: "center",
            width: "55px",
            dataIndex: ["taobaoProduct", "videoUrl"],
            render: (data: string) =>
              <div style={{width: "50px"}}>
                {data ? 
                  <Button icon={<VideoCameraOutlined />} shape="circle" onClick={(e) => {
                    window.open(data);
                  }} />
                :
                  null}
              </div>
          }
        ]}
      />
    </>
  );
};

export default ProductDeliveryTable;
