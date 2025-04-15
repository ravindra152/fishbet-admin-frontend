import * as Yup from 'yup';
import PropTypes from 'prop-types';

// Add staff and edit staff
const getInitialValues = (defaultValue) => ({
	email: defaultValue?.email || '',
	password: '',
	adminUsername: defaultValue?.adminUsername || '',
	firstName: defaultValue?.firstName || '',
	lastName: defaultValue?.lastName || '',
	role: defaultValue?.AdminRole?.name || null,
	adminId: defaultValue?.parentId || null,
	permission: defaultValue?.permission || {},
	// group: defaultValue?.group || null,
});
const initialValueInstance = {
	email: PropTypes.string,
	password: PropTypes.string,
	adminUsername: PropTypes.string,
	firstName: PropTypes.string,
	lastName: PropTypes.string,
	role: PropTypes.string,
	adminId: PropTypes.string,
	permission: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
	// group: PropTypes.string,
};

const validationSchema = (isEdit) =>
	Yup.object({
		email: Yup.string()
			.email('Invalid email')
			.max(200)
			.required('Email Required'),
		password: !isEdit
			? Yup.string()
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
					'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
				)
				.matches(
					/^(?=.*[@$!%*?&])/,
					'Password must contain at least one special character (@$!%*?&)'
				)
				.min(8, 'Password must be at least 8 characters long')
				.max(30, 'Password must not exceed 30 characters')
				.required('Password is required')
			: Yup.string().nullable(),
		firstName: Yup.string()
			.min(3, 'First Name should be between 3 and 50 characters.')
			.max(50, 'First Name should be between 3 and 50 characters')
			.matches(/^[A-Za-z]+$/, 'First Name should only contain alphabets.')
			.required('First Name Required'),
		lastName: Yup.string()
			.min(3, 'Last Name should be between 3 and 50 characters.')
			.max(50, 'Last Name should be between 3 and 50 characters.')
			.matches(/^[A-Za-z]+$/, 'Last Name should only contain alphabets.')
			.required('Last Name Required'),
		role: Yup.string().required('Role Required'),
		// adminId: Yup.string().when('role', {
		// 	is: (role) => role === 'Support',
		// 	then: Yup.string().required('Parent Admin is required').nullable(),
		// 	otherwise: Yup.string().nullable(),
		// }),
		adminUsername: Yup.string()
			.matches(
				/^[a-zA-Z0-9_]+$/,
				'Username can only contain alphanumeric characters and underscores.'
			)
			.min(3, 'User Name should be between 3 and 50 characters.')
			.max(50, 'User Name should be between 3 and 50 characters.')
			.required('User Name Required'),
		// group: Yup.string()
		// 	.min(3, 'Group Name must be atleast 3 characters')
		// 	.max(200)
		// 	.matches(/^[A-Za-z0-9 ]+$/, 'Only Alphabets, Numbers and Space Allowed')
		// 	.required('Group Name Required'),
	});

const leftStaticFormFields = (isEdit) => [
	{
		name: 'adminUsername',
		fieldType: 'textField',
		label: 'Username',
		placeholder: 'Enter username',
		isDisabled: isEdit,
	},
	{
		name: 'firstName',
		fieldType: 'textField',
		label: 'First Name',
		placeholder: 'Enter first name',
	},
	{
		name: 'password',
		fieldType: 'passwordField',
		label: 'Password',
		placeholder: 'Enter password',
		isPassword: true, // for showing visibility (if needed)
		isHide: isEdit,
	},
];

const rightStaticFormFields = (isEdit) => [
	{
		name: 'email',
		fieldType: 'textField',
		label: 'Email',
		placeholder: 'Enter your email',
		isDisabled: isEdit,
	},
	{
		name: 'lastName',
		fieldType: 'textField',
		label: 'Last Name',
		placeholder: 'Enter last name',
	},
];

// Staff Filter
const staticFiltersFields = () => [
	{
		name: 'status',
		fieldType: 'select',
		label: '',
		placeholder: 'Status',
		optionList: [
			{
				id: 1,
				optionLabel: 'Active',
				value: true,
			},
			{
				id: 2,
				optionLabel: 'In Active',
				value: false,
			},
		],
	},
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by email, name',
	},
];

const filterValues = () => ({
	status: null,
	search: '',
});

const filterValidationSchema = () =>
	Yup.object({
		status: Yup.string().nullable(),
		search: Yup.string().nullable(),
	});

export {
	validationSchema,
	getInitialValues,
	leftStaticFormFields,
	rightStaticFormFields,
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	initialValueInstance,
};
