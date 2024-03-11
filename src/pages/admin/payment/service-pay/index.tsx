import { useQuery } from '@apollo/client';
import { Card, Table } from 'antd';
import React from 'react';
import QUERIES from 'src/apis/queries';
import { transMoneyFormat } from 'src/common/transform';
import { PlanInfo, QuerySelectPlanInfosForEveryoneArgs } from 'src/types';
import UpdatePlanInfoPage from './update-plan-info-page';

const ServicePayPage = () => {
	//결제 정보 쿼리
	const { data: planInfoData } = useQuery<
		{ selectPlanInfosForEveryone: PlanInfo[] },
		QuerySelectPlanInfosForEveryoneArgs
	>(QUERIES.PLAN_INFO);
	const planInfo = planInfoData?.selectPlanInfosForEveryone;

	const columns = [
		{
			title: '제목',
			dataIndex: 'name',
		},
		{
			title: '결제 유형',
			render: (data: PlanInfo) => (data.id > 4 ? (data.id === 5 ? '이미지 번역 서비스' : '재고관리') : '이용료'),
		},
		{
			title: '설명',
			dataIndex: 'description',
			ellipsis: true,
		},
		{
			title: '가격',
			dataIndex: 'price',
			render: (data: number) => `${transMoneyFormat(data)} 원`,
		},
		{
			title: '기간',
			dataIndex: 'month',
			render: (_, data) => `${data.month} 개월`,
		},
	];
	return (
		<Card title='결제 정보'>
			<Table
				rowKey={(record: PlanInfo) => record.id}
				columns={columns}
				dataSource={planInfo}
				pagination={false}
				expandRowByClick={true}
				expandable={{
					expandedRowRender: (record) => (
						<Card className='mx-auto'>
							<UpdatePlanInfoPage info={record} />
						</Card>
					),
				}}
			/>
		</Card>
	);
};

export default ServicePayPage;
