import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Card, CardBody, CardTitle } from 'reactstrap';

const ReportCard = ({ reportCardData, isLoading, title }) => (
	<Card className="report-card">
		<CardBody>
			<CardTitle className="text-muted fw-medium">{title ?? ' '}</CardTitle>
			<div className="table-responsive">
				<table
					className="table align-middle table-nowrap"
					aria-label="Device Login Stats"
				>
					{!isLoading && (
						<tbody>
							<tr>
								{reportCardData.map((row) => (
									<td className="text-muted fw-medium">{row.name}</td>
								))}
							</tr>
							<tr>
								{reportCardData.map((row) => (
									<td>{row.value}</td>
								))}
							</tr>
						</tbody>
					)}
				</table>
			</div>
		</CardBody>
	</Card>
);

// Prop validation using PropTypes
// Prop validation using PropTypes
ReportCard.propTypes = {
	reportCardData: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			value: PropTypes.number,
		})
	).isRequired, // Marking reportCardData as required
	isLoading: PropTypes.bool.isRequired, // Marking isLoading as required
	title: PropTypes.string.isRequired,
};

export default ReportCard;
