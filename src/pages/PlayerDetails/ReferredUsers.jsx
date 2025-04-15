/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { Card, Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '../../components/Common/TableContainer';
import { getReferredUsersStart } from '../../store/actions';
import {
	CreatedAt,
	// Email,
	// EmailVerified,
	// KycLevel,
	PlayerId,
	PlayerStatus,
	// Status,
	UserName,
	EarnedCommission
} from './TableCol';
import { getDateTime } from '../../helpers/dateFormatter';

// eslint-disable-next-line react/prop-types
const ReferredUsers = ({ userId }) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { referredUsersLoading, referredUsers } = useSelector(
		(state) => state.UserDetails
	);

	useEffect(() => {
		if (userId)
			dispatch(
				getReferredUsersStart({
					limit: itemsPerPage,
					pageNo: currentPage,
					userId,
				})
			);
	}, [currentPage, itemsPerPage, userId]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

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
			// 	Header: 'Email',
			// 	accessor: 'email',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <Email value={cell.value} />,
			// },
			{
				Header: 'Status',
				accessor: 'isActive',
				filterable: true,
				disableSortBy: true,
				Cell: ({ cell }) => <PlayerStatus value={cell.value} />,
			},
			// {
			// 	Header: 'Email Verified',
			// 	accessor: 'isEmailVerified',
			// 	Cell: ({ cell }) => <EmailVerified value={cell.value} />,
			// },
			{
                Header: 'Earned Commission',
                accessor: 'affiliation.earnedCommission',
                filterable: true,
                Cell: ({ cell }) => <EarnedCommission value={cell.value} />,
            },
			{
				Header: 'Registration Date',
				accessor: 'createdAt',
				Cell: ({ cell }) => <CreatedAt value={getDateTime(cell.value)} />,
			},
		],
		[]
	);

	return (
		<Container fluid>
		<h4 className="font-size-18">Total Commission Earned: <span>{referredUsers?.totalCommission}</span></h4>
			<Card className="p-2">
				<TableContainer
					isLoading={referredUsersLoading}
					columns={columns}
					data={referredUsers?.rows || []}
					isPagination
					customPageSize={itemsPerPage}
					tableClass="table-bordered align-middle nowrap mt-2"
					totalPageCount={referredUsers?.count}
					isManualPagination
					onChangePagination={setCurrentPage}
					currentPage={currentPage}
					changeRowsPerPageCallback={onChangeRowsPerPage}
				/>
			</Card>
		</Container>
	);
};

export default ReferredUsers;
