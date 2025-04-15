/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { Col, Card, CardBody } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import { getPlayerReport } from '../../network/getRequests';
import { ORDER_BY_FOR_PLAYER } from '../../utils/constant';
import TableContainer from '../../components/Common/TableContainer';
import { tableCustomClass } from '../../constants/config';

import {
  downloadFileInNewWindow,
} from '../../utils/helpers';

const { VITE_APP_API_URL } = import.meta.env;

const PlayerReport = () => {
	const topPlayerColumn = useMemo(
		() => [
			// {
			// 	Header: 'User ID',
			// 	accessor: 'user_id',
			// 	filterable: true,
			// 	Cell: ({ cell }) => cell.value || '-',
			// },
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
				Cell: ({ cell }) => parseInt(cell?.value, 10)?.toFixed(2) || '0',
			},
			{
				Header: 'Total Redeemed',
				accessor: 'total_sc_redeemed',
				filterable: true,
				Cell: ({ cell }) => parseInt(cell?.value, 10)?.toFixed(2) || '',
			},
			{
				Header: 'Total Win',
				accessor: 'total_sc_won',
				disableFilters: true,
				Cell: ({ cell }) => parseInt(cell?.value, 10)?.toFixed(2) || '0',
			},
			{
				Header: 'Total Wagered',
				accessor: 'total_sc_wagered',
				disableFilters: true,
				Cell: ({ cell }) => parseInt(cell?.value, 10)?.toFixed(2) || '0',
			},
			{
				Header: 'GGR',
				accessor: 'GGR',
				disableFilters: true,
				Cell: ({ cell }) => parseInt(cell?.value, 10)?.toFixed(2) || '0',
			},
			{
				Header: 'GC Balance',
				accessor: 'gc_balance',
				disableFilters: true,
				Cell: ({ cell }) => cell?.value || '',
			},
			{
				Header: 'SC Balance',
				accessor: 'sc_balance',
				disableFilters: true,
				Cell: ({ cell }) => cell?.value || '',
			},
			{
				Header: 'Total GC Bonus',
				accessor: 'total_gc_bonus',
				disableFilters: true,
				Cell: ({ cell }) => cell?.value || '',
			},
			{
				Header: 'Total SC Bonus',
				accessor: 'total_sc_bonus',
				disableFilters: true,
				Cell: ({ cell }) => cell?.value || '',
			},
		],
		[]
	);
	const [type, setType] = useState('bet_count');
	const [topPlayers, setTopPlayers] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const fetchData = async () => {
		setIsLoading(true);
		try {
			const { data } = await getPlayerReport({ orderBy: type });
			setTopPlayers(data?.data?.data);
			setIsLoading(false);
		} catch (e) {
			setIsLoading(false);
		}
	};
	// const onExportReport = () => {
	//   downloadFileInNewWindow(
	//     `${VITE_APP_API_URL}/api/v1/reports/top-players?orderBy=bet_count`
	//   );

	// }

	const onExportReport = () => {
		if (!topPlayers || topPlayers.length === 0) {
		  alert("No data available to export.");
		  return;
		}
	  
		// Extract headers dynamically
		const headers = Object.keys(topPlayers[0]).join(",") + "\n";
	  
		// Convert data to CSV format
		const csvRows = topPlayers.map(row =>
		  Object.values(row).map(value => `"${value}"`).join(",") // Wrap values in quotes
		).join("\n");
	  
		// Combine headers and data
		const csvContent = "data:text/csv;charset=utf-8," + headers + csvRows;
	  
		// Create and trigger download
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "PlayerReport.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	  };
	  
	  // Usage: Call handleDownload when needed
	  <button onClick={onExportReport}>Export CSV</button>;


	useEffect(() => {
		fetchData();
	}, [type]);

	const updateData = topPlayers?.map((item) => ({
		...item,
		GGR: (item?.total_sc_wagered || 0) - (item?.total_sc_won || 0) || 0,
	}));

	return (
		<Col xl="12">
			<Card>
				<CardBody>
					<div className="float-end">
						<div className="d-flex justify-content-between align-items-center">
							<select
								value={type}
								className="form-select ms-2"
								onChange={(e) => {
									setType(e.target.value);
								}}
							>
								{ORDER_BY_FOR_PLAYER?.map((item) => (
									<option value={item.value} key={item.value}>
										{item.label}
									</option>
								))}
							</select>
							<button
								type="button"
								className="btn btn-primary dashboard-export-btn"
								onClick={onExportReport}
							>
								Export Details
								<i className="bx bx-download align-baseline ms-1" />
							</button>
						</div>
					</div>
					<h4 className="card-title mb-4">Top Players</h4>
					<SimpleBar style={{ maxHeight: '330px' }}>
						<TableContainer
							columns={topPlayerColumn || []}
							data={updateData || []}
							isGlobalFilter={false}
							isPagination={false}
							tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
							// tbodyClass="kpiTableWrap"
							// theadClass={theadClass}
							paginationDiv="justify-content-center"
							pagination="pagination justify-content-start pagination-rounded"
							pageCount={1}
							customPageSize={topPlayers?.length || 15}
							// tbodyHeight="300"
							isLoading={isLoading}
						/>
					</SimpleBar>
				</CardBody>
			</Card>
		</Col>
	);
};

export default PlayerReport;
