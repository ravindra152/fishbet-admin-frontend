import * as Yup from 'yup';
import moment from 'moment';
import { TRANSACTION_PURPOSE } from '../CasinoTransactionsList/constants';

const staticFiltersFields = () => [
	// {
	// 	name: 'actioneeType',
	// 	fieldType: 'select',
	// 	label: '',
	// 	placeholder: 'Actionee Type',
	// 	optionList: [
	// 		{
	// 			value: 'user',
	// 			optionLabel: 'User',
	// 		},
	// 		{
	// 			value: 'admin',
	// 			optionLabel: 'Admin',
	// 		},
	// 	],
	// },
	// {
	// 	name: 'email',
	// 	fieldType: 'textField',
	// 	type: 'search',
	// 	label: '',
	// 	placeholder: 'Search by Email',
	// },
	// {
	// 	name: 'status',
	// 	fieldType: 'select',
	// 	label: '',
	// 	placeholder: 'Status',
	// 	optionList: statusType.map(({ value, label }) => ({
	// 		id: value,
	// 		value,
	// 		optionLabel: label,
	// 	})),
	// },
	{
		name: 'userId',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by User ID',
	},
	{
		name: 'email',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by email',
	},
	{
		name: 'ranges',
		fieldType: 'dateRangeSelector',
		label: '',
		placeholder: 'Date Range',
		minDate: moment().utc().startOf('day').toDate(),
		maxDate: moment().add(100, 'years').utc().toDate(),
	},
	{
		name: 'purpose',
		fieldType: 'select',
		label: '',
		placeholder: 'Purpose',
		optionList: TRANSACTION_PURPOSE.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
];

const startDate = moment(new Date()).subtract(1, 'month').toDate(); 
const endDate = new Date(); 

const filterValues = () => ({
	userId: '',
	email: '',
	// status: null,
	// actioneeType: null,
	startDate,
	endDate,
	currencyCode: null,
	purpose: null,
});

const filterValidationSchema = () =>
	Yup.object({
		email: Yup.string().nullable(),
		userId: Yup.string().nullable(),
		status: Yup.string().nullable(),
		actioneeType: Yup.string().nullable(),
		startDate: Yup.string().nullable(),
		endDate: Yup.string().nullable(),
		currencyCode: Yup.string().nullable(),
		purpose: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
