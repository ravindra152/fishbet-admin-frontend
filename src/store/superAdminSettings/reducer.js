import {
	GET_SA_BANNERS,
	GET_SA_BANNERS_SUCCESS,
	GET_SA_BANNERS_FAIL,
	GET_DOCUMENT_LABEL,
	GET_DOCUMENT_LABEL_SUCCESS,
	GET_DOCUMENT_LABEL_FAIL,
	CREATE_SA_BANNERS_START,
	CREATE_SA_BANNERS_SUCCESS,
	CREATE_SA_BANNERS_FAIL,
	CREATE_KYC_LABELS_START,
	CREATE_KYC_LABELS_SUCCESS,
	CREATE_KYC_LABELS_FAIL,
	EDIT_KYC_LABELS_START,
	EDIT_KYC_LABELS_SUCCESS,
	EDIT_KYC_LABELS_FAIL,
	EDIT_SA_BANNERS_START,
	EDIT_SA_BANNERS_SUCCESS,
	EDIT_SA_BANNERS_FAIL,
	GET_LOYALTY_LEVEL,
	GET_LOYALTY_LEVEL_SUCCESS,
	GET_LOYALTY_LEVEL_FAIL,
	UPDATE_LOYALTY_LEVEL,
	UPDATE_LOYALTY_LEVEL_SUCCESS,
	UPDATE_LOYALTY_LEVEL_FAIL,
	DELETE_SA_BANNERS_START,
	DELETE_SA_BANNERS_SUCCESS,
	DELETE_SA_BANNERS_FAIL,
} from './actionTypes';

const initialState = {
	SABanners: null,
	SABannersError: null,
	SABannersloading: false,
	documentLabels: null,
	documentLabelsError: null,
	documentLabelsLoading: false,
	isCreateSABannersError: false,
	isCreateSABannersSuccess: false,
	isCreateSABannersLoading: false,
	isCreateKYCLabelsError: false,
	isCreateKYCLabelsSuccess: false,
	isCreateKYCLabelsLoading: false,
	isEditKYCLabelsError: false,
	isEditKYCLabelsSuccess: false,
	isEditKYCLabelsLoading: false,
	isEditSABannersError: false,
	isEditSABannersSuccess: false,
	isEditSABannersLoading: false,
	loyaltyLevel: null,
	loyaltyLevelError: null,
	loyaltyLevelLoading: false,
	isUpdateLoyaltyLevelLoading: false,
	isUpdateLoyaltyLevelSuccess: false,
	isUpdateLoyaltyLevelError: null,
	isDeleteSABannersSuccess: false,
	isDeleteSABannersError: null,
	isDeleteSABannersLoading: false,
};

const SASettings = (state = initialState, { type, payload } = {}) => {
	switch (type) {
		case GET_SA_BANNERS:
			return {
				...state,
				SABannersloading: true,
			};

		case GET_SA_BANNERS_SUCCESS:
			return {
				...state,
				SABannersloading: false,
				SABanners: payload,
				SABannersError: null,
			};

		case GET_SA_BANNERS_FAIL:
			return {
				...state,
				SABannersloading: false,
				SABannersError: true,
			};

		case GET_DOCUMENT_LABEL:
			return {
				...state,
				documentLabelsLoading: true,
			};

		case GET_DOCUMENT_LABEL_SUCCESS:
			return {
				...state,
				documentLabelsLoading: false,
				documentLabels: payload,
				documentLabelsError: null,
			};

		case GET_DOCUMENT_LABEL_FAIL:
			return {
				...state,
				documentLabelsLoading: false,
				documentLabelsError: true,
			};
		case CREATE_SA_BANNERS_START:
			return {
				...state,
				isCreateSABannersLoading: true,
				isCreateSABannersSuccess: false,
			};

		case CREATE_SA_BANNERS_SUCCESS:
			return {
				...state,
				isCreateSABannersLoading: false,
				isCreateSABannersSuccess: true,
			};

		case CREATE_SA_BANNERS_FAIL:
			return {
				...state,
				isCreateSABannersError: payload,
				isCreateSABannersLoading: false,
				isCreateSABannersSuccess: false,
			};

		case CREATE_KYC_LABELS_START:
			return {
				...state,
				isCreateKYCLabelsLoading: true,
				isCreateKYCLabelsSuccess: false,
			};

		case CREATE_KYC_LABELS_SUCCESS:
			return {
				...state,
				isCreateKYCLabelsLoading: false,
				isCreateKYCLabelsSuccess: true,
			};

		case CREATE_KYC_LABELS_FAIL:
			return {
				...state,
				isCreateKYCLabelsError: payload,
				isCreateKYCLabelsLoading: false,
				isCreateKYCLabelsSuccess: false,
			};

		case EDIT_KYC_LABELS_START:
			return {
				...state,
				isEditKYCLabelsLoading: true,
				isEditKYCLabelsSuccess: false,
			};

		case EDIT_KYC_LABELS_SUCCESS:
			return {
				...state,
				isEditKYCLabelsLoading: false,
				isEditKYCLabelsSuccess: true,
			};

		case EDIT_KYC_LABELS_FAIL:
			return {
				...state,
				isEditKYCLabelsError: payload,
				isEditKYCLabelsLoading: false,
				isEditKYCLabelsSuccess: false,
			};

		case EDIT_SA_BANNERS_START:
			return {
				...state,
				isEditSABannersLoading: true,
				isEditSABannersSuccess: false,
			};

		case EDIT_SA_BANNERS_SUCCESS:
			return {
				...state,
				isEditSABannersLoading: false,
				isEditSABannersSuccess: true,
			};

		case EDIT_SA_BANNERS_FAIL:
			return {
				...state,
				isEditSABannersError: payload,
				isEditSABannersLoading: false,
				isEditSABannersSuccess: false,
			};

		case GET_LOYALTY_LEVEL:
			return {
				...state,
				loyaltyLevelLoading: true,
			};

		case GET_LOYALTY_LEVEL_SUCCESS:
			return {
				...state,
				loyaltyLevelLoading: false,
				loyaltyLevel: payload,
				loyaltyLevelError: null,
			};

		case GET_LOYALTY_LEVEL_FAIL:
			return {
				...state,
				loyaltyLevelLoading: false,
				loyaltyLevelError: true,
			};

		case UPDATE_LOYALTY_LEVEL:
			return {
				...state,
				isUpdateLoyaltyLevelLoading: true,
			};

		case UPDATE_LOYALTY_LEVEL_SUCCESS:
			return {
				...state,
				isUpdateLoyaltyLevelLoading: false,
				isUpdateLoyaltyLevelSuccess: true,
				isUpdateLoyaltyLevelError: null,
			};

		case UPDATE_LOYALTY_LEVEL_FAIL:
			return {
				...state,
				isUpdateLoyaltyLevelLoading: false,
				isUpdateLoyaltyLevelError: payload,
				isUpdateLoyaltyLevelSuccess: false,
			};

		case DELETE_SA_BANNERS_START:
			return {
				...state,
				isDeleteSABannersLoading: true,
				isDeleteSABannersSuccess: false,
				isDeleteSABannersError: null,
			};

		case DELETE_SA_BANNERS_SUCCESS:
			return {
				...state,
				isDeleteSABannersLoading: false,
				isDeleteSABannersSuccess: true,
				isDeleteSABannersError: null,
			};

		case DELETE_SA_BANNERS_FAIL:
			return {
				...state,
				isDeleteSABannersLoading: false,
				isDeleteSABannersSuccess: false,
				isDeleteSABannersError: payload,
			};

		default:
			return { ...state };
	}
};

export default SASettings;
