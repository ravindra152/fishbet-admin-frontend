/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWithdrawRequestsStart } from '../../../store/actions';
import { formatDateYMD } from '../../../helpers/dateFormatter';
import {
	Action,
	Amount,
	Email,
	Id,
	Name,
	// PaymentProvider,
	Status,
	TransactionId,
	CreatedAt,
} from '../WithdrawRequestsListCol';
import {
	AcceptRedeemReq,
	RejectRedeemReq,
} from '../../../network/postRequests';
import { showToastr } from '../../../utils/helpers';
import { Link } from 'react-router-dom';

const useWithdrawRequestsListing = (formValues = {}) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [reason, setReason] = useState({ value: '', error: null });
	const [confirmationContent, setConfirmationContent] = useState({
		content: null,
		type: null,
		redeemId: null,
	});
	const { withdrawRequests, loading: isWithdrawRequestsLoading } = useSelector(
		(state) => state.WithdrawRequests
	);
	// console.log(withdrawRequests)
	// console.log(withdrawRequests)

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	// const fetchData = () => {
	const fetchData = () => {
		dispatch(
			fetchWithdrawRequestsStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				...formValues,
			})
		);
	};

	const HandleClose = () => {
		setConfirmationContent({
			content: null,
			type: null,
			redeemId: null,
		});
		setReason({ value: '', error: null });
	};
	const HandleAccept = async () => {
		console.log('HandleAccept', HandleAccept);
		try {
			if (confirmationContent?.type === 'reject' && reason?.value === '') {
				setReason({
					...reason,
					error: 'Reason is required!',
				});
				return; // Stop execution to prevent errors
			}

			if (confirmationContent?.type === 'reject') {
				await RejectRedeemReq({
					reason: reason?.value,
					withdrawalId: confirmationContent?.redeemId,
				});
				showToastr({
					message: 'Request rejected successfully',
					type: 'success',
				});
			} else {
				await AcceptRedeemReq({
					withdrawalId: confirmationContent?.redeemId,
				});
				showToastr({
					message: 'Request accepted successfully',
					type: 'success',
				});
			}

			HandleClose();
			fetchData();
		} catch (e) {
			console.error('HandleAccept -> Error:', e);
			showToastr({
				message: 'Something went wrong. Please try again.',
				type: 'error',
			});
		}
	};

	const handleReqAccept = (redeemId) => {
		setConfirmationContent({
			content: 'Are you sure to accept this request?',
			type: 'accept',
			redeemId,
		});
	};

	const handleReqReject = (redeemId) => {
		setConfirmationContent({
			content: 'Provide reason for rejecting?',
			type: 'reject',
			redeemId,
		});
	};

	useEffect(() => {
		fetchData();
	}, [currentPage, itemsPerPage]);

	// const fetchData = () => {
	// 	dispatch(
	// 		fetchWithdrawRequestsStart({
	// 			limit: itemsPerPage,
	// 			pageNo: currentPage,
	// 			...formValues,
	// 		})
	// 	);
	// };

	const formattedWithdrawRequests = useMemo(() => {
		const formattedValues = [];
		if (withdrawRequests) {
			withdrawRequests?.withdrawRequests?.map((request) =>
				formattedValues.push({
					...request,
					email: request?.User?.email || '',
					userName: request?.User?.username || '',
					amountWithCurr: request?.amount
						? `${request.amount.toFixed(2)} ${
								request?.withdrawalLedger?.[0]?.currencyCode || 'RSC'
						  }`
						: '0',
					statusText: request?.status,
					updatedAt: formatDateYMD(request.updatedAt) || 'NA',
					createdAt: formatDateYMD(request.createdAt) || 'NA',
					transactionId: request?.withdrawalLedger?.[0]?.transactionId,
					
				})
			);
		}
		return formattedValues;
	}, [withdrawRequests]);
	const buttonList = useMemo(() => [
		{
			label: '',
			// handleClick: handleDownload,
			link: '#!',
			tooltip: 'Download as CSV',
			icon: <i className="mdi mdi-file-download-outline" />,
		},
	]);

	const columns = useMemo(
		() => [
			{
				Header: 'Transaction Id',
				accessor: 'withdrawalTransaction.transactionId',
				Cell: ({ cell }) => <TransactionId value={cell.value} />,
			},
			{
				Header: 'Email',
				accessor: 'email',
				filterable: true,
				// Cell: ({ cell }) => <Id value={cell.value} />,
				Cell: ({ cell }) => (
					<Link
						to={`/player-details/${cell?.row?.original?.userId}`}
						state={{ prevUrl: '/dashboard' }}
					>
						{cell.value ? cell.value : '-'}
					</Link>
				),
			},
	
			// {
			// 	Header: 'Email',
			// 	accessor: '',
			// 	filterable: true,
			// 	Cell: ({ cell, row }) => (
			// 		<Email value={cell.value} username={row.original.username} />
			// 	),
			// },

			{
				Header: 'Amount',
				accessor: 'amountWithCurr', // Keep the actual accessor field name
				filterable: true,
				Cell: ({ cell }) => <Amount value={cell.value} />,
			}
,			
			{
				Header: 'Currency',
				accessor: 'currency',
				filterable: true,
				Cell: ({ cell }) => <Amount value={cell.value} />,
			},
			// // {
			// 	Header: 'Payment Provider',
			// 	accessor: 'paymentProvider',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <PaymentProvider value={cell.value} />,
			// },

			{
				Header: 'Status',
				accessor: 'statusText',
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			// {
			// 	Header: 'Actionable Type',
			// 	accessor: 'actionableType',
			// 	Cell: ({ cell }) => <ActionableType value={cell.value} />,
			// },
			{
				Header: 'Created At',
				accessor: 'createdAt',
				Cell: ({ cell }) => <CreatedAt value={cell.value} />,
			},
			// {
			// 	Header: 'Updated At',
			// 	accessor: 'CreatedAt',
			// 	Cell: ({ cell }) => <CreatedAt value={cell.value} />,
			// },

			{
				Header: 'Withdrawal Address',
				accessor: 'withdrawalAddress',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
			
			{
				Header: 'Approval/Rejection Reason',
				accessor: 'comment',
				filterable: true,
				// Cell: ({ cell }) => <Name value={cell.value} />,
			},

			{
				Header: 'Action',
				accessor: 'action',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => (
					<Action
						row={cell.row}
						handleReqAccept={handleReqAccept}
						handleReqReject={handleReqReject}
					/>
				),

				// Cell: ({ cell }) => {
				// 	const id = cell?.row?.original?.id;
				// 	const status = cell?.row?.original?.status;

				// 	return (
				// 		<ul className="list-unstyled hstack gap-1 mb-0">
				// 			<li>
				// 				{status === 'Pending' ? (
				// 					<>
				// 						<Button
				// 							className="btn btn-sm btn-soft-success"
				// 							onClick={() =>
				// 								openWidthdrawlRequestModal({
				// 									id,
				// 									message: 'Success',
				// 									requestType: 'accept',
				// 								})
				// 							}
				// 						>
				// 							<i className="mdi mdi-check-circle" id="request-accept" />
				// 							<UncontrolledTooltip
				// 								placement="top"
				// 								target="request-accept"
				// 							>
				// 								Accept Request
				// 							</UncontrolledTooltip>
				// 						</Button>

				// 						<Button
				// 							className="btn btn-sm btn-soft-danger"
				// 							onClick={() =>
				// 								openWidthdrawlRequestModal({
				// 									id,
				// 									message: 'Cancelled',
				// 									requestType: 'cancel',
				// 								})
				// 							}
				// 						>
				// 							<i className="mdi mdi-close-thick" id="request-cancel" />
				// 							<UncontrolledTooltip
				// 								placement="top"
				// 								target="request-cancel"
				// 							>
				// 								Cancel Request
				// 							</UncontrolledTooltip>
				// 						</Button>
				// 					</>
				// 				) : null}
				// 			</li>
				// 		</ul>
				// 	);
				// },
			},
		],
		[]
	);

	return {
		currentPage,
		setCurrentPage,
		totalWithdrawRequestsCount: withdrawRequests?.totalCount,
		isWithdrawRequestsLoading,
		formattedWithdrawRequests,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		confirmationShow: !!confirmationContent?.type,
		confirmationContent: confirmationContent?.content,
		HandleAccept,
		HandleClose,
		confirmationType: confirmationContent?.type,
		reason,
		setReason,
	};
};

export default useWithdrawRequestsListing;
