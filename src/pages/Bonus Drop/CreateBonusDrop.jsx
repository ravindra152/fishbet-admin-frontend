import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';
import FormPage from '../../components/Common/FormPage';
import { projectName } from '../../constants/config';
import useCreateBonusDrop from './hooks/useCreateBonusDrop';

const CreateBonusDrop = () => {
	// Set meta title
	document.title = projectName;

	const { header, validation, formFields, galleryList, customComponent } =
		useCreateBonusDrop();

	// Tooltip message for totalClaimsAllowed field
	const tooltipMessage =
		"the maximum number of players to receive the bonus drop. This field determines how many players can claim the drop, and once the limit is reached, no further claims can be made.";

	// Enhance form fields: Add tooltip for 'totalClaimsAllowed' and hide 'Code' field on create
	const enhancedFormFields = formFields
		.filter((field) => field.name !== 'code') // Hide 'Code' field in create mode
		.map((field) => {
			if (field.name === 'totalClaimsAllowed') {
				return {
					...field,
					label: (
						<span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
							<i
								id={`tooltip-${field.name}`}
								className="ms-2 bx bx-info-circle text-primary"
								style={{ cursor: 'pointer' }}
								title={tooltipMessage}
							/>
							{field.label}
						</span>
					),
				};
			}
			return field;
		});

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title="BonusDrop"
					breadcrumbItem="Create"
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
							<CrudSection title="Bonus Drop" />
							<FormPage
								formTitle={header}
								validation={validation}
								responsiveFormFields={enhancedFormFields} // Use filtered & modified fields
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

export default CreateBonusDrop;
