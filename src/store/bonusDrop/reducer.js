import {
	CREATE_BONUS_DROP,
	CREATE_BONUS_DROP_FAIL,
	CREATE_BONUS_DROP_SUCCESS,
	GET_ALL_BONUS_DROP,
	GET_ALL_BONUS_DROP_FAIL,
	GET_ALL_BONUS_DROP_SUCCESS,
} from './actionTypes';

const INIT_STATE = {
	createBonusDrop: false,
	createBonusDropLoading: false,
	createBonusDropError: null,
	bonusDropDetails: null,
	error: null,
	isLoading: true,
	updateBonusDrop: false,
	updateBonusDropLoading: false,
	updateBonusDropError: null,
};

const getAllBonusDrop = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_ALL_BONUS_DROP:
			return {
				...state,
				isLoading: false,
			};

		case GET_ALL_BONUS_DROP_SUCCESS:
			return {
				...state,
				isLoading: true,
				bonusDropDetails: payload,
				error: null,
			};

		case GET_ALL_BONUS_DROP_FAIL:
			return {
				...state,
				error: payload,
				isLoading: true,
			};

		case CREATE_BONUS_DROP:
			return {
				...state,
				createBonusDropLoading: true,
			};

		case CREATE_BONUS_DROP_FAIL:
			return {
				...state,
				createBonusDropLoading: false,
				createBonusDropError: payload,
				createBonusDrop: false,
			};

		case CREATE_BONUS_DROP_SUCCESS:
			return {
				...state,
				createBonusDropLoading: false,
				createBonusDrop: true,
				createBonusDropError: null,
			};

		default:
			return { ...state };
	}
};

export default getAllBonusDrop;
