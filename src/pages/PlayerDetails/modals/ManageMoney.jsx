/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { depositSchema } from '../formDetails';
import FormModal from '../../../components/Common/FormModal';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { depositToOther } from '../../../store/actions';
import { WALLET_CURRENCY } from '../constants';

const transactionTypeOptionsList = [
	{
		optionLabel: 'Purchase',
		value: 'purchase',
	},
	{
		optionLabel: 'Redeem',
		value: 'redeem',
	},
];

const walletTypeOptionsList = [
	{
		optionLabel: 'Cash',
		value: 'cash',
	},
	// {
	// 	optionLabel: 'Bonus',
	// 	value: 'bonus',
	// },
];

const staticFormFields = (currenciesOption, selecedcurrency = '') => [
	{
		name: 'transactionType',
		fieldType: 'radioGroup',
		label: 'Transaction Type',
		optionList: transactionTypeOptionsList,
	},
	// {
	// 	name: 'walletType',
	// 	fieldType: 'radioGroup',
	// 	label: 'Wallet Type',
	// 	optionList: walletTypeOptionsList,
	// },
	{
		name: 'currencyId',
		fieldType: 'select',
		label: 'Select Currency',
		placeholder: 'Select Currency',
		optionList: currenciesOption,
	},
	{
		name: 'addAmount',
		fieldType: 'textfieldWithAdornment',
		label: 'Amount',
		type: 'number',
		adornmentText: selecedcurrency,
	},
];

const ManageMoney = ({ show, header, toggle }) => {
	const dispatch = useDispatch();
	const { playerId } = useParams();
	const { depositToOtherLoading } = useSelector((state) => state.UserDetails);
	const handleDepositToOther = (values) => {
		dispatch(
			depositToOther({
				userId: playerId,
				amount: parseFloat(values?.addAmount.toFixed(2)),
				purpose: values?.transactionType,
				currencyCode: values?.currencyId,
			})
		);
	};
	const currenciesOption = WALLET_CURRENCY?.map((reason) => ({
		value: reason?.code,
		optionLabel: reason?.name,
	}));
	const { isOpen, setIsOpen, validation, formFields } = useForm({
		header,
		validationSchema: depositSchema,
		initialValues: {
			addAmount: '',
			transactionType: '',
			// walletType: '',
			currencyId: currenciesOption?.[0]?.value || '',
		},
		onSubmitEntry: (values, { resetForm }) => {
			handleDepositToOther(values);
			resetForm();
			toggle();
		},
		staticFormFields: staticFormFields(currenciesOption),
	});
	useEffect(() => {
		if (show) setIsOpen(true);
		else setIsOpen(false);
	}, [show]);

	return (
		<div>
			<FormModal
				isOpen={isOpen}
				toggle={() => {
					setIsOpen((prev) => !prev);
					toggle();
				}}
				header={header}
				validation={validation}
				formFields={formFields}
				submitLabel="Submit"
				customColClasses="col-md-12"
				isSubmitLoading={depositToOtherLoading}
			/>
		</div>
	);
};

export default ManageMoney;
