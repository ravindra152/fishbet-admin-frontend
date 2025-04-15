/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEqual, values } from 'lodash';
import {
	GAMEREVENUE,
	IdValue,
	NAME,
	NUMBERFPLAYER,
	NUMBEROFROUNDS,
	PAYOUT,
	TOTALBETSGAME,
	TOTALWINS,
	CURRENCY,
} from '../gameListCol';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { modules } from '../../../constants/permissions';
import { getGameReportListStart } from '../../../store/gameReportList/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getInitialValues,
	validationSchema,
	staticFormField,
} from '../formDetails';
import { debounceTime } from '../../../constants/config';
import { formatDateYMD } from '../../../utils/helpers';

let debounce;
const useGameReportList = () => {
	const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
	const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);
	const [isFilterChanged, setIsFilterChanged] = useState(false);
	const dispatch = useDispatch();
	const prevValues = useRef(null);
	const isFirst = useRef(true);
	const { gameReport, isGameReportLoading } = useSelector(
		(state) => state.GameReportList
	);
	const totalPages = gameReport?.totalPages ?? 0;
	const totalCount = totalPages * 10;
	const superAdminUser = useSelector(
		(state) => state.PermissionDetails.superAdminUser
	);

	const { isGranted } = usePermission();

	const [gameReportDateOptions, setGameReportDateOptions] =
		useState('yeartodate');

	const [activeGameReportTab, setActiveGameReportTab] = useState('game');

	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const fetchGameReport = (values) => {
		if (isGranted(modules.Reports, 'R'))
			dispatch(
				getGameReportListStart({
					limit: itemsPerPage,
					...values,
					startDate: values?.startDate
						? formatDateYMD(values?.startDate)
						: null,
					endDate: values?.endDate ? formatDateYMD(values?.endDate) : null,
				})
			);
	};

	const handleDownload = () => {
		if (!gameReport?.game || gameReport?.game.length === 0) {
		  alert("No data available to export.");
		  return;
		}
	  
		const headers = Object.keys(gameReport.game[0]).join(",") + "\n";
	  
		// Convert to CSV 
		const csvRows = gameReport.game
		  .map(row => Object.values(row).map(value => `"${value}"`).join(",")) // Wrap values in quotes
		  .join("\n");
	  
		const csvContent = headers + csvRows;
	  
		const blob = new Blob([csvContent], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		
		const link = document.createElement("a");
		link.href = url;
		link.download = "GameReport.csv";
		document.body.appendChild(link);
		link.click();
		
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	  };
	  
	  <button onClick={handleDownload}>Export CSV</button>;
	  
	  

	// console.log("getGameReportListStart",gameReport?.game)
	const buttonList = useMemo(() => [
		{
			label: '',
			handleClick: handleDownload,
			link: '#!',
			tooltip: 'Download as CSV',
			icon: <i className="mdi mdi-file-download-outline" />,
		},
	]);

	useEffect(() => {
		fetchGameReport({ page: 1 });
	}, [superAdminUser?.adminUserId]);

	const { validation, formFields } = useForm({
		initialValues: getInitialValues(),
		validationSchema: validationSchema(),
		// onSubmitEntry: handleFilter,
		staticFormFields: staticFormField,
	});
	const handleClear = () => {
		const initialValues = getInitialValues();
		validation.resetForm(initialValues);
	};
	useEffect(() => {
		fetchGameReport({ page: currentPage, ...validation.values });
	}, [currentPage, itemsPerPage]);

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
		fetchGameReport({ page: 1, ...values });
	};
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

	const gameReportColumn = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'game_id',
				filterable: true,
				Cell: ({ cell }) => <IdValue cell={cell} />,
			},
			{
				Header: 'NAME',
				accessor: 'game_name',
				filterable: true,
				Cell: ({ cell }) => <NAME cell={cell} />,
			},
			// {
			// 	Header: 'NUMBER OF ROUNDS',
			// 	accessor: 'betCount',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <NUMBEROFROUNDS cell={cell} />,
			// },
			// {
			// 	Header: 'NUMBER OF PLAYER',
			// 	accessor: 'userCount',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <NUMBERFPLAYER cell={cell} />,
			// },
			{
				Header: 'GC Wagered',
				accessor: 'gc_wagered',
				filterable: true,
				Cell: ({ cell }) => <TOTALBETSGAME cell={cell} />,
			},
			{
				Header: 'GC Won',
				accessor: 'gc_won',
				disableFilters: true,
				Cell: ({ cell }) => <TOTALWINS cell={cell} />,
			},
			{
				Header: 'SC Wagered',
				accessor: 'sc_wagered',
				disableFilters: true,
				Cell: ({ cell }) => <GAMEREVENUE cell={cell} />,
			},
			{
				Header: 'SC Won',
				accessor: 'sc_won',
				disableFilters: true,
				Cell: ({ cell }) => <GAMEREVENUE cell={cell} />,
			},
			{
				Header: 'GGR',
				accessor: 'GGR',
				disableFilters: true,
				Cell: ({ cell }) => <GAMEREVENUE cell={cell} />,
			},
			{
				Header: 'PAYOUT',
				accessor: 'payout',
				disableFilters: true,
				Cell: ({ cell }) => <PAYOUT cell={cell} />,
			},
			// {
			// 	Header: 'Currency',
			// 	accessor: 'currencyCode',
			// 	filterable: true,
			// 	Cell: ({ cell }) => <CURRENCY cell={cell} />,
			// },
		],
		[]
	);

	return {
		gameReport,
		gameReportColumn,
		isGameReportLoading,
		itemsPerPage,
		currentPage,
		setCurrentPage,
		onChangeRowsPerPage,
		totalGameReportCount: totalCount,
		filterFields: formFields,
		filterValidation: validation,
		actionButtons,
		isAdvanceOpen,
		toggleAdvance,
		isFilterChanged,
		buttonList
	};
};

export default useGameReportList;
