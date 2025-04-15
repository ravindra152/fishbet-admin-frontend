import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { isEqual } from 'lodash';
import {
    filterValidationSchema,
    filterValues,
    staticFiltersFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { fetchPlayersStart } from '../../../store/actions';
import { debounceTime, itemsPerPage } from '../../../constants/config';

// Function to ensure correct date format without shifting the day
const formatDateYMD = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

let debounce;
const useFilters = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
    const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);
    const prevValues = useRef(null);
    const isFirst = useRef(true);
    const [isFilterChanged, setIsFilterChanged] = useState(false);
    const { countries } = useSelector((state) => state.Countries);

    const fetchData = ({
        endDate,
        startDate,
        search,
        affiliateName,
        userId,
        phoneNumber,
        orderBy,
        sort,
        loggedIn,
        countryCode,
        isActive,
        level,
    }) => {
        dispatch(
            fetchPlayersStart({
                limit: itemsPerPage,
                pageNo: 1,
                startDate: formatDateYMD(startDate),
                endDate: formatDateYMD(endDate),
                search,
                affiliateName,
                userId,
                phoneNumber,
                orderBy,
                sort,
                loggedIn,
                countryCode,
                isActive,
                level,
            })
        );
    };

    const handleFilter = (values) => {
        fetchData(values);
    };

    const { validation, formFields, setFormFields } = useForm({
        initialValues: filterValues(location?.state?.countryCode),
        validationSchema: filterValidationSchema(),
        staticFormFields: staticFiltersFields,
    });

    useEffect(() => {
        // const CountriesList = () => {
		// 	const arrayToReturn = [];
		// 	if (countries?.length) {
		// 		countries?.map((country) =>
		// 			arrayToReturn.push({
		// 				optionLabel: country.name,
		// 				value: country.code,
		// 			})
		// 		);
		// 	} else if (countries?.rows?.length) {
		// 		countries.rows.map((country) =>
		// 			arrayToReturn.push({
		// 				optionLabel: country.name,
		// 				value: country.code,
		// 			})
		// 		);
		// 	}
		// 	return arrayToReturn;
		// };
        setFormFields([...staticFiltersFields,
            // {
			// 	name: 'countryCode',
			// 	fieldType: 'select',
			// 	placeholder: 'Country',
			// 	optionList: CountriesList(),
			// },
        ]);
    }, [countries]);

    const handleClear = () => {
        const initialValues = filterValues();
        validation.resetForm(initialValues);
    };

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

    const actionButtons = useMemo(
        () => [
            {
                type: 'button',
                label: '',
                icon: 'mdi mdi-refresh',
                handleClick: handleClear,
                tooltip: 'Clear filter',
                id: 'clear',
            },
            // {
		// 	type: 'button',
		// 	label: 'Advance',
		// 	icon: 'bx bx-add-to-queue',
		// 	handleClick: handleAdvance,
		// 	color: 'btn-secondary',
		// },
        ],
        []
    );

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
