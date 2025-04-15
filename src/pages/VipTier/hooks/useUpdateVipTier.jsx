import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { updateVipTier } from '../../../store/actions';
import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';

const useUpdate = () => {
	const dispatch = useDispatch();
	const { vipTierId , rewardId, icon} = useParams();
	const navigate = useNavigate();

	// const { updateVipTierLoading, vipTierInfo, isVipTierInfoLoading } =
	// 	useSelector((state) => state.VipTier);

	const { updateVipTierLoading } = useSelector((state) => state.VipTier);

	const handleSubmit = (values) => {
		dispatch(
			updateVipTier({
				values: {
					...values,
					vipTierId,
					rewardId,
					icon,

				},
				navigate,
			})
		);
	};

	const { setHeader, validation, formFields } = useForm({
		header: 'Update Vip Tier',
		initialValues: getInitialValues(),
		validationSchema,
		onSubmitEntry: handleSubmit,
		staticFormFields,
	});

	const handleEdit = (e, row) => {
		e.preventDefault();
		navigate(`edit/${row?.vipTierId}`, { state: { row } });
	};

	const handleView = (e, row) => {
		e.preventDefault();
		navigate(`view/${row?.vipTierId}`, { state: { row } });
	};

	return {
		validation,
		formFields,
		navigate,
		// isVipTierInfoLoading,
		updateVipTierLoading,
		handleEdit,
		handleView,
	};
};

export default useUpdate;