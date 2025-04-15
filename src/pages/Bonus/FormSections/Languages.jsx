/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import TabsPage from '../../../components/Common/TabsPage';
import {
	CustomInputField,
	CustomTextEditor,
} from '../../../helpers/customForms';

const SingleLangComponent = ({
	lang,
	setLangContent,
	langContent,
	bonusDetails,
}) => (
	<>
		<Col className="mb-3" sm={6}>
			<CustomInputField
				placeholder="Enter Bonus Title"
				label="Bonus Title"
				value={langContent.promoTitle[lang]}
				onChange={(e) =>
					setLangContent((prev) => ({
						...prev,
						promoTitle: { ...prev.promoTitle, [lang]: e.target.value },
					}))
				}
				max="60"
			/>
		</Col>
		<Col className="mb-3">
			<CustomTextEditor
				placeholder="Enter Description"
				value={langContent.desc[lang]}
				label="Description"
				defaultValue={bonusDetails?.description?.[lang]}
				type="textarea"
				onValueChange={(value) =>
					setLangContent((prev) => ({
						...prev,
						desc: { ...prev.desc, [lang]: value },
					}))
				}
			/>
		</Col>
		<Col className="mb-3">
			<CustomTextEditor
				placeholder="Enter Terms & Conditions"
				value={langContent.terms[lang]}
				label="Terms & Conditions"
				defaultValue={bonusDetails?.termAndCondition?.[lang]}
				onValueChange={(value) =>
					setLangContent((prev) => ({
						...prev,
						terms: { ...prev.terms, [lang]: value },
					}))
				}
			/>
		</Col>
	</>
);

const Languages = ({
	activeLangTab,
	setActiveLangTab,
	langList = {},
	langContent,
	setLangContent,
	disableTabSwitching,
	nextPressed,
	setNextPressed,
	setActiveTab,
	bonusDetails,
}) => {
	useEffect(() => {
		if (nextPressed.currentTab === 'languages') {
			setActiveTab(nextPressed.nextTab);
			window.scrollTo(0, 0);
			setNextPressed({});
		}
	}, [nextPressed]);

	const toggle = (id) => !disableTabSwitching && setActiveLangTab(id);

	const tabData = useMemo(() => {
		const langArray = langList.filter((lang) => lang.code !== 'EN') || [];
		return langArray.map(({ id, name, code }) => ({
			id,
			title: code,
			component: (
				<SingleLangComponent
					lang={code}
					setLangContent={setLangContent}
					langContent={langContent}
					bonusDetails={bonusDetails}
				/>
			),
			tooltipText: name,
		}));
	}, [langList]);

	useEffect(() => {
		if (tabData.length) {
			setActiveLangTab(tabData[0]?.id);
		}
	}, [tabData]);

	return (
		<Row>
			<Row className="text-danger">
				<strong>
					All fields are required or cleared before switching to another
					language or moving Previous or Next/Submit.
				</strong>
			</Row>
			<Col lg="12">
				<TabsPage
					activeTab={activeLangTab}
					tabsData={tabData}
					toggle={toggle}
					disableTabSwitching={disableTabSwitching}
				/>
			</Col>
		</Row>
	);
};

export default Languages;
