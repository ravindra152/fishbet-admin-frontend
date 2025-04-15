/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpinWheelListStart } from '../../../store/actions';

const useSpinWheelListing = () => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const {
		spinWheelList,
		loading = false,
	} = useSelector((state) => state.SpinWheelList);

	const fetchData = () => {
		dispatch(
			fetchSpinWheelListStart({
				limit: itemsPerPage,
				pageNo: currentPage,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [currentPage, itemsPerPage]);

	// useEffect(() => {
	// 	if (isEditSpinWheelListSuccess) fetchData();
	// }, [isEditSpinWheelListSuccess]);

	const formattedSpinWheelList = useMemo(() => {
		const formattedValues = [];
		if (spinWheelList) {
			spinWheelList.rows.map((spinWheelRec) =>
				formattedValues.push({
					...spinWheelRec,
				})
			);
		}
		return formattedValues;
	}, [spinWheelList]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	return {
		fetchData,
		currentPage,
		setCurrentPage,
		totalSpinWheelListCount: spinWheelList?.count,
		loading,
		formattedSpinWheelList,
		itemsPerPage,
		onChangeRowsPerPage,
	};
};

export default useSpinWheelListing;
