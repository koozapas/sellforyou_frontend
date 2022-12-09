import { ApolloError, useMutation } from '@apollo/client';
import { Button, Col, Input, message, Row } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import MUTATIONS from 'src/apis/mutations';
import ICON from 'src/assets/icon';
import { MutationAddWordByUserArgs, MutationDeleteWordByUserArgs, MutationModifyWordByUserArgs, WordTable } from 'src/types';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
interface ISetWodrComponent {
  wordList: WordTable[];
}


const InhibitionWordComponete = ({ wordList }: ISetWodrComponent) => {

  const [addWordByUser] = useMutation<{ addWordByUser: Boolean }, MutationAddWordByUserArgs>(MUTATIONS.ADD_WORD_BY_USER, {
    refetchQueries: ['SELECT_WORD_TABLES_BY_SOMEONE']
  });
  const [deleteWordByUser] = useMutation<{ deleteWordByUser: Boolean }, MutationDeleteWordByUserArgs>(MUTATIONS.DELETE_WORD_BY_USER, {
    refetchQueries: ['SELECT_WORD_TABLES_BY_SOMEONE']
  });
  const [modifyWordByUser] = useMutation<{ modifyWordByUser: Boolean }, MutationModifyWordByUserArgs>(MUTATIONS.MODIFY_WORD_BY_USER);

  const [inhibitionWord, setInhibitionWord] = useState<string>("")
  const [inhibitionWordList, setInhibitionWordList] = useState<Array<WordTable>>()


  useEffect(() => {
    setInhibitionWordList(wordList?.filter(v => v.replaceWord === null))
  }, [wordList])

  return (
    <>
      <Row align={"middle"} justify='space-between' style={{ 
        width: '700px', 
        marginBottom: 30
      }}>
        <Col span={17}>
          <Input
            style={{ 
              width: "100%", 
              height: "40px",
              borderRadius: "5px"
             }}
            value={inhibitionWord}
            onChange={(e) => setInhibitionWord(e.target.value)}
            placeholder="금지어를 입력해주세요."
          />
        </Col>

        <Col span={1} />

        <Col span={6}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => {
            if (!inhibitionWord) {
              message.error('금지할 단어를 입력해주세요.')
            } else {
              addWordByUser({ variables: { replaceWord: null, findWord: inhibitionWord } })
                .then((res) => {
                  message.success("금지어가 추가되었습니다.")
                  setInhibitionWord('')
                })
                .catch((e: ApolloError) => { message.error(e.message); })
            }
          }} style={{
            width: "40px",
            height: "40px",
          }} />
        </Col>
        { }
      </Row>

      {inhibitionWordList?.map((v, i) => {
        return (
          < Row key={i} align={"middle"} justify='space-between' style={{ 
            width: '700px',
            marginBottom: 5
          }}>
            <Col span={17}>
              <Input
                style={{ 
                  width: "100%", 
                  height: "40px",
                  paddingRight: 5, 
                  borderRadius: "5px"
                }}
                value={v.findWord}
                onChange={(e) => {
                  const value = e.target.value;
                  setInhibitionWordList(p => {
                    const s = [...p];
                    s.splice(i, 1, { ...s[i], findWord: value })
                    return s
                  })
                }} 
                placeholder="금지어"
              />
            </Col>

            <Col span={1} />

            <Col span={6}>
              {/* <Button type="primary" icon={<EditOutlined />} onClick={() => {
                modifyWordByUser({ variables: { wordId: v.id, findWord: v.findWord, replaceWord: null } })
                .then((res) => { message.success("금지어가 수정되었습니다.") })
                .catch((e: ApolloError) => { message.error(e.message); })
              }} style={{
                width: "40px",
                height: "40px",
              }} />

              &nbsp; */}

              <Button danger type="primary" icon={<DeleteOutlined />} onClick={() => {
                deleteWordByUser({ variables: { wordId: v.id } })
                .then((res) => { message.success("금지어가 삭제되었습니다.") })
                .catch((e: ApolloError) => { message.error(e.message); })
              }} style={{
                width: "40px",
                height: "40px",
              }} />
            </Col>

          </Row>
        )
      })}
    </>
  )
}

export default InhibitionWordComponete
