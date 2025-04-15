import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Card from './components/Card';
import { labelMapping, rewardsMapping } from './components/constants';

const ViewVipTier = () => {
	const { state } = useLocation();
    const tierDetails = state?.row;

	return (
		<div className="page-content">
			<Breadcrumbs
				title="Vip Tier"
				breadcrumbItem="View"
				titleLink="/vip-tier"
				leftTitle={
					<>
						<i className="fas fa-angle-left" /> Back
					</>
				}
			/>
			<Container fluid>
				<Row className="align-items-start gap-4">
					<Col md="3" className="d-flex justify-content-center">
						<img
							className="img-thumbnail"
							width="100%"
							style={{ maxWidth: '300px', objectFit: 'cover' }}
							src={tierDetails?.icon || 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600'}
							alt="Vip Tier Icon"
						/>
					</Col>
						<Card labelMapping={labelMapping} title="Basic Info" tierDetails={tierDetails} />
						<Card labelMapping={rewardsMapping} title="Rewards Info" tierDetails={tierDetails?.rewards[0]} />
				</Row>
			</Container>
		</div>
	);
};

export default ViewVipTier;
