/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';

const InternalModal = ({ userData, show, handleYes, handleClose }) => {
	const isInternal = userData?.isInternalUser;
	const content =
		userData && userData?.isInternalUser
			? `Do you really Unmark to mark user ${userData?.firstName ?? ''} ${
					userData?.lastName ?? ''
			  } as Internal?`
			: `Do you really want to mark user ${userData?.firstName ?? ''} ${
					userData?.lastName ?? ''
			  } as Internal?`;
	const toggle = () => {
		handleClose();
	};
	return (
		<Modal isOpen={show} toggle={toggle}>
			<ModalHeader toggle={toggle} tag="h4">
				{content}
			</ModalHeader>
			<ModalBody>
				<Button
					onClick={() => {
						handleYes(!isInternal);
						handleClose();
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

export default InternalModal;
