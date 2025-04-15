import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCasinoProvidersDataStart } from '../../../store/actions';

const useCasinoProvidersListing = (filterValues = {}) => {
	const {
		casinoProvidersData,
		isCasinoProvidersDataLoading,
		isCreateProviderSuccess,
		isEditProviderSuccess,
	} = useSelector((state) => state.CasinoManagementData);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const fetchData = () => {
		dispatch(
			getCasinoProvidersDataStart({
				limit: itemsPerPage,
				pageNo: page,
				...filterValues,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [limit, page, itemsPerPage]);

	useEffect(() => {
		if (isCreateProviderSuccess || isEditProviderSuccess) fetchData();
	}, [isCreateProviderSuccess, isEditProviderSuccess]);

	return {
		casinoProvidersData,
		isCasinoProvidersDataLoading,
		itemsPerPage,
		limit,
		setLimit,
		page,
		setPage,
		onChangeRowsPerPage,
	};
};

export default useCasinoProvidersListing;
