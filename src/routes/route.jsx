/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../network/storageUtils';
import { getRolesStart } from '../store/auth/roles/actions';
import { getSuperAdminStart } from '../store/auth/permissionDetails/actions';
import usePermission from '../components/Common/Hooks/usePermission';

const Authmiddleware = ({ children, location, route }) => {
	const accessToken = getAccessToken();
	const dispatch = useDispatch();
	const { isGranted } = usePermission();
	const superAdminUser = useSelector(
		(state) => state.PermissionDetails.superAdminUser
	);

	useEffect(() => {
		if (accessToken) {
			dispatch(getRolesStart());
			// dispatch(getTenantRoleStart())
			dispatch(getSuperAdminStart());
		}
	}, []);

	if (!accessToken) {
		return <Navigate to={{ pathname: '/login', state: { from: location } }} />;
	}

	if (superAdminUser && route?.module && !isGranted(route.module, 'R')) {
		return (
			<Navigate to={{ pathname: '/profile', state: { from: location } }} />
		);
	}
	if (superAdminUser && route?.groupModules) {
		const groupPermissions = route?.groupModules?.filter((module) =>
			isGranted(module, 'R')
		);
		if (groupPermissions?.length === 0)
			return (
				<Navigate to={{ pathname: '/profile', state: { from: location } }} />
			);
	}
	return children;
};

Authmiddleware.defaultProps = {
	children: <div />,
	location: '',
};

Authmiddleware.propTypes = {
	children: PropTypes.element,
	location: PropTypes.string,
};

export default Authmiddleware;
