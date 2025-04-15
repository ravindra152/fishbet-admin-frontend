import {
	GET_GAME_REPORT_LIST_START,
	GET_GAME_REPORT_LIST_SUCCESS,
	GET_GAME_REPORT_LIST_FAIL,
} from './actionTypes';

export const getGameReportListStart = (payload) => ({
	type: GET_GAME_REPORT_LIST_START,
	payload,
});

export const getGameReportListSuccess = (payload) => ({
	type: GET_GAME_REPORT_LIST_SUCCESS,
	payload,
});

export const getGameReportListFail = (payload) => ({
	type: GET_GAME_REPORT_LIST_FAIL,
	payload,
});
