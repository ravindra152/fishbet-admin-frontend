/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TRANSACTION_PURPOSE_KEY_VALUE } from '../CasinoTransactionsList/constants';

const Id = ({ value }) => value ?? '';

const UserName = ({ value }) => 
	 (
		<Link
			to={`/player-details/${value?.row?.original?.user_id}`}
			state={{ prevUrl: '/dashboard' }}
		>
			{value?.value ? value.value : '-'}
		</Link>
	);

const TransactionId = ({ value }) => value ?? 'NA';

const PaymentProvider = ({ value }) => value ?? 'NA';

const Amount = ({ value }) =>
	value ? (
		<div className={value.includes('-') ? 'text-danger' : 'text-success'}>
			{value.replace('-', '')}
		</div>
	) : (
		'-'
	);

const Actionee = ({ value }) => value ?? '-';

const ActionType = ({ value }) =>
	TRANSACTION_PURPOSE_KEY_VALUE?.[value] ?? value ?? '';

const ActioneeType = ({ value }) => value ?? '-';

const Status = ({ value }) => value ?? '';

const CreatedAt = ({ value }) => value ?? '';

Amount.propTypes = {
	value: PropTypes.string.isRequired,
};

export {
	ActioneeType,
	Actionee,
	ActionType,
	Status,
	CreatedAt,
	Id,
	TransactionId,
	PaymentProvider,
	Amount,
	UserName,
};
