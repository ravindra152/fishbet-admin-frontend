/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Col, Card } from 'reactstrap';
import {
	getInitialValues,
	validationSchema,
	staticFormFields,
} from '../formDetails';
import FormPage from '../../../components/Common/FormPage';
import Spinners from '../../../components/Common/Spinner';
import useForm from '../../../components/Common/Hooks/useFormModal';
import Actions from './Actions';
import { useLocation, useNavigate } from 'react-router-dom';

const General = ({
	isLoading,
	submitButtonLoading,
	toggleTab,
	tabsToShow,
	activeTab,
	setVipData,
}) => {
	const { state } = useLocation();

	const formSubmitHandler = (values) => {
		setVipData(values);
	};

	const { header, validation, formFields } = useForm({
		header: 'Create Vip Tier',
		initialValues: getInitialValues(state?.row),
		validationSchema,
		staticFormFields,
		onSubmitEntry: formSubmitHandler,
	});

	const handleNextClick = (nextTab) => {
		validation.submitForm();

		validationSchema()
			.validate(validation.values, {
				abortEarly: false,
			})
			.then(() => {
				toggleTab(nextTab);
			})
			.catch((err) => {
				console.log('Error in general form = ', err?.errors);
			});
	};

	return (
		<Card>
			<Col lg="12" className="my-3">
				{isLoading ? (
					<Spinners
						color="primary"
						className="position-absolute top-50 start-50"
					/>
				) : (
					<>
						<FormPage
							validation={validation}
							responsiveFormFields={formFields.map((field) => ({
								...field,
								label: (
									<>
										<>


										{field.name !== 'icon' && field.name !== 'isActive' && (

											<i
												id={`tooltip-${field.name}`}
												className="bx bx-info-circle text-primary"
												style={{ cursor: 'pointer', marginRight: '10px' }} // Added margin for spacing
												title={field.tooltip || ''}
											/>)}
											{field.label}
										</>
									</>
								),
							}))}
							customColClasses=""
							colOptions={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 }}
							isSubmit={false}
							formClass="shadow-none mb-0"
						/>
					</>
				)}
			</Col>
			<Actions
				handleNextClick={handleNextClick}
				submitButtonLoading={submitButtonLoading}
				activeTab={activeTab}
				toggleTab={toggleTab}
				tabsToShow={tabsToShow}
			/>
		</Card>
	);
};

General.defaultProps = {};

export default General;
