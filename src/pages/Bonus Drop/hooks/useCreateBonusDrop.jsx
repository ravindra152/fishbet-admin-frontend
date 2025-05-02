/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	createBonusDrop,
	getCmsDynamicKeys,
	getLanguagesStart
} from '../../../store/actions';

import {
	createBonusDropNewSchema,
	getInitialValues,
	staticFormFields,
} from '../formDetails';

import { modules } from '../../../constants/permissions';

const useCreateBonusDrop = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [customComponent, setCustomComponent] = useState();
	const [showGallery, setShowGallery] = useState(false);

	const { languageData } = useSelector((state) => state.CasinoManagementData);
	const { cmsDynamicKeys } = useSelector((state) => state.AllCms);
	const [selectedTab, setSelectedTab] = useState('EN');
	const [title, setTitle] = useState({ EN: '' });
	const [content, setContent] = useState({ EN: '' });

	// const formSubmitHandler = (values) => {
	// 	dispatch(
	// 		createBonusDrop({
	// 			bonusDropData: { ...values },
	// 			navigate,
	// 		})
	// 	);
		// }

	// };

	const formSubmitHandler = (values) => {
		const payload = {
			name: values.name,
			code: values.code,
			coin: values.coin,
			coinType: values.coinType || 'GC' || 'BSC', // Ensure only GC or BSC
			expiryTime: values.expiryTime,
			totalClaimsAllowed: values.totalClaimsAllowed,
			isActive: values.isActive,
		};
		
		dispatch(
			createBonusDrop({
				bonusDropData: payload,
				navigate,
			})
		);
	};
	

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	useEffect(() => {
		// dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
		dispatch(getCmsDynamicKeys());
	}, []);

	const { header, validation, setHeader, formFields, setFormFields } = useForm({
		header: 'Create Bonus Drop',
		initialValues: getInitialValues(),
		validationSchema: createBonusDropNewSchema,
		staticFormFields: staticFormFields(),
		onSubmitEntry: formSubmitHandler,
	});

	const handleCreateClick = (e) => {
		e.preventDefault();
		navigate('create');
	};

	const handleGalleryClick = (e) => {
		setShowGallery(true);
	};

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleCreateClick,
			link: '#!',
			module: modules.ContentManagement,
			operation: 'C',
		},
	]);

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
		buttonList,
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

export default useCreateBonusDrop;
