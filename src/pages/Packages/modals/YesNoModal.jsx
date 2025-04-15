import React from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';

// eslint-disable-next-line react/prop-types
const YesNoModal = ({ show, handleClose, content }) => {
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
						// handleYes();
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
	)
}

export default YesNoModal