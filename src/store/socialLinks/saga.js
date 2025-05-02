import { put, takeLatest, all, fork, select } from 'redux-saga/effects';

import {
  getAllSocialLinksSuccess,
  getAllSocialLinksFail,
  createSocialLinkSuccess,
  createSocialLinkFail,
  updateSocialLinkSuccess,
  updateSocialLinkFail,
  deleteSocialLinkSuccess,
  deleteSocialLinkFail,
  // toggleSocialLinkStatusSuccess,
  // toggleSocialLinkStatusFail,
} from './actions';

import {
  GET_ALL_SOCIAL_LINKS,
  CREATE_SOCIAL_LINK,
  UPDATE_SOCIAL_LINK,
  DELETE_SOCIAL_LINK,
  // TOGGLE_SOCIAL_LINK_STATUS,
} from './actionTypes';

import {
  getAllSocialLinks,
} from '../../network/getRequests';
import {
  updateSocialLink,
  // toggleSocialLinkStatus,
} from '../../network/putRequests';
import { createSocialLink } from '../../network/postRequests';
import {deleteSocialLink} from '../../network/deleteRequests'

import { showToastr } from '../../utils/helpers';
function* getAllSocialLinksWorker(action) {
  const payload = action?.payload;
  try {
    const { data } = yield getAllSocialLinks(payload);

    yield put(getAllSocialLinksSuccess(data?.data?.socialLinks));
  } catch (error) {
    yield put(
      getAllSocialLinksFail(error?.response?.data?.errors?.[0]?.description)
    );
  }
}
function* createSocialLinkWorker(action) {
  try {
    const { socialLinkData, navigate } = action?.payload;
    yield createSocialLink(socialLinkData);
    showToastr({
      message: 'Social Link Created Successfully',
      type: 'success',
    });

    yield put(createSocialLinkSuccess());

    if (navigate) {
      navigate('/social-links');
    }
  } catch (e) {
    yield put(createSocialLinkFail());

    showToastr({
      message: e?.response?.data?.errors?.message || e.message,
      type: 'error',
    });
  }
}
function* updateSocialLinkWorker(action) {
  try {
    const { socialLinkData, navigate } = action?.payload;

    yield updateSocialLink(socialLinkData);

    showToastr({
      message: 'Social Link Updated Successfully',
      type: 'success',
    });

    yield put(updateSocialLinkSuccess());

    if (navigate) {
      navigate('/social-links');
    }
  } catch (e) {
    yield put(updateSocialLinkFail());

    showToastr({
      message: e?.response?.data?.errors?.message || e.message,
      type: 'error',
    });
  }
}
function* deleteSocialLinkWorker(action) {
  try {
    const { socialLinkId } = action?.payload;

    yield deleteSocialLink({ socialLinkId });

    showToastr({
      message: 'Social Link Deleted Successfully',
      type: 'success',
    });

    yield put(deleteSocialLinkSuccess());
  } catch (e) {
    yield put(deleteSocialLinkFail());

    showToastr({
      message: e?.response?.data?.errors?.message || e.message,
      type: 'error',
    });
  }
}
// function* toggleSocialLinkStatusWorker(action) {
//   try {
//     const payload = action?.payload;

//     yield toggleSocialLinkStatus(payload);

//     showToastr({
//       message: 'Social Link Status Updated Successfully',
//       type: 'success',
//     });
//     const { socialLinks } = yield select((state) => state.SocialLinks);

//     const updatedLinks = socialLinks?.map((link) => {
//       if (link?.socialLinkId === payload.socialLinkId) {
//         link.isActive = payload.status;
//       }
//       return link;
//     });

//     // yield put(
//     //   getAllSocialLinksSuccess(updatedLinks)
//     // );

//     yield put(toggleSocialLinkStatusSuccess());
//   } catch (e) {
//     yield put(toggleSocialLinkStatusFail());

//     showToastr({
//       message: e?.response?.data?.errors?.message || e.message,
//       type: 'error',
//     });
//   }
// }

export function* watchSocialLinks() {
  yield takeLatest(GET_ALL_SOCIAL_LINKS, getAllSocialLinksWorker);
  yield takeLatest(CREATE_SOCIAL_LINK, createSocialLinkWorker);
  yield takeLatest(UPDATE_SOCIAL_LINK, updateSocialLinkWorker);
  yield takeLatest(DELETE_SOCIAL_LINK, deleteSocialLinkWorker);
  // yield takeLatest(TOGGLE_SOCIAL_LINK_STATUS, toggleSocialLinkStatusWorker);
}

function* SocialLinksSaga() {
  yield all([fork(watchSocialLinks)]);
}

export default SocialLinksSaga;
