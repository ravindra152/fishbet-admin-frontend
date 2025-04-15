import {
	all,
	call,
	fork,
	put,
	takeEvery,
	takeLatest,
} from 'redux-saga/effects';

// Login Redux States
import {
	EDIT_SPIN_WHEEL_LIST_START,
	FETCH_SPIN_WHEEL_LIST_START,
} from './actionTypes';
import {
	fetchSpinWheelListFail,
	fetchSpinWheelListSuccess,
	editSpinWheelListSuccess,
	editSpinWheelListFail,
} from './actions';

import { getSpinWheelList } from '../../network/getRequests';
import { editSpinWheelList } from '../../network/putRequests';
import { showToastr } from '../../utils/helpers';

function* fetchSpinWheelList({ payload }) {
	try {
		const response = yield call(getSpinWheelList, payload);
		yield put(fetchSpinWheelListSuccess(response?.data?.data?.spinWheelList));
	} catch (error) {
		yield put(fetchSpinWheelListFail(error));
	}
}

function* editSpinWheelListWorker(action) {
	try {
		const { data } = action && action.payload;
		yield editSpinWheelList(data);
		fetchSpinWheelList(action);
		showToastr({
			message: `Spin Wheel List Updated Successfully`,
			type: 'success',
		});

		yield put(editSpinWheelListSuccess());
	} catch (e) {
		yield put(editSpinWheelListFail());

		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* spinWheelListSaga() {
	yield takeEvery(EDIT_SPIN_WHEEL_LIST_START, editSpinWheelListWorker);
	yield takeEvery(FETCH_SPIN_WHEEL_LIST_START, fetchSpinWheelList);
}

export default spinWheelListSaga;
