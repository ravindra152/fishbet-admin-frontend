import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isEqual } from 'lodash';
import {
  filterValidationSchema,
  filterValues,
  staticFiltersFields,
} from '../formDetails';

import useForm from '../../../components/Common/Hooks/useFormModal';
import {
  fetchCasinoTransactionsStart
} from '../../../store/actions';
import { getTicketManagementListing } from '../../../network/getRequests';
import { debounceTime, itemsPerPage } from '../../../constants/config';
import { formatDateYMD } from '../../../utils/helpers';

const useFilters = () => {
  const dispatch = useDispatch();
  const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
  const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);

  const prevValues = useRef(null);
  const isFirst = useRef(true);
  const [isFilterChanged, setIsFilterChanged] = useState(false);
  const debounceRef = useRef(null);

  const fetchData = (values) => {
    dispatch(
      getTicketManagementListing({
        ...values,
        user: values?.username,
        limit: itemsPerPage,
        pageNo: 1,
        currencyCode: values?.currencyCode,
        email: values?.email,
        gameName: values?.gameName,
        transactionType: values?.transactionType,
        startDate: values?.startDate ? formatDateYMD(values?.startDate) : null,
        endDate: values?.endDate ? formatDateYMD(values?.endDate) : null,
      })
    );
  };

  const handleFilter = (values) => {
    fetchData(values);
  };

  const { validation, formFields } = useForm({
    initialValues: filterValues(),
    validationSchema: filterValidationSchema(),
    staticFormFields: staticFiltersFields(),
  });

  const handleClear = () => {
    const initialValues = filterValues();
    validation.resetForm(initialValues);
  };

  useEffect(() => {
    if (!isFirst.current && !isEqual(validation.values, prevValues.current)) {
      setIsFilterChanged(true);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        handleFilter(validation.values);
      }, debounceTime);

      prevValues.current = validation.values;
    }

    isFirst.current = false;

    if (isEqual(filterValues(), validation.values)) {
      setIsFilterChanged(false);
    }

    return () => clearTimeout(debounceRef.current);
  }, [validation.values]);

  const actionButtons = useMemo(() => [
    {
      type: 'button', 
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
