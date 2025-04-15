/* eslint-disable no-param-reassign */
/* eslint-disable default-case */
import { put, takeLatest, all, fork } from 'redux-saga/effects';

import {
	getTicketManagementDetailsFailure,
	getTicketManagementDetailsSuccess,
	getTicketMessagesFailure,
	getTicketMessagesSuccess,
	postTicketMessagesFailure,
	postTicketMessagesSuccess,
	updateTicketStatusFailure,
	updateTicketStatusSuccess,
} from './actions';

import {
	GET_TICKET_MANAGEMENT_DATA_START,
	GET_TICKET_MESSAGES_START,
	POST_TICKET_MESSAGES_START,
	UPDATE_TICKET_STATUS_START,
} from './actionTypes';

import {
	getTicketManagementListing,
	getTicketMessages,
} from '../../network/getRequests';

import { showToastr } from '../../utils/helpers';
import { updateTicketStatus } from '../../network/putRequests';
import { sendTicketReply } from '../../network/postRequests';

function* getTicketManagementWorker(action) {
	const payload = action && action.payload;
	try {
		const { data } = yield getTicketManagementListing(payload);
		yield put(getTicketManagementDetailsSuccess(data?.data?.tickets));
	} catch (error) {
		showToastr({ message: 'Something Went wrong', type: 'error' });
		yield put(
			getTicketManagementDetailsFailure(
				error?.response?.data?.errors[0]?.description
			)
		);
	}
}

function* getTicketMessagesWorker(action) {
	const payload = action && action.payload;
	try {
		const { data } = yield getTicketMessages(payload);
		yield put(getTicketMessagesSuccess(data?.data?.mainTicket?.ticketMessage));
	} catch (error) {
		showToastr({ message: 'Something Went wrong', type: 'error' });
		yield put(
			getTicketMessagesFailure(error?.response?.data?.errors[0]?.description)
		);
	}
}

function* updateTicketStatusWorker(action) {
	try {
		const payload = action && action.payload;

		yield updateTicketStatus(payload);

		showToastr({
			message: `Status Updated Successfully`,
			type: 'success',
		});
		yield put(updateTicketStatusSuccess());
	} catch (e) {
		yield put(updateTicketStatusFailure());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* postTicketMessageWorker(action) {
	try {
		const { payload } = action;

		yield sendTicketReply(payload);

		showToastr({
			message: `Message Sent Successfully`,
			type: 'success',
		});

		yield put(postTicketMessagesSuccess());
	} catch (e) {
		yield put(postTicketMessagesFailure());

		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

export function* ticketManagementWatcher() {
	yield takeLatest(GET_TICKET_MANAGEMENT_DATA_START, getTicketManagementWorker);
	yield takeLatest(GET_TICKET_MESSAGES_START, getTicketMessagesWorker);
	yield takeLatest(UPDATE_TICKET_STATUS_START, updateTicketStatusWorker);
	yield takeLatest(POST_TICKET_MESSAGES_START, postTicketMessageWorker);
}

function* TicketManagementSaga() {
	yield all([fork(ticketManagementWatcher)]);
}

export default TicketManagementSaga;
