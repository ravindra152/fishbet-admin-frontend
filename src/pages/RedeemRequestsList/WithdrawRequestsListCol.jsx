/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { PAYMENT_PROVIDER } from './constants';

const Id = ({ value }) => value ?? '';

const Email = ({ value, username }) => value ?? username;

const Name = ({ value }) => value ?? '-';

const ActionableType = ({ value }) => value ?? 'NA';

const PaymentProvider = ({ value }) => PAYMENT_PROVIDER?.[value] ?? value ??  'NA';

const Amount = ({ value }) =>
	value ? (
		<div className={value.includes('-') ? 'text-danger' : 'text-success'}>
			{value.replace('-', '')}
		</div>
	) : (
		'-'
	);

const Status = ({ value }) => value ?? '';

const TransactionId = ({ value }) => value ?? '';

const CreatedAt = ({ value }) => value ?? '';

Amount.protoTypes = {
	value: PropTypes.string.isRequired,
};

const Action = ({ row, handleReqAccept, handleReqReject }) => (
	<ul className="list-unstyled hstack gap-1 mb-0">
		<li
			data-bs-toggle="tooltip"
			data-bs-placement="top"
			id={`view-tooltip-${row?.original?.userId}-accept`}
			
		>
			<Button
				className="btn btn-sm btn-soft-success"
				disabled={row?.original?.status !== 'Pending'}
				onClick={() => handleReqAccept(row?.original?.id)}
			>
				<i className="dripicons-checkmark" />
			</Button>
		</li>
		<UncontrolledTooltip
			placement="top"
			target={`view-tooltip-${row?.original?.userId}-accept`}
		>
			Accept
		</UncontrolledTooltip>
		<li
			data-bs-toggle="tooltip"
			data-bs-placement="top"
			id={`view-tooltip-${row?.original?.userId}-reject`}
		>
			<Button
				className="btn btn-sm btn-soft-danger"
				disabled={row?.original?.status !== 'Pending'}
				onClick={() => handleReqReject(row?.original?.id)}
			>
				<i className="dripicons-cross" />
			</Button>
		</li>
		<UncontrolledTooltip
			placement="top"
			target={`view-tooltip-${row?.original?.userId}-reject`}
		>
			Reject
		</UncontrolledTooltip>
	</ul>
);

export {
	Id,
	Email,
	Action,
	Name,
	ActionableType,
	Amount,
	Status,
	CreatedAt,
	PaymentProvider,
	TransactionId,
};
