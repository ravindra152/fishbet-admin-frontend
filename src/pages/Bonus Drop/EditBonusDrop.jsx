import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';
import FormPage from '../../components/Common/FormPage';
import { projectName } from '../../constants/config';
import useEditBonusDrop from './hooks/useEditBonusDrop';

const EditBonusDrop = () => {
	// Set meta title
	document.title = projectName;

	const { header, validation, formFields, galleryList, customComponent } =
		useEditBonusDrop();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title="Bonus Drop"
					breadcrumbItem="Edit"
					titleLink="/bonus-drop"
					leftTitle={
						<>
							<i className="fas fa-angle-left" /> Back
						</>
					}
				/>
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection
								// buttonList={galleryList}
								title="Bonus Drop"
							/>
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

export default EditBonusDrop;
