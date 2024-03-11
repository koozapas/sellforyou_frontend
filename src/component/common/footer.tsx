import React, { useState } from 'react';
import AdminLoginModal from 'src/component/sign/admin-login-modal';

import { useHistory } from 'react-router';
import { useQuery } from '@apollo/client';
import { Button, Col, Layout, Row } from 'antd';

import FOOTTER_LOGO from 'src/assets/image/footer-logo.png';
import QUERIES from 'src/apis/queries';

const { Footer } = Layout;

const FooterComponent = () => {
	const [width, setWidth] = React.useState<number>(window.innerWidth);

	React.useEffect(() => {
		window.addEventListener('resize', () => {
			setWidth(window.innerWidth);
		});
	}, []);

	const history = useHistory();
	const [adminLoginModal, setAdminLoginModal] = useState<boolean>(false);
	const { data: whoAmI } = useQuery<{ whoami: String }>(QUERIES.WHO_AM_I);

	return (
		<>
			{width < 1200 ? null : (
				<Footer style={{ background: '#0F1E31', width: '100%' }}>
					<Row
						style={{
							width: '1200px',
							margin: '0 auto',
						}}
					>
						<Col
							span={18}
							style={{
								color: 'white',
								textAlign: 'left',
							}}
						>
							<Row>
								<a
									target='_blank'
									href='https://panoramic-butternut-291.notion.site/5090b4282d88479f8608cd7f60bce6c2'
									rel='noreferrer'
								>
									이용약관
								</a>

								<span
									style={{
										width: '50px',
										textAlign: 'center',
									}}
								>
									|
								</span>

								<a
									target='_blank'
									href='https://panoramic-butternut-291.notion.site/acb134ad367d4a98a575f871ee94bcf6'
									rel='noreferrer'
								>
									개인정보처리방침
								</a>
							</Row>

							<Row style={{ marginTop: '22px' }}>
								<Col span={8}>상호: 주식회사 쿠자피에이에스</Col>

								<Col span={8}>사업자등록번호: 644-88-01715</Col>

								<Col span={8}>통신판매신고번호: 2020-울산중구-0208</Col>

								<Col span={8}>대표자: 이충걸</Col>

								<Col span={8}>개인정보보호책임자: 이충걸</Col>

								<Col span={8}>전화번호: 070-4064-7890</Col>

								<Col span={24}>주소: 울산광역시 중구 종가로 406-21, C동 533호 534호</Col>
							</Row>

							<Row style={{ marginTop: '10px' }}>
								<Col style={{ color: '#C7C7C7' }}>Copyright (c) KOOZAPAS All Rights Reserved</Col>
							</Row>
						</Col>

						<Col span={6}>
							<div
								style={{
									marginBottom: 30,
								}}
							>
								<img src={FOOTTER_LOGO} alt='' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
							</div>

							<Button
								type='link'
								onClick={() => {
									if (whoAmI?.whoami.includes('Admin')) history.push('/admin/customer');

									setAdminLoginModal(true);
								}}
							>
								관리자 페이지 로그인
							</Button>

							<AdminLoginModal visible={adminLoginModal} closeAdminLoginModal={() => setAdminLoginModal(false)} />
						</Col>
					</Row>
				</Footer>
			)}
		</>
	);
};

export default FooterComponent;
