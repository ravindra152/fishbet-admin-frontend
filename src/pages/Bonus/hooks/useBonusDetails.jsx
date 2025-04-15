import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import General from '../FormSections/General';
import Languages from '../FormSections/Languages';
// import { getSiteConfiguration } from '../../../network/getRequests';
import Currencies from '../FormSections/Currency';
import WageringContribution from '../FormSections/WageringContribution';
import Games from '../FormSections/Games';
import BonusCountry from '../FormSections/BonusCountry';
import {
	// createBonus,
	fetchCountriesStart,
	getAllSAWageringTemplates,
	getUserBonusDetailsReset,
	resetCreateBonus,
	resetUpdateBonus,
	getLanguagesStart,
	// getBonusDetails,
	// updateBonus
} from '../../../store/actions';
import { getBonusDetails } from '../../../network/getRequests';
import { updateBonus } from '../../../network/postRequests';
import {
	// formatDateYMD,
	showToastr,
} from '../../../utils/helpers';

const useBonusdetails = ({ isEdit }) => {
	const { bonusId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [selectedGames, setSelectedGames] = useState([]);
	const [bonusTypeChanged, setBonusTypeChanged] = useState(false);
	const [activeLangTab, setActiveLangTab] = useState('');
	const [selectedBonus, setSelectedBonus] = useState('joining');
	const [activeTab, setActiveTab] = useState('general');
	const [allFields, setAllFields] = useState({});
	// const [langList, setLangList] = useState({});
	const [nextPressed, setNextPressed] = useState({});
	const [langContent, setLangContent] = useState({
		promoTitle: {},
		desc: {},
		terms: {},
	});
	const [selectedCountries, setSelectedCountries] = useState([]);
	const [bonusDetailsInfo, setBonusDetailsInfo] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const {
		createBonusSuccess,
		createBonusLoading,
		updateBonusSuccess,
		updateBonusLoading,
		createBonusError,
		updateBonusError,
	} = useSelector((state) => state.CreateUpdateBonus);
	const { bonusDetails, getBonusDetailsLoading } = useSelector(
		(state) => state.UserDetails
	);

	const { bonusDetails: details } = useSelector(
		(state) => state.AllBonusDetails
	);

	const { languageData = {} } = useSelector(
		(state) => state.CasinoManagementData
	);

	const getBonusData = async () => {
		setIsLoading(true);
		try {
			const response = await getBonusDetails({
				bonusId,
			});
			setIsLoading(false);
			setBonusDetailsInfo(response?.data?.data?.bonusDetails);
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};
	useEffect(() => {
		if (bonusId) {
			getBonusData();
		}
		return () => dispatch(getUserBonusDetailsReset());
	}, [bonusId]);

	useEffect(() => {
		if (bonusDetails) {
			setSelectedCountries(bonusDetails?.other?.countries);
			setSelectedGames(bonusDetails?.gameIds);
			setLangContent({
				promoTitle: bonusDetails?.promotionTitle,
				terms: bonusDetails?.termCondition,
				desc: bonusDetails?.description,
			});
		}
	}, [bonusDetails]);

	// useEffect(() => {
	// 	dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
	// }, [bonusDetails]);

	// useEffect(() => {
	// 	dispatch(getAllSAWageringTemplates());
	// }, []);

	// useEffect(() => {
	// 	dispatch(fetchCountriesStart());
	// }, []);

	useEffect(() => {
		if (createBonusSuccess) {
			navigate('/bonus');
			dispatch(resetCreateBonus());
		}
		if (createBonusError) {
			setActiveTab('general');
		}
	}, [createBonusSuccess, createBonusError]);

	useEffect(() => {
		if (updateBonusSuccess) {
			navigate('/bonus');
			dispatch(resetUpdateBonus());
		}
		if (updateBonusError) {
			setActiveTab('general');
		}
	}, [updateBonusSuccess, updateBonusError]);

	const langList = useMemo(
		() =>
			languageData?.rows.map((item) => ({
				id: item.languageId,
				name: item.languageName,
				code: item.code,
				isActive: true,
			})) || [],
		[languageData]
	);

	const checkAllEmptyCondition = () =>
		(langContent?.promoTitle?.[activeLangTab] === '' ||
			langContent?.promoTitle?.[activeLangTab] === undefined) &&
		(langContent?.desc?.[activeLangTab] === '' ||
			langContent?.desc?.[activeLangTab] === undefined ||
			(langContent?.desc?.[activeLangTab] &&
				!langContent?.desc?.[activeLangTab]?.replace(/<[^>]+>/g, '')
					?.length)) &&
		(langContent?.terms?.[activeLangTab] === '' ||
			langContent?.terms?.[activeLangTab] === undefined ||
			(langContent?.terms?.[activeLangTab] &&
				!langContent?.terms?.[activeLangTab]?.replace(/<[^>]+>/g, '')?.length));

	const checkAllFilled = () =>
		langContent?.promoTitle?.[activeLangTab] &&
		langContent?.desc?.[activeLangTab] &&
		langContent?.desc?.[activeLangTab]?.replace(/<[^>]+>/g, '')?.length &&
		langContent?.terms?.[activeLangTab] &&
		langContent?.terms?.[activeLangTab]?.replace(/<[^>]+>/g, '')?.length;

	const isNextDisabled = useMemo(
		() => !(checkAllEmptyCondition() || checkAllFilled()),
		[langContent, activeLangTab]
	);

	const toggleTab = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
		}
	};

	useEffect(() => {
		async function fetchData() {
			// await getSiteConfiguration().then((res) => {
			// 	setLangList(res?.data?.data?.siteInformation?.[1]?.value?.languages);
			// });
		}
		if (!langList.length) {
			fetchData();
		}
	}, []);

	const onNextClick = (current, next) => {
		setNextPressed({ currentTab: current, nextTab: next });
	};

	const onSubmit = async (value) => {
		const { status, id, bonusImage, ...rest } = value || {};
		// const formData = new FormData();
		// formData.append("bonusImage", bonusImage);
		try {
			await updateBonus({
				...rest,
				...(typeof bonusImage !== 'string' && { bonusImage }),
				status: status ? 'active' : 'inactive',
			});
			showToastr({
				message: `Updated Successfully`,
				type: 'success',
			});
			navigate('/bonus');
		} catch (error) {
			console.log(error);
			showToastr({ message: 'Something Went wrong', type: 'error' });
		}
	};
	// final create api call
	// useEffect(() => {
	//   if (nextPressed.nextTab === 'submit') {
	//     if (isEdit) {
	//       // dispatch(
	//       //   updateBonus({
	//       //     ...allFields,
	//       //     bonusId,
	//       //     promotionTitle: safeStringify(langContent?.promoTitle),
	//       //     description: safeStringify(langContent?.desc),
	//       //     termCondition: safeStringify(langContent?.terms),
	//       //     validFrom: formatDateYMD(allFields.validFrom),
	//       //     validTo: formatDateYMD(allFields.validTo),
	//       //     wageringTemplateId: allFields.selectedTemplateId,
	//       //     gameIds: selectedGames,
	//       //     // other: safeStringify({
	//       //     // 	countries: selectedCountries,
	//       //     // 	showBonusValidity: allFields.showBonusValidity,
	//       //     // }),
	//       //   })
	//       // );
	//     } else {
	//       dispatch(
	//         createBonus({
	//           ...allFields,
	//           promotionTitle: safeStringify(langContent?.promoTitle),
	//           description: safeStringify(langContent?.desc),
	//           termCondition: safeStringify(langContent?.terms),
	//           validFrom: formatDateYMD(allFields.validFrom),
	//           validTo: formatDateYMD(allFields.validTo),
	//           wageringTemplateId: allFields.selectedTemplateId,
	//           gameIds: selectedGames,
	//           // other: safeStringify({
	//           // 	countries: selectedCountries,
	//           // 	showBonusValidity: allFields.showBonusValidity,
	//           // }),
	//         })
	//       );
	//     }
	//   }
	// }, [nextPressed]);

	const tabData = [
		{
			id: 'general',
			title: 'General',
			component: (
				<General
					isLoading={getBonusDetailsLoading}
					activeTab={activeTab}
					nextPressed={nextPressed}
					setActiveTab={setActiveTab}
					setNextPressed={setNextPressed}
					setAllFields={setAllFields}
					setSelectedBonus={setSelectedBonus}
					setLangContent={setLangContent}
					setSelectedCountries={setSelectedCountries}
					setSelectedGames={setSelectedGames}
					setBonusTypeChanged={setBonusTypeChanged}
					bonusDetails={bonusDetails}
					isEdit={isEdit}
				/>
			),
		},
		{
			id: 'languages',
			title: 'Languages',
			component: (
				<Languages
					langList={langList}
					setLangContent={setLangContent}
					langContent={langContent}
					activeLangTab={activeLangTab}
					setActiveLangTab={setActiveLangTab}
					disableTabSwitching={isNextDisabled}
					nextPressed={nextPressed}
					setNextPressed={setNextPressed}
					setActiveTab={setActiveTab}
					setAllFields={setAllFields}
					bonusDetails={bonusDetails}
				/>
			),
		},
		{
			id: 'currency',
			title: 'Currency',
			component: (
				<Currencies
					setActiveTab={setActiveTab}
					setNextPressed={setNextPressed}
					setAllFields={setAllFields}
					allFields={allFields}
					selectedBonus={selectedBonus}
					nextPressed={nextPressed}
					bonusTypeChanged={bonusTypeChanged}
					setBonusTypeChanged={setBonusTypeChanged}
					bonusDetails={bonusDetails}
					activeTab={activeTab}
				/>
			),
			isHidden:
				['promotion'].includes(selectedBonus) || bonusDetails?.claimedCount,
		},
		{
			id: 'wageringContribution',
			title: 'Wagering Contribution',
			component: (
				<WageringContribution
					nextPressed={nextPressed}
					setNextPressed={setNextPressed}
					setActiveTab={setActiveTab}
					setAllFields={setAllFields}
					bonusDetails={bonusDetails}
					isEdit={isEdit}
				/>
			),
			isHidden:
				['promotion', 'deposit', 'joining', 'birthday'].includes(
					selectedBonus
				) || bonusDetails?.claimedCount,
		},
		{
			id: 'games',
			title: 'Games',
			component: (
				<Games
					nextPressed={nextPressed}
					setNextPressed={setNextPressed}
					setActiveTab={setActiveTab}
					setAllFields={setAllFields}
					selectedGames={selectedGames}
					setSelectedGames={setSelectedGames}
				/>
			),
			isHidden:
				['promotion', 'deposit', 'joining', 'birthday'].includes(
					selectedBonus
				) || bonusDetails?.claimedCount,
		},
		{
			id: 'countries',
			title: 'Countries',
			component: (
				<BonusCountry
					selectedCountries={selectedCountries}
					setSelectedCountries={setSelectedCountries}
				/>
			),
			isHidden:
				['deposit', 'joining', 'birthday'].includes(selectedBonus) ||
				bonusDetails?.claimedCount,
		},
	];

	return {
		tabData,
		toggleTab,
		activeTab,
		onNextClick,
		allFields,
		langContent,
		isNextDisabled,
		createBonusLoading,
		updateBonusLoading,
		getBonusDetailsLoading,
		isEdit,
		bonusDetails,
		setAllFields,
		isLoading,
		details,
		onSubmit,
		bonusDetailsInfo,
	};
};

export default useBonusdetails;
