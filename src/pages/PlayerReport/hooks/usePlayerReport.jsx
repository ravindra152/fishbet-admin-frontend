/* eslint-disable react/prop-types */
import React, { useMemo, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { isEqual } from 'lodash';
import { getPlayerReport } from '../../../network/getRequests';
import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { debounceTime } from '../../../constants/config';

let debounce;

const usePlayerReport = () => {
	// const [type, setType] = useState('totalDeposit');
	const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
	const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);
	const [isFilterChanged, setIsFilterChanged] = useState(false);
	const [topPlayers, setTopPlayers] = useState(null);
	const [totalPages, setTotalPages] = useState(null);
	const totalCount = totalPages * 10;
	const [isLoading, setIsLoading] = useState(false);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const prevValues = useRef(null);
	const isFirst = useRef(true);
	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};
	const fetchData = async (values) => {
		setIsLoading(true);
		try {
			const { data } = await getPlayerReport({
				limit: itemsPerPage,
				...values,
			});
			setTopPlayers(data?.data?.data);
			setTotalPages(data?.data?.totalPages);

			setIsLoading(false);
		} catch (e) {
			setIsLoading(false);
		}
	};
	// const exportReport = () => {
	//   downloadFileInNewWindow(
	//     `${VITE_APP_API_URL}/api/v1/report/top-players?dataOptions=${type}`
	//   );

	// }
	
	const updateData = topPlayers?.map((item) => ({
		...item,
		GGR: (item?.total_sc_wagered || 0) - (item?.total_sc_won || 0) || 0,
	}));

	console.log(topPlayers)

	const handleDownload = () => {
		if (!topPlayers || topPlayers.length === 0) {
		  alert("No data available to export.");
		  return;
		}
	  
		const headers = Object.keys(topPlayers[0]).join(",") + "\n";
	  
		// Convert to CSV
		const csvRows = topPlayers.map(row =>
		  Object.values(row).map(value => `"${value}"`).join(",") // Wrap values in quotes
		).join("\n");
	  
		const csvContent = "data:text/csv;charset=utf-8," + headers + csvRows;
	  
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "PlayerReport.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	  };
	  
	  <button onClick={handleDownload}>Export CSV</button>;
	  
	const buttonList = useMemo(() => [
			{
				label: '',
				handleClick: handleDownload,
				link: '#!',
				tooltip: 'Download as CSV',
				icon: <i className="mdi mdi-file-download-outline" />,
			},
		]);

	const topPlayerColumn = useMemo(
		() => [
			{
				Header: 'User ID',
				accessor: 'user_id',
				filterable: true,
				Cell: ({ cell }) => cell.value || '-',
			},
			{
				Header: 'Username',
				accessor: 'user_name',
				filterable: true,
				// eslint-disable-next-line react/no-unstable-nested-components
				Cell: ({ cell }) => (
					<Link
						to={`/player-details/${cell?.row?.original?.user_id}`}
						state={{ prevUrl: '/dashboard' }}
					>
						{cell.value ? cell.value : '-'}
					</Link>
				),
			},

			{
				Header: 'Bet Count',
				accessor: 'bet_count',
				filterable: true,
				Cell: ({ cell }) => cell?.value || '',
			},
			{
				Header: 'Win Count',
				accessor: 'win_count',
				filterable: true,
				Cell: ({ cell }) => cell?.value || '',
			},
			{
				Header: 'Total Purchased',
				accessor: 'total_sc_purchased',
				filterable: true,
				Cell: ({ cell }) => parseFloat(cell?.value, 10)?.toFixed(2) || '0',
			},
			{
				Header: 'Total Redeemed',
				accessor: 'total_sc_redeemed',
				filterable: true,
				Cell: ({ cell }) => parseFloat(cell?.value, 10)?.toFixed(2) || '',
			},
			{
				Header: 'Total Win',
				accessor: 'total_sc_won',
				disableFilters: true,
				Cell: ({ cell }) => parseFloat(cell?.value, 10)?.toFixed(2) || '0',
			},
			{
				Header: 'Total Wagered',
				accessor: 'total_sc_wagered',
				disableFilters: true,
				Cell: ({ cell }) => parseFloat(cell?.value, 10)?.toFixed(2) || '0',
			},
			{
				Header: 'GGR',
				accessor: 'GGR',
				disableFilters: true,
				Cell: ({ cell }) => parseFloat(cell?.value, 10)?.toFixed(2) || '0',
			},
			// {
				// 	Header: 'Withdraw',
				// 	accessor: 'totalwithdraw',
			// 	disableFilters: true,
			// 	Cell: ({ cell }) => cell?.value || '',
			// },
			{
				Header: 'GC Balance',
				accessor: 'gc_balance',
				disableFilters: true,
				Cell: ({ cell }) => parseFloat(cell?.value, 10)?.toFixed(2) || '0',
			},
			{
				Header: 'SC Balance',
				accessor: 'sc_balance',
				disableFilters: true,
				Cell: ({ cell }) => parseFloat(cell?.value, 10)?.toFixed(2) || '0',
			},
		],
		[]
	);
	const { validation, formFields } = useForm({
		initialValues: getInitialValues(),
		validationSchema: validationSchema(),
		// onSubmitEntry: handleFilter,
		staticFormFields,
	});
	const handleClear = () => {
		const initialValues = getInitialValues();
		validation.resetForm(initialValues);
	};
	const actionButtons = useMemo(() => [
		{
			type: 'button', // if you pass type button handle the click event
			label: '',
			icon: 'mdi mdi-refresh',
			handleClick: handleClear,
			tooltip: 'Clear filter',
			id: 'clear',
		},
	]);
	const handleFilter = (values) => {
		fetchData({ page: 1, ...values });
	};

	useEffect(() => {
		fetchData({ page: currentPage,...validation.values });
	}, [currentPage, itemsPerPage]);

	useEffect(() => {
		if (!isFirst.current && !isEqual(validation.values, prevValues.current)) {
			setIsFilterChanged(true);
			debounce = setTimeout(() => {
				handleFilter(validation.values);
			}, debounceTime);
			prevValues.current = validation.values;
		}
		isFirst.current = false;
		if (isEqual(getInitialValues(), validation.values)) {
			setIsFilterChanged(false);
		}
		return () => clearTimeout(debounce);
	}, [validation.values]);

	return {
		topPlayerColumn,
		updateData,
		isLoading,
		currentPage,
		itemsPerPage,
		setCurrentPage,
		onChangeRowsPerPage,
		totalPlayerReportsCount: totalCount,
		filterFields: formFields,
		filterValidation: validation,
		actionButtons,
		isAdvanceOpen,
		toggleAdvance,
		isFilterChanged,
		buttonList
	};
};

export default usePlayerReport;
