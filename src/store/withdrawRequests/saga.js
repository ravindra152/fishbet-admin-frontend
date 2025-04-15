import { call, put, takeEvery } from 'redux-saga/effects';
import { clearEmptyProperty, showToastr } from '../../utils/helpers';

// Login Redux States
import {
	FETCH_WITHDRAW_REQUESTS_START,
	UPDATE_WITHDRAW_REQUEST_START,
} from './actionTypes';
import {
	fetchWithdrawRequestsFail,
	fetchWithdrawRequestsSuccess,
} from './actions';
import { getWithdrawRequests } from '../../network/getRequests';
import {
	createWithdrawRequestAccept,
	createWithdrawRequestCancel,
} from '../../network/postRequests';

function* fetchWithdrawRequests(action) {
	try {
		const payload = clearEmptyProperty(action.payload);
		const response = yield call(getWithdrawRequests, payload);
		yield put(fetchWithdrawRequestsSuccess(response?.data?.data));
	} catch (error) {
		yield put(fetchWithdrawRequestsFail(error));
	}
}

function* updateWithdrawStatusWorker(action) {
	try {
		const { requestType, withdrawalId, reason } = action && action.payload;
		const cancelRequestBody = {
			reason,
		};

		if (requestType === 'accept') {
			yield createWithdrawRequestAccept(withdrawalId);
		} else {
			yield createWithdrawRequestCancel(withdrawalId, cancelRequestBody);
		}
		showToastr({
			message: 'Status updated Successfully',
			type: 'success',
		});
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
	}
}

function* withdrawRequestsSaga() {
	yield takeEvery(FETCH_WITHDRAW_REQUESTS_START, fetchWithdrawRequests);
	yield takeEvery(UPDATE_WITHDRAW_REQUEST_START, updateWithdrawStatusWorker);
}

export default withdrawRequestsSaga;
