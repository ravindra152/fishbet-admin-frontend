/* eslint-disable no-use-before-define */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	ReferralCommisionFormFields,
	ReferralCommisionSchema,
	getDefaultReferralCommisionValues,
} from '../formDetails';
import {
	getReferralCommisionStart,
	updateReferralCommisionStart,
} from '../../../store/globalSetting/actions';

const useReferral = () => {
	const dispatch = useDispatch();
	const {
		referralCommisionAom,
		updateReferralCommisionAomLoading,
		referralCommisionAomLoading,
	} = useSelector((state) => state.GlobalSetting);

	const handleFormSubmit = (data) => {
		dispatch(updateReferralCommisionStart({ ...data, currency: referralCommisionAom?.currencyCode }));
	};

	const { validation, formFields, setFormFields } = useForm({
		initialValues: getDefaultReferralCommisionValues({
			referralAmount: referralCommisionAom?.amount,
		}),
		validationSchema: ReferralCommisionSchema(),
		onSubmitEntry: handleFormSubmit,
		staticFormFields: ReferralCommisionFormFields(referralCommisionAom),
	});

	useEffect(() => {
		dispatch(getReferralCommisionStart());
	}, []);

  useEffect(() => {
		setFormFields(ReferralCommisionFormFields(referralCommisionAom));
	}, [referralCommisionAom?.currencyCode]);

	return {
		formFields,
		validation,
		updateReferralCommisionAomLoading,
		referralCommisionAomLoading,
	};
};

export default useReferral;
