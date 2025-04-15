import * as Yup from 'yup';

const getInitialValues = (defaultValue = {}) => {
    console.log("Default Value:", defaultValue); 

    return {
        name: defaultValue?.name?.EN || '',
        gameAggregatorId: defaultValue?.gameAggregatorId || '',
        isActive: defaultValue?.isActive || false,
        web: defaultValue?.web || '',
        mobile: defaultValue?.mobile || '',
    };
};


const validationSchema = () =>
	Yup.object().shape({
		name: Yup.string()
			.max(50, 'Name must be less than 50 characters')
			.matches(/^[A-Za-z0-9 ]+$/, 'Only Alpha-Numeric Values Allowed')
			.required('Provider Name Required'),
		gameAggregatorId: Yup.string().required('Aggregator Required'),
		web: Yup.mixed()
			.required('A file is required')
			.test('File Size', 'File Size Should be Less Than 2MB', (value) =>
				typeof value === 'string'
					? true
					: !value || (value && value.size <= 1024 * 1024)
			)
			.test('FILE_FORMAT', 'Uploaded file has unsupported format.', (value) =>
				typeof value === 'string'
					? true
					: !value ||
					  (value &&
							['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
			),
			mobile: Yup.mixed()
			.test('File Size', 'File Size Should be Less Than 2MB', (value) =>
				typeof value === 'string'
					? true
					: !value || (value && value.size <= 1024 * 1024)
			)
			.test('FILE_FORMAT', 'Uploaded file has unsupported format.', (value) =>
				typeof value === 'string'
					? true
					: !value ||
					  (value &&
							['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
			),
	});

	const staticFormFields = [
		{
			name: 'name',
			fieldType: 'textField',
			label: 'Provider Name',
			placeholder: 'Enter Provider Name',
			isDisabled: true,
		},
		{
			name: 'isActive',
			fieldType: 'switch',
			label: 'Active',
		},
		{
			name: 'web',
			fieldType: 'file',
			label: 'Thumbnail',
			placeholder: 'Enter Thumbnail',
			showThumbnail: true,
			hideRequired: false,
			isRequired: true, // Marking it as required
		},
		{
			name: 'mobile',
			fieldType: 'file',
			label: 'Mobile Thumbnail',
			placeholder: 'Enter Thumbnail ',
			showThumbnail: true,
		},
	];
	
export const statusList = [
	{ value: true, label: 'Active' },
	{ value: false, label: 'In-Active' },
];
// Provider filter
const staticFiltersFields = () => [
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by provider',
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
