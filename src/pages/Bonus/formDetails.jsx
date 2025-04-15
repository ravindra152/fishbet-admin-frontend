import * as Yup from 'yup';
import moment from 'moment';
import { BONUS_STATUS, bonusTypes } from './constants';

const currentDate = moment().toDate();
const nextDayDate = moment().add('days', 1).toDate();

const generalStepInitialValues = ({ bonusDetails }) => ({
	promotionTitle: bonusDetails?.promitionTitle || '',
	promitionTitle: bonusDetails?.promitionTitle || '',
	// bonusAmount: bonusDetails?.bonusAmount || 0,
	// maxBonusLimit: bonusDetails?.maxBonusLimit || 0,
	// wagerMultiplier: bonusDetails?.wagerMultiplier || 0,
	// minDeposit: bonusDetails?.minDeposit || 0,
	// minWagerAmount: bonusDetails?.minWagerAmount || 0,
	// referralCode: bonusDetails?.referralCode || '',
	// depositBonusPercent: bonusDetails?.depositBonusPercent || 1,
	//  change to ValidFrom and validTo
	termsConditions: bonusDetails?.termsConditions || '',
	description: bonusDetails?.description || '',
	startDate: bonusDetails?.validFrom || currentDate,
	endDate: bonusDetails?.validTo || nextDayDate,
	bonusType: bonusDetails?.bonusType || 'joining',
	wageringMultiplier: bonusDetails?.wageringMultiplier || 1,
	isSticky: bonusDetails?.isSticky || false,
	wageringRequirementType: bonusDetails?.wageringRequirementType || 'bonus',
	// daysToClear: bonusDetails?.daysToClear || 1,
	isActive: bonusDetails?.isActive || false,
	visibleInPromotions: bonusDetails?.visibleInPromotions || false,
	showBonusValidity: bonusDetails?.other?.showBonusValidity || true,
	validOnDays: bonusDetails?.validOnDays || [],
	termCondition: bonusDetails?.termCondition?.EN || '',
	// description: bonusDetails?.description?.EN || '',
	bonusImage: `${bonusDetails?.imageUrl}` || null,
	quantity: bonusDetails?.quantity || 1,
	betLevel: bonusDetails?.other?.betLevel || 1,
	timePeriod: bonusDetails?.other?.timePeriod || '1',
	currency: {
		// USD: {
		// 	maxBonusThreshold: '',
		// 	minDeposit: '',
		// 	maxWinAmount: '',
		// 	zeroOutThreshold: '',
		// },
	},
});

const generalNewStepInitialValues = ({ bonusDetails }) => ({
	...bonusDetails,
	bonusId: bonusDetails?.id || '',
	isAmountInPercentage: bonusDetails?.isAmountInPercentage || false,
	promotionTitle: bonusDetails?.promotionTitle || '',
	gcAmount: Number(bonusDetails?.gcAmount) || 0,
	scAmount: Number(bonusDetails?.scAmount) || 0,
	percentage: Number(bonusDetails?.percentage) || 0,
	// minPurchase: Number(bonusDetails?.minPurchase) || 0,
	// promoCode: bonusDetails?.promoCode || '',
	// promitionTitle: bonusDetails?.promitionTitle || '',
	// bonusAmount: Number(bonusDetails?.bonusAmount) || 0,
	// maxBonusLimit: Number(bonusDetails?.maxBonusLimit) || 0,
	// wagerMultiplier: bonusDetails?.wagerMultiplier || 0,
	// minDeposit: Number(bonusDetails?.minDeposit) || 0,
	// minWagerAmount: Number(bonusDetails?.minWagerAmount) || 0,
	// referralCode: bonusDetails?.referralCode || '',
	// depositBonusPercent: bonusDetails?.depositBonusPercent || 1,
	//  change to ValidFrom and validTo
	termsConditions: bonusDetails?.termsConditions || '',
	description: bonusDetails?.description || '',
	bonusType: bonusDetails?.bonusType || 'welcomw',
	// daysToClear: bonusDetails?.daysToClear || 1,
	status: bonusDetails?.status || 'active',
	// termCondition: bonusDetails?.termCondition?.EN || '',
	// description: bonusDetails?.description?.EN || '',
	bonusImage: `${bonusDetails?.imageUrl}` || null,
});

