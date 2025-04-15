/* eslint-disable react/prop-types */
import React from 'react';
import { Card, Col, Row } from 'reactstrap';

const Details = ({ labelMapping, title, tierDetails }) => {
	if (!tierDetails) {
		return;
	}
	// Transform the object into an array of key-value pairs
	const detailsArray = Object.entries(tierDetails)
		?.filter(
			([key]) => key !== 'rewards' && key !== 'icon' && key !== 'exclusiveGames'
		)
		?.map(([key, value]) => ({
			label: labelMapping[key] || key,
			value: value,
		}));

	return (
		<>
			<Col xs={12} lg={4} className="col-padding">
				<Card className="card-overview">
					<h4 className="h4-overview text-center mt-3">
						{title} <hr className="h4-hr" />
					</h4>
					<div className="div-overview">
                    {detailsArray
  .filter(({ label }) => label !== 'eventInvites' && label !== 'isActive')
  .map(({ label, value }) => (
    <div key={label} className="d-flex justify-content-between m-1">
      <h6 className="px-2">{label}</h6>
      <span className="px-2">
        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
      </span>
    </div>
  ))}

					</div>
				</Card>
			</Col>
		</>
	);
};

export default Details;
