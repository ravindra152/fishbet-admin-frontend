import {
	CREATE_OFFENSIVE_WORDS_FAIL,
	CREATE_OFFENSIVE_WORDS_START,
	CREATE_OFFENSIVE_WORDS_SUCCESS,
	DELETE_OFFENSIVE_WORDS,
	EDIT_OFFENSIVE_WORDS_FAIL,
	EDIT_OFFENSIVE_WORDS_START,
	EDIT_OFFENSIVE_WORDS_SUCCESS,
	FETCH_OFFENSIVE_WORDS_FAIL,
	FETCH_OFFENSIVE_WORDS_START,
	FETCH_OFFENSIVE_WORDS_SUCCESS,
} from './actionTypes';

export const fetchOffensiveWordsStart = (payload) => ({
	type: FETCH_OFFENSIVE_WORDS_START,
	payload,
});

export const fetchOffensiveWordsSuccess = (payload) => ({
	type: FETCH_OFFENSIVE_WORDS_SUCCESS,
	payload,
});

export const fetchOffensiveWordsFail = (history) => ({
	type: FETCH_OFFENSIVE_WORDS_FAIL,
	payload: { history },
});
export const createOffensiveWordStart = (payload) => ({
	type: CREATE_OFFENSIVE_WORDS_START,
	payload,
});

export const createOffensiveWordSuccess = (payload) => ({
	type: CREATE_OFFENSIVE_WORDS_SUCCESS,
	payload,
});

export const createOffensiveWordFail = (payload) => ({
	type: CREATE_OFFENSIVE_WORDS_FAIL,
	payload,
});

export const editOffensiveWordStart = (payload) => ({
	type: EDIT_OFFENSIVE_WORDS_START,
	payload,
});

export const editOffensiveWordSuccess = (payload) => ({
	type: EDIT_OFFENSIVE_WORDS_SUCCESS,
	payload,
});

export const editOffensiveWordFail = (payload) => ({
	type: EDIT_OFFENSIVE_WORDS_FAIL,
	payload,
});

export const deleteOffensiveWord = (payload) => ({
	type: DELETE_OFFENSIVE_WORDS,
	payload,
});
