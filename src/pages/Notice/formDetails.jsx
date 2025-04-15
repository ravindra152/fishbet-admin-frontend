import * as Yup from 'yup';

// CMS Filter
const staticFiltersFields = () => [
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by title or Slug',
	},
	{
		name: 'isActive',
		fieldType: 'select',
		label: '',
		placeholder: 'Status',
		optionList: [
			{
				id: 1,
				optionLabel: 'Active',
				value: true,
			},
			{
				id: 2,
				optionLabel: 'In Active',
				value: false,
			},
		],
	},
];

const filterValues = () => ({
	isActive: null,
	search: '',
});

const filterValidationSchema = () =>
	Yup.object({
		isActive: Yup.string().nullable(),
		search: Yup.string().nullable(),
	});

const getInitialValues = (cmsData) => ({
	title: cmsData ? cmsData?.title?.EN : '',
	// slug: cmsData ? cmsData?.slug : '',
	content: cmsData ? cmsData?.content?.EN : '',
	// category: cmsData ? cmsData?.category : 1,
	// isActive: cmsData ? !!cmsData?.isActive : true,
	// language: '',
});

const createNoticeNewSchema = Yup.object().shape({
	title: Yup.string()
    .min(3, 'Title must be at least 3 characters long')
    .max(1000, 'Title cannot exceed 1000 characters')
   ,

content: Yup.string()
    // .min(3, 'Content must be at least 3 characters long')
    .max(5000, 'Content cannot exceed 5000 characters')
 ,


	// slug: Yup.string()
	// 	.required('Slug is required')
	// 	.min(3, 'Slug must be at least 3 characters')
	// 	.max(30, 'Slug must be at most 30 characters')
	// 	.matches(/^[a-z0-9]+(?:[_-][a-z0-9]+)*$/, 'Enter a valid url slug'),
});

const staticFormFields = (isView) => [
	// {
	// 	name: 'slug',
	// 	fieldType: 'textField',
	// 	placeholder: 'Enter Slug',
	// 	isDisabled: isView || false,
	// },
	// {
	// 	name: 'category',
	// 	fieldType: 'select',
	// 	placeholder: 'Category',
	// 	isDisabled: isView || false,
	// 	optionList: [
	// 		{
	// 			optionLabel: 'Support Links',
	// 			value: 1,
	// 		},
	// 		{
	// 			optionLabel: 'Other Links',
	// 			value: 2,
	// 		},
	// 	],
	// },
	// {
	// 	name: 'isActive',
	// 	fieldType: 'toggle',
	// 	label: 'Status',
	// 	placeholder: 'Status',
	// 	isDisabled: isView || false,
	// },
];

export {
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	getInitialValues,
	createNoticeNewSchema,
	staticFormFields,
};
