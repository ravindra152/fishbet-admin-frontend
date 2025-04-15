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
	getDemographicStart,
	getGameReportStart,
	getKPIReportStart,
	getKPISummaryStart,
} from '../../../store/dashboardView/actions';
import {
	formatDateYMD,
	getDateDaysAgo,
	downloadFileInNewWindow,
} from '../../../utils/helpers';
import { countryFilter } from '../../../utils/countryFilter';
import {
	CONVERSIONRATE,
	COUNTRY,
	DEPOSITAMOUNT,
	DEPOSITORS,
	SIGNUPS,
} from '../DemoGraphCol';
import getChartColorsArray from '../../../components/Common/ChartsDynamicColor';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { modules } from '../../../constants/permissions';

const { VITE_APP_API_URL } = import.meta.env;

const useDemographicReport = () => {
	const dispatch = useDispatch();
	const { demoGraphicData, isDemographicLoading } = useSelector(
		(state) => state.DashboardViewInfo
	);
	const superAdminUser = useSelector(
		(state) => state.PermissionDetails.superAdminUser
	);
	const isSuperAdminLoading = useSelector(
		(state) => state.PermissionDetails.isSuperAdminLoading
	);
	const { isGranted } = usePermission();

	const [demoGraphState, setDemoGraphState] = useState([
		{
			startDate: getDateDaysAgo(0),
			endDate: new Date(),
			key: 'selection',
		},
	]);
	const [loggedInOptions, setLoggedInOptions] = useState({});
	const [demoDateOptions, setDemoDateOptions] = useState('yeartodate');
	const [demoGrapFormatedData, setDemoGrapFormatedData] = useState([]);
	const [playerGraphoptions, setPlayerGraphoptions] = useState({});

	const fetchData = () => {
		if (isGranted(modules.DemographReport, 'R'))
			dispatch(
				getDemographicStart({
					startDate: formatDateYMD(demoGraphState.map((a) => a.startDate)),
					endDate: formatDateYMD(demoGraphState.map((a) => a.endDate)),
					dateOptions: demoDateOptions,
				})
			);
	};
	const formatDataHandler = (list) => {
		const tempData = [];

		list &&
			list?.map((item) => {
				const { countryName } = countryFilter(item.country_code);

				const row = {
					x: countryName || item?.countryName || '',
					y: Number(item.signUpCount),
				};
				tempData.push(row);
				return null;
			});

		const finalData = [
			{
				name: 'Sign Ups',
				data: tempData,
			},
		];
		setDemoGrapFormatedData(finalData);
	};

	useEffect(() => {
		fetchData();
	}, [superAdminUser?.adminUserId]);

	useEffect(() => {
		fetchData();
	}, [demoDateOptions]);

	useEffect(() => {
		if (demoGraphicData) formatDataHandler(demoGraphicData);
	}, [demoGraphicData]);

	const demoGraphOptions = {
		chart: {
			type: 'bar',
		},
		plotOptions: {
			bar: {
				columnWidth: '40%',
				distributed: true,
			},
		},
		legend: {
			show: false,
		},
		dataLabels: {
			enabled: false,
			textAnchor: 'start',
			style: {
				colors: ['#fff'],
			},
		},
	};

	const exportReport = () => {
		downloadFileInNewWindow(
			`${VITE_APP_API_URL}/api/v1/report/demographic?startDate=${
				formatDateYMD(demoGraphState.map((a) => a.startDate)) ||
				moment().subtract(1, 'month').utc().toDate()
			}&endDate=${
				formatDateYMD(demoGraphState.map((a) => a.startDate)) || new Date()
			}&dateOptions=${demoDateOptions}&csvDownload=true&token=${getAccessToken()}`
		);
	};

	const demoGraphColumn = useMemo(
		() => [
			{
				Header: 'COUNTRY',
				accessor: 'countryName',
				filterable: true,
				Cell: ({ cell }) => <COUNTRY cell={cell} />,
			},
			{
				Header: 'SIGN UPS',
				accessor: 'signUpCount',
				filterable: true,
				Cell: ({ cell }) => <SIGNUPS cell={cell} />,
			},
			{
				Header: 'DEPOSITORS',
				accessor: 'depositCount',
				filterable: true,
				Cell: ({ cell }) => <DEPOSITORS cell={cell} />,
			},
			{
				Header: 'DEPOSIT AMOUNT',
				accessor: 'depositAmount',
				filterable: true,
				Cell: ({ cell }) => <DEPOSITAMOUNT cell={cell} />,
			},
			{
				Header: 'CONVERSION RATE',
				accessor: 'conversionRate',
				filterable: true,
				Cell: ({ cell }) => <CONVERSIONRATE cell={cell} />,
			},
		],
		[]
	);

	return {
		isSuperAdminLoading,
		demoGrapFormatedData,
		demoGraphOptions,
		demoGraphicData,
		demoGraphColumn,
		demoDateOptions,
		setDemoDateOptions,
		isDemographicLoading,
		exportReport,
	};
};

useDemographicReport.propTypes = {};

useDemographicReport.defaultProps = {
	cell: PropTypes.objectOf.isRequired,
};

export default useDemographicReport;
