/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React from 'react';
import { Badge, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';

const PlayerId = ({ value }) => value ?? '';

const UserName = ({ cell }) => (
	<Link
		to={`/player-details/${cell?.row?.original?.userId}`}
		state={{ prevUrl: '/users' }}
	>
		{cell.value ? cell.value : '-'}
	</Link>
);

const Telegram = ({ cell }) => (cell.value ? cell.value : '-');
const Email = ({ value }) => value ?? '';

const PhoneNumber = ({ value }) => value ?? '-';

const Referrer = ({ value }) => value ?? '-';

const KycLevel = ({ value }) => value ?? '-';

const IsInternal = ({ value }) => value ?? '';

const CountryCode = ({ value }) => value ?? '';

const EmailVerified = ({ value }) => value ?? '';

const CreatedAt = ({ value }) => value ?? '';

const Action = ({ cell }) => (
	<ul className="list-unstyled hstack gap-1 mb-0">
		<li data-bs-toggle="tooltip" data-bs-placement="top">
			<Link
				to={`/player-details/${cell?.row?.original?.userId}`}
				className="btn btn-sm btn-soft-primary"
				state={{ prevUrl: '/users' }}
			>
				<i
					className="mdi mdi-eye-outline"
					id={`view-tooltip-${cell?.row?.original?.userId}`}
				/>
			</Link>
		</li>
		<UncontrolledTooltip
			placement="top"
			target={`view-tooltip-${cell?.row?.original?.userId}`}
		>
			View
		</UncontrolledTooltip>
	</ul>
);

const Status = ({ value }) => {
	switch (value) {
		case 'Active':
			return <Badge className="bg-success">Active</Badge>;
		case 'In-Active':
			return <Badge className="bg-danger">In-Active</Badge>;
		default:
			return '';
	}
};

UserName.propTypes = {
	// onClickPlayer: PropTypes.func.isRequired,
	cell: PropTypes.shape({
		value: PropTypes.string.isRequired,
		row: PropTypes.shape({
			original: PropTypes.shape({
				userId: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
	}).isRequired,
};

Action.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string.isRequired,
		row: PropTypes.shape({
			original: PropTypes.shape({
				userId: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
	}).isRequired,
};

Status.propTypes = {
	value: PropTypes.string.isRequired,
};

export {
	IsInternal,
	KycLevel,
	PhoneNumber,
	UserName,
	PlayerId,
	Email,
	Action,
	Status,
	CountryCode,
	Referrer,
	EmailVerified,
	CreatedAt,
	Telegram,
};
