import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	name: defaultValue?.name || '',
	code: defaultValue?.code || '',
	symbol: defaultValue?.symbol || '',
	exchangeRate: defaultValue?.exchangeRate || '',
	loyaltyPoint: defaultValue?.loyaltyPoint || '',
	type: defaultValue?.type || 0,
});

const validationSchema = () =>
	Yup.object().shape({
		name: Yup.string()
			.matches(/^[aA-zZ\s]+$/, 'Enter only alphabets')
			.min(3, 'Name should be of more than 3 characters')
			.max(50, 'Name Cannot be of more than 50 characters')
			.required('Name cannot be Empty'),
		code: Yup.string()
			.matches(/^[aA-zZ\s]+$/, 'Enter only alphabets')
			.max(3, 'Code Cannot be of more than 3 characters')
			.required('Code cannot be Empty'),
		symbol: Yup.string()
			.max(5, 'Symbol Cannot be of more than 5 characters')
			.required('Symbol cannot be Empty'),
		exchangeRate: Yup.number('Only enter numbers')
			.typeError('Exchange rate must be a number')
			.positive('Exchange rate must be a positive number')
			.required('Exchange Rate cannot be Empty'),
		type: Yup.number().required('Type cannot be Empty'),
	});

const staticFormFields = [
	{
		name: 'name',
		fieldType: 'textField',
		label: 'Name',
		placeholder: 'Enter name of your currency',
	},
	{
		name: 'code',
		fieldType: 'textField',
		label: 'Code',
		placeholder: 'Enter currency code',
		isDisabled: true,
	},
	{
		name: 'symbol',
		fieldType: 'textField',
		label: 'Symbol',
		placeholder: 'Enter currency symbol',
		isDisabled: true,
	},
	{
		name: 'exchangeRate',
		fieldType: 'textField',
		label: 'Exchange Rate (with base currency USD)',
		placeholder: 'Enter currency exchange rate',
	},
	// {
	// 	name: 'loyaltyPoint',
	// 	fieldType: 'textField',
	// 	label: 'Loyalty Point',
	// 	placeholder: 'Enter loyalty point',
	// },
	{
		name: 'type',
		fieldType: 'select',
		label: 'Type',
		placeholder: 'Enter type',
		isDisabled: true,
		optionList: [
			{
				id: 1,
				optionLabel: 'Crypto',
				value: 2,
			},
			{
				id: 2,
				optionLabel: 'Fiat',
				value: 1,
			},
		],
	},
];

export { validationSchema, getInitialValues, staticFormFields };
