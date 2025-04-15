import { call, put, takeEvery } from 'redux-saga/effects';

import {
	GET_AFFILIATE_COMNISION_PERC_START,
	GET_CURRENCY_LIMIT_START,
	UPDATE_AFFILIATE_COMNISION_PERC_START,
	UPDATE_DEPOSIT_LIMIT_START,
	UPDATE_WITHDRAW_LIMIT_START,
	GET_REFERRAL_COMNISION_AMOUNT_START,
	UPDATE_REFERRAL_COMNISION_AMOUNT_START,
} from './actionTypes';
import {
	getAffiliateCommisionFail,
	getAffiliateCommisionSuccess,
	getCurrencyLimitFail,
	getCurrencyLimitSuccess,
	updateAffiliateCommisionFail,
	updateAffiliateCommisionSuccess,
	updateDepositlimitFail,
	updateDepositlimitSuccess,
	updateWithdrawlimitFail,
	updateWithdrawlimitSuccess,
	updateReferralCommisionSuccess,
	updateReferralCommisionFail,
	getReferralCommisionSuccess,
	getReferralCommisionFail,
} from './actions';
import { showToastr } from '../../utils/helpers';
import {
	getRefAffCommision,
	getCurrencyLimit,
} from '../../network/getRequests';
import {
	updateRefAffCommision,
	updateDepositlimit,
	updateWithdrawlimit,
} from '../../network/putRequests';

function* getCurrencyLimitData() {
	try {
		const { data } = yield getCurrencyLimit();
		yield put(getCurrencyLimitSuccess(data?.data?.currencyLimits));
	} catch (e) {
		yield put(getCurrencyLimitFail());

		showToastr({
			message: e?.response?.data?.errors?.message || e?.message,
			type: 'error',
		});
	}
}

function* updateDepositlimitData({ payload }) {
	try {
		yield updateDepositlimit(payload);
		showToastr({
			message: 'Limit Updated Successfully',
			type: 'success',
		});

		yield call(getCurrencyLimitData);
		yield put(updateDepositlimitSuccess());
	} catch (e) {
		yield put(updateDepositlimitFail());

		showToastr({
			message: e?.response?.data?.errors?.message || e?.message,
			type: 'error',
		});
	}
}

function* updateWithdrawlimitData({ payload }) {
	try {
		yield updateWithdrawlimit(payload);
		showToastr({
			message: 'Limit Updated Successfully',
			type: 'success',
		});

		yield call(getCurrencyLimitData);
		yield put(updateWithdrawlimitSuccess());
	} catch (e) {
		yield put(updateWithdrawlimitFail());

		showToastr({
			message: e?.response?.data?.errors?.message || e?.message,
			type: 'error',
		});
	}
}

function* getAffiliateCommPerc() {
	try {
		const { data } = yield getRefAffCommision();
		const affiliatePercentage = data?.data?.globalAffiliatePercentage?.filter(
			(item) => item?.key === 'AFFILIATE_PERCENTAGE'
		);

		yield put(
			getAffiliateCommisionSuccess(affiliatePercentage?.[0]?.value?.percentage)
		);
	} catch (e) {
		yield put(getAffiliateCommisionFail());

		showToastr({
			message: e?.response?.data?.errors?.message || e?.message,
			type: 'error',
		});
	}
}

function* updateAffiliateCommPerc({ payload }) {
	try {
		const res = yield updateRefAffCommision(payload);
		showToastr({
			message: 'Commision Percentage Successfully',
			type: 'success',
		});
		yield call(getAffiliateCommPerc);
		yield put(updateAffiliateCommisionSuccess(res?.data));
	} catch (e) {
		yield put(updateAffiliateCommisionFail());

		showToastr({
			message: e?.response?.data?.errors?.message || e?.message,
			type: 'error',
		});
	}
}
function* getReferralCommAmount() {
	try {
		const { data } = yield getRefAffCommision();
		const referralAmount = data?.data?.globalAffiliatePercentage?.filter(
			(item) => item?.key === 'REFERRAL_PERCENTAGE'
		);
		yield put(getReferralCommisionSuccess(referralAmount?.[0]?.value));
	} catch (e) {
		yield put(getReferralCommisionFail());

		showToastr({
			message: e?.response?.data?.errors?.message || e?.message,
			type: 'error',
		});
	}
}

function* updateReferralCommAmount({ payload }) {
	try {
		const res = yield updateRefAffCommision(payload);
		showToastr({
			message: 'Update Commision Amount Successfully',
			type: 'success',
		});
		yield call(getReferralCommAmount);
		yield put(updateReferralCommisionSuccess(res?.data));
	} catch (e) {
		yield put(updateReferralCommisionFail());

		showToastr({
			message: e?.response?.data?.errors?.message || e?.message,
			type: 'error',
		});
	}
}

function* globalSettingSaga() {
	yield takeEvery(GET_CURRENCY_LIMIT_START, getCurrencyLimitData);
	yield takeEvery(UPDATE_DEPOSIT_LIMIT_START, updateDepositlimitData);
	yield takeEvery(UPDATE_WITHDRAW_LIMIT_START, updateWithdrawlimitData);
	yield takeEvery(GET_AFFILIATE_COMNISION_PERC_START, getAffiliateCommPerc);
	yield takeEvery(
		UPDATE_AFFILIATE_COMNISION_PERC_START,
		updateAffiliateCommPerc
	);
	yield takeEvery(GET_REFERRAL_COMNISION_AMOUNT_START, getReferralCommAmount);
	yield takeEvery(
		UPDATE_REFERRAL_COMNISION_AMOUNT_START,
		updateReferralCommAmount
	);
}

export default globalSettingSaga;
