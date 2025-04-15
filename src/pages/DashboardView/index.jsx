import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import {
	Container,
	Row,
	Col,
	//   Button,
	//   Card,
	//   CardBody,
	Spinner,
	Card,
	CardBody,
} from 'reactstrap';

// import classNames from 'classnames'

// import Charts
import { withTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { projectName } from '../../constants/config';
// import StackedColumnChart from './StackedColumnChart'

// import action
// import { getChartsData as onGetChartsData } from '../../store/actions'

// Pages Components
import WelcomeComp from './WelcomeComp';
// import MonthlyEarning from './MonthlyEarning'
// import SocialSource from './SocialSource'
// import TopCities from './TopCities'
// import LatestTranaction from './LatestTranaction'

// Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import useDashboardView from './hooks/useDashboardView';
import LivePlayerReports from './LivePlayerReports';
// import DemographicReport from './DemographicReport';
import KpiSummary from './KpiSummary';
import KpiReport from './KpiReport';
import GameReport from './GameReport';
// import LoggedInPlayer from './LoggedInPlayer';
import RevenueReport from './RevenueChart';

import './dashboard.scss';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';
import PlayerReport from './PlayerReport';
import CarbonLineBarChart from './PurchaseChart/Chart';
import DashboardFilters from './DashboardFilters';
// import DashboardFilters from './DashboardFilters';

const DashboardView = ({ t }) => {
	// const [activeKpiSummTab, setActiveKpiSummTab] = useState('banking');
	//   const dispatch = useDispatch()

	const selectDashboardState = (state) => state.Dashboard;
	const DashboardProperties = createSelector(
		selectDashboardState,
		(dashboard) => ({
			chartsData: dashboard.chartsData,
		})
	);

	const { chartsData } = useSelector(DashboardProperties);
	const { isGranted } = usePermission();

	//   const [periodData, setPeriodData] = useState([])
	//   const [periodType, setPeriodType] = useState('yearly')

	useEffect(() => {
		// setPeriodData(chartsData)
	}, [chartsData]);

	//   const onChangeChartPeriod = (pType) => {
	//     setPeriodType(pType)
	//     dispatch(onGetChartsData(pType))
	//   }

	//   useEffect(() => {
	//     // dispatch(onGetChartsData('yearly'))
	//   }, [dispatch])

	// meta title
	document.title = projectName;

	const {
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
		activeGameReportTab,
		setActiveGameReportTab,
		gameReportColumn,
		gameReport,
		gameReportDateOptions,
		KpiReportDateOptions,
		setKpiReportDateOptions,
		setGameReportDateOptions,
		iskPIReportLoading,
		isGameReportLoading,
		exportGameReport,
		exportKPIReport,
		exportKPISummaryReport,
		updateStartDate,
		iskPISummaryLoading,
		KpiSummaryState,
		// playerGraphoptions,
		ggrGraphOptions,
		currentMonth,
		actionType,
		setActionType,
		dashboardData,
		layoutModeType,
		filterValues,
		setFilterValue,
	} = useDashboardView();

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumbs
					title={t('Dashboards')}
					breadcrumbItem={t('Dashboard')}
					showRightInfo={false}
				/>
				<DashboardFilters value={filterValues} onChange={setFilterValue} />
				<Row>
					<Col xl="2">
						<WelcomeComp />
						{/* <MonthlyEarning /> */}
						{/* {isGranted(modules.Reports, 'R') && (
              <LoggedInPlayer
                loggedInOptions={loggedInOptions}
                isLivePlayerLoading={isLivePlayerLoading}
                playerGraphoptions={playerGraphoptions}
						  />
            )} */}
					</Col>
					<Col xl="10">
						<Row>
							{isGranted(modules.Reports, 'R') && (
								<LivePlayerReports
									dashboardData={dashboardData}
									isLivePlayerLoading={isLivePlayerLoading}
									// livePlayerData={livePlayerData}
									currentMonth={currentMonth}
									ggrGraphOptions={ggrGraphOptions}
									// livePlayerDateOptions={livePlayerDateOptions}
									setLiverPlayerDateOptions={setLiverPlayerDateOptions}
								/>
							)}
						</Row>

						{/* <Row>
							{isGranted(modules.DemographReport, 'R') && (
								<DemographicReport
									demoGrapFormatedData={demoGrapFormatedData}
									demoGraphOptions={demoGraphOptions}
									demoGraphicData={demoGraphicData}
									demoGraphColumn={demoGraphColumn}
									demoDateOptions={demoDateOptions}
									setDemoDateOptions={setDemoDateOptions}
									isDemographicLoading={isDemographicLoading}
									exportReport={exportReport}
								/>
							)}
						</Row> */}
					</Col>
				</Row>
				<Row>
					<Col xl="6">
						<Card>
							<CardBody>
								<h4 className="card-title font-size-16 d-flex align-items-center p-1">
									{/* <span className="mdi mdi-finance fs-1 me-3 text-success" />{' '} */}
									Purchase/Redeem Trends
								</h4>
								<CarbonLineBarChart
									dataColors='["--bs-primary", "--bs-success", "--bs-danger","--bs-info", "--bs-warning"]'
									chartData={dashboardData?.depositTrends}
									layoutModeType={layoutModeType}
									// statsDataLoading={statsDataLoading}
								/>
							</CardBody>
						</Card>
					</Col>
					<Col xl="6">
						<Card>
							<CardBody>
								<h4 className="card-title font-size-16 d-flex align-items-center">
									<span className="mdi mdi-finance fs-1 me-3 text-success" />{' '}
									GGR Report
								</h4>
								<RevenueReport
									statsData={dashboardData?.GGRTrend}
									statsDataLoading={isLivePlayerLoading}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
				{/* <Row> */}
				{/* {elementsToShow?.[DASH_REPORTS.ggrReport] ? ( */}
				{/* <Col xxl={12}>
						<Card>
							<CardBody>
								<h4 className="card-title font-size-16 d-flex align-items-center">
									<span className="mdi mdi-finance fs-1 me-3 text-success" />{' '}
									GGR Report
								</h4>
								<RevenueReport
									statsData={dashboardData?.GGRTrend}
									statsDataLoading={isLivePlayerLoading}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row> */}
				<Row>
					<Col xl="12">
						<Row>
							{isGranted(modules.Reports, 'R') && <PlayerReport />}
						</Row>
					</Col>
				</Row>
				<Row>
					<Col xl="12">
						<Row>
							{isGranted(modules.KpiSummaryReport, 'R') && (
								<KpiSummary
									activeKpiSummTab={activeKpiSummTab}
									setActiveKpiSummTab={setActiveKpiSummTab}
									kPISummaryColumn={kPISummaryColumn}
									kPISummary={kPISummary}
									exportReport={exportKPISummaryReport}
									updateStartDate={updateStartDate}
									iskPISummaryLoading={iskPISummaryLoading}
									KpiSummaryState={KpiSummaryState}
									actionType={actionType}
									setActionType={setActionType}
								/>
							)}
						</Row>
					</Col>
					<Col xl="12">
						<Row>
							{isGranted(modules.KpiReport, 'R') && (
								<KpiReport
									activeKpiReportTab={activeKpiReportTab}
									setActiveKpiReportTab={setActiveKpiReportTab}
									kPIReportColumn={kPIReportColumn}
									kPIReport={kPIReport}
									exportReport={exportKPIReport}
									KpiReportDateOptions={KpiReportDateOptions}
									setKpiReportDateOptions={setKpiReportDateOptions}
									iskPIReportLoading={iskPIReportLoading}
								/>
							)}
						</Row>
					</Col>
					<Col xl="12">
						<Row>
							{isGranted(modules.Reports, 'R') && (
								<GameReport
									activeGameReportTab={activeGameReportTab}
									setActiveGameReportTab={setActiveGameReportTab}
									gameReportColumn={gameReportColumn}
									gameReport={gameReport}
									exportReport={exportGameReport}
									isGameReportLoading={isGameReportLoading}
									gameReportDateOptions={gameReportDateOptions}
									setGameReportDateOptions={setGameReportDateOptions}
								/>
							)}
						</Row>
					</Col>
				</Row>
				{isSuperAdminLoading && (
					<Spinner
						color="secondary"
						className="position-absolute top-50 start-50"
					/>
				)}
			</Container>
		</div>
	);
};

DashboardView.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation()(DashboardView);
