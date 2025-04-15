/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
	editCasinoGamesStart,
	updateSACasinoGamesStatusStart,
} from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';

import {
	CasinoGameId,
	Name,
	Provider,
	Rtp,
	SubCategory,
	ThumbnailUrl,
	DeviceType,
	Status,
	IsFeatured,
} from '../CasinoGamesListCol';
import ActionButtons from '../ActionButtons';
import useCasinoGamesListings from './useCasinoGamesListing';

const useEditCasinoGames = () => {
	const dispatch = useDispatch();
	const [isEdit, setIsEdit] = useState({ open: false, selectedRow: '' });
	const {
		casinoCategoryDetails,
		isEditCasinoGamesLoading,
		isEditCasinoGamesSuccess,
	} = useSelector((state) => state.CasinoManagementData);

	const { casinoProvidersData, casinoSubCategoryDetails } = useSelector(
		(state) => state.CasinoManagementData
	);
	const [casinoCategorydata, setCasinoCategorydata] = useState();
	const [modalStates, setModalStates] = useState({
		activeCreateCategory: false,
	});
	const openModal = (modalName) => {
		setModalStates((prev) => ({ ...prev, [modalName]: true }));
	};

	const closeModal = (modalName) => {
		setModalStates((prev) => ({ ...prev, [modalName]: false }));
	};

	const handleStatus = () => {
		const { active, casinoGameId: id } = casinoCategorydata;
		dispatch(
			updateSACasinoGamesStatusStart({
				code: 'CASINO_GAME',
				casinoGameId: id,
				status: !active,
			})
		);
	};

	const openCasinoCategoryModal = (props) => {
		setCasinoCategorydata(props);
		openModal('activeCreateCategory');
	};
	const { casinoGames, handleDeleteItem, toggleIsFeaturedGames } =
		useCasinoGamesListings();

	const handleEditCasinoGames = (values) => {
		dispatch(
			editCasinoGamesStart({
				data: values,
				web: values.image,
				mobile: values.image,
			})
		);
	};

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: 'Edit Casino Game',
			initialValues: getInitialValues(),
			validationSchema,
			staticFormFields,
			onSubmitEntry: handleEditCasinoGames,
		});

	useEffect(() => {
		if (isEditCasinoGamesSuccess) setIsOpen(false);
	}, [isEditCasinoGamesSuccess]);

	const onClickEdit = (selectedRow) => {
		const { thumbnail, thumbnailUrl, gameSubCategoryId, ...rest } =
			selectedRow || {};

		setIsEdit({ open: !isEdit, selectedRow });
		validation.setValues(
			getInitialValues({
				...rest,
				thumbnail: thumbnail?.url,
				thumbnailUrl: thumbnailUrl?.url,
				mobilethumbnail: thumbnailUrl?.url
			})
		);
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [casinoCategoryDetails?.count]);

	useEffect(() => {
		if (
			casinoSubCategoryDetails?.rows?.length &&
			casinoProvidersData?.rows?.length
		) {
			const provOptions = casinoProvidersData.rows.map((r) => ({
				id: r?.id,
				optionLabel: r?.name?.EN,
				value: r?.id,
			}));

			const subOptions = casinoSubCategoryDetails.rows.map((r) => ({
				id: r.id,
				optionLabel: r.name?.EN,
				value: r.id,
			}));

			setFormFields([
				...staticFormFields,
				{
					name: 'gameSubCategoryId',
					fieldType: 'select',
					label: 'Casino Sub Category',
					placeholder: 'Select sub category',
					optionList: subOptions,
				},
				{
					name: 'casinoProviderId',
					label: 'Provider Name',
					fieldType: 'select',
					optionList: provOptions,
					isDisabled: true,
				},
			]);
		}
	}, [casinoSubCategoryDetails, casinoProvidersData]);

	const columns = useMemo(
		() => [
			{
				Header: 'IS FEATURED',
				accessor: 'isFeatured',
				Cell: (cellProps) => (
					<IsFeatured
						toggleIsFeaturedGames={toggleIsFeaturedGames}
						isFeaturedUpdateLoading={false}
						// featuredFabData={featuredFabData}
						cellProps={cellProps}
					/>
				),
			},
			{
				Header: 'GAME ID',
				accessor: 'casinoGameId',
				filterable: true,
				Cell: ({ cell }) => <CasinoGameId value={cell.value} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
			{
				Header: 'PROVIDER',
				accessor: 'providerName',
				filterable: true,
				Cell: ({ cell }) => <Provider value={cell.value} />,
			},
			{
				Header: 'RTP',
				accessor: 'returnToPlayer',
				filterable: true,
				Cell: ({ cell }) => <Rtp value={cell.value} />,
			},
			{
				Header: 'CATEGORY',
				accessor: 'CasinoCategory',
				filterable: true,
				Cell: ({ cell }) => <SubCategory value={cell.value} />,
			},
			{
				Header: 'THUMBNAIL',
				accessor: 'thumbnailUrl',
				filterable: true,
				disableSortBy: true,
				Cell: ({ cell }) => <ThumbnailUrl value={cell.value} />,
			},
			{
				Header: 'DEVICE TYPE',
				accessor: 'devices',
				filterable: true,
				Cell: ({ cell }) => <DeviceType value={cell.value} />,
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'ACTION',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => (
					<ActionButtons
						row={cell.row}
						handleStatus={openCasinoCategoryModal}
						onClickEdit={onClickEdit}
						handleDeleteItem={handleDeleteItem}
					/>
				),
			},
		],
		[casinoGames]
	);

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		isEditCasinoGamesLoading,
		onClickEdit,
		columns,
		casinoCategorydata,
		closeModal,
		handleStatus,
		modalStates,
	};
};

export default useEditCasinoGames;
