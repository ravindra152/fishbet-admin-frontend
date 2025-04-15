import * as Yup from 'yup';

// CMS Filter
const staticFiltersFields = () => [
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by title or Slug',
	},
	{
		name: 'isActive',
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
];

const filterValues = () => ({
	isActive: null,
	search: '',
});

const filterValidationSchema = () =>
	Yup.object({
		isActive: Yup.string().nullable(),
		search: Yup.string().nullable(),
	});

	const getInitialValues = (bonusDrop) => ({
		name: bonusDrop ? bonusDrop?.name : '',
		code: bonusDrop ? bonusDrop?.code : '',
		coin: bonusDrop ? bonusDrop?.coin : '',
		coin_type: bonusDrop ? bonusDrop?.coin_type : 'GC', // Default to GC
		expiryTime: bonusDrop
			? new Date(bonusDrop?.expiryTime)?.toISOString()?.split('T')[0]
			: '',
		totalClaimsAllowed: bonusDrop ? bonusDrop?.totalClaimsAllowed : '',
		isActive: bonusDrop ? !!bonusDrop?.isActive : true,
		language: '',
	});
	

	const createBonusDropNewSchema = Yup.object().shape({
		name: Yup.string().required('Name is required')
		.min(3, 'Name must be at least 3 characters')
			.max(25, 'Name cannot be more than 50 characters'),
		code: Yup.string()
			// .required('Code is required')
			.min(8, 'Code must be at least 10 characters')
			.max(25, 'Code cannot be more than 25 characters')
			.matches(
				/^(?=.*[A-Z])(?=.*\d)[A-Z\d]{8,25}$/,
				'Code must contain only uppercase letters and numbers'
			),
		coin: Yup.string()
			.required('Coin is required')
			.min(1, 'Coin must be at least 1')
			.max(8, 'Coin cannot be more than 8'),
			// .matches(/^[0-9]+$/, 'Coin must be a number'),
		coinType: Yup.string()
			.required('Coin Type is required')
			.oneOf(['GC', 'BSC'], 'Coin Type must be GC or BSC'), 
			expiryTime: Yup.date()
			.required('Expiry Time is required')
			.min(new Date(new Date().setHours(0, 0, 0, 0)), 'Expiry Time cannot be in the past'),		
		totalClaimsAllowed: Yup.string()
		.required('Total Claims Allowed is required')
		.min(1, 'Total Claims Allowed must be at least 1')
		.max(10, 'Total Claims Allowed cannot be more than 10'),
			// .matches(/^[0-9]+$/, 'Total Claims Allowed must be a number'),
		isActive: Yup.boolean().required('Status is required'),
	});
	

const staticFormFields = (isEdit) => [
	{
		name: 'name',
		label: 'Name',
		fieldType: 'textField',
		placeholder: 'Enter Name',
		isDisabled: isEdit || false,
	},
	{
		name: 'code',
		label: 'Code',
		fieldType: 'textField',
		placeholder: 'Enter Code',
		isDisabled: isEdit || false,
		hideRequired: true,

	},
	{
		name: 'coin',
		label: 'Coin',
		fieldType: 'textField',
		type: 'number',
		placeholder: 'Enter Coin',
		// isDisabled: isView || false,
	},
	{
		name: 'expiryTime',
		label: 'Expiry Time',
		fieldType: 'datePicker',
		placeholder: 'Enter Expiry Time',
		// isDisabled: isView || false,
	},
	{
		name: 'totalClaimsAllowed',
		label: 'Maximum numbers of Player',
		fieldType: 'textField',
		type: 'number',
		placeholder: 'Enter Total Claims Allowed',
		defaultValue: 0, 
		// isDisabled: isView || false,
	},
	
	{
		name: 'isActive',
		fieldType: 'toggle',
		label: 'Status',
		placeholder: 'Status',
		// isDisabled: isView || false,
	},
	{
		name: 'coinType',
		label: 'Coin Type',
		fieldType: 'select',
		placeholder: 'Select Coin Type',
		optionList: [
			{ id: 1, optionLabel: 'GC', value: 'GC' },
			{ id: 2, optionLabel: 'SC', value: 'BSC' },
		],
	},
];

export {
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	getInitialValues,
	createBonusDropNewSchema,
	staticFormFields,
};
