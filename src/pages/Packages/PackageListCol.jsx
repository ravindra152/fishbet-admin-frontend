/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import  { useState } from 'react';
import { Link } from 'react-router-dom';
import Lightbox from 'react-awesome-lightbox';
import { Badge, Button } from 'reactstrap';

const PackageId = ({ value }) => (
	<Link to="/#" className="text-body fw-bold">
		{value ?? ''}
	</Link>
);

const OrderId = ({ value }) => value ?? '';

const Amount = ({ value }) => value ?? '';

const GcCoin = ({ value }) => value ?? '';
const ScCoin = ({ value }) => value ?? '';
const Type = ({ value }) => value ?? '';
const VisibleInStore = ({ value }) => value ? 'Yes' : 'No';
const ClaimedCount = ({ value }) => value ?? '';

const Status = ({ value }) => (
	value ?? '' ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	)
)

// eslint-disable-next-line jsx-a11y/img-redundant-alt
// const ImagePreview = ({ value }) => (value ? <img src={value} alt='image' /> : 'no Image')
const ImagePreview = ({ value }) => {
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
				{value ? 'Preview' : ''}
			</Button>
		</>
	);
};

const MobileImagePreview = ({ value }) => {
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
				{/* {value ? 'Preview' : ''} */}
				Mobile Preview
			</Button>
		</>
	);
};
ImagePreview.propTypes = {
	value: PropTypes.string.isRequired,
};
MobileImagePreview.propTypes = {
	value: PropTypes.string.isRequired,
};

PackageId.propTypes = {
	value: PropTypes.number.isRequired,
};

Status.propTypes = {
	value: PropTypes.bool.isRequired,
};

export {
	Amount,
	PackageId,
	OrderId,
	GcCoin,
	ScCoin,
	Status,
	Type,
	VisibleInStore,
	ClaimedCount,
	// ImagePreview
	ImagePreview,MobileImagePreview
}