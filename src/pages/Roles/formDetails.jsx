import * as Yup from 'yup';
import PropTypes from 'prop-types';

const getInitialValues = (defaultValue) => ({
	name: defaultValue?.name || '',
	level: defaultValue?.level || '',
	permission: defaultValue?.permission || '',
});
const initialValueInstance = {
	name: PropTypes.string,
	level: PropTypes.string,
	permission: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
};

const validationSchema = () =>
	Yup.object({
		name: Yup.string()
			.min(3, 'Name should be between 3 and 50 characters.')
			.max(50, 'Name should be between 3 and 50 characters')
			.required('Name Required'),
		level: Yup.string().required('Level Required'),

	});

const leftStaticFormFields = () => [
	{
		name: 'name',
		fieldType: 'textField',
		label: 'Name',
		placeholder: 'Enter name',
		// isDisabled: isEdit,
	},

];

const rightStaticFormFields = () => [
	{
		name: 'level',
		fieldType: 'textField',
		label: 'level',
		placeholder: 'Enter level',
		// isDisabled: isEdit,
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
		placeholder: 'Search by email, name ',
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
