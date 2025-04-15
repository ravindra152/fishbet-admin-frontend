/* eslint-disable no-param-reassign */
import { takeLatest, put, select } from 'redux-saga/effects';
import {
	// getAdminUsers,
	// getAdminUserDetails,
	// // createAdminUser,
	// createSuperAdminUser,
	// superAdminViewToggleStatus,
	// updateSuperAdminUser,
	// updateTenantAdminUser,
	getAllGroups,
} from '../../network/getRequests';

import { toggleStaffStatus } from '../../network/putRequests';
import { showToastr } from '../../utils/helpers';

import {
	// getAdminUsersStart,
	// getAdminUsersSuccess,
	// getAdminUsersFailure,
	// updateSuperAdminUserStart,
	// updateSuperAdminUserComplete,
	// getAdminUserDetailsStart,
	// getAdminUserDetailsSuccess,
	// getAdminUserDetailsFailure,
	// createSuperAdminUserStart,
	// createSuperAdminUserComplete,
	// updateSuperAdminStatusStart,
	// updateSuperAdminStatusComplete,
	updateSuperAdminStatusSuccess,
	updateSuperAdminStatusFailure,
	getAllGroupsSuccess,
	getAllGroupsFailure,
} from './actions';

import { getAdminDetailsSuccess } from '../actions';

import {
	GET_ALL_GROUP_START,
	UPDATE_SUPER_ADMIN_STATUS_START,
} from './actionTypes';
// // import { AdminsRoutes, TenantRoutes } from '../../routes'
// // import { getAllAdminsStart } from '../redux-slices/admins'

// function * getAdminUserDetailsWorker (action) {
//   try {
//     const { adminUserId, isTenant = false } = action && action.payload
//     const { data } = yield getAdminUserDetails({ adminUserId, isTenant })

//     yield put(getAdminUserDetailsSuccess(data?.data?.adminDetails))
//   } catch (e) {
//     yield toast(e?.response?.data?.errors?.message, 'error')

//     yield put(getAdminUserDetailsFailure(e?.response?.data?.errors?.message))
//   }
// }

// function * getAdminUsersWorker (action) {
//   const { limit, pageNo, sort, roleId } = action && action.payload
//   try {
//     const { data } = yield getAdminUsers(limit, pageNo, sort, roleId)

//     yield put(getAdminUsersSuccess(data?.data?.adminDetails))
//   } catch (e) {
//     yield toast(e?.response?.data?.errors?.message, 'error')

//     yield put(getAdminUsersFailure(e?.response?.data?.errors?.message))
//   }
// }

// function * createSuperAdminUserWorker (action) {
//   try {
//     const { data, navigate } = action && action.payload

//     yield createSuperAdminUser(data)

//     yield put(createSuperAdminUserComplete())

//     yield toast(`${data?.role} Created Successfully`, 'success')

//     navigate(AdminsRoutes.Admins)
//   } catch (e) {
//     yield put(createSuperAdminUserComplete())

//     yield toast(e?.response?.data?.errors?.message, 'error')
//   }
// }

// function * updateSuperAdminUserWorker (action) {
//   try {
//     const { data, navigate, profile } = action && action.payload

//     yield updateSuperAdminUser(data)

//     profile
//       ? (setTimeout(() => {
//           navigate(AdminsRoutes.Profile)
//         }
//         , 7000))
//       : navigate(AdminsRoutes.Admins)

//     yield put(updateSuperAdminUserComplete())

//     yield toast(`${data?.role} Updated Successfully`, 'success')
//   } catch (e) {
//     yield put(updateSuperAdminUserComplete())

//     yield toast(e?.response?.data?.errors?.message, 'error')
//   }
// }

function* updateSuperAdminStatusWorker(action) {
	try {
		const { payload } = action;

		yield toggleStaffStatus(payload);

		yield put(updateSuperAdminStatusSuccess());

		const { adminDetails } = yield select((state) => state.AllAdmins);

		const newAdminRow = adminDetails?.rows?.map((admin) => {
			if (admin?.adminUserId === payload.adminId) {
				admin.isActive = payload.status;
			}
			return admin;
		});
		
		yield put(
			getAdminDetailsSuccess({
				...adminDetails,
				rows: newAdminRow,
			})
		);

		showToastr({
			message: 'Status updated Successfully',
			type: 'success',
		});
	} catch (e) {
		yield put(updateSuperAdminStatusFailure());

		showToastr({
			message: e?.response?.data?.errors?.message || e.message,
			type: 'error',
		});
	}
}

function* getAllGroupsWorker() {
	try {
		const { data } = yield getAllGroups();
		yield put(getAllGroupsSuccess(data?.data?.groupNames));
	} catch (e) {
		yield put(getAllGroupsFailure(e?.response?.data?.errors?.message));
	}
}

export default function* adminUserWatcher() {
	yield takeLatest(GET_ALL_GROUP_START, getAllGroupsWorker);
	yield takeLatest(
		UPDATE_SUPER_ADMIN_STATUS_START,
		updateSuperAdminStatusWorker
	);
}
