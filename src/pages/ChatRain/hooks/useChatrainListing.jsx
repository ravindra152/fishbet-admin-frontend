/* eslint-disable react/prop-types */
import React, { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	deleteChatrain,
	fetchCurrenciesStart,
	getChatrain,
} from '../../../store/actions';
import { Title, Status, Currencies } from '../ChatrainListCol';
import { ICON_CLASS, TEXT_COLORS } from '../../../utils/constant';
import Actions from '../../../components/Common/Actions';
import { useConfirmModal } from '../../../components/Common/ConfirmModal';

const useChatrainListing = (filterValues = {}) => {
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const { openConfirmModal } = useConfirmModal();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { chatRain, isLoading } = useSelector((state) => state.Chatrain);
	const { currencies } = useSelector((state) => state.Currencies);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
		setPage(1);
	};

	const formattedChatrain = useMemo(() => chatRain?.chatRains, [chatRain]);

	useEffect(() => {
		dispatch(fetchCurrenciesStart({}));
	}, []);

	const fetchData = () => {
		const { ...rest } = filterValues;
		dispatch(
			getChatrain({
				perPage: itemsPerPage,
				page,
				...rest,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [page, itemsPerPage]);

	const handleView = (props) => {
		navigate(`/chat/chat-rain/${props?.chatGroupId}`, {
			state: { chatRainDetails: props },
		});
	};

	const handleEdit = (props) =>
		navigate(`/chat/chat-rain/edit/${props?.chatGroupId}`, {
			state: { chatRainDetails: props },
		});

	const onClickConfirmDelete = (props) =>
		dispatch(
			deleteChatrain({
				data: {
					chatRainId: props,
				},
				onSuccess: fetchData,
			})
		);

	const handleDeleteClick = (row) => {
		openConfirmModal('Do you really want to delete the Chat Rain?', () =>
			onClickConfirmDelete(row?.id)
		);
	};

	const actionsList = (cell) => [
		{
			actionName: 'View',
			actionHandler: handleView,
			icon: ICON_CLASS.view,
			iconColor: TEXT_COLORS.info,
		},
		{
			actionName: 'Edit',
			actionHandler: handleEdit,
			isDisabled: () => cell?.row?.original?.isClosed,
			icon: ICON_CLASS.edit,
			iconColor: TEXT_COLORS.primary,
		},
		// {
		// 	actionName: 'Delete',
		// 	actionHandler: handleDeleteClick,
		// 	isDisabled: () => cell?.row?.original?.isClosed,
		// 	icon: ICON_CLASS.delete,
		// 	iconColor: TEXT_COLORS.danger,
		// },
	];

	const columns = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <Title value={cell.value} />,
			},
			{
				Header: 'Closed',
				accessor: 'isClosed',
				filterable: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Amount',
				accessor: 'prizeMoney',
				filterable: true,
				Cell: ({ cell }) => <Title value={cell.value} />,
			},
			{
				Header: 'Currency',
				accessor: 'currencyId',
				filterable: true,
				Cell: ({ cell }) => (
					<Currencies value={cell.value} currencyList={currencies} />
				),
			},
			{
				Header: 'ACTION',
				accessor: 'action',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => (
					<Actions cell={cell} actionsList={actionsList(cell)} />
				),
			},
		],
		[currencies, formattedChatrain]
	);

	return {
		formattedChatrain,
		chatRain,
		isLoading,
		page,
		setPage,
		totalCount: chatRain?.totalPages,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	};
};

export default useChatrainListing;
