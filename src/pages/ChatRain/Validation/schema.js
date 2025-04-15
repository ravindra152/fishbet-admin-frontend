/* eslint-disable import/prefer-default-export */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as Yup from 'yup';

const MIN_TITLE_LENGTH = 3;
const MAX_TITLE_LENGTH = 50;

const MIN_PRIZE_MONEY = 0.01;
const MAX_PRIZE_MONEY = 1000000;
const generalFormSchema = () =>
	Yup.object({
		name: Yup.string()
			.required('Chat Rain Title Required')
			.test(
				'not-only-spaces',
				'Input cannot contain only blankspaces',
				(value) => !/^\s+$/.test(value)
			)
			.min(
				MIN_TITLE_LENGTH,
				`Title must be at least ${MIN_TITLE_LENGTH} characters`
			)
			.max(
				MAX_TITLE_LENGTH,
				`Title cannot be more than ${MAX_TITLE_LENGTH} characters`
			)
			.nullable(),
		prizeMoney: Yup.number()
			.required('Prize Money Required')
			.test(
				'no-scientific-notation',
				'Input must be a valid number',
				(value) => /^[0-9]*\.?[0-9]+$/.test(value) && !/^\s+$/.test(value)
			)
			.min(MIN_PRIZE_MONEY, `Prize Money must be at least ${MIN_PRIZE_MONEY}`)
			.max(MAX_PRIZE_MONEY, `Prize Money cannot exceed ${MAX_PRIZE_MONEY}`),
		currency: Yup.string().required('Currency Required'),
		chatGroupId: Yup.string().required('Channel Required'),
	});

export { generalFormSchema };
