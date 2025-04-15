/* eslint-disable no-case-declarations */
import {
	GET_TICKET_MANAGEMENT_DATA_START,
	GET_TICKET_MANAGEMENT_DATA_SUCCESS,
	GET_TICKET_MANAGEMENT_DATA_FAIL,
	UPDATE_TICKET_STATUS_SUCCESS,
	GET_TICKET_MESSAGES_START,
	GET_TICKET_MESSAGES_SUCCESS,
	GET_TICKET_MESSAGES_FAIL,
	POST_TICKET_MESSAGES_START,
	POST_TICKET_MESSAGES_SUCCESS,
} from './actionTypes';

const INIT_STATE = {
	ticketManagementDetails: [],
	ticketManagementDetailsError: null,
	isTicketManagementDetailsLoading: false,
	isTicketStatusUpdated: false,
	ticketMessagesData: [],
	isTicketMessagesLoading: false,
	ticketMessagesError: null,
	ticketMessagePosted: false,
	isMessageSending: false,
};

const TicketManagementData = (state = INIT_STATE, { type, payload } = {}) => {
	switch (type) {
		case GET_TICKET_MANAGEMENT_DATA_START:
			return {
				...state,
				isTicketManagementDetailsLoading: true,
			};

		case GET_TICKET_MANAGEMENT_DATA_SUCCESS:
			return {
				...state,
				isTicketManagementDetailsLoading: false,
				ticketManagementDetails: payload,
				ticketManagementDetailsError: null,
			};

		case GET_TICKET_MANAGEMENT_DATA_FAIL:
			return {
				...state,
				ticketManagementDetailsError: payload,
				isTicketManagementDetailsLoading: true,
			};

		case UPDATE_TICKET_STATUS_SUCCESS:
			return {
				...state,
				isTicketStatusUpdated: !state.isTicketStatusUpdated,
			};

		case GET_TICKET_MESSAGES_START:
			return {
				...state,
				isTicketMessagesLoading: true,
			};

		case GET_TICKET_MESSAGES_SUCCESS:
			return {
				...state,
				isTicketMessagesLoading: false,
				ticketMessagesData: payload,
				ticketMessagesDataError: null,
			};

		case GET_TICKET_MESSAGES_FAIL:
			return {
				...state,
				ticketMessagesError: payload,
				isTicketMessagesLoading: false,
			};
		case POST_TICKET_MESSAGES_START:
			return {
				...state,
				isMessageSending: true,
			};

		case POST_TICKET_MESSAGES_SUCCESS:
			return {
				...state,
				isMessageSending: false,
				ticketMessagePosted: true,
			};

		default:
			return state;
	}
};

export default TicketManagementData;
