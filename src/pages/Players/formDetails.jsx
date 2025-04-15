import * as Yup from 'yup';
// Player Filters
export const kycLabels = [
	{ value: 1, label: 'Level 1' },
	{ value: 2, label: 'Level 2' },
	{ value: 3, label: 'Level 3' },
	{ value: 4, label: 'Level 4' },
	{ value: 5, label: 'Level 5' },
];

export const LoggedInLabel = [
	{ value: 1, label: 'Signed In' },
	{ value: 0, label: 'Signed Out' },
];

export const statusList = [
	{ value: true, label: 'Active' },
	{ value: false, label: 'In-Active' },
];

const staticFiltersFields = [
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by name, email',
	},
	// {
	// 	name: 'affiliateName',
	// 	fieldType: 'textField',
	// 	type: 'search',
	// 	label: '',
	// 	placeholder: 'Search by Affiliate',
	// },
	{
		name: 'userId',
		fieldType: 'textField',
		type: 'number',
		label: '',
		placeholder: 'Search by user Id',
		minimum: 1,
	},
	{
		name: 'ranges',
		fieldType: 'dateRangeSelector',
		label: '',
		placeholder: 'Search by registration date',
	},
	// {
	// 	name: 'phoneNumber',
	// 	fieldType: 'textField',
	// 	type: 'tel',
	// 	label: '',
	// 	placeholder: 'Search by Phone number',
	// },

	// {
	// 	name: 'level',
	// 	fieldType: 'select',
	// 	label: '',
	// 	placeholder: 'KYC Level',
	// 	optionList: kycLabels.map(({ value, label }, idx) => ({
	// 		id: idx + 1,
	// 		value,
	// 		optionLabel: label,
	// 	})),
	// },
	// {
	// 	name: 'loggedIn',
	// 	fieldType: 'select',
	// 	label: '',
	// 	placeholder: 'Login Status',
	// 	optionList: LoggedInLabel.map(({ value, label }) => ({
	// 		id: value,
	// 		value,
	// 		optionLabel: label,
	// 	})),
	// },
	{
		name: 'isActive',
		fieldType: 'select',
		placeholder: 'Status',
		optionList: statusList.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
];

const filterValues = (countryCode) => ({
	search: '',
	level: null,
	affiliateName: '',
	startDate: null,
	endDate: null,
	userId: '',
	phoneNumber: '',
	orderBy: null,
	sort: '',
	loggedIn: null,
	countryCode,
	isActive: null,
});

const filterValidationSchema = () =>
	Yup.object({
		search: Yup.string().nullable(),
		level: Yup.number().nullable(),
		affiliateName: Yup.string().nullable(),
		startDate: Yup.string().nullable(),
		endDate: Yup.string().nullable(),
		userId: Yup.string().nullable(),
		phoneNumber: Yup.string().nullable(),
		orderBy: Yup.string().nullable(),
		sort: Yup.string().nullable(),
		loggedIn: Yup.number().nullable(),
		countryCode: Yup.string().nullable(),
		isActive: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
