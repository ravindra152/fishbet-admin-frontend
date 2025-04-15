const types = [
	{ label: 'DEPOSIT', value: 'deposit', id: 0 },
	{ label: 'BALANCE', value: 'balance', id: 1 },
	{ label: 'FREESPINS', value: 'freespins', id: 2 },
	{ label: 'CASH FREESPINS', value: 'cashfreespins', id: 3 },
	{ label: 'DEPOSIT', value: 'deposit', id: 4 },
	{ label: 'WAGERING(CASHBACK)', value: 'wagering', id: 5 },
	{ label: 'PROMOTION', value: 'promotion', id: 6 },
	{ label: 'JOINING', value: 'joining', id: 7 },
	{ label: 'BIRTHDAY', value: 'birthday', id: 8 },
];

const daysOfWeek = [
	{ label: 'Monday', value: 'Monday', id: 0 },
	{ label: 'Tuesday', value: 'Tuesday', id: 1 },
	{ label: 'Wednesday', value: 'Wednesday', id: 2 },
	{ label: 'Thursday', value: 'Thursday', id: 3 },
	{ label: 'Friday', value: 'Friday', id: 4 },
	{ label: 'Saturday', value: 'Saturday', id: 5 },
	{ label: 'Sunday', value: 'Sunday', id: 6 },
];

const bonusTypes = [
	{ label: 'PURCHASE', value: 'deposit', id: 1 },
	// { label: 'FREESPINS', value: 'freespins', id: 2 },
	// { label: 'PROMOTION', value: 'promotion', id: 3 },
	{ label: 'JOINING', value: 'joining', id: 7 },
	{ label: 'BIRTHDAY', value: 'birthday', id: 8 },
	{
		label: 'Welcome Bonus',
		value: 'welcome',
		id: '323af65-5765-4358-8ed8-33909db5111f',
	},
	{
		label: 'First Purchase Bonus',
		value: 'first_purchase',
		id: '5d6fe8db-1fd1-452f-8db4-0245e33fd1fe',
	},
	{
		label: 'Second Purchase Bonus',
		value: 'second_purchase',
		id: '50e209fa-5b57-4066-860e-5264d3a22900',
	},
	{
		label: 'Third Purchase Bonus',
		value: 'third_purchase',
		id: '19beb857-dfec-44dd-8e00-2d4c6deff1c6',
	},
	{
		label: 'Referral Bonus',
		value: 'referral',
		id: 'dbf2da61-d3e6-4a93-816e-6b0213c17044',
	},
	{
		label: 'Wagering Bonus',
		value: 'wager',
		id: 'f2054b42-0391-499f-bf9e-b795db3f0a51',
	},
];

const convertAmountOptions = [
	{ label: 'Max Bonus Claimed', value: 'maxBonusThreshold' },
	{ label: 'Min Deposit', value: 'minDeposit' },
	{ label: 'Max Win Amount', value: 'maxWinAmount' },
	{ label: 'Zero Out Threshold', value: 'zeroOutThreshold' },
	{ label: 'Min Wallet Balance', value: 'minBalance' },
	{ label: 'Max Allowed Balance', value: 'minBalanceCash' },
	{ label: 'Joining Bonus', value: 'joiningAmount' },
	{ label: 'Birthday Bonus', value: 'birthday' },
	{ label: 'First Deposit %ge', value: '1' },
	{ label: 'Second Deposit %ge', value: '2' },
	{ label: 'Third Deposit %ge', value: '3' },
	{ label: 'Fourth Deposit %ge', value: '4' },
	{ label: 'Fifth Deposit %ge', value: '5' },
];

const checkLabels = (bonusType) => {
	if (
		[
			'freespins',
			'cashfreespins',
			'balance',
			'deposit',
			'promotion',
			'birthday',
			'joining',
		].includes(bonusType)
	) {
		return [
			{
				label: 'Active',
				value: 'isActive',
				message: 'If True Status is Active else In-Active',
			},
			{
				label: 'Visible to User',
				value: 'visibleInPromotions',
				message: 'If true visible in promotion else not',
			},
		];
	}
	return [
		{
			label: 'Active',
			value: 'isActive',
			message: 'If True Status is Active else In-Active',
		},
	];
};

const daysLabels = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
];
const wageringRequirementType = [
	{ label: 'BONUS', value: 'bonus', id: 1 },
	{ label: 'BONUS+DEPOSIT', value: 'bonusdeposit', id: 2 },
];

const bonusEnableCurrencies = {
	joining: ['USD'],
	birthday: ['USD'],
	deposit: ['IDR'],
	freespins: ['USD'],
};

const defaultDepositTypes = {
	1: '',
	2: '',
	3: '',
	4: '',
	5: '',
};

export const BONUS_STATUS = [
	{ label: 'ACTIVE', value: 'active', id: 1 },
	{ label: 'INACTIVE', value: 'inactive', id: 2 },
	{ label: 'CANCELLED', value: 'cancelled', id: 3 },
];

export {
	types,
	bonusTypes,
	daysOfWeek,
	convertAmountOptions,
	checkLabels,
	daysLabels,
	wageringRequirementType,
	bonusEnableCurrencies,
	defaultDepositTypes,
};
