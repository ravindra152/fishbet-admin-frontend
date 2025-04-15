/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { fetchTransactionBankingStart } from '../../../store/actions';
// import { statusType, transactionType, walletType } from '../constants';
import { formatDateYMD, getDateTime } from '../../../helpers/dateFormatter';
import {
	ActionType,
	// Actionee,
	// ActioneeType,
	CreatedAt,
	Id,
	UserName,
	PaymentProvider,
	// Status,
	TransactionId,
} from '../TransactionBankingCol';
import { downloadFileInNewWindow } from '../../../utils/helpers';
import { getAccessToken } from '../../../network/storageUtils';
import { COLOR_BY_CURRENCY } from '../../CasinoTransactionsList/constants';

// import { modules } from '../../../constants/permissions';

const { VITE_APP_API_URL } = import.meta.env;

const useTransactionBankingListing = (userId, filterValues = {}) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { transactionBanking, loading: isTransactionBankingLoading } =
		useSelector((state) => state.TransactionBanking);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	// const handleWalletType = ({ type, amountType }) => {
	// 	if (
	// 		[
	// 			'addMoney',
	// 			'removeMoney',
	// 			'addMoneyInternal',
	// 			'removeMoneyInternal',
	// 		]?.includes(type)
	// 	) {
	// 		return `(${walletType[amountType]})`;
	// 	}
	// 	return '';
	// };

	useEffect(() => {
		dispatch(
			fetchTransactionBankingStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				userId: userId || '',
				...filterValues,
				startDate: filterValues?.startDate ? formatDateYMD(filterValues?.startDate) : null,
				endDate: filterValues?.endDate ? formatDateYMD(filterValues?.endDate) : null,
			})
		);
	}, [currentPage, itemsPerPage]);

	const formattedTransactionBanking = useMemo(() => {
		const formattedValues = [];
		if (transactionBanking) {
			transactionBanking?.data?.map((transaction) =>
				formattedValues.push({
					...transaction,
					userId: transaction?.user_id,
					username: transaction?.username ?? '-',
					// amountWithCurr:
					// 	transaction?.amount
					// 		>= 0
					// 		? `${transaction?.amount}`
					// 		: `${transaction?.amount}`,
					// status: statusType.find(
					// 	(status) => status?.value === transaction?.status
					// )?.label,
					// actionType: transaction?.transactionType,
					createdAt: getDateTime(transaction.created_at),
					transactionId: transaction?.transaction_id ?? '-',
					// coinType: transaction?.Wallet?.currencyCode,
					coins: (
						<div className="d-flex">
							<span
								className={`badge badge-soft-${COLOR_BY_CURRENCY?.GC} fs-6 mx-1`}
							>
								GC: {parseFloat(transaction?.gccoin)?.toFixed(2) ?? 0}
							</span>
							<span
								className={`badge badge-soft-${COLOR_BY_CURRENCY?.RSC} fs-6 mx-1`}
							>
								SC: {parseFloat(transaction?.sccoins)?.toFixed(2) ?? 0}
							</span>
						</div>
					),
					// paymentProvider: transaction?.paymentProvider ?? '-',
				})
			);
		}
		return formattedValues;
	}, [transactionBanking]);

	const columns = useMemo(
		() => [
			{
				Header: 'User Id',
				accessor: 'userId',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Username',
				accessor: 'username',
				filterable: true,
				Cell: ({ cell }) => <UserName value={cell} />,
			},
			{
				Header: 'Email',
				accessor: 'email',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			// {
			// 	Header: 'Action Type',
			// 	accessor: 'actionee_type',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <TransactionId value={cell.value} />,
			// },
			{
				Header: 'Transaction Id',
				accessor: 'transactionId',
				filterable: true,
				Cell: ({ cell }) => <TransactionId value={cell.value} />,
			},
			{
				Header: 'Amount',
				accessor: 'amount',
				filterable: true,
				Cell: ({ cell }) => <TransactionId value={cell.value} />,
			},

			// {
			// 	Header: 'Actionee',
			// 	accessor: 'actioneeEmail',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <Actionee value={cell.value} />,
			// },
			{
				Header: 'Coins',
				accessor: 'coins',
				filterable: true,
				Cell: ({ cell }) => <PaymentProvider value={cell.value} />,
			},
			// {
			// 	Header: 'Amount',
			// 	accessor: 'amountWithCurr',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <Amount value={cell.value} />,
			// },
			{
				Header: 'Purpose',
				accessor: 'purpose',
				filterable: true,
				Cell: ({ cell }) => <ActionType value={cell.value} />,
			},
			// {
			// 	Header: 'Actionee Type',
			// 	accessor: 'actioneeType',
			// 	Cell: ({ cell }) => <ActioneeType value={cell.value} />,
			// },
			// {
			// 	Header: 'Status',
			// 	accessor: 'status',
			// 	Cell: ({ cell }) => <Status value={cell.value} />,
			// },
			{
				Header: 'Date',
				accessor: 'createdAt',
				Cell: ({ cell }) => <CreatedAt value={cell.value} />,
			},
		],
		[]
	);

	const handleDownload = () => {
		if (!transactionBanking?.data || transactionBanking.data.length === 0) {
		  alert("No data available to export.");
		  return;
		}
	  
		const headers = Object.keys(transactionBanking.data[0]).join(",") + "\n";
	  
		// Convert to CSV
		const csvRows = transactionBanking.data.map(row =>
		  Object.values(row).map(value => `"${value}"`).join(",") // Wrap values in quotes
		).join("\n");
	  
		const csvContent = "data:text/csv;charset=utf-8," + headers + csvRows;
	  
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "TransactionsBanking.csv");
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
		},
	]);

	return {
		currentPage,
		setCurrentPage,
		totalTransactionBankingCount: transactionBanking?.totalCount,
		isTransactionBankingLoading,
		formattedTransactionBanking,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		buttonList,
	};
};

export default useTransactionBankingListing;
