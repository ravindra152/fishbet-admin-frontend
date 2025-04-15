import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import useForm from '../../../../components/Common/Hooks/useFormModal';
import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import {
	createAggregatorStart,
	updateAggregatorStatusStart,
} from '../../../../store/actions';
// import { modules } from '../../../../constants/permissions';

const useCreateAggregator = () => {
	const dispatch = useDispatch();
	const { isCreateAggregatorLoading, aggregatorsData } = useSelector(
		(state) => state.AggregatorsReducer
	);
	const [aggregatordata, setAaggregatordata] = useState();
	const [modalStates, setModalStates] = useState({
		activeAggregatorsModal: false,
	});
	const openModal = (modalName) => {
		setModalStates((prev) => ({ ...prev, [modalName]: true }));
	};

	const closeModal = (modalName) => {
		setModalStates((prev) => ({ ...prev, [modalName]: false }));
	};
	const handleCreateAggregator = (values) => {
		dispatch(
			createAggregatorStart({
				data: {
					...values,
				},
			})
		);
	};

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: 'Add Aggregator',
			initialValues: getInitialValues(),
			validationSchema,
			isEdit: false,
			onSubmitEntry: handleCreateAggregator,
			staticFormFields,
		});

	// const handleAddClick = (e) => {
	// 	e.preventDefault();
	// 	setIsOpen((prev) => !prev);
	// };

	const handleStatus = () => {
		if (aggregatordata) {
			const { active, id } = aggregatordata;
			dispatch(
				updateAggregatorStatusStart({
					code: 'AGGREGATOR',
					casinoAggregatorId: id,
					status: !active,
				})
			);
		}
	};

	const openAggregatorModal = (props) => {
		setAaggregatordata(props);
		openModal('activeAggregatorsModal');
	};

	useEffect(() => {
		setIsOpen(false);
	}, [aggregatorsData?.count]);

	const buttonList = useMemo(() => [
		// {
		// 	label: 'Create',
		// 	handleClick: handleAddClick,
		// 	link: '#!',
		// 	module: modules.CasinoManagement,
		// 	operation: 'C',
		// },
	]);

	return {
		isOpen,
		setFormFields,
		setIsOpen,
		formFields,
		header,
		validation,
		buttonList,
		isCreateAggregatorLoading,
		handleStatus,
		openAggregatorModal,
		openModal,
		closeModal,
		modalStates,
		aggregatordata,
	};
};

export default useCreateAggregator;
