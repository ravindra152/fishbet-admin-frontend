import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { CustomInputField } from '../../helpers/customForms';
import { showToastr } from '../../utils/helpers';
import { permissionIcons, permissionLabel } from '../../constants/permissions';
import { initialValueInstance } from './formDetails';

const PermissionForm = ({
	values,
	adminDetails,
	superAdminUser,
	validation,
	isEdit,
}) => {
	const dispatch = useDispatch();
	const permissions = (
		values.role === 'Manager' && !isEdit ? adminDetails : superAdminUser
	)?.permission;

	const handleChangeCheckbox = (e, key) => {
		e.preventDefault();
		if (e.target.value === 'R' || values?.permission?.[key]?.includes('R')) {
			if (e.target.value === 'R' && !e.target.checked) {
				// eslint-disable-next-line no-param-reassign
				delete values.permission[key];
				validation.setFieldValue('permission', values.permission);
				validation.handleChange(e);
			} else {
				validation.handleChange(e);
			}
		} else {
			dispatch(
				showToastr({
					message:
						'Please Select Read Permission Before Selecting Other For This Module',
					type: 'error',
				})
			);
		}
	};

	const handleSelectAll = (e, key) => {
		e.preventDefault();
		if (!e.target.checked) {
			// eslint-disable-next-line no-param-reassign
			delete values.permission[key];
			validation.setFieldValue('permission', values.permission);
			validation.handleChange(e)
		} else {
			validation.setFieldValue('permission', { ...values.permission, [key]: permissions[key] });
		}
	};

	return (
		(['Super Admin', 'Admin'].includes(values?.role) || values.adminId) &&
		(values.role === 'Manager' ? adminDetails : superAdminUser)
			?.permission && (
			<>
				<h4 className="title-text">Permissions</h4>
				<div className="row">
					{Object.keys(permissions || {}).map((key) =>
						values.role === 'Manager' && key === 'Admins' ? null : (
							<div className="mb-4 col-xl-3 col-lg-4 col-md-6 col-sm-12">
								<div className="permissions-card card card-bg">
									<div className="fw-bold card-header d-flex justify-content-between pe-4  align-items-center gap-3 p-0">
										<div className=' py-2 '>
											<span className="icon font-size-20 me-2 px-3 py-2 icon-bg">
												{permissionIcons()?.[key]}
											</span>
											<span className="text">{`  ${key}`}</span>
										</div>
										<div>
											<CustomInputField
												type="checkbox"
												value={key}
												checked={
													permissions?.[key]?.join('') === values?.permission[key]?.join('')
												}
												id={`${key}-permission-all]`}
												name={`permission[${key}]`}
												onChange={(e) => {
													handleSelectAll(e, key);
												}}
											/>
										</div>
									</div>
									<div className="list-group list-group-flush">
										{permissions[key].map((value) => (
											<div className="d-flex justify-content-between align-items-center py-1 px-3 list-group-item">
												<p className="m-0 p-0">{permissionLabel(value)}</p>
												<div className="form-check">
													{permissions[key].includes('R') ? (
														<CustomInputField
															type="checkbox"
															value={value}
															checked={
																!!values?.permission[key]?.includes(value)
															}
															id={`${key}-permission[${value}]`}
															name={`permission[${key}]`}
															onChange={(e) => {
																handleChangeCheckbox(e, key);
															}}
														/>
													) : (
														<CustomInputField
															type="checkbox"
															value={value}
															checked={
																!!values?.permission[key]?.includes(value)
															}
															id={`${key}-permission[${value}]`}
															name={`permission[${key}]`}
															onChange={validation.handleChange}
														/>
													)}
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						)
					)}
				</div>
			</>
		)
	);
};

PermissionForm.defaultProps = {
	isEdit: false,
	values: {},
	// adminDetails : {},
	// superAdminUser : {},
};

PermissionForm.propTypes = {
	values: PropTypes.shape(initialValueInstance),
	adminDetails: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
		.isRequired,
	superAdminUser: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
		.isRequired,
	validation: PropTypes.objectOf.isRequired,
	isEdit: PropTypes.bool,
};

export default PermissionForm;
