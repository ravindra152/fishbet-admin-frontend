/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { Card, Container } from 'reactstrap';
import { isEmpty } from 'lodash';
import TableContainer from '../../components/Common/TableContainer';
import {
	// CurrencyId,
	// CurrencyCode,
	WalletAmount,
	KeyCurrencyCode,
	// WalletNonCashAmount,
	// TotalAmount,
} from './TableCol';
// import { keyArray } from './constants';
// import { currencyCodeList } from '../../utils/currencyCodeList';
// import { formatDate } from '../../utils/dateFormatter';

const PlayerWallet = ({ userDetails }) => {
	const formattedUserDetails = useMemo(() => {
		const arrayToReturn = [];
		if (!isEmpty(userDetails)) {
			userDetails?.userWallet?.map((txn) =>
				arrayToReturn.push({
					...txn,
					currencyId: txn?.id,
					code: txn?.currencyCode,
					amount: txn?.balance,
					// nonCashAmount: txn?.nonCashAmount,
					// totalAmount: txn?.totalAmount,
				})
			);
		}
		return arrayToReturn;
	}, [userDetails]);
	const columns = useMemo(
		() => [
			// {
			// 	Header: 'Currency Id',
			// 	accessor: 'currencyId',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <CurrencyId value={cell.value} />,
			// },

			{
				Header: 'Coin Name',
				accessor: 'code',
				filterable: true,
				// Cell: ({ cell }) => <CurrencyCode value={cell.value} />,
				Cell: ({ cell }) => <KeyCurrencyCode value={cell.value} />,
			},
			{
				Header: 'Amount',
				accessor: 'amount',
				filterable: true,
				Cell: ({ cell }) => <WalletAmount value={cell.value} />,
			},
			// {
			// 	Header: 'Non Cash Amount',
			// 	accessor: 'nonCashAmount',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <WalletNonCashAmount value={cell.value} />,
			// },
			// {
			// 	Header: 'TotalAmount',
			// 	accessor: 'totalAmount',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <TotalAmount value={cell.value} />,
			// },
		],
		[]
	);

	return (
		<Container fluid>
			<Card className="p-2">
				<h4 className="text-center p-3">Player Wallet</h4>
				<div className='d-flex items-center justify-content-between px-2'>
					<p className='mb-0'>Total SC Purchases: <br/> 
					<span className='fw-bold'>{userDetails?.totalScPurchase}</span></p>
					<p className='mb-0'>Total SC Redeemed: <br/> 
					<span className='fw-bold'>{userDetails?.totalScRedeemed}</span></p>
				</div>
				<TableContainer
					columns={columns}
					data={formattedUserDetails}
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					// customPageSize={20}
					// hideHeader
					totalPageCount={1}
					cellPadding="0.3rem"
					// tableClass="table-striped table-hover "
					tableClass="table-bordered align-middle nowrap mt-2"
				/>
			</Card>
		</Container>
	);
};

export default PlayerWallet;
