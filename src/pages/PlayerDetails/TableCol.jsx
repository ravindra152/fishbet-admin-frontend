import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
// import { Link } from 'react-router-dom';
import { betHistoryStatus, WALLET_CURRENCY_CODE_NAME } from './constants';

const KeyValueCell = ({ value }) => value ?? '';
const KeyValueCellNA = ({ value }) => value ?? '-';
const Id = ({ value }) => value ?? '';
const Email = ({ value }) => value ?? '';
const ActionTypes = ({ value }) => value ?? '';
const KeyCurrencyCode = ({ value }) => value ?? '';
const GameName = ({ value }) => value ?? '-';
const PlayerId = ({ value }) => value ?? '-';
const UserName = ({ cell }) => cell.value ?? '-';
// const UserName = ({ cell }) => (
// 	<Link
// 		to={`/player-details/${cell?.row?.original?.userId}`}
// 		// state={{ prevUrl: '/users' }}
// 	>
// 		{cell.value ? cell.value : '-'}
// 	</Link>
// );
const KycLevel = ({ value }) => value ?? '-';
const EmailVerified = ({ value }) => {
	switch (value) {
		case true:
			return <Badge className="bg-success">Yes</Badge>;
		case false:
			return <Badge className="bg-danger">No</Badge>;
		default:
			return '';
	}
};

const PlayerStatus = ({ value }) => {
	switch (value) {
		case true:
			return <Badge className="bg-success">Active</Badge>;
		case false:
			return <Badge className="bg-danger">In-Active</Badge>;
		default:
			return '';
	}
};

const EarnedCommission = ({ value }) => value ?? '';

const Amount = ({ value }) =>
	value ? (
		<div className={value.includes('-') ? 'text-danger' : 'text-success'}>
			{value}
		</div>
	) : (
		'-'
	);

const BonusMoney = ({ value }) =>
	value ? (
		<div className={value.includes('-') ? 'text-danger' : 'text-success'}>
			{value}
		</div>
	) : (
		'-'
	);

const Status = ({ value }) => betHistoryStatus[value] ?? '';

const CreatedAt = ({ value }) => value ?? '';

const NonCashAmount = ({ value }) =>
	value ? (
		<div className={value >= 0 ? 'text-success' : 'text-danger'}>{value}</div>
	) : (
		'-'
	);

const CurrencyCode = ({ value }) => WALLET_CURRENCY_CODE_NAME[value] ?? '';

const PromotionTitle = ({ value }) => value ?? '';

const Action = (cell) => (cell.value ? cell.value : '');

const Comment = ({ value }) =>
	value ? <div className="comment-term-text">{value}</div> : '';

const CurrencyId = ({ value }) => value ?? '';

const WalletAmount = ({ value }) => value ?? '';

const WalletNonCashAmount = ({ value }) => value ?? '';

const TotalAmount = ({ value }) => value ?? '';

const AfterBalance = ({ value }) => value ?? '';

const BeforeBalance = ({ value }) => value ?? '';

const PrimaryCurrencyAmount = ({ value }) => value ?? '';

Amount.propTypes = {
	value: PropTypes.number.isRequired,
};

BonusMoney.propTypes = {
	value: PropTypes.number.isRequired,
};

Status.propTypes = {
	value: PropTypes.number.isRequired,
};

NonCashAmount.propTypes = {
	value: PropTypes.number.isRequired,
};

Comment.propTypes = {
	value: PropTypes.string.isRequired,
};

CurrencyId.propTypes = {
	value: PropTypes.number.isRequired,
};

WalletAmount.propTypes = {
	value: PropTypes.number.isRequired,
};

WalletNonCashAmount.propTypes = {
	value: PropTypes.number.isRequired,
};

TotalAmount.propTypes = {
	value: PropTypes.number.isRequired,
};

CurrencyCode.propTypes = {
	value: PropTypes.number.isRequired,
};

AfterBalance.propTypes = {
	value: PropTypes.number.isRequired,
};

BeforeBalance.propTypes = {
	value: PropTypes.number.isRequired,
};

PrimaryCurrencyAmount.propTypes = {
	value: PropTypes.number.isRequired,
};

PlayerId.propTypes = {
	value: PropTypes.number.isRequired,
};

UserName.propTypes = {
	value: PropTypes.string.isRequired,
};
// UserName.propTypes = {
// 	// onClickPlayer: PropTypes.func.isRequired,
// 	cell: PropTypes.shape({
// 		value: PropTypes.string.isRequired,
// 		row: PropTypes.shape({
// 			original: PropTypes.shape({
// 				userId: PropTypes.string.isRequired,
// 			}).isRequired,
// 		}).isRequired,
// 	}).isRequired,
// };

KycLevel.propTypes = {
	value: PropTypes.number.isRequired,
};

EmailVerified.propTypes = {
	value: PropTypes.bool.isRequired,
};

PlayerStatus.propTypes = {
	value: PropTypes.bool.isRequired,
};

EarnedCommission.propTypes = {
  value: PropTypes.number.isRequired,
};

export {
	KeyValueCell,
	Id,
	Email,
	GameName,
	ActionTypes,
	Amount,
	BonusMoney,
	Status,
	CreatedAt,
	NonCashAmount,
	CurrencyCode,
	PromotionTitle,
	Action,
	Comment,
	KeyValueCellNA,
	KeyCurrencyCode,
	CurrencyId,
	WalletAmount,
	WalletNonCashAmount,
	TotalAmount,
	AfterBalance,
	BeforeBalance,
	PrimaryCurrencyAmount,
	PlayerId,
	UserName,
	KycLevel,
	EmailVerified,
	PlayerStatus,
	EarnedCommission
};
