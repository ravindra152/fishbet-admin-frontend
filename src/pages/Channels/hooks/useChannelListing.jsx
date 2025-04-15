/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	clearGroupChatMessages,
	deleteChannel,
	getChannels,
} from '../../../store/actions';
import { Title, Status, GLobal } from '../ChannelListCol';
import ButtonList from '../../../components/Common/ButtonList';
import Actions from '../../../components/Common/Actions';
import { ICON_CLASS, TEXT_COLORS } from '../../../utils/constant';
import { useConfirmModal } from '../../../components/Common/ConfirmModal';
// import usePermission from '../../../components/Common/Hooks/usePermission';
// import { modules } from '../../../constants/permissions';

const useChannelListing = (filterValues = {}) => {
	const navigate = useNavigate();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();
	const { openConfirmModal = () => { } } = useConfirmModal();
	// const { isGranted } = usePermission();

	const { channels, totalChannelsPages, isLoading } = useSelector(
		(state) => state.Channel
	);

	function onChangeRowsPerPage(value) {
		setItemsPerPage(value);
		setPage(1);
	}

	const formattedchannelDetails = useMemo(() => channels, [channels]);

	const fetchData = () => {
		const { ...rest } = filterValues;
		dispatch(
			getChannels({
				limit: itemsPerPage,
				pageNo: page,
				...rest,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [page, itemsPerPage]);

	useEffect(() => {
		dispatch(clearGroupChatMessages());
	}, []);

	const handleEditClick = (row) => {
		navigate(`/chat/channel/edit/${row?.id}`, {
			state: {
				channelData: row,
			},
		});
	};

	const handleView = (row) => {
		navigate(`/chat/channel-report/${row?.id}`, {});
	};

	const onClickConfirmDelete = (props) =>
		dispatch(
			deleteChannel({
				data: {
					chatGroupId: props,
				},
				onSuccess: fetchData,
			})
		);

	const handleDeleteClick = (row) => {
		openConfirmModal('Do you really want to delete the Channel?', () =>
			onClickConfirmDelete(row?.id)
		);
	};

	const actionsList = [
		{
			actionName: 'View',
			actionHandler: handleView,
			// isHidden: !isGranted(modules.channel., 'U'),
			icon: ICON_CLASS.view,
			iconColor: TEXT_COLORS.info,
		},
		// {
		// 	actionName: 'Edit',
		// 	actionHandler: handleEditClick,
		// 	// isHidden: !isGranted(modules.channel., 'U'),
		// 	icon: ICON_CLASS.edit,
		// 	iconColor: TEXT_COLORS.primary,
		// },
		// {
		// 	actionName: 'Delete',
		// 	actionHandler: handleDeleteClick,
		// 	// isHidden: !isGranted(modules.admin, 'TS'),
		// 	icon: ICON_CLASS.delete,
		// 	iconColor: TEXT_COLORS.danger,
		// },
	];

	const columns = useMemo(
		() => [
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <Title value={cell.value} />,
			},
			{
				Header: 'GLOBAL CHANNEL',
				accessor: 'isGlobal',
				filterable: true,
				Cell: ({ cell }) => <GLobal value={cell.value} />,
			},
			{
				Header: 'STATUS',
				accessor: 'status',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			// {
			// 	Header: 'DESCRIPTION',
			// 	accessor: 'description',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <Description value={cell.value} />,
			// },
			{
				Header: 'Actions',
				accessor: 'actions',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => <Actions cell={cell} actionsList={actionsList} />,
			},
		],
		[]
	);

	const handleAddClick = (e) => {
		e.preventDefault();
		navigate('/chat/channel/create');
	};

	const buttonList = useMemo(() => [
		{
			label: (
				<>
					{' '}
					<i className="mdi mdi-plus" /> Create
				</>
			),
			handleClick: handleAddClick,
			link: '#!',
			operation: 'C',
		},
	]);

	const actionList = <ButtonList buttonList={buttonList} />;

	return {
		formattedchannelDetails,
		channels,
		isLoading,
		page,
		setPage,
		totalCount: totalChannelsPages,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		actionList,
	};
};

export default useChannelListing;
