/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getAccessToken } from '../../../network/storageUtils';
import {
	getLivePlayerInfoStart,
	getGameReportStart,
	getKPIReportStart,
	getKPISummaryStart,
} from '../../../store/dashboardView/actions';
import {
	formatDateYMD,
	getDateDaysAgo,
	downloadFileInNewWindow,
	strToInt,
} from '../../../utils/helpers';
import { countryFilter } from '../../../utils/countryFilter';
import {
	CustomDate,
	Delta,
	RowName,
	Today,
	Yesterday,
} from '../KpiSummary/KpiListCol';
import {
	BONUSGGR,
	BONUSWIN,
	DELTAGGR,
	DELTATOTALBETS,
	GGR,
	ProviderName,
	REALBET,
	REALWIN,
	TOTALBETS,
} from '../KpiReport/KpiReportListCol';
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
} from '../GameReport/gameListCol';
import getChartColorsArray from '../../../components/Common/ChartsDynamicColor';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { modules } from '../../../constants/permissions';
import { month } from '../../../constants/config';
import { getDashBoardData } from '../../../network/getRequests';

const { VITE_APP_API_URL } = import.meta.env;

const useDashboardView = () => {
	const [filterValues, setFilterValue] = useState({
		endDate: moment(new Date()).toDate(),
		startDate: moment(new Date()).subtract(7, 'days').toDate(),
	});
	const [dashboardData, setDashboardData] = useState(null);
	const { layoutModeType } = useSelector((state) => state.Layout);
	const dispatch = useDispatch();
	const {
		isLivePlayerLoading,
		livePlayerData,
		kPISummary,
		kPIReport,
		gameReport,
		isGameReportLoading,
		iskPIReportLoading,
		iskPISummaryLoading,
	} = useSelector((state) => state.DashboardViewInfo);
	const superAdminUser = useSelector(
		(state) => state.PermissionDetails.superAdminUser
	);
	const isSuperAdminLoading = useSelector(
		(state) => state.PermissionDetails.isSuperAdminLoading
	);
	const { isGranted } = usePermission();

	const [gameReportState, setGameReportState] = useState([
		{
			startDate: getDateDaysAgo(0),
			endDate: new Date(),
			key: 'selection',
		},
	]);
	const [livePlayerState, setLivePlayerState] = useState([
		{
			startDate: getDateDaysAgo(0),
			endDate: new Date(),
			key: 'selection',
		},
	]);
	const [KpiReportState, setKpiReportState] = useState([
		{
			startDate: getDateDaysAgo(0),
			endDate: new Date(),
			key: 'selection',
		},
	]);
	const [KpiSummaryState, setKpiSummaryState] = useState([
		{
			startDate: getDateDaysAgo(7),
			endDate: new Date(),
			key: 'selection',
		},
	]);

	const [gameReportDateOptions, setGameReportDateOptions] =
		useState('yeartodate');
	const [livePlayerDateOptions, setLiverPlayerDateOptions] =
		useState('yeartodate');
	const [KpiReportDateOptions, setKpiReportDateOptions] =
		useState('yeartodate');
	const [activeKpiSummTab, setActiveKpiSummTab] = useState('Banking');
	const [activeKpiReportTab, setActiveKpiReportTab] = useState('game');
	const [activeGameReportTab, setActiveGameReportTab] = useState('game');
	// const [playerGraphoptions, setPlayerGraphoptions] = useState({});
	const [ggrGraphOptions, setGgrGraphOptions] = useState({});
	const [demoDateOptions, setDemoDateOptions] = useState('yeartodate');
	const [actionType, setActionType] = useState(null);
	const dateNow = new Date();
	const currentMonth = month[dateNow.getMonth()];

	const fetchGameReport = () => {
		if (isGranted(modules.Reports, 'R'))
			dispatch(
				getGameReportStart({
					customStartDate: formatDateYMD(
						gameReportState.map((a) => a.startDate)
					),
					customEndDate: formatDateYMD(gameReportState.map((a) => a.endDate)),
					dateOptions: gameReportDateOptions,
					tab: activeGameReportTab,
				})
			);
	};
	const fetchKIPReport = () => {
		if (isGranted(modules.KpiReport, 'R'))
			dispatch(
				getKPIReportStart({
					customStartDate: formatDateYMD(
						KpiReportState.map((a) => a.startDate)
					),
					customEndDate: formatDateYMD(KpiReportState.map((a) => a.endDate)),
					dateOptions: KpiReportDateOptions,
					tab: activeKpiReportTab,
				})
			);
	};
	const fetchKIPSummary = () => {
		if (isGranted(modules.KpiSummaryReport, 'R'))
			dispatch(
				getKPISummaryStart({
					customStartDate: formatDateYMD(
						KpiSummaryState.map((a) => a.startDate)
					),
					customEndDate: formatDateYMD(KpiSummaryState.map((a) => a.endDate)),
					// dateOptions: KpiReportDateOptions,
					tab: activeKpiSummTab,
					actionType,
				})
			);
	};
	// const fetchLivePlayerData = () => {
	// 	if (isGranted(modules.Reports, 'R'))
	// 		dispatch(
	// 			getLivePlayerInfoStart({
	// 				customStartDate: formatDateYMD(
	// 					livePlayerState.map((a) => a.startDate)
	// 				),
	// 				customEndDate: formatDateYMD(livePlayerState.map((a) => a.endDate)),
	// 				dateOptions: livePlayerDateOptions,
	// 			})
	// 		);
	// };
	const updateStartDate = (newStartDate) => {
		const updatedKpiSummaryState = [
			{
				...KpiSummaryState[0],
				startDate: newStartDate,
			},
		];
		// Update the state with the new array
		setKpiSummaryState(updatedKpiSummaryState);
	};
	useEffect(() => {
		if (isGranted(modules.Reports, 'R'))
			// fetchLivePlayerData();
			fetchKIPSummary();
		fetchGameReport();
		fetchKIPReport();
	}, [superAdminUser?.adminUserId]);

	useEffect(() => {
		const apexsaleschartColors = getChartColorsArray(
			'["--bs-primary", "--bs-success", "--bs-danger"]'
		);

		// Player graph not needed client feedback
		// const playerOptions = {
		// 	colors: apexsaleschartColors,
		// 	series: [
		// 		Number(livePlayerData?.loggedInPlayer) || 0,
		// 		Number(livePlayerData?.totalPlayers) || 0,
		// 	],
		// 	labels: ['Logged in Players', 'Total Players'],
		// 	legend: {
		// 		position: 'bottom',
		// 	},
		// 	fill: {
		// 		type: 'gradient',
		// 	},
		// 	dataLabels: {
		// 		enabled: true, // Show data labels
		// 	},

		// 	plotOptions: {
		// 		pie: {
		// 			donut: {
		// 				size: '50%',
		// 			},
		// 		},
		// 	},
		// };
		// setPlayerGraphoptions(playerOptions);
		const ggrOptions = {
			colors: apexsaleschartColors,
			series: [
				{
					name: 'Total',
					data: [
						strToInt(livePlayerData?.todayTotalGgrInUSD) || 0,
						strToInt(livePlayerData?.todayTotalGgrInIDR) || 0,
					],
				},
				{
					name: 'Current Month',
					data: [
						strToInt(livePlayerData?.totalGgrPerMonthInUSD) || 0,
						strToInt(livePlayerData?.totalGgrPerMonthInIDR) || 0,
					],
				},
			],
			options: {
				chart: {
					type: 'bar',
					height: 420,
				},
				plotOptions: {
					bar: {
						horizontal: true,
						dataLabels: {
							position: 'top',
						},
					},
				},
				dataLabels: {
					enabled: true,
					offsetX: -6,
					style: {
						fontSize: '12px',
						colors: ['#fff'],
					},
				},
				stroke: {
					show: true,
					width: 1,
					colors: ['#fff'],
				},
				tooltip: {
					shared: true,
					intersect: false,
				},
				xaxis: {
					categories: ['USD', 'IDR'],
				},
			},
		};
		setGgrGraphOptions(ggrOptions);
	}, [livePlayerData && livePlayerData?.deviceLoggedIn]);

	useEffect(() => {
		fetchGameReport();
	}, [gameReportDateOptions, activeGameReportTab]);
	useEffect(() => {
		fetchKIPReport();
	}, [KpiReportDateOptions, activeKpiReportTab]);
	useEffect(() => {
		fetchKIPSummary();
	}, [activeKpiSummTab, KpiSummaryState, actionType]);
	// useEffect(() => {
	// 	fetchLivePlayerData();
	// }, [livePlayerDateOptions]);

	// const exportReport = () => {
	// 	downloadFileInNewWindow(
	// 		`${VITE_APP_API_URL}/api/v1/report/demographic?startDate=${
	// 			formatDateYMD(demoGraphState.map((a) => a.startDate)) ||
	// 			moment().subtract(1, 'month').utc().toDate()
	// 		}&endDate=${
	// 			formatDateYMD(demoGraphState.map((a) => a.startDate)) || new Date()
	// 		}&dateOptions=${demoDateOptions}&csvDownload=true&token=${getAccessToken()}`
	// 	);
	// };

	// FIXME: update the date range after real time implementation
	const exportKPISummaryReport = () => {
		downloadFileInNewWindow(
			`${VITE_APP_API_URL}/api/v1/report/kpi-summary?tab=${activeKpiSummTab}startDate=${
				formatDateYMD(KpiSummaryState.map((a) => a.startDate)) ||
				moment().subtract(1, 'month').utc().toDate()
			}&endDate=${
				formatDateYMD(KpiSummaryState.map((a) => a.startDate)) || new Date()
			}&csvDownload=true&token=${getAccessToken()}`
		);
	};
	// FIXME: update the date range after real time implementation
	const exportKPIReport = () => {
		downloadFileInNewWindow(
			`${VITE_APP_API_URL}/api/v1/report/kpi?tab=${activeKpiReportTab}&dateOptions=${demoDateOptions}&customStartDate=${
				formatDateYMD(KpiReportState.map((a) => a.startDate)) ||
				moment().subtract(1, 'month').utc().toDate()
			}&customEndDate=${
				formatDateYMD(KpiReportState.map((a) => a.startDate)) || new Date()
			}&csvDownload=true&token=${getAccessToken()}`
		);
	};
	// FIXME: update the date range after real time implementation
	const exportGameReport = () => {
		downloadFileInNewWindow(
			`${VITE_APP_API_URL}/api/v1/report/kpi?tab=${activeKpiReportTab}&dateOptions=${demoDateOptions}&customStartDate=${
				formatDateYMD(gameReportState.map((a) => a.startDate)) ||
				moment().subtract(1, 'month').utc().toDate()
			}&customEndDate=${
				formatDateYMD(gameReportState.map((a) => a.startDate)) || new Date()
			}&csvDownload=true&token=${getAccessToken()}`
		);
	};
	// const fetchDashBoardData = async () => {
	// 	try {
	// 		const formattedStartDate = moment(filterValues.startDate).format('YYYY-MM-DD');
	// 		const formattedEndDate = moment(filterValues.endDate).format('YYYY-MM-DD');
	// 		const res = await getDashBoardData({
	// 			startDate: formattedStartDate,
	// 			endDate: formattedEndDate,
	// 		});
	
	
	// 		setDashboardData(res?.data?.data);
	// 	} catch (error) {
	// 		console.log('fetchDashBoardData ~ error:', error);
	// 	}
	// };

	const fetchDashBoardData = async () => {
		try {
			const res = await getDashBoardData({
				startDate: moment(filterValues.startDate).format('yyyy-MM-DD'),
				endDate:moment(filterValues.endDate).format('yyyy-MM-DD'),
			});
			setDashboardData(res?.data?.data);
		} catch (error) {
			console.log('fetchDashBoardData ~ error:', error);
		}
	};
	useEffect(() => {
		fetchDashBoardData();
	}, [filterValues]);
	const kPISummaryColumn = useMemo(
		() => [
			{
				Header: 'DATA',
				accessor: 'rowName',
				filterable: true,
				Cell: ({ cell }) => <RowName cell={cell} />,
			},
			{
				Header: 'TODAY',
				accessor: 'today',
				filterable: true,
				Cell: ({ cell }) => <Today cell={cell} />,
			},
			{
				Header: 'YESTERDAY',
				accessor: 'yesterday',
				filterable: true,
				Cell: ({ cell }) => <Yesterday cell={cell} />,
			},
			{
				Header: 'MONTH TO DATE',
				accessor: 'monthToDate',
				filterable: true,
				// Cell: ({ cell }) => <Role cell={cell} />,
			},
			{
				Header: 'CUSTOM DATE',
				accessor: 'customDate',
				filterable: true,
				Cell: ({ cell }) => <CustomDate cell={cell} />,
			},
			{
				Header: 'DELTA',
				accessor: 'delta',
				disableFilters: true,
				Cell: ({ cell }) => <Delta cell={cell} />,
			},
			{
				Header: 'Currency',
				accessor: 'currencyCode',
				filterable: true,
				Cell: ({ cell }) => <CURRENCY cell={cell} />,
			},
		],
		[]
	);

	const kPIReportColumn = useMemo(
		() => [
			{
				Header: 'PROVIDER/CLIENT',
				accessor: 'provider',
				filterable: true,
				Cell: ({ cell }) => <ProviderName cell={cell} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <NAME cell={cell} />,
			},
			{
				Header: 'Currency',
				accessor: 'currencyCode',
				filterable: true,
				Cell: ({ cell }) => <CURRENCY cell={cell} />,
			},
			{
				Header: 'GGR',
				accessor: 'GGR',
				filterable: true,
				Cell: ({ cell }) => <GGR cell={cell} />,
			},
			{
				Header: 'DELTA GGR',
				accessor: 'deltaGGR',
				filterable: true,
				Cell: ({ cell }) => <DELTAGGR cell={cell} />,
			},
			{
				Header: 'REAL BET',
				accessor: 'realBet',
				filterable: true,
				Cell: ({ cell }) => <REALBET cell={cell} />,
			},
			{
				Header: 'REAL WIN',
				accessor: 'realWin',
				filterable: true,
				Cell: ({ cell }) => <REALWIN cell={cell} />,
			},
			{
				Header: 'BONUS Bet',
				accessor: 'bonusBet',
				disableFilters: true,
				Cell: ({ cell }) => <BONUSWIN cell={cell} />,
			},
			{
				Header: 'BONUS WIN',
				accessor: 'bonusWin',
				disableFilters: true,
				Cell: ({ cell }) => <BONUSWIN cell={cell} />,
			},
			{
				Header: 'BONUS GGR',
				accessor: 'bonusGGR',
				disableFilters: true,
				Cell: ({ cell }) => <BONUSGGR cell={cell} />,
			},
			{
				Header: 'TOTAL BETS',
				accessor: 'totalBets',
				disableFilters: true,
				Cell: ({ cell }) => <TOTALBETS cell={cell} />,
			},
			{
				Header: 'DELTA TOTAL BETS',
				accessor: 'deltaTotalBets',
				disableFilters: true,
				Cell: ({ cell }) => <DELTATOTALBETS cell={cell} />,
			},
		],
		[]
	);

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
		isSuperAdminLoading,
		isLivePlayerLoading,
		// livePlayerData,
		// livePlayerDateOptions,
		setLiverPlayerDateOptions,
		activeKpiSummTab,
		setActiveKpiSummTab,
		kPISummaryColumn,
		kPISummary,
		activeKpiReportTab,
		setActiveKpiReportTab,
		kPIReport,
		kPIReportColumn,
		gameReport,
		gameReportColumn,
		activeGameReportTab,
		setActiveGameReportTab,
		gameReportDateOptions,
		setGameReportDateOptions,
		KpiReportDateOptions,
		setKpiReportDateOptions,
		isGameReportLoading,
		// exportReport,
		exportGameReport,
		exportKPIReport,
		exportKPISummaryReport,
		iskPIReportLoading,
		updateStartDate,
		KpiSummaryState,
		iskPISummaryLoading,
		// playerGraphoptions,
		ggrGraphOptions,
		currentMonth,
		setActionType,
		actionType,
		dashboardData,
		layoutModeType,
		filterValues, setFilterValue
	};
};

useDashboardView.propTypes = {};

useDashboardView.defaultProps = {
	cell: PropTypes.objectOf.isRequired,
};

export default useDashboardView;
