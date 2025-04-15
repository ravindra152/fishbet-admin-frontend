/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import usePermission from './Hooks/usePermission';

const ButtonList = ({ buttonList }) => {
	const { isGranted } = usePermission();

	return buttonList.map(
		({
			link,
			handleClick,
			label,
			module,
			operation,
			tooltip,
			icon,
			isHide,
			disabled,
		}) =>
			!isHide && (
				<div className="flex-shrink-0" key={link}>
					<Link
						hidden={module && operation && !isGranted(module, operation)}
						to={disabled ? null : link}
						onClick={disabled ? null : handleClick}
						className={`${disabled ? 'disabled' : ''
							} btn btn-light btn-outline-primary ${icon ? 'icon-button-padding' : ''
							}`}
						id={`id-${label}`}
					>
						{icon}
						{label}
					</Link>
					{tooltip && (
						<UncontrolledTooltip placement="top" target={`id-${label}`}>
							{tooltip}
						</UncontrolledTooltip>
					)}
				</div>
			)
	);
};

export default ButtonList;