const getCreateBonusInitialValues = () => ({
	promotionTitle: '',
	bonusType: 'joining',
	//  change to ValidFrom and validTo
	startDate: currentDate,
	endDate: nextDayDate,
	termCondition: '',
	quantity: 1,
	wageringMultiplier: 1,
	currency: {
		// USD: {
		// 	maxBonusThreshold: '',
		// 	minDeposit: '',
		// 	maxWinAmount: '',
		// 	zeroOutThreshold: '',
		// },
	},
	providers: '',
	daysToClear: 1,
	games: '',
	maxBonusThreshold: '',
	status: '',
	// minDeposit: '',
	wageringRequirementType: 1,
	maxWinAmount: '',
	isWinCashAmt: '',
	isBonusWagering: '',
	// depositBonusPercent: 1,
	isMultipleAllowed: '',
	// tenantIds: [],
	validOnDays: [],
	bonusImage: null,
	isActive: false,
	showBonusValidity: true,
	visibleInPromotions: false,
	isSticky: false,
	paymentMethods: {},
	// wageringTemplateId: wageringTemplateList?.[0]?.wageringTemplateId,
	appliedBonusId: '',
	// adminId: '',
	description: '',
	loyaltyLevel: null,
	other: null,
	minBalance: '',
	timePeriod: '1',
	betLevel: 1,
});

const createBonusValidationSchema = () => ({
	// bonusSchema(curr, { bonusDetail: null })[
	//   tabLabels.findIndex((val) => val === selectedTab)
	// ]
});

const generalStaticFormFieldsWithoutPercent = (isDisabled) => [
	{
		name: 'promotionTitle',
		fieldType: 'textField',
		type: '',
		label: 'Promotion Title',
		placeholder: 'Promotion Title',
	},
	{
		name: 'ranges',
		fieldType: 'dateRangeSelector',
		label: 'Bonus Validity',
		placeholder: 'Select Range',
		minDate: moment().subtract(1, 'days').utc().toDate(),
		maxDate: moment().add(100, 'years').utc().toDate(),
		isDisabled,
	},
];

const generalStaticFormFields = (isDisabled) => [
	{
		name: 'promotionTitle',
		fieldType: 'textField',
		type: '',
		label: 'Promotion Title',
		placeholder: 'Promotion Title',
	},
	// {
	// 	name: 'depositBonusPercent',
	// 	fieldType: 'textField',
	// 	type: 'number',
	// 	label: 'Bonus Percentage',
	// 	placeholder: 'Bonus Percentage',
	// 	isDisabled,
	// },
	{
		name: 'ranges',
		fieldType: 'dateRangeSelector',
		label: 'Bonus Validity',
		placeholder: 'Select Range',
		minDate: moment().utc().startOf('day').toDate(),
		maxDate: moment().add(100, 'years').utc().toDate(),
		isDisabled,
	},
];

const commonFields = (isDisabled) => [
	{
		name: 'isActive',
		fieldType: 'toggle',
		label: 'Active',
		isNewRow: true,
		isDisabled,
		tooltipContent: 'If True Status is Active else In-Active',
	},
	{
		name: 'visibleInPromotions',
		fieldType: 'toggle',
		label: 'Visible to User',
		isDisabled,
		tooltipContent:
			'If true content will be visible in bonus section to players else not',
	},
	// {
	// 	name: 'showBonusValidity',
	// 	fieldType: 'toggle',
	// 	label: 'Hide Validity',
	// 	tooltipContent: 'If true bonus validity will be hidden to user',
	// },
	{
		name: 'termCondition',
		fieldType: 'textEditor',
		type: '',
		label: 'Terms and Conditions',
		placeholder: 'Enter Terms and Conditions',
		isNewRow: true,
		fieldColOptions: { lg: 12 },
	},
	{
		name: 'description',
		fieldType: 'textEditor',
		type: '',
		label: 'Description',
		placeholder: 'Enter Description',
		isNewRow: true,
		fieldColOptions: { lg: 12 },
	},
	{
		name: 'bonusImage',
		fieldType: 'file',
		type: '',
		label: 'Bonus Image',
		placeholder: 'Select bonus image',
		isNewRow: true,
		showThumbnail: true,
	},
];

const typeDepositAdditionalFields = (isDisabled, isStickyCallback) => [
	// {
	// 	name: 'wageringMultiplier',
	// 	fieldType: 'textField',
	// 	type: 'number',
	// 	label: 'Wagering Multiplier',
	// 	placeholder: 'Wagering Multiplier',
	// 	isDisabled,
	// },
	{
		name: 'isSticky',
		fieldType: 'select',
		label: 'Is Sticky',
		placeholder: 'Is Sticky',
		isDisabled,
		callBack: isStickyCallback,
		optionList: [
			{
				id: 1,
				optionLabel: 'Yes',
				value: true,
			},
			{
				id: 2,
				optionLabel: 'No',
				value: false,
			},
		],
	},
	{
		name: 'wageringRequirementType',
		fieldType: 'select',
		label: 'Wagering Type',
		placeholder: 'Wagering Type',
		isDisabled: true,
		optionList: [
			{
				id: 1,
				optionLabel: 'Bonus',
				value: 'bonus',
			},
			{
				id: 2,
				optionLabel: 'Bonus+Deposit',
				value: 'bonusdeposit',
			},
		],
	},
	{
		name: 'daysToClear',
		fieldType: 'textField',
		type: 'number',
		label: 'Days to Clear',
		placeholder: 'Days to Clear',
		isDisabled,
	},
	...commonFields(isDisabled),
];

