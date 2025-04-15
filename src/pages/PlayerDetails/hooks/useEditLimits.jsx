import { useState } from "react";
import { useSelector } from "react-redux";

const useEditLimits = ({ userDetails }) => {
  const [selectedCurrencyObj, setSelectedCurrencyObj] = useState({
    dailyWagerLimit: 'IDR',
    weeklyWagerLimit: 'IDR',
    monthlyWagerLimit: 'IDR',
    // dailyDepositLimit: 'IDR',
    // weeklyDepositLimit: 'IDR',
    // monthlyDepositLimit: 'IDR',
    // dailyLossLimit: 'IDR',
    // weeklyLossLimit: 'IDR',
    // monthlyLossLimit: 'IDR',
  })
	const {userLimits } = userDetails || {};

  const limitLabels = [
		{
      name: 'dailyWagerLimit',
			label: 'Daily Wager Limit',
			value: userLimits?.dailyBetLimit?.[selectedCurrencyObj?.dailyWagerLimit],
			minimum: 0,
      showCurrecnySelect: true,
		},
		{
      name: 'weeklyWagerLimit',
			label: 'Weekly Wager Limit',
			value: userLimits?.weeklyBetLimit?.[selectedCurrencyObj?.weeklyWagerLimit],
			minimum:  userLimits?.dailyBetLimit?.[selectedCurrencyObj?.dailyWagerLimit],
      showCurrecnySelect: true,
		},
		{
      name: 'monthlyWagerLimit',
			label: 'Monthly Wager Limit',
			value: userLimits?.monthlyBetLimit?.[selectedCurrencyObj?.monthlyWagerLimit],
			minimum:  userLimits?.weeklyBetLimit?.[selectedCurrencyObj?.weeklyWagerLimit],
      showCurrecnySelect: true,
		},
		// {
    //   name: 'dailyDepositLimit',
		// 	label: 'Daily Deposit Limit',
		// 	value: userLimits?.dailyDepositLimit?.[selectedCurrencyObj?.['dailyDepositLimit']],
		// 	minimum: 0,
    //   showCurrecnySelect: true,
		// },
		// {
    //   name: 'weeklyDepositLimit',
		// 	label: 'Weekly Deposit Limit',
		// 	value: userLimits?.weeklyDepositLimit?.[selectedCurrencyObj?.['weeklyDepositLimit']],
		// 	minimum: userLimits?.dailyDepositLimit,
    //   showCurrecnySelect: true,
		// },
		// {
    //   name: 'monthlyDepositLimit',
		// 	label: 'Monthly Deposit Limit',
		// 	value: userLimits?.monthlyDepositLimit?.[selectedCurrencyObj?.['monthlyDepositLimit']],
		// 	minimum: userLimits?.weeklyDepositLimit,
    //   showCurrecnySelect: true,
		// },
		// {
    //   name: 'dailyLossLimit',
		// 	label: 'Daily Loss Limit',
		// 	value: userLimits?.dailyLossLimit?.[selectedCurrencyObj?.['dailyLossLimit']],
		// 	minimum: 0,
    //   showCurrecnySelect: true,
		// },
		// {
    //   name: 'weeklyLossLimit',
		// 	label: 'Weekly Loss Limit',
		// 	value: userLimits?.weeklyLossLimit?.[selectedCurrencyObj?.['weeklyLossLimit']],
		// 	minimum: userLimits?.dailyLossLimit,
    //   showCurrecnySelect: true,
		// },
		// {
    //   name: 'monthlyLossLimit',
		// 	label: 'Monthly Loss Limit',
		// 	value: userLimits?.monthlyLossLimit?.[selectedCurrencyObj?.['monthlyLossLimit']],
		// 	minimum: userLimits?.weeklyLossLimit,
    //   showCurrecnySelect: true,
		// },
	];

  const currencyOptions = [
    {
      id: 1,
      name: 'IDR'
    },
    {
      id: 2,
      name: 'USD'
    }
  ];

	return {
		userLimits,
		limitLabels,
    currencyOptions,
    selectedCurrencyObj,
    setSelectedCurrencyObj,
	};
};

export default useEditLimits;
