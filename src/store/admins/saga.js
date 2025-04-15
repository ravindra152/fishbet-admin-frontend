import { put, takeLatest, all, fork, takeEvery, call } from 'redux-saga/effects';

// Crypto Redux States
import {
	getAdminDetailsSuccess,
	getAdminDetailsFail,
	addSuperAdminUserSuccess,
	addSuperAdminUserFail,
	updateSuperAdminUserSuccess,
	updateSuperAdminUserFail,
} from './actions';
import {
	GET_ADMINS_DATA,
	ADD_SUPER_ADMIN_USER,
	UPDATE_SUPER_ADMIN_USER,
} from './actionTypes';

import { getAllAdmins } from '../../network/getRequests';
import { addSuperAdminUser } from '../../network/postRequests';
import { updateSuperAdminUser } from '../../network/putRequests';
import { clearEmptyProperty, showToastr } from '../../utils/helpers';

function* getAdminsDetail(action) {
	try {
		const payload = clearEmptyProperty(action.payload);
		const { data } = yield getAllAdmins(payload);
		yield put(getAdminDetailsSuccess(data?.data?.adminDetails));
	} catch (error) {
		yield put(
			getAdminDetailsFail(error?.response?.data?.errors[0]?.description)
		);
	}
}

function* addSuperAdminUserWorker(action) {
	try {
		const { data, navigate } = action && action.payload;

		const res = yield call(addSuperAdminUser,data);

		showToastr({
			message: `${res?.data?.data?.message}`,
			type: 'success',
		});

		yield put(addSuperAdminUserSuccess());

		if (navigate) yield navigate('/staff');
	} catch (e) {
		yield put(addSuperAdminUserFail());

		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* updateSuperAdminUserWorker(action) {
	try {
		const { data, navigate } = action && action.payload;
		
		const res = yield call(updateSuperAdminUser,data);		
		showToastr({
			message: `${res?.data?.data?.message}`,
			type: 'success',
		});

		yield put(updateSuperAdminUserSuccess());

		if (navigate) yield navigate('/staff');
	} catch (e) {
		yield put(updateSuperAdminUserFail());

		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

export function* watchGetAdminsData() {
	yield takeLatest(GET_ADMINS_DATA, getAdminsDetail);
	yield takeEvery(ADD_SUPER_ADMIN_USER, addSuperAdminUserWorker);
	yield takeEvery(UPDATE_SUPER_ADMIN_USER, updateSuperAdminUserWorker);
}

function* AdminDetailsSaga() {
	yield all([fork(watchGetAdminsData)]);
}

export default AdminDetailsSaga;
