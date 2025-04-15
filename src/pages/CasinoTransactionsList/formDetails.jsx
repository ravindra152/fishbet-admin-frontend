import * as Yup from 'yup';
import moment from 'moment';
import { transactionType } from './constants';

const staticFiltersFields = () => [
	{
		name: 'purpose',
		fieldType: 'select',
		label: '',
		placeholder: 'Transaction Type',
		optionList: transactionType.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
	// {
	// 	name: 'email',
	// 	fieldType: 'textField',
	// 	type: 'search',
	// 	label: '',
	// 	placeholder: 'Search by email',
	// },
	{
		name: 'username',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by User Name',
	},
	{
		name: 'user_id',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by User Id',
	},
	{
		name: 'gameName',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by Game name',
	},
	// {
	// 	name: 'gameName',
	// 	fieldType: 'textField',
	// 	type: 'search',
	// 	label: '',
	// 	placeholder: 'Search by Game name',
	// },
	{
		name: 'ranges',
		fieldType: 'dateRangeSelector',
		label: '',
		placeholder: 'Date Range',
	},
];
// const startDate = moment().subtract(1, 'month').toDate(); // Do not define it inside filterValue function
// const endDate = new Date(); // Do not define it inside filterValue function

const startDate = moment().startOf('day').toDate(); 
// const endDate = moment().toDate();


const filterValues = () => ({
	email: '',
	username: '', 
	user_id: '', 
	gameName: '',
	startDate,
	// endDate,
	currencyCode: null,
	purpose: null,
});

const filterValidationSchema = () =>
	Yup.object({
		email: Yup.string().nullable(),
		gameName: Yup.string().nullable(),
		// status: Yup.string().nullable(),
		username: Yup.string().nullable(), 
		user_id: Yup.string().nullable(), 
		startDate: Yup.string().nullable(),
		endDate: Yup.string().nullable(),
		currencyCode: Yup.string().nullable(),
		purpose: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
