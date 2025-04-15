import { all, fork, put, takeLatest } from 'redux-saga/effects';
import {
	CREATE_PACKAGE,
	DELETE_PACKAGE,
	GET_PACKAGE,
	UPDATE_PACKAGE,
} from './actionTypes';
import { objectToFormData } from '../../utils/objectToFormdata';
import {
	createPackageFail,
	createPackageSuccess,
	deletePackageFail,
	deletePackageSuccess,
	getPackageFail,
	getPackageSuccess,
	updatePackageFail,
	updatePackageSuccess,
} from './actions';

import {
	createPackages,
	// reorderPackage,
	// updatePackage,
} from '../../network/postRequests';
import { showToastr } from '../../utils/helpers';
import { getPackageData } from '../../network/getRequests';
import { updatePackageValue } from '../../network/putRequests';
import { deletePackage } from '../../network/deleteRequests';

// function* getPackagesWorker(action) {
// 	try {
// 		const { data } = yield getPackagesDetails(action.payload);
// 		yield put(getAllPackagesSuccess(data?.data));
// 	} catch (error) {
// 		yield put(
// 			getAllPackagesFail(error?.response?.data?.errors[0]?.description)
// 		);
// 	}
// }

function* getPackageWorker(action) {
	try {
		const { data } = yield getPackageData(action.payload);
		yield put(getPackageSuccess(data?.data?.data));
	} catch (error) {
		yield put(getPackageFail(error?.response?.data?.errors[0]?.description));
	}
}

function* createPackageWorker(action) {
	try {
		const { values, navigate } = action && action.payload;
		const { data } = yield createPackages(objectToFormData(values));
		yield put(createPackageSuccess(data?.data));

		if (navigate) navigate('/packages');

		showToastr({
			type: 'success',
			message: 'Package Created Successfully!',
		});
	} catch (error) {
		yield put(createPackageFail(error?.response?.data?.errors[0]?.description));
		showToastr({
			type: 'error',
			message: error?.response?.data?.errors[0]?.description || error?.message,
		});
	}
}

function* updatePackageWorker(action) {
	try {
		const { values, navigate } = action && action.payload;
		const { data } = yield updatePackageValue(objectToFormData(values));
		yield put(updatePackageSuccess(data?.data));

		if (navigate) navigate('/packages');

		showToastr({
			type: 'success',
			message: 'Package Updated Successfully!',
		});
	} catch (error) {
		yield put(updatePackageFail(error?.response?.data?.errors[0]?.description));
		showToastr({
			type: 'error',
			message: error?.response?.data?.errors[0]?.description || error?.message,
		});
	}
}

function* deletePackageWorker(action) {
	try {
		const { id, fetchData } = action && action.payload;
		const { data } = yield deletePackage({ id });
		yield put(deletePackageSuccess(data?.data));

		if (fetchData) fetchData();

		showToastr({
			type: 'success',
			message: 'Package Deleted Successfully!',
		});
	} catch (error) {
		yield put(deletePackageFail(error?.response?.data?.errors[0]?.description));
		showToastr({
			type: 'error',
			message: error?.response?.data?.errors[0]?.description || error?.message,
		});
	}
}

// function* reorderPackageWorker(action) {
// 	try {
// 		const { values, navigate } = action && action.payload;
// 		const { data } = yield reorderPackage(values);
// 		yield put(reorderPackageSuccess(data?.data));

// 		if (navigate) navigate('/packages');

// 		showToastr({
// 			type: 'success',
// 			message: 'Package Reordered Successfully!',
// 		});
// 	} catch (error) {
// 		yield put(
// 			reorderPackageFail(error?.response?.data?.errors[0]?.description)
// 		);
// 		showToastr({
// 			type: 'error',
// 			message: error?.response?.data?.errors[0]?.description || error?.message,
// 		});
// 	}
// }

export function* watchPackages() {
	// yield takeLatest(GET_ALL_PACKAGES, getPackagesWorker);
	yield takeLatest(CREATE_PACKAGE, createPackageWorker);
	yield takeLatest(UPDATE_PACKAGE, updatePackageWorker);
	yield takeLatest(GET_PACKAGE, getPackageWorker);
	yield takeLatest(DELETE_PACKAGE, deletePackageWorker);
	// yield takeLatest(REORDER_PACKAGE, reorderPackageWorker);
}

function* PackagesSaga() {
	yield all([fork(watchPackages)]);
}

export default PackagesSaga;
