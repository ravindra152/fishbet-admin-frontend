import React, { useState } from 'react';
import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { kycStatus } from '../constants';

const Id = ({ value }) => value ?? '';
const Name = ({ value }) => value ?? '';
const KycLevel = ({ value }) => value ?? '-';
const Reason = ({ value }) => value ?? '-';
const UpdatedAt = ({ value }) => value ?? '';
const Actionee = ({ value }) => value ?? '-';
const ActionAt = ({ value }) => value ?? '-';
const Status = ({ value }) => kycStatus[value] ?? '';
// const Action = ({ value }) => (value ? statusMapper(value) : '-');

const ThumbnailUrl = ({ value }) => {
	const [isFits, setisFits] = useState(false);
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
				onClick={() => setisFits(true)}
			>
				{value ? 'View Here' : ''}
			</Button>
		</>
	);
};

ThumbnailUrl.propTypes = {
	value: PropTypes.string.isRequired,
};

export {
	Id,
	Name,
	Reason,
	UpdatedAt,
	Actionee,
	ActionAt,
	Status,
	// Action,
	ThumbnailUrl,
	KycLevel,
};
