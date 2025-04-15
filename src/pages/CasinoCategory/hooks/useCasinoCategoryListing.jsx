import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatDate } from '../../../utils/dateFormatter';
import {
	getCasinoCategoryDetailStart,
	getLanguagesStart,
	updateCasinoStatusStart,
} from '../../../store/casinoManagement/actions';

const useCasinoCategoryListing = (filterValues = {}) => {
	const {
		casinoCategoryDetails,
		iscasinoCategoryDetailsLoading,
		languageData,
		isCreateCategorySuccess,
		isEditCategorySuccess,
	} = useSelector((state) => state.CasinoManagementData);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const [modal, setModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [job, setJob] = useState(null);
	const dispatch = useDispatch();
	const [casinoCategorydata, setCasinoCategorydata] = useState();
	const [modalStates, setModalStates] = useState({
		activeCreateCategory: false,
	});
	const openModal = (modalName) => {
		setModalStates((prev) => ({ ...prev, [modalName]: true }));
	};

	const closeModal = (modalName) => {
		setModalStates((prev) => ({ ...prev, [modalName]: false }));
	};

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};
	const formattedCasinoCategoriesData = useMemo(() => {
		if (casinoCategoryDetails) {
			return casinoCategoryDetails?.rows.map((category) => ({
				...category,
				nameEN: category?.name?.EN,
				createdAt: formatDate(category?.createdAt),
				updatedAt: formatDate(category?.updatedAt),
			}));
		}
		return [];
	}, [casinoCategoryDetails]);

	const fetchData = () => {
		dispatch(
			getCasinoCategoryDetailStart({
				limit: itemsPerPage,
				pageNo: page,
				...filterValues,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [page, itemsPerPage]);

	useEffect(() => {
		if (isCreateCategorySuccess || isEditCategorySuccess) fetchData();
	}, [isCreateCategorySuccess, isEditCategorySuccess]);

	// useEffect(() => {
	// 	dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
	// }, []);

	const handleStatus = () => {
		const { active: status, id } = casinoCategorydata;
		dispatch(
			updateCasinoStatusStart({
				code: 'CASINO_CATEGORY',
				casinoCategoryId: id,
				status: !status,
			})
		);
	};

	const openCasinoCategoryModal = (props) => {
		setCasinoCategorydata(props);
		openModal('activeCreateCategory');
	};

	return {
		formattedCasinoCategoriesData,
		iscasinoCategoryDetailsLoading,
		languageData,
		page,
		setPage,
		itemsPerPage,
		totalCasinoCategriesCount: casinoCategoryDetails?.count,
		modal,
		setModal,
		isEdit,
		setIsEdit,
		job,
		setJob,
		handleStatus,
		openCasinoCategoryModal,
		casinoCategorydata,
		modalStates,
		closeModal,
		onChangeRowsPerPage,
	};
};

export default useCasinoCategoryListing;
