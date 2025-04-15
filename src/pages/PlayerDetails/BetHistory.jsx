/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import TableContainer from '../../components/Common/TableContainer';
import {
	ActionTypes,
	Amount,
	// BonusMoney,
	CreatedAt,
	// Email,
	GameName,
	Id,
	Status,
	AfterBalance,
	BeforeBalance,
	PrimaryCurrencyAmount,
} from './TableCol';
import { fetchCasinoTransactionsStart } from '../../store/actions';
import { getDateTime } from '../../utils/dateFormatter';
// import { statusType } from '../CasinoTransactionsList/constants';
import Filters from '../../components/Common/Filters';
import useBetHistoryFilters from './hooks/useBetHistoryFilters';
import { formatDateYMD } from '../../helpers/dateFormatter';

const BetHistory = ({ userId }) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { casinoTransactions, loading: isCasinoTransactionsLoading } =
		useSelector((state) => state.CasinoTransactions);

		const formattedCasinoTransactions = useMemo(() => {
			console.log("Raw Casino Transactions:", casinoTransactions);
		
			if (!casinoTransactions?.data?.length) {
				return [];
			}
		
			return casinoTransactions?.data?.map((txn) => ({
				...txn,
				casinoTransactionId: txn?.id,
				userEmail: txn?.User?.email,
				gameIdentifier: txn?.CasinoGame?.name,
				amountWithCurr: `${txn?.amount} ${txn?.currencyCode}`,
				bonusAmt: `${txn.nonCashAmount ?? '0'} ${txn.User?.currencyCode ?? ''}`,
				created_at: formatDateYMD(txn?.created_at),
				statusText: parseInt(txn?.status, 10),
				afterBalance: `${txn?.afterBalance} ${txn?.currencyCode}`,
				beforeBalance: `${txn?.beforeBalance} ${txn?.currencyCode}`,
				primaryCurrencyAmount: `${txn?.primaryCurrencyAmount} ${
					txn?.currencyCode === 'IDR' ? 'IDR' : 'USD'
				}`,
			}));
		}, [casinoTransactions]);
		
	// console.log("data", casinoTransactions)
	useEffect(() => {
		if (userId) {
			dispatch(fetchCasinoTransactionsStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				userId,
			}));
		}
	}, [dispatch, userId, currentPage, itemsPerPage]);
	
	console.log(casinoTransactions)
	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'casino_transaction_id',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			// {
			// 	Header: 'User Email',
			// 	accessor: 'userEmail',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <Email value={cell.value} />,
			// },
			{
				Header: 'Game Name',
				accessor: 'casino_game_name',
				filterable: true,
				Cell: ({ cell }) => <GameName value={cell.value} />,
			},
			{
				Header: 'Action Type',
				accessor: 'action_type',
				filterable: true,
				Cell: ({ cell }) => <ActionTypes value={cell.value} />,
			},
			// {
			// 	Header: 'Amount',
			// 	accessor: 'amountWithCurr',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <Amount value={cell.value} />,
			// },
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
			{
				Header: 'GC Coin',
				accessor: 'gccoin',
				filterable: true,
				Cell: ({ cell }) => <AfterBalance value={cell.value} />,
			},
			{
				Header: 'SC Coin',
				accessor: 'sccoins',
				filterable: true,
				Cell: ({ cell }) => <BeforeBalance value={cell.value} />,
			},
			// {
			// 	Header: 'Status',
			// 	accessor: 'statusText',
			// 	Cell: ({ cell }) => <Status value={cell.value} />,
			// },
			{
				Header: 'Created At',
				accessor: 'created_at',
				Cell: ({ cell }) => <CreatedAt value={cell.value} />,
			},
		],
		[]
	);

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useBetHistoryFilters();

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};
	console.log("formattedCasinoTransactions", formattedCasinoTransactions)
	return (
		<Container fluid>
			<Card className="p-2">
				<CardBody>
					<Filters
						validation={filterValidation}
						filterFields={filterFields}
						actionButtons={actionButtons}
						isAdvanceOpen={isAdvanceOpen}
						toggleAdvance={toggleAdvance}
						isFilterChanged={isFilterChanged}
					/>
					<TableContainer
						isLoading={isCasinoTransactionsLoading}
						columns={columns}
						data={formattedCasinoTransactions}
						isPagination
						customPageSize={itemsPerPage}
						tableClass="table-bordered align-middle nowrap mt-2"
						// paginationDiv="col-sm-12 col-md-7"
						paginationDiv="justify-content-center"
						pagination="pagination justify-content-start pagination-rounded"
						totalPageCount={casinoTransactions?.count}
						isManualPagination
						onChangePagination={setCurrentPage}
						currentPage={currentPage}
						changeRowsPerPageCallback={onChangeRowsPerPage}
					/>
				</CardBody>
			</Card>
		</Container>
	);
};

export default BetHistory;
