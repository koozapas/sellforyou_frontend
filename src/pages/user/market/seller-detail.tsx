import { Button, Card, Descriptions, Select, Input, Radio } from 'antd'
import React, { useState } from 'react'

const { Option } = Select;

interface Props {

}


const SellerDetail = (props: Props) => {
  const [usingId, setUsingId] = useState(true);
  return (
    <div>
      <Card>
        <Descriptions title="계정 추가" bordered style={{ marginBottom: '30px' }}>
          <Descriptions.Item label="판매 스토어" span={3}>
            <Select defaultValue="jack" style={{ width: '30%', marginRight: '20px' }} onChange={() => { }}>
              <Option value="jack">스마트스토어</Option>
              <Option value="lucy">11번가</Option>
              <Option value="a">옥션</Option>
              <Option value="b">G마켓</Option>
              <Option value="c">메이크샵</Option>
              <Option value="d">마이소호</Option>
              <Option value="e">쿠팡</Option>
            </Select>
            <Button type="primary">메뉴얼</Button>
          </Descriptions.Item>
          <Descriptions.Item label="아이디" span={3}><Input style={{ width: '30%' }} /></Descriptions.Item>
          <Descriptions.Item label="비밀번호" span={3}><Input type="password" style={{ width: '30%' }} /></Descriptions.Item>
          <Descriptions.Item label="사용구분" span={3}>
            <Radio.Group onChange={() => { setUsingId(!usingId) }} value={usingId}>
              <Radio value={true}>사용함</Radio>
              <Radio value={false}>사용안함</Radio>
            </Radio.Group>
          </Descriptions.Item>
        </Descriptions>
        <Button type="primary" style={{ width: '100px', height: '50px', fontSize: '20px', fontWeight:600 }}>저장</Button>
      </Card>
    </div>
  )
}

export default SellerDetail;
