import React from 'react';
import { Container } from 'reactstrap';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import FormPage from '../../components/Common/FormPage';
import { projectName } from '../../constants/config';
import useCreate from './hooks/useCreateVipTier';
import StepFormTabs from '../../components/Common/StepFormTabs';

const CreateVipTier = () => {
	document.title = projectName;
	const { tabData, activeTab } = useCreate();

	return (
		<div className="page-content">
			<Breadcrumbs
				title="Vip Tier"
				breadcrumbItem="Create"
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

CreateVipTier.propTypes = {
	// t: PropTypes.func.isRequired,
};

export default CreateVipTier;

