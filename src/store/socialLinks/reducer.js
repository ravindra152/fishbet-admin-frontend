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

const INIT_STATE = {
	socialLinks: {},
	error: null,
	isLoading: false,

	isCreateLink: false,
	createLinkLoading: false,
	createLinkError: null,

	isUpdateLink: false,
	updateLinkLoading: false,
	updateLinkError: null,

	isDeleteLink: false,
	deleteLinkLoading: false,
	deleteLinkError: null,

	// toggleStatusLoading: false,
	// toggleStatusError: null,
	// toggleStatusSuccess: false,
};

const socialLinksReducer = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		// Get All
		case GET_ALL_SOCIAL_LINKS:
			return {
				...state,
				isLoading: true,
				socialLinks: payload,
			};

		case GET_ALL_SOCIAL_LINKS_SUCCESS:
			return {
				...state,
				isLoading: false,
				socialLinks: payload,
				error: null,
			};

		case GET_ALL_SOCIAL_LINKS_FAIL:
			return {
				...state,
				isLoading: false,
				error: payload,
			};

		// Create
		case CREATE_SOCIAL_LINK:
			return {
				...state,
				createLinkLoading: true,
			};

		//   case CREATE_SOCIAL_LINK_SUCCESS:
		// 	return {
		// 	  ...state,
		// 	  createLinkLoading: false,
		// 	  isCreateLink: true,
		// 	  createLinkError: null,
		// 	};

		case CREATE_SOCIAL_LINK_SUCCESS:
			return {
				...state,
				createLinkLoading: false,
				isCreateLink: true,
				createLinkError: null,
				socialLinks: {
					...state.socialLinks,
					facebook: payload.facebook,
					twitter: payload.twitter,
					instagram: payload.instagram,
					linkedin: payload.linkedin,
				},
			};


		case CREATE_SOCIAL_LINK_FAIL:
			return {
				...state,
				createLinkLoading: false,
				createLinkError: payload,
				isCreateLink: false,
			};

		// Update
		case UPDATE_SOCIAL_LINK:
			return {
				...state,
				updateLinkLoading: true,
			};

		//   case UPDATE_SOCIAL_LINK_SUCCESS:
		// 	return {
		// 	  ...state,
		// 	  updateLinkLoading: false,
		// 	  isUpdateLink: true,
		// 	  updateLinkError: null,
		// 	};

		case UPDATE_SOCIAL_LINK_SUCCESS:
			return {
				...state,
				updateLinkLoading: false,
				isUpdateLink: true,
				updateLinkError: null,
				socialLinks: {
					...state.socialLinks,
					facebook: payload.facebook,
					twitter: payload.twitter,
					instagram: payload.instagram,
					linkedin: payload.linkedin,
				},
			};


		case UPDATE_SOCIAL_LINK_FAIL:
			return {
				...state,
				updateLinkLoading: false,
				updateLinkError: payload,
				isUpdateLink: false,
			};

		// Delete
		case DELETE_SOCIAL_LINK:
			return {
				...state,
				deleteLinkLoading: true,
			};

		case DELETE_SOCIAL_LINK_SUCCESS:
			return {
				...state,
				deleteLinkLoading: false,
				isDeleteLink: true,
				deleteLinkError: null,
			};

		case DELETE_SOCIAL_LINK_FAIL:
			return {
				...state,
				deleteLinkLoading: false,
				deleteLinkError: payload,
				isDeleteLink: false,
			};

		// Toggle Status
		//   case TOGGLE_SOCIAL_LINK_STATUS:
		// 	return {
		// 	  ...state,
		// 	  toggleStatusLoading: true,
		// 	};

		//   case TOGGLE_SOCIAL_LINK_STATUS_SUCCESS:
		// 	return {
		// 	  ...state,
		// 	  toggleStatusLoading: false,
		// 	  toggleStatusSuccess: true,
		// 	  toggleStatusError: null,
		// 	};

		//   case TOGGLE_SOCIAL_LINK_STATUS_FAIL:
		// 	return {
		// 	  ...state,
		// 	  toggleStatusLoading: false,
		// 	  toggleStatusError: payload,
		// 	  toggleStatusSuccess: false,
		// 	};

		default:
			return { ...state };
	}
};

export default socialLinksReducer;
