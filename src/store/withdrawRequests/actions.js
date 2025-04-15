import {
	FETCH_WITHDRAW_REQUESTS_FAIL,
	FETCH_WITHDRAW_REQUESTS_START,
	FETCH_WITHDRAW_REQUESTS_SUCCESS,
	UPDATE_WITHDRAW_REQUEST_FAIL,
	UPDATE_WITHDRAW_REQUEST_START,
	UPDATE_WITHDRAW_REQUEST_SUCCESS,
} from './actionTypes';

export const fetchWithdrawRequestsStart = (payload) => ({
	type: FETCH_WITHDRAW_REQUESTS_START,
	payload,
});

export const fetchWithdrawRequestsSuccess = (payload) => ({
	type: FETCH_WITHDRAW_REQUESTS_SUCCESS,
	payload,
});

export const fetchWithdrawRequestsFail = (history) => ({
	type: FETCH_WITHDRAW_REQUESTS_FAIL,
	payload: { history },
});

export const updateWithdrawRequestSuccess = (payload) => ({
	type: UPDATE_WITHDRAW_REQUEST_SUCCESS,
	payload,
});

export const updateWithdrawRequestFail = (payload) => ({
	type: UPDATE_WITHDRAW_REQUEST_FAIL,
	payload,
});

export const updateWithdrawRequestStart = (payload) => ({
	type: UPDATE_WITHDRAW_REQUEST_START,
	payload,
});
