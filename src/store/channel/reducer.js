import {
	GET_CHANNELS_SUCCESS,
	GET_CHANNELS_FAIL,
	GET_CHANNELS,
	GET_CHANNEL_MESSAGES_SUCCESS,
	GET_CHANNEL_MESSAGES_FAIL,
	GET_CHANNEL_MESSAGES,
	CREATE_CHANNEL_SUCCESS,
	CREATE_CHANNEL_FAIL,
	CREATE_CHANNEL,
	UPDATE_CHANNEL_DETAILS,
	UPDATE_CHANNEL_DETAILS_SUCCESS,
	UPDATE_CHANNEL_DETAILS_FAILURE,
	GET_CHANNEL_GROUP_REQUEST,
	GET_CHANNEL_GROUP_SUCCESS,
	GET_CHANNEL_GROUP_FAILURE,
	GET_GROUP_CHATS_REQUEST,
	GET_GROUP_CHATS_SUCCESS,
	GET_GROUP_CHATS_FAILURE,
	DELETE_CHANNEL_SUCCESS,
	DELETE_CHANNEL_FAILURE,
	DELETE_CHANNEL,
	BAN_PLAYER_SUCCESS,
	BAN_PLAYER_FAILURE,
	BAN_PLAYER,
	CLEAR_GROUP_CHAT_MESSAGES,
} from './actionTypes';

const INIT_STATE = {
	channels: null,
	error: null,
	isLoading: false,
	isChannelDetailsLoading: false,
	isChannelUpdateLoading: false,
	channelMessages: null,
	totalChannelsPages: null,
	updateChannelLoading: false,
	isLoadingChannelUserDetail: false,
	channelUserDetail: {
		users: [],
	},
	channelUserDetailError: null,
	isLoadingGroupChatMessages: false,
	groupChatMessages: {
		records: [],
	},
	deleteChannelSuccess: false,
	deleteChannelError: null,
	deleteChannelLoading: false,
	banPlayerSuccess: false,
	banPlayerError: null,
	banPlayerLoading: false,
};

const Channel = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_CHANNELS:
			return {
				...state,
				isLoading: true,
			};

		case GET_CHANNELS_SUCCESS:
			return {
				...state,
				isLoading: false,
				channels: payload?.groups,
				totalChannelsPages: payload?.totalPages,
				error: null,
			};

		case GET_CHANNELS_FAIL:
			return {
				...state,
				error: payload,
				isLoading: false,
			};

		case GET_CHANNEL_MESSAGES:
			return {
				...state,
				isChannelDetailsLoading: true,
			};

		case GET_CHANNEL_MESSAGES_SUCCESS:
			return {
				...state,
				channelMessages: payload,
				error: null,
				isChannelDetailsLoading: false,
			};

		case GET_CHANNEL_MESSAGES_FAIL:
			return {
				...state,
				error: payload,
				isChannelDetailsLoading: false,
			};

		case CREATE_CHANNEL:
			return {
				...state,
				isChannelUpdateLoading: true,
			};

		case CREATE_CHANNEL_SUCCESS:
			return {
				...state,
				isChannelUpdateLoading: false,
			};

		case CREATE_CHANNEL_FAIL:
			return {
				...state,
				error: payload,
				isChannelUpdateLoading: false,
			};

		case UPDATE_CHANNEL_DETAILS:
			return {
				...state,
				updateChannelLoading: true,
			};

		case UPDATE_CHANNEL_DETAILS_SUCCESS:
			return {
				...state,
				updateChannelLoading: false,
			};

		case UPDATE_CHANNEL_DETAILS_FAILURE:
			return {
				...state,
				updateChannelLoading: false,
			};

		case GET_CHANNEL_GROUP_REQUEST:
			return {
				...state,
				isLoadingChannelUserDetail: true,
				channelUserDetail: null,
				channelUserDetailError: null,
			};

		case GET_CHANNEL_GROUP_SUCCESS: {
			const { data, isAppend } = payload;
			const { users, ...rest } = data;
			const existingUsers = state.channelUserDetail?.users || [];

			return {
				...state,
				isLoadingChannelUserDetail: false,
				channelUserDetail: {
					...state.channelUserDetail,
					users: isAppend ? [...existingUsers, ...users] : users,
					...rest,
				},
			};
		}
		case GET_CHANNEL_GROUP_FAILURE:
			return {
				...state,
				isLoadingChannelUserDetail: false,
				channelUserDetail: null,
				channelUserDetailError: payload,
			};

		case GET_GROUP_CHATS_REQUEST:
			return {
				...state,
				isLoadingGroupChatMessages: true,
			};

		case GET_GROUP_CHATS_SUCCESS: {
			const { data, isAppend } = payload;
			const { records, ...rest } = data;

			return {
				...state,
				isLoadingGroupChatMessages: false,
				groupChatMessages: {
					records: isAppend
						? [...state.groupChatMessages.records, ...records]
						: records,
					...rest,
				},
			};
		}
		case GET_GROUP_CHATS_FAILURE:
			return {
				...state,
				isLoadingGroupChatMessages: false,
			};
		case CLEAR_GROUP_CHAT_MESSAGES:
			return {
				...state,
				groupChatMessages: {
					records: [],
				},
			};

		case DELETE_CHANNEL_SUCCESS:
			return {
				...state,
				deleteChannelSuccess: payload,
				deleteChannelError: null,
				deleteChannelLoading: false,
			};

		case DELETE_CHANNEL_FAILURE:
			return {
				...state,
				deleteChannelSuccess: false,
				deleteChannelError: payload,
				deleteChannelLoading: false,
			};

		case DELETE_CHANNEL:
			return {
				...state,
				deleteChannelLoading: true,
				deleteChannelSuccess: false,
				deleteChannelError: null,
			};

		case BAN_PLAYER_SUCCESS:
			return {
				...state,
				banPlayerSuccess: payload,
				banPlayerError: null,
				banPlayerLoading: false,
			};

		case BAN_PLAYER_FAILURE:
			return {
				...state,
				banPlayerSuccess: false,
				banPlayerError: payload,
				banPlayerLoading: false,
			};

		case BAN_PLAYER:
			return {
				...state,
				banPlayerLoading: true,
				banPlayerSuccess: false,
				banPlayerError: null,
			};

		default:
			return { ...state };
	}
};

export default Channel;
