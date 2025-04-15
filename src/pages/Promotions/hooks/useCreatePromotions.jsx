/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useForm from '../../../components/Common/Hooks/useFormModal';
import { createPromotionStart } from '../../../store/actions';

import {
    getInitialValues,
    createPromotionNewSchema,
    staticFormFields,
} from '../formDetails';
import CreatePromotionTemplate from '../CreatePromotionTemplate';

import { showToastr } from '../../../utils/helpers';
import { modules } from '../../../constants/permissions';
import { LANGUAGE_DATA } from '../../../utils/constant';

const useCreatePromotions = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { submitPromotionLoading } = useSelector((state) => state.Promotions);
    const languageData = useSelector(
        (state) => state.CasinoManagementData.languageData
    );
    const [customComponent, setCustomComponent] = useState();
    const [showGallery, setShowGallery] = useState(false);
    const [selectedTab, setSelectedTab] = useState('EN');
    const [title, setTitle] = useState({ EN: '' });
    const [description, setDescription] = useState({ EN: '' });
    const [content, setContent] = useState({ EN: '' });

    const formSubmitHandler = (values) => {
        if (
            title[selectedTab] === '' ||
            (!(
                validation?.values?.redirectUrlToggle &&
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

            console.log("Dispatching data:", {
                data: {
                    category: values?.category,
                    content,
                    redirectUrl: values?.redirectUrl || "", // Ensure redirectUrl is included
                    title,
                    description,
                    web: values?.image,
                    mobile: values?.mobileimage,
                },
            });

            dispatch(
                createPromotionStart({
                    data: {
                        category: values?.category,
                        content,
                        redirectUrl: values?.redirectUrl || "", // Ensure redirectUrl is included
                        title,
                        description,
                        web: values?.image,
                        mobile: values?.mobileimage,
                    },
                    navigate,
                })
            );
        }
    };

    const { header, validation, setHeader, formFields, setFormFields } = useForm({
        header: 'Create Promotion',
        initialValues: getInitialValues(),
        validationSchema: createPromotionNewSchema,
        staticFormFields: staticFormFields(),
        onSubmitEntry: formSubmitHandler,
    });

    useEffect(() => {
        setCustomComponent(
            <CreatePromotionTemplate
                languageData={LANGUAGE_DATA}
                validation={validation}
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                description={description}
                setDescription={setDescription}
                showGallery={showGallery}
                setShowGallery={setShowGallery}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                hideDetails={
                    validation?.values?.redirectUrlToggle &&
                    validation?.values?.category?.toString() === '3'
                }
                isCreate
            />
        );
    }, [
        languageData,
        title,
        content,
        description,
        showGallery,
        selectedTab,
        validation?.values?.category,
        validation?.values?.redirectUrlToggle,
    ]);

    useEffect(() => {
        if (validation?.values?.category?.toString() === '3') {
            setFormFields([
                ...staticFormFields(),
                {
                    name: 'redirectUrl',
                    fieldType: 'textField',
                    placeholder: 'Redirect Url',
                },
                {
                    name: 'redirectUrlToggle',
                    fieldType: 'toggle',
                    label: 'Redirect Url (Third Party)',
                    isDisabled: false,
                },
            ]);

            if (validation?.values?.redirectUrlToggle) {
                validation.setValues((prev) => ({ ...prev, slug: '' }));
            }
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
                    isRequired: true,
                    showThumbnail: true,
                },
                {
                    name: 'mobileimage',
                    fieldType: 'file',
                    label: 'Promotion Card Image (Mobile)',
                    showThumbnail: true,
                },
            ]);
        }
    }, [validation?.values?.category, validation?.values?.redirectUrlToggle]);

    const handleCreateClick = (e) => {
        e.preventDefault();
        navigate('create');
    };

    const handleGalleryClick = () => {
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
    ], []);

    const galleryList = useMemo(() => [
        {
            label: 'Image Gallery',
            handleClick: handleGalleryClick,
            link: '#!',
        },
    ], []);

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
        showGallery,
        setShowGallery,
        handleGalleryClick,
        submitPromotionLoading,
    };
};

export default useCreatePromotions;
