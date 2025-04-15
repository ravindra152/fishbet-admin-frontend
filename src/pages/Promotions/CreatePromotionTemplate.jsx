/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {
	Row,
	Col,
	Card,
	UncontrolledTooltip,
	Label,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Button,
	FormFeedback,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TabsPage from '../../components/Common/TabsPage';
import { CustomInputField } from '../../helpers/customForms';
import CopyToClipboard from 'react-copy-to-clipboard';
import Modal from '../../components/Common/Modal';
import CodeEditor from './CodeEditor';
import { showToastr } from '../../utils/helpers';

import { useSelector, useDispatch } from 'react-redux';
import { getImageGallery, deleteImageGallery } from '../../store/actions';
import { defaultLanguageCode, defaultLanguageId } from '../../constants/config';

const safeStringify = (object) =>
	JSON.stringify(object)?.replace(/</g, '\\u003c');

const CreatePromotionTemplate = ({
	languageData,
	validation,
	// promotionKeys,
	title,
	setTitle,
	content,
	setContent,
	description,
	setDescription,
	promotionByPage,
	isEdit = false,
	isView = false,
	setIsView,
	showGallery,
	setShowGallery,
	selectedTab,
	setSelectedTab,
	hideDetails,
	isCreate = false,
}) => {
	const { imageGallery } = useSelector((state) => state.EmailTemplate);
	const [imageComponent, setImageComponent] = useState();
	const [activeTab, setActiveTab] = useState(defaultLanguageId);
	const [template, setTemplate] = useState('');
	const [label, setLabel] = useState(
		promotionByPage?.title?.[selectedTab] || ''
	);
	const [detail, setDetail] = useState(
		promotionByPage?.description?.[selectedTab] || ''
	);
	const [requiredKeyData, setRequiredKeyData] = useState({});
	// const [drpPrimaryStates, setDrpPrimaryStates] = useState({});
	const [data, setData] = useState(
		promotionByPage?.content?.[selectedTab] || ''
	);
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	if (promotionByPage?.content?.[selectedTab]) {
	// 		setData(promotionByPage?.content?.[selectedTab]);
	// 	}
	// }, [promotionByPage?.content?.[selectedTab]]);

	// useEffect(() => {
	// 	if (promotionKeys?.dynamicKeys && Object.keys(promotionKeys?.dynamicKeys)?.length) {
	// 		let tempDataAll = {};
	// 		let tempData = {};
	// 		const dynamicKeys = promotionKeys?.dynamicKeys;
	// 		dynamicKeys.forEach((item) => {
	// 			tempDataAll = { ...tempDataAll, [item.key]: item.description };
	// 			if (item.required) {
	// 				tempData = { ...tempData, [item.key]: item.description };
	// 			}
	// 		});
	// 		setRequiredKeyData(tempData);
	// 	}
	// }, [promotionKeys?.dynamicKeys]);

	useEffect(() => {
		if (showGallery) {
			dispatch(getImageGallery());
		}
	}, [showGallery]);

	const deleteImage = (f) => {
		const data = {
			imageUrl: f.fileName,
		};
		dispatch(deleteImageGallery(data));
	};

	useEffect(() => {
		if (imageGallery?.length) {
			setImageComponent(
				<div
					className="d-flex justify-content-center flex-wrap gap-3 dropzone-previews mt-3"
					id="file-previews"
				>
					{imageGallery.map((f, i) => (
						<Col key={`${i}-file`}>
							<Card className="align-items-center mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
								<div className="p-2">
									<CopyToClipboard
										text={`${f.fileName}`}
										onCopy={() => {
											setShowGallery(false);
											showToastr({
												message: 'Copied To ClipBoard',
												type: 'success',
											});
										}}
									>
										<img
											data-dz-thumbnail=""
											height="200"
											width="250"
											className="rounded me-2 bg-light"
											alt={f.name}
											src={`${f.fileName}`}
										/>
									</CopyToClipboard>
									<Col className="position-absolute top-0 end-0">
										<Link
											to="#"
											className="btn btn-sm btn-soft-danger"
											onClick={() => deleteImage(f)}
										>
											<i
												className="mdi mdi-delete-outline"
												id="deletetooltip"
											/>
											<UncontrolledTooltip
												placement="top"
												target="deletetooltip"
											>
												Delete
											</UncontrolledTooltip>
										</Link>
									</Col>
								</div>
							</Card>
						</Col>
					))}
				</div>
			);
		} else {
			setImageComponent(
				<div className="text-center text-danger">No Images Found</div>
			);
		}
	}, [imageGallery]);

	// const toggleDropdown = (tabId) => {
	// 	setDrpPrimaryStates((prevState) => ({
	// 		...prevState,
	// 		[tabId]: !prevState[tabId],
	// 	}));
	// };

	const tabData = languageData?.rows?.map((item) => ({
		id: item.languageId,
		title: item.code,
		component: (
			<Row>
				<Col className="text-end">
					{/* <div className="btn-group">
						<ButtonDropdown
							isOpen={drpPrimaryStates[item.languageId] || false}
							toggle={() => toggleDropdown(item.languageId)}
						>
							<Button id="caret" type="button" color="primary" hidden={isView}>
								Dynamic Keys
							</Button>
							<DropdownToggle caret color="primary" hidden={isView}>
								<i className="mdi mdi-chevron-down" />
							</DropdownToggle>
							<DropdownMenu>
								{promotionKeys?.dynamicKeys?.map?.((item, index) => (
									<DropdownItem
										key={index}
										onClick={() => {
											requiredKeyData
												? setRequiredKeyData({
														...requiredKeyData,
														[item]: promotionKeys?.keyDescription[item],
												  })
												: setRequiredKeyData({
														[item]: promotionKeys?.keyDescription[item],
												  });
										}}
									>
										{`${item} `}
										{item.required ? '(Required)' : '(Optional)'}
									</DropdownItem>
								))}
							</DropdownMenu>
						</ButtonDropdown>
					</div> */}
				</Col>
				<div className="mb-3">
					<CustomInputField
						label="Title"
						name="title"
						onChange={(e) => {
							e.preventDefault();
							setLabel(e.target.value);
							if (selectedTab)
								setTitle((prev) => ({
									...prev,
									[selectedTab]: e.target.value,
								}));
							validation.handleChange(e);
						}}
						value={validation?.values?.title}
						onBlur={validation.handleBlur}
						placeholder="Title"
						validate={{ required: { value: true } }}
						invalid={
							!!(validation?.touched?.title && validation?.errors?.title)
						}
						isError
						errorMsg={validation?.touched?.title && validation?.errors?.title}
						disabled={isView}
					/>
				</div>
				{!hideDetails && (
					<div className="mb-3">
						<CustomInputField
							label="Description"
							name="description"
							onChange={(e) => {
								e.preventDefault();
								setDetail(e.target.value);
								if (selectedTab)
									setDescription((prev) => ({
										...prev,
										[selectedTab]: e.target.value,
									}));
								validation.handleChange(e);
							}}
							value={validation?.values?.description}
							onBlur={validation.handleBlur}
							placeholder="Description"
							validate={{ required: { value: true } }}
							invalid={
								!!(
									validation?.touched?.description &&
									validation?.errors?.description
								)
							}
							isError
							errorMsg={
								validation?.touched?.description &&
								validation?.errors?.description
							}
							disabled={isView}
						/>
					</div>
				)}
				{!hideDetails && (
					<Col sm="12">
						{' '}
						<Label className="form-label">Content</Label>
						<span className="text-danger"> *</span>
						{validation.touched?.content && validation.errors?.content ? (
							<FormFeedback type="invalid" className="d-block">
								{validation.errors?.content}
							</FormFeedback>
						) : null}
						<CodeEditor
							promotionByPage={promotionByPage}
							dynamicData={safeStringify(requiredKeyData, null, 2)}
							HTML={data || ''}
							initial="HTML"
							mobileQuery={800}
							height="70vh"
							setTemplate={setTemplate}
							themeTransitionSpeed={150}
							setRequiredKeyData={setRequiredKeyData}
							selectedTab={selectedTab}
							setTemp={setTemplate}
							validation={validation}
							disabled={isView}
							setContent={setContent}
						/>
					</Col>
				)}
			</Row>
		),
	}));

	useEffect(() => {
		if (activeTab) {
			const tab = tabData?.find((item) => item.id === activeTab);
			if (tab?.title) setSelectedTab(tab?.title);
		}
	}, [activeTab]);

	// useEffect(() => {
	// 	if (activeTab) {
	// 		const selectedTab = tabData?.find((item) => item.id === activeTab);
	// 		validation?.setFieldValue('language', selectedTab?.title);
	// 	}
	// }, [activeTab]);

	// useEffect(() => {
	// 	if (activeTab) {
	// 		const selectedTab = tabData?.find((item) => item.id === activeTab);
	//     if (!selectedTab?.title)  return;
	// 		setTitle({
	// 			...title,
	// 			[selectedTab?.title]: label,
	// 		});
	// 	}
	// }, [label, activeTab, validation?.values?.title]);

	// useEffect(() => {
	// 	if (activeTab) {
	// 		const selectedTab = tabData?.find((item) => item.id === activeTab);
	//     if (!selectedTab?.title)  return;
	// 		setDescription({
	// 			...description,
	// 			[selectedTab?.title]: detail,
	// 		});
	// 	}
	// }, [detail, activeTab, validation?.values?.description]);

	// useEffect(() => {
	// 	if (activeTab) {
	// 		const selectedTab = tabData?.find((item) => item.id === activeTab);
	//     if (!selectedTab?.title)  return;
	// 		setContent({
	// 			...content,
	// 			[selectedTab?.title]: template,
	// 		});
	// 	}
	// }, [template, activeTab, validation?.values?.content]);

	useEffect(() => {
		// Set title values
		setLabel(title?.[selectedTab] ? title?.[selectedTab] : '');
		if (selectedTab)
			setTitle((prev) => ({
				...prev,
				[selectedTab]: title?.[selectedTab] ? title?.[selectedTab] : '',
			}));
		// Set Description values
		setDetail(description?.[selectedTab] ? description?.[selectedTab] : '');
		if (selectedTab)
			setDescription((prev) => ({
				...prev,
				[selectedTab]: description?.[selectedTab]
					? description?.[selectedTab]
					: '',
			}));
		// Set Content values
		setTemplate(content?.[selectedTab] ? content?.[selectedTab] : '');
		if (selectedTab)
			setContent((prev) => ({
				...prev,
				[selectedTab]: content?.[selectedTab] ? content?.[selectedTab] : '',
			}));

		if (selectedTab)
			validation.setValues((prev) => ({
				...prev,
				title: title?.[selectedTab] ? title?.[selectedTab] : '',
				description: description?.[selectedTab]
					? description?.[selectedTab]
					: '',
				content: content?.[selectedTab] ? content?.[selectedTab] : '',
			}));
	}, [selectedTab]);

	const toggle = (tab) => {
		if (
			!isView &&
			title?.EN &&
			(hideDetails || (content?.EN && description?.EN))
		) {
			setActiveTab(tab);
		} else if (isCreate) {
			setActiveTab(tab);
		} else if (!isView) {
			showToastr({
				message:
					'You must enter data for English language before switching to another language ',
				type: 'error',
			});
		}
	};

	return (
		<>
			<TabsPage activeTab={activeTab} tabsData={tabData} toggle={toggle} />
			<Modal
				openModal={showGallery}
				toggleModal={() => setShowGallery(!showGallery)}
				headerTitle="Gallery"
				hideFooter={true}
				children={imageComponent}
				className="modal-dialog modal-lg"
			/>
		</>
	);
};

CreatePromotionTemplate.propTypes = {
	languageData: PropTypes.object,
	validation: PropTypes.object,
	// promotionKeys: PropTypes.object,
	title: PropTypes.object,
	setTitle: PropTypes.func,
	content: PropTypes.object,
	setContent: PropTypes.func,
	promotionByPageId: PropTypes.object,
	isEdit: PropTypes.bool,
	isView: PropTypes.bool,
	setIsView: PropTypes.func,
	showGallery: PropTypes.bool,
	setShowGallery: PropTypes.func,
};

export default CreatePromotionTemplate;
