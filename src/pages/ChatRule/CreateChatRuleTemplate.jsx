/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {
	Row,
	Col,
	Card,
	UncontrolledTooltip,
	Label
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TabsPage from '../../components/Common/TabsPage';
import { CustomInputField, CustomTextEditor } from '../../helpers/customForms';
import CopyToClipboard from 'react-copy-to-clipboard';
import Modal from '../../components/Common/Modal';
import { showToastr } from '../../utils/helpers';

import { useSelector, useDispatch } from 'react-redux';
import { getImageGallery, deleteImageGallery } from '../../store/actions';
import { defaultLanguageId } from '../../constants/config';

const CreateChatRuleTemplate = ({
	languageData,
	validation,
	title,
	setTitle,
	content,
	setContent,
	isEdit = false,
	isView = false,
	setIsView,
	showGallery,
	setShowGallery,
	selectedTab,
	setSelectedTab,
	readOnly=false
}) => {
	const { imageGallery } = useSelector((state) => state.EmailTemplate);
	const [imageComponent, setImageComponent] = useState();
	const [activeTab, setActiveTab] = useState(defaultLanguageId);
	const [label, setLabel] = useState('');
	const [requiredKeyData, setRequiredKeyData] = useState({});
	const [drpPrimaryStates, setDrpPrimaryStates] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		if (activeTab) {
			const tab = tabData?.find((item) => item.id === activeTab);
			setSelectedTab(tab?.title);
		}
	}, [activeTab]);


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

	const toggleDropdown = (tabId) => {
		setDrpPrimaryStates((prevState) => ({
			...prevState,
			[tabId]: !prevState[tabId],
		}));
	};

	const tabData = languageData?.rows?.map((item) => ({
		id: item.languageId,
		title: item.code,
		component: (
			<Row>
				<div className="mb-3">
					<CustomInputField
						label="Chat Rules"
						name="Chat Rules"
						onChange={(e) => {
							e.preventDefault();
							setLabel(e.target.value);
							validation.handleChange(e);
						}}
						value={validation?.values?.title}
						onBlur={validation.handleBlur}
						placeholder="Chat Rules"
						validate={{ required: { value: true } }}
						invalid={
							!!(validation?.touched?.title && validation?.errors?.title)
						}
						isError
						errorMsg={validation?.touched?.title && validation?.errors?.title}
						disabled={isView}
					/>
				</div>
			</Row>
		),
	}));

	useEffect(() => {
		if (activeTab) {
			const selectedTab = tabData?.find((item) => item.id === activeTab);
			validation?.setFieldValue('language', selectedTab?.title);
		}
	}, [activeTab]);

	useEffect(() => {
		if (activeTab) {
			const selectedTab = tabData?.find((item) => item.id === activeTab);
			setTitle({
				...title,
				[selectedTab?.title]: label,
			});
		}
	}, [label, activeTab, validation?.values?.title]);

	// useEffect(() => {
	// 	if (activeTab) {
	// 		const selectedTab = tabData?.find((item) => item.id === activeTab);
	// 		setContent({
	// 			...content,
	// 			[selectedTab?.title]: validation?.values?.content,
	// 		});
	// 	}
	// }, [,activeTab, validation?.values?.content]);

	const toggle = (tab) => {
		if (!isView && ((title?.EN && content?.EN) || isEdit)) {
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

CreateChatRuleTemplate.propTypes = {
	languageData: PropTypes.object,
	validation: PropTypes.object,
	title: PropTypes.object,
	setTitle: PropTypes.func,
	content: PropTypes.object,
	setContent: PropTypes.func,
	isEdit: PropTypes.bool,
	isView: PropTypes.bool,
	setIsView: PropTypes.func,
	showGallery: PropTypes.bool,
	setShowGallery: PropTypes.func,
};

export default CreateChatRuleTemplate;
