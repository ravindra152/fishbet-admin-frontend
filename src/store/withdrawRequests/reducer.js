import {
	FETCH_WITHDRAW_REQUESTS_FAIL,
	FETCH_WITHDRAW_REQUESTS_START,
	FETCH_WITHDRAW_REQUESTS_SUCCESS,
} from './actionTypes';

const initialState = {
	withdrawRequests: null,
	error: '',
	loading: false,
	updateWithdrawRequestLoading: false,
	updateWithdrawRequestSuccess: false,
};

const withdrawRequestsReducer = (
	state = initialState,
	{ type, payload } = {}
) => {
	switch (type) {
		case FETCH_WITHDRAW_REQUESTS_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_WITHDRAW_REQUESTS_FAIL:
			return {
				...state,
				loading: false,
				error: true,
			};
		case FETCH_WITHDRAW_REQUESTS_SUCCESS:
			return {
				...state,
				loading: false,
				withdrawRequests: payload,
			};
		default:
			return { ...state };
	}
};

export default withdrawRequestsReducer;
