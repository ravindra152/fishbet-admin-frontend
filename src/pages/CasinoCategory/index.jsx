import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { useSelector } from 'react-redux';
import { projectName } from '../../constants/config';
import useCasinoCategoryColumn from './hooks/useCasinoCategoryColumn';
import TableContainer from '../../components/Common/TableContainer';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useCasinoCategoryListing from './hooks/useCasinoCategoryListing';
import CrudSection from '../../components/Common/CrudSection';
import FormModal from '../../components/Common/FormModal';
import useCreateCategory from './hooks/useCreateCategory';
import Filters from '../../components/Common/Filters';
import useFilters from './hooks/useFilters';
import YesNoCasinoCategoryModal from './modal/YesNoCasinoCategoryModal';

const GetCasinoCategoryDetails = () => {
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
		formattedCasinoCategoriesData,
		iscasinoCategoryDetailsLoading,
		page,
		setPage,
		itemsPerPage,
		totalCasinoCategriesCount,
		onChangeRowsPerPage,
		openCasinoCategoryModal,
		handleStatus,
		casinoCategorydata,
		modalStates,
		closeModal,
	} = useCasinoCategoryListing(filterValidation.values);

	const {
		isOpen,
		setIsOpen,
		formFields,
		header,
		validation,
		isCreateCategoryLoading,
		buttonList,
		onClickEdit,
		isEditCategoryLoading,
		setCasinoCategorydata,
	} = useCreateCategory();

	const columns = useCasinoCategoryColumn({
		openCasinoCategoryModal,
		setCasinoCategorydata,
		onClickEdit,
	});

	return (
		<div className="page-content">
			<div className="container-fluid">
				{showBreadcrumb && (
					<Breadcrumb
						title="Casino Management"
						breadcrumbItem="Casino Category"
					/>
				)}

				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Casino Categories" />
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
									data={formattedCasinoCategoriesData}
									isLoading={!iscasinoCategoryDetailsLoading}
									isGlobalFilter
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalCasinoCategriesCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									changeRowsPerPageCallback={onChangeRowsPerPage}
								/>
								<FormModal
									isOpen={isOpen}
									toggle={() => setIsOpen((prev) => !prev)}
									header={header}
									validation={validation}
									formFields={formFields}
									submitLabel="Submit"
									customColClasses="col-md-12"
									isSubmitLoading={
										isCreateCategoryLoading || isEditCategoryLoading
									}
								/>
								<YesNoCasinoCategoryModal
									show={modalStates.activeCreateCategory}
									handleYes={handleStatus}
									handleClose={() => closeModal('activeCreateCategory')}
									content={`Are you sure you want to update status
                  as ${casinoCategorydata?.Message ?? ''} ? `}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default GetCasinoCategoryDetails;
