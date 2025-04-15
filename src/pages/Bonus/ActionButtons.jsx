import React from 'react';
import PropTypes from 'prop-types';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const ActionButtons = ({
	row: { original },
	handleStatus,
	// handleDelete,
	handleView,
}) => {
	const navigate = useNavigate();
	const { isGranted } = usePermission();
	const active = original?.status;
	const bonusId = original?.id;
	const handleEdit = () => navigate(`/bonus/edit/${bonusId}`);
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			{/* <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
				<Link to="#" className="btn btn-sm btn-soft-primary">
					<i className="mdi mdi-eye-outline" id={`view-${bonusId}`} />
				</Link>
			</li>
			<UncontrolledTooltip placement="top" target={`view-${bonusId}`}>
				View
			</UncontrolledTooltip> */}

			<li>
				{active === 'active' ? (
					<Button
						hidden={!isGranted(modules.Bonus, 'T')}
						className="btn btn-sm btn-soft-danger"
						onClick={(e) =>
							handleStatus(e, {
								active,
								bonusId,
							})
						}
					>
						<i className="mdi mdi-close-thick" id={`active-${bonusId}`} />
						<UncontrolledTooltip placement="top" target={`active-${bonusId}`}>
							Set Inactive
						</UncontrolledTooltip>
					</Button>
				) : (
					<Button
						hidden={!isGranted(modules.Bonus, 'T')}
						className="btn btn-sm btn-soft-success"
						onClick={(e) =>
							handleStatus(e, {
								active,
								bonusId,
							})
						}
					>
						<i className="mdi mdi-check-circle" id={`active-${bonusId}`} />
						<UncontrolledTooltip placement="top" target={`active-${bonusId}`}>
							Set Active
						</UncontrolledTooltip>
					</Button>
				)}
			</li>

			<li>
				<Button
					className="btn btn-sm btn-soft-info"
					id="editToolTip"
					onClick={handleEdit}
				>
					<i className="mdi mdi-pencil-outline" />
					<UncontrolledTooltip placement="top" target="editToolTip">
						Edit
					</UncontrolledTooltip>
				</Button>
			</li>
			<li>
				<Button
					className="btn btn-sm btn-soft-info"
					id="viewToolTip"
					onClick={() => handleView(original)}
				>
					<i className="mdi mdi-eye-outline" />
					<UncontrolledTooltip placement="top" target="viewToolTip">
						View
					</UncontrolledTooltip>
				</Button>
			</li>

			{/* <li>
				<Button
					id="deleteToolTip"
					className="btn btn-sm btn-soft-danger"
					onClick={() => handleDelete(original)}
				>
					<i className="mdi mdi-delete-outline" />
					<UncontrolledTooltip placement="top" target="deleteToolTip">
						Delete
					</UncontrolledTooltip>
				</Button>
			</li> */}
		</ul>
	);
};

ActionButtons.propTypes = {
	row: PropTypes.shape({
		original: PropTypes.shape({
			id: PropTypes.number.isRequired,
			status: PropTypes.bool.isRequired,
		}).isRequired,
	}).isRequired,
	handleStatus: PropTypes.func.isRequired,
	// handleDelete: PropTypes.func.isRequired,
	handleView: PropTypes.func.isRequired,
};

export default ActionButtons;
