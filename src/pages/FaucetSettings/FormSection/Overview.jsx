/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import {
	faucetSettingsSchema,
	getfaucetSettingsInitialValues,
	leftStaticfaucetSettingsFields,
	rightStaticfaucetSettingsFields,
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
			id: details?.adminUserId,
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
		initialValues: getfaucetSettingsInitialValues(details, defaultplaceholder),
		validationSchema: faucetSettingsSchema,
		onSubmitEntry: isEditable ? handleEdit : handleSubmit,
		leftStaticFormFields: leftStaticfaucetSettingsFields(isEditable),
		rightStaticFormFields: rightStaticfaucetSettingsFields(isEditable),
	});

	useEffect(() => {
		if (details) {
			setLeftFormFields(leftStaticfaucetSettingsFields(isEditable));
			setRightFormFields(rightStaticfaucetSettingsFields(isEditable));
		}
	}, [isEditable]);

	useEffect(() => {
		if (details) {
			validation.resetForm({
				values: {
					PSC: details?.PSC,
					GC: details?.GC,
					interval: details?.interval,
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
