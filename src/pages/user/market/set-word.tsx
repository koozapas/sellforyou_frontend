import React, { useCallback, useEffect, useState } from 'react'
import { Card, Tabs, Button, Row, Col, Modal, message, Radio } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import ICON from 'src/assets/icon';
import InhibitionWordComponete from './inhibition-word-component';
import SubsitutionWordComponete from './substitution-word-component';
import { ApolloError, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import QUERIES from 'src/apis/queries';
import { ExcelSampleEnum, MutationAddWordByExcelByUserArgs, QueryGetExcelSampleUrlBySomeoneArgs, QuerySelectWordTablesBySomeoneArgs, WordTable } from 'src/types';
import { IMAGE_SERVER } from 'src/apis/client';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import MUTATIONS from 'src/apis/mutations';

const { TabPane } = Tabs;
const { confirm } = Modal;

const SetWordPage = () => {
  const [wordList, setWordList] = useState<Array<WordTable>>()
  const [selectRadio, setSelectRadio] = useState<boolean>(false); // true -> 치환단어 false -> 금지어

  const { data: selectWordListData, loading: selectWordListLoading, error: selectWordListError } = useQuery<{ selectWordTablesBySomeone: WordTable[] }, QuerySelectWordTablesBySomeoneArgs>(QUERIES.SELECT_WORD_TABLES_BY_SOMEONE)
  //금지어 엑셀 양식 다운로드
  const { data: denyWordExcelSampleUrlData } = useQuery<{ getExcelSampleUrlBySomeone: String }, QueryGetExcelSampleUrlBySomeoneArgs>(QUERIES.GET_EXCEL_SAMPLE_URL_BY_SOMEONE, {
    variables: { type: "DENY_WORD" as ExcelSampleEnum }
  })
  //치환단어 엑셀 양식 다운로드
  const { data: replaceWordExcelSampleUrlData } = useQuery<{ getExcelSampleUrlBySomeone: String }, QueryGetExcelSampleUrlBySomeoneArgs>(QUERIES.GET_EXCEL_SAMPLE_URL_BY_SOMEONE, {
    variables: { type: "REPLACE_WORD" as ExcelSampleEnum }
  })

  //엑셀 업로드
  const [uploadExcelFile] = useMutation<{ addWordByExcelByUser: Boolean }, MutationAddWordByExcelByUserArgs>(MUTATIONS.ADD_WORD_BY_EXCEL_BY_USER, {
    refetchQueries: ['SELECT_WORD_TABLES_BY_SOMEONE']
  })

  const handleExcelChangeFile = (event: UploadChangeParam<UploadFile<any>>) => {
    if (!event) return;
    if (event.file) {
      confirm({
        title: <>{selectRadio ? "치환단어" : "금지어"}를 업로드 하시겠습니까?</>,
        centered: true,
        onOk() {
          uploadExcelFile({
            variables: { data: event.file, isReplace: selectRadio }
          })
            .then((result: any) => { message.success("업로드 되었습니다.") })
            .catch((e: ApolloError) => { message.error(e.message); })
        },
      })
    };
  };

  useEffect(() => {
    setWordList(selectWordListData?.selectWordTablesBySomeone)
  }, [selectWordListData])

  return (
    <Card >
      <Tabs type='card'>
        <TabPane tab={<div className="taps-label-style" >금지어</div>} key='1'>
          <InhibitionWordComponete
            wordList={wordList}
          />
        </TabPane>
        <TabPane tab={<div className="taps-label-style" >치환단어</div>} key='2'>
          <SubsitutionWordComponete
            wordList={wordList}
          />
        </TabPane>
        <TabPane tab={<div className="taps-label-style" >엑셀 업로드</div>} key='3'>
          <div>
            <Radio.Group onChange={(e) => { setSelectRadio(e.target.value) }} value={selectRadio}>
              <Radio value={false}>금지어</Radio>
              <Radio value={true}>치환단어</Radio>
            </Radio.Group>
            <br /><br />
            <Dragger
              style={{ width: '100%', padding: '20px 0' }}
              // multiple
              maxCount={1}
              accept={'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}
              beforeUpload={() => false}
              showUploadList={false}
              onChange={e => {
                if (!e) return;
                if (e.file) {
                  handleExcelChangeFile(e)
                }
              }}
            >
              <span style={{ fontSize: '18px' }}>파일을 해당 영역에 드래그 하거나 업로드 하세요.</span>
            </Dragger>
            <Row className="mt-4 w-full">
              <Col style={{ margin: '' }}>
                <a download href={`${IMAGE_SERVER}/${denyWordExcelSampleUrlData?.getExcelSampleUrlBySomeone}`} style={{ marginRight: '20px' }}>
                  < Button
                    type='primary'
                  >
                    금지어 양식 다운로드
                  </Button >
                </a >
                <a download href={`${IMAGE_SERVER}/${replaceWordExcelSampleUrlData?.getExcelSampleUrlBySomeone}`}>
                  <Button
                    type='primary'
                  >
                    치환단어 양식 다운로드
                  </Button>
                </a>
              </Col >
            </Row >
          </div >
        </TabPane >
      </Tabs >

    </Card >
  )
}
export default SetWordPage
