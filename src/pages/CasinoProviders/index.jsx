/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import { projectName } from '../../constants/config';
import useCasinoProvidersListing from './hooks/useCasinoProvidersListing';
import FormModal from '../../components/Common/FormModal';
import useCreateProvider from './hooks/useCreateProvider';
import CrudSection from '../../components/Common/CrudSection';
import Filters from '../../components/Common/Filters';
import useFilters from './hooks/useFilters';
import YesNoCasinoProviderModal from './modal/YesNoCasinoProviderModal';

const CasinoProviders = () => {
	// meta title
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

	const {
		casinoProvidersData,
		isCasinoProvidersDataLoading,
		page,
		setPage,
		itemsPerPage,
		onChangeRowsPerPage,
	} = useCasinoProvidersListing(filterValidation.values);
	const {
		isOpen,
		setIsOpen,
		formFields,
		header,
		validation,
		isCreateProviderLoading,
		buttonList,
		columns,
		isEditProviderLoading,
		handleStatus,
		casinoProviderdata,
		modalStates,
		closeModal,
	} = useCreateProvider();

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb
						title="Casino Management"
						breadcrumbItem="Casino Providers"
					/>
				)}

				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Casino Providers" />
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
									data={casinoProvidersData?.rows || []}
									isGlobalFilter
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={casinoProvidersData?.count}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={!isCasinoProvidersDataLoading}
									changeRowsPerPageCallback={onChangeRowsPerPage}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<FormModal
					isOpen={isOpen}
					toggle={() => setIsOpen((prev) => !prev)}
					header={header}
					validation={validation}
					formFields={formFields}
					submitLabel="Submit"
					customColClasses="col-md-12"
					isSubmitLoading={isCreateProviderLoading || isEditProviderLoading}
				/>
				<YesNoCasinoProviderModal
					show={modalStates.activeCasinoProvider}
					handleYes={handleStatus}
					handleClose={() => closeModal('activeCasinoProvider')}
					content={`Are you sure you want to update status
                  as ${casinoProviderdata?.Message ?? ''} ? `}
				/>
			</Container>
		</div>
	);
};

CasinoProviders.propTypes = {
	// t: PropTypes.func,
};

CasinoProviders.defaultProps = {
	t: (string) => string,
};

export default CasinoProviders;
