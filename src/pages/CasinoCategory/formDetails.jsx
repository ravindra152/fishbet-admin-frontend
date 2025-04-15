/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as Yup from 'yup';

export const statusList = [
	{ value: true, label: 'Active' },
	{ value: false, label: 'In-Active' },
];

const getInitialValues = (defaultValue) => ({
    selectedLang: 'EN',
    isActive: defaultValue?.isActive || false,
    name: defaultValue?.name?.EN || '',
    mobile: defaultValue?.mobile || null,  // Ensure it matches the payload
    web: defaultValue?.web || null,        // Ensure it matches the payload
});


const validateName = (name) => {
	const validationObject = {};
	for (const file in name) {
		validationObject[file] = Yup.string()
			.required('Label Name Required!')
			.nullable();
	}
	return Yup.object(validationObject);
};

const validationSchema = () =>
	Yup.object().shape({
		name: Yup.string().required('category name is required')
		.min(3, "Category Name should be at least 3 words")
		.max(50, "Category Name should not exceed 50 words"),
		web: Yup.mixed()
    .test(
        'FILE_FORMAT',
        'Uploaded file has unsupported format.',
        (value) =>
            typeof value === 'string'
                ? true
                : !value ||
                  (value &&
                      ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'].includes(value.type))
    )
    .test(
        'FILE_SIZE',
        'File size must be less than 2MB.',
        (value) =>
            typeof value === 'string' ? true : !value || (value && value.size <= 2 * 1024 * 1024)
    ),
	mobile: Yup.mixed()
	.nullable() // Allows null values
    .test(
        'FILE_FORMAT',
        'Uploaded file has unsupported format.',
        (value) =>
            typeof value === 'string'
                ? true
                : !value ||
                  (value &&
                      ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'].includes(value.type))
    )
    .test(
        'FILE_SIZE',
        'File size must be less than 2MB.',
        (value) =>
            typeof value === 'string' ? true : !value || (value && value.size <= 2 * 1024 * 1024)
    ),

	});

	const staticFormFields = [
		{
			name: 'name',
			fieldType: 'textField',
			label: 'Category name',
			placeholder: 'Enter category name',
		},
		{
			name: 'mobile',
			fieldType: 'file',
			label: 'Mobile Image',
			placeholder: 'Select image',
			showThumbnail: true,
		},
		{
			name: 'web',
			fieldType: 'file',
			label: 'Image',
			placeholder: 'Select image',
			showThumbnail: true,
		},
		{
			name: 'isActive',
			fieldType: 'switch',
			label: 'Active',
		},
	];
	

// Category filters
const staticFiltersFields = () => [
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by category',
	},
	{
		name: 'isActive',
		fieldType: 'select',
		placeholder: 'Status',
		optionList: statusList.map(({ value, label }) => ({
			id: value,
			value,
			optionLabel: label,
		})),
	},
];

const filterValues = () => ({
	search: '',
	isActive: null,
});

const filterValidationSchema = () =>
	Yup.object({
		search: Yup.string().nullable(),
		isActive: Yup.boolean().nullable(),
	});

export {
	validationSchema,
	getInitialValues,
	staticFormFields,
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
};
