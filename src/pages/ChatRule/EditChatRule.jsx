import React from 'react';
import { Container } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import useCreateChannel from '../Channels/hooks/useCreateChannel';
import StepFormTabs from '../../components/Common/StepFormTabs';

const EditChat = () => {
	const { tabData, activeTab } = useCreateChannel({
		isEdit: true,
		title: 'Edit Chat Rule',
	});

	return (
		<div className="page-content">
			<Breadcrumbs
				title="Chat"
				breadcrumbItem="Edit"
				titleLink="/chat/chat-rule"
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

EditChat.propTypes = {};

export default EditChat;
