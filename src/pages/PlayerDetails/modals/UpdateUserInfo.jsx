/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../../components/Common/Hooks/useFormModal';
import FormModal from '../../../components/Common/FormModal';
import { getInitialValuesUpdateUser, userSchema } from '../formDetails';
import { fetchCountriesStart, updateUserInfo } from '../../../store/actions';

const staticUpdateUserInfoFormFields = [
	{
		name: 'username',
		fieldType: 'textField',
		label: 'User Name',
		required: true,
	},
	// {
	// 	name: 'email',
	// 	fieldType: 'textField',
	// 	label: 'Email',
	// 	required: true,
	// },
	{
		name: 'firstName',
		fieldType: 'textField',
		label: 'First Name',
		required: true,
	},
	{
		name: 'lastName',
		fieldType: 'textField',
		label: 'Last Name',
		required: true,
	},
	{
		name: 'dateOfBirth',
		fieldType: 'datePicker',
		label: 'Date Of Birth',
		required: true,
		type: 'date',
	},
	// {
	// 	name: 'gender',
	// 	fieldType: 'select',
	// 	label: 'Gender',
	// 	optionList: [
	// 		{
	// 			optionLabel: 'Male',
	// 			value: 'Male',
	// 		},
	// 		{
	// 			optionLabel: 'Female',
	// 			value: 'Female',
	// 		},
	// 		{
	// 			optionLabel: 'Other',
	// 			value: 'Other',
	// 		},
	// 	],
	// },

	// {
	// 	fieldType: 'phone',
	// 	label: 'Phone',
	// 	required: true,
	// 	namesArray: ['phone', 'phoneCode'],
	// },
	// {
	// 	name: 'telegramId',
	// 	fieldType: 'textField',
	// 	label: 'Telegram Id',
	// 	required: true,
	// 	isDisabled: true,
	// },
	// {
	// 	name: 'address',
	// 	fieldType: 'textField',
	// 	label: 'Address',
	// 	required: true,
	// },
	// {
	// 	name: 'city',
	// 	fieldType: 'textField',
	// 	label: 'City',
	// 	required: true,
	// },
	// {
	// 	name: 'zipCode',
	// 	fieldType: 'textField',
	// 	label: 'Zip Code',
	// 	required: true,
	// },

	// {
	// 	name: 'newsLetter',
	// 	fieldType: 'switch',
	// 	label: 'NewsLetter',
	// 	required: true,
	// },
	// {
	// 	name: 'sms',
	// 	fieldType: 'switch',
	// 	label: 'SMS',
	// 	required: true,
	// },
];

const UpdateUserInfo = ({ show, header, toggle, userDetails }) => {
	const dispatch = useDispatch();
	const { depositToOtherLoading } = useSelector((state) => state.UserDetails);
	const { countries } = useSelector((state) => state.Countries);

	// useEffect(() => {
	// 	dispatch(fetchCountriesStart());
	// }, []);
	const handleUserEdit = (values) => {
		dispatch(
			updateUserInfo({
				...values,
			})
		);
	};

	const { isOpen, setIsOpen, validation, formFields, setFormFields } = useForm({
		header,
		validationSchema: userSchema,
		initialValues: getInitialValuesUpdateUser(userDetails),
		onSubmitEntry: (values) => {
			handleUserEdit(values);
			toggle();
		},
		staticFormFields: staticUpdateUserInfoFormFields,
	});

	useEffect(() => {
		if (show) setIsOpen(true);
		else setIsOpen(false);
	}, [show]);

	useEffect(() => {
		// const CountriesList = () => {
		// 	const arrayToReturn = [];
		// 	if (countries?.length) {
		// 		countries?.map((country) =>
		// 			arrayToReturn.push({
		// 				optionLabel: country.name,
		// 				value: country.code,
		// 			})
		// 		);
		// 	} else if (countries?.rows?.length) {
		// 		countries.rows.map((country) =>
		// 			arrayToReturn.push({
		// 				optionLabel: country.name,
		// 				value: country.code,
		// 			})
		// 		);
		// 	}
		// 	return arrayToReturn;
		// };
		setFormFields([
			...staticUpdateUserInfoFormFields,
			// {
			// 	name: 'countryCode',
			// 	fieldType: 'select',
			// 	label: 'Country',
			// 	required: true,
			// 	optionList: CountriesList(),
			// },
		]);
	}, [countries]);
	return (
		<div>
			<FormModal
				isOpen={isOpen}
				toggle={() => {
					setIsOpen((prev) => !prev);
					toggle();
				}}
				header={header}
				validation={validation}
				formFields={formFields}
				submitLabel="Submit"
				customColClasses="col-sm-6"
				isSubmitLoading={depositToOtherLoading}
			/>
		</div>
	);
};

export default UpdateUserInfo;
