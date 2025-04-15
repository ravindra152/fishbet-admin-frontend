/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable radix */
import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useForm from '../../../components/Common/Hooks/useFormModal';

import CreateChatRuleTemplate from '../CreateChatRuleTemplate';
import { showToastr } from '../../../utils/helpers';

const useEditChatRule = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [showGallery, setShowGallery] = useState(false);
	const [customComponent, setCustomComponent] = useState();

	const [selectedTab, setSelectedTab] = useState('EN');
	const [title, setTitle] = useState({ EN: '' });
	const [content, setContent] = useState({ EN: '' });


	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	useEffect(() => {
		if (languageData)
			setCustomComponent(
				<CreateChatRuleTemplate
					languageData={languageData}
					validation={validation}
					title={title}
					setTitle={(v) => setTitle(v)}
					content={content}
					setContent={(v) => setContent(v)}
					showGallery={showGallery}
					setShowGallery={setShowGallery}
					isEdit
					selectedTab={selectedTab}
					setSelectedTab={setSelectedTab}
				/>
			);
	}, [languageData,validation?.initialValues,showGallery]);

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
		onChangeRowsPerPage,
		showGallery,
		setShowGallery,
		handleGalleryClick,
	};
};

export default useEditChatRule;
