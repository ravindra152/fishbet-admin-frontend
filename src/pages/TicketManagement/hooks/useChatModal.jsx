import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getTicketMessagesStart,
	postTicketMessagesStart,
} from '../../../store/ticketManagement/actions';

const useChatModal = () => {
	const [showChatModal, setShowChatModal] = useState(false);
	const [ticketId, setTicketId] = useState();
	const [messageReply, setMessageReply] = useState('');
	const dispatch = useDispatch();

	const {
		ticketMessagesData,
		isTicketMessagesLoading,
		isMessageSending,
		ticketMessagePosted,
	} = useSelector((state) => state.TicketManagementData);

	const handleInputChange = (value) => {
		setMessageReply(value);
	};

	const handleMessageReply = () => {
		const payload = {
			ticketId,
			message: messageReply,
		};
		dispatch(postTicketMessagesStart(payload));
		setMessageReply('');
	};

	const openChatModal = (id) => {
		setShowChatModal(true);
		setTicketId(id);
	};
	const closeChatModal = () => {
		setShowChatModal(false);
	};

	const fetchTicketMessages = () => {
		dispatch(getTicketMessagesStart({ ticketId }));
	};
	useEffect(() => {
		if (ticketId) {
			fetchTicketMessages();
		}
	}, [ticketId, ticketMessagePosted]);

	return {
		showChatModal,
		openChatModal,
		closeChatModal,
		ticketMessagesData,
		messageReply,
		handleInputChange,
		isMessageSending,
		handleMessageReply,
		isTicketMessagesLoading,
	};
};

export default useChatModal;
