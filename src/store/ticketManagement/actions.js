import {
	GET_TICKET_MANAGEMENT_DATA_FAIL,
	GET_TICKET_MANAGEMENT_DATA_SUCCESS,
	GET_TICKET_MANAGEMENT_DATA_START,
	UPDATE_TICKET_STATUS_SUCCESS,
	UPDATE_TICKET_STATUS_FAIL,
	UPDATE_TICKET_STATUS_START,
	GET_TICKET_MESSAGES_SUCCESS,
	GET_TICKET_MESSAGES_FAIL,
	GET_TICKET_MESSAGES_START,
	POST_TICKET_MESSAGES_SUCCESS,
	POST_TICKET_MESSAGES_FAIL,
	POST_TICKET_MESSAGES_START,
} from './actionTypes';

export const getTicketManagementDetailsSuccess = (payload) => ({
	type: GET_TICKET_MANAGEMENT_DATA_SUCCESS,
	payload,
});

export const getTicketManagementDetailsFailure = (payload) => ({
	type: GET_TICKET_MANAGEMENT_DATA_FAIL,
	payload,
});

export const getTicketManagementDetailsStart = (payload) => ({
	type: GET_TICKET_MANAGEMENT_DATA_START,
	payload,
});

export const updateTicketStatusSuccess = (payload) => ({
	type: UPDATE_TICKET_STATUS_SUCCESS,
	payload,
});

export const updateTicketStatusFailure = (payload) => ({
	type: UPDATE_TICKET_STATUS_FAIL,
	payload,
});

export const updateTicketStatusStart = (payload) => ({
	type: UPDATE_TICKET_STATUS_START,
	payload,
});
export const getTicketMessagesSuccess = (payload) => ({
	type: GET_TICKET_MESSAGES_SUCCESS,
	payload,
});

export const getTicketMessagesFailure = (payload) => ({
	type: GET_TICKET_MESSAGES_FAIL,
	payload,
});

export const getTicketMessagesStart = (payload) => ({
	type: GET_TICKET_MESSAGES_START,
	payload,
});

export const postTicketMessagesSuccess = (payload) => ({
	type: POST_TICKET_MESSAGES_SUCCESS,
	payload,
});

export const postTicketMessagesFailure = (payload) => ({
	type: POST_TICKET_MESSAGES_FAIL,
	payload,
});

export const postTicketMessagesStart = (payload) => ({
	type: POST_TICKET_MESSAGES_START,
	payload,
});
