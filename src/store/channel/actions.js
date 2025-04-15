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
	DELETE_CHANNEL,
	DELETE_CHANNEL_SUCCESS,
	DELETE_CHANNEL_FAILURE,
	BAN_PLAYER,
	BAN_PLAYER_SUCCESS,
	BAN_PLAYER_FAILURE,
	CLEAR_GROUP_CHAT_MESSAGES,
} from './actionTypes';

export const getChannelsSuccess = (payload) => ({
	type: GET_CHANNELS_SUCCESS,
	payload,
});

export const getChannelsFailure = (payload) => ({
	type: GET_CHANNELS_FAIL,
	payload,
});

export const getChannels = (payload) => ({
	type: GET_CHANNELS,
	payload,
});

export const getChannelMessagesSuccess = (payload) => ({
	type: GET_CHANNEL_MESSAGES_SUCCESS,
	payload,
});
export const getChannelMessagesFailure = (payload) => ({
	type: GET_CHANNEL_MESSAGES_FAIL,
	payload,
});

export const getChannelMessages = (payload) => ({
	type: GET_CHANNEL_MESSAGES,
	payload,
});

export const createChannelSuccess = (payload) => ({
	type: CREATE_CHANNEL_SUCCESS,
	payload,
});

export const createChannelFailure = (payload) => ({
	type: CREATE_CHANNEL_FAIL,
	payload,
});

export const createChannel = (payload) => ({
	type: CREATE_CHANNEL,
	payload,
});

export const updateChannelDetails = (payload) => ({
	type: UPDATE_CHANNEL_DETAILS,
	payload,
});

export const updateChannelDetailsSuccess = (payload) => ({
	type: UPDATE_CHANNEL_DETAILS_SUCCESS,
	payload,
});

export const updateChannelDetailsFailure = (payload) => ({
	type: UPDATE_CHANNEL_DETAILS_FAILURE,
	payload,
});

export const getChannelGroup = (data, isAppend) => ({
	type: GET_CHANNEL_GROUP_REQUEST,
	payload: data,
	isAppend,
});

export const getChannelGroupSuccess = (data) => ({
	type: GET_CHANNEL_GROUP_SUCCESS,
	payload: data,
});

export const getChannelGroupFailure = (error) => ({
	type: GET_CHANNEL_GROUP_FAILURE,
	payload: error,
});

export const getGroupChats = (data, isAppend) => ({
	type: GET_GROUP_CHATS_REQUEST,
	payload: data,
	isAppend,
});

export const getGroupChatsSuccess = (data) => ({
	type: GET_GROUP_CHATS_SUCCESS,
	payload: data,
});

export const getGroupChatsFailure = (error) => ({
	type: GET_GROUP_CHATS_FAILURE,
	payload: error,
});

export const clearGroupChatMessages = () => ({
	type: CLEAR_GROUP_CHAT_MESSAGES,
});

// delete channel
export const deleteChannel = (data) => ({
	type: DELETE_CHANNEL,
	payload: data,
});

export const deleteChannelSuccess = (data) => ({
	type: DELETE_CHANNEL_SUCCESS,
	payload: data,
});

export const deleteChannelFailure = (error) => ({
	type: DELETE_CHANNEL_FAILURE,
	payload: error,
});

// ban player
export const banPlayer = (data, onSuccess) => ({
	type: BAN_PLAYER,
	payload: data,
	onSuccess,
});

export const banPlayerSuccess = (data) => ({
	type: BAN_PLAYER_SUCCESS,
	payload: data,
});

export const banPlayerFailure = (error) => ({
	type: BAN_PLAYER_FAILURE,
	payload: error,
});
