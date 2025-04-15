/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getLanguagesStart,
	getCmsDynamicKeys,
	getCmsByPageId,
} from '../../../store/actions';

import {
	getInitialValues,
	createBonusDropNewSchema,
	staticFormFields,
} from '../formDetails';

import CreateCMSTemplate from '../CreateCMSTemplate';
import { LANGUAGE_DATA } from '../../../utils/constant';

const useCmsDetail = () => {
	const { cmsPageId } = useParams();
	const dispatch = useDispatch();
	const [customComponent, setCustomComponent] = useState();
	const [selectedTab, setSelectedTab] = useState('EN');
	const [isView, setIsView] = useState(true);

	const { languageData } = useSelector((state) => state.CasinoManagementData);
	const { cmsDynamicKeys, cmsByPageId } = useSelector((state) => state.AllCms);
	const [title, setTitle] = useState({ EN: '' });
	const [content, setContent] = useState({ EN: '' });

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	useEffect(() => {
		dispatch(getCmsByPageId({ cmsPageId }));
	}, []);

	useEffect(() => {
		// dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
		dispatch(getCmsDynamicKeys());
	}, []);

	const { header, validation, setHeader, formFields, setFormFields } = useForm({
		header: `View CMS ${cmsPageId}`,
		initialValues: getInitialValues(cmsByPageId),
		validationSchema: createBonusDropNewSchema,
		staticFormFields: staticFormFields(isView),
	});

	useEffect(() => {
		if(cmsByPageId && validation?.initialValues)
		setCustomComponent(
			<CreateCMSTemplate
				languageData={LANGUAGE_DATA}
				cmsByPageId={cmsByPageId}
				validation={validation}
				cmsKeys={cmsDynamicKeys}
				title={title}
				setTitle={(v) => setTitle(v)}
				content={content}
				setContent={(v) => setContent(v)}
				isView={isView}
				setIsView={(v) => setIsView(v)}
				selectedTab={selectedTab}
				setSelectedTab={(v) => setSelectedTab(v)}
				readOnly
			/>
		);
	}, [cmsByPageId,validation, selectedTab]);

	return {
		header,
		validation,
		setHeader,
		formFields,
		setFormFields,
		languageData,
		customComponent,
		setCustomComponent,
		cmsDynamicKeys,
		onChangeRowsPerPage,
	};
};

export default useCmsDetail;
