import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import { formatDate } from '../../utils/dateFormatter';

const Id = ({ value }) => (
	<Link to="/" className="text-body fw-bold">
		{value ?? ''}
	</Link>
);

const Name = ({ value }) => value ?? '';

const Coin = ({ value }) => value ?? '';

const TotalClaims = ({ value }) => value ?? '';
const Code = ({ value }) => value ?? '';
const ExpiryTime = ({ value }) => formatDate(value) ?? '';

const TotalClaimsAllowed = ({ value }) => value ?? '';

const Status = ({ value }) =>
	value ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);

Id.propTypes = {
	value: PropTypes.string.isRequired,
};

Status.propTypes = {
	value: PropTypes.string.isRequired,
};

export {
	Code,
	Coin,
	ExpiryTime, Id, Name,
	Status,
	TotalClaims,
	TotalClaimsAllowed
};
