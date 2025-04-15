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

// Simple bar
import SimpleBar from 'simplebar-react';
import TableContainer from '../../../components/Common/TableContainer';
import { tableCustomClass } from '../../../constants/config';
import { objectToarrayKpiReport } from './supportFunction';
import { dateConstants } from '../constant';

const KpiReport = (props) => {
	const {
		activeKpiReportTab,
		setActiveKpiReportTab,
		kPIReportColumn,
		kPIReport,
		exportReport,
		setKpiReportDateOptions,
		KpiReportDateOptions,
		iskPIReportLoading,
	} = props;
	return (
		<Col xl="12">
			<Card>
				<CardBody>
					<div className="float-end">
						<div className="d-flex justify-content-between align-items-center">
							<select
								value={KpiReportDateOptions}
								className="form-select ms-2"
								onChange={(e) => {
									setKpiReportDateOptions(e.target.value);
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
								onClick={exportReport}
							>
								Export Details
								<i className="bx bx-download align-baseline ms-1" />
							</button>
						</div>
					</div>
					<h4 className="card-title mb-4">KPI Report</h4>

					<Nav pills className="bg-light rounded" role="tablist">
						<NavItem>
							<NavLink
								className={classnames({
									active: activeKpiReportTab === 'game',
								})}
								onClick={() => {
									setActiveKpiReportTab('game');
								}}
							>
								GAME
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								className={classnames({
									active: activeKpiReportTab === 'provider',
								})}
								onClick={() => {
									setActiveKpiReportTab('provider');
								}}
							>
								PROVIDER
							</NavLink>
						</NavItem>
					</Nav>
					<TabContent
						activeTab={activeKpiReportTab}
						className="mt-4 kpi-dashboard-tab"
					>
						<TabPane tabId="game">
							<SimpleBar style={{ maxHeight: '330px' }}>
								<TableContainer
									columns={kPIReportColumn || []}
									data={objectToarrayKpiReport(kPIReport, 'game')}
									isGlobalFilter={false}
									isPagination={false}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									// tbodyClass="kpiTableWrap"
									// theadClass={theadClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									pageCount={1}
									customPageSize={
										objectToarrayKpiReport(kPIReport, 'game').length || 15
									}
									// tbodyHeight="300"
									isLoading={iskPIReportLoading}
								/>
							</SimpleBar>
						</TabPane>
						<TabPane tabId="provider">
							<SimpleBar style={{ maxHeight: '330px' }}>
								<TableContainer
									columns={kPIReportColumn || []}
									data={objectToarrayKpiReport(kPIReport, 'provider')}
									isGlobalFilter
									isPagination={false}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									// tbodyClass={tbodyClass}
									// theadClass={theadClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									customPageSize={
										objectToarrayKpiReport(kPIReport, 'provider')?.length || 15
									}
									isLoading={iskPIReportLoading}
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
KpiReport.propTypes = {
	activeKpiReportTab: PropTypes.string,
	setActiveKpiReportTab: PropTypes.func,
	kPIReportColumn: PropTypes.arrayOf(PropTypes.object),
	kPIReport: PropTypes.objectOf(PropTypes.object),
	exportReport: PropTypes.func.isRequired,
	setKpiReportDateOptions: PropTypes.func.isRequired,
	KpiReportDateOptions: PropTypes.arrayOf(PropTypes.object),
	iskPIReportLoading: PropTypes.bool,
};
KpiReport.defaultProps = {
	activeKpiReportTab: PropTypes.string,
	setActiveKpiReportTab: PropTypes.func,
	kPIReportColumn: PropTypes.arrayOf(PropTypes.object),
	kPIReport: PropTypes.objectOf(PropTypes.object),
	KpiReportDateOptions: PropTypes.arrayOf(PropTypes.object),
	iskPIReportLoading: PropTypes.bool,
};

export default KpiReport;
