import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Row } from 'reactstrap';
import Breadcrumb from '../../../components/Common/Breadcrumb';
import CrudSection from '../../../components/Common/CrudSection';
import ReorderComponent from '../../ReorderCategories';
import { CustomSelectField } from '../../../helpers/customForms';
import useReorderGames from '../hooks/useReorderGames';

const ReorderGames = () => {
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		state,
		setState,
		buttonList,
		formattedState,
		selectedCategory,
		setSelectedCategory,
		casinoCategoryDetails,
		// casinoSubCategoryDetails,
		// selectedSubCategory,
		// setSelectedSubCategory,
	} = useReorderGames();

	return (
		<div className="page-content">
			<div className="container-fluid">
				{showBreadcrumb && (
					<Breadcrumb
						title="Casino Management"
						breadcrumbItem="Reorder Category"
					/>
				)}

				<Row>
					<Card>
						<CrudSection
							buttonList={state.count ? buttonList : []}
							title="Casino Sub Categories Reorder"
						/>
						<CardBody>
							<Row lg={12}>
								<Col lg={6}>
									<CustomSelectField
										label="Category"
										name="category"
										value={selectedCategory}
										isClearable
										type="select"
										onChange={(e) => {
											setState({ rows: [], count: 0 });
											setSelectedCategory(e.target.value);
										}}
										key="my_unique_select_key_Category"
										options={
											<>
												<option value="">Select Category</option>
												{casinoCategoryDetails &&
													casinoCategoryDetails?.rows?.map((c) => (
														<option key={c?.id} value={c?.id}>
															{c?.name?.EN}
														</option>
													))}
											</>
										}
									/>
								</Col>
								{/* {selectedCategory && (
									<Col lg={6}>
										<CustomSelectField
											label="Sub Category"
											name="subCategory"
											value={selectedSubCategory}
											isClearable
											type="select"
											onChange={(e) => setSelectedSubCategory(e.target.value)}
											key="my_unique_select_key_SubCategory"
											options={
												<>
													<option value="">All</option>
													{casinoSubCategoryDetails &&
														casinoSubCategoryDetails?.rows?.map((c) => (
															<option
																key={c?.id}
																value={c?.id}
															>
																{c?.name?.EN}
															</option>
														))}
												</>
											}
										/>
									</Col>
								)} */}
							</Row>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							{selectedCategory ? (
								<Row className="drag-table--header">
									{['ORDER ID', 'GAME NAME (ID)'].map((key) => (
										<Col key={key} className="drag-table--heading">
											{key}
										</Col>
									))}
									<ReorderComponent
										formattedState={formattedState}
										state={state}
										setState={setState}
									/>
								</Row>
							) : (
								<p className="text-center text-danger mt-3">
									{' '}
									Select Category First{' '}
								</p>
							)}
						</CardBody>
					</Card>
				</Row>
			</div>
		</div>
	);
};

export default ReorderGames;
