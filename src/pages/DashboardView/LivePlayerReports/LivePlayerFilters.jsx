/* eslint-disable react/prop-types */
import React from 'react';
import { Col } from 'reactstrap';
import { dateConstants } from '../constant';

const LivePlayerFilters = (props) => {
	const { livePlayerDateOptions, setLiverPlayerDateOptions } = props;
	return (
		<div>
			<Col md="4">
				<div className="mb-4">
					<select
						value={livePlayerDateOptions}
						className="form-select"
						onChange={(e) => {
							setLiverPlayerDateOptions(e.target.value);
						}}
					>
						{dateConstants?.map((item) => (
							<option value={item?.value} key={item?.value}>
								{item?.label}
							</option>
						))}
					</select>
				</div>
			</Col>
		</div>
	);
};

export default LivePlayerFilters;
