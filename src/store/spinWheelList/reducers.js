import {
	EDIT_SPIN_WHEEL_LIST_START,
	EDIT_SPIN_WHEEL_LIST_FAIL,
	EDIT_SPIN_WHEEL_LIST_SUCCESS,
	FETCH_SPIN_WHEEL_LIST_FAIL,
	FETCH_SPIN_WHEEL_LIST_START,
	FETCH_SPIN_WHEEL_LIST_SUCCESS,
} from './actionTypes';

const initialState = {
	spinWheelList: null,
	error: '',
	loading: false,
};

const spinWheelListReducer = (state = initialState, { type, payload } = {}) => {
	switch (type) {
		case FETCH_SPIN_WHEEL_LIST_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_SPIN_WHEEL_LIST_FAIL:
			return {
				...state,
				loading: false,
				error: true,
			};
		case FETCH_SPIN_WHEEL_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				spinWheelList: payload,
			};
		case EDIT_SPIN_WHEEL_LIST_START:
			return {
				...state,
				isEditSpinWheelListLoading: true,
				isEditSpinWheelListSuccess: false,
			};

		case EDIT_SPIN_WHEEL_LIST_SUCCESS:
			return {
				...state,
				isEditSpinWheelListLoading: false,
				isEditSpinWheelListSuccess: true,
			};

		case EDIT_SPIN_WHEEL_LIST_FAIL:
			return {
				...state,
				isEditSpinWheelListError: payload,
				isEditSpinWheelListLoading: false,
				isEditSpinWheelListSuccess: false,
			};
		default:
			return { ...state };
	}
};

export default spinWheelListReducer;
