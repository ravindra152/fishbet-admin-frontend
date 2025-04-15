import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { isEqual } from 'lodash';
import {
	addGameToSubCategoryStart,
	getCasinoGamesStart,
} from '../../../store/actions';
import { showToastr } from '../../../utils/helpers';
import { getAllCasinoGames } from '../../../network/getRequests';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	staticFilterGamesFields,
	filterGamesValues,
	filterGamesValidationSchema
} from '../formDetails';
import { debounceTime } from '../../../constants/config';

let debounce;
const useCasinoAddGame = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { gameSubCategoryId } = useParams();
	const [newGamesData, setNewGamesData] = useState([]);
	const [newGamesCount, setNewGamesCount] = useState(0);
	const [limit, setLimit] = useState(10);
	const [pageNo, setPageNo] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [newGamepageNo, setNewGamepageNo] = useState(1);
	const [newGameItemsPerPage, setNewGameItemsPerPage] = useState(10);
	const prevValues = useRef(null);
	const isFirst = useRef(true);
	const [isFilterChange, setIsFilterChanged] = useState(false);
	
	const { casinoGames, isCasinoGamesLoading } = useSelector(
		(state) => state.CasinoManagementData
	);

	const getSelectedGame = async (values) => {
		try {
			const response = await getAllCasinoGames({
				limit: newGameItemsPerPage,
				pageNo: newGamepageNo,
				casinoCategoryId: gameSubCategoryId,
				include: true,
				...values,
			});
			setNewGamesData(response.data.data.casinoGames?.rows);
			setNewGamesCount(response.data.data.casinoGames?.count);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (gameSubCategoryId) {
			dispatch(
				getCasinoGamesStart({
					limit,
					pageNo,
					casinoCategoryId: gameSubCategoryId,
					include: false,
				})
			);
		}
	}, [gameSubCategoryId, limit, pageNo, itemsPerPage]);

	useEffect(() => {
		getSelectedGame();
	}, [newGamepageNo, newGameItemsPerPage]);


	const formattedGames = useMemo(() => {
		if (casinoGames?.rows?.length && newGamesData?.length) {
			const newGamesIds = new Set(newGamesData.map(({ id }) => id)); // Efficient lookup using Set
			return casinoGames.rows.reduce((filteredGames, game) => {
				if (!newGamesIds.has(game.id)) {
					filteredGames.push(game);
				}
				return filteredGames;
			}, []);
		}
		return casinoGames?.rows || [];
	}, [casinoGames, newGamesData]);
	


	const handleAddGame = (e, row) => {
		e.preventDefault();

		setNewGamesData((prevData) => {
			if (!prevData.find((game) => game.casinoGameId === row.casinoGameId)) {
				return [...prevData, row];
			}
			showToastr({
				message: 'Game already added',
				type: 'error',
			});
			return prevData;
		});
	};

	const handleRemoveGame = (e, casinoGameId) => {
		e.preventDefault();

		setNewGamesData((prevData) =>
			prevData.filter((game) => game.casinoGameId !== casinoGameId)
		);
	};

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const onChangeNewGameTableRowsPerPage = (value) => {
		setNewGameItemsPerPage(value);
	};

	const handleSubmitClick = () => {
		if (newGamesData.length) {
			dispatch(
				addGameToSubCategoryStart({
					categoryId: parseInt(gameSubCategoryId, 10),
					games: newGamesData?.map((game) => game.casinoGameId),
					navigate,
				})
			);
		}
	};

	const handleFilter = (values) => {
		getSelectedGame(values);
	};

	const { validation, formFields } = useForm({
		initialValues: filterGamesValues(),
		validationSchema: filterGamesValidationSchema(),
		// onSubmitEntry: handleFilter,
		staticFormFields: staticFilterGamesFields(),
	});

	useEffect(() => {
		if (!isFirst.current && !isEqual(validation.values, prevValues.current)) {
			setIsFilterChanged(true);
			debounce = setTimeout(() => {
				handleFilter(validation.values);
			}, debounceTime);
			prevValues.current = validation.values;
		}
		isFirst.current = false;
		if (isEqual(filterGamesValues(), validation.values)) {
			setIsFilterChanged(false);
		}
		return () => clearTimeout(debounce);
	}, [validation.values]);

	return {
		limit,
		setLimit,
		pageNo,
		setPageNo,
		itemsPerPage,
		setItemsPerPage,
		formattedGames,
		isCasinoGamesLoading,
		totalRecords: casinoGames?.count,
		onChangeRowsPerPage,
		handleAddGame,
		newGamesData,
		handleRemoveGame,
		newGamepageNo,
		setNewGamepageNo,
		newGameItemsPerPage,
		setNewGameItemsPerPage,
		onChangeNewGameTableRowsPerPage,
		handleSubmitClick,
		newGamesCount,
		filterSelectedFields: formFields,
		filterSelectedValidation: validation,
		isFilterChange,
	};
};

export default useCasinoAddGame;