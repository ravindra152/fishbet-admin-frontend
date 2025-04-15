/* eslint-disable no-use-before-define */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useForm from '../../../components/Common/Hooks/useFormModal';

import {
	getCurrencyLimitStart,
	updateWithdrawlimitStart,
} from '../../../store/globalSetting/actions';
import {
	withdrawValidationSchema,
	withdrawalFormFields,
	minMaxWithdrawFormFields,
} from '../formDetails';
import {
	DEFAULT_WIRHDRAW_MAX_LIMIT,
	DEFAULT_WIRHDRAW_MIN_LIMIT,
	MIN_MAX_CURRENCIES,
} from '../constants';

const useWithdrawalLimit = () => {
	const dispatch = useDispatch();
	const [currenciesData, setCurrenciesData] = useState(null);
	const { currencyLimit, withdrawLimitLoading } = useSelector(
		(state) => state.GlobalSetting
	);

	const handleFormSubmit = (data) => {
		if (MIN_MAX_CURRENCIES.includes(data?.withdrawCurrencyCode)) {
			dispatch(
				updateWithdrawlimitStart({
					...currenciesData,
					[data?.withdrawCurrencyCode]: {
						min: data?.minWithdrawAmount,
						max: data?.maxWithdrawAmount,
					},
				})
			);
		} else {
			dispatch(
				updateWithdrawlimitStart({
					...currenciesData,
					[data?.withdrawCurrencyCode]: data?.withdrawAmount,
				})
			);
		}
	};

	const { validation, formFields, setFormFields } = useForm({
		initialValues: {
			withdrawAmount: '',
			minWithdrawAmount: '',
			maxWithdrawAmount: '',
			withdrawCurrencyCode: currenciesData
				? Object.keys(currenciesData)[0]
				: '',
		},
		validationSchema: withdrawValidationSchema({
			maxWithdraw: currenciesData
				? currenciesData?.IDR?.max
				: DEFAULT_WIRHDRAW_MAX_LIMIT,
			minWithdraw: currenciesData
				? currenciesData?.IDR?.min
				: DEFAULT_WIRHDRAW_MIN_LIMIT,
		}),
		onSubmitEntry: handleFormSubmit,
		staticFormFields: withdrawalFormFields,
	});

	const handleCurrencyChange = (currencyField, currenciesDataUpdated) => {
		if (MIN_MAX_CURRENCIES.includes(validation.values?.withdrawCurrencyCode)) {
			setFormFields([...currencyField, ...minMaxWithdrawFormFields]);
			validation.setValues({
				withdrawAmount: 1, // Random value to surpass validation chck, not included in payload
				withdrawCurrencyCode: validation.values.withdrawCurrencyCode,
				minWithdrawAmount:
					currenciesDataUpdated?.[
						validation.values?.withdrawCurrencyCode?.toString()
					]?.min,
				maxWithdrawAmount:
					currenciesDataUpdated?.[
						validation.values?.withdrawCurrencyCode?.toString()
					]?.max,
			});
		} else {
			setFormFields([...currencyField, ...withdrawalFormFields]);
			validation.setValues({
				withdrawAmount:
					currenciesData?.[validation.values?.withdrawCurrencyCode?.toString()],
				withdrawCurrencyCode: validation.values.withdrawCurrencyCode,
				minWithdrawAmount: currenciesData?.IDR?.min, // Random value to surpass validation chck, not included in payload
				maxWithdrawAmount: currenciesData?.IDR?.max, // Random value to surpass validation chck, not included in payload
			});
		}
	};

	useEffect(() => {
		dispatch(getCurrencyLimitStart());
	}, []);

	useEffect(() => {
		const withdrawLimit = currencyLimit
			? currencyLimit?.filter((item) => item?.key === 'WITHDRAW_LIMIT')?.[0]
					?.value
			: [];

		const currenciesOptions =
			currencyLimit &&
			Object.keys(withdrawLimit).map((key) => ({
				id: key,
				value: key,
				optionLabel: key,
			}));

		setCurrenciesData(withdrawLimit);

		const currencyField = {
			name: 'withdrawCurrencyCode',
			fieldType: 'select',
			label: 'Select Currency',
			placeholder: 'Select Currency',
			optionList: currenciesOptions,
		};

		if (currenciesOptions?.length > 0)
			handleCurrencyChange([currencyField], withdrawLimit);
	}, [currencyLimit]);

	useEffect(() => {
		const currencyField = formFields?.filter(
			(field) => field.name === 'withdrawCurrencyCode'
		);
		handleCurrencyChange(currencyField, currenciesData);
	}, [validation.values?.withdrawCurrencyCode]);

	return {
		formFields,
		validation,
		withdrawLimitLoading,
	};
};

export default useWithdrawalLimit;
