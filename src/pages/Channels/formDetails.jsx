/* eslint-disable no-nested-ternary */
import * as Yup from 'yup';
import { channelCriteria } from './constants';

const staticFiltersFields = () => [];

const filterValues = () => ({
	isActive: null,
	searchName: '',
});

const filterValidationSchema = () =>
	Yup.object({
		isActive: Yup.string().nullable(),
		searchName: Yup.string().nullable(),
	});

const channelsList = channelCriteria.map((item) => ({
	name: item.name,
	fieldType: 'toggle',
	label: item.label,
	tooltipAlignment: 'left',
	tooltipContent: item?.tooltipContent,
	// isNewRow: true,
}));

const generalStaticFormFields = () => [
	{
		name: 'name',
		fieldType: 'textField',
		type: '',
		label: 'Chat Title',
		placeholder: 'Channel Title',
		maximum: 52,
		isRequired: true,
	},
	// {
	// 	name: 'description',
	// 	fieldType: 'textEditor',
	// 	type: '',
	// 	label: 'Description',
	// 	placeholder: 'Enter Description',
	// 	isNewRow: true,
	// 	fieldColOptions: { lg: 12 },
	// },
	// {
	// 	name: 'isActive',
	// 	fieldType: 'toggle',
	// 	label: 'Status',
	// 	isNewRow: true,
	// 	isDisabled,
	// 	tooltipAlignment: 'left',
	// 	tooltipContent: 'If True Channel Status is Active else In-Active',
	// },
	// {
	// 	name: 'isGlobal',
	// 	fieldType: 'toggle',
	// 	label: 'Global',
	// 	isDisabled,
	// 	tooltipAlignment: 'left',
	// 	tooltipContent: 'If True Channel is Global',
	// },
	// ...channelsList,
];

const generalStepInitialValues = ({ channelDetails }) => ({
	name: channelDetails?.name || '',
	isActive: channelDetails?.status || false,
	isGlobal: channelDetails?.isGlobal || false,
	description: channelDetails?.description || '',
	// kycToggle: channelDetails?.criteria
	// 	? channelDetails?.criteria?.findIndex(
	// 			(item) => item?.key === 'KYC_CRITERIA'
	// 	  ) !== -1
	// 	: false,
	// timeToggle: channelDetails?.criteria
	// 	? channelDetails?.criteria?.findIndex(
	// 			(item) => item?.key === 'TIME_CRITERIA'
	// 	  ) !== -1
	// 	: false,
	// wageringToggle: channelDetails?.criteria
	// 	? channelDetails?.criteria?.findIndex(
	// 			(item) => item?.key === 'WAGERING_CRITERIA'
	// 	  ) !== -1
	// 	: false,
	// tierToggle: channelDetails?.criteria
	// 	? channelDetails?.criteria?.findIndex(
	// 			(item) => item?.key === 'RANKING_LEVEL_CRITERIA'
	// 	  ) !== -1
	// 	: false,

	// timeValue: channelDetails?.criteria
	// 	? channelDetails?.criteria?.findIndex(
	// 			(item) => item?.key === 'TIME_CRITERIA'
	// 	  ) !== -1
	// 		? channelDetails?.criteria?.find((item) => item?.key === 'TIME_CRITERIA')
	// 				.value
	// 		: ''
	// 	: '',

	// tierValue: channelDetails?.criteria
	// 	? channelDetails?.criteria?.findIndex(
	// 			(item) => item?.key === 'RANKING_LEVEL_CRITERIA'
	// 	  ) !== -1
	// 		? channelDetails?.criteria?.find(
	// 				(item) => item?.key === 'RANKING_LEVEL_CRITERIA'
	// 		  ).value
	// 		: ''
	// 	: '',

	// wageringValue: channelDetails?.criteria
	// 	? channelDetails?.criteria?.findIndex(
	// 			(item) => item?.key === 'WAGERING_CRITERIA'
	// 	  ) !== -1
	// 		? channelDetails?.criteria?.find(
	// 				(item) => item?.key === 'WAGERING_CRITERIA'
	// 		  ).value
	// 		: ''
	// 	: '',
});

const getWageringInitialValues = (channelDetails = []) => {
	const { minAmount, currencyId } =
		channelDetails?.criteria?.[0]?.value[0] || '';
	const currencyDetails = channelDetails?.criteria?.length
		? {
				minAmount,
				currencyId,
		  }
		: {
				minAmount: null,
				currencyId: null,
		  };
	return {
		currencyDetails,
	};
};

export {
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	generalStaticFormFields,
	generalStepInitialValues,
	getWageringInitialValues,
};
