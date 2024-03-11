import React, { useState } from 'react';
import { Card, Table, Input, Row, Col } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QuerySelectUserQuestionBySomeoneArgs, UserQuestion } from 'src/types';
import QUERIES from 'src/apis/queries';
import { transUtcToDate } from 'src/common/transform';

const { Search } = Input;

const columns = [
	{
		title: 'No',
		dataIndex: 'id',
	},
	{
		title: 'No',
		dataIndex: ['user', 'email'],
	},
	{
		title: '제목',
		dataIndex: 'title',
	},
	{
		title: '내용',
		dataIndex: 'content',
	},
	{
		title: '답변여부',
		dataIndex: 'answer',
		render: (data: string) =>
			data ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />,
	},
	{
		title: '답변일',
		dataIndex: 'answeredAt',
		render: (data: string) => (data ? transUtcToDate(data) : ''),
		key: 'name',
		width: '18%',
	},
	{
		title: '문의일',
		dataIndex: 'createdAt',
		render: (data: string) => (data ? transUtcToDate(data) : ''),
		key: 'name',
		width: '18%',
	},
];

const AdminInquiry = () => {
	const history = useHistory();
	const [pageSize, setPageSize] = useState<number>(10); // n개씩 보기

	const { data: questionData } = useQuery<
		{ selectUserQuestionBySomeone: UserQuestion[] },
		QuerySelectUserQuestionBySomeoneArgs
	>(QUERIES.QUESTION_BY_SOMEONE);

	return (
		<Card>
			<Row align='middle' justify='space-between'>
				<Col style={{ fontSize: '16px', fontWeight: 600, marginRight: '50px' }}>고객문의</Col>
				<Col>
					<Search
						style={{ display: 'inline-block', width: '227px' }}
						type='number'
						placeholder='데이터 출력 수'
						enterButton='변경'
						onSearch={(e) => {
							setPageSize(Number(e));
						}}
					/>
				</Col>
			</Row>
			<Table
				size='small'
				style={{ marginTop: '20px' }}
				columns={columns}
				dataSource={questionData?.selectUserQuestionBySomeone}
				pagination={{
					pageSize: pageSize,
					showSizeChanger: false,
				}}
				onRow={(record) => {
					return {
						onClick: () => {
							history.push(`/admin/customer-center/inquiry-detail?id=${record.id}`);
						},
					};
				}}
			/>
		</Card>
	);
};

export default AdminInquiry;
