import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardBody, Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/NewTableContainer';
import useFilters from './hooks/useFilters';
import useChatrainListing from './hooks/useChatrainListing';
import useButtonList from './hooks/useButtonList';

const Chatrain = () => {
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const { filterValidation, selectedFiltersComponent, filterComponent } =
		useFilters();

	const {
		formattedChatrain,
		isLoading,
		page,
		setPage,
		totalCount,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	} = useChatrainListing(filterValidation.values);

	const {actionList} = useButtonList();

	const { t } = useTranslation();

	return (
		<div className="page-content">
			<Container fluid>
				{/* {showBreadcrumb && ( */}
				<Breadcrumb
					title={t('Chat Management')}
					breadcrumbItem={t('Chat Rain')}
				/>
				{/* )} */}
				<Card>
				 <CardBody>
				  <TableContainer
					columns={columns}
					data={formattedChatrain || []}
					isGlobalFilter
					isPagination
					customPageSize={itemsPerPage}
					tableClass="table-bordered align-middle nowrap mt-2"
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					totalPageCount={totalCount || 0}
					isManualPagination
					onChangePagination={setPage}
					currentPage={page}
					isLoading={isLoading}
					changeRowsPerPageCallback={onChangeRowsPerPage}
					actionList={actionList}
				/>
			  </CardBody>
			 </Card>
			</Container>
		</div>
	);
};

Chatrain.propTypes = {
	// t: PropTypes.func,
};

Chatrain.defaultProps = {
	t: (string) => string,
};

export default Chatrain;
