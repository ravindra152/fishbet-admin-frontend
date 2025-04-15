/* eslint-disable jsx-a11y/anchor-is-valid */
// import React from 'react';
// import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';

const TicketId = ({ value }) => value ?? '';
const Subject = ({ value }) => value ?? '';
const Description = ({ value }) => value ?? '';
const CreatedAt = ({ value }) => value ?? '';
const User = ({ value }) => value ?? '';
const Email = ({ value }) => value ?? '';


TicketId.propTypes = {
	value: PropTypes.string.isRequired,
};

export { TicketId, Subject, Description, CreatedAt, User, Email };
