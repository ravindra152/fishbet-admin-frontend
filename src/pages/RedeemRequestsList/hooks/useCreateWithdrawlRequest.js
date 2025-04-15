import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateWithdrawRequestStart } from '../../../store/actions';
import useWithdrawRequestsListing from './useWithdrawRequestsListing';

const useCreateWithdrawlRequest = () => {
	const dispatch = useDispatch();
	const [withdrawlRequestData, setWithdrawlRequestData] = useState();
	const [modalStates, setModalStates] = useState(false);
	const [reason, setReason] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const { isStatusUpdated, setIsStatusUpdated } = useWithdrawRequestsListing();

	const openModal = () => {
		setModalStates(true);
	};

	const closeModal = () => {
		setModalStates(false);
		setErrorMsg('');
	};

	const openWidthdrawlRequestModal = (props) => {
		setWithdrawlRequestData(props);
		openModal();
	};

	const handleStatus = () => {
		if (withdrawlRequestData?.requestType === 'cancel' && !reason) {
			setErrorMsg('Reason is required.');
		} else {
			dispatch(
				updateWithdrawRequestStart({
					requestType: withdrawlRequestData?.requestType,
					withdrawalId: withdrawlRequestData?.id,
					reason,
				})
			);
			setErrorMsg('');
			setReason('');
			closeModal();
			setIsStatusUpdated(!isStatusUpdated);
		}
	};

	return {
		withdrawlRequestData,
		modalStates,
		openModal,
		closeModal,
		openWidthdrawlRequestModal,
		handleStatus,
		reason,
		setReason,
		errorMsg,
	};
};
export default useCreateWithdrawlRequest;
