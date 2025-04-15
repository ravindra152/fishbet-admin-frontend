import {
	all,
	call,
	fork,
	put,
	takeEvery,
	takeLatest,
} from 'redux-saga/effects';
// Login Redux States
import {
	CREATE_OFFENSIVE_WORDS_START,
	DELETE_OFFENSIVE_WORDS,
	EDIT_OFFENSIVE_WORDS_START,
	FETCH_OFFENSIVE_WORDS_START,
} from './actionTypes';
import {
	createOffensiveWordFail,
	createOffensiveWordSuccess,
	editOffensiveWordFail,
	editOffensiveWordSuccess,
	fetchOffensiveWordsFail,
	fetchOffensiveWordsSuccess,
} from './actions';
import { getOffensiveWordsDetails } from '../../network/getRequests';
import { showToastr } from '../../utils/helpers';
import { createOffensiveWords } from '../../network/postRequests';
import { updateOffensiveWords } from '../../network/putRequests';
import { deleteOffensiveWords } from '../../network/deleteRequests';

// worker
function* fetchOffensiveWords(action) {
	try {
		const payload = action && action.payload;
		const response = yield call(getOffensiveWordsDetails, payload);
		yield put(fetchOffensiveWordsSuccess(response?.data?.data));
	} catch (error) {
		yield put(fetchOffensiveWordsFail(error));
	}
}

function* createOffensiveWordsWorker(action) {
	try {
		const { data, onSuccess } = action && action.payload;
		yield (createOffensiveWords(data));

		showToastr({
			message: `Word Created Successfully`,
			type: 'success',
		});

		yield put(createOffensiveWordSuccess());
		onSuccess();
	} catch (e) {
		yield put(createOffensiveWordFail());
	}
}
function* updateOffensiveWordsWorker(action) {
	try {
		const { data, onSuccess } = action && action.payload;
		yield updateOffensiveWords(data);

		showToastr({
			message: `Word Updated Successfully`,
			type: 'success',
		});
		yield put(editOffensiveWordSuccess());
		onSuccess();
	} catch (e) {
		yield put(editOffensiveWordFail());
	}
}
function* deleteOffensiveWordsWorker(action) {
	try {
		const { data, onSuccess } = action && action.payload;
		yield deleteOffensiveWords(data);

		showToastr({
			message: `Word Deleted Successfully`,
			type: 'success',
		});
		onSuccess();
	} catch (e) {
		console.log('e: ', e);
	}
}

// watchers
export function* createOffensiveWordsWatcher() {
	yield takeLatest(CREATE_OFFENSIVE_WORDS_START, createOffensiveWordsWorker);
}
export function* updateOffensiveWordsWatcher() {
	yield takeLatest(EDIT_OFFENSIVE_WORDS_START, updateOffensiveWordsWorker);
}
export function* fetchOffensiveWordsWatcher() {
	yield takeEvery(FETCH_OFFENSIVE_WORDS_START, fetchOffensiveWords);
}
export function* deleteOffensiveWordsWatcher() {
	yield takeLatest(DELETE_OFFENSIVE_WORDS, deleteOffensiveWordsWorker);
}

// saga
function* offensiveWordsSaga() {
	yield all([fork(createOffensiveWordsWatcher)]);
	yield all([fork(fetchOffensiveWordsWatcher)]);
	yield all([fork(updateOffensiveWordsWatcher)]);
	yield all([fork(deleteOffensiveWordsWatcher)]);
}

export default offensiveWordsSaga;
