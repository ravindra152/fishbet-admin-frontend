/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import useForm from '../../../components/Common/Hooks/useFormModal';
import FormModal from '../../../components/Common/FormModal';
import { KYCLevelValues } from '../constants';

const KycLevelSchema = () =>
	Yup.object().shape({
		kyclevel: Yup.string().required('KYC Level Required'),
	});

const staticFormFields = (user) => ([
	{
		name: 'kyclevel',
		fieldType: 'select',
		label: 'Select Level',
		placeholder: 'Select Level',
		optionList: KYCLevelValues?.map((value) => ({
			value: value?.value,
			optionLabel: value?.optionLabel,
      optionDisabled: user?.level < 4
		})),
	},
]);

const KycLevel = ({ show, handleClose, updateUserKycLevel, name, user }) => {
	const { isOpen, setIsOpen, header, validation, formFields } = useForm({
		header: `Update user ${name} KYC level`,
		initialValues: {
			kyclevel: user?.level > 4 ? user?.level: null, //Temp condition, allow only level 5 update only when levels till 4 are complete
		},
		validationSchema: KycLevelSchema,

		onSubmitEntry: (values, { resetForm }) => {
			resetForm();
			handleClose();
			updateUserKycLevel(values);
		},
		staticFormFields: staticFormFields(user),
	});
	useEffect(() => {
		if (show) setIsOpen(true);
		else setIsOpen(false);
	}, [show]);

  return (
		<div>
			<FormModal
				isOpen={isOpen}
				toggle={() => {
					setIsOpen((prev) => !prev);
					handleClose();
				}}
				header={header}
				validation={validation}
				formFields={formFields}
				submitLabel="Submit"
				customColClasses="col-md-12"
			/>
		</div>
	);
};

export default KycLevel;
