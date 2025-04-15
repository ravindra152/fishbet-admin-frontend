import * as Yup from 'yup';
import moment from 'moment';

const statusOptionList = [
	{ id: 1, optionLabel: 'Open', value: 'open' },
	{ id: 2, optionLabel: 'Resolved', value: 'resolved' },
	{ id: 3, optionLabel: 'Closed', value: 'closed' },
	{ id: 4, optionLabel: 'Active', value: 'active' },
];

export default statusOptionList;

const staticFiltersFields = () => [
	{
		name: 'User.username',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by User Name',
	},
	
	{
		name: 'Status',
		fieldType: 'select',
		// label: 'Order By',
		placeholder: 'Status',
		optionList: statusOptionList.map(({ value, optionLabel }) => ({
			id: value, 
			value, 
			optionLabel: optionLabel, 
		})),
	},
	// {
	// 	name: 'Status',
	// 	fieldType: 'textField',
	// 	type: 'search',
	// 	label: '',
	// 	placeholder: 'Search by Status',
	// },
];

const startDate = moment().subtract(1, 'month').toDate(); 
const endDate = new Date(); 

const filterValues = () => ({
	email: '',
	username: '', 
	user_id: '', 
	gameName: '',
	status: '',
	startDate,
	endDate,
	currencyCode: null,
	purpose: null,
});

const filterValidationSchema = () =>
	Yup.object({
		email: Yup.string().nullable(),
		gameName: Yup.string().nullable(),
		username: Yup.string().nullable(), 
		user_id: Yup.string().nullable(), 
		status: Yup.string().nullable(), // Added status validation
		startDate: Yup.string().nullable(),
		endDate: Yup.string().nullable(),
		currencyCode: Yup.string().nullable(),
		purpose: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
