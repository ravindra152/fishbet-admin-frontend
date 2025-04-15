/* eslint-disable react/prop-types */
import React from 'react';
import {
	Button,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalHeader,
} from 'reactstrap';

const RequestConfirmationModal = ({
	show,
	content,
	handleYes,
	handleClose,
	requestType,
	reason,
	setReason,
	errorMsg,
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
				{requestType === 'cancel' && (
					<div className="mb-3">
						<Label>
							Reason <span className="text-danger">*</span>
						</Label>
						<Input
							type="text"
							value={reason}
							onChange={(e) => {
								setReason(e.target.value);
							}}
							placeholder="Enter reason"
							required="true"
						/>
						{errorMsg && <div className="text-danger mt-1">{errorMsg}</div>}
					</div>
				)}
				<Button
					onClick={() => {
						handleYes();
					}}
				>
					Yes
				</Button>
				<Button className="mx-2" onClick={toggle}>
					No
				</Button>
			</ModalBody>
		</Modal>
	);
};

export default RequestConfirmationModal;
