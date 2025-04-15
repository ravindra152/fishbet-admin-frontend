/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-param-reassign */
import { all, fork, put, takeLatest } from 'redux-saga/effects';

// Crypto Redux States
// import { updateNoticeFail, updateNoticeSuccess } from './actions';

import { CREATE_BONUS_DROP, GET_ALL_BONUS_DROP } from './actionTypes';
import { showToastr } from '../../utils/helpers';
import {
	createBonusDropFail,
	createBonusDropSuccess,
	getAllBonusDropDetailsFail,
	getAllBonusDropDetailsSuccess,
} from './actions';
import { createBonusDrop } from '../../network/postRequests';
import { getBonusDrop } from '../../network/getRequests';

function* createSuperAdminBonusDropWorker(action) {
	try {
		const { bonusDropData, navigate } = action && action.payload;

		yield createBonusDrop(bonusDropData);

		showToastr({
			message: 'Bonus Drop Created Successfully',
			type: 'success',
		});

		yield put(createBonusDropSuccess());
		if (navigate) {
			navigate('/bonus-drop');
		}
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors?.error || e.message,
			type: 'error',
		});
		yield put(createBonusDropFail());
	}
}
function* getBonusDropDetails(action) {
	const payload = action && action.payload;

	try {
		const { data } = yield getBonusDrop(payload);
		yield put(getAllBonusDropDetailsSuccess(data?.data?.data));
	} catch (error) {
		yield put(
			getAllBonusDropDetailsFail(error?.response?.data?.errors[0]?.description)
		);
	}
}

export function* watchGetAllBonusDropData() {
	yield takeLatest(GET_ALL_BONUS_DROP, getBonusDropDetails);
	yield takeLatest(CREATE_BONUS_DROP, createSuperAdminBonusDropWorker);
}

function* BonusDropDetailsSaga() {
	yield all([fork(watchGetAllBonusDropData)]);
}

export default BonusDropDetailsSaga;
