import { ApolloError, useMutation } from '@apollo/client';
import { Col, Form, Input, Modal, Row, Button, message } from 'antd';
import React, { useState } from 'react';
import MUTATIONS from 'src/apis/mutations';
import { Mutation, MutationChangePasswordByUserArgs } from 'src/types';

interface Props {
	visible: boolean;
	closeChangePasswordModal: () => void;
}

interface IInputs {
	password: string;
	newPassword: string;
	checkNewPassword: string;
}
const initialInputs = {
	password: '',
	newPassword: '',
	checkNewPassword: '',
};

const ChangePasswordModal = ({ visible, closeChangePasswordModal }: Props) => {
	const [inputs, setInputs] = useState<IInputs>(initialInputs);
	const changeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setInputs((p) => ({ ...p, [name]: value }));
	};

	const [changePassword] = useMutation<
		{ changePasswordByUser: Mutation['changePasswordByUser'] },
		MutationChangePasswordByUserArgs
	>(MUTATIONS.CHAGNE_PASSWORD);

	return (
		<Modal
			className='user-market-info-modal'
			visible={visible}
			onCancel={() => {
				closeChangePasswordModal();
				setInputs(initialInputs);
			}}
			footer={false}
			mask={true}
			transitionName=''
			centered
			closable={false}
			style={{ borderRadius: '15px' }}
		>
			<Row style={{ marginBottom: '30px' }}>
				<Col style={{ margin: '0 auto', fontSize: '20px', fontWeight: 'bold' }}>비밀번호 변경</Col>
			</Row>
			<Form
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 17 }}
				onFinish={(e) => {
					if (inputs.newPassword !== inputs.checkNewPassword) {
						message.error('비밀번호가 일치하지 않습니다.');
						return;
					}
					if (inputs.newPassword.length < 7) {
						message.error('비밀번호는 8자리 이상으로 설정해주세요.');
						return;
					}
					closeChangePasswordModal();
					setInputs(initialInputs);
					changePassword({
						variables: {
							currentPassword: inputs.password,
							newPassword: inputs.checkNewPassword,
						},
					})
						.then(() => {
							message.success('비밀번호가 변경되었습니다.');
						})
						.catch((e: ApolloError) => {
							message.error(e.message);
						});
				}}
			>
				<Form.Item label='현재 비밀번호' className='mb-4'>
					<Input.Password
						name='password'
						value={inputs.password}
						onChange={changeInputs}
						spellCheck={false}
						placeholder='현재 비밀번호 입력'
					/>
				</Form.Item>

				<Form.Item label='변경할 비밀번호' className='mb-4'>
					<Input.Password
						name='newPassword'
						value={inputs.newPassword}
						onChange={changeInputs}
						spellCheck={false}
						placeholder='변경할 비밀번호 입력'
					/>
				</Form.Item>
				<Form.Item label='비밀번호 확인' className='mb-4'>
					<Input.Password
						name='checkNewPassword'
						value={inputs.checkNewPassword}
						onChange={changeInputs}
						spellCheck={false}
						placeholder='비밀번호 확인'
					/>
				</Form.Item>
				<Button type='primary' htmlType='submit' className='w-full'>
					변경
				</Button>
			</Form>
		</Modal>
	);
};

export default ChangePasswordModal;
