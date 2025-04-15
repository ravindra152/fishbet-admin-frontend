import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

const PromotionId = ({ value }) => (
	<Link to="/" className="text-body fw-bold">
		{value ?? ''}
	</Link>
);

const PromotionType = ({ value }) => {
  switch(value) {
    case 1:
      return <Badge className="bg-light">CASINO PROMOTION</Badge>;
    case 2:
      return <Badge className="bg-primary">SPORTS PROMOTION</Badge>;
    case 3:
      return <Badge className="bg-muted">SPONSORSHIP</Badge>;
  }
};

const Title = ({ value }) => value ?? '';

const Slug = ({ value }) => value ?? '';

const Status = ({ value }) =>
	value ? (
		<Badge className="bg-success">Active</Badge>
	) : (
		<Badge className="bg-danger">In Active</Badge>
	);

PromotionId.propTypes = {
	value: PropTypes.string.isRequired,
};

Status.propTypes = {
	value: PropTypes.string.isRequired,
};

export { PromotionId, Title, Slug, Status, PromotionType };
