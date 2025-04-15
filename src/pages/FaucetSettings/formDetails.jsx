/* eslint-disable import/no-extraneous-dependencies */
import * as Yup from 'yup';


const faucetSettingsSchema = Yup.object().shape({
	SC: Yup.number('Only enter numbers')
		.typeError('SC Coins must be a number')
		.positive('SC Coins must be a positive number')
		.required('SC Coins cannot be Empty'),
	GC: Yup.number('Only enter numbers')
		.typeError('GC Coins must be a number')
		.positive('GC Coins must be a positive number')
		.required('GC Coins cannot be Empty'),
	interval: Yup.number('Only enter numbers')
		.typeError('Intrerval must be a number')
		.positive('Interval must be a positive number')
		.required('Interval cannot be Empty'),
});

const getfaucetSettingsInitialValues = (
	details,
	defaultplaceholder,
	isTenant
) => ({
	SC: details?.SC,
	GC: details?.GC,
	interval: details?.interval,
});

const leftStaticfaucetSettingsFields = (isEditable) => [
	{
		name: 'SC',
		fieldType: 'textField',
		label: 'SC',
		isDisabled: isEditable,
		placeholder: 'Enter SC',
	},
	{
		name: 'GC',
		fieldType: 'textField',
		label: 'GC',
		isDisabled: isEditable,
		placeholder: 'Enter GC',
	},
	{
		name: 'interval',
		fieldType: 'textField',
		label: 'Interval (in min)',
		isDisabled: isEditable,
		placeholder: 'Enter Interval',
	},
];

const rightStaticfaucetSettingsFields = (editableSiteConfig) => [];

export {
	faucetSettingsSchema,
	leftStaticfaucetSettingsFields,
	rightStaticfaucetSettingsFields,
	getfaucetSettingsInitialValues,
};
