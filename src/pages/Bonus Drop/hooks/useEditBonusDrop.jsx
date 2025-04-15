/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable radix */
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import useForm from '../../../components/Common/Hooks/useFormModal';

import {
	createBonusDropNewSchema,
	getInitialValues,
	staticFormFields,
} from '../formDetails';

import { updateBonusDropData } from '../../../network/putRequests';
import { showToastr } from '../../../utils/helpers';

const useEditBonusDrop = () => {
	const navigate = useNavigate();
	const { bonusDropId } = useParams();
	const dispatch = useDispatch();
	const [showGallery, setShowGallery] = useState(false);
	const [customComponent, setCustomComponent] = useState();

	const { bonusDropDetails } = useSelector((state) => state.BonusDrop);
	const { languageData } = useSelector((state) => state.CasinoManagementData);
	const { cmsDynamicKeys, cmsByPageId } = useSelector((state) => state.AllCms);
	const bonusDropDataById =
		bonusDropDetails?.find((item) => item.id === parseInt(bonusDropId)) || [];
	const formSubmitHandler = async (values) => {
		if (values) {
			try {
				await updateBonusDropData({
					...values,
					bonusId: parseInt(bonusDropId),
				});
				showToastr({
					message: 'Bonus Drop Update Successfully',
					type: 'success',
				});
				navigate('/bonus-drop');
			} catch (e) {
				showToastr({
					message: e?.response?.data?.errors?.error || e.message,
					type: 'error',
				});
			}
		} else {
			showToastr({
				message: 'All Fields Required',
				type: 'error',
			});
		}
	};

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	// useEffect(() => {
	// 	dispatch(getCmsByPageId({ bonusDropId }));
	// }, []);

	// useEffect(() => {
	// 	dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
	// 	dispatch(getCmsDynamicKeys());
	// }, []);

	const { header, validation, setHeader, formFields, setFormFields } = useForm({
		header: `Edit Bonus Drop ${bonusDropId}`,
		initialValues: getInitialValues(bonusDropDataById),
		validationSchema: createBonusDropNewSchema,
		staticFormFields: staticFormFields(true),
		onSubmitEntry: formSubmitHandler,
	});

	
	const handleGalleryClick = (e) => {
		setShowGallery(true);
	};

	const galleryList = useMemo(() => [
		{
			label: 'Image Gallery',
			handleClick: handleGalleryClick,
			link: '#!',
		},
	]);

	return {
		header,
		validation,
		setHeader,
		galleryList,
		formFields,
		setFormFields,
		languageData,
		customComponent,
		setCustomComponent,
		cmsDynamicKeys,
		onChangeRowsPerPage,
		showGallery,
		setShowGallery,
		handleGalleryClick,
	};
};

export default useEditBonusDrop;
