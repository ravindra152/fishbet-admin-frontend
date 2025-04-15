import * as Yup from 'yup';

const depositFormFields = [
	{
		name: 'depositAmount',
		fieldType: 'textfieldWithAdornment',
		label: 'Set Min Deposit Limit Amount',
		type: 'number',
		step: '0.00001',
		minimum: 0,
	},
];

const minMaxDepositFormFields = [
	{
		name: 'minDepositAmount',
		fieldType: 'textfieldWithAdornment',
		label: 'Set Deposit Min Limit Amount',
		type: 'number',
		step: '0.00001',
		minimum: 0,
	},
	{
		name: 'maxDepositAmount',
		fieldType: 'textfieldWithAdornment',
		label: 'Set Deposit Max Limit Amount',
		type: 'number',
		step: '0.00001',
		minimum: 0,
	},
];

const depositValidationSchema = ({ maxDeposit, minDeposit }) =>
	Yup.object({
		depositCurrencyCode: Yup.string().required('Currency required'),
		depositAmount: Yup.number()
			.positive('Deposit Limit must be positive number')
			.required('Deposit Limit Required')
			.min(0),
		minDepositAmount: Yup.number()
			.positive('Minimum Deposit Limit must be positive number')
			.required('Minimum Deposit Limit Required')
			.min(20000, 'Minimum 20,000 required')
			.max(maxDeposit - 0.00001, `Maximum limit is ${maxDeposit}`),
		maxDepositAmount: Yup.number()
			.positive('Maximum Deposit Limit must be positive number')
			.required('Maximum Deposit Limit Required')
			.min(minDeposit + 0.00001, `Minimum limit is ${minDeposit}`),
	});

const withdrawalFormFields = [
	{
		name: 'withdrawAmount',
		fieldType: 'textfieldWithAdornment',
		label: 'Set Min Withdrawal Limit Amount',
		type: 'number',
		step: '0.00001',
		minimum: 0,
	},
];

const minMaxWithdrawFormFields = [
	{
		name: 'minWithdrawAmount',
		fieldType: 'textfieldWithAdornment',
		label: 'Set Withdraw Min Limit Amount',
		type: 'number',
		step: '0.00001',
		minimum: 0,
	},
	{
		name: 'maxWithdrawAmount',
		fieldType: 'textfieldWithAdornment',
		label: 'Set Withdraw Max Limit Amount',
		type: 'number',
		step: '0.00001',
		minimum: 0,
	},
];

const withdrawValidationSchema = ({ maxWithdraw, minWithdraw }) =>
	Yup.object({
		withdrawAmount: Yup.number()
			.positive('Withdraw Limit must be positive number')
			.required('Withdraw Limit Required'),
		minWithdrawAmount: Yup.number()
			.positive('Minimum Withdraw Limit must be positive number')
			.required('Minimum Withdraw Limit Required')
			.min(20000, 'Minimum 20,000 required')
			.max(maxWithdraw - 0.00001, `Maximum limit is ${maxWithdraw}`),
		maxWithdrawAmount: Yup.number()
			.positive('Maximum Withdraw Limit must be positive number')
			.required('Maximum Withdraw Limit Required')
			.min(minWithdraw + 0.00001, `Minimum limit is ${minWithdraw}`),
		withdrawCurrencyCode: Yup.string().required('Currency required'),
	});

const getDefaultAffiliateCommisionValues = (defaultValue) => ({
	affiliatePercentage: defaultValue?.affiliatePercentage || '',
});

const getDefaultReferralCommisionValues = (defaultValue) => ({
	referralAmount: defaultValue?.referralAmount || '',
});

const affiliateCommisionFormFields = [
	{
		name: 'affiliatePercentage',
		fieldType: 'textField',
		label: 'Set Affiliate Commision Percentage',
		type: 'number',
		step: '0.00001',
		minimum: 0,
	},
];

const affiliateCommisionSchema = () =>
	Yup.object({
		affiliatePercentage: Yup.number()
			.positive('Commision Percentage must be a positive number')
			.required('Commision Percentage Required'),
	});

const ReferralCommisionFormFields = (initialValues) => ([
  // {
	// 	name: 'currency',
	// 	fieldType: 'textField',
  //   label: 'Currency',
  //   isDisabled: true,
	// },
	{
		name: 'referralAmount',
		fieldType: 'textfieldWithAdornment',
		label: 'Set Referral Commision Amount',
		type: 'number',
		step: '0.00001',
		minimum: 0,
    adornmentText: initialValues?.currencyCode,
	},
]);

const ReferralCommisionSchema = () =>
	Yup.object({
		referralAmount: Yup.number()
			.positive('Commision Amount must be a positive number')
			.required('Commision Amount Required'),
	});

export {
	depositFormFields,
	depositValidationSchema,
	minMaxDepositFormFields,
	withdrawalFormFields,
	withdrawValidationSchema,
	minMaxWithdrawFormFields,
	getDefaultAffiliateCommisionValues,
	affiliateCommisionFormFields,
	getDefaultReferralCommisionValues,
	affiliateCommisionSchema,
	ReferralCommisionFormFields,
	ReferralCommisionSchema,
};
