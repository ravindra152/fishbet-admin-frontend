/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	createSABannersStart,
	editSABannersStart,
	getLanguagesStart,
} from '../../../store/actions';
import { bannerType } from '../constants';
import { modules } from '../../../constants/permissions';

const useCreateBanner = () => {
	const dispatch = useDispatch();
	const [isEdit, setIsEdit] = useState({ open: false, selectdRow: '' });
	const [langState, setLangState] = useState({ EN: '' });
	const [langDescState, setLangDescState] = useState({
		title: { EN: '' },
		description: { EN: '' },
	});
	const [validationConditions, setValidationConditions] = useState({
		minRequiredWidth: '',
		minRequiredHeight: '',
		maxRequiredWidth: '',
		maxRequiredHeight: '',
	});
	const {
		isCreateSABannersLoading: isCreateBannerLoading,
		SABanners,
		isEditSABannersLoading: isEditBannerLoading,
		isEditSABannersSuccess,
	} = useSelector((state) => state.SASettings);
	const languageData = useSelector(
		(state) => state.CasinoManagementData.languageData
	);

	const handleCreateBanner = (values) => {
		// const devicetype = values?.image ?  'web' : 'mobile' 
		// console.log("values",values)
		dispatch(
			
			createSABannersStart({
				data: {
					bannerType: values?.bannerType,
					// image: values?.image,
					title:  {EN: values?.name || 'titles'},
					description: {EN: values?.description || '' },
					redirectUrl: values?.redirectUrl,
					web: values.image,
					mobile: values.mobileimage,	
					// deviceType: devicetype
				},
			})
		);
	};

	const handleEditBanner = (values) => {
		dispatch(
			editSABannersStart({
				data: {
					bannerId: isEdit?.selectedRow?.id,
					bannerType: values?.bannerType,
					// image: values?.image,
					title:  {EN: values?.name || 'titles'},
					description: {EN: values?.description || '' },
					redirectUrl: values?.redirectUrl,
					web: values.image,
					mobile: values.mobileimage,	

					
				},
			})
			
		);
	};

	const {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		setHeader,
	} = useForm({
		header: 'Add Banner',
		initialValues: getInitialValues(),
		validationSchema: validationSchema({
			minRequiredWidth: validationConditions?.minRequiredWidth,
			minRequiredHeight: validationConditions?.minRequiredHeight,
			maxRequiredWidth: validationConditions?.maxRequiredWidth,
			maxRequiredHeight: validationConditions?.maxRequiredHeight,
			langTitle: langState,
			langDescState,
		}),
		staticFormFields,
		onSubmitEntry: isEdit.open ? handleEditBanner : handleCreateBanner,
	});

	const handleAddClick = (e) => {
		console.log("sumitted",handleAddClick)
		e.preventDefault();
		setIsOpen((prev) => !prev);
		validation.resetForm(getInitialValues());
		setHeader('Add Banner');
		setIsEdit({ open: false, selectedRow: '' });
	};

	const onClickEdit = (selectedRow) => {
		console.log("sumitted",handleAddClick)

		setIsEdit({ open: true, selectedRow });
		setHeader('Edit Banner');
		validation.setValues(
			getInitialValues({
				bannerType: selectedRow.key,
				image: selectedRow.imagePreview,
				description: selectedRow.description,
				name: selectedRow.title,
				redirectUrl: selectedRow.redirectUrl,
				mobileImage: selectedRow?.MobileImagePreview || '',
				

			})
		);
		setIsOpen((prev) => !prev);
	};

	const onChangeLanguage = (e) => {
		validation.setValues((prev) => ({
			...prev,
			name: { ...prev.name, [e.target.value]: '' },
			// titleDetails: { title: { ...prev?.title, [e.target.value]: '' }, description: { ...prev?.description, [e.target.value]: '' }},
		}));
		setLangState((prev) => ({ ...prev, [e.target.value]: '' }));
		// setLangDescState((prev) => ({ title: { ...prev?.title, [e.target.value]: '' }, description: { ...prev?.description, [e.target.value]: '' }}));
	};

	const onRemoveLanguage = (e) => {
		validation.setValues((prev) => {
			const { name } = prev;
			const { [e]: key, ...rest } = name;
			return { ...prev, name: rest };
		});

		setLangState((prev) => {
			const { [e]: key, ...rest } = prev;
			return rest;
		});
	};

	// const onRemoveLanguageDesc = (e) => {
	// 	validation.setValues((prev) => {
	// 		const { titleDetails } = prev;
	// 		const { [e]: key, ...rest } = titleDetails;
	// 		return { ...prev, description: rest };
	// 	});

	//   setLangDescState((prev) => {
	// 		const { [e]: key, ...rest } = prev;
	// 		return rest;
	// 	});
	// };

	// useEffect(() => {
	// 	dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
	// }, []);

	useEffect(() => {
		setIsOpen(false);
	}, [SABanners?.rows?.length]);

	useEffect(() => {
		if (isEditSABannersSuccess) setIsOpen(false);
	}, [isEditSABannersSuccess]);

	const buttonList = useMemo(() => [
		{
			label: 'Upload',
			handleClick: handleAddClick,
			link: '#!',
			module: modules.ContentManagement,
			operation: 'C',
		},
	]);

	useEffect(() => {
		// if (languageData?.rows?.length) {
			const arrayToReturn = bannerType.map((type) => ({
				...type,
				optionLabel: type.label,
			}));
			// Update: Multiple banner of same type allowed
			// bannerType?.map(({ label, value }) => {
			// 	let hideData = false;
			// 	SABanners?.rows?.map((item) => {
			// 		// Object.keys(item?.value).map((key) => {
			// 			if (item === value) {
			// 				// hideData = true;
			// 			}
			// 		// });
			// 	});
			// 	if (!hideData) {
			// 		arrayToReturn.push({ optionLabel: label, value });
			// 	}
			// });
			// const langOptions = languageData.rows.map((r) => ({
			// 	id: r.languageId,
			// 	optionLabel: r.languageName,
			// 	value: r.code,
			// }));
			setFormFields([
				// {
				// 	name: 'language',
				// 	fieldType: 'select',
				// 	label: 'Language',
				// 	placeholder: 'Select Language',
				// 	optionList: langOptions,
				// 	callBack: onChangeLanguage,
				// },
				// {
				// 	name: 'name',
				// 	label: 'Banner Title',
				// 	placeholder: 'Enter Banner Title',
				// 	fieldType: 'inputGroup',
				// 	onDelete: onRemoveLanguage,
				// },
				// {
				// 	name: 'titleDetails',
				// 	label: 'Banner Description',
				// 	placeholder: 'Enter Banner Description',
				// 	fieldType: 'inputSelectGroup',
				//   inputSelectGrpLabel: langDescState,
				// 	onDelete: onRemoveLanguageDesc,
				// },
				{
					name: 'bannerType',
					fieldType: 'select',
					label: 'Type',
					optionList: arrayToReturn,
					placeholder: 'Select Type',
					isDisabled: isEdit.open,
					// isDisabled: true,
					value: 'home',
				},
				
				...staticFormFields,
			]);
		// }
	}, [SABanners?.rows?.length, isEdit]);

	useEffect(() => {
		if (validation?.values?.bannerType) {
			if (
				validation?.values?.bannerType.substr(
					validation?.values?.bannerType?.length - 6
				) === 'Banner'
			) {
				setValidationConditions({
					minRequiredWidth: 400,
					minRequiredHeight: 400,
					maxRequiredWidth: 600,
					maxRequiredHeight: 600,
				});
			} else {
				setValidationConditions({
					minRequiredWidth: 1000,
					minRequiredHeight: 400,
					maxRequiredWidth: 1920,
					maxRequiredHeight: 768,
				});
			}
		}
	}, [validation?.values]);

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		buttonList,
		validationConditions,
		isCreateBannerLoading,
		onClickEdit,
		isEditBannerLoading,
	};
};

export default useCreateBanner;
