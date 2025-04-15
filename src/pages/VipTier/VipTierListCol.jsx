/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';

const VipTierId = ({ value }) => (
	<Link to="/#" className="text-body fw-bold">
		{value ?? ''}
	</Link>
);

const Name = ({ value }) => value ?? '';

const Level = ({ value }) => value ?? '';
// value ? (
// 	<div className={value?.includes('-') ? 'text-danger' : 'text-success'}>
// 		{value.replace('-', '')}
// 	</div>
// ) : (
// 	'-'
// );
const WageringThreshold = ({ value }) => value ?? '';
const GamesPlayed = ({ value }) => value ?? '';
const BigBetsThreshold = ({ value }) => value ?? '';
const BigBetAmount = ({ value }) => value ?? '';
const DepositsThreshold = ({ value }) => value ?? '';
// const ScRequiredPlay = ({ value }) => value ?? '';
// const GcRequiredPlay = ({ value }) => value ?? '' ;
const LoginStreak = ({ value }) => value ?? '';
const ReferralsCount = ({ value }) => value ?? '';
// const SweepstakesEntries = ({ value }) => value ?? '';
const SweepstakesWins = ({ value }) => value ?? '';
// const GradualLossUnit = ({value}) => value ?? '';
const Status = ({ value }) =>
	value ?? '' ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);
const TimeBasedConsistency = ({ value }) => value ?? '';
// const MaxDepositLimit = ({ value }) => value ?? '';
// const MinRedemptionLimit = ({ value }) => value ?? '';
// const MaxRedemptionLimit = ({ value }) => value ?? '';
const PrioritySupport = ({ value }) => (value == true ? 'Yes' : 'No');

// eslint-disable-next-line jsx-a11y/img-redundant-alt
// const ImagePreview = ({ value }) => (value ? <img src={value} alt='image' /> : 'no Image')

VipTierId.propTypes = {
	value: PropTypes.number.isRequired,
};

Status.propTypes = {
	value: PropTypes.bool.isRequired,
};

export {
	VipTierId,
	Name,
	Level,
	WageringThreshold,
	GamesPlayed,
	BigBetsThreshold,
	BigBetAmount,
	DepositsThreshold,
	LoginStreak,
	// ScRequiredPlay,
	// GcRequiredPlay,
	Status,
	// ImagePreview,
	ReferralsCount,
	// SweepstakesEntries,
	SweepstakesWins,
	TimeBasedConsistency,
	// GradualLoss,
	// GradualLossPeriodUnit,
	PrioritySupport,
};
