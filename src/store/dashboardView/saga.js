import { put, takeEvery, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import {
	GET_LIVE_PLAYER_START,
	GET_DEMOGRAPHIC_START,
	GET_GAME_REPORT_START,
	GET_KPI_REPORT_START,
	GET_KPI_SUMMARY_START,
} from './actionTypes';
import {
	getLivePlayerInfoStart,
	getLivePlayerInfoSuccess,
	getLivePlayerInfoFail,
	getDemographicStart,
	getDemographicSuccess,
	getDemographicFail,
	getGameReportStart,
	getGameReportSuccess,
	getGameReportFail,
	getKPIReportStart,
	getKPIReportSuccess,
	getKPIReportFail,
	getKPISummaryStart,
	getKPISummarySuccess,
	getKPISummaryFail,
} from './actions';
import { showToastr } from '../../utils/helpers';
import {
	getDashboardLiveInfoService,
	getDashboardDemoGraphicService,
	getDashboardGameReportService,
	getDashboardKPIReport,
	getDashboardKPISummary,
} from '../../network/getRequests';

function* getLivePlayerData(action) {
	try {
		yield getLivePlayerInfoStart();
		const { data } = yield getDashboardLiveInfoService(action?.payload);
		yield put(getLivePlayerInfoSuccess(data?.data));
	} catch (e) {
		yield put(getLivePlayerInfoFail());

		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* getDemoGraphicData(action) {
	try {
		yield getDemographicStart();
		const { data } = yield getDashboardDemoGraphicService(action.payload);
		yield put(getDemographicSuccess(data?.data?.demographic));
	} catch (e) {
		yield put(getDemographicFail());

		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* getGameReportData(action) {
	try {
		yield getGameReportStart();
		const { data } = yield getDashboardGameReportService(action.payload);
		yield put(
			getGameReportSuccess({
				data: data?.data?.gameReport,
				tab: action.payload?.tab,
			})
		);
	} catch (e) {
		yield put(getGameReportFail());

		showToastr({
			message: e?.response?.data?.errors?.message || e?.message,
			type: 'error',
		});
	}
}
function* getKpiReportData(action) {
	try {
		yield getKPIReportStart();
		const { data } = yield getDashboardKPIReport(action.payload);
		yield put(
			getKPIReportSuccess({
				data: data?.data?.kpiReport,
				tab: action.payload?.tab,
			})
		);
	} catch (e) {
		yield put(getKPIReportFail());

		showToastr({
			message: e?.response?.data?.errors?.message || e?.message,
			type: 'error',
		});
	}
}

function* getKPISummaryData(action) {
	try {
		yield getKPISummaryStart();
		const { data } = yield getDashboardKPISummary(action.payload);
		yield put(
			getKPISummarySuccess({ data: data?.data, tab: action.payload?.tab })
		);
	} catch (e) {
		yield put(getKPISummaryFail());

		showToastr({
			message: e?.response?.data?.errors?.message || e?.message,
			type: 'error',
		});
	}
}

export function* watchDashboardViewData() {
	yield takeEvery(GET_LIVE_PLAYER_START, getLivePlayerData);
	yield takeEvery(GET_DEMOGRAPHIC_START, getDemoGraphicData);
	yield takeEvery(GET_GAME_REPORT_START, getGameReportData);
	yield takeEvery(GET_KPI_REPORT_START, getKpiReportData);
	yield takeEvery(GET_KPI_SUMMARY_START, getKPISummaryData);
}

function* dashboardSaga() {
	yield all([fork(watchDashboardViewData)]);
}

export default dashboardSaga;
