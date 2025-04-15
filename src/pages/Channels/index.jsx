import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import { Container } from 'reactstrap';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/NewTableContainer';
import { projectName } from '../../constants/config';
import useChannelListing from './hooks/useChannelListing';
import useFilters from './hooks/useFilters';

const Channels = () => {
	document.title = projectName;

	const { filterValidation } =
		useFilters();

	const {
		formattedchannelDetails,
		isLoading,
		page,
		setPage,
		totalCount,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	} = useChannelListing(filterValidation.values);
	const { t } = useTranslation()

	return (
		<div className="page-content">
			<Container fluid>
				{/* {showBreadcrumb && ( */}
				<Breadcrumb title={t("Chat Management")} breadcrumbItem={t("Channel")} />
				{/* )} */}
				<TableContainer
					columns={columns}
					data={formattedchannelDetails || []}
					// isGlobalFilter
					isPagination
					customPageSize={itemsPerPage}
					totalPageCount={totalCount || 0}
					isManualPagination
					onChangePagination={setPage}
					currentPage={page}
					isLoading={isLoading}
					changeRowsPerPageCallback={onChangeRowsPerPage}
					// actionList={actionList}
					// filterComponent={filterComponent}
					// selectedFiltersComponent={selectedFiltersComponent}
				/>
			</Container>
		</div>
	);
};

Channels.propTypes = {};

Channels.defaultProps = {
	t: (string) => string,
};

export default Channels;
