/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { Name, Status } from '../AggregatorListCol';
import usePermission from '../../../../components/Common/Hooks/usePermission';
import { modules } from '../../../../constants/permissions';

const useAggregatorList = (openAggregatorModal) => {
	const { isGranted, permissions } = usePermission();
	const columns = useMemo(
		() => [
			// {
			// 	Header: 'ID',
			// 	accessor: 'id',
			// 	filterable: true,
			// 	Cell: ({cell}) => <ID value={cell.value} />,
			// },
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
			{
				Header: 'Status',
				accessor: 'isActive',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => {
					const active = cell?.row?.original?.isActive;
					const id = cell?.row?.original?.id;
					const aggregatorName = cell?.row?.original?.name;
					return (
						<ul className="list-unstyled hstack gap-1 mb-0">
							<li>
								{active ? (
									<Button
										hidden={!isGranted(modules.CasinoManagement, 'T')}
										className="btn btn-sm btn-soft-danger"
										onClick={() =>
											openAggregatorModal({
												active,
												id,
												Message: 'Inactive',
												aggregatorName,
												// status:''
											})
										}
									>
										<i
											className="mdi mdi-close-thick"
											id={`aggregator-${id}`}
										/>
										<UncontrolledTooltip
											placement="top"
											target={`aggregator-${id}`}
										>
											Set Inactive
										</UncontrolledTooltip>
									</Button>
								) : (
									<Button
										hidden={!isGranted(modules.CasinoManagement, 'T')}
										className="btn btn-sm btn-soft-success"
										onClick={() =>
											openAggregatorModal({
												active,
												id,
												Message: 'Active',
												aggregatorName,
											})
										}
									>
										<i
											className="mdi mdi-check-circle"
											id={`aggregator-${id}`}
										/>
										<UncontrolledTooltip
											placement="top"
											target={`aggregator-${id}`}
										>
											Set Active
										</UncontrolledTooltip>
									</Button>
								)}
							</li>
						</ul>
					);
				},
			},
		],
		[permissions]
	);
	return columns;
};

export default useAggregatorList;
