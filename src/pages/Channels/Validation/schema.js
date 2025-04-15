/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as Yup from 'yup';

const generalFormSchema = () =>
	Yup.object({
		name: Yup.string()
			.min(3, 'Minimum 3 Characters Required')
			.max(50, 'Maximum 50 Characters Allowed')
			.required('Channel Title Required'),
		description: Yup.string()
			.trim()
			.required('Channel Description Required')
			.nullable(),
		isActive: Yup.bool(),
		isGlobal: Yup.bool(),
		channelCriteria: Yup.string(),
		kycToggle: Yup.bool(),
		timeToggle: Yup.bool(),
		wageringToggle: Yup.bool(),
		tierToggle: Yup.bool(),
		timeValue: Yup.number().when(['timeToggle'], {
			is: (timeToggle) => timeToggle,
			then: () =>
				Yup.number()
					.typeError('Tier level must be a number')
					.required('Time duration is required'),
		}),
		tierValue: Yup.number().when(['tierToggle'], {
			is: (tierToggle) => tierToggle,
			then: () =>
				Yup.number()
					.typeError('Tier level must be a number')
					.required('Tier level is required'),
		}),
	});

const criteriaFormSchema = () =>
	Yup.object({
		KYC_CRITERIA: Yup.bool().required('KYC Criteria Required').nullable(),
		WAGERING_CRITERIA: Yup.number()
			.required('Wagering Amount Required')
			.nullable(),
		RANKING_LEVEL_CRITERIA: Yup.number()
			.required('Tier Level Required')
			.nullable(),
		TIME_CRITERIA: Yup.number().required('Time Required').nullable(),
	});

const currencyValidate = (wageringToggle) =>
	Yup.object({
		currencyId: Yup.string().required('Currency required'),
		minAmount: Yup.number()
			.when(['dummy'], {
				is: () => {
					if (wageringToggle) {
						return true;
					}
					return false;
				},
				then: (schema) =>
					schema
						.required('Wagering limit required')
						.min(0.01, 'Wagering limit should be greater than 0'),
			})
			.nullable(),
	});

export { generalFormSchema, criteriaFormSchema, currencyValidate };
