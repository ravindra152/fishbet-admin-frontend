/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	getAllCmsDetails,
	updateSaCmsStatus,
} from '../../../store/cms/actions';
import { CmsPageId, Title, Slug, Portal, Status } from '../CmsListCol';
import ActionButtons from '../ActionButtons';

const useCmsListing = (filterValues = {}) => {
	const navigate = useNavigate();
	const { cmsDetails, isLoading, error } = useSelector((state) => state.AllCms);
	const [limit, setLimit] = useState(15);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const [selectedClient, setSelectedClient] = useState('');
	const dispatch = useDispatch();
	const [cmsData, setCmsData] = useState();
	const [modalStates, setModalStates] = useState({
		activeCmsModal: false,
	});
	const openModal = (modalName) => {
		setModalStates((prev) => ({ ...prev, [modalName]: true }));
	};

	const closeModal = (modalName) => {
		setModalStates((prev) => ({ ...prev, [modalName]: false }));
	};

	const formattedCmsDetails = useMemo(() => {
		if (cmsDetails) {
			return cmsDetails?.rows.map((detail) => ({
				...detail,
				title: detail?.title?.EN,
				portal: detail?.tenant?.name
					? `${detail?.tenant?.name} ${detail.tenant?.domain}`
					: 'All',
			}));
		}
		return [];
	}, [cmsDetails]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const fetchData = () => {
		dispatch(
			getAllCmsDetails({
				limit: itemsPerPage,
				pageNo: page,
				adminId: selectedClient,
				...filterValues,
			})
		);
	};

	const handleStatus = () => {
		const { status, cmsPageId } = cmsData;
		dispatch(
			updateSaCmsStatus({
				code: 'CMS',
				cmsPageId,
				status: !status,
			})
		);
	};

	const openCmsModal = (props) => {
		setCmsData(props);
		openModal('activeCmsModal');
	};

	const handleEditClick = (e, cmsPageId) => {
		e.preventDefault();
		navigate(`edit/${cmsPageId}`);
	};

	const handleViewClick = (e, cmsPageId) => {
		e.preventDefault();
		navigate(`details/${cmsPageId}`);
	};

	useEffect(() => {
		fetchData();
	}, [limit, selectedClient, page, itemsPerPage]);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'cmsPageId',
				filterable: true,
				Cell: ({ cell }) => <CmsPageId value={cell.value} />,
			},
			{
				Header: 'TITLE',
				accessor: 'title',
				filterable: true,
				Cell: ({ cell }) => <Title value={cell.value} />,
			},
			{
				Header: 'SLUG',
				accessor: 'slug',
				filterable: true,
				Cell: ({ cell }) => <Slug value={cell.value} />,
			},
			{
				Header: 'PORTAL',
				accessor: 'portal',
				filterable: true,
				Cell: ({ cell }) => <Portal value={cell.value} />,
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'ACTION',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => (
					<ActionButtons
						row={cell.row}
						handleStatus={openCmsModal}
						handleEditClick={handleEditClick}
						handleViewClick={handleViewClick}
					/>
				),
			},
		],
		[]
	);

	return {
		cmsDetails,
		formattedCmsDetails,
		isLoading,
		itemsPerPage,
		totalCmsCount: cmsDetails?.count,
		error,
		setLimit,
		setPage,
		setSelectedClient,
		handleStatus,
		onChangeRowsPerPage,
		columns,
		modalStates,
		closeModal,
		cmsData,
	};
};

export default useCmsListing;
