/* eslint-disable import/extensions */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Flatpickr from 'react-flatpickr';
import {
	Col,
	Card,
	Nav,
	CardBody,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
	InputGroup,
} from 'reactstrap';
import classnames from 'classnames';

// Simple bar
import SimpleBar from 'simplebar-react';
import TableContainer from '../../../components/Common/TableContainer';
import { tableCustomClass } from '../../../constants/config';
import { casinokpiSummaryActiontype } from './constant';

const KpiSummary = (props) => {
	const {
		activeKpiSummTab,
		setActiveKpiSummTab,
		kPISummaryColumn,
		kPISummary,
		exportReport,
		updateStartDate,
		iskPISummaryLoading,
		KpiSummaryState,
		setActionType,
		actionType,
	} = props;
	const lastDate = new Date();
	// add a day
	lastDate.setDate(lastDate.getDate() - 7);
	return (
		<Col xl="12">
			<Card>
				<CardBody>
					<div className="float-end">
						<div
							className="d-flex justify-content-between align-items-center"
							style={{ marginBottom: 'px' }}
						>
							{activeKpiSummTab === 'CASINO' && (
								<select
									className="form-control actiontype"
									value={actionType}
									onChange={(event) => setActionType(event.target.value)}
								>
									<option disabled selected>
										Action type
									</option>
									{casinokpiSummaryActiontype?.map((item) => (
										<option value={item.value} key={item.value}>
											{item.label}
										</option>
									))}
								</select>
							)}
							<InputGroup>
								<Flatpickr
									className="form-control dashboard-range-picker"
									options={{
										mode: 'range',
										dateFormat: 'd-m-y',
										maxDate: new Date(),
										defaultDate: [lastDate, new Date()],
									}}
									value={[KpiSummaryState[0].startDate, new Date()]}
									onChange={(dates) => {
										updateStartDate(dates[0]);
									}}
								/>
								<div className="input-group-append">
									<span className="input-group-text">
										<i className="mdi mdi-clock-outline" />
									</span>
								</div>
							</InputGroup>
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
					<h4 className="card-title mb-4">KPI Summary</h4>

					<Nav pills className="bg-light rounded" role="tablist">
						<NavItem>
							<NavLink
								className={classnames({
									active: activeKpiSummTab === 'Banking',
								})}
								onClick={() => {
									setActiveKpiSummTab('Banking');
									setActionType(null);
								}}
							>
								Banking
							</NavLink>
						</NavItem>
						{/* <NavItem>
							<NavLink
								className={classnames({
									active: activeKpiSummTab === 'sports',
								})}
								onClick={() => setActiveKpiSummTab('sports')}
							>
								Sports
							</NavLink>
						</NavItem> */}
						<NavItem>
							<NavLink
								className={classnames({
									active: activeKpiSummTab === 'CASINO',
								})}
								onClick={() => {
									setActiveKpiSummTab('CASINO');
									setActionType(null);
								}}
							>
								Casino
							</NavLink>
						</NavItem>
					</Nav>
					<TabContent
						activeTab={activeKpiSummTab}
						className="mt-4 kpi-dashboard-tab"
					>
						<TabPane tabId="Banking">
							<SimpleBar style={{ maxHeight: '330px' }}>
								<TableContainer
									columns={kPISummaryColumn || []}
									data={kPISummary?.Banking || []}
									isGlobalFilter={false}
									isPagination={false}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									// tbodyClass="kpiTableWrap"
									// theadClass={theadClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									pageCount={1}
									customPageSize={kPISummary?.Banking?.length || 15}
									// tbodyHeight="300"
									isLoading={iskPISummaryLoading}
								/>
							</SimpleBar>
						</TabPane>
						{/* <TabPane tabId="sports">
							<SimpleBar style={{ maxHeight: '330px' }}>
								<TableContainer
									columns={kPISummaryColumn || []}
									data={kPISummary.SPORTS}
									isGlobalFilter
									isPagination={false}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									// tbodyClass={tbodyClass}
									// theadClass={theadClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									// isLoading={!isLoading}
									// tbodyHeight="300"
								/>
							</SimpleBar>
						</TabPane> */}

						<TabPane tabId="CASINO">
							<SimpleBar style={{ maxHeight: '330px' }}>
								<TableContainer
									columns={kPISummaryColumn || []}
									data={kPISummary?.CASINO || []}
									isGlobalFilter
									isPagination={false}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									// tbodyClass={tbodyClass}
									// theadClass={theadClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									// isLoading={!isLoading}
									// tbodyHeight="300"
									pageCount={1}
									customPageSize={kPISummary?.CASINO?.length || 15}
									isLoading={iskPISummaryLoading}
								/>
							</SimpleBar>
						</TabPane>
					</TabContent>
				</CardBody>
			</Card>
		</Col>
	);
};
KpiSummary.propTypes = {
	activeKpiSummTab: PropTypes.string,
	setActiveKpiSummTab: PropTypes.func,
	setActionType: PropTypes.func,
	kPISummaryColumn: PropTypes.arrayOf(
		PropTypes.shape({
			Header: PropTypes.string,
			accessor: PropTypes.string,
			filterable: PropTypes.bool,
			Cell: PropTypes.func,
		})
	).isRequired,
	kPISummary: PropTypes.arrayOf(PropTypes.shape).isRequired,
	exportReport: PropTypes.func.isRequired,
	iskPISummaryLoading: PropTypes.bool,
	KpiSummaryState: PropTypes.arrayOf(
		PropTypes.shape({
			startDate: PropTypes.instanceOf(Date).isRequired,
			endDate: PropTypes.instanceOf(Date).isRequired,
			key: PropTypes.string.isRequired,
		})
	).isRequired,
	updateStartDate: PropTypes.func.isRequired,
	actionType: PropTypes.string,
};
KpiSummary.defaultProps = {
	activeKpiSummTab: PropTypes.string,
	setActiveKpiSummTab: PropTypes.func,
	iskPISummaryLoading: PropTypes.bool,
	setActionType: PropTypes.func,
	actionType: PropTypes.string,
};
export default KpiSummary;
