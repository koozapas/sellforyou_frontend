import React from "react";
import { Select, Form } from "antd";

const { Option } = Select;

export const sillList = [
  { code: "01", name: "의류" },
  { code: "02", name: "구두/신발" },
  { code: "03", name: "가방" },
  { code: "04", name: "패션잡화(모자/벨트/액세서리)" },
  { code: "05", name: "침구류/커튼" },
  { code: "06", name: "가구(침대/소파/싱크대/DIY제품)" },
  { code: "07", name: "영상가전(TV류)" },
  { code: "08", name: "가정용 전기제품 (냉장고/세탁기/식기세척기/전자레인지)" },
  { code: "09", name: "계절가전(에어컨/온풍기)" },
  { code: "10", name: "사무용기기(컴퓨터/노트북/프린터)" },
  { code: "11", name: "광학기기(디지털카메라/캠코더)" },
  { code: "12", name: "소형가전(MP3/전자사전 등)" },
  { code: "13", name: "휴대폰" },
  { code: "14", name: "내비게이션" },
  { code: "15", name: "자동차용품(자동차부품/기타 자동차용품)" },
  { code: "16", name: "의료기기" },
  { code: "17", name: "주방용품" },
  { code: "18", name: "화장품" },
  { code: "19", name: "귀금속/보석/시계류" },
  { code: "20A", name: "식품(농산물)" },
  { code: "20B", name: "식품(축산물)" },
  { code: "20C", name: "식품(수산물)" },
  { code: "21", name: "가공식품" },
  { code: "22", name: "건강기능식품" },
  { code: "23", name: "영유아용품" },
  { code: "24", name: "악기" },
  { code: "25", name: "스포츠용품" },
  { code: "26", name: "서적" },
  { code: "27", name: "호텔 / 펜션 예약" },
  { code: "28", name: "여행 상품" },
  { code: "29", name: "항공권" },
  { code: "30", name: "자동차 대여 서비스 (렌터카)" },
  { code: "31", name: "물품대여 서비스 (정수기/비데/공기청정기 등)" },
  { code: "32", name: "물품대여 서비스 (서적/유아용품/행사용품 등)" },
  { code: "33", name: "디지털 콘텐츠 (음원/게임/인터넷강의 등)" },
  { code: "34", name: "상품권 / 쿠폰" },
  { code: "35", name: "기타재화" },
  { code: "36", name: "모바일쿠폰" },
  { code: "37", name: "영화/공연" },
  { code: "38", name: "기타용역" },
  { code: "39", name: "생활화학제품" },
  { code: "40", name: "살생물제품" },
];
interface IProps {
  setSillData: (sillcode: string) => void;
  sillData?: string;
}
const CollectionSelectSiilWrapPage = ({ setSillData, sillData }: IProps) => {
  return (
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 19 }}
      initialValues={{ remember: true }}
    >
      <Form.Item>
        <Select
          placeholder="고시정보 선택"
          style={{ width: 500, display: "block" }}
          value={sillData}
          onClick={() => {
            //
          }}
          onChange={(e) => {
            setSillData(e as string);
          }}
        >
          {sillList.map((v, i) => (
            <Option key={i} value={v.code}>
              {v.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default CollectionSelectSiilWrapPage;
