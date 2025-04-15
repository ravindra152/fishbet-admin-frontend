/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, Container } from 'reactstrap';
// import { useDispatch } from 'react-redux';
import TableContainer from '../../components/Common/TableContainer';
import { Id, KeyValueCell, PromotionTitle } from './TableCol';
// import { cancelUserBonus } from '../../store/actions';
import { formatDate } from '../../utils/dateFormatter';
import useBonusFilter from './hooks/useBonusFilter';
import Filters from '../../components/Common/Filters';
// import BonusActionButtons from './BonusActionButtons';
import BonusDetails from './modals/BonusDetails';

const YourBonuses = ({ userId }) => {
	// const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [bonusDetailsModal, setBonusDetailsModal] = useState({
		open: false,
		data: '',
	});

	// const onViewClick = ({ bonusDetails }) => {
	// 	setBonusDetailsModal({ open: true, data: bonusDetails });
	// };

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
		userBonus,
		fetchData,
		userBonusLoading,
	} = useBonusFilter();

	const formattedUserBonus = useMemo(() => {
		const formattedValues = [];
		if (userBonus) {
			userBonus?.rows?.map((bonus) =>
				formattedValues.push({
					...bonus,
					cancelledBy: bonus?.cancelledBy || '-',
					updatedAt: bonus?.updatedAt ? formatDate(bonus?.updatedAt) : '-',
					wageredAmount:
						bonus?.wageredAmount || (bonus?.amountToWager ? '0' : '-'),
					amountToWager: bonus?.amountToWager || '-',
					issuedAt: formatDate(bonus?.createdAt),
					issuedBy: bonus?.issuedBy
						? bonus?.issuedBy === 'user'
							? 'SYSTEM'
							: bonus?.issuedBy?.toUpperCase()
						: '-',
					isExpired:
						formatDate(new Date(String(bonus?.expireAt))) <
						formatDate(new Date())
							? 'Yes'
							: 'No',
					expiredAt: formatDate(bonus?.expireAt),
					promotionTitle: bonus?.bonus?.promotionTitle,
					//   bonus?.other?.bonusTitle || bonus?.bonus?.promotionTitle?.EN,
				})
			);
		}
		return formattedValues;
	}, [userBonus]);

	useEffect(() => {
		// dispatch(
		//   getBonusDetails({
		//     limit: itemsPerPage,
		//     pageNo: currentPage,
		//     userId,
		//   })
		// );
		fetchData({}, currentPage);
	}, [currentPage, itemsPerPage]);

	// const onCancelClick = ({ userBonusId }) => {
	// 	dispatch(
	// 		cancelUserBonus({
	// 			userBonusId,
	// 			userId,
	// 		})
	// 	);
	// };

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'userId',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'PROMOTION TITLE',
				accessor: 'promotionTitle',
				filterable: true,
				Cell: ({ cell }) => <PromotionTitle value={cell.value} />,
			},
			{
				Header: 'BONUS TYPE',
				accessor: 'bonusType',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			// {
			//   Header: 'VALID TILL',
			//   accessor: 'expiredAt',
			//   filterable: true,
			//   Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			// },
			{
				Header: 'IS EXPIRED',
				accessor: 'isExpired',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'STATUS',
				accessor: 'status',
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			// {
			// 	Header: 'ISSUED BY',
			// 	accessor: 'issuedBy',
			// 	Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			// },
			// {
			// 	Header: 'ISSUED AT',
			// 	accessor: 'issuedAt',
			// 	Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			// },
			{
				Header: 'BONUS AMOUNT',
				accessor: 'bonusAmount',
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			// {
			//   Header: 'WAGERED AMOUNT',
			//   accessor: 'wageredAmount',
			//   Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			// },
			{
				Header: 'CANCELLED BY',
				accessor: 'cancelledBy',
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'UPDATED AT',
				accessor: 'updatedAt',
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			// {
			// 	Header: 'ACTION',
			// 	disableSortBy: true,
			// 	Cell: ({ cell }) => (
			// 		<BonusActionButtons
			// 			onViewClick={onViewClick}
			// 			onCancelClick={onCancelClick}
			// 			cell={cell}
			// 		/>
			// 	),
			// },
		],
		[]
	);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

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
						isLoading={userBonusLoading}
						columns={columns}
						data={formattedUserBonus}
						isPagination
						customPageSize={itemsPerPage}
						tableClass="table-bordered align-middle nowrap mt-2"
						// paginationDiv="col-sm-12 col-md-7"
						paginationDiv="justify-content-center"
						pagination="pagination justify-content-start pagination-rounded"
						totalPageCount={userBonus?.count}
						isManualPagination
						onChangePagination={setCurrentPage}
						currentPage={currentPage}
						changeRowsPerPageCallback={onChangeRowsPerPage}
					/>
				</CardBody>
				<BonusDetails
					show={bonusDetailsModal.open}
					toggle={() => setBonusDetailsModal({ open: false, data: '' })}
					bonusId={bonusDetailsModal.data?.id}
					bonusTitle={bonusDetailsModal.data?.promotionTitle}
					userBonusId={bonusDetailsModal.data?.userBonusId}
					bonusDetails={bonusDetailsModal.data}
				/>
			</Card>
		</Container>
	);
};

export default YourBonuses;
