import { ApolloError, useMutation } from '@apollo/client';
import { Button, Card, Form, Input, message, Row } from 'antd';
import React, { useState } from 'react';
import MUTATIONS from 'src/apis/mutations';
import { MutationChangeMyPasswordByAdminArgs } from 'src/types';

interface IChangeInputs {
	currentPassword: string;
	newPassword: string;
}

const initialChangeInputs = {
	currentPassword: '',
	newPassword: '',
};

const ChangeAdminPasswordPage = () => {
	const [changeInputs, setChangeInputs] = useState<IChangeInputs>(initialChangeInputs);

	const changeInputsHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setChangeInputs((p) => ({ ...p, [name]: value }));
	};

	const [changeAdminPassword] = useMutation<{ changeMyPasswordByAdmin: Boolean }, MutationChangeMyPasswordByAdminArgs>(
		MUTATIONS.CHANGE_PASSWORD_BY_ADMIN,
	);

	return (
		<Card title='관리자 비밀번호 변경'>
			<Row>
				<Form
					style={{ width: '330px' }}
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 20 }}
					onFinish={() => {
						if (changeInputs.newPassword.length < 8) {
							message.error('비밀번호는 8자리 이상으로 설정해주세요.');
						} else {
							changeAdminPassword({
								variables: { currentPassword: changeInputs.currentPassword, newPassword: changeInputs.newPassword },
							})
								.then((response: any) => {
									setChangeInputs(initialChangeInputs);
									message.success('비밀번호가 변경되었습니다.');
								})
								.catch((e: ApolloError) => {
									message.error(e.message);
								});
						}
					}}
				>
					<Form.Item label='이전 비밀번호' className='mb-3'>
						<Input.Password
							placeholder='이전 비밀번호 입력'
							name='currentPassword'
							value={changeInputs.currentPassword}
							onChange={changeInputsHandle}
							spellCheck={false}
						/>
					</Form.Item>
					<Form.Item label='새 비밀번호'>
						<Input.Password
							placeholder='새 비밀번호 입력'
							name='newPassword'
							value={changeInputs.newPassword}
							onChange={changeInputsHandle}
							spellCheck={false}
						/>
					</Form.Item>
					<Button
						// type="submit"
						type='primary'
						htmlType='submit'
						style={{ margin: '15px 0 0 110px' }}
					>
						비밀번호 변경
					</Button>
				</Form>
			</Row>
		</Card>
	);
};

export default ChangeAdminPasswordPage;
