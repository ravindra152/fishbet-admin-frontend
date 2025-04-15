/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Button, UncontrolledTooltip } from 'reactstrap';
import {
	GameCategoryId,
	CreatedAt,
	UpdatedAt,
	Status,
	Name,
} from '../CasinoCategoryListCol';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { modules } from '../../../constants/permissions';

const useCasinoCategoryColumn = ({ openCasinoCategoryModal, deleteCategory }) => {
	const { isGranted, permissions } = usePermission();
	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <GameCategoryId value={cell.value} />,
			},
			{
				Header: 'Order ID',
				accessor: 'orderId',
				filterable: true,
				Cell: ({ cell }) => <GameCategoryId value={cell.value} />,
			},
			{
				Header: 'NAME',
				accessor: 'nameEN',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
			{
				Header: 'Image Url',
				accessor: 'imageUrl',
				filterable: true,
				Cell: ({ cell }) => <CreatedAt value={cell.value} />,
			},
			{
				Header: 'Mobile Image Url',
				accessor: 'mobileImageUrl',
				filterable: true,
				Cell: ({ cell }) => <UpdatedAt value={cell.value} />,
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				filterable: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => {
					const active = cell?.row?.original?.isActive;
					const id = cell?.row?.original?.id;
					return (
						<ul className="list-unstyled hstack gap-1 mb-0">
							<li>
								{active ? (
									<Button
									key={`in-active-${id}`}
									id={`in-active-${id}`}
										hidden={!isGranted(modules.CasinoManagement, 'T')}
										className="btn btn-sm btn-soft-danger"
										onClick={() =>
											openCasinoCategoryModal({
												active,
												id,
												Message: 'Inactive',
											})
										}
									>
										<i className="mdi mdi-close-thick" id={`in-active-${id}`} />
										<UncontrolledTooltip
											placement="top"
											target={`in-active-${id}`}
										>
											Set Inactive
										</UncontrolledTooltip>
									</Button>
								) : (
									<Button
									key={`set-active-${id}`}
									id={`set-active-${id}`}
										hidden={!isGranted(modules.CasinoManagement, 'T')}
										className="btn btn-sm btn-soft-success"
										onClick={() =>
											openCasinoCategoryModal({
												active,
												id,
												Message: 'Active',
											})
										}
									>
										<i className="mdi mdi-check-circle" id={`set-active-${id}`} />
										<UncontrolledTooltip
											placement="top"
											target={`set-active-${id}`}
										>
											Set Active
										</UncontrolledTooltip>
									</Button>
								)}
							</li>
							<li>
								{/* <Button
									hidden={!isGranted(modules.CasinoManagement, 'U')}
									className="btn btn-sm btn-soft-info"
									onClick={(e) => {
										e.preventDefault();
										onAddGame(cell?.row?.original);
									}}
								> */}

								<Link
									id={`active-${id}`}
									to={`/categories/addGames/${id}`}
									className="btn btn-sm btn-soft-info"
								>
									+
								</Link>
								<UncontrolledTooltip placement="top" target={`active-${id}`}>
									Add Game in this category
								</UncontrolledTooltip>
								{/* </Button> */}
							</li>
							{/* <li>
								<Button
									hidden={!isGranted(modules.CasinoManagement, 'U')}
									className="btn btn-sm btn-soft-info"
									onClick={(e) => {
										e.preventDefault();
										onClickEdit(cell?.row?.original);
									}}
								>
									<i
										className="mdi mdi-pencil-outline"
										id={`edit-${id}`}
									/>
									<UncontrolledTooltip
										placement="top"
										target={`edit-${id}`}
									>
										Edit
									</UncontrolledTooltip>
								</Button>
							</li> */}
							<li>
								<Button
								    key={`delete-${id}`}
									hidden={!isGranted(modules.CasinoManagement, 'D')}
									className="btn btn-sm btn-soft-danger"
									onClick={(e) => {
										e.preventDefault();
										deleteCategory(id);
									}}
								>
									<i className="mdi mdi-delete-outline" id={`delete-${id}`} />
									<UncontrolledTooltip placement="top" target={`delete-${id}`}>
										Delete
									</UncontrolledTooltip>
								</Button>
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

export default useCasinoCategoryColumn;
