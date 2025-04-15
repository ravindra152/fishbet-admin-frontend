/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Id = ({ value }) => value ?? '';

const UserEmail = ({ value }) => value ?? '';

const UserName = (cell) => (
	<Link
		to={`/player-details/${cell?.cell?.row?.original?.user_id}`}
		state={{ prevUrl: '/dashboard' }}
	>
		{cell?.cell?.value ? cell.cell.value : '-'}
	</Link>
);

const GameName = ({ value }) => value ?? '-';

const ActionType = ({ value }) => value ?? '';

const Amount = ({ value }) =>
	value !== '-' ? (
		<div className={value.includes('-') ? 'text-danger' : 'text-success'}>
			{value.replace('-', '')}
		</div>
	) : (
		'-'
	);

const BonusMoney = ({ value }) =>
	value ? (
		<div className={value.includes('-') ? 'text-danger' : 'text-success'}>
			{value.replace('-', '') ?? ''}
		</div>
	) : (
		'-'
	);

const Status = ({ value }) => value ?? '';

const CreatedAt = ({ value }) => value ?? '';

const AfterBalance = ({ value }) => value ?? '';

const BeforeBalance = ({ value }) => value ?? '';

const PrimaryCurrencyAmount = ({ value }) => value ?? '';

Amount.protoTypes = {
	value: PropTypes.string.isRequired,
};

BonusMoney.protoTypes = {
	value: PropTypes.string.isRequired,
};

export {
	Id,
	UserEmail,
	UserName,
	GameName,
	ActionType,
	Amount,
	BonusMoney,
	Status,
	CreatedAt,
	AfterBalance,
	BeforeBalance,
	PrimaryCurrencyAmount,
};
