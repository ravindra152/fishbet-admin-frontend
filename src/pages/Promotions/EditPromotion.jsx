import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';
import { projectName } from '../../constants/config';
import useEditPromotions from './hooks/useEditPromotions';
import FormPage from '../../components/Common/FormPage';

const EditPromotion = () => {
	// Set meta title
	document.title = projectName;

	const { header, validation, formFields, customComponent, submitPromotionLoading } =
		useEditPromotions();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title="Promotions"
					breadcrumbItem="Edit"
					titleLink="/promotions"
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
							title="Promotions" />
							<FormPage
								formTitle={header}
								validation={validation}
								responsiveFormFields={formFields}
								customComponent={customComponent}
								submitLabel="Submit"
								customColClasses=""
								isSubmitLoading={submitPromotionLoading}
							/>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default EditPromotion;
