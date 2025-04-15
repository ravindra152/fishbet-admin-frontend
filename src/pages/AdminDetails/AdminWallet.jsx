/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { Card, Container } from 'reactstrap';
import { isEmpty } from 'lodash';
import TableContainer from '../../components/Common/TableContainer';
import { WALLET_CURRENCY_CODE_NAME } from '../PlayerDetails/constants';

const AdminWallet = ({ details }) => {
	const CurrencyId = ({ value }) => value ?? '';
	const WalletAmount = ({ value }) => value ?? '';
	const CurrencyCode = ({ value }) => WALLET_CURRENCY_CODE_NAME[value] ?? '';

	const formattedAdminDetails = useMemo(() => {
		const arrayToReturn = [];
		if (!isEmpty(details)) {
			details?.adminWallet?.map((txn) =>
				arrayToReturn.push({
					...txn,
					currencyId: txn?.id,
					code: txn?.Currency?.code,
					amount: parseInt(txn?.balance, 10),
					// nonCashAmount: txn?.nonCashAmount,
					// totalAmount: txn?.totalAmount,
				})
			);
		}
		return arrayToReturn;
	}, [details]);
	const columns = useMemo(
		() => [
			{
				Header: 'Currency Id',
				accessor: 'currencyId',
				filterable: true,
				Cell: ({ cell }) => <CurrencyId value={cell.value} />,
			},

			{
				Header: 'Currency Name',
				accessor: 'code',
				filterable: true,
				Cell: ({ cell }) => <CurrencyCode value={cell.value} />,
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
				<h4 className="text-center border-bottom p-3">Wallet</h4>
				<TableContainer
					columns={columns}
					data={formattedAdminDetails}
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

export default AdminWallet;
