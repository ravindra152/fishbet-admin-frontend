/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Container, Col, Card, CardBody } from 'reactstrap';
import TabsPage from '../../components/Common/TabsPage';

// Breadcrumb
import CrudSection from '../../components/Common/CrudSection';
import { projectName } from '../../constants/config';

import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';
import usePlayerEmails from './hooks/usePlayerEmails';

const PlayerEmails = () => {
	// meta title
	document.title = projectName;
	const { isGranted } = usePermission();
  const { activeTab, toggle, tabData, buttonList } = usePlayerEmails();

	return (
		<div className="page-content">
			{/* {isGranted(modules.EmailTemplate, 'R') 
			&& ( */}
				<Container fluid>
          <Col lg="12">
						<Card>
              <CrudSection buttonList={buttonList} title="E-mail Players"  />
							<CardBody>
                <TabsPage activeTab={activeTab} tabsData={tabData} toggle={toggle} />
              </CardBody>
            </Card>
          </Col>
				</Container>
			{/* // )} */}
		</div>
	);
};

export default PlayerEmails;
