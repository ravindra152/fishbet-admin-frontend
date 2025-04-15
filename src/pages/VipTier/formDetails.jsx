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
                value: null,
            },
            {
                id: 2,
                optionLabel: 'Active',
                value: true,
            },
            {
                id: 3,
                optionLabel: 'Inactive',
                value: false,
            },
        ],
    },
    {
        name: 'prioritySupport',
        fieldType: 'select',
        label: '',
        placeholder: 'Priority Support',
        optionList: [
            {
                id: 1,
                optionLabel: 'All',
                value: null,
            },
            {
                id: 2,
                optionLabel: 'Enabled',
                value: true,
            },
            {
                id: 3,
                optionLabel: 'Disabled',
                value: false,
            },
        ],
    },
    {
        name: 'search',
        fieldType: 'textField',
        type: 'search',
        label: '',
        placeholder: 'Search by Name or Level',
    },
];

const filterValues = () => ({
    isActive: null,
    search: '',
    prioritySupport: null,
});

const getInitialValues = (data) => ({
    ...(data ? { vipTierId: data?.vipTierId || '' } : {}),
    name: data?.name || '',
    icon: data?.icon || '',
    level: data?.level ?? 0,
    wageringThreshold: data?.wageringThreshold ?? 0,
    gamesPlayed: data?.gamesPlayed ?? 0,
    bigBetsThreshold: data?.bigBetsThreshold ?? 0,
    bigBetAmount: data?.bigBetAmount ?? 0,
    depositsThreshold: data?.depositsThreshold ?? 0,
    loginStreak: data?.loginStreak ?? 0,
    referralsCount: data?.referralsCount ?? 0,
    // sweepstakesEntries: data?.sweepstakesEntries || '',
    // scRequiredPlay: data?.scRequiredPlay || '',
    // sweepstakesWins: data?.sweepstakesWins || '',
    // gcRequiredPurchase: data?.gcRequiredPurchase || '',
    timeBasedConsistency: data?.timeBasedConsistency ?? 0,
    // gradualLoss: data?.gradualLoss || '',
    // gradualLossPeriodUnit: data?.gradualLossPeriodUnit || 'days',
    // prioritySupport: data?.prioritySupport || false,
    isActive: data?.isActive || false,
    // rewardCap: data?.rewardCap || '',
});

const getRewardsInitialValues = (data) => ({
    ...(data
        ? { vipTierId: data?.vipTierId || '', rewardId: data?.rewardId || '' }
        : {}),
    cashBonus: data?.cashBonus ?? 0,
    // freeSpin: data?.freeSpin || '',
    commissionRate: data?.commissionRate ?? 0,
    rackback: data?.rackback ?? 0,
    // exclusiveGames: data?.exclusiveGames || [],
    prioritySupport: data?.prioritySupport || false,
    // eventInvites: data?.eventInvites || false,
    isActive: data?.isActive || false,
});

