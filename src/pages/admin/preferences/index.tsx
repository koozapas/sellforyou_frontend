import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { Button, Card, Col, InputNumber, message, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import MUTATIONS from 'src/apis/mutations';
import QUERIES from 'src/apis/queries';
import { MutationUpdateCnyRateByAdminArgs } from 'src/types';

const PreferencesPage = () => {
	//카테고리 업데이트 뮤태이션
	const [updateCategoryMutation] = useMutation<{ updateCategoryStoreDataByAdmin: Boolean }>(MUTATIONS.CATEGORY_UPDATE);

	//고시환율 조회 쿼리, 뮤태이션
	const { data: cnyRateData } = useQuery<{ selectCnyRateByEveryone: number }>(QUERIES.GET_CNY_RATE);

	const [updateCnyRate] = useMutation<{ updateCnyRateByAdmin: number }, MutationUpdateCnyRateByAdminArgs>(
		MUTATIONS.UPDATE_CNY_RATE,
	);
	const [cnyRate, setCnyRate] = useState(0);

	useEffect(() => {
		setCnyRate(cnyRateData?.selectCnyRateByEveryone ?? 0);
	}, [cnyRateData]);

	return (
		<Card title='고시환율 및 카테고리'>
			<Row align='middle' className='mb-4'>
				<Col style={{ width: '80px' }}>카테고리 :</Col>
				<Col>
					<Button
						onClick={() => {
							updateCategoryMutation();
						}}
					>
						업데이트
					</Button>
				</Col>
			</Row>
			<Row align='middle'>
				<Col style={{ width: '80px' }}>고시환율 :</Col>
				<Col>
					<InputNumber
						value={cnyRate}
						onChange={(e) => {
							setCnyRate(e as number);
						}}
					/>
					<Button
						style={{ verticalAlign: 'top' }}
						onClick={() => {
							updateCnyRate({ variables: { cnyRate: cnyRate } })
								.then(() => message.success('고시환율이 변경되었습니다.'))
								.catch((e: ApolloError) => {
									message.error(e.message);
								});
						}}
					>
						변경
					</Button>
				</Col>
			</Row>
		</Card>
	);
};

export default PreferencesPage;
