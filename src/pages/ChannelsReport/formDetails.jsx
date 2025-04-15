/* eslint-disable no-nested-ternary */
import * as Yup from 'yup';

const staticFiltersFields = () => [];

const filterValues = () => ({
	searchName: '',
});

const filterValidationSchema = () =>
	Yup.object({
		isActive: Yup.string().nullable(),
		searchName: Yup.string().nullable(),
	});

const generalStepInitialValues = ({ channelDetails }) => ({
	name: channelDetails?.name || '',
	isActive: channelDetails?.status || false,
	isGlobal: channelDetails?.isGlobal || false,
	description: channelDetails?.description || '',
	kycToggle: channelDetails?.criteria
		? channelDetails?.criteria?.findIndex(
				(item) => item?.key === 'KYC_CRITERIA'
		  ) !== -1
		: false,
	timeToggle: channelDetails?.criteria
		? channelDetails?.criteria?.findIndex(
				(item) => item?.key === 'TIME_CRITERIA'
		  ) !== -1
		: false,
	wageringToggle: channelDetails?.criteria
		? channelDetails?.criteria?.findIndex(
				(item) => item?.key === 'WAGERING_CRITERIA'
		  ) !== -1
		: false,
	tierToggle: channelDetails?.criteria
		? channelDetails?.criteria?.findIndex(
				(item) => item?.key === 'RANKING_LEVEL_CRITERIA'
		  ) !== -1
		: false,

	timeValue: channelDetails?.criteria
		? channelDetails?.criteria?.findIndex(
				(item) => item?.key === 'TIME_CRITERIA'
		  ) !== -1
			? channelDetails?.criteria?.find((item) => item?.key === 'TIME_CRITERIA')
					.value
			: ''
		: '',

	tierValue: channelDetails?.criteria
		? channelDetails?.criteria?.findIndex(
				(item) => item?.key === 'RANKING_LEVEL_CRITERIA'
		  ) !== -1
			? channelDetails?.criteria?.find(
					(item) => item?.key === 'RANKING_LEVEL_CRITERIA'
			  ).value
			: ''
		: '',

	wageringValue: channelDetails?.criteria
		? channelDetails?.criteria?.findIndex(
				(item) => item?.key === 'WAGERING_CRITERIA'
		  ) !== -1
			? channelDetails?.criteria?.find(
					(item) => item?.key === 'WAGERING_CRITERIA'
			  ).value
			: ''
		: '',
});

const MESSAGES_CONSTANTS = {
	message: 'MESSAGE',
	gif: 'GIF',
	event: 'EVENT',
	tip: 'TIP',
	chatRain: 'CHAT_RAIN',
};

export {
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
	generalStepInitialValues,
	MESSAGES_CONSTANTS,
};
