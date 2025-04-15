import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';
import FormPage from '../../components/Common/FormPage';
import { projectName } from '../../constants/config';
import useCreateNotice from './hooks/useCreateNotice';

const CreateNotice = () => {
	// Set meta title
	document.title = projectName;

	const { header, validation, formFields, customComponent } =
		useCreateNotice();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title="Player engagement"
					breadcrumbItem="Create"
					titleLink="/notice"
					leftTitle={
						<>
							<i className="fas fa-angle-left" /> Back
						</>
					}
				/>
				<Row>
					<Col lg="12">
						<Card>
							{/* <CrudSection
								// buttonList={galleryList}
								title="CMS"
							/> */}
							<FormPage
								formTitle={header}
								validation={validation}
								responsiveFormFields={formFields}
								customComponent={customComponent}
								submitLabel="Submit"
								customColClasses=""
								isSubmitLoading={false}
							/>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default CreateNotice;
