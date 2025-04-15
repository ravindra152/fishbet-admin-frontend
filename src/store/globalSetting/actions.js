import {
	GET_CURRENCY_LIMIT_START,
	GET_CURRENCY_LIMIT_SUCCESS,
	GET_CURRENCY_LIMIT_FAIL,
	UPDATE_DEPOSIT_LIMIT_START,
	UPDATE_DEPOSIT_LIMIT_SUCCESS,
	UPDATE_DEPOSIT_LIMIT_FAIL,
	UPDATE_WITHDRAW_LIMIT_START,
	UPDATE_WITHDRAW_LIMIT_SUCCESS,
	UPDATE_WITHDRAW_LIMIT_FAIL,
	GET_AFFILIATE_COMNISION_PERC_START,
	GET_AFFILIATE_COMNISION_PERC_SUCCESS,
	GET_AFFILIATE_COMNISION_PERC_FAIL,
	UPDATE_AFFILIATE_COMNISION_PERC_START,
	UPDATE_AFFILIATE_COMNISION_PERC_SUCCESS,
	UPDATE_AFFILIATE_COMNISION_PERC_FAIL,
	GET_REFERRAL_COMNISION_AMOUNT_START,
	GET_REFERRAL_COMNISION_AMOUNT_SUCCESS,
	GET_REFERRAL_COMNISION_AMOUNT_FAIL,
	UPDATE_REFERRAL_COMNISION_AMOUNT_START,
	UPDATE_REFERRAL_COMNISION_AMOUNT_SUCCESS,
	UPDATE_REFERRAL_COMNISION_AMOUNT_FAIL,
} from './actionTypes';

export const getCurrencyLimitStart = () => ({
	type: GET_CURRENCY_LIMIT_START,
});

export const getCurrencyLimitSuccess = (payload) => ({
	type: GET_CURRENCY_LIMIT_SUCCESS,
	payload,
});

export const getCurrencyLimitFail = () => ({
	type: GET_CURRENCY_LIMIT_FAIL,
});

export const updateWithdrawlimitStart = (payload) => ({
	type: UPDATE_WITHDRAW_LIMIT_START,
	payload,
});

export const updateWithdrawlimitSuccess = (payload) => ({
	type: UPDATE_WITHDRAW_LIMIT_SUCCESS,
	payload,
});

export const updateWithdrawlimitFail = () => ({
	type: UPDATE_WITHDRAW_LIMIT_FAIL,
});

export const updateDepositlimitStart = (payload) => ({
	type: UPDATE_DEPOSIT_LIMIT_START,
	payload,
});

export const updateDepositlimitSuccess = (payload) => ({
	type: UPDATE_DEPOSIT_LIMIT_SUCCESS,
	payload,
});

export const updateDepositlimitFail = () => ({
	type: UPDATE_DEPOSIT_LIMIT_FAIL,
});

export const getAffiliateCommisionStart = () => ({
	type: GET_AFFILIATE_COMNISION_PERC_START,
});

export const getAffiliateCommisionSuccess = (payload) => ({
	type: GET_AFFILIATE_COMNISION_PERC_SUCCESS,
	payload,
});

export const getAffiliateCommisionFail = () => ({
	type: GET_AFFILIATE_COMNISION_PERC_FAIL,
});

export const updateAffiliateCommisionStart = (payload) => ({
	type: UPDATE_AFFILIATE_COMNISION_PERC_START,
	payload,
});

export const updateAffiliateCommisionSuccess = (payload) => ({
	type: UPDATE_AFFILIATE_COMNISION_PERC_SUCCESS,
	payload,
});

export const updateAffiliateCommisionFail = () => ({
	type: UPDATE_AFFILIATE_COMNISION_PERC_FAIL,
});

export const getReferralCommisionStart = () => ({
	type: GET_REFERRAL_COMNISION_AMOUNT_START,
});

export const getReferralCommisionSuccess = (payload) => ({
	type: GET_REFERRAL_COMNISION_AMOUNT_SUCCESS,
	payload,
});

export const getReferralCommisionFail = () => ({
	type: GET_REFERRAL_COMNISION_AMOUNT_FAIL,
});

export const updateReferralCommisionStart = (payload) => ({
	type: UPDATE_REFERRAL_COMNISION_AMOUNT_START,
	payload,
});

export const updateReferralCommisionSuccess = (payload) => ({
	type: UPDATE_REFERRAL_COMNISION_AMOUNT_SUCCESS,
	payload,
});

export const updateReferralCommisionFail = () => ({
	type: UPDATE_REFERRAL_COMNISION_AMOUNT_FAIL,
});
