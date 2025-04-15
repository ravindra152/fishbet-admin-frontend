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
	CREATE_CHATRULE_START,
	DELETE_CHATRULE,
	EDIT_CHATRULE_START,
	FETCH_CHATRULE_START,
} from './actionTypes';
import {
	createChatRuleFail,
	createChatRuleSuccess,
	editChatRuleFail,
	editChatRuleSuccess,
	fetchChatRuleFail,
	fetchChatRuleSuccess,
} from './actions';
import { getChatRuleDetails } from '../../network/getRequests';
import { showToastr } from '../../utils/helpers';
import { createChatRule } from '../../network/postRequests';
import { updateChatRule } from '../../network/putRequests';
import { deleteChatRule } from '../../network/deleteRequests';

// worker
function* fetchChatRule(action) {
	try {
		const payload = action && action.payload;
		const response = yield call(getChatRuleDetails, payload);
		yield put(fetchChatRuleSuccess(response?.data?.data));
	} catch (error) {
		yield put(fetchChatRuleFail(error));
	}
}

function* createChatRuleWorker(action) {
	try {
		const { data, onSuccess } = action && action.payload;
		yield (createChatRule(data));

		showToastr({
			message: `Rule Created Successfully`,
			type: 'success',
		});

		yield put(createChatRuleSuccess());
		onSuccess();
	} catch (e) {
		yield put(createChatRuleFail());
	}
}
function* updateChatRuleWorker(action) {
	try {
		const { data, onSuccess } = action && action.payload;
		yield updateChatRule(data);

		showToastr({
			message: `Rule Updated Successfully`,
			type: 'success',
		});
		yield put(editChatRuleSuccess());
		onSuccess();
	} catch (e) {
		yield put(editChatRuleFail());
	}
}
function* deleteChatRuleWorker(action) {
	console.log('action: ', action);
	try {
		const { data, onSuccess } = action && action.payload;
		yield deleteChatRule(data);

		showToastr({
			message: `Rule Deleted Successfully`,
			type: 'success',
		});
		onSuccess();
	} catch (e) {
		console.log('e: ', e);
	}
}

// watchers
export function* createChatRuleWatcher() {
	yield takeLatest(CREATE_CHATRULE_START, createChatRuleWorker);
}
export function* updateChatRuleWatcher() {
	yield takeLatest(EDIT_CHATRULE_START, updateChatRuleWorker);
}
export function* fetchChatRuleWatcher() {
	yield takeEvery(FETCH_CHATRULE_START, fetchChatRule);
}
export function* deleteChatRuleWatcher() {
	yield takeLatest(DELETE_CHATRULE, deleteChatRuleWorker);
}

// saga
function* ChatRuleSaga() {
	yield all([fork(createChatRuleWatcher)]);
	yield all([fork(fetchChatRuleWatcher)]);
	yield all([fork(updateChatRuleWatcher)]);
	yield all([fork(deleteChatRuleWatcher)]);
}

export default ChatRuleSaga;
