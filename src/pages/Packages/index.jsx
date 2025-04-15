import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import CrudSection from '../../components/Common/CrudSection';
import usePackage from './hooks/usePackage';
import TableContainer from '../../components/Common/TableContainer';
import useFilters from './hooks/useFilters';
// import Filters from '../../components/Common/Filters';

const Packages = () => {
	// const { filterFields, filterValidation } = useFilters();
	const {
		columns,
		buttonList,
		// packageCategorydata,
		onChangeRowsPerPage,
		setPage,
		page,
		formattedData,
		isLoading
	} = usePackage();


	return (
		<div className="page-content">
			<Container fluid>
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Packages" />
							<CardBody>
								{/* <Filters
									validation={filterValidation}
									filterFields={filterFields}
								// actionButtons={actionButtons}
								// isAdvanceOpen={isAdvanceOpen}
								// toggleAdvance={toggleAdvance}
								// isFilterChanged={isFilterChanged}
								/> */}
								<TableContainer
									isLoading={isLoading}
									columns={columns}
									data={formattedData}
									isPagination
									// customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									// paginationDiv="col-sm-12 col-md-7"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									// totalPageCount={totalTransactionBankingCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									changeRowsPerPageCallback={onChangeRowsPerPage}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Packages;
