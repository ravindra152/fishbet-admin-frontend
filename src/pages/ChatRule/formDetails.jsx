/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	rule: defaultValue.rules || '',
	chatRuleId: defaultValue.id ? +defaultValue.id : null,
});

const validationSchema = () =>
	Yup.object({
		rule: Yup.string().required('Rule Required'),
	});

const staticFormFields = [
	{
		name: 'rule',
		fieldType: 'textField',
		label: 'Chat Rules',
		maximum: 150,
	},
];


export { validationSchema, getInitialValues, staticFormFields };
