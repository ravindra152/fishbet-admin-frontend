/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'reactstrap';
import ReportList from './ReportList';
// import LivePlayerFilters from './LivePlayerFilters';

const LivePlayerReports = (props) => {
	const {
		isLivePlayerLoading,
		dashboardData,
		// livePlayerDateOptions,
		// setLiverPlayerDateOptions,
	} = props;
	const { defaultCurrency } = useSelector((state) => state.Currencies);

	const { GGR, todayGGR } = useMemo(() => {
		let ggr = 0;
		let betAmount = 0;
		let winAmount = 0;
		const todayGgr =
			Number(dashboardData?.dateWiseBetAmount || 0) -
			Number(dashboardData?.dateWiseWinAmount || 0);
		betAmount += Number(dashboardData?.totalBetAmount || 0);
		winAmount += Number(dashboardData?.totalWinAmount || 0);
		ggr += betAmount - winAmount;

		return {
			GGR: ggr.toFixed(2),
			todayGGR: todayGgr.toFixed(2),
			// overAllGgr: totalGgr?.toFixed(2)
		};
	}, [dashboardData]);

	const reportList = useMemo(
		() => [
			{
				title: 'Total GGR',
				description: `${defaultCurrency?.symbol || '$'} ${GGR || 0.0}`,
				iconClass: 'bx bx-money',
				reportClass: 'reportList1',
				// customClass: TAB_COLORS.info,
			},
			{
				title: 'Today GGR',
				description: `${defaultCurrency?.symbol || '$'} ${todayGGR || 0.0}`,
				iconClass: 'bx bxs-dollar-circle',
				reportClass: 'reportList1',
				// customClass: TAB_COLORS.info,
			},
			{
				title: 'Total Players',
				description: `${dashboardData?.totalPlayers || 0}`,
				iconClass: 'bx bxs-user-plus',
				reportClass: 'reportList2',
				// customClass: TAB_COLORS.primary,
			},
			{
				title: 'Active Players',
				description: `${dashboardData?.activePlayers || 0}`,
				iconClass: 'bx bxs-user-check',
				reportClass: 'reportList2',
				// customClass: TAB_COLORS.success,
			},
			{
				title: 'Total Games',
				description: `${typeof dashboardData?.totalCasinoGames === 'object'
					? 0
					: dashboardData?.totalCasinoGames || 0
					}`,
				iconClass: 'bx bx-play',
				reportClass: 'reportList4',
				// customClass: TAB_COLORS.warn,
			},
			{
				title: 'Total Win Amount',
				description: `${defaultCurrency?.symbol || '$'} ${dashboardData?.totalWinAmount || 0.0
					}`,
				iconClass: 'bx bx-money',
				reportClass: 'reportList4',
				// customClass: TAB_COLORS.success,
			},
			{
				title: 'Total Wager',
				description: `${defaultCurrency?.symbol || '$'} ${dashboardData?.totalBetAmount
					? parseInt(dashboardData?.totalBetAmount, 10)?.toFixed(2)
					: 0.0
					}`,
				iconClass: 'bx bxs-chip',
				reportClass: 'reportList4',
				// customClass: TAB_COLORS.success,
			},
			{
				title: 'Purchase Conv. Rate',
				description: `${dashboardData?.depositConversionRate || 0} %`,
				iconClass: 'bx bxs-credit-card',
				reportClass: 'reportList4',
				// customClass: TAB_COLORS.success,
			},
			{
				title: 'Total Purchased',
				description: `$ ${dashboardData?.coins?.total_sc_purchased || 0}`,
				iconClass: 'bx bxs-credit-card',
				reportClass: 'reportList4',
			},
			{
				title: 'Total Redeem',
				description: `$ ${dashboardData?.coins?.total_sc_redeemed || 0}`,
				iconClass: 'bx bxs-credit-card',
				reportClass: 'reportList4',
			},
			
			
		],
		[GGR, dashboardData]
	);

	return (
		<>
			{/* <LivePlayerFilters
				livePlayerDateOptions={livePlayerDateOptions}
				setLiverPlayerDateOptions={setLiverPlayerDateOptions}
			/> */}
			{reportList.map((report) => (
				<Col md="6" lg="3" xl="3" key={report?.title}>
					<ReportList
						title={report.title}
						description={report.description}
						iconClass={report.iconClass}
						isLoading={isLivePlayerLoading}
						reportClass={report.reportClass}
						customClass={report.customClass}
					/>
				</Col>
			))}
		</>
	);
};

LivePlayerReports.defaultProps = {
	dashboardData: {},
};

LivePlayerReports.propTypes = {
	dashboardData: PropTypes.shape({
		activeUsersCount: PropTypes.number,
		totalGames: PropTypes.number,
	}),
};

export default LivePlayerReports;
