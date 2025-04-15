/* eslint-disable react/prop-types */
/* eslint-disable eqeqeq */
import React from 'react';
import { Badge } from 'reactstrap';

const Id = ({ value }) => value ?? '';

const Title = ({ value }) => value ?? '';

const Currencies = ({ value, currencyList }) =>
	currencyList?.find((currency) => currency?.code == value)?.name ??
	'-';

const Status = ({ value }) =>
	value ? (
		<Badge className="bg-success">Yes</Badge>
	) : (
		<Badge className="bg-danger">No</Badge>
	);

export { Id, Title, Status, Currencies };
