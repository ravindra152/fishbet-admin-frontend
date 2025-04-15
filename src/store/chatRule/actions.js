import {
    CREATE_CHATRULE_FAIL,
    CREATE_CHATRULE_START,
    CREATE_CHATRULE_SUCCESS,
    DELETE_CHATRULE,
    EDIT_CHATRULE_FAIL,
    EDIT_CHATRULE_START,
    EDIT_CHATRULE_SUCCESS,
    FETCH_CHATRULE_FAIL,
    FETCH_CHATRULE_START,
    FETCH_CHATRULE_SUCCESS,
} from './actionTypes';

export const fetchChatRuleStart = (payload) => ({
    type: FETCH_CHATRULE_START,
    payload,
});

export const fetchChatRuleSuccess = (payload) => ({
    type: FETCH_CHATRULE_SUCCESS,
    payload,
});

export const fetchChatRuleFail = (history) => ({
    type: FETCH_CHATRULE_FAIL,
    payload: { history },
});
export const createChatRuleStart = (payload) => ({
    type: CREATE_CHATRULE_START,
    payload,
});

export const createChatRuleSuccess = (payload) => ({
    type: CREATE_CHATRULE_SUCCESS,
    payload,
});

export const createChatRuleFail = (payload) => ({
    type: CREATE_CHATRULE_FAIL,
    payload,
});

export const editChatRuleStart = (payload) => ({
    type: EDIT_CHATRULE_START,
    payload,
});

export const editChatRuleSuccess = (payload) => ({
    type: EDIT_CHATRULE_SUCCESS,
    payload,
});

export const editChatRuleFail = (payload) => ({
    type: EDIT_CHATRULE_FAIL,
    payload,
});

export const deleteChatRule = (payload) => ({
    type: DELETE_CHATRULE,
    payload,
});
