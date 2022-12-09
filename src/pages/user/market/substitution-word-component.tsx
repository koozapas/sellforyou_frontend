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


const SubstitutionWordComponete = ({ wordList }: ISetWodrComponent) => {
  const [preWord, setPreWord] = useState<string>('');
  const [changeWord, setChangeWord] = useState<string>('')

  const [substitutionWordList, setSubstitutionWordList] = useState<Array<WordTable>>()

  const [addWordByUser] = useMutation<{ addWordByUser: Boolean }, MutationAddWordByUserArgs>(MUTATIONS.ADD_WORD_BY_USER, {
    refetchQueries: ['SELECT_WORD_TABLES_BY_SOMEONE']
  });

  const [deleteWordByUser] = useMutation<{ deleteWordByUser: Boolean }, MutationDeleteWordByUserArgs>(MUTATIONS.DELETE_WORD_BY_USER, {
    refetchQueries: ['SELECT_WORD_TABLES_BY_SOMEONE']
  });
  const [modifyWordByUser] = useMutation<{ modifyWordByUser: Boolean }, MutationModifyWordByUserArgs>(MUTATIONS.MODIFY_WORD_BY_USER);

  useEffect(() => {
    setSubstitutionWordList(wordList?.filter(v => v.replaceWord !== null))
  }, [wordList])

  return (
    <>

      <Row align={"middle"} justify='space-between' style={{ 
        width: '700px', 
        marginBottom: 30
      }}>
        <Col span={8}>
          <Input
            value={preWord}
            onChange={(e) => { setPreWord(e.target.value) }}
            placeholder="치환할 단어"
            style={{ 
              width: "100%", 
              height: "40px", 
              borderRadius: "5px" 
            }}
          />
        </Col>

        <Col span={1} style={{
          textAlign: "center"
        }}>
          {">"}
        </Col>

        <Col span={8}>
          <Input
            value={changeWord}
            onChange={(e) => { setChangeWord(e.target.value) }}
            placeholder="치환될 단어"
            style={{ 
              width: "100%", 
              height: "40px", 
              borderRadius: "5px" 
            }}
          />
        </Col>

        <Col span={1} />

        <Col span={6}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => {
            if (!preWord) {
              message.error('치환할 단어를 입력해주세요.')
              return;
            }
            if (!changeWord) {
              message.error('치환될 단어를 입력해주세요.')
              return;
            }
            addWordByUser({ variables: { findWord: preWord, replaceWord: changeWord } })
              .then((res) => {
                message.success("치환단어가 추가되었습니다.")
                setPreWord('')
                setChangeWord('')
              })
              .catch((e: ApolloError) => { message.error(e.message); })
          }} style={{
            width: "40px",
            height: "40px",
          }} />
        </Col>
      </Row>

      {substitutionWordList?.map((v, i) => {
        return (
          <Row align={"middle"} justify='space-between' style={{ 
            width: '700px',
            marginBottom: 5
          }}>
            <Col span={8}>
              <Input
                placeholder="치환할 단어"
                style={{ 
                  width: "100%", 
                  height: "40px", 
                  borderRadius: "5px" 
                }}
                value={v.findWord}
                onChange={(e) => {
                  const value = e.target.value;
                  setSubstitutionWordList(p => {
                    const s = [...p];
                    s.splice(i, 1, { ...s[i], findWord: value })
                    return s
                  })
                }}
              />
            </Col>

            <Col span={1} style={{
              textAlign: "center"
            }}>
              {">"}
            </Col>

            <Col span={8}>
              <Input
                placeholder="치환될 단어"
                style={{ 
                  width: "100%", 
                  height: "40px", 
                  borderRadius: "5px" 
                }}
                value={v.replaceWord}
                onChange={(e) => {
                  const value = e.target.value;
                  setSubstitutionWordList(p => {
                    const s = [...p];
                    s.splice(i, 1, { ...s[i], replaceWord: value })
                    return s
                  })
                }}
              />
            </Col>

            <Col span={1} />

            <Col span={6}>
              {/* <Button type="primary" icon={<EditOutlined />} onClick={() => {
                modifyWordByUser({ variables: { wordId: v.id, findWord: v.findWord, replaceWord: v.replaceWord } })
                .then((res) => { message.success("치환단어가 수정되었습니다.") })
                .catch((e: ApolloError) => { message.error(e.message); })
              }} style={{
                width: "40px",
                height: "40px",
              }} />

              &nbsp; */}

              <Button danger type="primary" icon={<DeleteOutlined />} onClick={() => {
                deleteWordByUser({ variables: { wordId: v.id } })
                .then((res) => { message.success("치환단어가 삭제되었습니다.") })
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

export default SubstitutionWordComponete
