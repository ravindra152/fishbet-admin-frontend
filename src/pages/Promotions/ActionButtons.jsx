/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const ActionButtons = ({
	row,
	handleEditClick,
	handleViewClick,
  handleDeleteClick,
}) => {
	const { isGranted } = usePermission();
	const status = row?.original?.isActive;
	const promotionId = row?.original?.id;
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li>
				<Button
					hidden={!isGranted(modules.ContentManagement, 'U')}
					type="button"
					className="btn btn-sm btn-soft-info"
					onClick={(e) => handleEditClick({ e, promotionId: promotionId, promotionData: row?.original })}
				>
					<i className="mdi mdi-pencil-outline" id="edittooltip" />
					<UncontrolledTooltip placement="top" target="edittooltip">
						Edit
					</UncontrolledTooltip>
				</Button>
			</li>

			{/* <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
				<Button
					hidden={!isGranted(modules.ContentManagement, 'R')}
					className="btn btn-sm btn-soft-primary"
					onClick={(e) => handleViewClick(e, promotionId)}
				>
					<i className="mdi mdi-eye-outline" id="viewtooltip" />
					<UncontrolledTooltip placement="top" target="viewtooltip">
						View
					</UncontrolledTooltip>
				</Button>
			</li> */}

      <li>
				<Button
					hidden={!isGranted(modules.ContentManagement, 'D')}
					className="btn btn-sm btn-soft-danger"
					onClick={(e) => {
						e.preventDefault();
						handleDeleteClick({
              promotionId: promotionId
            });
					}}
				>
					<i className="mdi mdi-delete-outline" id={`delete-${promotionId}`} />
					<UncontrolledTooltip placement="top" target={`delete-${promotionId}`}>
						Delete
					</UncontrolledTooltip>
				</Button>
			</li>
		</ul>
	);
};

ActionButtons.propTypes = {
	handleEditClick: PropTypes.func.isRequired,
	handleViewClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
	row: PropTypes.objectOf.isRequired,
};

export default ActionButtons;
