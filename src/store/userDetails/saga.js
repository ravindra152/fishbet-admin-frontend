import { put, takeLatest, all, fork } from 'redux-saga/effects';

// Crypto Redux States
import {
	getUserDetailsSuccess,
	getUserDetailsFail,
	getUserDocumentsSuccess,
	getUserDocumentsFail,
	getUserBonusSuccess,
	getUserBonusFail,
	getUserCommentsSuccess,
	getUserCommentsFail,
	createUserCommentSuccess,
	createUserCommentFail,
	resetUserLimitFail,
	resetUserLimitSuccess,
	updateSAUserStatusFail,
	updateSAUserStatusSuccess,
	markUserAsInternalSuccess,
	markUserAsInternalFail,
	verifyUserEmailSuccess,
	verifyUserEmailFail,
	updateUserTagsSuccess,
	updateUserTagsFail,
	getDuplicateUsersSuccess,
	getDuplicateUsersFail,
	getAllBonusSuccess,
	getAllBonusFail,
	getUserBonusDetailsSuccess,
	getUserBonusDetailsFail,
	issueBonusSuccess,
	issueBonusFail,
	depositToOtherSuccess,
	depositToOtherFail,
	updateUserInfoSuccess,
	updateUserInfoFail,
	sendPasswordResetSuccess,
	sendPasswordResetFail,
	updateUserPasswordSuccess,
	updateUserPasswordFail,
	markDocumentRequiredSuccess,
	markDocumentRequiredFail,
	cancelUserBonusSuccess,
	cancelUserBonusFail,
	resolveUserCommentSuccess,
	resolveUserCommentFail,
	acceptUserDocsSuccess,
	acceptUserDocsFail,
	updateuserkyclevelSuccess,
	updateuserkyclevelFail,
	getReferredUsersSuccess,
	getReferredUsersFail,
} from './actions';
import {
	ACCEPT_USER_DOC,
	CANCEL_USER_BONUS,
	CREATE_USER_COMMENT,
	DEPOSIT_TO_OTHER,
	DISABLE_USER,
	GET_ALL_BONUS,
	GET_BONUS_DETAILS,
	GET_DUPLICATE_USERS,
	GET_USER_BONUS,
	GET_USER_COMMENTS,
	GET_USER_DETAILS,
	GET_USER_DOCUMENTS,
	ISSUE_BONUS,
	MARK_DOCUMENT_REQUIRED,
	MARK_USER_AS_INTERNAL,
	RESET_USER_LIMIT,
	RESOLVE_USER_COMMENT,
	SEND_PASSWORD_RESET,
	UPDATE_SA_USER_STATUS,
	UPDATE_USER_INFO,
	UPDATE_USER_PASSWORD,
	UPDATE_USER_TAGS,
	VERIFY_USER_EMAIL,
	UPDATE_KYC_LEVEL,
	GET_REFERRED_USERS_START,
} from './actionTypes';
import {
	getAllBonus,
	getBonusDetails,
	getCommentsList,
	getDuplicateUsers,
	getReferredUsers,
	getUserBonuses,
	getUserDetails,
	getUserDocument,
} from '../../network/getRequests';
import {
	addDepositToOtherCall,
	createUserCommentEntry,
	disableUserCall,
	issueBonus,
	resetDepositLimitCall,
	resetLossLimitCall,
	resetUserLimitCall,
} from '../../network/postRequests';
import { showToastr } from '../../utils/helpers';
import {
	cancelBonus,
	cancelDocumentRequest,
	markUserAsInternal,
	requestDocument,
	resetPasswordEmail,
	resetUserPassword,
	updateComment,
	updateSAUserStatusCall,
	updateUserInfoCall,
	updateUserTags,
	verifyPlayerEmail,
	verifyUserDocument,
	updateuserkycleveCall,
	updateSelfExclusion,
} from '../../network/putRequests';

function* getUserDetailsWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getUserDetails(payload);

		yield put(getUserDetailsSuccess(data?.data?.getUser));
	} catch (e) {
		yield put(getUserDetailsFail(e.message));
	}
}

function* getUserDocumentsWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getUserDocument(payload);

		yield put(getUserDocumentsSuccess(data?.data?.userDocument));
	} catch (e) {
		yield put(getUserDocumentsFail(e.message));
	}
}

function* getUserBonusWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getUserBonuses(payload);

		yield put(getUserBonusSuccess(data?.data?.userBonus));
	} catch (e) {
		yield put(getUserBonusFail(e.message));
	}
}

function* getUserCommentsWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getCommentsList(payload);

		yield put(getUserCommentsSuccess(data?.data?.comment));
	} catch (e) {
		yield put(getUserCommentsFail(e.message));
	}
}

function* createUserCommentWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield createUserCommentEntry(payload);

		yield put(createUserCommentSuccess(data?.data?.comment));
	} catch (e) {
		yield put(createUserCommentFail(e.message));
	}
}

function* resetUserLimitWorker(action) {
	try {
		const payload = action && action.payload;
		if (payload?.type === 'wager') {
			yield resetUserLimitCall(payload);
		} else if (payload?.type === 'deposit') {
			yield resetDepositLimitCall(payload);
		} else {
			yield resetLossLimitCall(payload);
		}
		showToastr({
			message: `Limit ${payload.reset ? 'Reset' : 'Set'} Successfully`,
			type: 'success',
		});
		yield put(resetUserLimitSuccess(true));
	} catch (e) {
		yield put(resetUserLimitFail(e.message));
		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* disableUserWorker(action) {
	try {
		const payload = action && action.payload;
		// if (payload?.timeLimit) {
		const { data } = yield updateSelfExclusion(payload);
		yield put(resetUserLimitSuccess(data?.data));
		// } else {
		// 	const { data } = yield disableUserCall(payload);
		// 	yield put(resetUserLimitSuccess(data?.data));
		// }
		showToastr({
			message: `User ${payload.reset ? 'Enabled' : 'Disabled'} Successfully`,
			type: 'success',
		});
	} catch (e) {
		yield put(resetUserLimitFail(e.message));
		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* updateSAUserStatusWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield updateSAUserStatusCall(payload);
		yield put(updateSAUserStatusSuccess(data?.data));

		showToastr({
			message: `Preferences Saved Successfully`,
			type: 'success',
		});
	} catch (e) {
		yield put(updateSAUserStatusFail(e.message));
		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* markUserAsInternalWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield markUserAsInternal(payload);
		yield put(markUserAsInternalSuccess(data?.data));
		showToastr({
			message: `User ${
				action?.payload?.userInternalStatus ? 'mark' : 'Unmark'
			} as Internal`,
			type: 'success',
		});
	} catch (e) {
		yield put(markUserAsInternalFail(e.message));
		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* verifyUserEmailWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield verifyPlayerEmail(payload);
		yield put(verifyUserEmailSuccess(data?.data));

		showToastr({
			message: `User Email Verified Successfully`,
			type: 'success',
		});
	} catch (e) {
		yield put(verifyUserEmailFail(e.message));
		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* updateUserTagsWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield updateUserTags(payload);
		yield put(updateUserTagsSuccess(data?.data));

		showToastr({
			message: `Tags Updated Successfully`,
			type: 'success',
		});
	} catch (e) {
		yield put(updateUserTagsFail(e.message));
		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* getDuplicateUsersWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getDuplicateUsers(payload);
		yield put(getDuplicateUsersSuccess(data?.data?.users));
	} catch (e) {
		yield put(getDuplicateUsersFail(e.message));
		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* getBonusDetailsWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getBonusDetails(payload);
		yield put(getUserBonusDetailsSuccess(data?.data?.bonusDetails));
	} catch (e) {
		yield put(getUserBonusDetailsFail(e.message));
		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* getAllBonusWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getAllBonus(payload);
		yield put(getAllBonusSuccess(data?.data?.bonus));
	} catch (e) {
		yield put(getAllBonusFail(e.message));
		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* issueBonusWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield issueBonus(payload);
		yield put(issueBonusSuccess(data?.data?.bonus));
		showToastr({
			message: `Bonus Issued Successfully`,
			type: 'success',
		});
	} catch (e) {
		yield put(issueBonusFail(e.message));
		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* depositToOtherWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield addDepositToOtherCall(payload);
		yield put(depositToOtherSuccess(data?.data?.bonus));
		showToastr({
			message:
				payload?.purpose === 'purchase'
					? `Deposit Successful`
					: 'Amount Removed from Wallet Successful',
			type: 'success',
		});
	} catch (e) {
		yield put(
			depositToOtherFail(e?.response?.data?.errors?.message || e?.message)
		);
		showToastr({
			message: e?.response?.data?.errors?.message?.message || e.message,
			type: 'error',
		});
	}
}

function* updateUserInfoWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield updateUserInfoCall(payload);
		yield put(updateUserInfoSuccess(data?.data));
		showToastr({
			message: 'User Info Updated Successfully',
			type: 'success',
		});
	} catch (e) {
		yield put(updateUserInfoFail(e.message));
		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* sendPasswordResetWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield resetPasswordEmail(payload);
		yield put(sendPasswordResetSuccess(data?.data));
		showToastr({
			message: 'Reset Link Sent Successfully',
			type: 'success',
		});
	} catch (e) {
		yield put(sendPasswordResetFail(e.message));
		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* updateUserPasswordWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield resetUserPassword(payload);
		yield put(updateUserPasswordSuccess(data?.data));
		showToastr({
			message: 'User Info Updated Successfully',
			type: 'success',
		});
	} catch (e) {
		yield put(updateUserPasswordFail(e.message));
		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* markDocumentRequiredWorker(action) {
	try {
		const payload = action && action.payload;

		if (payload.isRequested) {
			yield requestDocument(payload);
		} else yield cancelDocumentRequest(payload);
		yield put(markDocumentRequiredSuccess(true));
		showToastr({
			message: payload.isRequested
				? 'Document Requested Successfully'
				: 'Document Unrequested Successfully',
			type: 'success',
		});
	} catch (e) {
		yield put(markDocumentRequiredFail(e.message));
		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* cancelUserBonusWorker(action) {
	try {
		const payload = action && action.payload;

		yield cancelBonus(payload);
		yield put(cancelUserBonusSuccess(true));
		showToastr({
			message: 'Bonus Cancelled Successfully',
			type: 'success',
		});
	} catch (e) {
		yield put(cancelUserBonusFail(e.message));
		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* resolveUserCommentWorker(action) {
	try {
		const payload = action && action.payload;

		yield updateComment(payload);
		yield put(resolveUserCommentSuccess(true));
		showToastr({
			message: 'Resolved Successfully',
			type: 'success',
		});
	} catch (e) {
		yield put(resolveUserCommentFail(e.message));
		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* acceptUserDocWorker(action) {
	try {
		const payload = action && action.payload;

		yield verifyUserDocument(payload);
		yield put(acceptUserDocsSuccess(true));
		showToastr({
			message:
				payload.status === 'approved'
					? 'Accepted Successfully'
					: 'Rejected Succesfully',
			type: 'success',
		});
	} catch (e) {
		yield put(acceptUserDocsFail(e.message));
		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* updateuserkyclevelWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield updateuserkycleveCall(payload);
		yield put(updateuserkyclevelSuccess(data));

		showToastr({
			message: `Preferences Saved Successfully`,
			type: 'success',
		});
	} catch (e) {
		yield put(updateuserkyclevelFail(e.message));
		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* getReferredUsersWorker(action) {
	try {
		const payload = action && action.payload;
		const { data } = yield getReferredUsers(payload);

		yield put(getReferredUsersSuccess({ ...data?.data?.referredUsers, totalCommission: data?.data?.totalCommission }));
	} catch (e) {
		yield put(getReferredUsersFail(e.message));
		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* userDetailsWatcher() {
	yield takeLatest(GET_USER_DETAILS, getUserDetailsWorker);
	yield takeLatest(GET_USER_DOCUMENTS, getUserDocumentsWorker);
	yield takeLatest(GET_USER_BONUS, getUserBonusWorker);
	yield takeLatest(GET_USER_COMMENTS, getUserCommentsWorker);
	yield takeLatest(CREATE_USER_COMMENT, createUserCommentWorker);
	yield takeLatest(RESET_USER_LIMIT, resetUserLimitWorker);
	yield takeLatest(DISABLE_USER, disableUserWorker);
	yield takeLatest(UPDATE_SA_USER_STATUS, updateSAUserStatusWorker);
	yield takeLatest(MARK_USER_AS_INTERNAL, markUserAsInternalWorker);
	yield takeLatest(VERIFY_USER_EMAIL, verifyUserEmailWorker);
	yield takeLatest(UPDATE_USER_TAGS, updateUserTagsWorker);
	yield takeLatest(GET_DUPLICATE_USERS, getDuplicateUsersWorker);
	yield takeLatest(GET_BONUS_DETAILS, getBonusDetailsWorker);
	yield takeLatest(GET_ALL_BONUS, getAllBonusWorker);
	yield takeLatest(ISSUE_BONUS, issueBonusWorker);
	yield takeLatest(DEPOSIT_TO_OTHER, depositToOtherWorker);
	yield takeLatest(UPDATE_USER_INFO, updateUserInfoWorker);
	yield takeLatest(UPDATE_USER_PASSWORD, updateUserPasswordWorker);
	yield takeLatest(SEND_PASSWORD_RESET, sendPasswordResetWorker);
	yield takeLatest(MARK_DOCUMENT_REQUIRED, markDocumentRequiredWorker);
	yield takeLatest(CANCEL_USER_BONUS, cancelUserBonusWorker);
	yield takeLatest(RESOLVE_USER_COMMENT, resolveUserCommentWorker);
	yield takeLatest(ACCEPT_USER_DOC, acceptUserDocWorker);
	yield takeLatest(UPDATE_KYC_LEVEL, updateuserkyclevelWorker);
	yield takeLatest(GET_REFERRED_USERS_START, getReferredUsersWorker);
}

function* UserDetailsSaga() {
	yield all([fork(userDetailsWatcher)]);
}

export default UserDetailsSaga;
