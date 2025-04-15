import { all, fork, put, takeLatest } from 'redux-saga/effects';
import {
	CREATE_VIP_TIER,
	GET_VIP_TIER,
	UPDATE_VIP_TIER,
} from './actionTypes';
import { objectToFormData } from '../../utils/objectToFormdata';
import {
	createVipTierFail,
	createVipTierSuccess,
	getVipTierFail,
	getVipTierSuccess,
	updateVipTierFail,
	updateVipTierSuccess
} from './actions';

import {
	createVipTier,
} from '../../network/postRequests';
import { showToastr } from '../../utils/helpers';
import { getVipTierData } from '../../network/getRequests';
import { updateVipTier } from '../../network/putRequests';


// function* getVipTiersWorker(action) {
// 	try {
// 		const { data } = yield getVipTiersDetails(action.payload);
// 		yield put(getAllVipTiersSuccess(data?.data));
// 	} catch (error) {
// 		yield put(
// 			getAllVipTiersFail(error?.response?.data?.errors[0]?.description)
// 		);
// 	}
// }

function* getVipTierWorker(action) {
	try {
		const { data } = yield getVipTierData(action.payload);
		yield put(getVipTierSuccess(data?.data?.data));
	} catch (error) {
		yield put(getVipTierFail(error?.response?.data?.errors[0]?.description));
	}
}

function* createVipTierWorker(action) {
	try {
		const { values, navigate } = action && action.payload;
		const { data } = yield createVipTier(objectToFormData(values));
		yield put(createVipTierSuccess(data?.data));

		if (navigate) navigate('/vip-tier');

		showToastr({
			type: 'success',
			message: 'VipTier Created Successfully!',
		});
	} catch (error) {
		yield put(createVipTierFail(error?.response?.data?.errors[0]?.description));
		showToastr({
			type: 'error',
			message: error?.response?.data?.errors[0]?.description || error?.message,
		});
	}
}

function* updateVipTierWorker(action) {
	try {
		const { values, navigate } = action && action.payload;
		const { data } = yield updateVipTier(objectToFormData(values));
		yield put(updateVipTierSuccess(data?.data));

		if (navigate) navigate('/vip-tier');

		showToastr({
			type: 'success',
			message: 'VipTier Updated Successfully!',
		});
	} catch (error) {
		yield put(updateVipTierFail(error?.response?.data?.errors[0]?.description));
		showToastr({
			type: 'error',
			message: error?.response?.data?.errors[0]?.description || error?.message,
		});
	}
}



export function* watchVipTiers() {
	yield takeLatest(CREATE_VIP_TIER, createVipTierWorker);
	yield takeLatest(UPDATE_VIP_TIER, updateVipTierWorker);
	yield takeLatest(GET_VIP_TIER, getVipTierWorker);
	
}

function* VipTiersSaga() {
	yield all([fork(watchVipTiers)]);
}

export default VipTiersSaga;
