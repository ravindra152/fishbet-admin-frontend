/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormModal from '../../components/Common/FormModal';
import useForm from '../../components/Common/Hooks/useFormModal';
import { createUserSchema, getInitialValueCreateUser } from '../PlayerDetails/formDetails';
import { createUser } from '../../network/postRequests';
import { showToastr } from '../../utils/helpers';


const staticCreateUsersFormFields = [
	{
		name: 'username',
		fieldType: 'textField',
		label: 'User Name',
		required: true,
	},
    {
		name: 'password',
		fieldType: 'textField',
		label: 'Password',
		required: true,
        type:'password'
	},
	// {
	// 	name: 'email',
	// 	fieldType: 'textField',
	// 	label: 'Email',
	// 	required: true,
	// },
	// {
	// 	name: 'firstName',
	// 	fieldType: 'textField',
	// 	label: 'First Name',
	// 	required: true,
	// },
	// {
	// 	name: 'lastName',
	// 	fieldType: 'textField',
	// 	label: 'Last Name',
	// 	required: true,
	// },
	// {
	// 	name: 'dateOfBirth',
	// 	fieldType: 'datePicker',
	// 	label: 'Date Of Birth',
	// 	required: true,
	// 	type: 'date',
	// },
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

const CreateUsers = ({ show, header, toggle }) => {
    const [loader,setLoader]=useState(false)
    const superAdminUser = useSelector(
        (state) => state.PermissionDetails.superAdminUser
	);
    
	const handleUserEdit = async(values) => {
		try{
            setLoader(true);
            await createUser({
                ...values,
                cashierId: superAdminUser?.adminUserId
            })
            setLoader(false);
            showToastr({message:'User create successfully',type:'success'})
            toggle()
        }catch(e){
            setLoader()
			console.log("TCL: handleUserEdit -> e", e)
            
        }
	};


	const { isOpen, setIsOpen, validation, formFields } = useForm({
		header,
		validationSchema: createUserSchema,
		initialValues: getInitialValueCreateUser(),
		onSubmitEntry: (values) => {
			handleUserEdit(values);
		},
		staticFormFields: staticCreateUsersFormFields,
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
					toggle();
				}}
				header={header}
				validation={validation}
				formFields={formFields}
				submitLabel="Submit"
				customColClasses="col-sm-6"
				isSubmitLoading={loader}
			/>
		</div>
	);
};

export default CreateUsers;
