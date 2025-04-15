/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { generalNewStepInitialValues, newcommonFields } from '../formDetails';
import FormPage from '../../../components/Common/FormPage';
import Spinners from '../../../components/Common/Spinner';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { generalFormSchema } from '../Validation/schema';

const NewGeneral = ({
	isLoading = false,
	setAllFields = () => {},
	onSubmit = () => {},
	bonusDetails = [],
	isEdit = false,
	isSubmit = false,
}) => {
	const { bonusType } = bonusDetails || {};

	const handleSubmit = (values) => {
		setAllFields((prev) => ({
			...prev,
			...values,
		}));
		onSubmit(values);
		window.scrollTo(0, 0);
	};

	const { eligibleGames, promitionTitle, ...rest } = bonusDetails || {};

	const { formFields, setFormFields, validation } = useForm({
		initialValues: generalNewStepInitialValues({ bonusDetails: rest }),
		validationSchema: generalFormSchema(),
		onSubmitEntry: handleSubmit,
	});

	const handlePercentageToggle = () => {
		validation.setFieldValue('scAmount', '');
		validation.setFieldValue('gcAmount', '');

		// Toggle fields dynamically based on percentage selection
		setFormFields((prevFields) => {
			const isPercentageEnabled = validation.values.isAmountInPercentage;

			return prevFields
				.filter((field) =>
					isPercentageEnabled
						? field.name !== 'percentage' 
						: field.name !== 'gcAmount' && field.name !== 'scAmount' 
				);
		});
	};

	const handleBonusTypeChange = (e, type) => {
		e?.preventDefault();

		switch (type) {
			case 'welcome': {
				const data =
					[...newcommonFields(!isEdit, handlePercentageToggle)].filter(
						(item) => !['isAmountInPercentage', 'percentage'].includes(item?.name)
					) || [];
				setFormFields(data);
				break;
			}
			case 'first_purchase':
			case 'second_purchase':
			case 'third_purchase':
			case 'wager':
			case 'referral': {
				const control =
					[...newcommonFields(!isEdit, handlePercentageToggle)]
						// .filter((item) => item?.name !== 'percentage') 
						.map((item) => {
							if (item?.name === 'bonusAmount') {
								return { ...item, label: 'Bonus Amount' };
							}
							return item;
						}) || [];
				setFormFields(control);
				break;
			}
			default:
				break;
		}
	};

	useEffect(() => {
		handleBonusTypeChange(null, bonusType || 'welcome', true);
	}, [bonusDetails]);

	return (
		<Row>
			<Col lg="12">
				{isLoading ? (
					<Spinners color="primary" className="position-absolute top-50 start-50" />
				) : (
					<FormPage
						validation={validation}
						responsiveFormFields={formFields}
						customColClasses=""
						colOptions={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 }}
						isSubmit={isSubmit}
					/>
				)}
			</Col>
		</Row>
	);
};

NewGeneral.defaultProps = {};

export default NewGeneral;
