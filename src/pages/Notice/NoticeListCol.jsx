import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import { getDateTime } from '../../helpers/dateFormatter';

const CmsPageId = ({ value }) => (
	<Link to="/" className="text-body fw-bold">
		{value ?? ''}
	</Link>
);

const Title = ({ value }) => value ?? '';

const Slug = ({ value }) => value ?? '';

const Portal = ({ value }) => value ?? '';

const Content = ({ value }) => (
	<div
		dangerouslySetInnerHTML={{
			__html: value || '',
		}}
	/>
);

const CreatedAt = ({ value }) => getDateTime(value) ?? '';

const Status = ({ value }) =>
	value ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);

CmsPageId.propTypes = {
	value: PropTypes.string.isRequired,
};
Content.propTypes = {
	value: PropTypes.string.isRequired,
};

Status.propTypes = {
	value: PropTypes.string.isRequired,
};

export { CmsPageId, CreatedAt, Portal, Slug, Status, Title, Content };
