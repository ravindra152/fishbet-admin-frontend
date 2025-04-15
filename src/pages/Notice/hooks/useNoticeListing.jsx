/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { getAllNotice } from '../../../network/getRequests';
import { CmsPageId, Content, CreatedAt, Title } from '../NoticeListCol';

const useNoticeListing = () => {
	// const navigate = useNavigate();
	// const { data, isLoading, error } = useSelector((state) => state.AllCms);
	const [page, setPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [limit, setLimit] = useState(15);
	const [selectedClient, setSelectedClient] = useState('');
	const [totalNoticeCount, setTotalNoticeCount] = useState('');
	// const dispatch = useDispatch();
	// const [data, setCmsData] = useState();
	const [modalStates, setModalStates] = useState({
		activeCmsModal: false,
	});
	// const openModal = (modalName) => {
	// 	setModalStates((prev) => ({ ...prev, [modalName]: true }));
	// };

	const closeModal = (modalName) => {
		setModalStates((prev) => ({ ...prev, [modalName]: false }));
	};

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await getAllNotice({
				limit: itemsPerPage,
				pageNo: page,
			});

			setData(response?.data?.data?.notifications?.rows);
			setTotalNoticeCount(response?.data?.data?.notifications?.count);
		} catch (error) {
			console.error('Error fetching packages:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// const handleStatus = () => {
	// 	const { status, cmsPageId } = data;
	// 	dispatch(
	// 		updateSaCmsStatus({
	// 			code: 'CMS',
	// 			cmsPageId,
	// 			status: !status,
	// 		})
	// 	);
	// };

	// const openCmsModal = (props) => {
	// 	setData(props);
	// 	openModal('activeCmsModal');
	// };

	// const handleEditClick = (e, cmsPageId) => {
	// 	e.preventDefault();
	// 	navigate(`edit/${cmsPageId}`);
	// };

	// const handleViewClick = (e, noticePageId) => {
	// 	e.preventDefault();
	// 	navigate(`details/${noticePageId}`);
	// };

	useEffect(() => {
		fetchData();
	}, [limit, selectedClient, page, itemsPerPage]);

	const formattedNoticeDetails = useMemo(() => {
		if (data) {
			return data?.map((detail) => ({
				...detail,
				title: detail?.title?.EN,
				content: detail?.content?.EN,
			}));
		}
		return [];
	}, [data]);
	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
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
				Header: 'CONTENT',
				accessor: 'content',
				Cell: ({ cell }) => <Content value={cell.value} />,
			},
			{
				Header: 'CREATED AT',
				accessor: 'createdAt',
				Cell: ({ cell }) => <CreatedAt value={cell.value} />,
			},
			
			// {
			// 	Header: 'ACTION',
			// 	accessor: 'action',
			// 	disableFilters: true,
			// 	disableSortBy: true,
			// 	Cell: ({ cell }) => (
			// 		<ActionButtons
			// 			row={cell.row}
			// 			handleStatus={openCmsModal}
			// 			handleEditClick={handleEditClick}
			// 			handleViewClick={handleViewClick}
			// 		/>
			// 	),
			// },
		],
		[]
	);

	return {
		data,
		formattedNoticeDetails,
		isLoading,
		itemsPerPage,
		totalNoticeCount,
		// error,
		setLimit,
		setPage,
		setSelectedClient,
		// handleStatus,
		onChangeRowsPerPage,
		columns,
		modalStates,
		closeModal,
		// data,
	};
};

export default useNoticeListing;
