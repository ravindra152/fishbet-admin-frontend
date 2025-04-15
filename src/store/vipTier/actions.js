import {
	CREATE_VIP_TIER,
	CREATE_VIP_TIER_FAIL,
	CREATE_VIP_TIER_SUCCESS,
	GET_ALL_VIP_TIERS,
	GET_ALL_VIP_TIERS_FAIL,
	GET_ALL_VIP_TIERS_SUCCESS,
	GET_VIP_TIER,
	GET_VIP_TIER_FAIL,
	GET_VIP_TIER_SUCCESS,
	UPDATE_VIP_TIER,
	UPDATE_VIP_TIER_FAIL,
	UPDATE_VIP_TIER_SUCCESS,
} from './actionTypes';

export const getAllVipTiersSuccess = (payload) => ({
	type: GET_ALL_VIP_TIERS_SUCCESS,
	payload,
});

export const getAllVipTiersFail = (payload) => ({
	type: GET_ALL_VIP_TIERS_FAIL,
	payload,
});

export const getAllVipTiers = (payload) => ({
	type: GET_ALL_VIP_TIERS,
	payload,
});

export const getVipTierSuccess = (payload) => ({
	type: GET_VIP_TIER_SUCCESS,
	payload,
});

export const getVipTierFail = (payload) => ({
	type: GET_VIP_TIER_FAIL,
	payload,
});

export const getVipTier = (payload) => ({
	type: GET_VIP_TIER,
	payload,
});

export const createVipTierSuccess = (payload) => ({
	type: CREATE_VIP_TIER_SUCCESS,
	payload,
});

export const createVipTierFail = (payload) => ({
	type: CREATE_VIP_TIER_FAIL,
	payload,
});

export const createVipTier = (payload) => ({
	type: CREATE_VIP_TIER,
	payload,
});

export const updateVipTierSuccess = (payload) => ({
	type: UPDATE_VIP_TIER_SUCCESS,
	payload,
});

export const updateVipTierFail = (payload) => ({
	type: UPDATE_VIP_TIER_FAIL,
	payload,
});

export const updateVipTier = (payload) => ({
	type: UPDATE_VIP_TIER,
	payload,
});

