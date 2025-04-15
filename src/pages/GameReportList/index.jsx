/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import { Col, Card, CardBody, Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import TableContainer from '../../components/Common/TableContainer';
import { tableCustomClass } from '../../constants/config';
import useGameReportList from './hooks/useGameReportList';
import Breadcrumb from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';
import Filters from '../../components/Common/Filters';

const GameReportList = () => {
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		gameReportColumn,
		gameReport,
		isGameReportLoading,
		itemsPerPage,
		currentPage,
		setCurrentPage,
		onChangeRowsPerPage,
		totalGameReportCount,
		filterFields,
		filterValidation,
		actionButtons,
		isAdvanceOpen,
		toggleAdvance,
		isFilterChanged,
		buttonList
	} = useGameReportList();

	const modifiedGameReportData = gameReport?.game?.map((item) => ({
		...item,
		GGR: (item?.sc_wagered || 0) - (item.sc_won || 0) || 0,
		payout: item.sc_won
			? ((item.sc_won / item.sc_wagered) * 100).toFixed(2)
			: '100',
	}));

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Reports" breadcrumbItem="Game Report" />
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Game Report" />
							<CardBody>
								<Filters
									validation={filterValidation}
									filterFields={filterFields}
									actionButtons={actionButtons}
									isAdvanceOpen={isAdvanceOpen}
									toggleAdvance={toggleAdvance}
									isFilterChanged={isFilterChanged}
								/>
								<TableContainer
									columns={gameReportColumn || []}
									data={modifiedGameReportData || []}
									isGlobalFilter={false}
									isPagination
									isManualPagination
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									customPageSize={itemsPerPage}
									isLoading={isGameReportLoading}
									onChangePagination={setCurrentPage}
									currentPage={currentPage}
									changeRowsPerPageCallback={onChangeRowsPerPage}
									totalPageCount={totalGameReportCount || 10}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default GameReportList;
