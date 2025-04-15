import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import CrudSection from '../../components/Common/CrudSection';
import TableContainer from '../../components/Common/TableContainer';
import useTicketManagementColumns from './hooks/useTicketManagementColumns';
import useTicketManagementListing from './hooks/useTicketManagementListing';
import TicketChatModal from './TicketChatModal';
import useChatModal from './hooks/useChatModal';
import Filters from '../../components/Common/Filters';
// import Search from '../Search/index';
import useFilters from './hooks/useFilters';

const TicketManagement = () => {
	const {
		formattedTicketManagementData,
		iscasinoCategoryDetailsLoading,
		itemsPerPage,
		page,
		setPage,
		totalTicketCount,
		onChangeRowsPerPage,
	} = useTicketManagementListing();

	const {
		openChatModal,
		closeChatModal,
		showChatModal,
		ticketMessagesData,
		messageReply,
		handleInputChange,
		isMessageSending,
		handleMessageReply,
		isTicketMessagesLoading,
	} = useChatModal();

	const columns = useTicketManagementColumns(openChatModal);

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useFilters();

// 	console.log("Before Filtering:", formattedTicketManagementData);
// console.log("Filters Applied:", filterFields);
// console.log("After Filtering:", formattedTicketManagementData);

	return (
		<div className="page-content">
			<Container fluid>
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection  title="Ticket Management"/>
							<CardBody>
								{/* <Search/> */}
								{/* <Filters/> */}
								<Filters
									validation={filterValidation}
									filterFields={filterFields}
								actionButtons={actionButtons}
								isAdvanceOpen={isAdvanceOpen}
								toggleAdvance={toggleAdvance}
								isFilterChanged={isFilterChanged}
								/>
								<TableContainer
									isLoading={iscasinoCategoryDetailsLoading}
									columns={columns}
									data={formattedTicketManagementData}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									// paginationDiv="col-sm-12 col-md-7"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalTicketCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									changeRowsPerPageCallback={onChangeRowsPerPage}
								/>
								<TicketChatModal
									show={showChatModal}
									// handleYes={handleStatus}
									handleClose={closeChatModal}
									data={ticketMessagesData}
									messageReply={messageReply}
									handleInputChange={handleInputChange}
									isMessageSending={isMessageSending}
									handleMessageReply={handleMessageReply}
									isTicketMessagesLoading={isTicketMessagesLoading}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default TicketManagement;