const typeFreeSpinAdditionalFields = (isDisabled) => [
	{
		name: 'quantity',
		fieldType: 'textField',
		type: 'number',
		label: 'Quantity',
		placeholder: 'Quantity',
	},
	{
		name: 'wageringMultiplier',
		fieldType: 'textField',
		type: 'number',
		label: 'Wagering Multiplier',
		placeholder: 'Wagering Multiplier',
	},
	{
		name: 'wageringRequirementType',
		fieldType: 'select',
		label: 'Wagering Type',
		placeholder: 'Wagering Type',
		isDisabled: true,
		optionList: [
			{
				id: 1,
				optionLabel: 'Bonus',
				value: 'bonus',
			},
			{
				id: 2,
				optionLabel: 'Bonus+Deposit',
				value: 'bonusdeposit',
			},
		],
	},
	{
		name: 'daysToClear',
		fieldType: 'textField',
		type: 'number',
		label: 'Days to Clear',
		placeholder: 'Days to Clear',
	},
	{
		name: 'betLevel',
		fieldType: 'textField',
		type: 'number',
		label: 'Bet Level',
		placeholder: 'Bet Level',
		isDisabled,
	},
	...commonFields(isDisabled),
];

// Filters
const staticFiltersFields = () => [
	// {
	//   name: 'bonusType',
	//   fieldType: 'select',
	//   label: '',
	//   placeholder: 'Bonus type',
	//   optionList: bonusTypes.map(({ label, value, id }) => ({
	//     optionLabel: label,
	//     value,
	//     id,
	//   })),
	// },
	{
		name: 'search',
		fieldType: 'textField',
		type: 'search',
		label: '',
		placeholder: 'Search by title and description',
	},
	// {
	//   name: 'isActive',
	//   fieldType: 'select',
	//   label: '',
	//   placeholder: 'Status',
	//   optionList: [
	//     {
	//       id: 1,
	//       optionLabel: 'Active',
	//       value: true,
	//     },
	//     {
	//       id: 2,
	//       optionLabel: 'In Active',
	//       value: false,
	//     },
	//   ],
	// },
];

