/* eslint-disable */
import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getLanguagesStart,
	getEmailTypes,
	getDynamicKeys,
	getEmailTemplate,
	updateEmailTemplate,
} from '../../../store/actions';

import {
	getInitialValues,
	staticFormFields,
	emailTemplateSchema,
} from '../formDetails';

import useEmailTemplate from './useEmailTemplate';
import { showToastr } from '../../../utils/helpers';
import CreateTemplate from '../CreateTemplate';
import { LANGUAGE_DATA } from '../../../utils/constant';

const useEditEmailTemplate = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { emailTemplateId } = useParams();
	const [customComponent, setCustomComponent] = useState();

	const [template, setTemplate] = useState('');
	const [selectedTab, setSelectedTab] = useState('EN');
	const [showGallery, setShowGallery] = useState(false);
	const isEdit = true;
	const { emailTemplateOrder } = useEmailTemplate();

	const { languageData } = useSelector((state) => state.CasinoManagementData);
	const { emailTypes, dynamicKeys, emailTemplate } = useSelector(
		(state) => state.EmailTemplate
	);

	useEffect(() => {
		if (emailTemplateId) {
			dispatch(getEmailTemplate(emailTemplateId));
		}
	}, [emailTemplateId]);

	const getTemplateKeys = (template) => {
		const mainKeys = [];
		const keys = template.match(/{{{ *[A-Za-z0-9]* *}}}/g);

		if (keys) {
			keys.forEach((key) => {
				mainKeys.push(key.replaceAll('{', '').replaceAll('}', '').trim());
			});
			return [...new Set(mainKeys)];
		} else {
			return [];
		}
	};

	const formSubmitHandler = (values) => {
		if (template) {
			const allKeys = dynamicKeys?.dynamicKeys;
			// const requiredKeys = dynamicKeys
			// .filter((item) => item.required === true)
			// .map((item) => item.key);


			const templateKeys = getTemplateKeys(template);
			if (templateKeys?.length) {
				if (allKeys.some((r) => templateKeys.includes(r))) {
					// if (requiredKeys.every((v) => templateKeys.includes(v))) {
					dispatch(
						updateEmailTemplate({
							data: {
								...values,
								emailTemplateId,
								id: emailTemplateId,
								type: parseInt(values?.type),
								templateCode: { EN: template },
								language: selectedTab,
								dynamicData: templateKeys,
							},
							navigate,
						})
					);
					// } else {
					// 	showToastr({
					// 		message: 'Please Use All Required Dynamic Keys',
					// 		type: 'error',
					// 	});
					}
				} else {
				dispatch(
					updateEmailTemplate({
						data: {
							...values,
							type: parseInt(values?.type),
							emailTemplateId,
							templateCode: template,
							language: selectedTab,
							dynamicData: templateKeys,
						},
						navigate,
					})
				);
			}
		} else {
			showToastr({
				message: 'Content Required',
				type: 'error',
			});
		}
	};

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	useEffect(() => {
		// dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
		dispatch(getEmailTypes());
	}, []);

	const { validation, formFields, setFormFields } = useForm({
		initialValues: getInitialValues(emailTemplate),
		validationSchema: emailTemplateSchema,
		staticFormFields: staticFormFields(emailTemplateOrder, isEdit),
		onSubmitEntry: formSubmitHandler,
	});

	useEffect(() => {
		if (emailTemplate && Object.keys(emailTemplate).length) {
			emailTypes &&
				dispatch(getDynamicKeys({ type: emailTemplate.type, emailTypes }));
			setTemplate(emailTemplate.templateCode);
		}
	}, [emailTemplate, emailTypes]);

	useEffect(() => {
		setCustomComponent(
			<CreateTemplate
				languageData={LANGUAGE_DATA}
				dynamicKeys={dynamicKeys}
				emailTemplate={emailTemplate}
				setTemp={setTemplate}
				validation={validation}
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
				showGallery={showGallery}
				setShowGallery={setShowGallery}
				isEdit={isEdit}
			/>
		);
	}, [
		languageData,
		dynamicKeys,
		template,
		selectedTab,
		showGallery,
		emailTemplate,
	]);

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
		validation,
		galleryList,
		formFields,
		setFormFields,
		customComponent,
		setCustomComponent,
		onChangeRowsPerPage,
		showGallery,
		setShowGallery,
		handleGalleryClick,
		emailTemplateId,
	};
};

export default useEditEmailTemplate;
