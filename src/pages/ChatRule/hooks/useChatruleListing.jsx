/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
	createChatRuleStart,
	deleteChatRule,
	editChatRuleStart,
	fetchChatRuleStart,
} from '../../../store/actions';
import { ICON_CLASS, TEXT_COLORS } from '../../../utils/constant';
import { Avatar, Rule } from './RulesListCol';
import ButtonList from '../../../components/Common/ButtonList';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import { useConfirmModal } from '../../../components/Common/ConfirmModal';
import React from 'react';
import ActionButtons from '../ActionButtons';
import { useNavigate } from 'react-router-dom';


const useChatRuleHook = () => {
	const dispatch = useDispatch();
	const {
		chatRule,
		totalCount,
		isCreateRuleLoading,
		loader,
		isEditRuleLoading,
	} = useSelector((state) => state.ChatRule);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const { openConfirmModal } = useConfirmModal();
	const [page, setPage] = useState(1);
	const [isEditPage, setIsEditPage] = useState({
		open: false,
		selectedRow: '',
	});
	const navigate = useNavigate();

	const onSuccess = (setIsOpen) => {
		dispatch(fetchChatRuleStart({ perPage: itemsPerPage, page: 1 }));
		setIsOpen(false);
	};
	const handleEditRuleLabels = (values, setIsOpen) => {
		dispatch(
			editChatRuleStart({
				data: {
					...values,
					rule: values?.rule.toLowerCase(),
				},
				onSuccess: () => onSuccess(setIsOpen),
			})
		);
	};

	const handleCreateRuleLabels = (values, setIsOpen) => {
		dispatch(
			createChatRuleStart({
				data: {
					rule: values?.rule.toLowerCase(),
				},
				onSuccess: () => onSuccess(setIsOpen),
			})
		);
	};

	const { isOpen, setIsOpen, header, setHeader, validation, formFields } =
		useForm({
			header: 'Add Chat Rule',
			initialValues: getInitialValues({ rule: '' }),
			validationSchema: validationSchema(),
			staticFormFields,
			onSubmitEntry: isEditPage.open
				? (values) => handleEditRuleLabels(values, setIsOpen)
				: (values) => handleCreateRuleLabels(values, setIsOpen),
		});

	const handleNewRule = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
		validation.resetForm(getInitialValues({ rule: '' }));
		setHeader('Add Chat Rule');
		setIsEditPage({ open: false, selectedRow: '' });
	};

	const handleEdit = (selectedRow) => {
		setIsEditPage({ open: true, selectedRow });
		setHeader(`Edit Chat Rule`);
		validation.setValues(getInitialValues({ ...selectedRow }));
		setIsOpen((prev) => !prev);
	};

	const handleEditClick = (e) => {
		e.preventDefault();
		navigate('/'); 
	};

	const handleDelete = (id) => {
		dispatch(
			deleteChatRule({
				data: { id: parseInt(id, 10) },
				onSuccess: () => onSuccess(setIsOpen),
			})
		);
	};

	// const handleDeleteClick = (row) => {
	// 	openConfirmModal('Do you really want to delete the Chat Rule?', () =>
	// 		handleDelete(row?.id)
	// 	);
	// };

	const buttonList = useMemo(() => [
		// {
		// 	label: 'New Rule',
		// 	handleClick: handleNewRule,
		// 	link: '#!',
		// 	// module: modules.paymentManagement,
		// 	// operation: 'C',
		// },
	]);

	const actionsList = [
		{
			actionName: 'Edit',
			actionHandler: handleEdit,
			// isHidden: !isGranted(modules.admin, 'U'),
			icon: ICON_CLASS.edit,
			iconColor: TEXT_COLORS.primary,
		},
		// {
		// 	actionName: 'Delete',
		// 	actionHandler: handleDeleteClick,
		// 	// isHidden: !isGranted(modules.admin, 'TS'),
		// 	icon: ICON_CLASS.delete,
		// 	iconColor: TEXT_COLORS.danger,
		// },
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
					const { rules, randomColor } = prop;
					return <Avatar rules={rules} randomColor={randomColor} />;
				},
			},
			{
				Header: 'Rule',
				accessor: 'rules',
				filterable: true,
				Cell: ({ cell }) => <Rule value={cell.value} />,
			},
			// {
			// 	Header: 'Action',
			// 	accessor: 'action',
			// 	disableFilters: true,
			// 	disableSortBy: true,
			// 	Cell: ({ cell }) => <Actions cell={cell} actionsList={actionsList} />,
			// },
				{
				Header: 'ACTION',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => (
					<ActionButtons
						row={cell.row}
						handleEditClick={handleEditClick}
					/>
				),
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
		dispatch(fetchChatRuleStart({ perPage: itemsPerPage, page }));
	}, [page, itemsPerPage]);

	return {
		chatRule,
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
		isCreateRuleLoading,
		isEditRuleLoading,
		loader,
		setIsOpen,
	};
};
useChatRuleHook.propTypes = {
	cell: PropTypes.objectOf.isRequired,
};

export default useChatRuleHook;
