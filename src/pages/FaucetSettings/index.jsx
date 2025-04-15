/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Alert, Container } from 'reactstrap';
import { getFaucetSetting } from '../../network/getRequests';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { projectName } from '../../constants/config';
import Overview from './FormSection/Overview';
import { editFaucetSetting } from '../../network/putRequests';
import { showToastr } from '../../utils/helpers';

const FaucetSettings = ({ t }) => {
	// meta title
	document.title = projectName;

	const [activeTab, setactiveTab] = useState('1');
	const [editable, setEditable] = useState(true);
	const [details, setDetails] = useState([]);
	const [isLodading, setIsLoading] = useState(true);

	const toggle = (tab) => {
		if (activeTab !== tab) {
			setactiveTab(tab);
		}
	};

	const updateData = async (data) => {
		try {
			setIsLoading(true);
			await editFaucetSetting({
				...data,
			});
			showToastr({
				message: `Faucet Settings Updated Successfully`,
				type: 'success',
			});
			setIsLoading(false);
		} catch (error) {
			console.log('error');
		}
	};

	useEffect(() => {
		async function fetchData() {
			await getFaucetSetting().then((res) => {
				setDetails(res?.data?.data?.FaucetSettings || []);
			});
		}
		fetchData();
		setIsLoading(false);
	}, []);

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs title={t('Dashboard')} breadcrumbItem={t('Faucet')} />
				<Alert color="info">
				<h5 className="alert-heading">AMOE (Alternative Method of Entry)</h5>
					<p>
						allows users to participate in promotions without making a purchase,
						ensuring fair and free access for all.{' '}
						Examples include faucets or postal code-based entry options.{' '}
					</p>
				</Alert>
				<Overview
					details={details}
					isTenant={false}
					isEditable={editable}
					setIsEditable={setEditable}
					updateData={updateData}
					isLoading={isLodading}
				/>
			</Container>
		</div>
	);
};

FaucetSettings.propTypes = {
	t: PropTypes.func,
};

FaucetSettings.defaultProps = {
	t: (string) => string,
};

export default FaucetSettings;
