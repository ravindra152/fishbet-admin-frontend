/* eslint-disable eqeqeq */
import * as Yup from 'yup';

const generalStepInitialValues = ({ chatRainDetails, currencies }) => ({
	name: chatRainDetails?.name || '',
	prizeMoney: chatRainDetails?.prizeMoney || '',
	currency:
		currencies?.find(
			(currency) => currency?.code == chatRainDetails?.currencyId
		)?.code || null,
	chatGroupId: chatRainDetails?.chatGroupId || null,
});

const generalStaticFormFields = () => [
	{
		name: 'name',
		fieldType: 'textField',
		type: '',
		label: 'Chat Rain Title',
		placeholder: 'Chat Rain Title',
	},
	{
		name: 'prizeMoney',
		fieldType: 'textField',
		type: 'number',
		label: 'Prize Money',
		placeholder: 'Prize Money',
	},
];

// Filters
const staticFiltersFields = () => [];

const filterValues = () => ({
	search: '',
});

const filterValidationSchema = () =>
	Yup.object({
		search: Yup.string().nullable(),
	});

export {
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	generalStaticFormFields,
	generalStepInitialValues,
};
