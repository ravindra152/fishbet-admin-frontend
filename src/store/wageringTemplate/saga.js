import { put, takeLatest, all, fork } from 'redux-saga/effects';
import { clearEmptyProperty, showToastr } from '../../utils/helpers';
// Crypto Redux States
import {
	getWageringTemplateDetailSuccess,
	getWageringTemplateDetailFail,
	getWageringTemplateDetailsSuccess,
	getWageringTemplateDetailsFail,
	createWageringTemplateDetailsSuccess,
	createWageringTemplateDetailsFail,
	editWageringTemplateDetailsSuccess,
	editWageringTemplateDetailsFail,
	getAllSAWageringTemplatesSuccess,
	getAllSAWageringTemplatesFail,
} from './actions';

import {
	GET_WAGERING_TEMPLATE_DETAIL,
	GET_WAGERING_TEMPLATE_DETAILS,
	CREATE_WAGERING_TEMPLATE_DETAILS,
	EDIT_WAGERING_TEMPLATE_DETAILS,
	GET_ALL_SA_WAGERING_TEMPLATES,
} from './actionTypes';

import {
	getSuperAdminAllWageringTemplate,
	getSuperAdminWageringTemplate,
	getSuperAdminWageringTemplateDetail,
} from '../../network/getRequests';
import { createWageringTemplate } from '../../network/postRequests';
import { updateWageringTemplate } from '../../network/putRequests';

function* getWageringTemplateDetailWorker(action) {
	try {
		const payload = clearEmptyProperty(action && action.payload);
		const { data } = yield getSuperAdminWageringTemplate(payload);
		yield put(getWageringTemplateDetailsSuccess(data?.data?.wageringTemplates));
	} catch (e) {
		yield put(getWageringTemplateDetailsFail(e.message));
	}
}

function* getSAWageringTemplateDetailWorker(action) {
	try {
		const payload = clearEmptyProperty(action && action.payload);
		const { data } = yield getSuperAdminWageringTemplateDetail(payload);
		yield put(getWageringTemplateDetailSuccess(data?.data));
	} catch (e) {
		yield put(getWageringTemplateDetailFail(e.message));
	}
}

function* createWageringTemplateWorker(action) {
	try {
		const { templateData, navigate } = action && action.payload;
		yield createWageringTemplate(templateData);

		showToastr({
			message: `Created Wagering Template Successfully`,
			type: 'success',
		});

		yield put(createWageringTemplateDetailsSuccess());

		if (navigate) yield navigate('/wagering-template');
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors?.message,
			type: 'error',
		});
		yield put(createWageringTemplateDetailsFail());
	}
}

function* editWageringTemplateWorker(action) {
	try {
		const { templateData, navigate } = action && action.payload;
		yield updateWageringTemplate(templateData);

		showToastr({
			message: 'Record updated successfully',
			type: 'success',
		});

		yield put(editWageringTemplateDetailsSuccess());

		if (navigate) yield navigate('/wagering-template');
	} catch (e) {
		showToastr({
			message: e?.response?.data?.errors?.message,
			type: 'error',
		});

		yield put(editWageringTemplateDetailsFail());
	}
}

function* getAllSAWageringTemplatesWorker() {
	try {
		const { data } = yield getSuperAdminAllWageringTemplate();
		yield put(getAllSAWageringTemplatesSuccess(data?.data?.getTemplates));
	} catch (e) {
		yield put(getAllSAWageringTemplatesFail(e.message));
	}
}

function* wageringTemplateWatcher() {
	yield takeLatest(
		GET_WAGERING_TEMPLATE_DETAILS,
		getWageringTemplateDetailWorker
	);
	yield takeLatest(
		GET_WAGERING_TEMPLATE_DETAIL,
		getSAWageringTemplateDetailWorker
	);
	yield takeLatest(
		CREATE_WAGERING_TEMPLATE_DETAILS,
		createWageringTemplateWorker
	);
	yield takeLatest(EDIT_WAGERING_TEMPLATE_DETAILS, editWageringTemplateWorker);
	yield takeLatest(
		GET_ALL_SA_WAGERING_TEMPLATES,
		getAllSAWageringTemplatesWorker
	);
}

function* WageringTemplateDetailsSaga() {
	yield all([fork(wageringTemplateWatcher)]);
}

export default WageringTemplateDetailsSaga;
