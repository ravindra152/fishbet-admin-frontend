/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlayersStart } from '../../../store/actions';
import { formatDateYMD, getDateTime } from '../../../helpers/dateFormatter';

import {
	Action,
	Email,
	IsInternal,
	// PhoneNumber,
	PlayerId,
	Status,
	UserName,
	// CountryCode,
	Referrer,
	// Telegram,
	EmailVerified,
	CreatedAt,
	KycLevel,
} from '../PlayersListCol';

const usePlayersListing = (filterValues = {}) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [createUser,setCreateUser]=useState(false)
	const [currentPage, setCurrentPage] = useState(1);
	const { players, loading: isPlayersLoading } = useSelector(
		(state) => state.Players
	);
	const superAdminUser = useSelector(
		(state) => state.PermissionDetails.superAdminUser
	);
	const formattedPlayers = useMemo(() => {
		const formattedValues = [];
		if (players) {
			players.rows.map((player) =>
				formattedValues.push({
					...player,
					fullName: `${player.firstName} ${player.lastName}`,
					status: player.isActive ? 'Active' : 'In-Active',
					isInternal: player.isInternalUser ? 'YES' : 'NO',
					countryCode: player?.country?.name ?? '-',
					referrer: player?.referrer?.username ?? '-',
					isEmailVerified: player?.isEmailVerified ? 'Yes' : 'No',
					createdAt: getDateTime(player?.createdAt),
					level: player?.level,
				})
			);
		}
		return formattedValues;
	}, [players]);

	const columns = useMemo(
		() => [
			{
				Header: 'Player Id',
				accessor: 'userId',
				filterable: true,
				Cell: ({ cell }) => <PlayerId value={cell.value} />,
			},
			{
				Header: 'Username',
				accessor: 'username',
				filterable: true,
				Cell: ({ cell }) => <UserName cell={cell} />,
			},
			// {
			// 	Header: 'Telegram Id',
			// 	accessor: 'telegramId',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <Telegram cell={cell} />,
			// },

			{
				Header: 'Email',
				accessor: 'email',
				filterable: true,
				Cell: ({ cell }) => <Email value={cell.value} />,
			},
			// {
			// 	Header: 'Phone Number',
			// 	accessor: 'phone',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <PhoneNumber value={cell.value} />,
			// },
			{
				Header: 'Referrer',
				accessor: 'referrer',
				filterable: true,
				Cell: ({ cell }) => <Referrer value={cell.value} />,
			},
			{
				Header: 'Status',
				accessor: 'status',
				filterable: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			// {
			// 	Header: 'Kyc Level',
			// 	accessor: 'level',
			// 	Cell: ({ cell }) => <KycLevel value={cell.value} />,
			// },
			{
				Header: 'Email Verified',
				accessor: 'isEmailVerified',
				Cell: ({ cell }) => <EmailVerified value={cell.value} />,
			},
			// {
			// 	Header: 'Country Name',
			// 	accessor: 'countryCode',
			// 	Cell: ({ cell }) => <CountryCode value={cell.value} />,
			// },
			{
				Header: 'Registration Date',
				accessor: 'createdAt',
				Cell: ({ cell }) => <CreatedAt value={cell.value} />,
			},
			{
				Header: 'Is Internal',
				accessor: 'isInternal',
				Cell: ({ cell }) => <IsInternal value={cell.value} />,
			},
			{
				Header: 'Action',
				accessor: '',
				disableSortBy: true,
				Cell: ({ cell }) => <Action cell={cell} />,
			},
		],
		[]
	);

	useEffect(() => {
		dispatch(
			fetchPlayersStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				...filterValues,
				startDate: filterValues.startDate ? formatDateYMD(filterValues.startDate) : null ,
                endDate: filterValues.endDate?  formatDateYMD(filterValues.endDate) : null,
			})
		);
	}, [currentPage, itemsPerPage]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const handleCreate = ()=>{
		setCreateUser(true)
	}

	const ButtonLists = [
		{
			label: 'Create Users',
			handleClick: handleCreate,
			link: '#!',
			// module: modules.BannerManagement,
			operation: 'C',
			hidden: superAdminUser?.AdminRole?.level !== 5
		},
	]

	return {
		currentPage,
		setCurrentPage,
		totalPlayersCount: players?.count,
		isPlayersLoading,
		formattedPlayers,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		ButtonLists,
		createUser,
		setCreateUser
	};
};

export default usePlayersListing;
