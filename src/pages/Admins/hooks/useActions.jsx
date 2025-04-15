import React, { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import { isEmpty } from 'lodash';
import {
	leftStaticFormFields,
	rightStaticFormFields,
	getInitialValues,
	validationSchema,
} from '../formDetails';
import { getRolesStart } from '../../../store/auth/roles/actions';
import PermissionForm from '../permissionForm';
import { getAllGroupsStart } from '../../../store/adminUser/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	resetLinearProgress,
	showLinearProgress,
} from '../../../store/progressLoading/actions';
import { getPermissionsStart } from '../../../store/auth/permissionDetails/actions';
import {
	addSuperAdminUserStart,
	updateSuperAdminUserStart,
} from '../../../store/actions';
import useAdminListing from './useAdminListing';
import { showToastr } from '../../../utils/helpers';
import { modules } from '../../../constants/permissions';

const useActions = (isEditPage, filterValues = {}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const roles = useSelector((state) => state.AdminRoles.roles);
	const groups = useSelector((state) => state.AdminUser.groups);
	const { adminDetails, superAdminUser, isAdminLoading } = useSelector(
		(state) => state.PermissionDetails
	);

	const {
		isAddSuperUserLoading,
		isUpdateSuperUserLoading,
		adminDetails: allAdminList,
	} = useSelector((state) => state.AllAdmins);
	const [customComponent, setCustomComponent] = useState();
	const [isEdit, setIsEdit] = useState(isEditPage || false);
	const handleStaffSubmit = (values) => {
		if (
			[undefined, null].includes(values.permission) ||
			Object.keys(values.permission).length < 1
		) {
			dispatch(
				showToastr({
					message: 'Please select at least one permission',
					type: 'error',
				})
			);
		} else if (isEdit) {
			dispatch(
				updateSuperAdminUserStart({
					data: {
						...values,
						adminUserId: adminDetails?.adminUserId,
					},
					navigate,
				})
			);
		} else {
			const selectedRole = roles.find((role) => role.name === values.role);
			dispatch(
				addSuperAdminUserStart({
					data: {
						...values,
						adminRoleId: selectedRole?.roleId,
						password: Buffer.from(values.password).toString('base64'),
						adminId: values.adminId
							? Number(values.adminId)
							: adminDetails.adminUserId,
					},
					navigate,
				})
			);
		}
	};

	const handleAdminSelect = (e) => {
		dispatch(getPermissionsStart(Number(e.target.value)));
	};

	const {
		isOpen,
		setIsOpen,
		header,
		validation,
		leftFormFields,
		setLeftFormFields,
		rightFormFields,
		setRightFormFields,
		setHeader,
	} = useForm({
		header: isEdit ? 'Add Staff' : 'Edit Staff',
		initialValues: getInitialValues(isEdit ? adminDetails : null, isEdit),
		validationSchema: validationSchema(isEdit),
		onSubmitEntry: handleStaffSubmit,
		leftStaticFormFields: leftStaticFormFields(isEdit),
		rightStaticFormFields: rightStaticFormFields(isEdit),
	});

	const handleEdit = (e, row) => {
		e.preventDefault();
		setIsEdit(true);
		navigate(`edit/${row.adminUserId}`);
		// setHeader('Edit Staff');
		dispatch(showLinearProgress());
	};

	const {
		formattedAdminDetails,
		isLoading,
		totalAdminsCount,
		page,
		setPage,
		itemsPerPage,
		columns,
		onChangeRowsPerPage,
		modalStates,
		closeModal,
		handleStatus,
		adminData,
	} = useAdminListing(handleEdit, filterValues);

	const handleAddClick = (e) => {
		e.preventDefault();
		setHeader('Add Staff');
		navigate('add');
		setIsEdit(false);
	};

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleAddClick,
			link: '#!',
			module: modules.Administrator,
			operation: 'C',
		},
	]);

	const setCustomFields = () => {
		if (roles?.length 
			// && groups?.length && allAdminList.rows?.length
		) {
			let customField = {};

			const roleOptions = roles
				.filter((r) => r.name !== 'Super Admin')
				.map((r) => ({
					id: r.roleId,
					optionLabel: r.name,
					value: r.name,
					level: r.level,
				}));

			// const groupOptions = groups
			// 	.filter((r) => r)
			// 	.map((g) => ({
			// 		id: g,
			// 		label: g,
			// 		value: g,
			// 	}));

			const adminOptions = allAdminList?.rows?.map((ad) => ({
				optionLabel: `${ad.firstName} ${ad.lastName}`,
				value: ad.adminUserId,
			}));
			const selectRoleField = {
				name: 'role',
				fieldType: 'select',
				label: 'Role',
				placeholder: 'Select Role',
				optionList: roleOptions,
				isDisabled: isEdit,
			};

			if (validation?.values?.role === 'Manager') {
				customField = {
					name: 'adminId',
					fieldType: 'select',
					label: 'Admin',
					placeholder: 'Select Admin',
					optionList: adminOptions,
					callBack: handleAdminSelect,
					// isDisabled: isEdit,
				};
			}

			setRightFormFields([
				...rightStaticFormFields(isEdit),
				// {
				// 	name: 'group',
				// 	fieldType: 'creatableSingleSelect',
				// 	label: 'Group',
				// 	optionList: groupOptions,
				// 	callBack: (option) => {
				// 		validation.setFieldValue('group', option.value);
				// 	},
				// },
				isEdit ? {} : selectRoleField,
				isEdit ? customField : {},
			]);

			setLeftFormFields([
				...leftStaticFormFields(isEdit),
				isEdit ? selectRoleField : {},
				isEdit ? {} : customField,
			]);
		}
	};

	useEffect(() => {
		if (isEmpty(roles)) {
			dispatch(getRolesStart());
		}
		if (isEmpty(groups)) {
			dispatch(getAllGroupsStart());
		}
		// if (isEmpty(allAdminList)) {
		// 	dispatch(
		// 		getAdminDetails({
		// 			limit: itemsPerPage,
		// 			pageNo: page,
		// 			orderBy: 'adminUserId',
		// 			sort: 'DESC',
		// 			userType: superAdminUser?.AdminRole?.name
		// 		})
		// 	);
		// }
	}, []);

	useEffect(() => {
		if (!isEmpty(roles) 
			// && !isEmpty(groups) && !isEmpty(allAdminList)
		)
			setCustomFields();
	}, [
		roles,
		groups,
		validation?.values?.role,
		isEdit,
		allAdminList,
		validation?.values?.group,
	]);
	useEffect(() => {
		// if(validation?.values?.role === 'Admin' || (validation?.values?.role === 'Manager' && validation?.values?.adminId))
		setCustomComponent(
			<PermissionForm
				values={validation.values}
				adminDetails={adminDetails}
				superAdminUser={superAdminUser}
				validation={validation}
				isEdit={isEdit}
			/>
		);
	}, [
		validation?.values,
		adminDetails,
		superAdminUser,
		validation?.values?.role,
	]);

	useEffect(() => {
		if (isEdit && adminDetails && !isAdminLoading) {
			dispatch(resetLinearProgress());
		}
	}, [adminDetails, isAdminLoading]);

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		customComponent,
		isLoading,
		totalAdminsCount,
		page,
		setPage,
		itemsPerPage,
		columns,
		formattedAdminDetails,
		buttonList,
		leftFormFields,
		rightFormFields,
		isAddSuperUserLoading,
		isUpdateSuperUserLoading,
		isAdminLoading,
		adminDetails,
		onChangeRowsPerPage,
		modalStates,
		closeModal,
		handleStatus,
		adminData,
	};
};

export default useActions;
