/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import usePermission from '../../../components/Common/Hooks/usePermission';
import { modules } from '../../../constants/permissions';
// import { showToastr } from '../../../utils/helpers';
import TableContainer from '../../../components/Common/TableContainer';
import {
	Action,
	Email,
	IsInternal,
	KycLevel,
	PlayerId,
	Status,
	UserName,
} from '../PlayersListCol';
import {
	fetchPlayersStart,
	sendEmailPlayersStart,
} from '../../../store/actions';

const columnsArray = ({ selectedUsers, toggleSelectedUser }) => [
	{
		Header: 'Player Id',
		accessor: 'userId',
		Cell: ({ cell }) => <PlayerId value={cell.value} />,
	},
	{
		Header: 'Username',
		accessor: 'username',
		Cell: ({ cell }) => <UserName cell={cell} />,
	},
	{
		Header: 'Email',
		accessor: 'email',
		Cell: ({ cell }) => <Email value={cell.value} />,
	},
	{
		Header: 'Status',
		accessor: 'status',
		disableSortBy: true,
		Cell: ({ cell }) => <Status value={cell.value} />,
	},
	{
		Header: 'Kyc Level',
		accessor: 'level',
		Cell: ({ cell }) => <KycLevel value={cell.value} />,
	},
	{
		Header: 'Is Internal',
		accessor: 'isInternal',
		Cell: ({ cell }) => <IsInternal value={cell.value} />,
	},
	{
		Header: 'Action',
		accessor: '',
		Cell: ({ cell }) => (
			<Action
				cell={cell}
				length={selectedUsers?.length}
				selectedUsers={selectedUsers}
				toggleSelectedUser={toggleSelectedUser}
			/>
		),
	},
];

const usePlayerEmails = () => {
	const dispatch = useDispatch();
	// const { isGranted } = usePermission();
	const [activeTab, setActiveTab] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const { players, loading: isPlayersLoading } = useSelector(
		(state) => state.Players
	);

	const onSuccessCallback = () => {
		setSelectedUsers([]);
	};

	const handleEmailClick = () => {
		dispatch(
			sendEmailPlayersStart({
				userIds: selectedUsers,
				templateType: activeTab === 1 ? 'ACTIVE_USER' : 'IN_ACTIVE_USER',
				callBack: onSuccessCallback,
			})
		);
	};

	const toggleSelectedUser = (id, isChecked) => {
		let updatedUsers = [];
		if (isChecked)
			updatedUsers = selectedUsers?.filter(
				(userId) => userId?.toString() !== id?.toString()
			);
		else updatedUsers = [...selectedUsers, id];

		setSelectedUsers(updatedUsers);
	};

	const buttonList = useMemo(() => [
		{
			label: 'Send Email',
			handleClick: handleEmailClick,
			link: '#!',
			module: modules.EmailTemplate,
			operation: 'U',
		},
	]);

	useEffect(() => {
		dispatch(
			fetchPlayersStart({
				isActive: activeTab === 1,
				limit: itemsPerPage,
				pageNo: currentPage,
			})
		);
	}, [currentPage, itemsPerPage, activeTab]);

	const toggle = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
		}
	};

	const formattedPlayers = useMemo(() => {
		const formattedValues = [];
		if (players) {
			players.rows.map((player) =>
				formattedValues.push({
					...player,
					fullName: `${player.firstName} ${player.lastName}`,
					status: player.isActive ? 'Active' : 'In-Active',
					isInternal: player.isInternalUser ? 'YES' : 'NO',
				})
			);
		}
		return formattedValues;
	}, [players]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const columns = useMemo(
		() => columnsArray({ selectedUsers, toggleSelectedUser }),
		[selectedUsers]
	);

	const tabData = [
		{
			id: 1,
			title: 'Active Players',
			component: (
				<TableContainer
					isLoading={isPlayersLoading}
					columns={columns}
					data={formattedPlayers || []}
					isPagination
					customPageSize={itemsPerPage || 15}
					tableClass="table-bordered align-middle nowrap mt-2"
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					totalPageCount={players?.count}
					isManualPagination
					onChangePagination={setCurrentPage}
					currentPage={currentPage}
					changeRowsPerPageCallback={onChangeRowsPerPage}
				/>
			),
		},
		{
			id: 2,
			title: 'No Show Players',
			component: (
				<TableContainer
					isLoading={isPlayersLoading}
					columns={columns}
					data={formattedPlayers || []}
					isPagination
					customPageSize={itemsPerPage || 15}
					tableClass="table-bordered align-middle nowrap mt-2"
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					totalPageCount={players?.count}
					isManualPagination
					onChangePagination={setCurrentPage}
					currentPage={currentPage}
					changeRowsPerPageCallback={onChangeRowsPerPage}
				/>
			),
		},
	];

	return {
		activeTab,
		setActiveTab,
		toggle,
		buttonList,
		tabData,
	};
};

export default usePlayerEmails;
