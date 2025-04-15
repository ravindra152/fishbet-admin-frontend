/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';

import { Row, Col } from 'reactstrap';
import { Buffer } from 'buffer';

import Spinners from '../../../components/Common/Spinner';
import useForm from '../../../components/Common/Hooks/useFormModal';
import FormPage from '../../../components/Common/FormPage';

import { resetProfilePasswordStart } from '../../../store/actions';
import {
	profilePasswordSchema,
	getPasswordInitialValues,
	staticPasswordFormFields,
} from '../formDetails';

const Password = ({ loading, isTenant }) => {
	const dispatch = useDispatch();

	const handleSubmit = (values) => {
		dispatch(
			resetProfilePasswordStart({
				data: {
					password: values?.password
						? Buffer.from(values?.password).toString('base64')
						: '',
					newPassword: values?.newPassword
						? Buffer.from(values?.newPassword).toString('base64')
						: '',
				},
				isTenant,
			})
		);
	};

	const { formFields, validation } = useForm({
		initialValues: getPasswordInitialValues(),
		validationSchema: profilePasswordSchema,
		onSubmitEntry: handleSubmit,
		staticFormFields: staticPasswordFormFields,
	});

	return (
		<Row>
			<Col lg="12">
				{loading ? (
					<Spinners
						color="primary"
						className="position-absolute top-50 start-50"
					/>
				) : (
					<FormPage
						validation={validation}
						staticFormFields={formFields}
						submitLabel="Submit"
						customColClasses=""
						isSubmitLoading={false}
						isCancel
					/>
				)}
			</Col>
		</Row>
	);
};

Password.defaultProps = {};

export default Password;
