/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

import profileImg from '../../assets/images/profile-img.png';

const WelcomeComp = () => {
	const { superAdminUser } = useSelector((state) => state.PermissionDetails);
	// const name = superAdminUser.firstName || superAdminUser.adminUsername || 'A';
	return (
		<Card className="overflow-hidden">
			<div className="bg-primary-subtle">
				<Row>
					<Col xs="10">
						<div className="text-primary p-3">
							<h5 className="text-primary">Welcome Back !</h5>
						</div>
					</Col>
					<Col xs="8" className="align-self-end">
						<img src={profileImg} alt="" className="img-fluid" />
					</Col>
				</Row>
			</div>
			<CardBody className="pt-0">
				<Row className="align-items-center">
					<Col sm="3">
						<div className="avatar-md profile-user-wid mb-4 dashboard-prof-logo text-center">
							<p className="profile-logo-avatar">A</p>
						</div>
						{/* <h5 className="font-size-15 text-truncate">Henry Price</h5>
					<p className="text-muted mb-0 text-truncate">UI/UX Designer</p> */}
					</Col>

					<Col sm="9">
						<div className="pt-4 ms-3">
							<Row>
								<Col xs="12">
									<h5 
										className="font-size-15" 
										style={{ wordBreak: "break-word", whiteSpace: "normal" }}
									>
										{superAdminUser?.firstName
											? `${superAdminUser?.firstName} ${superAdminUser?.lastName}`
											: superAdminUser.adminUsername}
									</h5>
								</Col>
								<Col xs="12 mt-3">
									<Link to="/profile" className="btn btn-primary btn-sm">
										View Profile <i className="mdi mdi-arrow-right ms-1" />
									</Link>
								</Col>
							</Row>
							{/* <Row>
							<Col xs="6">
								<h5 className="font-size-15">125</h5>
								<p className="text-muted mb-0">Projects</p>
							</Col>
							<Col xs="6">
								<h5 className="font-size-15">$1245</h5>
								<p className="text-muted mb-0">Revenue</p>
							</Col>
						</Row> */}
							{/* <div className="mt-4">
							<Link to="/profile" className="btn btn-primary  btn-sm">
								View Profile <i className="mdi mdi-arrow-right ms-1" />
							</Link>
						</div> */}
						</div>
					</Col>
				</Row>
			</CardBody>
		</Card>
	);
};

export default WelcomeComp;
