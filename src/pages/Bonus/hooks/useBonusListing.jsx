/* eslint-disable react/prop-types */
import React, { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	deleteBonusStart,
	getBonusDetails,
	getBonusStart,
	updateSABonusStatus,
} from '../../../store/actions';
// import { formatDate } from '../../../utils/dateFormatter';
import { safeStringify } from '../../../utils/helpers';
// import { types } from '../constants';
import {
	BonusId,
	Title,
	BonusType,
	Description,
	// ValidTill,
	// IsExpired,
	// IsClaimed,
	Status,
} from '../BonusListCol';
import ActionButtons from '../ActionButtons';

const useBonusListing = (filterValues = {}) => {
	const { bonusDetails, isLoading, gameBonusDetail, isDeleteBonusLoading } =
		useSelector((state) => state.AllBonusDetails);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [isDeleteConfirmationOpen, setDeleteConfirmation] = useState(false);
	const [deleteBonusId, setDeleteBonusId] = useState('');
	const [bonusName, setBonusName] = useState('');
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const formattedBonusDetails = useMemo(() => {
		if (bonusDetails) {
			return bonusDetails?.rows.map((bonus) => {
				const {
					// promotionTitle,
					promitionTitle,
					bonusType: type,
					// validTo,
					// claimedCount,
					// isSticky,
					// validFrom,
				} = bonus;

				const title = promitionTitle || 'NA';

				// const bonusType =
				//   type === 'freespins' && !isSticky
				//     ? 'CASH FREESPINS'
				//     : types.find((val) => val.value === type)?.label;

				// const validTill =
				//   type === 'depositCashback' ||
				//     type === 'wagering'
				//     ? '-'
				//     : formatDate(validTo);

				// const validFromDate =
				//   type === 'depositCashback' ||
				//     type === 'wagering'
				//     ? '-'
				//     : formatDate(validFrom);

				// let isExpired;
				// if (
				//   type === 'depositCashback' ||
				//   type === 'wagering'
				// ) {
				//   isExpired = 'No';
				// } else {
				//   isExpired =
				//     formatDate(validTo) < formatDate(new Date()) ? 'Yes' : 'No';
				// }
				// const isClaimed = claimedCount ? 'Yes' : 'No';

				return {
					...bonus,
					title,
					bonusType: type,
					// validTill,
					// validFromDate,
					// isExpired,
					// isClaimed,
				};
			});
		}
		return [];
	}, [bonusDetails]);

	const fetchData = () => {
		const { bonusType, ...rest } = filterValues;
		dispatch(
			getBonusDetails({
				limit: itemsPerPage,
				pageNo: page,
				bonusType: bonusType ? safeStringify([bonusType]) : null,
				...rest,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [page, itemsPerPage]);

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { active, bonusId } = props;
		dispatch(
			updateSABonusStatus({
				code: 'BONUS',
				bonusId: String(bonusId),
				status: active === 'active' ? 'inactive' : 'active',
			})
		);
		fetchData();
	};

	const handleClose = () => {
		setDeleteConfirmation(false);
		setDeleteBonusId('');
		setBonusName('');
		fetchData();
	};

	const handleDelete = (props) => {
		const { bonusId, title } = props;
		setDeleteConfirmation(true);
		setDeleteBonusId(bonusId);
		setBonusName(title);
		dispatch(getBonusStart({ bonusId }));
	};

	const bonusDeleteHandler = () => {
		dispatch(
			deleteBonusStart({
				data: {
					bonusId: deleteBonusId,
					balanceBonus: gameBonusDetail?.balanceBonus,
				},
				handleClose,
			})
		);
	};

	const handleView = (props) => {
		const { id } = props;
		navigate(`/bonus/${id}`);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <BonusId value={cell.value} />,
			},
			{
				Header: 'TITLE',
				accessor: 'promotionTitle',
				filterable: true,
				Cell: ({ cell }) => <Title value={cell.value} />,
			},
			{
				Header: 'BONUS TYPE',
				accessor: 'bonusType',
				filterable: true,
				Cell: ({ cell }) => <BonusType value={cell.value} />,
			},
			{
				Header: 'Description',
				accessor: 'description',
				filterable: true,
				Cell: ({ cell }) => <Description value={cell.value} />,
			  },
			{
			  Header: 'GC Amount',
			  accessor: 'gcAmount',
			  filterable: true,
			  Cell: ({ cell }) => <Description value={cell.value} />,
			},
			{
				Header: 'SC Amount',
				accessor: 'scAmount',
				filterable: true,
				Cell: ({ cell }) => <Description value={cell.value} />,
			  },
			
			// {
			//   Header: 'VALID TILL',
			//   accessor: 'validTill',
			//   filterable: true,
			//   Cell: ({ cell }) => <ValidTill value={cell.value} />,
			// },
			// {
			//   Header: 'IS EXPIRED',
			//   accessor: 'isExpired',
			//   filterable: true,
			//   Cell: ({ cell }) => <IsExpired value={cell.value} />,
			// },
			// {
			//   Header: 'IS CLAIMED',
			//   accessor: 'isClaimed',
			//   filterable: true,
			//   Cell: ({ cell }) => <IsClaimed value={cell.value} />,
			// },
			{
				Header: 'STATUS',
				accessor: 'status',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'ACTION',
				accessor: 'action',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => (
					<ActionButtons
						row={cell.row}
						handleStatus={handleStatus}
						handleView={handleView}
						handleDelete={handleDelete}
					/>
				),
			},
		],
		[]
	);

	return {
		bonusDetails,
		formattedBonusDetails,
		isLoading,
		totalBonusCount: bonusDetails?.count,
		itemsPerPage,
		page,
		setPage,
		onChangeRowsPerPage,
		columns,
		isDeleteConfirmationOpen,
		setDeleteConfirmation,
		bonusDeleteHandler,
		bonusName,
		isDeleteBonusLoading,
	};
};

export default useBonusListing;
