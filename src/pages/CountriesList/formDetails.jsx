import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	countryName: defaultValue?.countryName || '',
	languageId: defaultValue?.languageId || '',
});

const validationSchema = Yup.object().shape({
	countryName: Yup.string().required('Language cannot be Empty'),
});

const staticFormFields = [
	{
		name: 'countryName',
		fieldType: 'textField',
		label: 'Country Name',
		isDisabled: true,
	},
];

// Country filter
const staticFiltersFields = () => [
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by name',
	},
];

const filterValues = () => ({
	search: '',
});

const filterValidationSchema = () =>
	Yup.object({
		search: Yup.string().nullable(),
	});

export {
	validationSchema,
	getInitialValues,
	staticFormFields,
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
};
