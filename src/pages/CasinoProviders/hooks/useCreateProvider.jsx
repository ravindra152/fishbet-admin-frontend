/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import {
	createCasinoProvidersStart,
	editCasinoProvidersStart,
	getAggregatorsList,
	updateCasinoStatusStart,
} from '../../../store/actions';

import {
	CasinoProviderId,
	Name,
	ThumbnailUrl,
	Status,
} from '../CasinoProvidersListCol';
import ActionButtons from '../ActionButtons';
import useForm from '../../../components/Common/Hooks/useFormModal';
// import { modules } from '../../../constants/permissions';

const useCreateProvider = () => {
	const dispatch = useDispatch();
	const [isEdit, setIsEdit] = useState({ open: false, selectedRow: '' });
	const { aggregatorsData } = useSelector((state) => state.AggregatorsReducer);
	const {
		isCreateProviderLoading,
		casinoProvidersData,
		isEditProviderLoading,
	} = useSelector((state) => state.CasinoManagementData);
	const [casinoProviderdata, setCasinoProviderdata] = useState();
	const [modalStates, setModalStates] = useState({
		activeCasinoProvider: false,
	});
	const openModal = (modalName) => {
		setModalStates((prev) => ({ ...prev, [modalName]: true }));
	};

	const closeModal = (modalName) => {
		setModalStates((prev) => ({ ...prev, [modalName]: false }));
	};

	const handleStatus = () => {
		const { status, id } = casinoProviderdata;
		dispatch(
			updateCasinoStatusStart({
				code: 'CASINO_PROVIDER',
				casinoProviderId: id,
				status: !status,
			})
		);
	};
	const openCasinoProviderModal = (props) => {
		setCasinoProviderdata(props);
		openModal('activeCasinoProvider');
	};

	const handleCreateProvider = (values) => {
		dispatch(
			createCasinoProvidersStart({
				data: values,
			})
		);
	};

	// const { openCasinoCategoryModal } = useCasinoProvidersListing();

	const handleEditProvider = (values) => {
		// console.log('Form values:', values); // Debugging
		// console.log('Image field:', values.image); // Check if image is present
		dispatch(
			editCasinoProvidersStart({
				data: {
					...values,
					casinoProviderId: isEdit.selectedRow.id,
					// web: values.image || '',  // Provide a fallback value
					// mobile: values.image || '',  // Provide a fallback value
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
		header: 'Add Provider',
		initialValues: getInitialValues(),
		validationSchema,
		staticFormFields,
		onSubmitEntry: isEdit.open ? handleEditProvider : handleCreateProvider,
	});

	// const handleAddClick = (e) => {
	// 	e.preventDefault();
	// 	setIsOpen((prev) => !prev);
	// 	validation.resetForm(getInitialValues());
	// 	setHeader('Add Provider');
	// 	setIsEdit({ open: false, selectedRow: '' });
	// };

	useEffect(() => {
		dispatch(getAggregatorsList({ pageNo: 1 }));
	}, []);

	const onClickEdit = (selectedRow) => {
		setIsEdit({ open: true, selectedRow });
		setHeader('Edit Provider');
		validation.setValues(
			getInitialValues({
				...selectedRow,
				thumbnail: selectedRow.thumbnailUrl,
				
			})
		);
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [casinoProvidersData?.count]);

	useEffect(() => {
		if (isEditProviderLoading) setIsOpen(false);
	}, [isEditProviderLoading]);

	useEffect(() => {
		if (aggregatorsData?.rows?.length) {
			const aggOptions = aggregatorsData.rows.map((r) => ({
				id: r?.id,
				optionLabel: r?.name?.EN,
				value: r?.id,
			}));

			setFormFields([
				...staticFormFields,
				{
					name: 'gameAggregatorId',
					fieldType: 'select',
					label: 'Aggregator',
					placeholder: 'Select Aggregator',
					optionList: aggOptions,
					isDisabled: isEdit.open,
				},
			]);
		}
	}, [aggregatorsData]);

	const buttonList = useMemo(() => [
		// {
		// 	label: 'Create',
		// 	handleClick: handleAddClick,
		// 	link: '#!',
		// 	module: modules.CasinoManagement,
		// 	operation: 'C',
		// },
	]);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <CasinoProviderId value={cell.value} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
			{
				Header: 'THUMBNAIL',
				accessor: 'thumbnailUrl',
				disableSortBy: true,
				filterable: true,
				Cell: ({ cell }) => <ThumbnailUrl value={cell.value} />,
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
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => (
					<ActionButtons
						row={cell.row}
						handleStatus={openCasinoProviderModal}
						onClickEdit={onClickEdit}
					/>
				),
			},
		],
		[casinoProvidersData]
	);

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		buttonList,
		isCreateProviderLoading,
		onClickEdit,
		isEditProviderLoading,
		columns,
		modalStates,
		handleStatus,
		closeModal,
		casinoProviderdata,
	};
};

export default useCreateProvider;
