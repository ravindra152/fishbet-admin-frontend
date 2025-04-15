import React, { useState } from 'react';
import { Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';


const CasinoProviderId = ({ value }) => (
	<Link to="/#" className="text-body fw-bold">
		{value ?? ''}
	</Link>
);
const Name = ({ value }) => value?.EN ?? '';

const ThumbnailUrl = ({ value }) => {
	const [isFits, setIsFits] = useState(false);
	return (
		<>
			{isFits ? (
				<Lightbox
					image={value}
					onClose={() => setIsFits(!isFits)}
					allowZoom={false}
					allowRotate={false}
					className="lb-container"
				/>
			) : null}

			<Button
				color="link"
				className="btn btn-link waves-effect"
				onClick={() => setIsFits(true)}
			>
				{value ? 'View Here' : ''}
			</Button>
		</>
	);
};

const Status = ({ value }) =>
	value ?? '' ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);

CasinoProviderId.propTypes = {
	value: PropTypes.number.isRequired,
};

ThumbnailUrl.propTypes = {
	value: PropTypes.string.isRequired,
};

Status.propTypes = {
	value: PropTypes.bool.isRequired,
};

export { CasinoProviderId, Name, ThumbnailUrl, Status };
