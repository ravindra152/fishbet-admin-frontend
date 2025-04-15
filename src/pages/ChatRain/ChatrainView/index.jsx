import React from 'react';
import { useLocation } from 'react-router-dom';
import { Badge, Card, Col, Row } from 'reactstrap';
import Breadcrumb from '../../../components/Common/Breadcrumb';
import logo from '../../../assets/images/chatRain.png';

const PreviewChatrain = () => {
	const location = useLocation();
	const chatRainDetails = location?.state?.chatRainDetails;

	const imageStyle = {
		maxHeight: '300px',
		objectFit: 'cover',
		transition: 'transform 0.3s',
	};

	return (
		<div className="page-content">
			<Breadcrumb
				title="Chat Rain info"
				breadcrumbItem="Chat Rain"
				titleLink="/chat/chat-rain"
				leftTitle={
					<>
						<i className="fas fa-angle-left" /> Back
					</>
				}
			/>
			<Card className="p-4 chat-rain-info-card">
				<Row>
					<Col xl="3" className="mb-4 mb-xl-0">
						<div className="chat-rain-image text-center">
							<img
								src={logo}
								alt="Chat Rain"
								className="img-fluid rounded shadow"
								style={imageStyle}
							/>
						</div>
					</Col>
					<Col xl="6">
						<div className="chat-rain-details mb-4 mt-5">
							<h5 className="mb-4">
								Chat Rain Title:{' '}
								<span className="text-muted me-2">
									{chatRainDetails?.name || 'N/A'}
								</span>{' '}
							</h5>
							<h5 className="mb-4">
								Chat Rain Prizemoney:{' '}
								<span className="text-muted me-2">
									{chatRainDetails?.prizeMoney
										? `${chatRainDetails.prizeMoney}`
										: 'N/A'}
								</span>{' '}
							</h5>
							<h5 className="mb-4">
								Chat Rain Status:{' '}
								<span className="text-muted me-2">
									{chatRainDetails?.isClosed ? (
										<Badge color="danger" className="status-badge">
											Closed
										</Badge>
									) : (
										<Badge color="success" className="status-badge">
											Open
										</Badge>
									)}
								</span>{' '}
							</h5>
							<h5 className="mb-4">
								Chat Rain Channel Id:{' '}
								<span className="text-muted me-2">
									{chatRainDetails?.chatGroupId || 'N/A'}
								</span>{' '}
							</h5>
							{/* Fallback message if no details are available */}
							{!chatRainDetails && (
								<p className="text-danger">No chat rain details available.</p>
							)}
						</div>
					</Col>
				</Row>
			</Card>
		</div>
	);
};

export default PreviewChatrain;
