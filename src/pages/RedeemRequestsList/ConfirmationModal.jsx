/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { CustomInputField } from '../../helpers/customForms';

const ConfirmationModal = ({
	show,
	content,
	handleYes,
	handleClose,
	confirmationType,
	updateReason,
	reason,
}) => {
	const toggle = () => {
		handleClose();
	};

	return (
		<Modal isOpen={show} toggle={toggle}>
			<ModalHeader toggle={toggle} tag="h4">
				{content}
			</ModalHeader>
			<ModalBody>
				<div className="mb-2">
					{confirmationType === 'reject' && (
						<CustomInputField
							required
							value={reason?.value || ''}
							onChange={updateReason}
							isError
							errorMsg={reason?.error}
							label="Reason"
							validate={{ required: { value: true } }}
							invalid={!!reason?.error}
							/>
					)}
				</div>
				<Button onClick={handleYes}>Yes</Button>
				<Button className="mx-2" onClick={toggle}>
					No
				</Button>
			</ModalBody>
		</Modal>
	);
};

export default ConfirmationModal;
