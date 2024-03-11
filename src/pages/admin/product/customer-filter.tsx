import React, { useState } from 'react';
// import MUTATIONS from 'src/apis/mutations';

// import { Row, Col, Input, Select } from 'antd';
// import { useMutation } from '@apollo/client';
// import {
// 	MutationSetMaxProductLimitByAdminArgs,
// 	MutationSetPurchaseInfoByAdminArgs,
// 	MutationsetUserStopTest,
// 	MutationDeleteUser,
// 	MutationDeleteUserProduct,
// } from 'src/types';

// const { Search } = Input;
// const { Option } = Select;

// interface IProps {
// 	userListRefetch: (_) => void;
// 	selectedItemIds?: Array<number>;
// 	setSelectedItemIds: (e) => void;
// 	setPageSize: (e) => void;
// }

// const CustomerFilter = ({ userListRefetch, selectedItemIds, setSelectedItemIds, setPageSize }: IProps) => {
// 	const [changeSelectBox, setChangeSelectBox] = useState<string>('siteCode');
// 	const [isDeleteUserAvailable, setIsDeleteUserAvailable] = useState<boolean>(true);

// 	const [setPurchaseInfoByAdmin] = useMutation<{ setPurchaseInfoByAdmin: boolean }, MutationSetPurchaseInfoByAdminArgs>(
// 		MUTATIONS.SET_PURCHASE_INFO_BY_ADMIN,
// 		{
// 			refetchQueries: ['USER_LIST_BY_ADMIN'],
// 		},
// 	);

// 	const [setUserStopTest] = useMutation<{ setUserStopTest: Boolean }, MutationsetUserStopTest>(
// 		MUTATIONS.SET_USER_STOP_TEST,
// 		{
// 			refetchQueries: ['USER_LIST_BY_ADMIN'],
// 		},
// 	);

// 	const [deleteUser] = useMutation<{ deleteUserByAdmin: Boolean }, MutationDeleteUser>(MUTATIONS.DELETE_USER_BY_ADMIN, {
// 		refetchQueries: ['USER_LIST_BY_ADMIN'],
// 	});

// 	const [deleteUserProduct] = useMutation<{ deleteUserProductByAdmin: Boolean }, MutationDeleteUserProduct>(
// 		MUTATIONS.DELETE_USER_PRODUCT_BY_ADMIN,
// 		{
// 			refetchQueries: ['USER_LIST_BY_ADMIN'],
// 		},
// 	);

// 	const [setMaxProductLimitByAdmin] = useMutation<
// 		{ setMaxProductLimitByAdmin: boolean },
// 		MutationSetMaxProductLimitByAdminArgs
// 	>(MUTATIONS.SET_MAX_PRODUCT_LIMIT_BY_ADMIN, {
// 		refetchQueries: ['USER_LIST_BY_ADMIN'],
// 	});

// 	const search = (e: string) => {
// 		const filtered = e.trim();
// 		if (!filtered.includes('SFY_')) {
// 			alert('상품코드는 SFY_000 형식으로 입력해주세요.');

// 			return;
// 		}

// 		let list: any = [];
// 		let parseList: any = [];

// 		list = filtered.split(',');
// 		list.map((v: any) => {
// 			if (!v.includes('SFY_')) {
// 				alert('모든 상품코드는 SFY_000 형식으로 입력해주세요.');
// 				return;
// 			}
// 			parseList.push(parseInt(v.split('_')[1], 36));
// 		});

// 		// this.setSearchWhereOrInput([{ id: { in: parseList } }]);
// 		console.log(parseList);
// 		if (changeSelectBox === 'siteCode') {
// 			// userListRefetch({ where: { email: { contains: filtered } } });
// 		}
// 	};

// 	return (
// 		<Row justify='space-between'>
// 			<Row className='mb-4'>
// 				<Col style={{ marginRight: '5px' }}>
// 					<Select
// 						style={{ width: '150px' }}
// 						defaultValue='상품코드'
// 						onChange={(e) => {
// 							setChangeSelectBox(e);
// 						}}
// 					>
// 						<Option value={'siteCode'}>상품코드</Option>
// 					</Select>
// 				</Col>

// 				<Col style={{ marginRight: '50px' }}>
// 					<Search
// 						style={{ width: ' 300px' }}
// 						enterButton='검색'
// 						onSearch={(e) => {
// 							search(e);
// 						}}
// 					/>
// 				</Col>
// 			</Row>
// 		</Row>
// 	);
// };

// export default CustomerFilter;
