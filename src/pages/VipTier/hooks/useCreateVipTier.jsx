import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createVipTier, updateVipTier } from '../../../store/actions';
import General from '../components/General';
import Rewards from '../components/Rewards';

const useCreate = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { vipTierId } = useParams(); // Check if we're editing an existing VIP Tier
	const [activeTab, setActiveTab] = useState('general');
	const [selectedGames, setSelectedGames] = useState([]);
	const [vipData, setVipData] = useState({});
	const [rewardsData, setRewardsData] = useState({});

	const { createVipTierLoading, updateVipTierLoading } = useSelector((state) => state.VipTier);

	const isEditMode = Boolean(vipTierId); // True if vipTierId exists

	const toggleTab = (tab, reward = {}) => {
		if (tab === 'submit') {
			const data = {
				...vipData,
				rewards: [{ ...reward, exclusiveGames: selectedGames.map(game => game.casinoGameId) }]
			};

			if (data?.vipTierId && typeof data.icon === 'string') {
				delete data.icon;
			}

			if (!createVipTierLoading || !updateVipTierLoading) {
				if (!data?.vipTierId) {
					dispatch(
						createVipTier({
							values: data,
							navigate,
						})
					);
				} else {
					dispatch(
						updateVipTier({
							values: data,
							navigate,
						})
					);
				}
			}
		} else if (activeTab !== tab) {
			setActiveTab(tab);
		}
	};

	const tabsToShow = [
		{
			id: 'general',
		},
		{
			id: 'rewards',
		},
	];

	const tabData = [
		{
			id: 'general',
			title: isEditMode ? 'Update Vip Tier' : 'Create Vip Tier', // Dynamically set title
			component: (
				<General
					isLoading={false}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					submitButtonLoading={isEditMode ? updateVipTierLoading : createVipTierLoading}
					tabsToShow={tabsToShow}
					toggleTab={toggleTab}
					setVipData={setVipData}
				/>
			),
		},
		{
			id: 'rewards',
			title: isEditMode ? 'Update Rewards' : 'Create Rewards', // Dynamically set title
			component: (
				<Rewards
					setActiveTab={setActiveTab}
					selectedGames={selectedGames}
					setSelectedGames={setSelectedGames}
					submitButtonLoading={isEditMode ? updateVipTierLoading : createVipTierLoading}
					tabsToShow={tabsToShow}
					activeTab={activeTab}
					toggleTab={toggleTab}
					setRewardsData={setRewardsData}
				/>
			),
		},
	];

	return {
		tabData,
		activeTab,
		setVipData,
		setRewardsData,
	};
};

export default useCreate;
