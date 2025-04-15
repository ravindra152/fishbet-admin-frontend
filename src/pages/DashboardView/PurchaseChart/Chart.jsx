/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import moment from 'moment';
import React, { useMemo } from 'react';
import ApexCharts from 'react-apexcharts';
// import { addCommasToNumber } from '../../../utils/helpers';
import Spinners from '../../../components/Common/Spinner';

const CarbonLineBarChart = ({
	chartData = [],
	layoutModeType,
	statsDataLoading,
}) => {
	const { dateSeries,
		gcPurchasedSeries,
		scRewardedSeries,
		scRedeemedSeries } =
		useMemo(() => {
			const dates = chartData.map((val) => moment(val.transaction_date).format('MMM DD'));
			const gcPurchased = chartData.map((val) =>
				parseInt(val.total_gc_purchased, 10)
			);
			const scRewarded = chartData.map((val) => parseFloat(val.total_sc_rewarded).toFixed(2));
			const scRedeemed = chartData.map((val) => parseFloat(val.total_sc_redeemed).toFixed(2));

			return {
				dateSeries: dates,
				gcPurchasedSeries: gcPurchased,
				scRewardedSeries: scRewarded,
				scRedeemedSeries: scRedeemed
			};
		}, [chartData]);

	const options = {
		series: [
			{
				name: 'GC Purchased',
				data: gcPurchasedSeries,
			},
			{
				name: 'SC Rewarded',
				data: scRewardedSeries,
			},
			{
				name: 'SC Redeemed',
				data: scRedeemedSeries,
			},
		],
		chart: {
			type: 'bar',
			height: 350,
			stacked: true,
			toolbar: {
				show: true,
			},
			zoom: {
				enabled: true,
			},
		},
		plotOptions: {
			bar: {
				horizontal: false,
				borderRadius: 4,
				// borderRadiusApplication: 'end',
				// borderRadiusWhenStacked: 'last',
				// borderWidth: 2,
				borderColor: '#000',
				colors: {
					backgroundBarRadius: 10,
				},
				distributed: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		xaxis: {
			categories: dateSeries,
		},
		legend: {
			position: 'bottom',
			offsetY: 10,
		},
		fill: {
			opacity: 0.8,
		},
		tooltip: {
			y: {
				formatter: (val, { seriesIndex }) => {
					if (seriesIndex === 0) {
						return parseInt(val, 10);
					}
					return val;
				},
			},
		},
		colors: [
			layoutModeType === 'dark'
				? 'rgba(67, 247, 200, 0.9)'
				: 'rgba(7, 102, 75, 0.9)',
			layoutModeType === 'dark'
				? '#495fc5'
				: '#0631fb',
			layoutModeType === 'dark'
				? '#d15b5b'
				: '#d72828',
		],
	};

	return (
		<div id="chart">
			{/* <div className="d-flex justify-content-start">
				<div
					className="badge bg-success-subtle text-dark p-3 fs-4 rounded-4"
					style={{ marginBottom: '10px' }}
				>
					<h6 className="mb-0 font-weight-bold">
						<span className="text-success">Purchased:</span>{' '}
						{addCommasToNumber(ttlPurchase)}
					</h6>
				</div>
				<div
					className="badge bg-success-subtle text-dark p-3 fs-4 rounded-4 ms-3"
					style={{ marginBottom: '10px' }}
				>
					<h6 className="mb-0 font-weight-bold">
						<span className="text-success">Purchase Count:</span>{' '}
						{addCommasToNumber(ttlCount)}
					</h6>
				</div>
			</div> */}
			{statsDataLoading && !chartData ? (
				<div style={{ height: '340px' }}>
					<Spinners />
				</div>
			) : (
				<ApexCharts
					options={options}
					series={options.series}
					type="bar"
					height={340}
				/>
			)}
		</div>
	);
};

export default CarbonLineBarChart;