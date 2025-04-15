import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonList from '../../../components/Common/ButtonList';

const useButtonList = () => {
	const navigate = useNavigate();
	const handleAddClick = (e) => {
		e.preventDefault();
		navigate('add');
	};

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleAddClick,
			link: '#!',
			// module: modules.Bonus,
			operation: 'C',
		},
	]);

	const actionList = <ButtonList buttonList={buttonList} />;

	return {
		actionList,
	};
};

export default useButtonList;
