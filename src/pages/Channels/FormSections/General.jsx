/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	generalStaticFormFields,
	generalStepInitialValues,
} from '../formDetails';
import FormPage from '../../../components/Common/FormPage';
import useForm from '../../../components/Common/Hooks/useFormModal';
// import { channelCriteria } from '../constants';
import { generalFormSchema } from '../Validation/schema';
import { createChannel, updateChannelDetails } from '../../../store/actions';
import Currencies from './Currency';

const General = ({ channelDetails, isEdit, channelId }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [wageringAllFields, setWageringAllFieldsAllFields] = useState({
		currencyDetails: [],
	});
	const handleSubmit = (values) => {
		if (isEdit) {
			dispatch(
				updateChannelDetails({
					data: {
						chatGroupId: channelId,
						name: values.name,
						description: values.description,
						status: values.isActive,
						groupLogo: null,
						criteria: values?.wageringToggle
							? [
									{
										key: 'WAGERING_CRITERIA',
										value: wageringAllFields?.currencyDetails,
									},
							  ]
							: [],
						isGlobal: values.isGlobal,
					},
					navigate,
				})
			);
		} else {
			dispatch(
				createChannel({
					data: {
						name: values.name,
						description: values.description,
						status: values.isActive,
						groupLogo: null,
						criteria: values?.wageringToggle
							? [
									{
										key: 'WAGERING_CRITERIA',
										value: wageringAllFields?.currencyDetails,
									},
							  ]
							: [],
						isGlobal: values.isGlobal,
					},
					navigate,
				})
			);
		}
	};

	const { formFields, setFormFields, validation } = useForm({
		initialValues: generalStepInitialValues({ channelDetails }),
		validationSchema: generalFormSchema(),
		onSubmitEntry: handleSubmit,
		staticFormFields: generalStaticFormFields,
	});

	useEffect(() => {
		let myFormField = formFields;

		if (
			validation?.values?.tierToggle === true &&
			formFields.findIndex((item) => item.name === 'tierValue') === -1
		) {
			myFormField = [
				...myFormField,
				{
					name: 'tierValue',
					fieldType: 'textField',
					placeholder: 'Enter Tier Level Limit',
					label: 'Tier Level',
					type: '',
					isNewRow: true,
				},
			];
		}
		if (validation?.values?.tierToggle === false) {
			myFormField = myFormField.filter((item) => item.name !== 'tierValue');
		}
		if (
			validation?.values?.timeToggle === true &&
			formFields.findIndex((item) => item.name === 'timeValue') === -1
		) {
			myFormField = [
				...myFormField,
				{
					name: 'timeValue',
					fieldType: 'textField',
					placeholder: 'Enter Time Duration',
					label: 'Time Duration',
					type: '',
					isNewRow: true,
				},
			];
		}
		if (validation?.values?.wageringToggle === false) {
			myFormField = myFormField.filter((item) => item.name !== 'wageringValue');
		}
		if (validation?.values?.timeToggle === false) {
			myFormField = myFormField.filter((item) => item.name !== 'timeValue');
		}
		setFormFields(myFormField);
	}, [
		validation?.values?.wageringToggle,
		validation?.values?.tierToggle,
		validation?.values?.timeToggle,
	]);

	return (
		<Row>
			<Col lg="12">
				<FormPage
					validation={validation}
					responsiveFormFields={formFields}
					customColClasses=""
					colOptions={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 }}
					isSubmit
					submitLabel={isEdit ? 'Edit' : 'Submit'}
					customComponent={
						validation?.values?.wageringToggle ? (
							<Currencies
								setWageringAllFieldsAllFields={setWageringAllFieldsAllFields}
								wageringAllFields={wageringAllFields}
								channelDetails={channelDetails}
								wageringToggle={validation?.values?.wageringToggle}
							/>
						) : (
							''
						)
					}
				/>
			</Col>
		</Row>
	);
};

General.defaultProps = {};

export default General;
