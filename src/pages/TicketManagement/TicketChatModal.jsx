/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

const TicketChatModal = ({
	show = false,
	data = [],
	handleClose = () => {},
	messageReply,
	handleInputChange = () => {},
	isMessageSending = false,
	handleMessageReply = () => {},
	// isTicketMessagesLoading = false,
}) => {
	const toggle = () => {
		handleClose();
	};

	return (
		<Modal isOpen={show} toggle={toggle}>
			<ModalHeader toggle={toggle} tag="h5">
				Ticket Conversation
			</ModalHeader>
			<ModalBody className=" ">
				<Row className="flex ">
					<Col>
						{data?.length === 0 ? (
							<div className="text-center my-3">
								<span>No messages to display!</span>
							</div>
						) : (
							<div className="chat-container">
								{data?.map((msg) => {
									const { isAdminResponse, message, id } = msg;
									return (
										<div
											key={id}
											className={`chat-sub-container ${
												isAdminResponse && 'justify-content-end'
											}`}
										>
											{!isAdminResponse && (
												<div className="chat-users-reply">{message}</div>
											)}
											{isAdminResponse && (
												<div className="chat-admins-reply">{message}</div>
											)}
										</div>
									);
								})}
							</div>
						)}

						<div className="mt-2">
							<Input
								type="textarea"
								value={messageReply}
								placeholder="Enter Here"
								onChange={(e) => {
									handleInputChange(e.target.value);
								}}
							/>
						</div>
						<div className="text-end mt-2">
							<button
								type="submit"
								className="btn btn-primary save-user"
								onClick={handleMessageReply}
								disabled={!messageReply}
							>
								{isMessageSending ? (
									<i className="bx bx-hourglass bx-spin font-size-16 align-middle me-2" />
								) : (
									'Send'
								)}
							</button>
						</div>
					</Col>
				</Row>
			</ModalBody>
		</Modal>
	);
};

export default TicketChatModal;
