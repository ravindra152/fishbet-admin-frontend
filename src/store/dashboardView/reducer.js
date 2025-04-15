import {
	GET_LIVE_PLAYER_START,
	GET_LIVE_PLAYER_SUCCESS,
	GET_LIVE_PLAYER_FAIL,
	GET_DEMOGRAPHIC_START,
	GET_DEMOGRAPHIC_SUCCESS,
	GET_DEMOGRAPHIC_FAIL,
	GET_GAME_REPORT_START,
	GET_GAME_REPORT_SUCCESS,
	GET_GAME_REPORT_FAIL,
	GET_KPI_REPORT_START,
	GET_KPI_REPORT_SUCCESS,
	GET_KPI_REPORT_FAIL,
	GET_KPI_SUMMARY_START,
	GET_KPI_SUMMARY_SUCCESS,
	GET_KPI_SUMMARY_FAIL,
} from './actionTypes';

const INIT_STATE = {
	isLivePlayerLoading: false,
	iskPIReportLoading: false,
	iskPISummaryLoading: false,
	livePlayerData: {},
	isDemographicLoading: false,
	demoGraphicData: [],
	kPISummary: { Banking: [], CASINO: [] },
	kPIReport: { game: [], provider: [] },
	isGameReportLoading: false,
	gameReport: { game: [], provider: [] },
};

function DashboardView(state = INIT_STATE, { type, payload } = {}) {
	switch (type) {
		case GET_LIVE_PLAYER_START:
			return {
				...state,
				isLivePlayerLoading: true,
				livePlayerData: {},
			};

		case GET_LIVE_PLAYER_SUCCESS:
			return {
				...state,
				isLivePlayerLoading: false,
				livePlayerData: payload,
			};

		case GET_LIVE_PLAYER_FAIL:
			return {
				...state,
				isLivePlayerLoading: false,
				livePlayerData: {},
			};
		case GET_DEMOGRAPHIC_START:
			return {
				...state,
				isDemographicLoading: true,
				demoGraphicData: [],
			};

		case GET_DEMOGRAPHIC_SUCCESS:
			return {
				...state,
				isDemographicLoading: false,
				demoGraphicData: payload,
			};

		case GET_DEMOGRAPHIC_FAIL:
			return {
				...state,
				isDemographicLoading: false,
				demoGraphicData: [],
			};
		case GET_GAME_REPORT_START:
			return {
				...state,
				isGameReportLoading: true,
			};

		case GET_GAME_REPORT_SUCCESS:
			return {
				...state,
				isGameReportLoading: false,
				gameReport: {
					...state.gameReport,
					[payload.tab]: payload.data,
				},
			};

		case GET_GAME_REPORT_FAIL:
			return {
				...state,
				isGameReportLoading: false,
				gameReport: { game: [], provider: [] },
			};

		case GET_KPI_REPORT_START:
			return {
				...state,
				iskPIReportLoading: true,
			};

		case GET_KPI_REPORT_SUCCESS:
			return {
				...state,
				iskPIReportLoading: false,
				kPIReport: {
					...state.kPIReport,
					[payload.tab]: payload.data,
				},
			};

		case GET_KPI_REPORT_FAIL:
			return {
				...state,
				iskPIReportLoading: false,
				kPIReport: { game: [], provider: [] },
			};

		case GET_KPI_SUMMARY_START:
			return {
				...state,
				iskPISummaryLoading: true,
			};

		case GET_KPI_SUMMARY_SUCCESS:
			return {
				...state,
				iskPISummaryLoading: false,
				kPISummary: {
					...state.kPISummary,
					[payload?.tab]: payload.data[payload?.tab],
				},
			};

		case GET_KPI_SUMMARY_FAIL:
			return {
				...state,
				iskPISummaryLoading: false,
				kPISummary: { Banking: [], CASINO: [] },
			};
		default:
			return state;
	}
}

export default DashboardView;
