/* eslint-disable array-callback-return */
/* eslint-disable no-inner-declarations */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Container } from 'reactstrap';
import TableContainer from '../../../components/Common/TableContainer';
import {
	acceptUserDocs,
	getDocumentLabel,
	getUserDetails,
	getUserDocuments,
	// markDocumentRequired,
	markDocumentRequiredReset,
} from '../../../store/actions';
import { getDateTime } from '../../../utils/dateFormatter';
import {
	ActionAt,
	Name,
	ThumbnailUrl,
	UpdatedAt,
	Status,
	KycLevel,
} from './UserDocsListCol';
import { Id } from '../TableCol';
// import ActionButtons from '../ActionButtons';
import { getDocumentLabelCall } from '../../../network/getRequests';
import KYCActionButtons from '../KYCActions';
import YesNoKycModal from './modal/YesNoKycModal';
import Breadcrumb from '../../../components/Common/Breadcrumb';

const UserDocsList = ({ userId }) => {
	const dispatch = useDispatch();
	const [docLabels, setDocLabels] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const {
		// userDetails,
		userDocuments,
		userDocumentsLoading,
		markDocumentRequiredSuccess,
		acceptUserDocSuccess,
	} = useSelector((state) => state.UserDetails);
	// const { documentLabels, documentLabelsLoading } = useSelector(
	// 	(state) => state.SASettings
	// );
	// const { affiliateRequests } = useSelector((state) => state.Affiliates);
	const [kycdata, setkycdata] = useState();
	const [modalStates, setModalStates] = useState({
		activekycModal: false,
	});
	const openModal = (modalName) => {
		setModalStates((prev) => ({ ...prev, [modalName]: true }));
	};

	const closeModal = (modalName) => {
		setModalStates((prev) => ({ ...prev, [modalName]: false }));
	};

	const formattedUserDocuments = useMemo(() => {
		const formattedValues = [];
		if (userDocuments) {
			userDocuments?.rows?.map((doc) =>
				formattedValues.push({
					...doc,
          username: doc?.User?.username,
          email: doc?.User?.email,
					actionPerformedAt: getDateTime(doc.actionPerformedAt),
					updatedAt: getDateTime(doc.updatedAt),
					documentUrl: doc?.documentUrl?.documentUrl,
					status: doc?.status,
					level: doc?.level,
          userKycLevel: doc?.User?.level,
				})
			);
		}
		return formattedValues;
	}, [userDocuments]);

	// const formattedDocumentLabels = useMemo(() => {
	// 	const formattedValues = [];
	// 	if (documentLabels) {
	// 		documentLabels.map((doc) =>
	// 			formattedValues.push({
	// 				...doc,
	// 				name: doc.name.EN,
	// 			})
	// 		);
	// 		if (
	// 			docLabels &&
	// 			docLabels.length &&
	// 			Array.isArray(userDetails?.requestedDocuments)
	// 		) {
	// 			docLabels.map((doc) => {
	// 				if (
	// 					userDetails?.requestedDocuments?.includes(doc.documentLabelId) &&
	// 					!formattedValues.find(
	// 						(val) => val.documentLabelId === doc.documentLabelId
	// 					)
	// 				) {
	// 					formattedValues.push({
	// 						...doc,
	// 						name: doc.name.EN,
	// 						isRequired: true,
	// 					});
	// 				}
	// 			});
	// 		}
	// 	}
	// 	return formattedValues;
	// }, [documentLabels, docLabels, userDetails]);

	const fetchAllLabels = async () => {
		await getDocumentLabelCall('').then((res) => {
			setDocLabels(res?.data?.data?.documentLabel);
		});
	};

	useEffect(() => {
		if (!docLabels) {
			fetchAllLabels();
		}
	}, [docLabels]);

	// const handleMarkAsRequired = ({
	// 	labelName,
	// 	documentLabelId,
	// 	isRequested,
	// }) => {
	// 	dispatch(
	// 		markDocumentRequired({
	// 			labelName,
	// 			documentLabelId,
	// 			userId: parseInt(userId, 10),
	// 			isRequested,
	// 		})
	// 	);
	// };
	const acceptOrReject = () => {
		const { userDocumentId, status, userIdForKyc } = kycdata;
		dispatch(
			acceptUserDocs({
				userDocumentId,
				status,
				userId: parseInt(userIdForKyc, 10),
			})
		);
	};
	const openkycModal = (props) => {
		setkycdata(props);
		openModal('activekycModal');
	};

	const columns = useMemo(
		() => [
			{
				Header: 'DOCUMENT ID',
				accessor: 'userDocumentId',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
      {
				Header: 'USERNAME',
				accessor: 'username',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
      {
				Header: 'EMAIL',
				accessor: 'email',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
			{
				Header: 'DOCUMENT NAME',
				accessor: 'documentName',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
			{
				Header: 'KYC DOC LEVEL',
				accessor: 'level',
				filterable: true,
				Cell: ({ cell }) => <KycLevel value={cell.value} />,
			},
      {
				Header: 'USER KYC LEVEL',
				accessor: 'userKycLevel',
				filterable: true,
				Cell: ({ cell }) => <KycLevel value={cell.value} />,
			},
			{
				Header: 'DOCUMENT PREVIEW',
				accessor: 'documentUrl',
				filterable: true,
				Cell: ({ cell }) => <ThumbnailUrl value={cell.value} />,
			},
			// {
			// 	Header: 'REASON',
			// 	accessor: 'reason',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <Reason value={cell.value} />,
			// },
			{
				Header: 'UPDATED AT',
				accessor: 'updatedAt',
				filterable: true,
				Cell: ({ cell }) => <UpdatedAt value={cell.value} />,
			},
			// {
			// 	Header: 'ACTIONEE',
			// 	accessor: 'actionee',
			// 	Cell: ({ cell }) => <Actionee value={cell.value} />,
			// },
			{
				Header: 'ACTION PERFORMED AT',
				accessor: 'actionPerformedAt',
				Cell: ({ cell }) => <ActionAt value={cell.value} />,
			},
			{
				Header: 'STATUS',
				accessor: 'status',
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'ACTION',
				disableSortBy: true,
				Cell: ({ cell }) => (
					<KYCActionButtons handleStatus={openkycModal} cell={cell} />
				),
			},
		],
		[]
	);

	// const labelColumns = useMemo(
	// 	() => [
	// 		{
	// 			Header: 'NAME',
	// 			accessor: 'name',
	// 			Cell: ({ cell }) => <Name value={cell.value} />,
	// 		},

	// 		{
	// 			Header: 'Action',
	// 			Cell: ({ cell }) => (
	// 				<ActionButtons cell={cell} handleStatus={handleMarkAsRequired} />
	// 			),
	// 		},
	// 	],
	// 	[]
	// );

	const fetchLabels = () => {
		dispatch(
			getUserDocuments({ userId, limit: itemsPerPage, pageNo: currentPage })
		);
		if (userId) {
			dispatch(getDocumentLabel({ userId }));
		}
	};

	useEffect(() => {
		fetchLabels();
	}, [currentPage, itemsPerPage]);

	useEffect(() => {
		if (acceptUserDocSuccess) fetchLabels();
	}, [acceptUserDocSuccess]);

	useEffect(() => {
		if (markDocumentRequiredSuccess) {
			fetchLabels();
			setDocLabels('');
			dispatch(markDocumentRequiredReset());
			dispatch(getUserDetails({ userId }));
		}
	}, [markDocumentRequiredSuccess]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	return (
		<div className={`${userId ? '' : 'page-content'}`}>
			<Container fluid>
				<Breadcrumb title="KYC" breadcrumbItem="Documents" />
				<Card className="p-2">
					<TableContainer
						isLoading={userDocumentsLoading}
						columns={columns}
						data={formattedUserDocuments}
						isPagination
						tableClass="table-bordered align-middle nowrap mt-2"
						customPageSize={itemsPerPage}
						// paginationDiv="col-sm-12 col-md-7"
						paginationDiv="justify-content-center"
						pagination="pagination justify-content-start pagination-rounded"
						totalPageCount={userDocuments?.count}
						isManualPagination
						onChangePagination={setCurrentPage}
						currentPage={currentPage}
						changeRowsPerPageCallback={onChangeRowsPerPage}
					/>
				</Card>
				{/* <Card className="p-2">
				<h4 className="text-center">Request Documents</h4>
				<TableContainer
					isLoading={documentLabelsLoading}
					columns={labelColumns}
					data={formattedDocumentLabels}
					isPagination
					customPageSize={20}
					tableClass="table-bordered align-middle nowrap mt-2"
				/>
			</Card> */}
				<YesNoKycModal
					show={modalStates.activekycModal}
					handleYes={acceptOrReject}
					handleClose={() => closeModal('activekycModal')}
					content={`Are you sure you want to ${
						kycdata?.Message ?? ''
					} KYC Level ${kycdata?.kycDocLevel} Request? `}
				/>
			</Container>
		</div>
	);
};

export default UserDocsList;
