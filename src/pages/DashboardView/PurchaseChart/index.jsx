/* eslint-disable react/prop-types */
import React from 'react';
import CarbonLineBarChart from './Chart';

const PurchaseChart = ({ statsData, layoutModeType, statsDataLoading }) => (
	<CarbonLineBarChart
		dataColors='["--bs-primary", "--bs-success", "--bs-danger","--bs-info", "--bs-warning"]'
		chartData={statsData?.grouped}
		layoutModeType={layoutModeType}
		statsDataLoading={statsDataLoading}
	/>
)

export default PurchaseChart;
