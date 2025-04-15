/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import useForm from '../../../components/Common/Hooks/useFormModal';
import FormModal from '../../../components/Common/FormModal';

const affiliateCommisionSchema = () =>
	Yup.object({
		affiliatePercentage: Yup.number()
			.positive('Commision Percentage must be a positive number')
			.required('Commision Percentage Required'),
	});

const staticFormFields = [
	{
		name: 'affiliatePercentage',
		fieldType: 'textField',
		label: 'Set Affiliate Commision Percentage',
		placeholder: 'Enter Commission %',
		type: 'number',
		step: '0.00001',
		minimum: 0,
	},
];

const AffiliateCommisionModal = ({
	show,
	handleClose,
	handleAffiliateCommision,
	name,
	user,
}) => {
	const { isOpen, setIsOpen, header, validation, formFields } = useForm({
		header: `Update user ${name} Affiliate Commision Percentage`,
		initialValues: {
			userId: Number(user?.userId),
			affiliatePercentage: user?.userDetails?.referralPercentage || '',
		},
		validationSchema: affiliateCommisionSchema,
		onSubmitEntry: (values, { resetForm }) => {
			resetForm();
			handleClose();
			handleAffiliateCommision(values);
		},
		staticFormFields,
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

export default AffiliateCommisionModal;
