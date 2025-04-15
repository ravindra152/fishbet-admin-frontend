import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';

import CrudSection from '../../components/Common/CrudSection';
import useCreateCms from './hooks/useCreateNotice';
import useNoticeListing from './hooks/useNoticeListing';

const Notice = () => {
	// Set meta title
	// document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		formattedNoticeDetails,
		isLoading,
		page,
		setPage,
		itemsPerPage,
		totalNoticeCount,
		onChangeRowsPerPage,
		columns,
	} = useNoticeListing();

	const { buttonList } = useCreateCms();

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Notice Management" breadcrumbItem="Notice" />
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Notice" />
							<CardBody>
								<TableContainer
									columns={columns}
									data={formattedNoticeDetails}
									isAddOptions={false}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalNoticeCount}
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

Notice.propTypes = {
	// t: PropTypes.func,
};

Notice.defaultProps = {
	t: (string) => string,
};

export default Notice;
