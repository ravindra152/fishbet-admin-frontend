/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getUserBonusesDetails } from '../../../network/getRequests';
import TableContainer from '../../../components/Common/TableContainer';
import { formatDateYMD } from '../../../helpers/dateFormatter';

const BonusUsers = ({ bonusDetail }) => {
	const bonusUserColumn = useMemo(
		() => [
			{
				Header: 'User ID',
				accessor: 'userId',
				filterable: true,
				Cell: ({ cell }) => cell.value || '-',
			},
			{
				Header: 'Username',
				accessor: 'user',
				filterable: true,
				// eslint-disable-next-line react/no-unstable-nested-components
				Cell: ({ cell }) => (
					// eslint-disable-next-line react/jsx-no-useless-fragment
					<>
						{cell?.value?.username ? (
							<Link
								to={`/player-details/${cell?.value?.userId}`}
								state={{ prevUrl: `/bonus/${cell?.row?.original?.bonusId}` }}
							>
								{cell.value?.username}
							</Link>
						) : (
							'-'
						)}
					</>
				),
			},

			{
				Header: 'Bonus Status',
				accessor: 'bonusStatus',
				filterable: true,
				Cell: ({ cell }) => cell?.value || '',
			},
			{
				Header: 'Bonus Amount',
				accessor: 'bonusAmount',
				filterable: true,
				Cell: ({ cell }) => cell?.value || '0',
			},
			{
				Header: 'Deposit Amount',
				accessor: 'depositAmount',
				filterable: true,
				Cell: ({ cell }) => cell?.value || '0',
			},
			// {
			// 	Header: 'Wager Requirement',
			// 	accessor: 'wagerRequirement',
			// 	disableFilters: true,
			// 	Cell: ({ cell }) => cell?.value || '0',
			// },
			// {
			// 	Header: 'Remaining Wager Requirement',
			// 	accessor: 'remainingWagerRequirement',
			// 	filterable: true,
			// 	Cell: ({ cell }) => cell?.value || '',
			// },
			// {
			// 	Header: 'Wagered Amount',
			// 	accessor: 'wageredAmount',
			// 	disableFilters: true,
			// 	Cell: ({ cell }) => cell?.value || '',
			// },

			// {
			// 	Header: 'Awarded At',
			// 	accessor: 'awardedAt',
			// 	disableFilters: true,
			// 	Cell: ({ cell }) => (cell?.value ? formatDateYMD(cell.value) : '-'),
			// },
			{
				Header: 'Updated At',
				accessor: 'updatedAt',
				disableFilters: true,
				Cell: ({ cell }) => (cell?.value ? formatDateYMD(cell.value) : '-'),
			},
		],
		[]
	);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [userBonus, setUserBonus] = useState(null);
	const [loader, setLoader] = useState(false);
	const [page, setPage] = useState(1);
	const fetchUserBonus = async () => {
		try {
			setLoader(true);
			const { data } = await getUserBonusesDetails({
				limit: itemsPerPage,
				pageNo: 1,
				bonusType: bonusDetail?.bonusType,
				bonusId: bonusDetail?.id,
			});
			setUserBonus(data?.data?.userBonus);
			console.log("data", data)
			setLoader(false);
		} catch (error) {
			setLoader(false);
		}
	};
	console.log(userBonus)
	useEffect(() => {
		fetchUserBonus();
	}, [page]);

	return (
		<div>
			<TableContainer
				isLoading={loader}
				columns={bonusUserColumn || []}
				data={userBonus?.rows || []}
				isPagination
				customPageSize={itemsPerPage}
				tableClass="table-bordered align-middle nowrap mt-2"
				// paginationDiv="col-sm-12 col-md-7"
				paginationDiv="justify-content-center"
				pagination="pagination justify-content-start pagination-rounded"
				totalPageCount={userBonus?.count}
				isManualPagination
				onChangePagination={setPage}
				currentPage={page}
				changeRowsPerPageCallback={setItemsPerPage}
			/>
		</div>
	);
};

export default BonusUsers;
