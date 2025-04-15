import * as Yup from 'yup';
import moment from 'moment';

const staticFiltersFields = () => [

	{
		name: 'gameName',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by Game name',
	},

];
const startDate = moment().subtract(1, 'month').toDate(); // Do not define it inside filterValue function
const endDate = new Date(); // Do not define it inside filterValue function

const filterValues = () => ({
	email: '',
	username: '', 
	user_id: '', 
	gameName: '',
	startDate,
	endDate,
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