const newcommonFields = (isDisabled, handlePercentageToggle) => [
	{
		name: 'promotionTitle',
		fieldType: 'textField',
		type: '',
		label: 'Promotion Title',
		placeholder: 'Promotion Title',
		isDisabled,
		hideRequired: isDisabled,
	},
	// {
	// 	name: 'bonusAmount',
	// 	fieldType: 'textField',
	// 	type: 'number',
	// 	label: 'Free Spin Quantity',
	// 	placeholder: 'Free Spin Quantity',
	// 	isDisabled,
	// 	hideRequired: isDisabled,
	// },
	{
		name: 'bonusType',
		fieldType: 'select',
		label: 'Bonus Type',
		placeholder: 'Select Bonus type',
		isError: isDisabled,
		optionList: bonusTypes.map(({ label, value, id }) => ({
			optionLabel: label,
			value,
			id,
		})),
		isDisabled: true,
	},
	{
		name: 'gcAmount',
		fieldType: 'textField',
		type: 'number',
		label: 'GC Amount',
		placeholder: 'Enter GC Amount',
		isDisabled,
		hideRequired: isDisabled,
		validation: Yup.number().required('GC Amount is required')
			.min(0, 'GC Amount cannot be less than 0')
			.max(100000, 'GC Amount cannot be more than 100000'), 
	},
	{
		name: 'scAmount',
		fieldType: 'textField',
		type: 'number',
		label: 'SC Amount',
		placeholder: 'Enter SC Amount',
		isDisabled,
		hideRequired: isDisabled,
		validation: Yup.number().required('GC Amount is required')
		.min(0, 'GC Amount cannot be less than 0')
		.max(20000, 'GC Amount cannot be more than 20000'), 
	},
	{
		name: 'percentage',
		fieldType: 'textField',
		type: 'number',
		label: 'Amount in Percentage',
		placeholder: 'Enter Percentage',
		isDisabled,
		hideRequired: true,
		validation: Yup.number()
			.required('Percentage is required')
			.min(0, 'Percentage cannot be less than 0')
			.max(100, 'Percentage cannot be more than 100'), // Added max 100 validation
	
	}
	,
	// {
	// 	name: 'minPurchase',
	// 	fieldType: 'textField',
	// 	type: 'number',
	// 	label: 'Min Purchase',
	// 	placeholder: 'Enter Min Purchase',
	// 	isDisabled,
	// 	hideRequired: true,
	// },
	// {
	// 	name: 'promoCode',
	// 	fieldType: 'textField',
	// 	type: '',
	// 	label: 'Promo Code',
	// 	placeholder: 'Enter Promo Code',
	// 	isDisabled,
	// 	hideRequired: isDisabled,
	// },
	// {
	// 	name: 'maxBonusLimit',
	// 	fieldType: 'textField',
	// 	type: 'number',
	// 	label: 'Max Bonus Limit',
	// 	placeholder: 'Max Bonus Limit',
	// 	isDisabled,
	// 	hideRequired: isDisabled,
	// },
	// {
	// 	name: 'wagerMultiplier',
	// 	fieldType: 'textField',
	// 	type: 'number',
	// 	label: 'Wager Multiplier',
	// 	placeholder: 'Wager Multiplier',
	// 	isDisabled,
	// 	hideRequired: isDisabled,
	// },
	// {
		// name: 'minDeposit',
	// 	fieldType: 'textField',
	// 	type: '',
	// 	label: 'Min Deposit',
	// 	placeholder: 'Min Deposit',
	// 	isDisabled,
	// 	hideRequired: true,
	// },
	// {
	// 	name: 'minWagerAmount',
	// 	fieldType: 'textField',
	// 	type: '',
	// 	label: 'Min Wager Amount',
	// 	placeholder: 'Min Wager Amount',
	// 	isDisabled,
	// 	hideRequired: true,
	// },
	// {
	//   name: 'eligibleGames',
	//   fieldType: 'textField',
	//   type: '',
	//   label: 'Eligible Games',
	//   placeholder: '',
	//   isDisabled: true,
	//   hideRequired: isDisabled,
	// },
	// {
	// 	name: 'referralCode',
	// 	fieldType: 'textField',
	// 	type: '',
	// 	label: 'Referral Code',
	// 	placeholder: '',
	// 	isDisabled: true,
	// 	required: false,
	// 	hideRequired: isDisabled,
	// },
	// {
	// 	name: 'status',
	// 	fieldType: 'toggle',
	// 	label: 'Active',
	// 	isNewRow: true,
	// 	isDisabled,
	// 	tooltipContent: 'If True Status is Active else In-Active',
	// },
	{
		name: 'status',
		fieldType: 'select',
		label: 'Status',
		placeholder: 'Select Status',
		isError: isDisabled,
		optionList: BONUS_STATUS.map(({ label, value, id }) => ({
			optionLabel: label,
			value,
			id,
		})),
		isDisabled,
	},
	{
		name: 'isAmountInPercentage',
		fieldType: 'toggle',
		callBack: handlePercentageToggle,
		label: 'Amount In Percentage',
		isNewRow: true,
		isDisabled,
		tooltipContent: 'If True Status is Active else In-Active',
	},
	// {
	//   name: 'visibleInPromotions',
	//   fieldType: 'toggle',
	//   label: 'Visible to User',
	//   isDisabled,
	//   tooltipContent: 'If true content will be visible in bonus section to players else not',
	// },
	// {
	// 	name: 'showBonusValidity',
	// 	fieldType: 'toggle',
	// 	label: 'Hide Validity',
	// 	tooltipContent: 'If true bonus validity will be hidden to user',
	// },
	{
		name: 'termsConditions',
		fieldType: 'textEditor',
		type: '',
		label: 'Terms and Conditions',
		placeholder: 'Enter Terms and Conditions',
		isNewRow: true,
		fieldColOptions: { lg: 12 },
		isDisabled,
		readOnly: isDisabled,
	},
	{
		name: 'description',
		fieldType: 'textEditor',
		type: '',
		label: 'Description',
		placeholder: 'Enter Description',
		isNewRow: true,
		fieldColOptions: { lg: 12 },
		isDisabled,
		readOnly: isDisabled,
	},
	{
		name: 'bonusImage',
		fieldType: 'file',
		type: '',
		label: 'Bonus Image',
		placeholder: 'Select bonus image',
		isNewRow: true,
		showThumbnail: true,
		isDisabled,
		hideRequired: isDisabled,
	},
];

const filterValues = () => ({
	isActive: null,
	search: '',
	bonusType: null,
});

const filterValidationSchema = () =>
	Yup.object({
		isActive: Yup.string().nullable(),
		search: Yup.string().nullable(),
		bonusType: Yup.string().nullable(),

	});

export {
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	getCreateBonusInitialValues,
	createBonusValidationSchema,
	generalStaticFormFields,
	typeDepositAdditionalFields,
	typeFreeSpinAdditionalFields,
	commonFields,
	generalStepInitialValues,
	generalStaticFormFieldsWithoutPercent,
	newcommonFields,
	generalNewStepInitialValues,
};