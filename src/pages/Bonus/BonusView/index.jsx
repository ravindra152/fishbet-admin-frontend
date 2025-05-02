import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap';
// import Currencies from './Currency';
// import WageringContribution from './WageringContribution';
// import BonusCountry from './BonusCountry';
import Breadcrumb from '../../../components/Common/Breadcrumb';
import TabsPage from '../../../components/Common/TabsPage';
import { getBonusDetails } from '../../../store/actions';
import GeneralDetails from './GeneralInformation';
// import LoyaltyManagement from '../../LoyaltyManagement';
// import Games from './Games';
import Spinners from '../../../components/Common/Spinner';
import BonusUsers from './BonusUsers';

const BonusPreview = () => {
	const dispatch = useDispatch();
	const { bonusId } = useParams();
	const [activeTab, setActiveTab] = useState('1');
	const { bonusDetails, isLoading } = useSelector(
		(state) => state.AllBonusDetails
	);
	const toggle = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
		}
	};
	useEffect(() => {
		if (bonusId) {
			dispatch(getBonusDetails({ bonusId }));
		}
	}, [bonusId]);

	const tabData = [
		{
			id: '1',
			title: 'General',
			component: <GeneralDetails bonusDetails={bonusDetails?.rows[0]} />,
		},
		{
			id: '2',
			title: 'Users',
			component: <BonusUsers bonusDetail={bonusDetails?.rows[0]} />,
		},
		// {
		//   id: '2',
		//   title: 'Currency',
		//   component: <Currencies bonusDetail={bonusDetails} />,
		//   isHidden: ['promotion'].includes(bonusDetails?.bonusType),
		// },
		// {
		//   id: '3',
		//   title: 'Wagering Contribution',
		//   component: (
		//     <WageringContribution
		//       wageringId={bonusDetails?.wageringTemplateId}
		//     />
		//   ),
		//   isHidden: !(
		//     bonusDetails?.bonusType !== 'balance' &&
		//     bonusDetails?.bonusType !== 'freespins' &&
		//     bonusDetails?.bonusType !== 'promotion' &&
		//     bonusDetails?.bonusType !== 'joining' &&
		//     bonusDetails?.bonusType !== 'birthday' &&
		//     bonusDetails?.bonusType !== 'deposit'
		//   ),
		// },
		// {
		//   id: '4',
		//   title: 'Countries',
		//   component: (
		//     <BonusCountry bonusCountryData={bonusDetails?.other?.countries} />
		//   ),
		//   isHidden:
		//     bonusDetails?.bonusType === 'joining' ||
		//     bonusDetails?.bonusType === 'birthday' ||
		//     bonusDetails?.bonusType === 'deposit',
		// },
		// {
		//   id: '5',
		//   title: 'Loyalty',
		//   component: <LoyaltyManagement bonusDetails={bonusDetails?.other} />,
		//   isHidden:
		//     bonusDetails?.bonusType === 'depositCashback' ||
		//     bonusDetails?.bonusType === 'wagering' ||
		//     bonusDetails?.bonusType === 'joining' ||
		//     bonusDetails?.bonusType === 'birthday' ||
		//     bonusDetails?.bonusType === 'deposit',
		// },
		// {
		//   id: '6',
		//   title: 'Games',
		//   component: <Games bonusDetails={bonusDetails?.other} />,
		//   isHidden:
		//     bonusDetails?.bonusType === 'joining' ||
		//     bonusDetails?.bonusType === 'birthday' ||
		//     bonusDetails?.bonusType === 'deposit',
		// },
	];
	return (
		<div className="page-content">
			<Breadcrumb
				title="Bonus"
				breadcrumbItem="View"
				titleLink="/bonus"
				leftTitle={
					<>
						<i className="fas fa-angle-left" /> Back
					</>
				}
			/>
			<Container fluid>
				{isLoading ? (
					<Spinners color="primary" />
				) : (
					<TabsPage activeTab={activeTab} tabsData={tabData} toggle={toggle} />
				)}
			</Container>
		</div>
	);
};

export default BonusPreview;
