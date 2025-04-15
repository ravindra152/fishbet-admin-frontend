import {
	EDIT_SPIN_WHEEL_LIST_START,
	EDIT_SPIN_WHEEL_LIST_FAIL,
	EDIT_SPIN_WHEEL_LIST_SUCCESS,
	FETCH_SPIN_WHEEL_LIST_FAIL,
	FETCH_SPIN_WHEEL_LIST_START,
	FETCH_SPIN_WHEEL_LIST_SUCCESS,
} from './actionTypes';

export const fetchSpinWheelListStart = (payload) => ({
	type: FETCH_SPIN_WHEEL_LIST_START,
	payload,
});

export const fetchSpinWheelListSuccess = (spinWheelList) => ({
	type: FETCH_SPIN_WHEEL_LIST_SUCCESS,
	payload: spinWheelList,
});

export const fetchSpinWheelListFail = (history) => ({
	type: FETCH_SPIN_WHEEL_LIST_FAIL,
	payload: { history },
});

export const editSpinWheelListSuccess = (payload) => ({
	type: EDIT_SPIN_WHEEL_LIST_SUCCESS,
	payload,
});

export const editSpinWheelListFail = (payload) => ({
	type: EDIT_SPIN_WHEEL_LIST_FAIL,
	payload,
});

export const editSpinWheelListStart = (payload) => ({
	type: EDIT_SPIN_WHEEL_LIST_START,
	payload,
});
