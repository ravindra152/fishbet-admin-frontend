/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { getAllPackage } from '../../../network/getRequests';
import ActionButtons from '../ActionButtons';
import { Amount, GcCoin, ImagePreview, OrderId, ScCoin, Status, VisibleInStore } from '../PackageListCol';


const usePackage = () => {
	const [page, setPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const fetchPackages = async () => {
		setIsLoading(true);
		try {
			const response = await getAllPackage({
				limit: itemsPerPage,
				pageNo: page,
			});
			setData(response?.data?.data?.packages);
		} catch (error) {
			console.error('Error fetching packages:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPackages();
	}, [page, itemsPerPage]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const formattedData = useMemo(() => {
		if (data?.rows?.length) {
			return data?.rows.map((item) => ({
				...item,
			}));
		}
		return [];
	}, [data]);

	const columns = useMemo(() => [
		// {
		// 	Header: 'Id',
		// 	accessor: 'packageId',
		// 	filterable: true,
		// 	Cell: ({ cell }) => <PackageId value={cell.value} />,
		// },
		{
			Header: 'Order Id',
			accessor: 'id',
			filterable: true,
			Cell: ({ cell }) => <OrderId value={cell.value} />,
		},
		{
			Header: 'Label',
			accessor: 'label',
			filterable: true,
			Cell: ({ cell }) => <OrderId value={cell.value} />,
		},
		{
			Header: 'Amount',
			accessor: 'amount',
			filterable: true,
			Cell: ({ cell }) => <Amount value={cell.value} />,
		},
		{
			Header: 'Gc Coin',
			accessor: 'gcCoin',
			filterable: true,
			Cell: ({ cell }) => <GcCoin value={cell.value} />,
		},
		{
			Header: 'Sc Coin',
			accessor: 'scCoin',
			filterable: true,
			Cell: ({ cell }) => <ScCoin value={cell.value} />,
		},
		{
			Header: 'STATUS',
			accessor: 'isActive',
			disableFilters: true,
			disableSortBy: true,
			Cell: ({ cell }) => <Status value={cell.value} />,
		},
		{
			Header: 'Visible In Store',
			accessor: 'isVisibleInStore',
			filterable: true,
			Cell: ({ cell }) => <VisibleInStore value={cell.value} />,
		},
		// {
		// 	Header: 'Giftable',
		// 	accessor: 'giftable',
		// 	filterable: true,
		// 	Cell: ({ cell }) => <VisibleInStore value={cell.value} />,
		// },
		// {
		// 	Header: 'Claimed Count',
		// 	accessor: 'claimedCount',
		// 	filterable: true,
		// 	Cell: ({ cell }) => <ClaimedCount value={cell.value} />,
		// },
		{
			Header: 'Discount Amount',
			accessor: 'discountAmount',
			filterable: true,
			Cell: ({ cell }) => <Amount value={cell.value} />,
		},
		{
			Header: 'Image',
			accessor: 'imageUrl',
			filterable: true,
			Cell: ({ cell }) => <ImagePreview value={cell.value} />,
		},
		{
			Header: 'ACTION',
			accessor: 'action',
			disableFilters: true,
			disableSortBy: true,
			Cell: ({ cell }) => (
				<ActionButtons
					row={cell.row}
					deleteSuccess={fetchPackages}
				/>
			),
		},
	]);

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			link: '/packages/create'
		},
		// {
		// 	label: 'Reorder',
		// 	handleClick: '',
		// },
	]);

	return {
		columns,
		buttonList,
		formattedData,
		onChangeRowsPerPage,
		setPage,
		page,
		isLoading,
	};
};

export default usePackage;
