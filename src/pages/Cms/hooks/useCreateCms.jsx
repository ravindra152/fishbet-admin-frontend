/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getLanguagesStart,
	getCmsDynamicKeys,
	createSaCms,
} from '../../../store/actions';

import {
	getInitialValues,
	createBonusDropNewSchema,
	staticFormFields,
} from '../formDetails';
import CreateCMSTemplate from '../CreateCMSTemplate';

import { showToastr } from '../../../utils/helpers';
import { modules } from '../../../constants/permissions';
import { LANGUAGE_DATA } from '../../../utils/constant';

const useCreateCms = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [customComponent, setCustomComponent] = useState();
	const [showGallery, setShowGallery] = useState(false);

	const { languageData } = useSelector((state) => state.CasinoManagementData);
	const { cmsDynamicKeys } = useSelector((state) => state.AllCms);
	const [selectedTab, setSelectedTab] = useState('');
	const [title, setTitle] = useState();
	const [content, setContent] = useState();

	const formSubmitHandler = (values) => {
		if (title[selectedTab] === '' || values.content === '') {
			showToastr({
				message: 'Please fill all the required fields',
				type: 'error',
			});
		} else {
			// for (const lang in title) {
			// 	if (
			// 		[undefined, ''].includes(content?.[lang]) &&
			// 		[undefined, ''].includes(title?.[lang])
			// 	) {
			// 		delete title[lang];
			// 		delete content[lang];
			// 	}
			// }
			dispatch(
				createSaCms({ cmsData: { ...values, title, content:{EN : values?.content || ''} }, navigate })
			);
		}
	};

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	useEffect(() => {
		// dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
		dispatch(getCmsDynamicKeys());
	}, []);

	const { header, validation, setHeader, formFields, setFormFields } = useForm({
		header: 'Create CMS',
		initialValues: getInitialValues(),
		validationSchema: createBonusDropNewSchema,
		staticFormFields: staticFormFields(),
		onSubmitEntry: formSubmitHandler,
	});

	useEffect(() => {
		// if (languageData)
			setCustomComponent(
				<CreateCMSTemplate
					languageData={LANGUAGE_DATA}
					validation={validation}
					cmsKeys={cmsDynamicKeys}
					title={title}
					setTitle={(v) => setTitle(v)}
					content={content}
					setContent={(v) => setContent(v)}
					showGallery={showGallery}
					setShowGallery={setShowGallery}
					selectedTab={selectedTab}
					setSelectedTab={setSelectedTab}
				/>
			);
	}, [title, content, showGallery, selectedTab]);

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

export default useCreateCms;
