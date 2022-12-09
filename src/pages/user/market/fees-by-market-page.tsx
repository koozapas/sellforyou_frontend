import { Button, Col, InputNumber, Row } from 'antd'
import React from 'react'

const FeesByMarketPage = () => {
  return (
    <>
      <Row className='mb-2'>
        <Col span={5}>
          스마트스토어
        </Col>
        <Col style={{ marginRight: '15px' }}>
          <InputNumber
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
          />%
        </Col>
        <Col span={3}>
          쿠팡
        </Col>
        <Col>
          <InputNumber
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
          />%
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col span={5}>
          11번가
        </Col>
        <Col style={{ marginRight: '15px' }}>
          <InputNumber
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
          />%
        </Col>
        <Col span={3}>
          옥션
        </Col>
        <Col>
          <InputNumber
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
          />%
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col span={5}>
          인터파크
        </Col>
        <Col style={{ marginRight: '15px' }}>
          <InputNumber
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
          />%
        </Col>
        <Col span={3}>
          지마켓
        </Col>
        <Col>
          <InputNumber
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
          />%
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col span={5}>
          티몬
        </Col>
        <Col style={{ marginRight: '15px' }}>
          <InputNumber
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
          />%
        </Col>
        <Col span={3}>
          위메프
            </Col>
        <Col>
          <InputNumber
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
          />%
        </Col>
      </Row>
      <Row>
        <Button
          onClick={() => {
            //
          }}
        >
          적용하기
        </Button>
      </Row>
      <div className="caution">
        <p>* 위 마켓 수수료는 기본값입니다.</p>
        <p>* 일괄 마진율에 더해져 가격에 반영됩니다.</p>
      </div>
    </>
  )
}

export default FeesByMarketPage
