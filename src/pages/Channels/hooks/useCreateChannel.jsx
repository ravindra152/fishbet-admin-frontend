import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import General from '../FormSections/General';

const useCreateChannel = ({ isEdit, title }) => {
	const { channelId } = useParams();
	const location = useLocation();
	const { channelData } = location.state || {};
	const tabData = [
		{
			id: 'general',
			title,
			component: (
				<General
					channelDetails={channelData}
					isEdit={isEdit}
					channelId={channelId}
				/>
			),
		},
	];

	return {
		tabData,
		activeTab: 'general',
	};
};

export default useCreateChannel;
