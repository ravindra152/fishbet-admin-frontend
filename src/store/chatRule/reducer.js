import {
    CREATE_CHATRULE_FAIL,
    CREATE_CHATRULE_START,
    CREATE_CHATRULE_SUCCESS,
    EDIT_CHATRULE_FAIL,
    EDIT_CHATRULE_START,
    EDIT_CHATRULE_SUCCESS,
    FETCH_CHATRULE_FAIL,
    FETCH_CHATRULE_START,
    FETCH_CHATRULE_SUCCESS,
} from './actionTypes';

const initialState = {
    chatRule: null,
    totalCount: 0,
    error: '',
    loading: false,
    isCreateRuleLoading: false,
    isEditRuleLoading: false,
};

const ChatRule = (state = initialState, { type, payload } = {}) => {
    switch (type) {
        case FETCH_CHATRULE_START:
            return {
                ...state,
                loading: true,
            };
        case FETCH_CHATRULE_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case FETCH_CHATRULE_SUCCESS:
            return {
                ...state,
                loading: false,
                chatRule: payload?.chatRules,
                totalCount: payload?.totalPages,
            };
        case CREATE_CHATRULE_START:
            return {
                ...state,
                isCreateRuleLoading: true,
            };

        case CREATE_CHATRULE_SUCCESS:
            return {
                ...state,
                isCreateRuleLoading: false,
            };

        case CREATE_CHATRULE_FAIL:
            return {
                ...state,
                isCreateRuleLoading: false,
            };
        case EDIT_CHATRULE_START:
            return {
                ...state,
                isEditRuleLoading: true,
            };

        case EDIT_CHATRULE_SUCCESS:
            return {
                ...state,
                isEditRuleLoading: false,
            };

        case EDIT_CHATRULE_FAIL:
            return {
                ...state,
                isEditRuleLoading: false,
            };
        default:
            return { ...state };
    }
};

export default ChatRule;
