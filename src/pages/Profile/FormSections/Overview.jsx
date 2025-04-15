/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import {
	adminProfileSchema,
	getAdminInitialValues,
	leftStaticAdminFormFields,
	rightStaticAdminFormFields,
} from '../formDetails';

import FormPage from '../../../components/Common/FormPage';
import Spinners from '../../../components/Common/Spinner';

import useForm from '../../../components/Common/Hooks/useFormModal';

const Overview = ({
	details,
	isTenant,
	isEditable,
	setIsEditable,
	updateData,
	isLoading,
	defaultplaceholder,
}) => {
	const handleSubmit = (values) => {
		updateData({
			...values,
			id:details?.adminUserId,
			adminUserId: details?.adminUserId,
		});
		setIsEditable((prev) => !prev);
	};

	const handleEdit = () => {
		setIsEditable((prev) => !prev);
	};

	const {
		leftFormFields,
		rightFormFields,
		setLeftFormFields,
		setRightFormFields,
		validation,
	} = useForm({
		initialValues: getAdminInitialValues(details, defaultplaceholder),
		validationSchema: adminProfileSchema,
		onSubmitEntry: isEditable ? handleEdit : handleSubmit,
		leftStaticFormFields: leftStaticAdminFormFields(isEditable),
		rightStaticFormFields: rightStaticAdminFormFields(isEditable),
	});

	useEffect(() => {
		if (details) {
			setLeftFormFields(leftStaticAdminFormFields(isEditable));
			setRightFormFields(rightStaticAdminFormFields(isEditable));
		}
	}, [isEditable]);

	useEffect(() => {
		if (details) {
			validation.resetForm({
				values: {
					firstName: details?.firstName,
					lastName: details?.lastName,
					email: details?.email,
					adminUsername: details?.username || '',
					phone: isTenant ? details?.phone : '',
					role:
						details?.AdminRole?.name === 'Super Admin'
							? 'Admin'
							: details?.SuperadminRole?.name,
					agentName: details?.agentName || '',
					group: details?.group || '', // to be updated
				},
			});
		}
	}, [details]);

	return (
		<Row>
			<Col lg="12">
				{isLoading ? (
					<Spinners
						color="primary"
						className="position-absolute top-50 start-50"
					/>
				) : (
					<FormPage
						validation={validation}
						leftFormFields={leftFormFields}
						rightFormFields={rightFormFields}
						submitLabel="Submit"
						customColClasses=""
						isSubmitLoading={isLoading}
						isCancel={!isEditable}
						isSubmit={!isEditable}
						isEdit={isEditable}
						enableEdit={setIsEditable}
					/>
				)}
			</Col>
		</Row>
	);
};

Overview.defaultProps = {};

export default Overview;
