import React from 'react';
import { Container } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import useCreateBonus from './hooks/useCreateBonus';
import Spinners from '../../components/Common/Spinner';
import NewGeneral from './FormSections/NewGeneral';

const EditBonus = () => {
	const { isLoading, onSubmit, setAllFields, bonusDetailsInfo } =
		useCreateBonus({
			isEdit: true,
		});

	return (
		<div className="page-content">
			<Breadcrumbs
				title="Bonus"
				breadcrumbItem="Edit"
				titleLink="/bonus"
				leftTitle={
					<>
						<i className="fas fa-angle-left" /> Back
					</>
				}
			/>
			<Container fluid>
				{isLoading ? (
					<Spinners
						color="primary"
						className="position-absolute top-50 start-50"
					/>
				) : (
					<NewGeneral
						isLoading={isLoading}
						onSubmit={onSubmit}
						bonusDetails={bonusDetailsInfo}
						isEdit
						isSubmit
						setAllFields={setAllFields}
					/>
				)}
			</Container>
		</div>
	);
};

EditBonus.propTypes = {};

export default EditBonus;
