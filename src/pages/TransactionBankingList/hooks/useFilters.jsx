import { isEmpty, isEqual } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { debounceTime, itemsPerPage } from '../../../constants/config';
import {
	fetchCurrenciesStart,
	fetchTransactionBankingStart,
} from '../../../store/actions';
import { formatDateYMD } from '../../../utils/helpers';
import {
	filterValidationSchema,
	filterValues,
	staticFiltersFields,
} from '../formDetails';

let debounce;
const useFilters = () => {
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
				userId:values?.userId?.trim(),
				email:values?.email?.trim(),
				// paymentProvider: values?.paymentProvider,
				// status: values?.status,
				currencyCode: values?.currencyCode,
				purpose: values?.purpose,
				startDate: values?.startDate ? formatDateYMD(values?.startDate) : null,
				endDate: values?.endDate ? formatDateYMD(values?.endDate) : null,
			})
		);
	};

	const handleFilter = (values) => {
		fetchData(values);
	};

	const { validation, formFields,setFormFields } = useForm({
		initialValues: filterValues(),
		validationSchema: filterValidationSchema(),
		// onSubmitEntry: handleFilter,
		staticFormFields: staticFiltersFields(),
	});

	// const handleAdvance = () => {
	// 	toggleAdvance();
	// };

	const handleClear = () => {
		const initialValues = filterValues();
		validation.resetForm(initialValues);
	};
	// useEffect(() => {
	// 	if (isEmpty(currencies)) {
	// 		dispatch(
	// 			fetchCurrenciesStart({
	// 				// limit: itemsPerPage,
	// 				// pageNo: page,
	// 			})
	// 		);
	// 	} else {
	// 		const currencyField = currencies?.rows?.map((row) => ({
	// 			optionLabel: row.name,
	// 			value: row.code,
	// 		}));
	// 		setFormFields([
	// 			{
	// 				name: 'currencyCode',
	// 				fieldType: 'select',
	// 				label: '',
	// 				placeholder: 'Select a currency',
	// 				optionList: currencyField,
	// 			},
	// 			...staticFiltersFields(),
	// 		]);
	// 	}
	// }, [currencies]);

	useEffect(() => {
		if (!isFirst.current && !isEqual(validation.values, prevValues.current)) {
			setIsFilterChanged(true);
			debounce = setTimeout(() => {
				handleFilter(validation.values);
			}, debounceTime);
			prevValues.current = validation.values;
		}
		isFirst.current = false;
		if (isEqual(filterValues(), validation.values)) {
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

export default useFilters;
