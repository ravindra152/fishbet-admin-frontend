import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import FormPage from '../../components/Common/FormPage';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';
import useReferral from './hooks/useReferral';

const ReferralSetting = () => {
	const { isGranted } = usePermission();
	const { formFields, validation, updateReferralCommisionAomLoading } =
		useReferral();
	return (
		<Container fluid>
			<Row>
				<Col lg="12">
					<FormPage
						validation={validation}
						responsiveFormFields={formFields}
						isSubmit={isGranted(modules.Affiliates, 'U')}
						isSubmitLoading={updateReferralCommisionAomLoading}
						submitLabel="Submit"
						customColClasses=""
						formTitle="Referral Amount"
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default ReferralSetting;
