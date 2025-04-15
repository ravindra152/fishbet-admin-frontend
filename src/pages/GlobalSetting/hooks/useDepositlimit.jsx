/* eslint-disable no-use-before-define */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../../components/Common/Hooks/useFormModal';

import {
	depositFormFields,
	depositValidationSchema,
	minMaxDepositFormFields,
} from '../formDetails';
import {
	getCurrencyLimitStart,
	updateDepositlimitStart,
} from '../../../store/globalSetting/actions';
import {
	DEFAULT_DEPOSIT_MAX_LIMIT,
	DEFAULT_DEPOSIT_MIN_LIMIT,
	MIN_MAX_CURRENCIES,
} from '../constants';

const useDepositlimit = () => {
	const dispatch = useDispatch();
	const [currenciesData, setCurrenciesData] = useState(null);
	const { currencyLimit, isCurrencyLimitLoading, depositLimitLoading } =
		useSelector((state) => state.GlobalSetting);

	const handleFormSubmit = (data) => {
		if (MIN_MAX_CURRENCIES.includes(data?.depositCurrencyCode)) {
			dispatch(
				updateDepositlimitStart({
					...currenciesData,
					[data?.depositCurrencyCode]: {
						min: data?.minDepositAmount,
						max: data?.maxDepositAmount,
					},
				})
			);
		} else {
			dispatch(
				updateDepositlimitStart({
					...currenciesData,
					[data?.depositCurrencyCode]: data?.depositAmount,
				})
			);
		}
	};

	const { validation, formFields, setFormFields } = useForm({
		initialValues: {
			depositAmount: '',
			minDepositAmount: '',
			maxDepositAmount: '',
			depositCurrencyCode: currenciesData ? Object.keys(currenciesData)[0] : '',
		},
		validationSchema: depositValidationSchema({
			maxDeposit: currenciesData
				? currenciesData?.IDR?.max
				: DEFAULT_DEPOSIT_MAX_LIMIT, // Temp IDR, can be managed via state for multi currency min-max limits
			minDeposit: currenciesData
				? currenciesData?.IDR?.min
				: DEFAULT_DEPOSIT_MIN_LIMIT,
		}),
		onSubmitEntry: handleFormSubmit,
		staticFormFields: depositFormFields,
	});

	const handleCurrencyChange = (currencyField, currenciesDataUpdated) => {
		if (MIN_MAX_CURRENCIES.includes(validation.values?.depositCurrencyCode)) {
			setFormFields([...currencyField, ...minMaxDepositFormFields]);

			validation.setValues({
				maxDepositAmount:
					currenciesDataUpdated?.[
						validation.values?.depositCurrencyCode?.toString()
					]?.max,
				minDepositAmount:
					currenciesDataUpdated?.[
						validation.values?.depositCurrencyCode?.toString()
					]?.min,
				depositCurrencyCode: validation.values.depositCurrencyCode,
				depositAmount: 1, // Random value to surpass validation chck, not included in payload
			});
		} else {
			setFormFields([...currencyField, ...depositFormFields]);

			validation.setValues({
				depositAmount:
					currenciesDataUpdated?.[
						validation.values?.depositCurrencyCode?.toString()
					],
				depositCurrencyCode: validation.values.depositCurrencyCode,
				maxDepositAmount: currenciesData?.IDR?.max, // Random value to surpass validation chck, not included in payload
				minDepositAmount: currenciesData?.IDR?.min, // Random value to surpass validation chck, not included in payload
			});
		}
	};

	useEffect(() => {
		dispatch(getCurrencyLimitStart());
	}, []);

	useEffect(() => {
		const depositLimit = currencyLimit
			? currencyLimit?.filter((item) => item?.key === 'DEPOSIT_LIMIT')?.[0]
					?.value
			: [];

		const currenciesOptions =
			currencyLimit &&
			Object.keys(depositLimit).map((key) => ({
				id: key,
				value: key,
				optionLabel: key,
			}));

		setCurrenciesData(depositLimit);

		const currencyField = {
			name: 'depositCurrencyCode',
			fieldType: 'select',
			label: 'Select Currency',
			placeholder: 'Select Currency',
			optionList: currenciesOptions,
		};

		if (currenciesOptions?.length > 0) {
			handleCurrencyChange([currencyField], depositLimit);
		}
	}, [currencyLimit]);

	useEffect(() => {
		const currencyField = formFields?.filter(
			(field) => field.name === 'depositCurrencyCode'
		);
		handleCurrencyChange(currencyField, currenciesData);
	}, [validation.values?.depositCurrencyCode]);

	return {
		formFields,
		validation,
		isCurrencyLimitLoading,
		depositLimitLoading,
	};
};

export default useDepositlimit;
