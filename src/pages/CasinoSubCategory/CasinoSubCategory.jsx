import React, { useState } from 'react';
import { Button, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';


const CasinoGameId = ({ value }) => (
	<Link to="/#" className="text-body">
		{value ?? ''}
	</Link>
);

const DeviceType = ({ value }) => value ?? '';

const GameSubCategoryId = ({ value }) => (
	<Link to="/#" className="text-body fw-bold">
		{value ?? ''}
	</Link>
);

const Name = ({ value }) => value ?? '';

const GameCategory = ({ value }) => value ?? '';

const ImageUrl = ({ value }) => {
	const [isFits, setIsFits] = useState(false);
	return (
		<>
			{isFits ? (
				<Lightbox
					image={`${value}`}
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
				View Icon
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

GameSubCategoryId.propTypes = {
	value: PropTypes.string.isRequired,
};

Status.propTypes = {
	value: PropTypes.bool.isRequired,
};

ImageUrl.propTypes = {
	value: PropTypes.string.isRequired,
};

GameCategory.propTypes = {
	value: PropTypes.string.isRequired,
};

Name.propTypes = {
	value: PropTypes.string.isRequired,
};

DeviceType.propTypes = {
	value: PropTypes.string.isRequired,
};

CasinoGameId.propTypes = {
	value: PropTypes.string.isRequired,
};

export {
	GameSubCategoryId,
	Name,
	GameCategory,
	ImageUrl,
	Status,
	DeviceType,
	CasinoGameId,
};
