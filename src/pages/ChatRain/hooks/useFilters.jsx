import React from 'react';
import { useDispatch } from 'react-redux';
import {
	filterValidationSchema,
	filterValues,
	staticFiltersFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { getChatrain } from '../../../store/actions';
import { itemsPerPage } from '../../../constants/config';
import SelectedFilters from '../../../components/Common/SelectedFilters';
import CustomFilters from '../../../components/Common/CustomFilters';

const keyMapping = {
	search: 'Search',
};

const useFilters = () => {
	const dispatch = useDispatch();

	const fetchData = (values) => {
		dispatch(
			getChatrain({
				perPage: itemsPerPage,
				page: 1,
				...values,
			})
		);
	};

	const handleFilter = (values) => {
		fetchData(values);
	};

	const filterFormatter = (key, value) => {
		const formattedKey = keyMapping[key] || key;
		return `${formattedKey}: ${value}`;
	};

	const { validation, formFields } = useForm({
		initialValues: filterValues(),
		validationSchema: filterValidationSchema(),
		staticFormFields: staticFiltersFields(),
	});

	const selectedFiltersComponent = (
		<SelectedFilters
			validation={validation}
			filterFormatter={filterFormatter}
		/>
	);

	const filterComponent = (
		<CustomFilters
			filterFields={formFields}
			validation={validation}
			handleFilter={handleFilter}
			searchInputPlaceHolder="Search by Name"
			hideCustomFilter
			searchInputName="search"
		/>
	);

	return {
		filterFields: formFields,
		selectedFiltersComponent,
		filterComponent,
		filterValidation: validation,
	};
};

export default useFilters;
