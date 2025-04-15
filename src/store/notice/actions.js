import {
	CREATE_NOTICE,
	CREATE_NOTICE_FAIL,
	CREATE_NOTICE_SUCCESS,
} from './actionTypes';





export const updateNoticeSuccess = (payload) => ({
	type: CREATE_NOTICE_SUCCESS,
	payload,
});

export const updateNoticeFail = (payload) => ({
	type: CREATE_NOTICE_FAIL,
	payload,
});

export const updateNotice = (payload) => ({
	type: CREATE_NOTICE,
	payload,
});
