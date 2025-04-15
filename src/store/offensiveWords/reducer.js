import {
	CREATE_OFFENSIVE_WORDS_FAIL,
	CREATE_OFFENSIVE_WORDS_START,
	CREATE_OFFENSIVE_WORDS_SUCCESS,
	EDIT_OFFENSIVE_WORDS_FAIL,
	EDIT_OFFENSIVE_WORDS_START,
	EDIT_OFFENSIVE_WORDS_SUCCESS,
	FETCH_OFFENSIVE_WORDS_FAIL,
	FETCH_OFFENSIVE_WORDS_START,
	FETCH_OFFENSIVE_WORDS_SUCCESS,
} from './actionTypes';

const initialState = {
	offensiveWords: null,
	totalCount: 0,
	error: '',
	loading: false,
	isCreateWordLoading: false,
	isEditWordLoading: false,
};

const OffensiveWords = (state = initialState, { type, payload } = {}) => {
	switch (type) {
		case FETCH_OFFENSIVE_WORDS_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_OFFENSIVE_WORDS_FAIL:
			return {
				...state,
				loading: false,
				error: true,
			};
		case FETCH_OFFENSIVE_WORDS_SUCCESS:
			return {
				...state,
				loading: false,
				offensiveWords: payload?.offensiveWords,
				totalCount: payload?.totalPages,
			};
		case CREATE_OFFENSIVE_WORDS_START:
			return {
				...state,
				isCreateWordLoading: true,
			};

		case CREATE_OFFENSIVE_WORDS_SUCCESS:
			return {
				...state,
				isCreateWordLoading: false,
			};

		case CREATE_OFFENSIVE_WORDS_FAIL:
			return {
				...state,
				isCreateWordLoading: false,
			};
		case EDIT_OFFENSIVE_WORDS_START:
			return {
				...state,
				isEditWordLoading: true,
			};

		case EDIT_OFFENSIVE_WORDS_SUCCESS:
			return {
				...state,
				isEditWordLoading: false,
			};

		case EDIT_OFFENSIVE_WORDS_FAIL:
			return {
				...state,
				isEditWordLoading: false,
			};
		default:
			return { ...state };
	}
};

export default OffensiveWords;
