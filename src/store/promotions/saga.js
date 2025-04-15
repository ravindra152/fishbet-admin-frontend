/* eslint-disable no-param-reassign */
import { takeLatest, put, select, call } from 'redux-saga/effects';

import { CREATE_PROMOTIONS_START, DELETE_PROMOTIONS_START, GET_PROMOTIONS_START, UPDATE_PROMOTIONS_START } from './actionTypes';
import { createPromotionFailure, createPromotionSuccess, fetchPromotionsFailure, fetchPromotionsSuccess, updatePromotionFailure, updatePromotionSuccess } from './actions';
import  { getPromotions } from '../../network/getRequests';
import { createPromotion } from '../../network/postRequests';
import { defaultPaginationLimit } from '../../constants/config';
import { showToastr } from '../../utils/helpers';
import { objectToFormData } from '../../utils/objectToFormdata';
import { deletePromotion } from '../../network/deleteRequests';
import { updatePromotion } from '../../network/putRequests';

function* getPromotionsWorker({ payload }) {
	try {
		const { data } = yield getPromotions(payload);
		yield put(fetchPromotionsSuccess(data?.data?.promotions));
	} catch (e) {
		yield put(fetchPromotionsFailure());
	}
}

function* createPromotionWorker(action) {
	try {
		const { data, navigate } = action && action.payload;

		const res = yield createPromotion(objectToFormData(data));

		showToastr({
			message: 'Promotion Created successfully',
			type: 'success',
		});

		yield put(createPromotionSuccess());
		if (navigate) {
      navigate('/promotions');
    }
    yield call(getPromotionsWorker, { payload: { limit: defaultPaginationLimit, page: 1 }})
	} catch (e) {
		yield put(createPromotionFailure());

		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* deletePromotionWorker({ payload }) {
  try {
		const res = yield deletePromotion(payload);

		showToastr({
			message: 'Promotion Deleted successfully',
			type: 'success',
		});

    yield call(getPromotionsWorker, { payload: { limit: defaultPaginationLimit, page: 1 }})
	} catch (e) {

    showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* updatePromotionWorker(action) {
  try {
		const { data, navigate } = action && action.payload;

		const res = yield updatePromotion(objectToFormData(data));

    showToastr({
			message: 'Promotion Updated successfully',
			type: 'success',
		});

		yield put(updatePromotionSuccess());
		if (navigate) {
      navigate('/promotions');
    }
    yield call(getPromotionsWorker, { payload: { limit: defaultPaginationLimit, page: 1 }})
	} catch (e) {
		yield put(updatePromotionFailure());

		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

export default function* affiliatesWatcher() {
	yield takeLatest(GET_PROMOTIONS_START, getPromotionsWorker);
  yield takeLatest(CREATE_PROMOTIONS_START, createPromotionWorker);
  yield takeLatest(DELETE_PROMOTIONS_START, deletePromotionWorker);
  yield takeLatest(UPDATE_PROMOTIONS_START, updatePromotionWorker);
}
