import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
// import PropTypes from 'prop-types';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TabsPage from '../../components/Common/TabsPage';
import Breadcrumb from '../../components/Common/Breadcrumb';
import Overview from './Overview';
// import PlayerWallet from './PlayerWallet';
import useUserDetails from './hooks/useUserDetails';
import BetHistory from './BetHistory';
// import SportsBettingHistory from './SportsBettingHistory';
import Transactions from './Transactions';
// import KYCSettings from './KYCSettings';
import YourBonuses from './YourBonuses';
import Notes from './Notes';
import Limits from './Limits';
import { modules } from '../../constants/permissions';
import {
	getReferredUsersStart,
	getUserDetails,
	resetUserLimitData,
} from '../../store/actions';
import usePermission from '../../components/Common/Hooks/usePermission';
import ReferredUsers from './ReferredUsers';
import Docs from './Docs';

const PlayerDetailsPage = () => {
	const { isGranted } = usePermission();
	const dispatch = useDispatch();
	const location = useLocation();
	const [activeTab, setActiveTab] = useState(1);
	const { playerId } = useParams();
	const {
		resetUserLimitSuccess,
		markUserAsInternalSuccess,
		updateSAUserStatusBoolean,
		verifyUserEmailSuccess,
		updateUserTagsSuccess,
		depositToOtherSuccess,
		updateUserInfoSuccess,
		updateuserkyclevel,
	} = useSelector((state) => state.UserDetails);
	const { updateAffiliateComPerc } = useSelector(
		(state) => state.GlobalSetting
	);

	useEffect(() => {
		if (
			resetUserLimitSuccess ||
			markUserAsInternalSuccess ||
			updateSAUserStatusBoolean ||
			verifyUserEmailSuccess ||
			updateUserTagsSuccess ||
			depositToOtherSuccess ||
			updateUserInfoSuccess ||
			updateuserkyclevel ||
			updateAffiliateComPerc
		) {
			dispatch(getUserDetails({ userId: playerId }));
			dispatch(resetUserLimitData());
		}
	}, [
		resetUserLimitSuccess,
		markUserAsInternalSuccess,
		updateSAUserStatusBoolean,
		verifyUserEmailSuccess,
		updateUserTagsSuccess,
		depositToOtherSuccess,
		updateUserInfoSuccess,
		updateuserkyclevel,
		updateAffiliateComPerc,
	]);

	const { userDetails, userDetailsLoading, duplicateUsers } = useUserDetails({
		userId: playerId,
	});

	const toggle = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
		}
		if (tab === 2)
			dispatch(getReferredUsersStart({ userId: userDetails?.userId }));
	};

	const tabData = [
		{
			id: 1,
			title: 'Overview',
			component: (
				<Overview
					userDetails={userDetails}
					userDetailsLoading={userDetailsLoading}
					duplicateUsers={duplicateUsers}
				/>
			),
		},
		{
			id: 2,
			title: 'Referred Users',
			component: <ReferredUsers userId={playerId} />,
		},
		{
			id: 9,
			title: 'Users Documents',
			component: <Docs userId={playerId} />,
		},
		// {
		// 	id: 3,
		// 	title: 'Limits',
		// 	component: (
		// 		<Limits
		// 			userDetails={userDetails}
		// 			userId={playerId}
		// 			userDetailsLoading={userDetailsLoading}
		// 		/>
		// 	),
		// },
		// {
		// 	id: 4,
		// 	title: 'Wallet',
		// 	component: <PlayerWallet userDetails={userDetails} />,
		// },
		// {
		// 	id: 4,
		// 	title: 'Bet History',
		// 	component: <BetHistory userId={playerId} />,
		// 	isHidden: !isGranted(modules.Transactions, 'R'),
		// },
		// {
		// 	id: 6,
		// 	title: 'Sports Betting History',
		// 	component: <SportsBettingHistory userId={playerId} />,
		// 	isHidden: !isGranted(modules.Transactions, 'R'),
		// },
		{
			id: 5,
			title: 'Transactions',
			component: <Transactions userId={playerId} />,
			isHidden: !isGranted(modules.Reports, 'R'),
		},
		{
			id: 3,
			title: 'Bet History',
			component: <BetHistory userId={playerId} />,
			isHidden: !isGranted(modules.Reports, 'R'),
		},
		// {
		// 	id: 8,
		// 	title: 'KYC Settings',
		// 	component: <KYCSettings userDetails={userDetails} userId={playerId} />,
		//   isHidden: !isGranted(modules.KYC, 'R'),
		// },
		// {
		// 	id: 6,
		// 	title: 'Bonuses',
		// 	component: <YourBonuses userId={playerId} />,
		// 	isHidden: !isGranted(modules.Bonus, 'R'),
		// },
		{
			id: 7,
			title: 'Notes',
			component: <Notes userId={playerId} />,
			isHidden: !isGranted(modules.Players, 'R'),
		},
	];

	const leftTitle = userDetailsLoading
		? 'Player Details'
		: `Player Details : ${userDetails?.username ?? ''}`;

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumb
					title="Players"
					breadcrumbItem="Player Details"
					titleLink={
						location?.state?.prevUrl ? location?.state?.prevUrl : '/users'
					}
					leftTitle={
						<>
							<i className="fas fa-angle-left" /> Back
						</>
					}
				/>
				<Breadcrumb leftTitle={leftTitle} />

				<TabsPage activeTab={activeTab} tabsData={tabData} toggle={toggle} />
			</Container>
		</div>
	);
};

// PlayerDetailsPage.propTypes = {
// 	t: PropTypes.func,
// };

// PlayerDetailsPage.defaultProps = {
// 	t: (string) => string,
// };

export default PlayerDetailsPage;
