/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { getAdminDetails } from '../../../store/actions';
import {
	AdminUserID,
	Email,
	FullName,
	Status,
	Role,
	// Group,
	UserName,
} from '../AdminsListCol';
import ActionButtons from '../ActionButtons';
import { updateSuperAdminStatusStart } from '../../../store/adminUser/actions';

const useAdmin = (handleEdit, filterValues = {}) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const { adminDetails, isLoading, error } = useSelector(
		(state) => state.AllAdmins
	);
	const superAdminUser = useSelector((state) => state.PermissionDetails.superAdminUser);

	const roles = useSelector((state) => state.AdminRoles.roles);
	const [page, setPage] = useState(1);
	const [orderBy, setOrderBy] = useState('adminUserId');
	const [sort, setSort] = useState('DESC');
	const [name, setName] = useState();
	const [adminData, setAdminData] = useState();
	const [modalStates, setModalStates] = useState({
		activeYesNoStaffModal: false,
	});
	const openModal = (modalName) => {
		setModalStates((prev) => ({ ...prev, [modalName]: true }));
	};

	const closeModal = (modalName) => {
		setModalStates((prev) => ({ ...prev, [modalName]: false }));
	};

	const formattedAdminDetails = useMemo(() => {
		if (adminDetails && roles) {
			return adminDetails?.rows.map((admin) => ({
				...admin,
				adminUserId: admin?.adminUserId ?? '',
				adminRoleId: admin?.AdminRole?.name,
				fullName: `${admin.firstName ?? ''} ${admin.lastName}`,
				email: admin?.email ?? '',
				adminUsername: admin?.adminUsername ?? '',
				
			}));
		}
		return [];
	}, [adminDetails, roles]);

	const handleStatus = () => {
		const { active: isActive, adminUserId } = adminData;
		dispatch(
			updateSuperAdminStatusStart({
				// code: 'ADMIN',
				status: !isActive,
				adminUserId,
			})
		);
	};
	const openCasinoCategoryModal = (props) => {
		setAdminData(props);
		openModal('activeYesNoStaffModal');
	};
	const fetchData = () => {
		dispatch(
			getAdminDetails({
				limit: itemsPerPage,
				pageNo: page,
				orderBy,
				sort,
				userType: superAdminUser?.AdminRole?.name,
				adminRoleId: adminDetails?.adminRoleId,
				...filterValues,
			})
		);
	};

	useEffect(() => {
		if (location.pathname === '/staff' && superAdminUser) fetchData();
	}, [page, orderBy, sort, location, itemsPerPage, superAdminUser]);

	const columns = useMemo(
		() => [
			{
				Header: '#',
				disableFilters: true,
				filterable: true,
				disableSortBy: true,
				accessor: ({ fullName }) => (
					<div className="avatar-xs">
						<span className="avatar-title rounded-circle">
							{fullName.charAt(0)}
						</span>
					</div>
				),
			},
			{
				Header: 'ID',
				accessor: 'adminUserId',
				filterable: true,
				Cell: ({ cell }) => <AdminUserID value={cell.value} />,
			},
			{
				Header: 'Username',
				accessor: 'adminUsername',
				filterable: true,
				Cell: ({ cell }) => <UserName cell={cell} />,
			},
			{
				Header: 'Full Name',
				accessor: 'fullName',
				filterable: true,
				Cell: ({ cell }) => <FullName value={cell.value} />,
			},
			{
				Header: 'Email',
				accessor: 'email',
				filterable: true,
				Cell: ({ cell }) => <Email value={cell.value} />,
			},
			{
				Header: 'Role',
				accessor: 'adminRoleId',
				filterable: true,
				Cell: ({ cell }) => <Role value={cell.value} />,
			},
			// {
			// 	Header: 'Group',
			// 	accessor: 'group',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <Group value={cell.value} />,
			// },
			{
				Header: 'Status',
				accessor: 'isActive',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => (
					<ActionButtons
						handleEdit={handleEdit}
						row={cell.row}
						handleStatus={openCasinoCategoryModal}
					/>
				),
			},
		],
		[]
	);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	return {
		adminDetails,
		formattedAdminDetails,
		isLoading,
		error,
		totalAdminsCount: adminDetails?.count,
		page,
		setPage,
		orderBy,
		setOrderBy,
		sort,
		setSort,
		name,
		setName,
		itemsPerPage,
		columns,
		onChangeRowsPerPage,
		modalStates,
		closeModal,
		handleStatus,
		adminData,
	};
};

useAdmin.propTypes = {};

useAdmin.defaultProps = {
	cell: PropTypes.objectOf.isRequired,
};

export default useAdmin;
