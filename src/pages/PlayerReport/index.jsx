import React from 'react';
import { Col, Card, CardBody, Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import TableContainer from '../../components/Common/TableContainer';
import { tableCustomClass } from '../../constants/config';
import usePlayerReport from './hooks/usePlayerReport';
import Breadcrumb from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';
import Filters from '../../components/Common/Filters';

const PlayerReportList = () => {
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		topPlayerColumn,
		updateData,
		isLoading,
		currentPage,
		itemsPerPage,
		setCurrentPage,
		onChangeRowsPerPage,
		totalPlayerReportsCount,
		filterFields,
		filterValidation,
		actionButtons,
		isAdvanceOpen,
		toggleAdvance,
		isFilterChanged,
		buttonList
	} = usePlayerReport();

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Reports" breadcrumbItem="Player Report" />
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Player Report" />
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
									columns={topPlayerColumn || []}
									data={updateData || []}
									isGlobalFilter={false}
									isPagination
									isManualPagination
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									customPageSize={itemsPerPage}
									isLoading={isLoading}
									onChangePagination={setCurrentPage}
									currentPage={currentPage}
									changeRowsPerPageCallback={onChangeRowsPerPage}
									totalPageCount={totalPlayerReportsCount || 0}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default PlayerReportList;
