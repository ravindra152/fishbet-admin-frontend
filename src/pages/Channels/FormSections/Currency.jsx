/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import {
	CustomInputField,
	CustomSelectField,
} from '../../../helpers/customForms';
import { fetchCurrenciesStart } from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { filterEmptyPayload } from '../../../network/networkUtils';
import { currencyValidate } from '../Validation/schema';
import { getWageringInitialValues } from '../formDetails';

const Currencies = ({
	channelDetails,
	wageringToggle,
	wageringAllFields,
	setWageringAllFieldsAllFields,
}) => {
	const dispatch = useDispatch();
	const { currencies } = useSelector((state) => state.Currencies);
	const [remainingCurrency, setRemainingCurrency] = useState({});
	const currencyFields = [
		{ label: 'Min Wagering limit', key: 'minAmount' },
		// { label: 'Max Wagering limit', key: 'maxAmount' },
	];

	const { validation } = useForm({
		initialValues: getWageringInitialValues(channelDetails)?.currencyDetails,
		validationSchema: currencyValidate(wageringToggle),
	});

	useEffect(() => {
		dispatch(fetchCurrenciesStart({}));
	}, []);

	useEffect(() => {
		if (!isEmpty(channelDetails)) {
			const currency = filterEmptyPayload(
				getWageringInitialValues(channelDetails)?.currencyDetails
			);
			validation.setValues(currency);
			const remCur = {};
			channelDetails?.criteria[0]?.value?.slice(1)?.forEach((curr) => {
				remCur[curr.currencyId] = filterEmptyPayload(curr);
			});
			setRemainingCurrency(remCur);
		}
	}, [channelDetails, currencies]);

	useEffect(() => {
		const updateFields = {
			...wageringAllFields,
			currencyDetails: [
				filterEmptyPayload(validation.values),
				...Object.values(remainingCurrency),
			],
		};
		setWageringAllFieldsAllFields(updateFields);
	}, [remainingCurrency]);

	const updateRemainingCurrencyDetails = (currencyDetails) => {
		let remCur = {};
		currencies?.currencies
			?.filter(
				(curr) =>
					curr.id !== validation.values.currencyId && curr.type !== 'point'
			)
			.forEach((currency) => {
				currencyFields?.forEach(({ key }) => {
					remCur = {
						...remCur,
						[currency.id]: {
							...remCur[currency.id],
							currencyId: currency.id,
							[key]: currencyDetails[key]
								? currencyDetails[key] * Number(currency.exchangeRate)
								: 0,
						},
					};
				});
			});
		setRemainingCurrency(remCur);
	};

	const handleRemainingCurrency = (e, currency, key) => {
		setRemainingCurrency((prev) => {
			const updated = {
				...prev,
				[currency.id]: {
					...prev[currency.id],
					currencyId: currency.id,
					[key]: e.target.value,
				},
			};
			return updated;
		});
	};

	return (
		<div>
			<Card className="px-1 text-center">
				<Row>
					<Col sm={12} lg={3} className="mx-1">
						<label htmlFor="currencyId" style={{ fontSize: '14px' }}>
							Select currency
						</label>
						<span className="text-danger"> *</span>
						<CustomSelectField
							id="currencyId"
							type="select"
							name="currencyId"
							value={validation?.values?.currencyId}
							onChange={validation.handleChange}
							options={
								<>
									<option value={null} selected disabled>
										Select currency
									</option>
									{currencies?.currencies
										?.filter((curr) => curr.type !== 'point')
										?.map(({ id, name }) => (
											<option key={id} value={id}>
												{name}
											</option>
										))}
								</>
							}
						/>
						<span className="text-danger">
							{validation.errors.currencyId || ''}
						</span>
					</Col>
					{currencyFields?.map(({ key, label }) => (
						<Col sm={12} lg={3} className="mx-1">
							<label htmlFor={key} style={{ fontSize: '14px' }}>
								{label}
							</label>
							<span className="text-danger"> *</span>
							<CustomInputField
								name={key}
								value={validation?.values?.[key]}
								onBlur={(e) => {
									validation?.handleBlur(e);
									updateRemainingCurrencyDetails(validation.values);
								}}
								onChange={validation?.handleChange}
								type="number"
								placeholder="Enter Min Wagering limit"
								required
							/>
							<span className="text-danger">
								{validation.errors[key] || ''}
							</span>
						</Col>
					))}
				</Row>
				{validation?.values?.currencyId
					? currencies?.currencies
						?.filter(
							(curr) =>
								curr.id !== validation.values.currencyId &&
								curr.type !== 'point'
						)
						.map((currency) => (
							<Row className="mt-4">
								<Col sm={12} lg={3} className="mx-1">
									<CustomInputField value={currency.name} disabled />
								</Col>
								{currencyFields?.map(({ key }) => (
									<Col sm={12} lg={3} className="mx-1" key={key}>
										<CustomInputField
											name={key}
											value={remainingCurrency[currency.id]?.[key] || ''}
											onChange={(e) =>
												handleRemainingCurrency(e, currency, key)
											}
											type="number"
											placeholder="Enter Min Wagering limit"
											required
										/>
									</Col>
								))}
							</Row>
						))
					: null}
			</Card>
		</div>
	);
};

Currencies.defaultProps = {};
export default Currencies;
