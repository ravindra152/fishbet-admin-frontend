/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	deletePromotionStart,
	fetchPromotionsStart,
	selectPromotionByPage,
} from '../../../store/promotions/actions';
import {
	PromotionId,
	Title,
	// Slug,
	Status,
	PromotionType,
} from '../PromotionListCol';
import ActionButtons from '../ActionButtons';

const usePromotionsListing = (filterValues = {}) => {
	const navigate = useNavigate();
	const { promotions, isPromotionsLoading } = useSelector(
		(state) => state.Promotions
	);
	const [limit, setLimit] = useState(15);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();

	const formattedPromotions = useMemo(() => {
		if (promotions) {
			return promotions?.rows.map((detail) => ({
				...detail,
				titlePreview: detail?.title?.EN,
			}));
		}
		return [];
	}, [promotions]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const fetchData = () => {
		dispatch(
			fetchPromotionsStart({
				limit: itemsPerPage,
				pageNo: page,
				...filterValues,
			})
		);
	};

	const handleStatus = (e, props) => {
		e.preventDefault();
		// eslint-disable-next-line no-unused-vars
		const { status, promotionId } = props;
		// dispatch(
		// 	updateSaCmsStatus({
		// 		code: 'CMS',
		// 		promotionId,
		// 		status: !status,
		// 	})
		// );
	};

	const handleDeleteClick = ({ promotionId }) => {
		dispatch(deletePromotionStart({ promotionId }));
	};

	const handleEditClick = ({ e, promotionId, promotionData }) => {
		e.preventDefault();
		navigate(`edit/${promotionId}`, { state: { promotionData } });
		dispatch(selectPromotionByPage(promotionData));
	};

	const handleViewClick = (e, promotionId) => {
		e.preventDefault();
		navigate(`details/${promotionId}`);
	};

	useEffect(() => {
		fetchData();
	}, [limit, page, itemsPerPage]);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <PromotionId value={cell.value} />,
			},
			{
				Header: 'TYPE',
				accessor: 'category',
				filterable: true,
				Cell: ({ cell }) => <PromotionType value={cell.value} />,
			},
			{
				Header: 'TITLE',
				accessor: 'titlePreview',
				filterable: true,
				Cell: ({ cell }) => <Title value={cell.value} />,
			},
			// {
			// 	Header: 'SLUG',
			// 	accessor: 'slug',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <Slug value={cell.value} />,
			// },
			{
				Header: 'STATUS',
				accessor: 'isActive',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'ACTION',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => (
					<ActionButtons
						row={cell.row}
						handleStatus={handleStatus}
						handleEditClick={handleEditClick}
						handleViewClick={handleViewClick}
						handleDeleteClick={handleDeleteClick}
					/>
				),
			},
		],
		[]
	);

	return {
		promotions,
		formattedPromotions,
		isPromotionsLoading,
		itemsPerPage,
		totalPromotionsCount: promotions?.count,
		setLimit,
		setPage,
		handleStatus,
		onChangeRowsPerPage,
		columns,
	};
};

export default usePromotionsListing;
