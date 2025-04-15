import React from 'react';
import { Alert, Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import useSpinWheelListing from './hooks/useSpinWheelListing';
import FormModal from '../../components/Common/FormModal';
import useUpdateSpinWheelList from './hooks/useUpdateSpinWheelList';
import CrudSection from '../../components/Common/CrudSection';
// import React from 'react';
// import Breadcrumbs from '../../components/Common/Breadcrumb';

const SpinWheel = () => {
	const {
		fetchData,
		currentPage,
		setCurrentPage,
		totalSpinWheelListCount,
		loading,
		formattedSpinWheelList,
		itemsPerPage,
		onChangeRowsPerPage,
	} = useSpinWheelListing();

	const {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		columns,
		isEditSpinWheelLoading,
		buttonList,
	} = useUpdateSpinWheelList({ fetchData });
	return (
		<div className="page-content">
			<Container fluid>
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection
								buttonList={buttonList}
								title="Spin Wheel Configuration"
							/>
							{/* <Breadcrumbs title={('Dashboard')} breadcrumbItem={('Faucet')} /> */}

							<div className="mt-8 p-1">
								<Alert color="info" className="p-4 rounded-lg shadow-lg">
									<h5 className="alert-heading font-bold text-lg">
										Player Engagement
									</h5>
									<p className="text-sm">
										The Spin Wheel rewards users with GC (Gold Coins) and SC
										(Sweepstakes Coins) based on predefined priority settings.{' '}
										GC and SC prizes are allocated according to configured
										probabilities, ensuring fair distribution.
										<br />
										Higher priority rewards are given preference, enhancing user
										engagement and excitement while maintaining a balanced
										gaming experience.
									</p>
								</Alert>
							</div>

							<CardBody>
								<TableContainer
									// key={formattedSpinWheelList}
									isLoading={loading}
									columns={columns}
									data={formattedSpinWheelList}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									// paginationDiv="col-sm-12 col-md-7"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalSpinWheelListCount}
									isManualPagination
									onChangePagination={setCurrentPage}
									currentPage={currentPage}
									changeRowsPerPageCallback={onChangeRowsPerPage}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<FormModal
					isOpen={isOpen}
					toggle={() => setIsOpen((prev) => !prev)}
					header={header}
					validation={validation}
					formFields={formFields}
					submitLabel="Submit"
					customColClasses="col-md-12"
					isSubmitLoading={isEditSpinWheelLoading}
				/>
			</Container>
		</div>
	);
};

export default SpinWheel;
