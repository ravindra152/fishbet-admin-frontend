import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Col, Container, Row } from 'reactstrap';
import ChannelGroupsChatList from './ChannelGroupsChatList ';
import Breadcrumb from '../../components/Common/Breadcrumb';
import ChannelGroupsList from './ChannelGroupsList';

const ChannelsReport = () => {
	const { channelId } = useParams();
	return (
		<div className="page-content">
			<Breadcrumb
				title="Chat Management"
				breadcrumbItem="Channels Reports"
				titleLink="/chat/channels"
				leftTitle={
					<>
						<i className="fas fa-angle-left" /> Back
					</>
				}
			/>
			<Container fluid>
				<Card>
					<Row lg={12}>
						<Col lg={9}>
							<ChannelGroupsChatList channelId={channelId} />
						</Col>
						<Col
							lg={3}
							style={{
								borderLeft: '2px solid #eff2f7',
							}}
							className="my-5"
						>
							<ChannelGroupsList channelId={channelId} />
						</Col>
					</Row>
				</Card>
			</Container>
		</div>
	);
};

export default ChannelsReport;
