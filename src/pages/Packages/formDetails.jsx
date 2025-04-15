import * as Yup from 'yup';

const staticFiltersFields = () => [
	{
		name: 'isActive',
		fieldType: 'select',
		label: '',
		placeholder: 'Status',
		optionList: [
			{
				id: 1,
				optionLabel: 'All',
				value: true,
			},
			{
				id: 2,
				optionLabel: 'Active',
				value: true,
			},
			{
				id: 3,
				optionLabel: 'In Active',
				value: false,
			},
		],
	},
	{
		name: 'isVisibleInStore',
		fieldType: 'select',
		label: '',
		placeholder: 'Is Visible In Store',
		optionList: [
			{
				id: 1,
				optionLabel: 'All',
				value: true,
			},
			{
				id: 2,
				optionLabel: 'Yes',
				value: true,
			},
			{
				id: 3,
				optionLabel: 'No',
				value: false,
			},
		],
	},
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by Amount & coins',
	},
];

const filterValues = () => ({
	isActive: null,
	search: '',
	isVisibleInStore: null,
});

const getInitialValues = (data) => ({
    amount: data?.amount || '',
    label: data?.label || '',
    gcCoin: data?.gcCoin || '',
    scCoin: data?.scCoin || '',
    isActive: data?.isActive || false,
    isVisibleInStore: data?.isVisibleInStore || false,
    startDate: data?.validTill || '',
    endDate: data?.validFrom || '',
    customizationSettings: data?.customizationSettings || {
        color: 'blue',
        size: 'large',
    },
    // maxPurchasePerUser: data?.maxPurchasePerUser || '',
    discountAmount: data?.discountAmount || '',
    discountEndDate: data?.discountEndDate ? data?.discountEndDate : '',
    pricingTiers:
        data?.pricingTiers ||
        {},
    // giftable: data?.giftable || false,
    file: data?.imageUrl || '',
});

const staticFormFields = () => [
	{
		name: 'label',
		fieldType: 'textField',
		type: 'text',
		label: 'Label',
		placeholder: 'Enter Label',
		isRequired: true,
	},
	{
		name: 'amount',
		fieldType: 'textField',
		type: 'number',
		label: 'Amount',
		placeholder: 'Enter Amount',
		isRequired: true,
	},
	{
		name: 'gcCoin',
		fieldType: 'textField',
		type: 'number',
		label: 'GC',
		placeholder: 'Enter GC Amount',
		isRequired: true,
	},
	{
		name: 'scCoin',
		fieldType: 'textField',
		type: 'number',
		label: 'SC',
		placeholder: 'Enter SC Amount',
		isRequired: true,
	},
	// {
	//  name: 'maxPurchasePerUser',
	//  fieldType: 'textField',
	//  type: 'number',
	//  label: 'Maximum Purchase Per User',
	//  placeholder: 'Enter Amount',
	//  isRequired: true,
	// },
	{
		name: 'discountAmount',
		fieldType: 'textField',
		type: 'number',
		label: 'Discount Amount',
		placeholder: 'Enter Discount Amount',
		isRequired: true,
	},
	// {
	//  name: 'discountEndDate',
	//  fieldType: 'dateTimePicker',
	//  // isRequired: true,
	//  label: 'Discount End Date',
	//  placeholder: 'Select Discount End Date',
	//  // mandatory: true,
	//  minDate: new Date(),
	//  maxDate: '',
	//  // required: true,
	//  hideRequired: true,

	// },
	// {
	//  name: 'ranges',
	//  fieldType: 'dateRangeSelector',
	//  label: 'Valid Till',
	//  placeholder: 'Select Range',
	//  minDate: new Date(),
	//  maxDate: '',
	//  isRequired: true,

	// },
	{
		name: 'file',
		fieldType: 'file',
		type: '',
		label: 'Image',
		placeholder: 'Select image',
		showThumbnail: true,
		isRequired: true,
		// tooltipContent: 'Image size should be less than 2MB and dimensions should not exceed 300x300 pixels'
	},
	{
		name: 'isActive',
		fieldType: 'toggle',
		label: 'Is Active',
		isNewRow: true,
		tooltipContent: 'If True Status is Active else Inactive',
		tooltipAlignment: 'left',
	},
	{
		name: 'isVisibleInStore',
		fieldType: 'toggle',
		label: 'Visibility',
		tooltipAlignment: 'left',
		tooltipContent: 'Is Visible In Store',
	},
	// {
	//  name: 'giftable',
	//  fieldType: 'toggle',
	//  label: 'Giftable',
	//  tooltipAlignment: 'left',
	// },
];

const MIN_TITLE_LENGTH = 3;
const MAX_TITLE_LENGTH = 80;

const packageFormSchema = () =>
	Yup.object({
		label: Yup.string()
			.min(
				MIN_TITLE_LENGTH,
				`Label must be at least ${MIN_TITLE_LENGTH} characters`
			)
			.max(
				MAX_TITLE_LENGTH,
				`Label must be at most ${MAX_TITLE_LENGTH} characters`
			)
			.required('Label is required'),
		amount: Yup.number()
			.min(20, 'Amount should be at least 20 dollars')
			.moreThan(0, 'Amount must be greater than 0')
			.max(1000, 'Amount should not exceed 1000 dollars')
			.required('Amount is required'),

		gcCoin: Yup.number()
			.min(20, 'GC Coins should be at least 20 Coins')
			.moreThan(0, 'GC Coins must be greater than 0')
			.max(10000, 'GC Coins should not exceed 10000 Coins')
			.required('GC Coins fees required'),
		scCoin: Yup.number()
			.min(20, 'SC Coins should be at least 20 Coins')
			.moreThan(0, 'SC Coins must be greater than 0')
			.max(2000, 'SC Coins should not exceed 2000 Coins')
			.required('SC Coins fees required'),
		// maxPurchasePerUser: Yup.number()
		//  .min(1, 'Max Purchase Per User required')
		//  .required('Max Purchase Per User required'),
		discountAmount: Yup.number()
			.min(0, 'Discount Amount should be at least 0')
			.moreThan(0, 'Discount Amount must be greater than 0')
			.max(200, 'Discount Amount should not exceed 200')
			.required('Discount Amount required'),
		// discountEndDate: Yup.date().required('Discount End Date required'),
		file: Yup.mixed()
			.when(
				'$isFilePresent',
				(isFilePresent, schema) =>
					isFilePresent &&
					schema.test(
						'FILE_SIZE',
						'Please select any file.',
						(value) =>
							value && (typeof value === 'string' ? true : value.size > 0)
					)
			)
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
		// startDate: Yup.string().nullable().required('Valid From Required'),
		// endDate: Yup.string().nullable()
		//  .required('Valid Till Required')
		//  .min(
		//      Yup.ref('validFrom'),
		//      'Valid Till cannot be earlier than valid From.'
		//  ),
	});

export {
	staticFiltersFields,
	filterValues,
	getInitialValues,
	packageFormSchema,
	staticFormFields,
};
