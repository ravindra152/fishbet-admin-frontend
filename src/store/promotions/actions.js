import { CREATE_PROMOTIONS_FAIL, CREATE_PROMOTIONS_START, CREATE_PROMOTIONS_SUCCESS, DELETE_PROMOTIONS_START, GET_PROMOTIONS_FAIL, GET_PROMOTIONS_START, GET_PROMOTIONS_SUCCESS, SELECT_PROMOTION_BY_PAGE, UPDATE_PROMOTIONS_FAIL, UPDATE_PROMOTIONS_START, UPDATE_PROMOTIONS_SUCCESS } from './actionTypes';

export const fetchPromotionsStart = (payload) => ({
	type: GET_PROMOTIONS_START,
	payload,
});

export const fetchPromotionsSuccess = (payload) => ({
	type: GET_PROMOTIONS_SUCCESS,
	payload,
});

export const fetchPromotionsFailure = (payload) => ({
	type: GET_PROMOTIONS_FAIL,
	payload,
});

export const createPromotionStart = (payload) => (
  {
  type: CREATE_PROMOTIONS_START,
  payload
});

export const createPromotionSuccess = (payload) => ({
  type: CREATE_PROMOTIONS_SUCCESS,
  payload
});

export const createPromotionFailure = (payload) => ({
  type: CREATE_PROMOTIONS_FAIL,
  payload
});

export const selectPromotionByPage = (payload) => ({
  type: SELECT_PROMOTION_BY_PAGE,
  payload
});

export const deletePromotionStart = (payload) => ({
  type: DELETE_PROMOTIONS_START,
  payload
});

export const updatePromotionStart = (payload) => ({
  type: UPDATE_PROMOTIONS_START,
  payload
});

export const updatePromotionSuccess = (payload) => ({
  type: UPDATE_PROMOTIONS_SUCCESS,
  payload
});

export const updatePromotionFailure = (payload) => ({
  type: UPDATE_PROMOTIONS_FAIL,
  payload
});
