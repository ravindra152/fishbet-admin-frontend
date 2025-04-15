import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import usePromotionsListing from './hooks/usePromotionsListing';

import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import useFilters from './hooks/useFilters';
import Filters from '../../components/Common/Filters';
import useCreatePromotions from './hooks/useCreatePromotions';

const Promotions = () => {
	// Set meta title
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useFilters();

	// Fetch CMS page data and manage pagination state
	const {
		formattedPromotions,
		isPromotionsLoading,
		page,
		setPage,
		itemsPerPage,
		totalPromotionsCount,
		onChangeRowsPerPage,
		columns,
	} = usePromotionsListing(filterValidation.values);

	const { buttonList } = useCreatePromotions();

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Content Management" breadcrumbItem="Promotions" />
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Promotions" />
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
									columns={columns}
									data={formattedPromotions}
									isAddOptions={false}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalPromotionsCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={isPromotionsLoading}
									isGlobalFilter
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

Promotions.propTypes = {
	// t: PropTypes.func,
};

Promotions.defaultProps = {
	t: (string) => string,
};

export default Promotions;
