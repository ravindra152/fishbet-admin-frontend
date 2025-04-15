/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as Yup from 'yup';
import { ORDER_BY_FOR_GAMES } from '../../utils/constant';

const getInitialValues = () => ({
	userId: '',
	search: '',
	orderBy: null,
	startDate:'',
	endDate:''
	
});

const validationSchema = () =>
	Yup.object({
		userId: Yup.string().nullable(),
		search: Yup.string().nullable(),
		orderBy: Yup.string().nullable(),
		startDate: Yup.string().nullable(),
		endDate: Yup.string().nullable(),
	});

const staticFormField = [
	{
		name: 'search',
		fieldType: 'textField',
		label: 'Search',
		placeholder: 'Search by game name',
		maximum: 150,
	},
	{
		name: 'ranges',
		fieldType: 'dateRangeSelector',
		label: 'Date range',
		placeholder: 'Date Range',
	},
	{
		name: 'orderBy',
		fieldType: 'select',
		label: 'Order By',
		placeholder: 'Order by',
		optionList: ORDER_BY_FOR_GAMES.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
];

export { validationSchema, getInitialValues, staticFormField };
