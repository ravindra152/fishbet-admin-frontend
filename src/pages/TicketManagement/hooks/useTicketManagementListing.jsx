import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatDate } from '../../../utils/dateFormatter';

import {
	getTicketManagementDetailsStart,
	updateTicketStatusStart,
} from '../../../store/ticketManagement/actions';

const useTicketManagementListing = () => {
	const ticketManagementState = useSelector(
		(state) => state.TicketManagementData
	);

	const {
		ticketManagementDetails,
		isTicketManagementDetailsLoading,
		isTicketStatusUpdated,
	} = ticketManagementState;

	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const [modal, setModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [job, setJob] = useState(null);
	const [activeStatus, setActiveStatus] = useState(null);
	const dispatch = useDispatch();

	const [modalStates, setModalStates] = useState({
		activeCreateCategory: false,
	});

	const closeModal = (modalName) => {
		setModalStates((prev) => ({ ...prev, [modalName]: false }));
	};

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const formattedTicketManagementData = useMemo(() => {
		if (ticketManagementDetails) {
			return ticketManagementDetails.map((ticket) => ({
				...ticket,
				createdAt: formatDate(ticket?.createdAt),
			}));
		}
		return [];
	}, [ticketManagementDetails]);

	const fetchData = () => {
		dispatch(
			getTicketManagementDetailsStart({
				limit: itemsPerPage,
				pageNo: page,
				// ...filterValues,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [page, itemsPerPage, isTicketStatusUpdated]);

	const handleStatusChange = (id, value) => {
		const payload = {
			ticketId: id,
			status: value,
		};
		dispatch(updateTicketStatusStart(payload));
		setActiveStatus(value);
	};

	return {
		formattedTicketManagementData,
		isTicketManagementDetailsLoading,
		page,
		setPage,
		itemsPerPage,
		totalTicketCount: ticketManagementDetails?.count,
		modal,
		setModal,
		isEdit,
		setIsEdit,
		job,
		setJob,
		modalStates,
		closeModal,
		onChangeRowsPerPage,
		handleStatusChange,
		activeStatus,
	};
};

export default useTicketManagementListing;
