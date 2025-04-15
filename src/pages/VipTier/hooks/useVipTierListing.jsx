/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { getAllVipTier } from '../../../network/getRequests';
import ActionButtons from '../ActionButtons';
import {
	VipTierId,
	Name,
	Level,
	// PrioritySupport,
	WageringThreshold,
	GamesPlayed,
	BigBetsThreshold,
	BigBetAmount,
	DepositsThreshold,
	LoginStreak,
	ReferralsCount,
	// SweepstakesEntries,
	// SweepstakesWins,
	TimeBasedConsistency,
	Status,
} from '../VipTierListCol';
import { modules } from '../../../constants/permissions';
import { useNavigate } from 'react-router-dom';

const useVipTierListing = ({ handleEdit, handleView }) => {
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const fetchVipTiers = async () => {
		setIsLoading(true);
		try {
			const response = await getAllVipTier({
				limit: itemsPerPage,
				pageNo: page,
			});
			setData(response?.data?.data?.data);
		} catch (error) {
			console.error('Error fetching packages:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchVipTiers();
	}, [page, itemsPerPage]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const formattedData = useMemo(() => {
		if (data.totalCount) {
			return data?.vipTiers.rows.map((item) => ({
				...item,
			}));
		}
		return [];
	}, [data]);

	// const onClickEdit = (selectedRow) => {
	// 	// setIsEdit({ open: true, selectedRow });
	// 	// setHeader('Edit Spin Wheel Configuration');
	// 	// validation.setValues(getInitialValues(selectedRow));
	// 	// setIsOpen((prev) => !prev);
	// };
	// const handleEditClick = ({ e, id, data }) => {
	// 	// e.preventDefault();
	// 	console.log('++++++++++++++++', id, data);
	// 	navigate(`edit/${1}`, { state: { data } });
	// 	// dispatch(selectPromotionByPage(data));
	// };

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'vipTierId',
				filterable: true,
				Cell: ({ cell }) => <VipTierId value={cell.value} />,
			},
			// {
			// 	Header: 'Order Id',
			// 	accessor: 'id',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <OrderId value={cell.value} />,
			// },
			{
				Header: 'VIP Tier',
				accessor: 'name',
				filterable: false,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
			{
				Header: 'Level',
				accessor: 'level',
				filterable: false,
				Cell: ({ cell }) => <Level value={cell.value} />,
			},
			{
				Header: 'Wager Threshold',
				accessor: 'wageringThreshold',
				filterable: true,
				Cell: ({ cell }) => <WageringThreshold value={cell.value} />,
			},
			{
				Header: 'Games Played',
				accessor: 'gamesPlayed',
				filterable: true,
				Cell: ({ cell }) => <GamesPlayed value={cell.value} />,
			},
			{
				Header: 'Big Bets Threshold',
				accessor: 'bigBetsThreshold',
				filterable: true,
				Cell: ({ cell }) => <BigBetsThreshold value={cell.value} />,

			},
			{
				Header: 'Big Bet Amount',
				accessor: 'bigBetAmount',
				filterable: true,
				Cell: ({ cell }) => <BigBetAmount value={cell.value} />,

			},
			{
				Header: 'Deposits Threshold',
				accessor: 'depositsThreshold',
				filterable: false,
				Cell: ({ cell }) => <DepositsThreshold value={cell.value} />,
			},
			{
				Header: 'Login Streak',
				accessor: 'loginStreak',
				filterable: false,
				Cell: ({ cell }) => <LoginStreak value={cell.value} />,
			},
			{
				Header: 'Referrals Count',
				accessor: 'referralsCount',
				filterable: true,
				Cell: ({ cell }) => <ReferralsCount value={cell.value} />,
			},
			// {
			// 	Header: 'Sweepstakes Entries',
			// 	accessor: 'sweepstakesEntries',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <SweepstakesEntries value={cell.value} />,
			// },
			// {
			// 	Header: 'Sweepstakes Wins',
			// 	accessor: 'sweepstakesWins',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <SweepstakesWins value={cell.value} />,
			// },
			{
				Header: 'Time-Based Consistency',
				accessor: 'timeBasedConsistency',
				filterable: true,
				Cell: ({ cell }) => <TimeBasedConsistency value={cell.value} />,
			},
			// {
			// 	Header: 'Max Redemption Limit',
			// 	accessor: 'maxRedemptionLimit',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <MaxRedemptionLimit value={cell.value} />,
			// },
			{
				Header: 'STATUS',
				accessor: 'isActive',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			// {
			// 	Header: 'Priority Support',
			// 	accessor: 'prioritySupport',
			// 	disableFilters: true,
			// 	disableSortBy: true,
			// 	Cell: ({ cell }) => <PrioritySupport value={cell.value} />,
			// },
			{
				Header: 'ACTION',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => (
					<ActionButtons row={cell?.row} handleEdit={handleEdit} handleView={handleView} />
				),
			},
		],
		[]
	);

	// const buttonList = useMemo(() => [
	//     {
	//         label: 'Create',
	//         link: '/vip-tier/create'
	//     },
	// ]);
	const handleCreateClick = (e) => {
		e.preventDefault();
		navigate('create');
	};

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleCreateClick,
			link: '#!',
			module: modules.VipTier,
			operation: 'C',
		},
	]);

	return {
		columns,
		buttonList,
		formattedData,
		onChangeRowsPerPage,
		setPage,
		itemsPerPage,
		// totalCount,
		page,
		isLoading,
	};
};

export default useVipTierListing;
