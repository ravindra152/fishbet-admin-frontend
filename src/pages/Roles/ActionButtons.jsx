import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const ActionButtons = ({ handleEdit, row, handleStatus, handleView }) => {
	const adminUserId = row?.original?.adminUserId;
	const { isGranted } = usePermission();

	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			{isGranted(modules.Administrator, 'R') && (
				<li data-bs-toggle="tooltip" data-bs-placement="top">
					<Link
						to="#!"
						className="btn btn-sm btn-soft-primary"
						onClick={(e) => handleView(e, row?.original)}
					>
						<i
							className="mdi mdi-eye-outline"
							id={`view-tooltip-${adminUserId}`}
						/>
						<UncontrolledTooltip
							placement="top"
							target={`view-tooltip-${adminUserId}`}
						>
							View Details
						</UncontrolledTooltip>
					</Link>
				</li>
			)}


			{isGranted(modules.Administrator, 'U') && (
				<li>
					<Link
						to="#!"
						className="btn btn-sm btn-soft-info"
						onClick={(e) => handleEdit(e, row?.original)}
					>
						<i
							className="mdi mdi-pencil-outline"
							id={`edit-tooltip-${adminUserId}`}
						/>
						<UncontrolledTooltip
							placement="top"
							target={`edit-tooltip-${adminUserId}`}
						>
							Edit Details
						</UncontrolledTooltip>
					</Link>
				</li>
			)}
		</ul>
	);
};

ActionButtons.propTypes = {
	handleEdit: PropTypes.func.isRequired,
	handleStatus: PropTypes.func.isRequired,
	row: PropTypes.objectOf.isRequired,
};

export default ActionButtons;
