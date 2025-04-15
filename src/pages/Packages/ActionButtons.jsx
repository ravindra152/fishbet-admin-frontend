/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePackage } from '../../store/packages/actions';

const ActionButtons = ({
	row: { original },
	deleteSuccess
}) => {
	const dispatch = useDispatch()
	// const { isGranted } = usePermission();
	// const active = original?.isActive;
	const packageId = original?.id;
	// const isDisabled = !!original?.parentId;
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li>
				<Link
					to="#!"
					// hidden={!isGranted(modules.CasinoManagement, 'T')}
					className="btn btn-sm btn-soft-danger"
					onClick={() => {
						dispatch(deletePackage({ id: packageId, fetchData: deleteSuccess }))
					}}
				>
					<i
						className="mdi mdi-close-thick"
						id={`activetooltip-${packageId}`}
					/>
				</Link>
			</li>

			<li>
				<Link
					// hidden={!isGranted(modules.CasinoManagement, 'U')}
					className="btn btn-sm btn-soft-info"
					to={`/packages/edit/${packageId}`}
				>
					<i
						className="mdi mdi-pencil-outline"
						id={`edittooltip-${packageId}`}
					/>
					<UncontrolledTooltip
						placement="top"
						target={`edittooltip-${packageId}`}
					>
						Edit
					</UncontrolledTooltip>
				</Link>
			</li>
		</ul>
	)
}
ActionButtons.prototype = {
	original: PropTypes.objectOf.isRequired,
	handleStatus: PropTypes.func.isRequired,
	onClickEdit: PropTypes.func.isRequired,
	handleDeleteItem: PropTypes.func.isRequired,
};

export default ActionButtons;
