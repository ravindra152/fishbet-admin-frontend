import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	getInitialValues,
	packageFormSchema,
	staticFormFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { createPackage } from '../../../store/actions';

const useCreate = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { createPackageLoading } = useSelector((state) => state.Packages);

	const handleSubmit = (values) => {
		dispatch(createPackage({
			values: {
				...values,

				"validTill": values?.endDate || '',
				"validFrom": values?.startDate || '',
				discountEndDate:values?.discountEndDate?.[0]
			}, navigate
		}));
	};

	const { validation, formFields } = useForm({
		header: 'Add Package',
    initialValues: getInitialValues({}), 
		validationSchema: packageFormSchema(),
		onSubmitEntry: handleSubmit,
		staticFormFields: staticFormFields(),
	});

	return {
		validation,
		formFields,
		navigate,
		createPackageLoading,
	};
};

export default useCreate;
