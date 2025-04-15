/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { projectName } from '../../constants/config';
// import usePermission from '../../components/Common/Hooks/usePermission';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useOffensiveWords from './hooks/useOffensiveWords';
import FormModal from '../../components/Common/FormModal';
import TableContainer from '../../components/Common/NewTableContainer';

const OffensiveWords = () => {
	// meta title
	document.title = projectName;
	// temporary permission not added
	// const { isGranted } = usePermission();
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		offensiveWords,
		totalCount,
		columns,
		onChangeRowsPerPage,
		itemsPerPage,
		page,
		setPage,
		actionList,
		isOpen,
		formFields,
		header,
		validation,
		isCreateWordLoading,
		isEditWordLoading,
		loader,
		setIsOpen,
	} = useOffensiveWords();
	const { t } = useTranslation()

	return (
		<div className="page-content">
			<Container fluid>
				{/* {showBreadcrumb && ( */}
				<Breadcrumb
					title={t("Chat Management")}
					breadcrumbItem={t("Offensive Words")}
				/>
				{/* )} */}
				<Card>
					<CardBody>
						<TableContainer
							columns={columns || []}
							data={offensiveWords || []}
							isGlobalFilter
							isPagination
							customPageSize={itemsPerPage}
							totalPageCount={totalCount}
							isManualPagination
							onChangePagination={setPage}
							currentPage={page}
							changeRowsPerPageCallback={onChangeRowsPerPage}
							actionList={actionList}
							isLoading={loader}
						/>
						<FormModal
							isOpen={isOpen}
							setIsOpen={setIsOpen}
							toggle={()=>setIsOpen(!isOpen)}
							header={header}
							validation={validation}
							formFields={formFields}
							submitLabel="Submit"
							customColClasses="col-md-12"
							isSubmitLoading={isCreateWordLoading || isEditWordLoading}
						/>
					</CardBody>
				</Card>
			</Container>
		</div>
	);
};

OffensiveWords.propTypes = {
	// t: PropTypes.func,
};

OffensiveWords.defaultProps = {
	t: (string) => string,
};

export default OffensiveWords;
