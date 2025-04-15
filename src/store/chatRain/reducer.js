import {
	GET_CHATRAIN_DATA,
	GET_CHATRAIN_DATA_SUCCESS,
	GET_CHATRAIN_DATA_FAIL,
	CREATE_CHATRAIN,
	CREATE_CHATRAIN_SUCCESS,
	CREATE_CHATRAIN_FAIL,
	RESET_CHATRAIN,
	UPDATE_CHATRAIN_FAIL,
	UPDATE_CHATRAIN_SUCCESS,
	UPDATE_CHATRAIN,
	DELETE_CHATRAIN,
	DELETE_CHATRAIN_SUCCESS,
	DELETE_CHATRAIN_FAIL,
} from './actionTypes';

const INIT_STATE = {
	chatRain: null,
	isLoading: true,
	createChatrainLoading: false,
	createChatrainSuccess: false,
	createChatrainError: false,
	updateChatrainLoading: false,
	updateChatrainSuccess: false,
	updateChatrainError: false,
	deleteChatrainLoading: false,
	deleteChatrainSuccess: false,
	deleteChatrainError: false,
};

const getChatRain = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_CHATRAIN_DATA:
			return {
				...state,
				isLoading: true,
			};

		case GET_CHATRAIN_DATA_SUCCESS:
			return {
				...state,
				isLoading: false,
				chatRain: payload,
			};

		case GET_CHATRAIN_DATA_FAIL:
			return {
				...state,
				isLoading: false,
			};

		case CREATE_CHATRAIN:
			return {
				...state,
				createChatrainLoading: true,
			};

		case CREATE_CHATRAIN_SUCCESS:
			return {
				...state,
				createChatrainLoading: false,
				createChatrainSuccess: payload,
			};

		case CREATE_CHATRAIN_FAIL:
			return {
				...state,
				createChatrainLoading: false,
				createChatrainError: true,
			};

		case UPDATE_CHATRAIN:
			return {
				...state,
				updateChatrainLoading: true,
			};

		case UPDATE_CHATRAIN_SUCCESS:
			return {
				...state,
				updateChatrainLoading: false,
				updateChatrainSuccess: payload,
			};

		case UPDATE_CHATRAIN_FAIL:
			return {
				...state,
				updateChatrainLoading: false,
				updateChatrainError: true,
			};

		case DELETE_CHATRAIN:
			return {
				...state,
				deleteChatrainLoading: true,
				deleteChatrainSuccess: null,
				deleteChatrainError: null,
			};

		case DELETE_CHATRAIN_SUCCESS:
			return {
				...state,
				deleteChatrainLoading: false,
				deleteChatrainSuccess: payload,
				deleteChatrainError: null,
			};

		case DELETE_CHATRAIN_FAIL:
			return {
				...state,
				deleteChatrainLoading: false,
				deleteChatrainSuccess: null,
				deleteChatrainError: payload,
			};

		case RESET_CHATRAIN:
			return {
				...state,
				createChatrainSuccess: false,
				createChatrainError: false,
				createChatrainLoading: false,
				updateChatrainSuccess: false,
				updateChatrainError: false,
				updateChatrainLoading: false,
			};

		default:
			return { ...state };
	}
};

export default getChatRain;
