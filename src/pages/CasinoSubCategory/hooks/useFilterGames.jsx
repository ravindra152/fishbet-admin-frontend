import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isEqual } from 'lodash';
import { useParams } from 'react-router-dom';
import {
	staticFilterGamesFields,
	filterGamesValues,
	filterGamesValidationSchema,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { getCasinoGamesStart } from '../../../store/actions';
import { debounceTime, itemsPerPage } from '../../../constants/config';

let debounce;
const useFilters = () => {
	const dispatch = useDispatch();
		const { gameSubCategoryId } = useParams();
	const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
	const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);
	const prevValues = useRef(null);
	const isFirst = useRef(true);
	const [isFilterChanged, setIsFilterChanged] = useState(false);

	const fetchData = (values) => {
		dispatch(
			getCasinoGamesStart({
				limit: itemsPerPage,
				pageNo: 1,
				include: false,
				casinoCategoryId: gameSubCategoryId,
				...values,
			})
		);
	};
	const handleFilter = (values) => {
		fetchData(values);
	};

	const { validation, formFields } = useForm({
		initialValues: filterGamesValues(),
		validationSchema: filterGamesValidationSchema(),
		// onSubmitEntry: handleFilter,
		staticFormFields: staticFilterGamesFields(),
	});

	useEffect(() => {
		if (!isFirst.current && !isEqual(validation.values, prevValues.current)) {
			setIsFilterChanged(true);
			debounce = setTimeout(() => {
				handleFilter(validation.values);
			}, debounceTime);
			prevValues.current = validation.values;
		}
		isFirst.current = false;
		if (isEqual(filterGamesValues(), validation.values)) {
			setIsFilterChanged(false);
		}
		return () => clearTimeout(debounce);
	}, [validation.values]);

	return {
		toggleAdvance,
		isAdvanceOpen,
		filterFields: formFields,
		filterValidation: validation,
		isFilterChanged,
	};
};

export default useFilters;
