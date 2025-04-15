/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
	createOffensiveWordStart,
	deleteOffensiveWord,
	editOffensiveWordStart,
	fetchOffensiveWordsStart,
} from '../../../store/actions';
import { ICON_CLASS, TEXT_COLORS } from '../../../utils/constant';
import { Avatar, Word } from './WordsListCol';
import Actions from '../../../components/Common/Actions';
import ButtonList from '../../../components/Common/ButtonList';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import { useConfirmModal } from '../../../components/Common/ConfirmModal';

const useOffensiveWordsHook = () => {
	const dispatch = useDispatch();
	const {
		offensiveWords,
		totalCount,
		isCreateWordLoading,
		loader,
		isEditWordLoading,
	} = useSelector((state) => state.OffensiveWords);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const { openConfirmModal } = useConfirmModal();
	const [page, setPage] = useState(1);
	const [isEditPage, setIsEditPage] = useState({
		open: false,
		selectedRow: '',
	});

	const onSuccess = (setIsOpen) => {
		dispatch(fetchOffensiveWordsStart({ perPage: itemsPerPage, page: 1 }));
		setIsOpen(false);
	};
	const handleEditWordLabels = (values, setIsOpen) => {
		dispatch(
			editOffensiveWordStart({
				data: {
					...values,
					word: values?.word.toLowerCase(),
				},
				onSuccess: () => onSuccess(setIsOpen),
			})
		);
	};

	const handleCreateWordLabels = (values, setIsOpen) => {
		console.log("TCL: handleCreateWordLabels -> values", values)
		dispatch(
			createOffensiveWordStart({
				data: {
					word: values?.word.toLowerCase(),
				},
				onSuccess: () => onSuccess(setIsOpen),
			})
		);
	};

	const { isOpen, setIsOpen, header, setHeader, validation, formFields } =
		useForm({
			header: 'Add Offensive Word',
			initialValues: getInitialValues({ word: '' }),
			validationSchema: validationSchema(),
			staticFormFields,
			onSubmitEntry: isEditPage.open
				? (values) => handleEditWordLabels(values, setIsOpen)
				: (values) => handleCreateWordLabels(values, setIsOpen),
		});

	const handleNewWord = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
		validation.resetForm(getInitialValues({ word: '' }));
		setHeader('Add Offensive Word');
		setIsEditPage({ open: false, selectedRow: '' });
	};

	const handleEdit = (selectedRow) => {
		setIsEditPage({ open: true, selectedRow });
		setHeader(`Edit Offensive Word : ${selectedRow.word}`);
		validation.setValues(getInitialValues({ ...selectedRow }));
		setIsOpen((prev) => !prev);
	};

	const handleDelete = (id) => {
		dispatch(
			deleteOffensiveWord({
				data: { id: parseInt(id, 10) },
				onSuccess: () => onSuccess(setIsOpen),
			})
		);
	};

	const handleDeleteClick = (row) => {
		openConfirmModal('Do you really want to delete the Offensive Word?', () =>
			handleDelete(row?.id)
		);
	};

	const buttonList = useMemo(() => [
		{
			label: 'New Word',
			handleClick: handleNewWord,
			link: '#!',
			// module: modules.paymentManagement,
			// operation: 'C',
		},
	]);

	const actionsList = [
		// {
		// 	actionName: 'Edit',
		// 	actionHandler: handleEdit,
		// 	// isHidden: !isGranted(modules.admin, 'U'),
		// 	icon: ICON_CLASS.edit,
		// 	iconColor: TEXT_COLORS.primary,
		// },
		{
			actionName: 'Delete',
			actionHandler: handleDeleteClick,
			// isHidden: !isGranted(modules.admin, 'TS'),
			icon: ICON_CLASS.delete,
			iconColor: TEXT_COLORS.danger,
		},
	];

	const columns = useMemo(
		() => [
			{
				Header: '#',
				disableFilters: true,
				filterable: true,
				notHidable: true,
				disableSortBy: true,
				accessor: (prop) => {
					const { word, randomColor } = prop;
					return <Avatar word={word} randomColor={randomColor} />;
				},
			},
			{
				Header: 'Word',
				accessor: 'word',
				filterable: true,
				Cell: ({ cell }) => <Word value={cell.value} />,
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Actions cell={cell} actionsList={actionsList} />,
			},
		],
		[]
	);

	const onChangeRowsPerPage = (value) => {
		setPage(1);
		setItemsPerPage(value);
	};
	const actionList = <ButtonList buttonList={buttonList} />;

	useEffect(() => {
		dispatch(fetchOffensiveWordsStart({ perPage: itemsPerPage, page }));
	}, [page, itemsPerPage]);

	return {
		offensiveWords,
		totalCount,
		buttonList,
		columns,
		onChangeRowsPerPage,
		itemsPerPage,
		page,
		setPage,
		actionList,
		isOpen,
		formFields,
		header,
		validation,
		isCreateWordLoading,
		isEditWordLoading,
		loader,
		setIsOpen,
	};
};
useOffensiveWordsHook.propTypes = {
	cell: PropTypes.objectOf.isRequired,
};

export default useOffensiveWordsHook;
