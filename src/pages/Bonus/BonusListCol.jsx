import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
// import { Link } from 'react-router-dom';

const BonusId = ({ value }) => value ?? '';

const Title = ({ value }) => value ?? '';

const BonusType = ({ value }) => value ?? '';

const ValidTill = ({ value }) => value ?? '';

const Description = ({ value }) => value ?? '';

const IsExpired = ({ value }) => value ?? '';

const IsClaimed = ({ value }) => value ?? '';

const Status = ({ value }) =>
	value === 'active' ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);
BonusId.propTypes = {
	value: PropTypes.number.isRequired,
};

Status.propTypes = {
	value: PropTypes.bool.isRequired,
};

export { BonusId, Title, BonusType, ValidTill, IsExpired, Description, IsClaimed, Status };
