import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
// import TabsPage from '../../components/Common/TabsPage';
// import TransactionLimit from './TransactionLimit';
// import AffiliateSetting from './AffiliateSetting';
// import ReferralSetting from './ReferralSetting';

import SiteConfig from '../Profile/FormSections/SiteConfiguration';
import { getSiteConfiguration } from '../../network/getRequests';
import {
	getLanguagesStart,
	// updateProfileStart,
	updateSiteConfigurationStart,
} from '../../store/actions';

const GlobalSetting = ({ t }) => {
	// const [activeTab, setactiveTab] = useState('1');
	const dispatch = useDispatch();
	const [details, setDetails] = useState([]);
	const [showeditableButton, setShowEditableButton] = useState(true);

	const { languageData, languageDataLoading } = useSelector(
		(state) => state.CasinoManagementData
	);
	const updateSiteConfiguration = (data) => {
		dispatch(
			updateSiteConfigurationStart({
				data,
				isTenant: false,
			})
		);
		setShowEditableButton(false);
	};

	useEffect(() => {
		// dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
		async function fetchData() {
			await getSiteConfiguration().then((res) => {
				setDetails(res?.data?.data?.siteInformation || []);
			});
		}
		fetchData();
	}, []);
	// const toggle = (tab) => {
	// 	if (activeTab !== tab) {
	// 		setactiveTab(tab);
	// 	}
	// };

	// const tabData = [
	// 	{
	// 		id: '1',
	// 		title: 'Transaction Limits',
	// 		component: <SiteConfig
	// 					details={details}
	// 					languageData={languageData}
	// 					editableSiteConfig={showeditableButton}
	// 					setEditableSiteConfig={setShowEditableButton}
	// 					updateSiteConfiguration={updateSiteConfiguration}
	// 					isLanguageDataLoading={!languageDataLoading}
	// 				/>
	// 	},
	// {
	// 	id: '2',
	// 	title: 'Affiliate',
	// 	component: <SiteConfig />,
	// },
	// {
	// 	id: '3',
	// 	title: 'Referral',
	// 	component: <ReferralSetting />,
	// },
	// ];
	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title={t('Site Configuration')}
					breadcrumbItem={t('Global Settings')}
				/>
				{/* <TabsPage activeTab={activeTab} tabsData={tabData} toggle={toggle} /> */}
				<SiteConfig
					details={details}
					languageData={languageData}
					editableSiteConfig={showeditableButton}
					setEditableSiteConfig={setShowEditableButton}
					updateSiteConfiguration={updateSiteConfiguration}
					isLanguageDataLoading={!languageDataLoading}
				/>
			</Container>
		</div>
	);
};

GlobalSetting.propTypes = {
	t: PropTypes.func,
};

GlobalSetting.defaultProps = {
	t: (string) => string,
};

export default GlobalSetting;
