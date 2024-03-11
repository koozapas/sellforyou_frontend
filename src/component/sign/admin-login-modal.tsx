import { Button, Form, Input, message, Modal, Row } from 'antd';
import React, { useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import MUTATIONS from 'src/apis/mutations';
import { MutationSignInAdminByEveryoneArgs, SignInType } from 'src/types';
import { useHistory } from 'react-router-dom';
interface Props {
	visible: boolean;
	closeAdminLoginModal: () => void;
}

interface IInputs {
	id: string;
	password: string;
}
const initialInputs = {
	id: '',
	password: '',
};

const AdminLoginModal = ({ visible, closeAdminLoginModal }: Props) => {
	const history = useHistory();
	const [inputs, setInputs] = useState<IInputs>(initialInputs);
	const changeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setInputs((p) => ({ ...p, [name]: value }));
	};

	const [signInAdmin] = useMutation<{ signInAdminByEveryone: SignInType }, MutationSignInAdminByEveryoneArgs>(
		MUTATIONS.SIGN_IN_ADMIN,
		{ fetchPolicy: 'no-cache' },
	);

	return (
		<Modal
			visible={visible}
			onCancel={() => {
				closeAdminLoginModal();
				setInputs(initialInputs);
			}}
			footer={false}
			transitionName=''
			centered
			closable={false}
			className='login-modal'
			width={'auto'}
		>
			<Row className='account-title' justify={'center'} align={'middle'}>
				어드민 로그인
			</Row>
			<Form
				// labelCol={{ span: 6 }}
				// wrapperCol={{ span: 18 }}
				onFinish={() => {
					signInAdmin({
						variables: { id: inputs.id, password: inputs.password },
					})
						.then((response: any) => {
							const token = response.data?.signInAdminByEveryone;
							localStorage.setItem('accessToken', token.accessToken);
							localStorage.setItem('refreshToken', token.refreshToken);
							closeAdminLoginModal();
							setInputs(initialInputs);
							history.push('/admin/customer');
						})
						.catch((e: ApolloError) => {
							message.error(e.message);
						});
				}}
			>
				<Form.Item label='' className='mb-4'>
					<Input
						name='id'
						size='large'
						placeholder='아이디'
						value={inputs.id}
						onChange={changeInputs}
						spellCheck={false}
					/>
				</Form.Item>

				<Form.Item label='' className='mb-4'>
					<Input.Password
						name='password'
						size='large'
						placeholder='비밀번호'
						value={inputs.password}
						onChange={changeInputs}
						spellCheck={false}
					/>
				</Form.Item>

				<Button
					className='w-full mt-6'
					style={{
						height: '44px',
						borderRadius: '4px',
						fontSize: '16px',
						fontWeight: 700,
					}}
					type='primary'
					htmlType='submit'
				>
					로그인
				</Button>
			</Form>
		</Modal>
	);
};

export default AdminLoginModal;
