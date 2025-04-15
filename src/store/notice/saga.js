/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-param-reassign */
import { all, fork, put, takeLatest } from 'redux-saga/effects';

// Crypto Redux States
import { updateNoticeFail, updateNoticeSuccess } from './actions';

import { CREATE_NOTICE } from './actionTypes';

import { createNotice } from '../../network/postRequests';
import { showToastr } from '../../utils/helpers';

function* createSuperAdminCMSWorker(action) {
	try {
		const { noticeData, navigate } = action && action.payload;

		yield createNotice(noticeData);

		showToastr({
			message: 'Notice Updated Successfully',
			type: 'success',
		});

		yield put(updateNoticeSuccess());
		if (navigate) {
			navigate('/notice');
		}
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors[0]?.description || e.message,
			type: 'error',
		});
		yield put(updateNoticeFail());
	}
}

export function* watchGetAllNoticeData() {
	yield takeLatest(CREATE_NOTICE, createSuperAdminCMSWorker);
}

function* NoticeDetailsSaga() {
	yield all([fork(watchGetAllNoticeData)]);
}

export default NoticeDetailsSaga;
