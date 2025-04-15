import { CREATE_PROMOTIONS_FAIL, CREATE_PROMOTIONS_START, CREATE_PROMOTIONS_SUCCESS, GET_PROMOTIONS_FAIL, GET_PROMOTIONS_START, GET_PROMOTIONS_SUCCESS, SELECT_PROMOTION_BY_PAGE, UPDATE_PROMOTIONS_FAIL, UPDATE_PROMOTIONS_START, UPDATE_PROMOTIONS_SUCCESS } from './actionTypes';

const INIT_STATE = {
	isPromotionsLoading: false,
  promotions: null,
  submitPromotionLoading: false,
  promotionByPage: null,
};

const promotions = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
    case SELECT_PROMOTION_BY_PAGE:
			return {
				...state,
				promotionByPage: payload,
			};

		case GET_PROMOTIONS_START:
			return {
				...state,
				isPromotionsLoading: true,
			};

		case GET_PROMOTIONS_SUCCESS:
			return {
				...state,
				isPromotionsLoading: false,
        promotions: payload,
			};

		case GET_PROMOTIONS_FAIL:
			return {
				...state,
				isPromotionsLoading: false,
			};

    case CREATE_PROMOTIONS_START:
      return {
        ...state,
        submitPromotionLoading: true,
      };

    case CREATE_PROMOTIONS_SUCCESS:
      return {
        ...state,
        submitPromotionLoading: false,
      };

    case CREATE_PROMOTIONS_FAIL:
      return {
        ...state,
        submitPromotionLoading: false
      };

    case UPDATE_PROMOTIONS_START:
      return {
        ...state,
        submitPromotionLoading: true,
      };

    case UPDATE_PROMOTIONS_SUCCESS:
      return {
        ...state,
        promotionByPage: null,
        submitPromotionLoading: false,
      };

    case UPDATE_PROMOTIONS_FAIL:
      return {
        ...state,
        submitPromotionLoading: false
      };

    default:
			return { ...state };
	}
};

export default promotions;
