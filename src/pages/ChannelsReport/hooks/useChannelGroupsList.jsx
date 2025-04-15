/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { banPlayer, getChannelGroup } from '../../../store/actions';

const useChannelGroupsList = (channelId) => {
	// const [itemsPerPage, setItemsPerPage] = useState(10);
	const [searchString, setSearchString] = useState('');
	const [debouncedSearch, setDebouncedSearch] = useState(searchString);
	const [loadingUsers, setLoadingUsers] = useState({});
	const [userTab, setUserTab] = useState('all');

	const [page, setPage] = useState(1);
	const dispatch = useDispatch();

	const { channelUserDetail, isLoadingChannelUserDetail } = useSelector(
		(state) => state.Channel
	);

	const ref = useRef(false);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(searchString);
		}, 700);
		return () => {
			clearTimeout(handler);
		};
	}, [searchString]);

	const fetchData = (isAppend) => {
		dispatch(
			getChannelGroup(
				{
					limit: 10,
					pageNo: page,
					chatGroupId: channelId,
					search: debouncedSearch,
					banFilter: userTab,
				},
				isAppend
			)
		);
	};

	useEffect(() => {
		setPage(1);
		fetchData(false);
	}, [debouncedSearch, userTab]);

	useEffect(() => {
		if (ref.current) {
			fetchData(true);
		}
		ref.current = true;
	}, [page]);

	const onSuccess = (id) => {
		setLoadingUsers((prev) => ({ ...prev, [id]: false }));
		fetchData();
	};

	const handleBanPlayer = (id, isBanned) => {
		setLoadingUsers((prev) => ({ ...prev, [id]: true }));
		dispatch(
			banPlayer(
				{
					chatGroupId: channelId,
					userId: id,
					ban: !isBanned,
				},
				onSuccess
			)
		);
	};

	const fetchMoreData = () => {
		setPage((prev) => prev + 1);
	};
	const hasMore = page < channelUserDetail?.totalPages;

	return {
		channelUserDetail,
		isLoadingChannelUserDetail,
		handleBanPlayer,
		loadingUsers,
		setSearchString,
		searchString,
		userTab,
		setUserTab,
		fetchMoreData,
		hasMore,
	};
};

export default useChannelGroupsList;
