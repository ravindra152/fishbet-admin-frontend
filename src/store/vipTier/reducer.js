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


const INIT_STATE = {
	isVipTierLoading: false,
	vipTier: null,
	isError: null,
	isVipTierInfoLoading: false,
	vipTierInfo: null,
	isVipTierInfoError: null,
	createVipTierSuccess: null,
	createVipTierError: null,
	createVipTierLoading: false,
	updateVipTierSuccess: null,
	updateVipTierError: null,
	updateVipTierLoading: false,
	deleteVipTierSuccess: null,
	deleteVipTierError: null,
	deleteVipTierLoading: false,
	reorderVipTierSuccess: null,
	reorderVipTierError: null,
	reorderVipTierLoading: false,
};

const getVipTiers = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_ALL_VIP_TIERS:
			return {
				...state,
				isVipTiersLoading: true,
				vipTiers: null,
				isError: null,
			};

		case GET_ALL_VIP_TIERS_SUCCESS: {
			return {
				...state,
				isVipTiersLoading: false,
				vipTiers: payload,
				isError: null,
			};
		}

		case GET_ALL_VIP_TIERS_FAIL:
			return {
				...state,
				isVipTiersLoading: false,
				vipTiers: null,
				isError: payload,
			};

		case GET_VIP_TIER:
			return {
				...state,
				isVipTierInfoLoading: true,
				vipTierInfo: null,
				isVipTierInfoError: null,
			};

		case GET_VIP_TIER_SUCCESS: {
			return {
				...state,
				isVipTierInfoLoading: false,
				vipTierInfo: payload,
				isVipTierInfoError: null,
			};
		}

		case GET_VIP_TIER_FAIL:
			return {
				...state,
				isVipTierInfoLoading: false,
				vipTierInfo: null,
				isVipTierInfoError: payload,
			};

		case CREATE_VIP_TIER:
			return {
				...state,
				createVipTierLoading: true,
				createVipTierSuccess: null,
				createVipTierError: null,
			};

		case CREATE_VIP_TIER_SUCCESS: {
			return {
				...state,
				createVipTierLoading: false,
				createVipTierSuccess: payload,
				createVipTierError: null,
			};
		}

		case CREATE_VIP_TIER_FAIL:
			return {
				...state,
				createVipTierLoading: false,
				createVipTierSuccess: null,
				createVipTierError: payload,
			};

		case UPDATE_VIP_TIER:
			return {
				...state,
				updateVipTierLoading: true,
				updateVipTierSuccess: null,
				updateVipTierError: null,
			};

		case UPDATE_VIP_TIER_SUCCESS: {
			return {
				...state,
				updateVipTierLoading: false,
				updateVipTierSuccess: payload,
				updateVipTierError: null,
			};
		}

		case UPDATE_VIP_TIER_FAIL:
			return {
				...state,
				updateVipTierLoading: false,
				updateVipTierSuccess: null,
				updateVipTierError: payload,
			};


		default:
			return { ...state };
	}
};

export default getVipTiers;
