import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { modules } from '../../constants/permissions';
import usePermission from '../../components/Common/Hooks/usePermission';
// import usePermission from '../../components/Common/Hooks/usePermission';
// import { modules } from '../../constants/permissions';

const ActionButtons = ({ handleView, handleEdit, row }) => {
	// const active = row?.original?.isActive;
	const vipTierId = row?.original?.vipTierId;
	const { isGranted } = usePermission();
	// console.log('************', handleEdit);
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			{/* {isGranted(modules.VipTier, 'U') && ( */}
				<li>
					<Link
						to="#!"
						className="btn btn-sm btn-soft-info"
						onClick={(e) => handleEdit(e, row?.original)}
					>
						<i
							className="mdi mdi-pencil-outline"
							id={`edit-tooltip-${vipTierId}`}
						/>
						<UncontrolledTooltip
							placement="top"
							target={`edit-tooltip-${vipTierId}`}
						>
							Edit Details
						</UncontrolledTooltip>
					</Link>
				</li>
				<li>
					<Link
						to="#!"
						className="btn btn-sm btn-soft-info"
						onClick={(e) => handleView(e, row?.original)}
					>
						<i
							className="mdi mdi-eye-outline"
							id={`view-tooltip-${vipTierId}`}
						/>
						<UncontrolledTooltip
							placement="top"
							target={`view-tooltip-${vipTierId}`}
						>
							View Details
						</UncontrolledTooltip>
					</Link>
				</li>
			{/* )} */}
		</ul>
	);
};

ActionButtons.propTypes = {
	handleEdit: PropTypes.func.isRequired,
	row: PropTypes.objectOf.isRequired,
};

export default ActionButtons;
