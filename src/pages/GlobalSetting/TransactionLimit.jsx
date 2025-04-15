/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

import { Col, Container, Row } from 'reactstrap';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import FormPage from '../../components/Common/FormPage';
import useDepositlimit from './hooks/useDepositlimit';
import useWithdrawalLimit from './hooks/useWithdrawalLimit';
import { projectName } from '../../constants/config';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const TransactionLimit = ({ t }) => {
	// meta title
	document.title = projectName;
	const { isGranted } = usePermission();

	const {
		formFields: depositFormFields,
		validation: depositValidation,
		// isCurrencyLimitLoading,
		depositLimitLoading,
	} = useDepositlimit();
	const {
		formFields: withdrawFormFields,
		validation: withdrawValidation,
		withdrawLimitLoading,
	} = useWithdrawalLimit();
	return (
			<Container fluid>
				{/* <Breadcrumbs
					title={t('Site Configuration')}
					breadcrumbItem={t('Transactions Limits')}
				/> */}
				<Row>
					<Col lg="12">
						<FormPage
							validation={depositValidation}
							responsiveFormFields={depositFormFields}
							isSubmit={isGranted(modules.Transactions, 'U')}
							isSubmitLoading={depositLimitLoading}
							submitLabel="Submit"
							customColClasses=""
							formTitle="Deposit Limit"
						/>
					</Col>
					<Col lg="12">
						<FormPage
							validation={withdrawValidation}
							responsiveFormFields={withdrawFormFields}
							isSubmit={isGranted(modules.Transactions, 'U')}
							submitLabel="Submit"
							customColClasses=""
							isSubmitLoading={withdrawLimitLoading}
							formTitle="Withdraw Limit"
						/>
					</Col>
				</Row>
			</Container>
	);
};

TransactionLimit.propTypes = {
	t: PropTypes.func,
};

TransactionLimit.defaultProps = {
	t: (string) => string,
};

export default TransactionLimit;
