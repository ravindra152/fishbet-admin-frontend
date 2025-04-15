/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrenciesStart, getGroupChats } from '../../../store/actions';

const useChannelGroupsChatListing = (channelId) => {
	const [searchString, setSearchString] = useState('');
	const [debouncedSearchString, setDebouncedSearchString] =
		useState(searchString);
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const { channels, groupChatMessages, isLoadingGroupChatMessages } =
		useSelector((state) => state.Channel);
	const { defaultCurrency, currencyById } = useSelector(
		(state) => state.Currencies
	);
	const ref = useRef(false);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearchString(searchString);
		}, 700);

		return () => {
			clearTimeout(handler);
		};
	}, [searchString]);

	const formattedGroupChatMessages = useMemo(() => {
		const formattedValues = [];
		if (groupChatMessages?.records) {
			return groupChatMessages.records.map((data) => ({
				...data,
			}));
		}
		return formattedValues;
	}, [groupChatMessages]);

	const hasMore = page < groupChatMessages?.totalPages;

	const fetchData = (isAppend) => {
		dispatch(
			getGroupChats(
				{
					limit: 10,
					page,
					chatGroupId: channelId,
					searchMessage: debouncedSearchString,
				},
				isAppend
			)
		);
	};

	const fetchMoreData = () => {
		setPage((prev) => prev + 1);
	};

	useEffect(() => {
		setPage(1);
		fetchData(false);
	}, [debouncedSearchString]);

	useEffect(() => {
		if (ref.current) {
			fetchData(true);
		}
		ref.current = true;
	}, [page]);

	useEffect(() => {
		dispatch(fetchCurrenciesStart({}));
	}, []);

	return {
		groupChatMessages,
		channels,
		isLoading: isLoadingGroupChatMessages,
		searchString,
		setSearchString,
		fetchMoreData,
		page,
		hasMore,
		formattedGroupChatMessages,
		defaultCurrency,
		currencyById,
	};
};

export default useChannelGroupsChatListing;
