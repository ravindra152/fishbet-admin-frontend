/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	word: defaultValue.word || '',
	wordId: defaultValue.id || null,
});

const validationSchema = () =>
	Yup.object({
		word: Yup.string().required('Word Required'),
	});

const staticFormFields = [
	{
		name: 'word',
		fieldType: 'textField',
		label: 'Required',
		maximum: 150,
	},
];

export { validationSchema, getInitialValues, staticFormFields };
