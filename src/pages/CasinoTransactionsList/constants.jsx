export const statusType = [
	{ value: 1, label: 'Success' },
	{ value: 3, label: 'failed' },
	{ value: 4, label: 'rollback' },
];

export const casinostatusType = {
	1: 'Success',
	3: 'failed',
	4: 'rollback',
};

export const transactionType = [
	// { label: 'All', value: 'all' },
	{ label: 'Bet', value: 'casino_bet' },
	{ label: 'Win', value: 'casino_win' },
	{ label: 'RollBack', value: 'game_rollback' },
	{ label: 'Refund', value: 'casino_refund' },
	{ label: 'Promo win', value: 'promo_win' },
	{ label: 'Jackpot Win', value: 'jackpot_win' },
	// { label: 'Pre RollBack', value: 'rollbackbeforebetwin' },
	// { label: 'Free Spin', value: 'freespins' },
	// { label: 'Deposit', value: 'deposit' },
	// { label: 'Withdraw', value: 'withdraw' },
	// { label: 'Add Money', value: 'addMoney' },
	// { label: 'Remove Money', value: 'removeMoney' },
	// { label: 'Bonus', value: 'bonus' },
	// { label: 'Bonus To Cash', value: 'bonusToCash' },
	// { label: 'Bonus Forfiet', value: 'bonusForfeit' },
	// { label: 'Bonus Expired', value: 'bonusExpired' },
	// { label: 'Bonus Zeroed Out', value: 'bonusZeroedOut' },
	// { label: 'Internal Deposit', value: 'depositInternal' },
	// { label: 'Internal Add Money', value: 'addMoneyInternal' },
	// { label: 'Internal Withdraw', value: 'withdrawInternal' },
	// { label: 'Internal Remove Money', value: 'removeMoneyInternal' },
	// { label: 'Commision', value: 'commision' },
];

export const casinoActionType = {
	casino_win: 'Win',
	casino_bet: 'Bet',
	casino_lose: 'Lose',
	game_rollback: 'Rollback',
};

export const COLOR_BY_CURRENCY = {
	RSC: 'info',
	PSC: 'warning',
	GC: 'success',
	BSC: 'danger',
};

export const TRANSACTION_PURPOSE = [
	// General transactions
	{ label: 'Purchase', value: 'purchase' },
	{ label: 'Redeem', value: 'redeem' },
	{ label: 'Redeem Refund', value: 'redeem_refund' },
	{ label: 'Cash bonus', value: 'bonus_cash' },
	{ label: 'Deposit bonus', value: 'bonus_deposit' },
	{ label: 'Referral bonus', value: 'bonus_referral' },
	{ label: 'Bonus to cash', value: 'bonus_to_cash' },
	{ label: 'Forfeit', value: 'bonus_forfeit' },
	{ label: 'Faucet awail', value: 'faucet_awail' },
	{ label: 'bonus win', value: 'bonus_win' },
	{ label: 'Spin Wheel Reward', value: 'wheel_reward' },
	{ label: 'Tip Received', value: 'receive_tip' },
	{ label: 'Tip Send', value: 'send_tip' },
	{ label: 'Claim chatrain', value: 'claim_chatrain' },
	{ label: 'Initiate chatrain', value: 'emit_chatrain' },
	{ label: 'Chatrain', value: 'Chatrain' },
	{ label: 'REDEEM_REFUND', value: 'redeem_refund' },
	{label : 'BONUS_CASH', value: 'bonus_cash'},
	{label : 'BONUS_DEPOSIT', value: 'bonus_deposit'},
	{label : 'BONUS_REFERRAL', value: 'bonus_referral'},
	{label : 'FAUCET_AWAIL', value: 'bonus_drop'},
	{label : 'WHEEL_REWARD', value: 'wheel_reward'},
	{label : 'EMIT', value: 'emit_chatrain'},
	{label : 'CLAIM', value: 'claim_chatrain'},
	{label : 'RECEIVE_TIP', value: 'receive_tip'},
	{label : 'TIP', value: 'tip'},

];
export const TRANSACTION_PURPOSE_KEY_VALUE = {
	wheel_reward: 'Spin wheel reward',
	purchase: 'Purchase',
	redeem: 'Redeem',
	redeem_refund: 'Redeem Refund',
	bonus_cash: 'Bonus Cash',
	bonus_deposit: 'Bonus Deposit',
	bonus_to_cash: 'Bonus to case',
	bonus_forfeit: 'Forfeit',
	faucet_awail: 'Faucet',
	bonus_win: 'Bonus win',
	receive_tip: 'Tip Received',
	send_tip: 'Tip Send',
	claim_chatrain: 'Claim chatrain',
	emit_chatrain: 'Initiate chatrain',
	chatrain: 'Chatrain',
};
