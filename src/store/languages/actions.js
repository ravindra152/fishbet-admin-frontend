import {
	FETCH_LANGUAGES_FAIL,
	FETCH_LANGUAGES_START,
	FETCH_LANGUAGES_SUCCESS,
} from './actionTypes';

export const fetchLanguagesStart = (payload) => ({
	type: FETCH_LANGUAGES_START,
	payload,
});

export const fetchLanguagesSuccess = (languages) => ({
	type: FETCH_LANGUAGES_SUCCESS,
	payload: languages,
});

export const fetchLanguagesFail = (history) => ({
	type: FETCH_LANGUAGES_FAIL,
	payload: { history },
});
