import React from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const ActionButtons = ({ row: { original }, handleStatus, onClickEdit }) => {
	const { isGranted } = usePermission();
	const status = original?.isActive;
	const id = original?.id;
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			{/* {isGranted(modules.CasinoManagement, 'U') && (
				<li data-bs-toggle="tooltip" data-bs-placement="top">
					<Link
						to={`/casino-providers/restrict-countries/${id}`}
						state={{ type: 'providers' }}
						className="btn btn-sm btn-soft-primary"
					>
						<i className="mdi mdi-block-helper" id="viewtooltip" />
						<UncontrolledTooltip placement="top" target="viewtooltip">
							View Restricted Countries
						</UncontrolledTooltip>
					</Link>
				</li>
			)} */}

			<li>
				{status ? (
					<Button
						hidden={!isGranted(modules.CasinoManagement, 'T')}
						className="btn btn-sm btn-soft-danger"
						onClick={() =>
							handleStatus({
								status,
								id,
								Message: 'In-Active',
							})
						}
					>
						<i className="mdi mdi-close-thick" id={`activetooltip-${id}`} />
						<UncontrolledTooltip placement="top" target={`activetooltip-${id}`}>
							Set Inactive
						</UncontrolledTooltip>
					</Button>
				) : (
					<Button
						hidden={!isGranted(modules.CasinoManagement, 'T')}
						className="btn btn-sm btn-soft-success"
						onClick={() =>
							handleStatus({
								status,
								id,
								Message: 'Active',
							})
						}
					>
						<i className="mdi mdi-check-circle" id={`activetooltip-${id}`} />
						<UncontrolledTooltip placement="top" target={`activetooltip-${id}`}>
							Set Active
						</UncontrolledTooltip>
					</Button>
				)}
			</li>

			<li>
				<Button
					hidden={!isGranted(modules.CasinoManagement, 'U')}
					className="btn btn-sm btn-soft-info"
					onClick={(e) => {
						e.preventDefault();
						onClickEdit(original);
					}}
				>
					<i className="mdi mdi-pencil-outline" id="edittooltip" />
					<UncontrolledTooltip placement="top" target="edittooltip">
						Edit
					</UncontrolledTooltip>
				</Button>
			</li>
		</ul>
	);
};

ActionButtons.propTypes = {
	handleStatus: PropTypes.func.isRequired,
	onClickEdit: PropTypes.func.isRequired,
	row: PropTypes.objectOf.isRequired,
};

export default ActionButtons;
