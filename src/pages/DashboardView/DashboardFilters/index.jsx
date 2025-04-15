/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Row } from 'reactstrap';
import moment from 'moment';
import FlatPickr from 'react-flatpickr';

const DashboardFilters = ({ value, onChange }) => (
	<Row>
		<Col md="9" />
		<Col md="3">
			<div className="mb-4">
				<FlatPickr
					className="form-control"
					name="range"
					value={[value.startDate, value.endDate]}
					options={{
						mode: 'range',
						maxDate: moment().utc().startOf('day').toDate(),
					}}
					onChange={(date) => {
						onChange({
							startDate: date[0],
							endDate: date[1],
						});
					}}
				/>
			</div>
		</Col>
	</Row>
)

export default DashboardFilters;
