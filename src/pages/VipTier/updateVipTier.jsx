import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
import { useLocation } from 'react-router-dom';
// const { state } = location;
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { projectName } from '../../constants/config';
import useCreate from './hooks/useCreateVipTier';
import StepFormTabs from '../../components/Common/StepFormTabs';

const UpdateVipTier = () => {
	document.title = projectName;
	const { state } = useLocation();
	const { tabData, activeTab } = useCreate();

	// useEffect(() => {
	// 	validation.setValues(getInitialValues(state.row));
	// 	console.log(state.row, "---------------------------")
	// }, []);

	return (
		<div className="page-content">
			<Breadcrumbs
				title="Vip Tier"
				breadcrumbItem="Edit"
				titleLink="/vip-tier"
				leftTitle={
					<>
						<i className="fas fa-angle-left" /> Back
					</>
				}
			/>
			<Container fluid>
				<StepFormTabs
					activeTab={activeTab}
					tabsData={tabData}
					submitButtonText="Create"
				/>
			</Container>
		</div>
	);
};

UpdateVipTier.propTypes = {
	// t: PropTypes.func.isRequired,
};

export default UpdateVipTier;
