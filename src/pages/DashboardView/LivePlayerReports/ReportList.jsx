import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import DivLoader from '../../../components/Common/Loader/divLoader';

const renderStop = (prevProps, nextProps) => {
	if (
		prevProps.title !== nextProps.title ||
		prevProps.description !== nextProps.description ||
		prevProps.iconClass !== nextProps.iconClass ||
		prevProps.isLoading !== nextProps.isLoading
	) {
		return false;
	}
	return true;
};
const ReportList = (props) => {
	const { title, description, iconClass, isLoading, iconPath, subDescription } = props;
	return (
		<Card className="mini-stats-wid" style={{ borderRadius: '12px', overflow: 'hidden' }}>
			<CardBody style={{ padding: '12px' }}>
				<div className="d-flex">
					<div className="flex-grow-1">
						<p className="text-muted fw-medium">{title}</p>
						<p className="mb-2">{subDescription}</p>
						<h4 className="mb-0">{description}</h4>
					</div>
					<div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon" style={{
						position: 'absolute',
						right: '-9px',
						top: '-9px'
					}}>
						<span className="avatar-title rounded-circle bg-primary">
							{isLoading ? (
								<DivLoader isSmall loaderVarient="text-light" />
							) : (
								iconPath ? <img className="dashboard-card-img" src={iconPath} /> : <i className={`bx ${iconClass} font-size-24`} />
							)}
						</span>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

ReportList.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	iconClass: PropTypes.string,
	isLoading: PropTypes.bool,
};
ReportList.defaultProps = {
	title: PropTypes.string,
	description: PropTypes.string,
	iconClass: PropTypes.string,
	isLoading: PropTypes.bool,
};
export default React.memo(ReportList, renderStop);
