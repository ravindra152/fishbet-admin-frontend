import {
	CREATE_NOTICE,
	CREATE_NOTICE_FAIL,
	CREATE_NOTICE_SUCCESS,
} from './actionTypes';

const INIT_STATE = {
	updateNotice: false,
	updateNoticeLoading: false,
	updateNoticeError: null,
};

const getAllCms = (state = INIT_STATE, { type, payload } = {}) => {

	switch (type) {
		case CREATE_NOTICE:
			return {
				...state,
				updateNoticeLoading: true,
			};

		case CREATE_NOTICE_FAIL:
			return {
				...state,
				updateNoticeLoading: false,
				updateNoticeError: payload,
				updateNotice: false,
			};

		case CREATE_NOTICE_SUCCESS:
			return {
				...state,
				updateNoticeLoading: false,
				updateNotice: true,
				updateNoticeError: null,
			};

		default:
			return { ...state };
	}
};

export default getAllCms;
