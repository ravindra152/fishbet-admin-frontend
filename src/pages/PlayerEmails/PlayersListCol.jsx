/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React from 'react';
import { Badge, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { CustomSwitchButton } from '../../helpers/customForms';

const PlayerId = ({ value }) => value ?? '';

const UserName = ({ cell }) =>
	cell.value ? (
		<Link to={`/player-details/${cell?.row?.original?.userId}`}>
			{cell.value}
		</Link>
	) : (
		''
	);

const Email = ({ value }) => value ?? '';

const PhoneNumber = ({ value }) => value ?? '-';

const KycStatus = ({ value }) => value ?? '';

const KycLevel = ({ value }) => value ?? '';

const IsInternal = ({ value }) => value ?? '';

const Action = ({ cell, selectedUsers, toggleSelectedUser }) => {
  const isChecked = selectedUsers.includes(
    cell?.row?.original?.userId
  );
  return (
    <ul className="list-unstyled hstack gap-1 mb-0">
      <li data-bs-toggle="tooltip" data-bs-placement="top">
      <CustomSwitchButton
        type="checkbox"
        containerClass="false"
        className="form-check-input"
        checked={isChecked}
        switchSizeClass="form-switch-sm"
        onClick={() =>
          toggleSelectedUser(cell?.row?.original?.userId, isChecked)
        }
        id={`view-tooltip-${cell?.row?.original?.userId}`}
      />
      </li>
      <UncontrolledTooltip
        placement="top"
        target={`view-tooltip-${cell?.row?.original?.userId}`}
      >
        {isChecked ? 'UnCheck' : 'Check'}
      </UncontrolledTooltip>
    </ul>
)};

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
	onClickPlayer: PropTypes.func.isRequired,
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
	KycStatus,
	PhoneNumber,
	UserName,
	PlayerId,
	Email,
	Action,
	Status,
  KycLevel,
};
