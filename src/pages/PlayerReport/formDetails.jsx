/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as Yup from 'yup';
import { ORDER_BY_FOR_PLAYER } from '../../utils/constant';

const getInitialValues = () => ({
	userId: '',
	search: '',
	orderBy:null,
});

const validationSchema = () =>
	Yup.object({
		userId: Yup.string().nullable(),
		search: Yup.string().nullable(),
		orderBy: Yup.string().nullable(),
	});

const staticFormFields = [
	{
		name: 'userId',
		fieldType: 'textField',
		label: 'Search by user ID',
		placeholder: 'Search by user ID',
		maximum: 150,
	},
	{
		name: 'search',
		fieldType: 'textField',
		label: 'Search',
		placeholder: 'Search by name or email',
		maximum: 150,
	},
	{
		name: 'orderBy',
		fieldType: 'select',
		label: 'Order By',
		placeholder: 'Order by',
		optionList: ORDER_BY_FOR_PLAYER.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
];

export { validationSchema, getInitialValues, staticFormFields };
