// eslint-disable-next-line no-unused-vars
import React from 'react';
// import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const COUNTRY = ({ cell }) =>
	cell.value ? (
		<Link
			to="/users"
			state={{ countryCode: cell?.row?.original?.country_code }}
		>
			{cell.value}
		</Link>
	) : (
		''
	);
const SIGNUPS = ({ cell }) => cell.value ?? '';

const DEPOSITORS = ({ cell }) => cell.value ?? '';

const DEPOSITAMOUNT = ({ cell }) => cell.value ?? '';

const CONVERSIONRATE = ({ cell }) => cell.value ?? '';

COUNTRY.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string.isRequired,
		row: PropTypes.shape({
			original: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
		}).isRequired,
	}).isRequired,
};

SIGNUPS.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	}).isRequired,
};

DEPOSITORS.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	}).isRequired,
};

DEPOSITAMOUNT.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	}).isRequired,
};

CONVERSIONRATE.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	}).isRequired,
};

export { COUNTRY, SIGNUPS, DEPOSITORS, DEPOSITAMOUNT, CONVERSIONRATE };
