import { ApolloError, useMutation } from '@apollo/client';
import { Button, Col, Input, InputNumber, message, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import MUTATIONS from 'src/apis/mutations';
import { MutationUpdatePlanInfoByAdminArgs, PlanInfo } from 'src/types';

const { TextArea } = Input;

interface IProps {
	info: PlanInfo;
}

interface IInitialPlanData {
	name: string;
	description: string;
	price: number;
}
const initialPlanData = {
	name: '',
	description: '',
	price: 0,
};
const UpdatePlanInfoPage = ({ info }: IProps) => {
	const [planData, setPlanData] = useState<IInitialPlanData>(initialPlanData);
	useEffect(() => {
		setPlanData({
			name: info.name,
			description: info.description,
			price: info.price,
		});
	}, [info]);

	const [updatePlanInfo] = useMutation<{ updatePlanInfoByAdmin: PlanInfo }, MutationUpdatePlanInfoByAdminArgs>(
		MUTATIONS.UPDATE_PLAN_INFO_BY_ADMIN,
		{
			refetchQueries: ['PLAN_INFO'],
		},
	);

	return (
		<>
			<Row className='mb-3' align='middle'>
				<Col span={2}>결제 유형</Col>
				<Col>{info.id > 4 ? (info.id === 5 ? '이미지 번역 서비스' : '재고관리') : '이용료'}</Col>
			</Row>
			<Row className='mb-3' align='middle'>
				<Col span={2}>제목</Col>
				<Col>
					<Input
						style={{ width: '700px' }}
						maxLength={50}
						spellCheck={false}
						value={planData.name}
						onChange={(e) => {
							setPlanData({ ...planData, name: e.target.value });
						}}
					/>
				</Col>
			</Row>
			<Row className='mb-3' align='middle'>
				<Col span={2}>설명</Col>
				<Col>
					<TextArea
						rows={1}
						autoSize={true}
						style={{ width: '700px' }}
						spellCheck={false}
						value={planData.description}
						onChange={(e) => {
							setPlanData({ ...planData, description: e.target.value });
						}}
					/>
				</Col>
			</Row>
			<Row className='mb-3' align='middle'>
				<Col span={2}>가격</Col>
				<Col>
					<InputNumber
						style={{ width: '150px' }}
						min={0}
						formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
						value={planData.price}
						onChange={(e) => {
							setPlanData({ ...planData, price: e as number });
						}}
					/>
					&nbsp;원
				</Col>
			</Row>
			<Row className='mb-3' align='middle'>
				<Col span={2} />
				<Col>
					<Button
						type={'primary'}
						onClick={() => {
							updatePlanInfo({
								variables: {
									planId: info.id,
									name: planData.name,
									description: planData.description,
									price: planData.price,
									isActive: true,
								},
							})
								.then((res) => message.success('결제정보가 변경되었습니다.'))
								.catch((e: ApolloError) => {
									message.error(e.message);
								});
						}}
					>
						변경
					</Button>
				</Col>
			</Row>
		</>
	);
};

export default UpdatePlanInfoPage;
