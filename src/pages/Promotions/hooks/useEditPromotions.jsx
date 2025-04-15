/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable radix */
import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getLanguagesStart,
	updatePromotionStart,
	updateSaCms,
} from '../../../store/actions';

import {
	getInitialValues,
	createPromotionNewSchema,
	staticFormFields,
} from '../formDetails';

import CreatePromotionTemplate from '../CreatePromotionTemplate';
import { showToastr } from '../../../utils/helpers';
import { LANGUAGE_DATA } from '../../../utils/constant';

const useEditPromotions = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { promotionId } = useParams();
	const dispatch = useDispatch();
	const { languageData } = useSelector((state) => state.CasinoManagementData);
	
	let { promotionByPage, submitPromotionLoading } = useSelector(
		(state) => state.Promotions
	);
	promotionByPage = promotionByPage || location?.state?.promotionData;
	
	const [showGallery, setShowGallery] = useState(false);
	const [customComponent, setCustomComponent] = useState();
	const [selectedTab, setSelectedTab] = useState('EN');
	const [title, setTitle] = useState(promotionByPage?.title || { EN: '' });
	const [description, setDescription] = useState(
		promotionByPage?.description || { EN: '' }
	);
	const [content, setContent] = useState(
		promotionByPage?.content || { EN: '' }
	);

	const formSubmitHandler = (values) => {
		if (
			title[selectedTab] === '' ||
			(!(
				validation?.values?.category?.toString() === '3'
			) &&
				(content[selectedTab] === '' || description[selectedTab] === ''))
		) {
			showToastr({
				message: 'Please fill all the required fields',
				type: 'error',
			});
		} else {
			for (const lang in title) {
				if (
					[undefined, ''].includes(content?.[lang]) &&
					[undefined, ''].includes(title?.[lang]) &&
					[undefined, ''].includes(description?.[lang])
				) {
					delete title[lang];
					delete content[lang];
					delete description[lang];
				}
			}
			
			dispatch(
				updatePromotionStart({
					data: {
						promotionId: promotionByPage?.id,
						redirectUrl: values?.url || "", 
						title,
						content,
						description,
						web: values?.image, 
						mobile: values?.mobileimage
					},
					navigate,
					callback: (success) => {
						if (success) {
							showToastr({
								message: 'Promotion updated successfully!',
								type: 'success',
							});
						} else {
							showToastr({
								message: 'Failed to update promotion. Please try again.',
								type: 'error',
							});
						}
					},
				})
			);
		}
	};

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const { header, validation, setHeader, formFields, setFormFields } = useForm({
		header: `Edit Promotion ${promotionByPage?.id}`,
		initialValues: getInitialValues(promotionByPage),
		validationSchema: createPromotionNewSchema,
		staticFormFields: staticFormFields(),
		onSubmitEntry: formSubmitHandler,
	});

	useEffect(() => {
		setCustomComponent(
			<CreatePromotionTemplate
				languageData={LANGUAGE_DATA}
				promotionByPage={promotionByPage}
				validation={validation}
				title={title}
				setTitle={(v) => setTitle(v)}
				content={content}
				setContent={(v) => setContent(v)}
				description={description}
				setDescription={(v) => setDescription(v)}
				showGallery={showGallery}
				setShowGallery={setShowGallery}
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
				hideDetails={
					validation?.values?.redirectUrlToggle &&
					validation?.values?.category?.toString() === '3'
				}
				isEdit
			/>
		);
	}, [
		languageData,
		title,
		content,
		description,
		showGallery,
		selectedTab,
		validation?.touched?.title,
		validation?.values?.category,
		validation?.values?.redirectUrlToggle,
		validation?.errors,
	]);

	useEffect(() => {
		if (validation?.values?.category?.toString() === '3') {
			setFormFields([
				...staticFormFields(),
				{
					name: 'redirectUrl',
					fieldType: 'textField',
					placeholder: 'Redirect Url',
					isDisabled: !validation?.values?.redirectUrlToggle,
				},
				{
					name: 'redirectUrlToggle',
					fieldType: 'toggle',
					label: 'Redirect Url (Third Party)',
					placeholder: 'Redirect Url',
					isDisabled: false,
				},
			]);
			if (validation?.values?.redirectUrlToggle)
				validation.setValues((prev) => ({ ...prev, slug: '' }));
			else validation.setValues((prev) => ({ ...prev, redirectUrl: '' }));
		} else {
			setFormFields([
				...staticFormFields(),
				{
				  name: 'url',
				  fieldType: 'textField',
				  label: 'Redirect URL',
				  placeholder: 'Enter URL',
				  isDisabled: false,
				  hideRequired: true,
				},
				{
					name: 'image',
					fieldType: 'file',
					label: 'Promotion Card Image (Desktop)',
					isDisabled: false,
					isRequired: true,
					showThumbnail: true,
					validate: (file) => {
						if (file && file.size > 2 * 1024 * 1024) {
							showToastr({
								message: 'File size must be less than 2MB',
								type: 'warning',
							});
							return 'File size must be less than 2MB';
						}
						return null;
					}
				},
				{
					name: 'mobileimage',
					fieldType: 'file',
					label: 'Promotion Card Image (Mobile)',
					isDisabled: false,
					showThumbnail: true,
					validate: (file) => {
						if (file && file.size > 2 * 1024 * 1024) {
							showToastr({
								message: 'File size must be less than 2MB',
								type: 'warning',
							});
							return 'File size must be less than 2MB';
						}
						return null;
					}
				}
			]);
		}
	}, [validation?.values?.category, validation?.values?.redirectUrlToggle]);

	const handleGalleryClick = (e) => {
		setShowGallery(true);
		showToastr({ message: 'Gallery opened', type: 'info' });
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
		submitPromotionLoading,
	};
};

export default useEditPromotions;
