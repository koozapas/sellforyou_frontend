import { Card, Row, Col, Input, Button, Select, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import {
	Faq,
	FaqCategory,
	MutationCreateFaqByAdminArgs,
	MutationUpdateFaqByAdminArgs,
	QuerySelectFaqsByEveryoneArgs,
} from 'src/types';
import QUERIES from 'src/apis/queries';
import querystring from 'query-string';

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ImageDrop } from 'quill-image-drop-module';
import MUTATIONS from 'src/apis/mutations';
import { onApolloError } from 'src/common/functions';

Quill.register('modules/imageDrop', ImageDrop);

const { Option } = Select;

const toolbar = {
	toolbar: {
		container: [
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
			[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
			['link', 'image', 'video'],
			// ["clean"],
		],
		// handlers: {},
		// imageDrop: true
	},
	// imageResize,
	// clipboard: { matchVisual: false },
	// imageDrop: true,
};

const formats = [
	'header',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'size',
	'color',
	'list',
	'bullet',
	'indent',
	'link',
	'image',
	'align',
];

const WriteFAQ = () => {
	const history = useHistory();
	const queryStringValue = querystring.parse(history.location.search);

	const [category, setCategory] = useState<number | null>();
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');

	const quillRef = useRef<ReactQuill>(null);

	//수정시 수정할 데이터 불러오기
	const { data: selectFaqData } = useQuery<{ selectFaqsByEveryone: Faq[] }, QuerySelectFaqsByEveryoneArgs>(
		QUERIES.SELECT_FAQS_BY_EVERYONE,
		{
			variables: { where: { id: { equals: Number(queryStringValue.id) } } },
			skip: !queryStringValue.id,
			onError: onApolloError,
		},
	);
	const modifyData = selectFaqData?.selectFaqsByEveryone[0];

	//카테고리 목록 불러오기
	const { data: faqListData } = useQuery<{
		selectFaqCategoriesByEveryone: FaqCategory[];
	}>(QUERIES.FAQ_DATA_LIST, { onError: onApolloError });
	const categoryList = faqListData?.selectFaqCategoriesByEveryone;

	const [createFaqByAdmin] = useMutation<{ createFaqByAdmin: Boolean }, MutationCreateFaqByAdminArgs>(
		MUTATIONS.CREATE_FAQ_BY_ADMIN,
	);

	const [updateFaqByAdmin] = useMutation<{ updateFaqByAdmin: Boolean }, MutationUpdateFaqByAdminArgs>(
		MUTATIONS.UPDATE_FAQ_BY_ADMIN,
	);

	const createHandleButton = () => {
		if (category === 0) {
			message.error('카테고리를 선택해주세요.');
			return;
		}
		if (!title) {
			message.error('제목을 입력해주세요.');
			return;
		}
		if (!content) {
			message.error('내용을 입력해주세요.');
			return;
		}
		createFaqByAdmin({
			variables: { faqCategoryId: category, title: title, content: content },
		})
			.then((res) => {
				message.success('FAQ가 등록되었습니다.');
				setTimeout(() => history.goBack(), 500);
			})
			.catch((e: ApolloError) => {
				message.error(e);
			});
	};

	const modifyHandleButton = () => {
		updateFaqByAdmin({
			variables: {
				faqId: Number(queryStringValue.id),
				faqCategoryId: category,
				title: title,
				content: content,
			},
		})
			.then((res) => {
				message.success('FAQ가 수정되었습니다.');
				setTimeout(() => history.goBack(), 500);
			})
			.catch((e: ApolloError) => {
				message.error(e);
			});
	};

	useEffect(() => {
		if (modifyData) {
			setCategory(modifyData.categoryId);
			setTitle(modifyData.title);
			setContent(modifyData.content);
		}
	}, [modifyData, selectFaqData]);

	return (
		<Card title={<div>FAQ {!modifyData ? '작성' : '수정'}</div>}>
			<Row align='middle' className='mb-5'>
				<Col className='mr-3'>카테고리</Col>
				<Col>
					<Select
						value={category}
						style={{ width: '200px' }}
						placeholder='메뉴를 선택해주세요'
						onChange={(e) => setCategory(Number(e))}
					>
						{categoryList?.map((v, i) => (
							<Option key={i} value={v.id}>
								{v.name}
							</Option>
						))}
					</Select>
				</Col>
			</Row>

			<Row align='middle' className='mb-5'>
				<Col className='mr-3'>제목</Col>
				<Col className='w-11/12'>
					<Input
						value={title}
						spellCheck={false}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
				</Col>
			</Row>
			<Row>
				<Col className='mr-3'>내용</Col>
				<Col className='w-11/12'>
					<ReactQuill
						style={{ width: '100%', height: '300px', display: 'inline-block' }}
						ref={quillRef}
						value={content}
						onChange={(content) => setContent(content)}
						modules={toolbar}
						formats={formats}
					/>
				</Col>
			</Row>
			<Row justify='center'>
				<Col>
					<Button
						type={'primary'}
						style={{ fontSize: '20px', fontWeight: 700, height: '40px' }}
						onClick={() => {
							!modifyData ? createHandleButton() : modifyHandleButton();
						}}
					>
						{!modifyData ? '등록' : '수정'}
					</Button>
				</Col>
				<Col>
					<Button
						style={{
							fontSize: '20px',
							fontWeight: 700,
							height: '40px',
							marginLeft: '20px',
						}}
						onClick={() => {
							history.goBack();
						}}
					>
						목록
					</Button>
				</Col>
			</Row>
		</Card>
	);
};

export default WriteFAQ;
