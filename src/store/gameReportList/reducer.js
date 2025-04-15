import {
	GET_GAME_REPORT_LIST_START,
	GET_GAME_REPORT_LIST_SUCCESS,
	GET_GAME_REPORT_LIST_FAIL,
} from './actionTypes';

const INIT_STATE = {
	isGameReportLoading: false,
	gameReport: {},
};

function GameReportList(state = INIT_STATE, { type, payload } = {}) {
	switch (type) {
		case GET_GAME_REPORT_LIST_START:
			return {
				...state,
				isGameReportLoading: true,
			};

		case GET_GAME_REPORT_LIST_SUCCESS:
			return {
				...state,
				isGameReportLoading: false,
				gameReport: {
					game: payload?.data?.gameReport,
					totalPages: payload?.data?.totalPages,
				},
			};

		case GET_GAME_REPORT_LIST_FAIL:
			return {
				...state,
				isGameReportLoading: false,
				gameReport: {},
			};

		default:
			return state;
	}
}

export default GameReportList;
