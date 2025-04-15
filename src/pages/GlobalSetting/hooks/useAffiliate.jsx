/* eslint-disable no-use-before-define */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	affiliateCommisionFormFields,
	affiliateCommisionSchema,
	getDefaultAffiliateCommisionValues,
} from '../formDetails';
import {
	getAffiliateCommisionStart,
	updateAffiliateCommisionStart,
} from '../../../store/globalSetting/actions';

const useAffiliate = () => {
	const dispatch = useDispatch();
	const {
		affiliateCommisionPer,
		updateAffiliateComPercLoading,
		affiliateCommisionPerLoading,
	} = useSelector((state) => state.GlobalSetting);

	const handleFormSubmit = (data) => {
		dispatch(updateAffiliateCommisionStart(data));
	};

	const { validation, formFields } = useForm({
		initialValues: getDefaultAffiliateCommisionValues({
			affiliatePercentage: affiliateCommisionPer,
		}),
		validationSchema: affiliateCommisionSchema(),
		onSubmitEntry: handleFormSubmit,
		staticFormFields: affiliateCommisionFormFields,
	});

	useEffect(() => {
		dispatch(getAffiliateCommisionStart());
	}, []);

	return {
		formFields,
		validation,
		updateAffiliateComPercLoading,
		affiliateCommisionPerLoading,
	};
};

export default useAffiliate;
