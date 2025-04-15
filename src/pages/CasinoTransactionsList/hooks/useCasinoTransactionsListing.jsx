/* eslint-disable react/prop-types */
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modules } from '../../../constants/permissions';
import { formatDateYMD, getDateTime } from '../../../helpers/dateFormatter';
import { getAccessToken } from '../../../network/storageUtils';
import { fetchCasinoTransactionsStart } from '../../../store/actions';
import { downloadFileInNewWindow } from '../../../utils/helpers';
import {
	ActionType,
	// BonusMoney,
	CreatedAt,
	GameName,
	Id,
	UserEmail,
	UserName
} from '../CasinoTransactionsListCol';
import { casinoActionType, COLOR_BY_CURRENCY } from '../constants';

const { VITE_APP_API_URL } = import.meta.env;

const useCasinoTransactionsListing = (filterValues = {}) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { casinoTransactions, loading: isCasinoTransactionsLoading } =
		useSelector((state) => state.CasinoTransactions);

	useEffect(() => {
		dispatch(
			fetchCasinoTransactionsStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				...filterValues,
				startDate: filterValues?.startDate ? formatDateYMD(filterValues?.startDate) : null,
				endDate: filterValues?.endDate ? formatDateYMD(filterValues?.endDate) : null,
			})
		);
	}, [currentPage, itemsPerPage]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const formattedCasinoTransactions = useMemo(() => {
		const formattedValues = [];
		if (casinoTransactions) {
			casinoTransactions?.data?.map((txn) =>
				formattedValues.push({
					...txn,
					actionType: casinoActionType[txn?.action_type] || '',
					id: txn.casino_transaction_id,
					userEmail: txn.email,
					userName: txn.username,
					amountWithCurr: txn?.casinoLedger?.[0]?.amount
						? `${txn?.casinoLedger?.[0]?.amount} ${txn?.casinoLedger?.[0]?.Wallet?.currencyCode}`
						: '-',
					// bonusAmt: `${txn.nonCashAmount} ${txn.currencyCode}`,
					createdAt: getDateTime(txn?.created_at),
					// statusText: casinostatusType?.[txn.status] ?? '',
					gameIdentifier: txn?.casino_game_name ?? '-',
					coins: (
						<div className="d-flex">
							<span
								className={`badge badge-soft-${COLOR_BY_CURRENCY?.GC} fs-6 mx-1`}
							>
								GC: {parseFloat(txn?.gccoin)?.toFixed(2) ?? 0}
							</span>
							<span
								className={`badge badge-soft-${COLOR_BY_CURRENCY?.RSC} fs-6 mx-1`}
							>
								SC: {parseFloat(txn?.sccoins)?.toFixed(2) ?? 0}
							</span>
						</div>
					),
					// afterBalance: `${txn?.afterBalance ?? '-'} ${txn?.afterBalance ? txn?.currencyCode : ''
					// 	}`,
					// beforeBalance: `${txn?.beforeBalance ?? '-'} ${txn?.beforeBalance ? txn?.currencyCode : ''
					// 	}`,
					// primaryCurrencyAmount:
					// 	txn?.casinoLedger?.[0]?.amount ? `${txn?.casinoLedger?.[0]?.amount} ${txn?.casinoLedger?.[0]?.Wallet?.currencyCode}` : '-',
				}));
		}
		return formattedValues;
	}, [casinoTransactions]);

	// console.log("fetchCasinoTransactionsStart",casinoTransactions?.data)

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'User Email',
				accessor: 'userEmail',
				filterable: true,
				Cell: ({ cell }) => <UserEmail value={cell.value} />,
			},
			{
				Header: 'User Name',
				accessor: 'userName',
				filterable: true,
				Cell: ({ cell }) => <UserName cell={cell} />,
			},
			{
				Header: 'Game Name',
				accessor: 'gameIdentifier',
				filterable: true,
				Cell: ({ cell }) => <GameName value={cell.value} />,
			},
			{
				Header: 'Action Type',
				accessor: 'actionType',
				filterable: true,
				Cell: ({ cell }) => <ActionType value={cell.value} />,
			},
			// {
			// 	Header: 'Primary Currency Amount',
			// 	accessor: 'primaryCurrencyAmount',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <PrimaryCurrencyAmount value={cell.value} />,
			// },
			// {
			// 	Header: 'Bonus Money',
			// 	accessor: 'bonusAmt',
			// 	Cell: ({ cell }) => <BonusMoney value={cell.value} />,
			// },
			// {
			// 	Header: 'Before Balance',
			// 	accessor: 'beforeBalance',
			// 	Cell: ({ cell }) => <BeforeBalance value={cell.value} />,
			// },
			{
				Header: 'Coins',
				accessor: 'coins',
				filterable: true,
				Cell: ({ cell }) => <ActionType value={cell.value} />,
			},
			// {
			// 	Header: 'After Balance',
			// 	accessor: 'afterBalance',
			// 	Cell: ({ cell }) => <AfterBalance value={cell.value} />,
			// },

			// {
			// 	Header: 'Status',
			// 	accessor: 'statusText',
			// 	Cell: ({ cell }) => <Status value={cell.value} />,
			// },
			{
				Header: 'Created At',
				accessor: 'createdAt',
				Cell: ({ cell }) => <CreatedAt value={cell.value} />,
			},
		],
		[]
	);

	const handleDownload = () => {
		if (!casinoTransactions?.data || casinoTransactions.data.length === 0) {
		  alert("No data available to export.");
		  return;
		}
	  
		const headers = Object.keys(casinoTransactions.data[0]).join(",") + "\n";
	  
		const csvRows = casinoTransactions.data.map(row =>
		  Object.values(row).map(value => `"${value}"`).join(",") // Ensure values are enclosed in quotes
		).join("\n");
	  
		const csvContent = "data:text/csv;charset=utf-8," + headers + csvRows;
	  
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "casino_transactions.csv");
		document.body.appendChild(link);
	  
		link.click();
		document.body.removeChild(link);
	  };
	  
	  <button onClick={handleDownload}>Export CSV</button>;
	  

	const buttonList = useMemo(() => [
		{
			label: '',
			handleClick: handleDownload,
			link: '#!',
			tooltip: 'Download as CSV',
			icon: <i className="mdi mdi-file-download-outline" />,
			module: modules.CasinoManagement,
			operation: 'R',
		},
	]);

	return {
		currentPage,
		setCurrentPage,
		totalCasinoTransactionsCount: casinoTransactions?.totalCount,
		isCasinoTransactionsLoading,
		formattedCasinoTransactions,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		buttonList,
	};
};

export default useCasinoTransactionsListing;
