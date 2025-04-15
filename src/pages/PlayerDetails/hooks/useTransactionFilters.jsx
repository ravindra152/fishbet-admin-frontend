import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, isEqual } from 'lodash';
import { useParams } from 'react-router-dom';
import {
	transactionFilterValidationSchema,
	transactionFilterValues,
	transactionFiltersFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	fetchCurrenciesStart,
	fetchTransactionBankingStart,
} from '../../../store/actions';
import { debounceTime, itemsPerPage } from '../../../constants/config';
import { formatDateYMD } from '../../../utils/helpers';

let debounce;
const useTransactionFilters = (playerId) => {
	const dispatch = useDispatch();
	const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
	const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);
	const { currencies } = useSelector((state) => state.Currencies);
	const prevValues = useRef(null);
	const isFirst = useRef(true);
	const [isFilterChanged, setIsFilterChanged] = useState(false);

	const fetchData = (values) => {
		dispatch(
			fetchTransactionBankingStart({
				...values,
				limit: itemsPerPage,
				pageNo: 1,
				userId: playerId,
				currencyCode: values?.currencyCode,
				// paymentProvider: values?.paymentProvider,
				startDate: values?.startDate ? formatDateYMD(values?.startDate) : null,
				endDate: values?.endDate ? formatDateYMD(values?.endDate) : null,
				// status: values?.status,
				// transactionType: values?.transactionType,
				// transactionId: values?.transactionId,
			})
		);
	};

	const handleFilter = (values) => {
		fetchData(values);
	};

	const { validation, formFields, setFormFields } = useForm({
		initialValues: transactionFilterValues(),
		validationSchema: transactionFilterValidationSchema(),
		// onSubmitEntry: handleFilter,
		staticFormFields: transactionFiltersFields(),
	});

	// const handleAdvance = () => {
	// 	toggleAdvance();
	// };

	const handleClear = () => {
		const initialValues = transactionFilterValues();
		validation.resetForm(initialValues);
	};

	useEffect(() => {
		if (isEmpty(currencies)) {
			dispatch(
				fetchCurrenciesStart({
					// limit: itemsPerPage,
					// pageNo: page,
				})
			);
		} else {
			const currencyField = currencies?.rows?.map((row) => ({
				optionLabel: row?.name,
				value: row?.code,
			}));
			setFormFields([
				{
					name: 'currencyCode',
					fieldType: 'select',
					label: '',
					placeholder: 'Select a currency',
					optionList: currencyField,
				},
				...transactionFiltersFields(),
			]);
		}
	}, [currencies]);

	useEffect(() => {
		if (!isFirst.current && !isEqual(validation.values, prevValues.current)) {
			setIsFilterChanged(true);
			debounce = setTimeout(() => {
				handleFilter(validation.values);
			}, debounceTime);
			prevValues.current = validation.values;
		}
		isFirst.current = false;
		if (isEqual(transactionFilterValues(), validation.values)) {
			setIsFilterChanged(false);
		}
		return () => clearTimeout(debounce);
	}, [validation.values]);

	const actionButtons = useMemo(() => [
		{
			type: 'button', // if you pass type button handle the click event
			label: '',
			icon: 'mdi mdi-refresh',
			handleClick: handleClear,
			tooltip: 'Clear filter',
			id: 'clear',
		},
	]);

	return {
		toggleAdvance,
		isAdvanceOpen,
		filterFields: formFields,
		actionButtons,
		filterValidation: validation,
		isFilterChanged,
	};
};

export default useTransactionFilters;
