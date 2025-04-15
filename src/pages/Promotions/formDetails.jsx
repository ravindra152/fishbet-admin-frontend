import * as Yup from 'yup';


// CMS Filter
const staticFiltersFields = () => [
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by title',
	},
	// {
	// 	name: 'isActive',
	// 	fieldType: 'select',
	// 	label: '',
	// 	placeholder: 'Status',
	// 	optionList: [
	// 		{
	// 			id: 1,
	// 			optionLabel: 'Active',
	// 			value: true,
	// 		},
	// 		{
	// 			id: 2,
	// 			optionLabel: 'In Active',
	// 			value: false,
	// 		},
	// 	],
	// },
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

// const initializeData = ({ promotionData, languageData, name }) => {
//   if(!languageData && !languageData?.length) return { EN: ''};
//   const initObject = {}
//   languageData?.map((item) => {
//     initObject[item?.code] = promotionData?.[name]?.[item?.code] || '';
//   });
//   return initObject;
// };

const getInitialValues = (promotionData) => ({
	// title: promotionData ? promotionData?.title?.EN : '',
	// description: promotionData ? promotionData?.description?.EN : '',
	// slug: promotionData ? promotionData?.slug : '',
	content: promotionData ? promotionData?.content?.EN : '',
	category: promotionData ? promotionData?.category : 1,
	redirectUrl: promotionData?.redirectUrl ? promotionData?.redirectUrl : '',
	redirectUrlToggle: promotionData ? !!promotionData?.url : false,
	image: promotionData?.image
		? `${promotionData?.image}`
		: '',
		mobileimage: promotionData?.image
		? `${promotionData?.image}`
		: '',
	language: '',
});

const createPromotionNewSchema = () =>
	Yup.object().shape({
		title: Yup.string()
			// .required('Title is required')
			.min(3, "Title should be at least 3 characters")
			.max(50, "Title should not exceed 50 characters"),

		description: Yup.string()
			// .required('Description is required')
			.min(3, "Description should be at least 3 characters")
			.max(1000, "Description should not exceed 1000 characters"),

		content: Yup.string(),
		// .required('Content is required'),
		category: Yup.string()
		.required('Category is required'),

		redirectUrl:  Yup.string()
		// .required('Category is required')
					.min(3, 'Redirect URL should be at least 3 characters')
					.max(50, 'Redirect URL should not exceed 50 characters'),
			

		image: Yup.mixed()
			// .required('Card Image Required')
			.test('FILE_FORMAT', 'Uploaded file has unsupported format.', (value) =>
				typeof value === 'string' || !value || 
				['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'].includes(value.type)
			)
			.test('FILE_SIZE', 'File size must be less than 2MB.', (value) =>
				typeof value === 'string' || !value || (value && value.size <= 2 * 1024 * 1024)
			),

		mobileimage: Yup.mixed()
			.test('FILE_FORMAT', 'Uploaded file has unsupported format.', (value) =>
				typeof value === 'string' || !value || 
				['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'].includes(value.type)
			)
			.test('FILE_SIZE', 'File size must be less than 2MB.', (value) =>
				typeof value === 'string' || !value || (value && value.size <= 2 * 1024 * 1024)
			),
	});


const staticFormFields = () => [
	{
		name: 'category',
		fieldType: 'select',
		placeholder: 'Select Category',
		label: 'Category',
		// isDisabled: isView || false,
		isDisabled: true,
		optionList: [
			{
				optionLabel: 'Casino Promotion',
				value: 1,
			},
			// {
			// 	optionLabel: 'Sports Promotion',
			// 	value: 2,
			// },
			{
				optionLabel: 'Sponsorship',
				value: 3,
			},
		],
	},
];

// const redirectUrlFormFields = (isView) => [
// 	{
// 		name: 'slug',
// 		fieldType: 'textField',
// 		placeholder: 'Enter Slug',
// 		isDisabled: isView || false,
// 	},
// 	{
// 		name: 'category',
// 		fieldType: 'select',
// 		placeholder: 'Category',
// 		isDisabled: isView || false,
// 		optionList: [
// 			{
// 				optionLabel: 'Casino Promotion',
// 				value: 1,
// 			},
//       // {
// 			// 	optionLabel: 'Sports Promotion',
// 			// 	value: 2,
// 			// },
// 			{
// 				optionLabel: 'Sponsorship',
// 				value: 3,
// 			},
// 		],
// 	},
// ];

export {
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	getInitialValues,
	createPromotionNewSchema,
	staticFormFields,
};
