/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import {
	Col,
	Card,
	Nav,
	CardBody,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
} from 'reactstrap';
import classnames from 'classnames';
// import { exportToExcel } from 'react-json-to-excel';

// Simple bar
import SimpleBar from 'simplebar-react';
import TableContainer from '../../../components/Common/TableContainer';
import { tableCustomClass } from '../../../constants/config';
import { dateConstants } from '../constant';

const GameReport = (props) => {
	const {
		activeGameReportTab,
		setActiveGameReportTab,
		gameReportColumn,
		gameReport,
		exportReport,
		isGameReportLoading,
		gameReportDateOptions,
		setGameReportDateOptions
	} = props;
	const modifiedGameReportData = gameReport?.game?.map((item) => ({
		...item,
		GGR: (item?.sc_wagered || 0) - (item.sc_won || 0) || 0,
		payout: item.sc_won
			? ((item.sc_won / item.sc_wagered) * 100).toFixed(2)
			: '100',
	}));

	const modifiedProviderData = gameReport?.provider?.map((item) => ({
		...item,
		game_id: item?.provider_id,
		game_name: item?.provider_name?.EN,
		GGR: (item?.sc_wagered || 0) - (item.sc_won || 0) || 0,
		payout: item.sc_won
			? ((item.sc_won / item.sc_wagered) * 100).toFixed(2)
			: '100',
	}));

	const exportDataFormat = modifiedGameReportData.map((item) => ({
		gameId: item?.game_id,
		gameName: item?.game_name,
		GcWagered: item?.gc_wagered,
		GcWon: item?.gc_won,
		ScWagered: item.sc_wagered,
		ScWon: item?.sc_won,
		GGR: item?.GGR,
		Payout: item?.payout
	}))

	const onExportReport = () => {
		if (!gameReport?.game || gameReport?.game.length === 0) {
		  alert("No data available to export.");
		  return;
		}
	  
		// Extract headers dynamically
		const headers = Object.keys(gameReport.game[0]).join(",") + "\n";
	  
		// Convert data to CSV format
		const csvRows = gameReport.game
		  .map(row => Object.values(row).map(value => `"${value}"`).join(",")) // Wrap values in quotes
		  .join("\n");
	  
		// Combine headers and data
		const csvContent = headers + csvRows;
	  
		// Create a Blob for proper encoding
		const blob = new Blob([csvContent], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		
		// Create and trigger download
		const link = document.createElement("a");
		link.href = url;
		link.download = "GameReport.csv";
		document.body.appendChild(link);
		link.click();
		
		// Cleanup
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	  };
	  
	  // Usage: Call onExportReport when needed
	  <button onClick={onExportReport}>Export CSV</button>;
	  

	return (
		<Col xl="12">
			<Card>
				<CardBody>
					<div className="float-end">
						<div className="d-flex justify-content-between align-items-center">
							<select
								value={gameReportDateOptions}
								className="form-select ms-2"
								onChange={(e) => {
									setGameReportDateOptions(e.target.value);
								}}
							>
								{dateConstants?.map((item) => (
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
					<h4 className="card-title mb-4">Game Report</h4>

					<Nav pills className="bg-light rounded" role="tablist">
						<NavItem>
							<NavLink
								className={classnames({
									active: activeGameReportTab === 'game',
								})}
								onClick={() => {
									setActiveGameReportTab('game');
								}}
							>
								GAME
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								className={classnames({
									active: activeGameReportTab === 'provider',
								})}
								onClick={() => {
									setActiveGameReportTab('provider');
								}}
							>
								PROVIDER
							</NavLink>
						</NavItem>
					</Nav>
					<TabContent
						activeTab={activeGameReportTab}
						className="mt-4 kpi-dashboard-tab"
					>
						<TabPane tabId="game">
							<SimpleBar style={{ maxHeight: '330px' }}>
								<TableContainer
									columns={gameReportColumn || []}
									data={modifiedGameReportData || []}
									isGlobalFilter={false}
									isPagination={false}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									// tbodyClass="kpiTableWrap"
									// theadClass={theadClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									pageCount={1}
									customPageSize={gameReport?.game?.length || 15}
									// tbodyHeight="300"
									isLoading={isGameReportLoading}
								/>
							</SimpleBar>
						</TabPane>
						<TabPane tabId="provider">
							<SimpleBar style={{ maxHeight: '330px' }}>
								<TableContainer
									columns={gameReportColumn || []}
									data={modifiedProviderData || []}
									isGlobalFilter
									isPagination={false}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									// tbodyClass={tbodyClass}
									// theadClass={theadClass}
									customPageSize={gameReport?.provider?.length || 15}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									isLoading={isGameReportLoading}
								// tbodyHeight="300"
								/>
							</SimpleBar>
						</TabPane>
					</TabContent>
				</CardBody>
			</Card>
		</Col>
	);
};
GameReport.propTypes = {
	activeGameReportTab: PropTypes.string,
	setActiveGameReportTab: PropTypes.func,
	gameReportColumn: PropTypes.arrayOf(PropTypes.any),
	gameReport: PropTypes.arrayOf(PropTypes.any),
	exportReport: PropTypes.func.isRequired,
};
GameReport.defaultProps = {
	activeGameReportTab: PropTypes.string,
	setActiveGameReportTab: PropTypes.func,
	gameReportColumn: PropTypes.arrayOf(PropTypes.any),
	gameReport: PropTypes.arrayOf(PropTypes.any),
};
export default GameReport;
