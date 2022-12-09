import { Card, Upload } from 'antd'
import React, { useState } from 'react'

const { Dragger } = Upload;

interface Props {

}

const OrderExcel = (props: Props) => {

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: 'First',
      content: 'First-content',
    },
    {
      title: 'Second',
      content: 'Second-content',
    },
    {
      title: 'Last',
      content: 'Last-content',
    },
  ];

  return (
    <Card>
      <div style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '16px', fontWeight: 600, marginRight: '50px' }}>엑셀 일괄 송장등록</span>
      </div>
      <Card>
        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '14px', fontWeight: 500, marginRight: '50px' }}>엑셀 파일 등록</span>
        </div>
        <Dragger
          style={{ width: '100%', padding:'20px 0' }}
          // multiple
          accept={'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}
          onChange={e => {
            if (!e) return;
          }}>
            <span style={{ fontSize:'18px'}}>파일을 해당 영역에 드래그 하거나 업로드 하세요.</span>
        </Dragger>
        {/* 데이터 있을경우 테이블 생성 해야됨 */}
      </Card>
    </Card>
  )
}

export default OrderExcel