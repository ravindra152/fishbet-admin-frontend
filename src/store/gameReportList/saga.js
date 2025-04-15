import { put, takeEvery, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import { GET_GAME_REPORT_LIST_START } from './actionTypes';
import {
	getGameReportListStart,
	getGameReportListSuccess,
	getGameReportListFail,
} from './actions';
import { showToastr } from '../../utils/helpers';
import { getDashboardGameReportService } from '../../network/getRequests';

function* getGameReportData(action) {
	try {
		yield getGameReportListStart();
		const { data } = yield getDashboardGameReportService(action.payload);

		yield put(
			getGameReportListSuccess({
				data: data?.data,
			})
		);
	} catch (e) {
		yield put(getGameReportListFail());

		showToastr({
			message: e?.response?.data?.errors?.message || e?.message,
			type: 'error',
		});
	}
}

export function* watchGameReportDataList() {
	yield takeEvery(GET_GAME_REPORT_LIST_START, getGameReportData);
}

function* gameReportSaga() {
	yield all([fork(watchGameReportDataList)]);
}

export default gameReportSaga;
