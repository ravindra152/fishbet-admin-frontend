import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';

import CrudSection from '../../components/Common/CrudSection';
import { projectName } from '../../constants/config';
import useBonusDropListing from './hooks/useBonusDropListing';
import useCreateBonusDrop from './hooks/useCreateBonusDrop';

const BonusDrop = () => {
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);
	const {
		columns,
		isLoading,
		formattedBonusDropDetails,
		itemsPerPage,
		onChangeRowsPerPage,
		setPage,
		totalCmsCount,
		page,
	} = useBonusDropListing();

	const { buttonList } = useCreateBonusDrop();

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Content Management" breadcrumbItem="BonusDrop" />
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Bonus Drop" />
							<CardBody>
								
								<TableContainer
									columns={columns}
									data={formattedBonusDropDetails}
									isAddOptions={false}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalCmsCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={isLoading}
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

BonusDrop.propTypes = {
	// t: PropTypes.func,
};

BonusDrop.defaultProps = {
	t: (string) => string,
};

export default BonusDrop;
