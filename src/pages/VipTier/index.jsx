import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import CrudSection from '../../components/Common/CrudSection';
import useVipTierListing from './hooks/useVipTierListing';
import TableContainer from '../../components/Common/TableContainer';
// import useFilters from './hooks/useFilters';
import Filters from '../../components/Common/Filters';
import useUpdate from './hooks/useUpdateVipTier';

const VipTierListing = () => {
	// const { filterFields, filterValidation } = useFilters();

	const { handleEdit, handleView } = useUpdate();

	const {
		columns,
		buttonList,
		onChangeRowsPerPage,
		setPage,
		page,
		itemsPerPage,
		formattedData,
		isLoading,
	} = useVipTierListing({ handleEdit, handleView });

	return (
		<div className="page-content">
			<Container fluid>
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Vip Tier" />
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
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									// paginationDiv="col-sm-12 col-md-7"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={13}
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

export default VipTierListing;
