/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { isEmpty, uniqBy } from 'lodash';
import { CustomSwitchButton } from '../../../helpers/customForms';
import TableContainer from '../../../components/Common/TableContainer';
import { Status } from '../../CasinoGames/CasinoGamesListCol';
import { getCasinoGamesStart } from '../../../store/actions';
import Actions from './Actions';
import { showToastr } from '../../../utils/helpers';

import {
	getRewardsInitialValues,
	rewardsValidationSchema,
	staticRewardsFormFields,
	validationSchema,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import FormPage from '../../../components/Common/FormPage';
import { useLocation } from 'react-router-dom';
import Filters from '../../../components/Common/Filters';
import useFilters from '../hooks/useFilters';

const KeyValueCell = ({ cell }) => (cell.value ? cell.value : '-');

const CheckboxInput = ({ cell, selectedGames, toggleSelectGame }) => (
	<div className="d-flex justify-content-center">
		<CustomSwitchButton
			type="checkbox"
			// containerClass="false"
			containerClass="form-switch-md"
			className="form-check-input"
			checked={selectedGames?.find(
				({ casinoGameId }) => casinoGameId === cell?.row?.original?.id
			)}
			switchSizeClass="form-switch-sm"
			onClick={() => toggleSelectGame(cell?.row?.original?.id)}
		/>
	</div>
);

const columnsArray = ({
	selectedGames,
	toggleSelectGame,
	formattedCasinoGames,
	setSelectedGames,
}) => [
	{
		Header: () => (
			<div className="d-flex align-items-center">
				<p className="mx-3 mb-0">All </p>
				<CustomSwitchButton
					type="checkbox"
					name="selectAll"
					containerClass="form-switch-md"
					className="form-check-input"
					checked={
						formattedCasinoGames?.length > 0 &&
						formattedCasinoGames?.every((v) =>
							selectedGames?.find(({ casinoGameId }) => casinoGameId === v?.id)
						)
					}
					switchSizeClass="form-switch-sm"
					onClick={(e) => {
						const newData = [];
						if (!e.target.checked) {
							formattedCasinoGames?.forEach((v) =>
								newData.push({ casinoGameId: v.id })
							);
							setSelectedGames(() => uniqBy([...newData], 'casinoGameId'));
						} else {
							setSelectedGames((prev) => {
								const filteredGames = prev.filter(
									({ casinoGameId }) =>
										!formattedCasinoGames.find(
											(item) => item.id === casinoGameId
										)
								);
								return filteredGames;
							});
						}
					}}
				/>
			</div>
		),
		accessor: 'code',
		disableSortBy: true,
		Cell: ({ cell }) => (
			<CheckboxInput
				selectedGames={selectedGames}
				toggleSelectGame={toggleSelectGame}
				cell={cell}
			/>
		),
	},
	// {
	// 	Header: 'THUMBNAIL',
	// 	accessor: 'iconUrl',
	// 	filterable: true,
	// 	disableSortBy: true,
	// 	Cell: ({ cell }) => <ThumbnailUrl value={cell.value} />,
	// },
	{
		Header: 'GAME ID',
		disableSortBy: true,
		accessor: 'id',
		Cell: ({ cell }) => <KeyValueCell cell={cell} />,
	},
	{
		Header: 'NAME',
		disableSortBy: true,
		accessor: 'name',
		Cell: ({ cell }) => <KeyValueCell cell={cell} />,
	},
	{
		Header: 'CATEGORY',
		disableSortBy: true,
		accessor: 'category',
		Cell: ({ cell }) => <KeyValueCell cell={cell} />,
	},
	{
		Header: 'PROVIDER',
		accessor: 'provider',
		filterable: true,
		Cell: ({ cell }) => <KeyValueCell cell={cell} />,
	},
	{
		Header: 'STATUS',
		accessor: 'isActive',
		disableFilters: true,
		disableSortBy: true,
		Cell: ({ cell }) => <Status value={cell.value} />,
	},
];

const Rewards = ({
	selectedGames,
	setSelectedGames,
	submitButtonLoading,
	toggleTab,
	tabsToShow,
	activeTab,
	setRewardsData,
}) => {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const { state } = useLocation();

	const { casinoGames, isCasinoGamesLoading } = useSelector(
		(state) => state.CasinoManagementData
	);

	useEffect(() => {
		dispatch(
			getCasinoGamesStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				// ...filterValidation.values,
			})
		);
	}, [itemsPerPage, currentPage]);

	const formattedCasinoGames = useMemo(() => {
		if (casinoGames) {
			return casinoGames?.rows?.map((game) => ({
				...game,
				category: game?.CasinoCategory?.name?.EN || '',
				provider: game?.CasinoProvider?.name?.EN || '',
			}));
		}
		return [];
	}, [casinoGames]);

	const toggleSelectGame = (id) => {
		const found = selectedGames?.find((game) => game.casinoGameId === id);
		if (found) {
			const updatedGames = selectedGames?.filter(
				({ casinoGameId }) => casinoGameId !== id
			);
			setSelectedGames(updatedGames);
		} else {
			setSelectedGames(() => [{ casinoGameId: id }]);
		}
	};

	const handleNextClick = (nextTab) => {
		validation.submitForm();
		rewardsValidationSchema()
			.validate(validation.values, {
				abortEarly: false,
			})
			.then(() => {
				if (!isEmpty(selectedGames)) {
					showToastr({
						message: 'Please select at least one game.',
						type: 'error',
					});
				} else {
					toggleTab(nextTab, validation?.values);
				}
			})
			.catch((err) => {
				console.log('Error in general form = ', err?.errors);
			});
	};

	const formSubmitHandler = (values) => {
		setRewardsData(values);
	};

	const { header, validation, formFields } = useForm({
		header: 'Create Vip Tier',
		initialValues: getRewardsInitialValues(state?.row?.rewards[0]),
		validationSchema: rewardsValidationSchema,
		staticFormFields: staticRewardsFormFields,
		onSubmitEntry: formSubmitHandler,
	});

	const columns = useMemo(
		() =>
			columnsArray({
				selectedGames,
				toggleSelectGame,
				formattedCasinoGames,
				setSelectedGames,
			}),
		[selectedGames, formattedCasinoGames]
	);

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useFilters();

	// useEffect(() => {
	// 	if (state?.row) {
	// 		const exclusiveGameIds = state?.row?.rewards[0]?.exclusiveGames?.map(
	// 			(id) => ({
	// 				casinoGameId: Number(id),
	// 			})
	// 		);
	// 		setSelectedGames(exclusiveGameIds);
	// 	}
	// }, []);

	return (
		<>
		{/* // <div className=""> */}
			{/* <Container fluid> */}
				{/* {showBreadcrumb && (
					<Breadcrumb title="Reports" breadcrumbItem="Casino Transactions" />
				)} */}
		<Row>
			
			<Col lg="12" className="my-3">
				<FormPage
					validation={validation}
					responsiveFormFields={formFields.map((field) => ({
						...field,
						label: (
							<>
										{field.name !== 'icon' && field.name !== 'isActive' && (

							<i
									id={`tooltip-${field.name}`}
									className="ms-2 bx bx-info-circle text-primary"
									style={{ cursor: 'pointer' , marginRight: '10px' }}
									title={field.tooltip || ''}
									/>)}
								
								{field.label}{' '}
								
							</>
						),
					}))}
					customColClasses=""
					colOptions={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 }}
					isSubmit={false}
					formClass="shadow-none mb-0"
				/>
			</Col>
			{/* <Filters
				validation={filterValidation}
				filterFields={filterFields}
				actionButtons={actionButtons}
				isAdvanceOpen={isAdvanceOpen}
				toggleAdvance={toggleAdvance}
				isFilterChanged={isFilterChanged}
			/> */}
			{/* <TableContainer
				isLoading={!isCasinoGamesLoading}
				columns={columns || []}
				data={formattedCasinoGames || []}
				isPagination
				customPageSize={itemsPerPage}
				tableClass="table-bordered align-middle nowrap mt-2"
				paginationDiv="justify-content-center"
				pagination="pagination justify-content-start pagination-rounded"
				totalPageCount={casinoGames?.count || 1}
				isManualPagination
				onChangePagination={setCurrentPage}
				currentPage={currentPage}
				changeRowsPerPageCallback={setItemsPerPage}
				// filterComponent={filterComponent}
				// selectedFiltersComponent={selectedFiltersComponent}
			/> */}
			<Actions
				handleNextClick={handleNextClick}
				submitButtonLoading={submitButtonLoading}
				activeTab={activeTab}
				toggleTab={toggleTab}
				tabsToShow={tabsToShow}
			/>
		</Row>
		{/* </Container> */}
		{/* </div> */}
		</>
	);
};

export default Rewards;
