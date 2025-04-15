/* eslint-disable no-unused-expressions */
import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { modules } from '../../../constants/permissions';
import {
	getCasinoCategoryDetailStart,
	getCasinoGamesStart,
	// getCasinoSubCategoryDetailStart,
	reorderCasinoGamesStart,
	resetCasinoState,
} from '../../../store/actions';

const useReorderGames = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		casinoCategoryDetails,
		casinoSubCategoryDetails,
		casinoGames = null,
	} = useSelector((state) => state.CasinoManagementData);

	const [state, setState] = useState({ rows: [], count: 0 });
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedSubCategory, setSelectedSubCategory] = useState('');

	const fetchData = () => {
		dispatch(
			getCasinoCategoryDetailStart({
				limit: '',
				pageNo: '',
				search: '',
			})
		);
	};

	const formattedGames = useMemo(() => {
		const formattedData = [];
		if (casinoGames && selectedCategory) {
			return casinoGames?.rows?.map((item, index) => ({
				...item,
				reorderId: index + 1,
			}));
		}
		return formattedData;
	}, [casinoGames]);

	useEffect(() => {
		fetchData();
		return () => {
			dispatch(resetCasinoState());
		};
	}, []);

	useEffect(() => {
		if (formattedGames) {
			setState({
				rows: formattedGames,
				count: formattedGames?.length,
			});
		}
	}, [casinoGames]);

	useEffect(() => {
		if (selectedCategory) {
			// dispatch(
			// 	getCasinoSubCategoryDetailStart({
			// 		limit: '',
			// 		pageNo: '',
			// 		search: '',
			// 		casinoCategoryId: selectedCategory,
			// 	})
			// );
			dispatch(
				getCasinoGamesStart({
					limit: '',
					pageNo: '',
					casinoCategoryId: selectedCategory,
					search: '',
					isActive: '',
					selectedProvider: '',
					reorder: 'true',
				})
			);
		}
	}, [selectedCategory]);

	useEffect(() => {
		if (selectedSubCategory) {
			dispatch(
				getCasinoGamesStart({
					limit: '',
					pageNo: '',
					casinoSubCategoryId: selectedSubCategory,
					search: '',
					isActive: '',
					selectedProvider: '',
					reorder: 'true',
				})
			);
		}
	}, [selectedSubCategory]);

	const formattedState = useMemo(
		() =>
			state?.rows?.map((item) => ({
				reorderId: item.reorderId,
				gameName: `${item?.name} (${item?.id})`,
			})),
		[state]
	);

	const handleSave = () => {
		const orderedGames = [];
		const unOrderedGames = [];
		state && state.rows.map((list) => orderedGames.push(list.id));
		casinoGames &&
			casinoGames?.rows.map((list) => unOrderedGames.push(list.id));

		const data = {
			order: [...orderedGames, ...unOrderedGames],
			categoryId: Number(selectedCategory),
			reorder: true,
		};

		dispatch(
			reorderCasinoGamesStart({
				data,
				navigate,
			})
		);
	};

	const buttonList = [
		{
			label: 'Save',
			handleClick: handleSave,
			link: '#!',
			module: modules.CasinoManagement,
			operation: 'U',
		},
	];

	return {
		state,
		setState,
		buttonList,
		handleSave,
		formattedState,
		selectedCategory,
		selectedSubCategory,
		setSelectedCategory,
		casinoCategoryDetails,
		setSelectedSubCategory,
		casinoSubCategoryDetails,
	};
};

export default useReorderGames;
