import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import PermissionForm from '../permissionForm';
import { getPermissionDetails } from '../../../network/getRequests';
import {
	leftStaticFormFields,
	rightStaticFormFields,
	getInitialValues,
	validationSchema,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';

import { showToastr } from '../../../utils/helpers';
import { createRole } from '../../../network/postRequests';
import { updateRole } from '../../../network/putRequests';

const useActions = () => {

	const { superAdminUser, isAdminLoading } = useSelector(
		(state) => state.PermissionDetails
	);

	const [adminDetails, setAdminDetails] = useState({})
	const [editDetails, setEditDetails] = useState({})

	const [isCreate, setIsCreate] = useState(false)

	const [customComponent, setCustomComponent] = useState();

	const {
		isAddSuperUserLoading,
		isUpdateSuperUserLoading,
	} = useSelector((state) => state.AllAdmins);
	const [isEdit, setIsEdit] = useState(false);
	const updateData = isEdit ? editDetails : adminDetails;

	const handleStaffSubmit = async (values) => {
		const { level, ...rest } = values || {}
		const paylod = { ...rest, level: Number(level), roleId: editDetails?.roleId || undefined }
		const apiCall = isEdit ? updateRole : createRole;
		try {
			await apiCall(paylod);
			showToastr({
				message: 'Create Role',
			})
			setIsCreate(false)
		} catch (error) {

			showToastr({
				message: error.response.data?.
					errors?.
					message,
				type: 'error'
			})
		}

	};



	const {
		isOpen,
		setIsOpen,
		header,
		validation,
		leftFormFields,
		setLeftFormFields,
		rightFormFields,
	} = useForm({
		header: isEdit ? 'Add Role' : 'Edit Role',
		initialValues: getInitialValues(isEdit ? updateData : null, isEdit),
		validationSchema: validationSchema(),
		onSubmitEntry: handleStaffSubmit,
		leftStaticFormFields: leftStaticFormFields(),
		rightStaticFormFields: rightStaticFormFields(),
	});

	const getAllRoles = async () => {
		try {
			const respons = await getPermissionDetails();
			setAdminDetails(respons?.data?.data?.adminDetails);
		} catch (error) {
			console.log(error)
		}
	};


	useEffect(() => { getAllRoles() }, [isEdit])

	useEffect(() => {
		setCustomComponent(
			<PermissionForm
				values={validation.values}
				adminDetails={updateData}
				superAdminUser={superAdminUser}
				validation={validation}
				isEdit={isEdit}
			/>
		);
	}, [adminDetails, editDetails, validation?.values, validation?.values?.role,]);


	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		leftFormFields,
		rightFormFields,
		isAddSuperUserLoading,
		isUpdateSuperUserLoading,
		isAdminLoading,
		adminDetails,
		customComponent,
		setAdminDetails,
		setIsEdit,
		isEdit,
		setEditDetails,
		isCreate, setIsCreate

	};
};

export default useActions;
