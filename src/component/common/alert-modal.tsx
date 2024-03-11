import React, { useState } from 'react';
import { Button, Modal, Table } from 'antd';
import { useMutation, ApolloError } from '@apollo/client';
import MUTATIONS from 'src/apis/mutations';
import { UserLog, MutationUpdateUserLogArgs } from 'src/types';
import { format } from 'date-fns';
import { async } from 'q';

interface Props {
	logData: UserLog[];
	visible: boolean;

	closeAlertModal: () => void;
}

const AlertModal = ({ logData, visible, closeAlertModal }: Props) => {
	const [updateUserLogByUser] = useMutation<{ updateUserLogByUser: Boolean }, MutationUpdateUserLogArgs>(
		MUTATIONS.UPDATE_USER_LOG_BY_USER,
		{
			refetchQueries: ['SELECT_USER_LOG_BY_USER'],
		},
	);

	const [detail, setDetail] = useState<string>('');

	return (
		<Modal
			visible={visible}
			onCancel={closeAlertModal}
			footer={false}
			closable={false}
			transitionName=''
			centered
			width={'768px'}
		>
			<div
				style={{
					fontSize: 'large',
					textAlign: 'center',
				}}
			>
				공지사항
			</div>

			<br />

			{detail === '' ? (
				<div
					style={{
						textAlign: 'center',
					}}
				>
					<span
						style={{
							color: 'red',

							fontSize: 12,
							fontWeight: 'bold',
						}}
					>
						알림 내역은 일주일 전까지 표시됩니다.
					</span>

					<br />
					<br />

					<Table
						size='middle'
						rowKey={(record: UserLog) => record.id ?? 0}
						dataSource={logData?.filter((v) => !JSON.parse(v.payloadData).title)}
						columns={[
							{
								title: '',
								dataIndex: 'isRead',
								render: (data: any) => {
									return (
										<div
											style={{
												color: 'red',

												fontSize: 12,
												fontWeight: 'bold',
											}}
										>
											{data ? null : 'NEW'}
										</div>
									);
								},

								width: '5%',
							},

							{
								title: '제목',
								dataIndex: 'title',
								render: (data: any) => {
									return (
										<div
											style={{
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
												width: '400px',
												height: '20px',
											}}
										>
											{data}
										</div>
									);
								},

								width: '70%',
							},

							{
								title: '등록일자',
								dataIndex: 'createdAt',
								render: (data: any) => {
									return <div>{format(new Date(data), 'yyyy-MM-dd HH:mm:ss')}</div>;
								},

								width: '25%',
							},
						]}
						onRow={(record) => {
							return {
								onClick: async () => {
									await updateUserLogByUser({
										variables: {
											id: record.id,
											isRead: true,
										},
									})
										.then(() => {
											var data =
												`
                                        <div style="font-weight: bold;">
                                            ${record.title}
                                        </div>

                                        <br />
                                    ` + JSON.parse(record.payloadData);

											setDetail(data);
										})
										.catch((e: ApolloError) => {
											console.log(e.message);
										});
								},
							};
						}}
					/>
				</div>
			) : (
				<div>
					<div dangerouslySetInnerHTML={{ __html: detail }}></div>

					<br />

					<Button
						onClick={() => {
							setDetail('');
						}}
					>
						목록으로 돌아가기
					</Button>
				</div>
			)}
		</Modal>
	);
};

export default AlertModal;
