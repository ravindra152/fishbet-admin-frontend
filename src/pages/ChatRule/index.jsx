/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { projectName } from '../../constants/config';
// import usePermission from '../../components/Common/Hooks/usePermission';
import Breadcrumb from '../../components/Common/Breadcrumb';
import FormModal from '../../components/Common/FormModal';
import TableContainer from '../../components/Common/NewTableContainer';
import useChatRuleHook from './hooks/useChatruleListing';

const ChatRule = () => {
	// meta title
	document.title = projectName;
	// temporary permission not added
	// const { isGranted } = usePermission();
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		chatRule,
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
		isCreateRuleLoading,
		isEditRuleLoading,
		loader,
		setIsOpen,
	} = useChatRuleHook();
	const { t } = useTranslation()

	return (
		<div className="page-content">
			<Container fluid>
				{/* {showBreadcrumb && ( */}
				<Breadcrumb
					title={t("Chat Management")}
					breadcrumbItem={t("Chat Rule")}
				/>
				{/* )} */}
				<Card>
					<CardBody>
						<TableContainer
							columns={columns || []}
							data={chatRule || []}
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
							isSubmitLoading={isCreateRuleLoading || isEditRuleLoading}
						/>
					</CardBody>
				</Card>
			</Container>
		</div>
	);
};

ChatRule.propTypes = {
	// t: PropTypes.func,
};

ChatRule.defaultProps = {
	t: (string) => string,
};

export default ChatRule;
