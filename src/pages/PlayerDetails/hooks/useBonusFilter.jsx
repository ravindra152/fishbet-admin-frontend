import { useEffect, useMemo, useRef, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { isEqual } from 'lodash';
import { useParams } from 'react-router-dom';
import {
	bonusFilterValidationSchema,
	bonusFilterValues,
	bonusFiltersFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
// import { getBonusDetails } from '../../../store/actions';
import { debounceTime, itemsPerPage } from '../../../constants/config';
import { getUserBonusesDetails } from '../../../network/getRequests';

let debounce;
const useBonusFilter = () => {
	// const dispatch = useDispatch();
	const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
	const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);
	const { playerId } = useParams();
	const prevValues = useRef(null);
	const isFirst = useRef(true);
	const [isFilterChanged, setIsFilterChanged] = useState(false);
	const [userBonus, setUserBonus] = useState({});
	const [userBonusLoading, setUserBonusLoading] = useState(false);

	// const fetchData = (values) => {
	//   dispatch(
	//     getBonusDetails({
	//       limit: itemsPerPage,
	//       pageNo: 1,
	//       userId: playerId,
	//       ...values,
	//     })
	//   );
	// };

	const fetchData = async (values, currentPage) => {
		setUserBonusLoading(true);
		try {
			const response = await getUserBonusesDetails({
				limit: itemsPerPage,
				pageNo: currentPage,
				userId: playerId,
				...values,
			});
			setUserBonusLoading(false);
			setUserBonus(response?.data?.data?.userBonus);
		} catch (error) {
			setUserBonusLoading(false);
			setUserBonus({});
			console.log(error);
		}
	};

	const handleFilter = (values) => {
		fetchData(values, 1);
	};

	const { validation, formFields } = useForm({
		initialValues: bonusFilterValues(),
		validationSchema: bonusFilterValidationSchema(),
		// onSubmitEntry: handleFilter,
		staticFormFields: bonusFiltersFields(),
	});

	// const handleAdvance = () => {
	// 	toggleAdvance();
	// };

	const handleClear = () => {
		const initialValues = bonusFilterValues();
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
		if (isEqual(bonusFilterValues(), validation.values)) {
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
		userBonus,
		fetchData,
		userBonusLoading,
	};
};

export default useBonusFilter;
