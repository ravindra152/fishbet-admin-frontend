import {
	GET_ALL_SOCIAL_LINKS,
	GET_ALL_SOCIAL_LINKS_SUCCESS,
	GET_ALL_SOCIAL_LINKS_FAIL,
	CREATE_SOCIAL_LINK,
	CREATE_SOCIAL_LINK_SUCCESS,
	CREATE_SOCIAL_LINK_FAIL,
	UPDATE_SOCIAL_LINK,
	UPDATE_SOCIAL_LINK_SUCCESS,
	UPDATE_SOCIAL_LINK_FAIL,
	DELETE_SOCIAL_LINK,
	DELETE_SOCIAL_LINK_SUCCESS,
	DELETE_SOCIAL_LINK_FAIL,
	// TOGGLE_SOCIAL_LINK_STATUS,
	// TOGGLE_SOCIAL_LINK_STATUS_SUCCESS,
	// TOGGLE_SOCIAL_LINK_STATUS_FAIL,
  } from './actionTypes';
  
  // Get All
  export const getAllSocialLinks = (payload) => ({
	type: GET_ALL_SOCIAL_LINKS,
	payload,
  });
  
  export const getAllSocialLinksSuccess = (payload) => ({
	type: GET_ALL_SOCIAL_LINKS_SUCCESS,
	payload,
  });
  
  export const getAllSocialLinksFail = (payload) => ({
	type: GET_ALL_SOCIAL_LINKS_FAIL,
	payload,
  });
  
  // Create
  export const createSocialLink = (payload) => {
	return {
	  type: CREATE_SOCIAL_LINK,
	  payload,
	};
  };
  
  
  export const createSocialLinkSuccess = (payload) => ({
	type: CREATE_SOCIAL_LINK_SUCCESS,
	payload,
  });
  
  export const createSocialLinkFail = (payload) => ({
	type: CREATE_SOCIAL_LINK_FAIL,
	payload,
  });
  
  // Update
  export const updateSocialLink = (payload) => ({
	type: UPDATE_SOCIAL_LINK,
	payload,
  });
  
  export const updateSocialLinkSuccess = (payload) => ({
	type: UPDATE_SOCIAL_LINK_SUCCESS,
	payload,
  });
  
  export const updateSocialLinkFail = (payload) => ({
	type: UPDATE_SOCIAL_LINK_FAIL,
	payload,
  });
  
  // Delete
  export const deleteSocialLink = (payload) => ({
	type: DELETE_SOCIAL_LINK,
	payload,
  });
  
  export const deleteSocialLinkSuccess = (payload) => ({
	type: DELETE_SOCIAL_LINK_SUCCESS,
	payload,
  });
  
  export const deleteSocialLinkFail = (payload) => ({
	type: DELETE_SOCIAL_LINK_FAIL,
	payload,
  });
  
  // Toggle Active Status
//   export const toggleSocialLinkStatus = (payload) => ({
// 	type: TOGGLE_SOCIAL_LINK_STATUS,
// 	payload,
//   });
  
//   export const toggleSocialLinkStatusSuccess = (payload) => ({
// 	type: TOGGLE_SOCIAL_LINK_STATUS_SUCCESS,
// 	payload,
//   });
  
//   export const toggleSocialLinkStatusFail = (payload) => ({
// 	type: TOGGLE_SOCIAL_LINK_STATUS_FAIL,
// 	payload,
//   });
  