const staticFormFields = [
    {
        name: 'name',
        fieldType: 'textField',
        type: 'text',
        label: 'VIP Tier Name',
        placeholder: 'Enter Name',
        isRequired: true,
        tooltip:
            'The name of the VIP tier (e.g., Bronze, Silver, Gold). This indicates the level or rank of the tier',
    },
    {
        name: 'icon',
        fieldType: 'file',
        type: '',
        label: 'Tier Icon/Badge',
        placeholder: 'Select icon',
        showThumbnail: true,
        isRequired: true,
    },
    {
        name: 'level',
        fieldType: 'textField',
        type: 'number',
        label: 'Level',
        placeholder: 'Enter Level',
        isRequired: true,
        tooltip:
            'The rank or priority of the VIP tier. Higher numbers represent better (higher) tiers in the hierarchy',
    },
    {
        name: 'wageringThreshold',
        fieldType: 'textField',
        type: 'number',
        label: 'Wager Threshold',
        placeholder: 'Enter Wager Threshold',
        // isRequired: true,
        hideRequired: true,
        tooltip:
            'The minimum amount a player must wager or bet to qualify for this VIP tier. This ensures players are active and engaged',
    },
    {
        name: 'gamesPlayed',
        fieldType: 'textField',
        type: 'number',
        label: 'Number of Games Played',
        placeholder: 'Enter Games Played',
        isRequired: true,
        tooltip:
            'The minimum number of games a player needs to play to qualify for this tier. This shows how many games are needed to advance',
    },
    {
        name: 'bigBetsThreshold',
        fieldType: 'textField',
        type: 'number',
        label: 'Big Bets Threshold',
        placeholder: 'Enter Big Bets Threshold',
        // isRequired: true,
        hideRequired: true,
        tooltip:
            'The number of big bets (bets above a certain amount) a player needs to place to qualify for this tier',
    },
    {
        name: 'bigBetAmount',
        fieldType: 'textField',
        type: 'number',
        label: 'Big Bet Amount',
        placeholder: 'Enter Big Bet Amount',
        isRequired: true,
        tooltip:
            'The minimum bet value that is considered a big bet for this tier. A player needs to place bets at or above this amount to qualify',
    },
    {
        name: 'depositsThreshold',
        fieldType: 'textField',
        type: 'number',
        label: 'Deposits Threshold ',
        placeholder: 'Enter Deposits Threshold',
        // isRequired: true,
        hideRequired: true,
        tooltip:
            'The total amount a player needs to deposit into their account to qualify for this VIP tier',
    },
    {
        name: 'loginStreak',
        fieldType: 'textField',
        type: 'number',
        label: 'Login Streak (In Days)',
        placeholder: 'Enter Login Streak',
        isRequired: true,
        tooltip:
            'The number of consecutive days a player must log in to their account to qualify for this VIP tier',
    },
    {
        name: 'referralsCount',
        fieldType: 'textField',
        type: 'number',
        label: 'Referrals Count',
        placeholder: 'Enter Referrals Count',
        // isRequired: true,
        hideRequired: true,
        tooltip:
            "The minimum number of friends or players a user needs to refer to qualify for this tier. Referrals help increase a player's rank",
    },
    // {
    //  name: 'sweepstakesEntries',
    //  fieldType: 'textField',
    //  type: 'number',
    //  label: 'Sweepstakes Entries ',
    //  placeholder: 'Enter Sweepstakes Entries',
    //  // isRequired: true,
    //  hideRequired: true,

    // },
    // {
    //  name: 'sweepstakesWins',
    //  fieldType: 'textField',
    //  type: 'number',
    //  label: 'Sweepstakes Wins',
    //  placeholder: 'Sweepstakes Wins',
    //  // isRequired: true,
    //  hideRequired: true,

    // },
    {
        name: 'timeBasedConsistency',
        fieldType: 'textField',
        type: 'number',
        label: 'Time-Based Consistency (In Days)',
        placeholder: 'Time-Based Consistency',
        isRequired: true,
        tooltip:
            'The minimum number of days over which a player must meet the spending criteria (for example, depositing $1,000 every month) to remain in or qualify for this tier',
    },
    {
        name: 'isActive',
        fieldType: 'toggle',
        label: 'Is Active',
        isRequired: true,
    },
];

const staticRewardsFormFields = [
    {
        name: 'cashBonus',
        fieldType: 'textField',
        type: 'number',
        label: 'Cash Bonus (SC Coins)',
        placeholder: 'Enter Cash Bonus',
        isRequired: true,
        tooltip:
            'The total amount of bonus (SC Coins) given to the user at this VIP tier. This is a cash reward for the player',
    },
    // {
    //  name: 'freeSpin',
    //  fieldType: 'textField',
    //  type: 'number',
    //  label: 'Free Spins',
    //  placeholder: 'Enter Free Spins',
    //  isRequired: true,
    // },
    {
        name: 'rackback',
        fieldType: 'textField',
        type: 'number',
        label: 'Rackback',
        placeholder: 'Enter Rackback',
        isRequired: true,
        tooltip:
            'The percentage of the lost amount that is returned to the user. This is a form of compensation for losses incurred by the player at this VIP tier.',
    },
    {
        name: 'commissionRate',
        fieldType: 'textField',
        type: 'number',
        label: 'Commission Rate',
        placeholder: 'Enter Rackback',
        isRequired: true,
        tooltip:
            'The total percentage of commission that a user will earn or pay based on the activities related to this VIP tier.(ex referral bonus)',
    },

    {
        name: 'prioritySupport',
        fieldType: 'toggle',
        label: 'Priority Support',
        isRequired: true,
        tooltip:
            'Indicates if priority support is enabled for this VIP tier. When true, VIP members receive faster or more exclusive support',
    },
    // {
    //  name: 'eventInvites',
    //  fieldType: 'toggle',
    //  label: 'Event Invitations',
    //  isRequired: true,
    // },
    {
        name: 'isActive',
        fieldType: 'toggle',
        label: 'Is Active',
        isRequired: true,
        tooltip:
            'The minimum number of games a player needs to play to qualify for this tier. This shows how many games are needed to advance',
    },
];

