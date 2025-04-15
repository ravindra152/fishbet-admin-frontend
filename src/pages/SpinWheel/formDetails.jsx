import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	wheelDivisionId: defaultValue?.wheelDivisionId || '',
	gc: defaultValue?.gc || '',
	sc: defaultValue?.sc || '',
	priority: defaultValue?.priority || '',
});

const validationSchema = () =>
	Yup.object().shape({
		// wheelDivisionId: Yup.number('Only enter numbers')
		// 	.typeError('GC Coins must be a number')
		// 	.positive('GC Coins must be a positive number')
		// 	.required('GC Coins cannot be Empty'),
		gc: Yup.number('Only enter numbers')
			.typeError('GC Coins must be a number')
			.positive('GC Coins must be a positive number')
			.required('GC Coins cannot be Empty'),
		sc: Yup.number('Only enter numbers')
			.typeError('SC Coins must be a number')
			.positive('SC Coins must be a positive number')
			.required('SC Coins cannot be Empty'),
		// priority: Yup.number('Only enter numbers')
		// 	.typeError('Priority must be a number')
		// 	.positive('Priority must be a positive number')
		// 	.required('Priority cannot be Empty'),
	});

const staticFormFields = [
	{
		name: 'wheelDivisionId',
		fieldType: 'textField',
		label: 'Section Id',
		placeholder: 'Enter Section ID Coin',
		isDisabled: true,
	},
	{
		name: 'gc',
		fieldType: 'textField',
		label: 'GC',
		placeholder: 'Enter GC Coin',
	},
	{
		name: 'sc',
		fieldType: 'textField',
		label: 'SC',
		placeholder: 'Enter GC Coin',
	},
	{
		name: 'priority',
		fieldType: 'select',
		label: 'Priority',
		placeholder: 'Select Priority',
		optionList: [
			{
				id: 1,
				optionLabel: 'Rarely',
				value: "Rarely",
			},
			{
				id: 2,
				optionLabel: 'Sometimes',
				value: 'Sometimes',
			},
			{
				id: 3,
				optionLabel: 'Usually',
				value: 'Usually',
			},
			{
				id: 4,
				optionLabel: 'Frequently',
				value: 'Frequently',
			},
		],
	},
];

export { validationSchema, getInitialValues, staticFormFields };
