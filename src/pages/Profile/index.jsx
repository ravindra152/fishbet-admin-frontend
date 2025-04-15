/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { getSiteConfiguration } from '../../network/getRequests';
import Breadcrumbs from '../../components/Common/Breadcrumb';

import { projectName } from '../../constants/config';
import { getSuperAdminStart } from '../../store/auth/permissionDetails/actions';
import {
	getLanguagesStart,
	updateProfileStart,
	// updateSiteConfigurationStart,
} from '../../store/actions';

import Overview from './FormSections/Overview';
// import SiteConfig from './FormSections/SiteConfiguration';
import Password from './FormSections/Password';
import Permissions from './FormSections/Permissions';
import TabsPage from '../../components/Common/TabsPage';

const ProfilePage = ({ t }) => {
	// meta title
	document.title = projectName;

	const [activeTab, setactiveTab] = useState('1');
	const [editable, setEditable] = useState(true);
	// const [showeditableButton, setShowEditableButton] = useState(true);
	const [, setDetails] = useState([]);
	const toggle = (tab) => {
		if (activeTab !== tab) {
			setactiveTab(tab);
		}
	};
	const { superAdminUser, isSuperAdminLoading } = useSelector(
		(state) => state.PermissionDetails
	);
	// const { languageData, languageDataLoading } = useSelector(
	// 	(state) => state.CasinoManagementData
	// );
	const { resetProfilePasswordLoading } = useSelector(
		(state) => state.ProfileData
	);
	const roles = useSelector((state) => state.AdminRoles.roles);

	const dispatch = useDispatch();

	const updateData = (data) => {
		dispatch(
			updateProfileStart({
				data,
				isTenant: false,
			})
		);
	};

	// const updateSiteConfiguration = (data) => {
	// 	dispatch(
	// 		updateSiteConfigurationStart({
	// 			data,
	// 			isTenant: false,
	// 		})
	// 	);
	// 	setShowEditableButton(false);
	// };

	useEffect(() => {
		dispatch(getSuperAdminStart());
	}, []);

	useEffect(() => {
		// dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
		async function fetchData() {
			await getSiteConfiguration().then((res) => {
				setDetails(res?.data?.data?.siteInformation);
			});
		}
		fetchData();
	}, []);

	const tabData = [
		{
			id: '1',
			title: 'Overview',
			component: (
				<Overview
					details={superAdminUser}
					isTenant={false}
					isEditable={editable}
					setIsEditable={setEditable}
					updateData={updateData}
					isLoading={isSuperAdminLoading}
					defaultplaceholder={roles}
				/>
			),
		},
		// {
		// 	id: '2',
		// 	title: 'Site Keys',
		// 	isHidden: !details?.length,
		// 	component: (
		// 		<SiteConfig
		// 			details={details}
		// 			languageData={languageData}
		// 			editableSiteConfig={showeditableButton}
		// 			setEditableSiteConfig={setShowEditableButton}
		// 			updateSiteConfiguration={updateSiteConfiguration}
		// 			isLanguageDataLoading={!languageDataLoading}
		// 		/>
		// 	),
		// },
		{
			id: '3',
			title: 'Reset Password',
			component: (
				<Password loading={resetProfilePasswordLoading} isTenant={false} />
			),
		},
		{
			id: '4',
			title: 'Permissions',
			component: <Permissions details={superAdminUser} />,
		},
		// { id: '5', title: 'Tree', component: <CardText>default2</CardText> },
	];
	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs title={t('Dashboard')} breadcrumbItem={t('Profile')} />
				<TabsPage activeTab={activeTab} tabsData={tabData} toggle={toggle} />
			</Container>
		</div>
	);
};

ProfilePage.propTypes = {
	t: PropTypes.func,
};

ProfilePage.defaultProps = {
	t: (string) => string,
};

export default ProfilePage;