const validationSchema = () =>
    Yup.object({
        name: Yup.string()
            .min(3, 'Name must be at least 3 characters')
            .max(50, 'Name must be at most 50 characters')
            .required('Name is required'),
        icon: Yup.mixed()
            .required('Icon is required')
            .test(
                'fileSize',
                'Image size should be less than 2MB',
                (value) => !value || typeof value === 'object' ? value.size <= 2 * 1024 * 1024 : true
            ),
        level: Yup.number()
            .min(0, 'Level must be at least 0')
            .max(10000, 'Level should not be exceed 10000')
            .required('Level is required')
            .test('is-unique', 'Level must be unique', function (value) {
             const levels = [1, 2, 3, 4]; // Replace with dynamic data
             return !levels.includes(value);
            }),
        wageringThreshold: Yup.number()
            // required('Wager Threshold is required')
            .min(0, 'Wagering Threshold should be at least 0')
            .max(10000, 'Wagering Threshold should not exceed 10000'),
        gamesPlayed: Yup.number()
            .required('Games Played is required')
            .min(0, 'Number of games Played should be at least 0')
            .max(500, 'Number of games Played should not exceed 500'),
        bigBetsThreshold: Yup.number()
        // .required(
        //  'Big Bets Threshold is required'
        // ),
        .min(0, 'Big Bets Threshold should be at least 0')
            .max(500, 'Big Bets Threshold should not exceed 500'),
        bigBetAmount: Yup.number()
            .required('Big Bet Amount is required')
            .min(0, 'Big Bet Amount should be at least 0')
            .max(5000, 'Big Bet Amount should not exceed 5000'),
        depositsThreshold: Yup.number()
            .min(0, 'Deposits Threshold should be at least 0')
            .max(10000, 'Deposits Threshold should not exceed 10000'),
        loginStreak: Yup.number()
            .required('Login Streak is required')
            .min(0, 'Login Streak should be at least 0')
            .max(1000, 'Login Streak should not exceed 1000'),
            commissionRate: Yup.number()
            // .required('Commission Rate is required')
            .min(0, 'Commission Rate should be at least 0')
            .max(100, 'Commission Rate should not exceed 100'),
        referralsCount: Yup.number()
            .min(0, 'Referrals Count should be at least 0')
            .max(10000, 'Referrals Count should not exceed 10000'),
        // sweepstakesEntries: Yup.number().required('Sweepstakes Entries is required'),
        // sweepstakesWins: Yup.number().required('Sweepstakes Wins is required'),
        timeBasedConsistency: Yup.number()
            .required('Time-Based Consistency is required')
            .min(1, 'Time Based Consistency should be at least 1')
            .max(1500, 'Time Based Consistency should not exceed 1500'),
        // gradualLoss: Yup.number().required('Gradual Loss is required'),
        // gradualLossPeriodUnit: Yup.string()
        //  .oneOf(['days', 'months'])
        //  .required('Period Unit is required'),
        // prioritySupport: Yup.boolean().required('Priority Support is required'),
        isActive: Yup.boolean().required('Active status is required'),
        // rewardCap: Yup.number().required('Reward cap is required'),
    });

const rewardsValidationSchema = () =>
    Yup.object({
        cashBonus: Yup.number()
            // .min(0, 'Cash Bonus be at least 0')
            .required('Cash Bonus is required')
            .min(0, 'Cash Bonus should be at least 0')
            .max(10000, 'Cash Bonus should not exceed 10000'),
        // freeSpin: Yup.number().required('Free Spins is required'),
        rackback: Yup.number().required('Rackback is required')
        .min(0, 'Rackback should be at least 0')
            .max(100, 'Rackback should not exceed 100'),
        // prioritySupport: Yup.boolean().required('Priority Support is required'),
        commissionRate: Yup.number().required('Commission Rate is required')
        .min(0, 'Commission Rate should be at least 0')
            .max(100, 'Commission Rate should not exceed 100'),

        // eventInvites: Yup.boolean().required('Event Invitations is required'),
        isActive: Yup.boolean().required('Active status is required'),
    });

export {
    staticFiltersFields,
    filterValues,
    getInitialValues,
    validationSchema,
    staticFormFields,
    getRewardsInitialValues,
    rewardsValidationSchema,
    staticRewardsFormFields,
};


