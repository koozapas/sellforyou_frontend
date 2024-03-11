import React from 'react';
import AddAdminPage from 'src/component/admin/manage/add-admin';
import ChangeAdminPasswordPage from 'src/component/admin/manage/change-password';

const ManageAdmin = () => {
	return (
		<>
			<ChangeAdminPasswordPage />
			<AddAdminPage />
		</>
	);
};

export default ManageAdmin;
