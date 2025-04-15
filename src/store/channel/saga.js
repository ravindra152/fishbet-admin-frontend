/* eslint-disable no-param-reassign */
import { put, takeLatest, all, fork } from 'redux-saga/effects';
import {
	getChannelsSuccess,
	getChannelsFailure,
	getChannelMessagesSuccess,
	getChannelMessagesFailure,
	updateChannelDetailsSuccess,
	updateChannelDetailsFailure,
	getChannelGroupSuccess,
	getChannelGroupFailure,
	getGroupChatsSuccess,
	getGroupChatsFailure,
	deleteChannelSuccess,
	deleteChannelFailure,
	banPlayerSuccess,
	banPlayerFailure,
} from './actions';
import {
	GET_CHANNELS,
	GET_CHANNEL_MESSAGES,
	CREATE_CHANNEL,
	UPDATE_CHANNEL_DETAILS,
	GET_CHANNEL_GROUP_REQUEST,
	GET_GROUP_CHATS_REQUEST,
	DELETE_CHANNEL,
	BAN_PLAYER,
} from './actionTypes';

import {
	getAllChannels,
	getChannelMessages,
	getChannelGroupDetails,
	getChannelGroupChatsDetails,
} from '../../network/getRequests';
import { showToastr } from '../../utils/helpers';
import {
	createChannel,
	updateChannelDetailsRequest,
} from '../../network/postRequests';
import { createChannelFailure, createChannelSuccess } from '../actions';
import { deleteChannelData } from '../../network/deleteRequests';
import { playerBan } from '../../network/putRequests';

function* getChannelListingWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getAllChannels(payload);

		yield put(getChannelsSuccess(data?.data));
	} catch (error) {
		yield put(
			getChannelsFailure(error?.response?.data?.errors?.[0]?.description)
		);
	}
}

function* createChannelWorker(action) {
	try {
		const { data, navigate } = action && action.payload;

		const { response } = yield createChannel(data);

		yield put(
			createChannelSuccess({
				response,
			})
		);

		showToastr({
			message: `Status Updated Successfully`,
			type: 'success',
		});
		if (navigate) {
			navigate('/chat/channels');
		}
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});

		yield put(createChannelFailure());
	}
}

function* getChannelMessagesStartWorker(action) {
	try {
		const params = action && action.payload;
		const { data } = yield getChannelMessages(params);
		yield put(getChannelMessagesSuccess(data?.data?.records));
	} catch (error) {
		showToastr({
			message: error?.response?.data?.errors[0]?.description || error.message,
			type: 'error',
		});
		yield put(
			getChannelMessagesFailure(error?.response?.data?.errors[0]?.description)
		);
	}
}

function* updateChannelDetailsWorker(action) {
	try {
		const { data, navigate } = action && action.payload;
		const { data: response } = yield updateChannelDetailsRequest(data);
		yield put(updateChannelDetailsSuccess(response));
		showToastr({
			message: 'Channel details updated successfully',
			type: 'success',
		});

		if (navigate) {
			navigate('/chat/channels');
		}
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors?.[0]?.description || e.message,
			type: 'error',
		});
		yield put(
			updateChannelDetailsFailure(e?.response?.data?.errors?.[0]?.description)
		);
	}
}

function* getChannelGroupWorker(action) {
	try {
		const payload = action && action.payload;
		const { isAppend } = action;
		const { data } = yield getChannelGroupDetails(payload);

		yield put(
			getChannelGroupSuccess({
				data: data?.data,
				isAppend,
			})
		);
	} catch (error) {
		yield put(
			getChannelGroupFailure(error?.response?.data?.errors?.[0]?.description)
		);
	}
}

function* getGroupChatsWorker(action) {
	try {
		const payload = action && action.payload;
		const { isAppend } = action;
		const { data } = yield getChannelGroupChatsDetails(payload);
		yield put(
			getGroupChatsSuccess({
				data: data?.data,
				isAppend,
			})
		);
	} catch (error) {
		getGroupChatsFailure(error?.response?.data?.errors?.[0]?.description);
	}
}

function* deleteChannelDetailsWorker(action) {
	try {
		const { data, onSuccess } = action && action.payload;
		yield deleteChannelData(data);
		yield put(deleteChannelSuccess(true));

		onSuccess();
		showToastr({
			message: 'Channel deleted successfully',
			type: 'success',
		});
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors?.[0]?.description || e.message,
			type: 'error',
		});
		yield put(
			deleteChannelFailure(e?.response?.data?.errors?.[0]?.description)
		);
	}
}

function* banPlayerWorker(action) {
	try {
		const payload = action && action.payload;
		yield playerBan(payload);
		yield put(banPlayerSuccess(true));
		if (action?.onSuccess) {
			action?.onSuccess(payload?.userId);
		}
		showToastr({
			message: 'Player Ban successfully',
			type: 'success',
		});
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors?.[0]?.description || e.message,
			type: 'error',
		});
		yield put(banPlayerFailure(e?.response?.data?.errors?.[0]?.description));
	}
}

export function* watchBonusData() {
	yield takeLatest(GET_CHANNEL_MESSAGES, getChannelMessagesStartWorker);
	yield takeLatest(GET_CHANNELS, getChannelListingWorker);
	yield takeLatest(CREATE_CHANNEL, createChannelWorker);
	yield takeLatest(UPDATE_CHANNEL_DETAILS, updateChannelDetailsWorker);
	yield takeLatest(GET_CHANNEL_GROUP_REQUEST, getChannelGroupWorker);
	yield takeLatest(GET_GROUP_CHATS_REQUEST, getGroupChatsWorker);
	yield takeLatest(DELETE_CHANNEL, deleteChannelDetailsWorker);
	yield takeLatest(BAN_PLAYER, banPlayerWorker);
}

function* ChannelSaga() {
	yield all([fork(watchBonusData)]);
}

export default ChannelSaga;
