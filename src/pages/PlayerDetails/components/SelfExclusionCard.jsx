/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useDispatch } from 'react-redux';
import {
	CustomInputField,
	CustomSelectField,
} from '../../../helpers/customForms';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { selfExclusionSchema } from '../formDetails';
import { disableUser } from '../../../store/actions';
import { timePeriodValues } from '../constants';

const SelfExclusionCard = ({ limit, userId }) => {
	const dispatch = useDispatch();
	const [isResetLimit, setIsResetLimit] = useState({ open: false, data: '' });

	const setDisableUser = ({ formValues, reset, type, permanent }) => {
		let data = {};
		if (type === 'SELF_EXCLUSION') {
			data = {
				type,
				userId: parseInt(userId, 10),
				reset,
				permanent,
				days: permanent ? -1 : Number(formValues?.days), 
			};
		}
		dispatch(disableUser(data));
	};

	const onResetLimit = () => {
		setIsResetLimit({ open: true, data: limit });
	};

	const { validation } = useForm({
		validationSchema: selfExclusionSchema,
		initialValues: {
			days: limit?.days === -1 ? '1' : limit?.days,
			permanent: 'permanent',
		},
		onSubmitEntry: (formValues) => {
			setDisableUser({
				formValues,
				reset: false,
				type: 'SELF_EXCLUSION',
				permanent: formValues.permanent === 'permanent',
			});
		},
	});
	
	const resetDisableUser = (type) => {
		let data = {};
		if (type === 'Self Exclusion') {
			data = {
				userId: +userId,
				type: 'SELF_EXCLUSION',
				days: 0,
				removeSelfExclusion: true,
			};
		} else if (type === 'Take A Break') {
			data = {
				userId,
				type: 'TAKE_A_BREAK',
				portal: 'all',
				days: 0,
				reset: true,
			};
		} else {
			data = {
				userId,
				timeLimit: 1,
				reset: true,
			};
		}
		dispatch(disableUser(data));
	};

	useEffect(() => {
		if (limit.value) {
			validation.setValues({ limit: limit.value });
		}
	}, [limit]);

	const toggle = () =>
		setIsResetLimit((prev) => ({ open: !prev.open, data: prev.data }));

	const handleYes = () => {
		resetDisableUser(limit.label);
	};

	return (
		<Card className="p-3 border">
			<div>
				<Form
					onSubmit={(e) => {
						e.preventDefault();
						validation.handleSubmit();
						return false;
					}}
				>
					<h5 className="text-center">{limit.label}</h5>

					<CustomSelectField
						label="Time Period"
						name="permanent"
						isClearable
						className="mb-2"
						type="select"
						onChange={(e) => {
							validation.handleChange(e);
						}}
						onBlur={validation.handleBlur}
						validate={{ required: { value: true } }}
						value={validation.values.permanent}
						invalid={
							!!(validation.touched.permanent && validation.errors.permanent)
						}
						isError
						errorMsg={
							validation.touched.permanent && validation.errors.permanent
						}
						options={timePeriodValues.map(({ optionLabel, value }) => (
							<option key={value} value={value}>
								{optionLabel}
							</option>
						))}
					/>
					{validation.values.permanent === "custom" && (
						<CustomInputField
							label="Days"
							name="days"
							placeholder="Enter Days"
							value={validation?.values?.days}
							onChange={validation.handleChange}
							onBlur={validation.handleBlur}
							invalid={!!(validation.touched?.days && validation.errors?.days)}
							isError
							errorMsg={validation.touched?.days && validation.errors?.days}
						/>
					)}
					<div className="mt-3 text-center">
						<Button type="submit" className="btn btn-primary" color="primary">
							Set
						</Button>
						{true  && (
							<Button onClick={onResetLimit} className="mx-2">
								Reset Limit
							</Button>
						)}
					</div>
				</Form>
			</div>
			<Modal isOpen={isResetLimit.open} toggle={toggle}>
				<ModalHeader toggle={toggle} tag="h4">
					Are you sure you want to reset {limit?.label}?
				</ModalHeader>
				<ModalBody>
					<Button onClick={handleYes}>Yes</Button>
					<Button className="mx-2" onClick={toggle}>
						No
					</Button>
				</ModalBody>
			</Modal>
		</Card>
	);
};

export default SelfExclusionCard;
