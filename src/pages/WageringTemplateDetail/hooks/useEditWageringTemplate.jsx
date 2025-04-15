import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { showToastr } from '../../../utils/helpers';
import useForm from '../../../components/Common/Hooks/useFormModal';
import useWageringTemplate from './useWageringTemplate';
import CasinoGameForm from '../CasinoGameForm';

import { showLinearProgress } from '../../../store/progressLoading/actions';

import {
	getCasinoProvidersDataStart,
	getCasinoGamesStart,
	editWageringTemplateDetails,
} from '../../../store/actions';

import {
	getInitialValues,
	createWageringTemplate,
	leftStaticFormFields,
	rightStaticFormFields,
} from '../formDetails';

const useEditWageringTemplate = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { wageringTemplateId } = useParams();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const [customComponent, setCustomComponent] = useState();
	const { wageringTemplateDetail } = useWageringTemplate();
	const [selectedId, setSelectedId] = useState([]);

	const { casinoProvidersData, casinoGames, isCasinoGamesLoading } =
		useSelector((state) => state.CasinoManagementData);

	const { SAWageringTemplate, SAWageringTemplateLoading } = useSelector(
		(state) => state.WageringTemplate
	);

	const formSubmitHandler = (values) => {
		const templateData = {
			name: values.name,
			gameContribution: Object.fromEntries(
				selectedId?.map((id) => [id.casinoGameId, values.customValue])
			),
			wageringTemplateId: Number(wageringTemplateId),
		};
		if (Object.keys(templateData.gameContribution).length < 1) {
			showToastr({
				message: 'Select At Least One Game',
				type: 'error',
			});
		} else {
			dispatch(editWageringTemplateDetails({ templateData, navigate }));
		}
		setSelectedId([]);
	};

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const {
		header,
		validation,
		leftFormFields,
		setLeftFormFields,
		rightFormFields,
		setRightFormFields,
		setHeader,
	} = useForm({
		header: 'Edit Wagering Template',
		initialValues: getInitialValues(),
		validationSchema: createWageringTemplate,
		onSubmitEntry: formSubmitHandler,
		leftStaticFormFields,
		rightStaticFormFields,
	});

	useEffect(() => {
		if (casinoProvidersData) {
			setLeftFormFields([
				...leftStaticFormFields(),
				{
					name: 'provider',
					fieldType: 'select',
					label: 'Provider Name ',
					placeholder: 'Provider',
					optionList: casinoProvidersData?.rows?.map(
						({ id, name }) => ({
							optionLabel: name,
							value: id,
						})
					),
				},
			]);
		}
	}, [casinoProvidersData]);

	useEffect(() => {
		dispatch(getCasinoProvidersDataStart());
		dispatch(
			getCasinoGamesStart({
				limit: itemsPerPage,
				pageNo: page,
				casinoCategoryId: '',
				search: validation?.values?.search || '',
				isActive: '',
				tenantId: '',
				providerId: validation?.values?.provider || '',
			})
		);
	}, [
		validation?.values?.search,
		validation?.values?.provider,
		itemsPerPage,
		page,
	]);

	useEffect(() => {
		setCustomComponent(
			<CasinoGameForm
				values={validation.values}
				casinoGames={casinoGames}
				validation={validation}
				wageringTemplateDetail={wageringTemplateDetail}
				selectedId={selectedId}
				setSelectedId={setSelectedId}
				onChangeRowsPerPage={onChangeRowsPerPage}
				itemsPerPage={itemsPerPage}
				isCasinoGamesLoading={!isCasinoGamesLoading}
				page={page}
				setPage={setPage}
			/>
		);
	}, [
		validation?.values,
		casinoGames,
		validation?.values?.search,
		itemsPerPage,
		page,
	]);

	const handleEditClick = (row) => {
		navigate(`edit/${row.wageringTemplateId}`);
		dispatch(showLinearProgress());
	};

	const handleViewClick = (row) => {
		navigate(`details/${row.wageringTemplateId}`);
		dispatch(showLinearProgress);
	};

	return {
		header,
		validation,
		leftFormFields,
		rightFormFields,
		setLeftFormFields,
		setRightFormFields,
		setHeader,
		handleEditClick,
		handleViewClick,
		customComponent,
		setCustomComponent,
		selectedId,
		setSelectedId,
		isCasinoGamesLoading,
		SAWageringTemplate,
		itemsPerPage,
		SAWageringTemplateLoading,
		onChangeRowsPerPage,
		page,
		setPage,
		wageringTemplateDetail,
	};
};

export default useEditWageringTemplate;
