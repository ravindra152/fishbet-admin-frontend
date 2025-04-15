import React from 'react';
import PropTypes from 'prop-types';
import { Button, UncontrolledTooltip } from 'reactstrap';

const Actions = ({ cell, actionsList }) => (
	<ul className="list-unstyled hstack gap-1 mb-0">
			{actionsList?.map(
				({
					actionName,
					actionHandler,
					isHidden,
					icon,
					iconColor,
					isDisabled = () => null,
				}) =>
					!isHidden && (
						<li data-bs-toggle="tooltip" data-bs-placement="top">
					<Button
disabled={isDisabled(cell?.row?.original)}
onClick={() => actionHandler(cell?.row?.original)}
						className="btn btn-sm btn-soft-primary"
					>
						<i
							className={icon}
							id={`view-tooltip-${actionName}`}
						/>
						<UncontrolledTooltip
							placement="top"
							target={`view-tooltip-${actionName}`}
						>
							{icon && <i className={`${icon} ${iconColor} me-2`} />}{' '}
							{actionName}
						</UncontrolledTooltip>
					</Button>
				</li>
					))
		}
		</ul>);

Actions.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string.isRequired,
		row: PropTypes.shape({
			original: PropTypes.shape({
				id: PropTypes.string.isRequired,
				isActive: PropTypes.bool.isRequired,
			}).isRequired,
		}).isRequired,
	}).isRequired,
	actionsList: PropTypes.arrayOf().isRequired,
};

export default Actions;
