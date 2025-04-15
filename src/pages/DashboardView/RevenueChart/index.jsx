/* eslint-disable camelcase */
import React, { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import getChartColorsArray from '../../../components/Common/ChartsDynamicColor';
import { formatInKMB } from '../../../utils/helpers';
import Spinners from '../../../components/Common/Spinner';

const RevenueChart = ({ statsData, statsDataLoading }) => {
	const chartColors = getChartColorsArray(
		'["--bs-info", "--bs-primary","--bs-success"]'
	);
	const { defaultCurrency } = useSelector((state) => state.Currencies);

	const { categories, totalBetSeries, totalWinSeries,ggrAmount } = useMemo(() => {
		const dates = statsData.map((item) => moment(item?.date).format('MMM DD'));
		const total_bet_sc = statsData.map((item) => parseFloat(item.total_bet_sc));
		const total_win_sc = statsData.map((item) => parseFloat(item.total_win_sc));
		const total_GGR = statsData.map((item) => (parseFloat(item.total_bet_sc) - parseFloat(item.total_win_sc)).toFixed())
		return {
			categories: dates,
			totalBetSeries: total_bet_sc,
			totalWinSeries: total_win_sc,
			ggrAmount: total_GGR,
		}
	}, [statsData])

	const options = {
		chart: { type: 'line', zoom: { enabled: false }, toolbar: { show: false } },
		colors: chartColors,
		dataLabels: { enabled: false },
		// stroke: { show: true, width: 2, colors: ['transparent'] },
		stroke: { show: true, width: 4, curve: 'smooth' },
		xaxis: {
			categories,
		},
		yaxis: {
			labels: {
				formatter: (value) =>
					`${defaultCurrency?.symbol || ''} ${formatInKMB(value) || ''}`,
				style: {
					fontWeight: 'bold',
				},
			},
		},
		tooltip: {
			y: {
				formatter(value) {
					return `${defaultCurrency?.symbol || ''} ${value}`;
				},
			},
		},
		grid: { borderColor: '#f1f1f1' },
	};

	const series = [
		{
			name: "Total Bet Coins",
			data: totalBetSeries,
		},
		{
			name: "Total Win Coins",
			data: totalWinSeries,
		},
		{
			name: 'GGR',
			data:ggrAmount,
		}
		];

	return statsDataLoading && !statsData ? (
		<div style={{ height: '340px' }}>
			<Spinners />
		</div>
	) : (
		<ReactApexChart
			options={options}
			series={series}
			type="line"
			height="340"
			className="apex-charts"
		/>
	);
};

export default RevenueChart;

RevenueChart.defaultProps = {
	statsData: [],
	statsDataLoading: false,
};

RevenueChart.propTypes = {
	statsDataLoading: PropTypes.bool,
	statsData: PropTypes.arrayOf({
		date: PropTypes.string,
	}),
	dashFilters: PropTypes.shape({
		categories: PropTypes.arrayOf(
			PropTypes.shape({
				value: PropTypes.string,
			})
		),
	}).isRequired,
};
