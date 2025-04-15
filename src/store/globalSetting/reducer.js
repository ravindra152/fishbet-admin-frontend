import {
	GET_CURRENCY_LIMIT_START,
	GET_CURRENCY_LIMIT_SUCCESS,
	GET_CURRENCY_LIMIT_FAIL,
	UPDATE_DEPOSIT_LIMIT_FAIL,
	UPDATE_DEPOSIT_LIMIT_SUCCESS,
	UPDATE_DEPOSIT_LIMIT_START,
	UPDATE_WITHDRAW_LIMIT_START,
	UPDATE_WITHDRAW_LIMIT_FAIL,
	UPDATE_WITHDRAW_LIMIT_SUCCESS,
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

const initialState = {
	currencyLimit: null,
	isCurrencyLimitLoading: false,
	depositLimitLoading: false,
	withdrawLimitLoading: false,
	affiliateCommisionPerLoading: false,
	affiliateCommisionPer: '',
	updateAffiliateComPercLoading: false,
	updateAffiliateComPerc: null,
	referralCommisionAomLoading: false,
	referralCommisionAom: '',
	updateReferralCommisionAomLoading: false,
	updateReferralCommisionAom: null,
};

const globalSettingReducer = (state = initialState, { type, payload } = {}) => {
	switch (type) {
		case GET_CURRENCY_LIMIT_START:
			return {
				...state,
				isCurrencyLimitLoading: true,
			};

		case GET_CURRENCY_LIMIT_SUCCESS:
			return {
				...state,
				currencyLimit: payload,
				isCurrencyLimitLoading: false,
			};

		case GET_CURRENCY_LIMIT_FAIL:
			return {
				...state,
				currencyLimit: null,
				isCurrencyLimitLoading: false,
			};

		case UPDATE_DEPOSIT_LIMIT_START:
			return {
				...state,
				depositLimitLoading: true,
			};

		case UPDATE_DEPOSIT_LIMIT_SUCCESS:
			return {
				...state,
				depositLimitLoading: false,
			};

		case UPDATE_DEPOSIT_LIMIT_FAIL:
			return {
				...state,
				depositLimitLoading: false,
			};

		case UPDATE_WITHDRAW_LIMIT_START:
			return {
				...state,
				withdrawLimitLoading: true,
			};

		case UPDATE_WITHDRAW_LIMIT_SUCCESS:
			return {
				...state,
				withdrawLimitLoading: false,
			};

		case UPDATE_WITHDRAW_LIMIT_FAIL:
			return {
				...state,
				withdrawLimitLoading: false,
			};

		case GET_AFFILIATE_COMNISION_PERC_START:
			return {
				...state,
				affiliateCommisionPerLoading: true,
			};

		case GET_AFFILIATE_COMNISION_PERC_SUCCESS:
			return {
				...state,
				affiliateCommisionPerLoading: false,
				affiliateCommisionPer: payload,
			};

		case GET_AFFILIATE_COMNISION_PERC_FAIL:
			return {
				...state,
				affiliateCommisionPerLoading: false,
			};

		case UPDATE_AFFILIATE_COMNISION_PERC_START:
			return {
				...state,
				updateAffiliateComPercLoading: true,
			};

		case UPDATE_AFFILIATE_COMNISION_PERC_SUCCESS:
			return {
				...state,
				updateAffiliateComPercLoading: false,
				updateAffiliateComPerc: payload,
			};

		case UPDATE_AFFILIATE_COMNISION_PERC_FAIL:
			return {
				...state,
				updateAffiliateComPercLoading: false,
			};
		case GET_REFERRAL_COMNISION_AMOUNT_START:
			return {
				...state,
				referralCommisionAomLoading: true,
			};

		case GET_REFERRAL_COMNISION_AMOUNT_SUCCESS:
			return {
				...state,
				referralCommisionAomLoading: false,
				referralCommisionAom: payload,
			};

		case GET_REFERRAL_COMNISION_AMOUNT_FAIL:
			return {
				...state,
				referralCommisionAomLoading: false,
			};

		case UPDATE_REFERRAL_COMNISION_AMOUNT_START:
			return {
				...state,
				updateReferralCommisionAomLoading: true,
			};

		case UPDATE_REFERRAL_COMNISION_AMOUNT_SUCCESS:
			return {
				...state,
				updateReferralCommisionAomLoading: false,
				updateReferralCommisionAom: payload,
			};

		case UPDATE_REFERRAL_COMNISION_AMOUNT_FAIL:
			return {
				...state,
				updateReferralCommisionAomLoading: false,
			};

		default:
			return { ...state };
	}
};

export default globalSettingReducer;
