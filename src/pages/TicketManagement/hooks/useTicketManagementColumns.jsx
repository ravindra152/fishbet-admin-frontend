/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { Button, Input, UncontrolledTooltip } from 'reactstrap';

import {
	TicketId,
	Subject,
	Description,
	CreatedAt,
	User,
	Email
} from '../TicketManagementListCol';
import statusOptionList from '../formDetails';
import useTicketManagementListing from './useTicketManagementListing';

const useTicketManagementColumns = (openChatModal) => {
	const { handleStatusChange } = useTicketManagementListing();
	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <TicketId value={cell.value} />,
			},
			{
				Header: 'User Name',
				accessor: 'User.username',
				filterable: true,
				Cell: ({ cell }) => <User value={cell.value} />,
			},
			{
				Header: 'Email',
				accessor: 'User.email',
				filterable: true,
				Cell: ({ cell }) => <Email value={cell.value} />,
			},
			{
				Header: 'SUBJECT',
				accessor: 'subject',
				filterable: true,
				Cell: ({ cell }) => <Subject value={cell.value} />,
			},
			{
				Header: 'DESCRIPTION',
				accessor: 'body',
				filterable: true,
				Cell: ({ cell }) => <Description value={cell.value} />,
			},
			{
				Header: 'CREATED AT',
				accessor: 'createdAt',
				filterable: true,
				Cell: ({ cell }) => <CreatedAt value={cell.value} />,
			},
			{
				Header: 'STATUS',
				accessor: 'status',
				filterable: true,
				disableSortBy: true,
				Cell: ({ cell }) => {
					// const active = cell?.row?.original?.isActive;
					const id = cell?.row?.original?.id;
					const status = cell?.value;

					return (
						<ul className="list-unstyled hstack gap-1 mb-0">
							<li>
								<Input
									id={id}
									type="select"
									name="status"
									value={status}
									onChange={(e) => {
										handleStatusChange(id, e.target.value);
									}}
								>
									{statusOptionList?.map((option) => (
										<option key={option?.id} value={option?.value}>
											{option?.optionLabel}
										</option>
									))}
								</Input>
							</li>
						</ul>
					);
				},
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => {
					const id = cell?.row?.original?.id;
					const status = cell?.row?.original?.status;
					return (
						<ul className="list-unstyled hstack gap-1 mb-0">
							<li>
								<Button
									id={`active-${id}`}
									className="btn btn-sm btn-soft-info"
									disabled={status === 'closed'}
									onClick={() => {
										openChatModal(id);
									}}
								>
									<i className="bx bxs-message-dots" />
								</Button>
								<UncontrolledTooltip placement="top" target={`active-${id}`}>
									Open Messages
								</UncontrolledTooltip>
								{/* </Button> */}
							</li>
						</ul>
					);
				},
			},
		],
		[]
	);
	return columns;
};

export default useTicketManagementColumns;
