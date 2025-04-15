import {
	CREATE_BONUS_DROP,
	CREATE_BONUS_DROP_FAIL,
	CREATE_BONUS_DROP_SUCCESS,
	GET_ALL_BONUS_DROP,
	GET_ALL_BONUS_DROP_FAIL,
	GET_ALL_BONUS_DROP_SUCCESS,
} from './actionTypes';

export const createBonusDropSuccess = (payload) => ({
	type: CREATE_BONUS_DROP_SUCCESS,
	payload,
});

export const createBonusDropFail = (payload) => ({
	type: CREATE_BONUS_DROP_FAIL,
	payload,
});

export const createBonusDrop = (payload) => ({
	type: CREATE_BONUS_DROP,
	payload,
});

export const getAllBonusDropDetailsSuccess = (payload) => ({
	type: GET_ALL_BONUS_DROP_SUCCESS,
	payload,
});

export const getAllBonusDropDetailsFail = (payload) => ({
	type: GET_ALL_BONUS_DROP_FAIL,
	payload,
});

export const getAllBonusDropDetails = (payload) => ({
	type: GET_ALL_BONUS_DROP,
	payload,
});
