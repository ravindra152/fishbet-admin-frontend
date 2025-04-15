/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBonusDrop } from '../../../network/getRequests';
import { getAllBonusDropDetailsSuccess } from '../../../store/bonusDrop/actions';
import { updateSaCmsStatus } from '../../../store/cms/actions';
import ActionButtons from '../ActionButtons';
import {
	Code,
	Coin,
	ExpiryTime,
	Id,
	Name,
	Status,
	TotalClaims,
	TotalClaimsAllowed,
} from '../BonusDropListCol';

const useBonusDropListing = () => {
	const navigate = useNavigate();
	const [limit, setLimit] = useState(15);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedClient, setSelectedClient] = useState('');
	const [totalBonusDropCount, setTotalBonusDropCount] = useState('');
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

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await getBonusDrop({
				limit: itemsPerPage,
				pageNo: page,
			});

			setData(response?.data?.data?.data?.dropBonuses);
			setTotalBonusDropCount(response?.data?.data?.data?.count);
			dispatch(
				getAllBonusDropDetailsSuccess(response?.data?.data?.data?.dropBonuses)
			);
		} catch (error) {
			console.error('Error fetching packages:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const formattedBonusDropDetails = useMemo(() => {
		if (data) {
			return data?.map((detail) => ({
				...detail,
				title: detail?.title?.EN,
				portal: detail?.tenant?.name
					? `${detail?.tenant?.name} ${detail.tenant?.domain}`
					: 'All',
			}));
		}
		return [];
	}, [data]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
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

	const handleEditClick = (e, bonusDropId) => {
		e.preventDefault();
		navigate(`edit/${bonusDropId}`);
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
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
			{
				Header: 'COIN',
				accessor: 'coin',
				filterable: true,
				Cell: ({ cell }) => <Coin value={cell.value} />,
			},
			{
				Header: 'TOTAL CLAIMS ALLOWED',
				accessor: 'totalClaimsAllowed',
				filterable: true,
				Cell: ({ cell }) => <TotalClaimsAllowed value={cell.value} />,
			},
			{
				Header: 'TOTAL CLAIMS',
				accessor: 'totalClaims',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => <TotalClaims value={cell.value} />,
			},
			{
				Header: 'CODE',
				accessor: 'code',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Code value={cell.value} />,
			},
			{
				Header: 'EXPIRY TIME',
				accessor: 'expiryTime',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => <ExpiryTime value={cell.value} />,
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
		data,
		formattedBonusDropDetails,
		isLoading,
		itemsPerPage,
		totalCmsCount: totalBonusDropCount,
		// error,
		setLimit,
		setPage,
		setSelectedClient,
		handleStatus,
		onChangeRowsPerPage,
		columns,
		modalStates,
		closeModal,
		cmsData,
		page,
	};
};

export default useBonusDropListing;
