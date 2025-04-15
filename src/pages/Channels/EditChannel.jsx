import React from 'react';
import { Container } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import useCreateChannel from './hooks/useCreateChannel';
import StepFormTabs from '../../components/Common/StepFormTabs';

const EditChannel = () => {
	const { tabData, activeTab } = useCreateChannel({
		isEdit: true,
		title: 'Edit Channel',
	});

	return (
		<div className="page-content">
			<Breadcrumbs
				title="Channel"
				breadcrumbItem="Edit"
				titleLink="/chat/channels"
				leftTitle={
					<>
						<i className="fas fa-angle-left" /> Back
					</>
				}
			/>
			<Container fluid>
				<StepFormTabs activeTab={activeTab} dontShowFooter tabsData={tabData} />
			</Container>
		</div>
	);
};

EditChannel.propTypes = {};

export default EditChannel;
