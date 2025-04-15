import { putRequest } from './axios';

const { VITE_APP_API_URL } = import.meta.env;

const updateSuperAdminUser = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/admin`, data);

const updateAdmin = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/admin`, data); // No use

const updateProfile = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/admin/profile`, data);

const updateSiteConfiguration = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/admin/site-information`, data, {
		'Content-Type': 'multipart/form-data',
	});

const resetProfilePassword = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/admin/change-password`, data);

const superAdminViewToggleStatus = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/cms/toggle`, data);

const superAdminToggleStatus = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/casino/toggle/aggregator`, data);

const updateStatus = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/status`, data);

const updateKYCLabels = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/document-label`, data);

const updateGlobalRegistration = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/global-registration`, data);

const updateCurrency = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/currency`, data);

const editCountryDetails = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/country/kyc-method`, data);

const editCasinoCategory = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/casino/category`, data);

const editCasinoProvider = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/casino/provider`, data, {
		'Content-Type': 'multipart/form-data',
	});

const editCasinoSubCategory = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/casino/sub-category`, data, {
		'Content-Type': 'multipart/form-data',
	});

const editCasinoGames = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/casino/game`, data, {
		'Content-Type': 'multipart/form-data',
	});

const editBanners = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/banner`, data, {
		'Content-Type': 'multipart/form-data',
	});

const editBetSettings = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/sportsbook/bet-settings`, data);

const updateloyaltyLevel = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/bonus/loyalty-level`, data);

const uploadGallery = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/gallery`, data, {
		'Content-Type': 'multipart/form-data',
	});

const updateSAUserStatusCall = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/user/status`, data);

const markUserAsInternal = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/user/internal`, data);

const updateWageringTemplate = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/wagering-template`, data);

const updateSuperAdminCMS = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/cms`, data);

const verifyPlayerEmail = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/user/verify-email`, data);

const updateUserTags = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/user/tags`, data);

const updateUserInfoCall = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/user`, data);

const resetPasswordEmail = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/user/reset-password`, data);

const resetUserPassword = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/user/update-password`, data);

const requestDocument = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/user/request-document`, data);

const cancelDocumentRequest = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/user/cancel-document-request`, data);

const updateEmailTemplate = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/email`, data);

const cancelBonus = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/bonus/cancel`, data);

const updateComment = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/user/comment-status`, data);

const verifyUserDocument = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/user/verify-document`, data);

const addRestrictedCountriesCall = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/country/restricted-items`, data);

const updateOddsVariationApi = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/sportsbook/odd-settings`, data);

const detachOddsVariationApi = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/sportsbook/detach-market`, data);

const updateCompanyOddApi = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/sportsbook/custom-odds`, data);

const addRestrictedItems = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/country/restricted`, data);

const updateCategoryReOrder = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/casino/order-category`, data);

const updateBonusCall = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/bonus`, data, {
		'Content-Type': 'multipart/form-data',
	});

const updateSubCategoryReOrder = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/casino/order-sub-category`, data);

const updateReorderGames = ({ data }) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/casino/order-casino-games`, data);

const updateDepositlimit = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/site/update-deposit-limit`, data);

const updateWithdrawlimit = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/site/update-withdraw-limit`, data);

const updateuserkycleveCall = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/user/update-user-level`, data);

const updateRefAffCommision = (data) =>
	putRequest(
		`${VITE_APP_API_URL}/api/v1/affiliate/update-affiliate-percentage`,
		data
	);

const updateAffUserActivation = (data) =>
	putRequest(
		`${VITE_APP_API_URL}/api/v1/affiliate/deactivate-affiliate-user`,
		data
	);

const updatePromotion = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/banner/promotions`, data, {
		'Content-Type': 'multipart/form-data',
	});

const updateAffiliateStatus = (data) =>
	putRequest(
		`${VITE_APP_API_URL}/api/v1/affiliate/update-affiliate-request`,
		data
	);

const updateRole = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/admin-role`, data);

const editSpinWheelList = (data) =>
	putRequest(
		`${VITE_APP_API_URL}/api/v1/user-engagement/spin-wheel-configuration`,
		data
	);

const updatePackageValue = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/package`, data, {
		'Content-Type': 'multipart/form-data',
	});

const editFaucetSetting = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/bonus/faucet`, data);

const updateVipTier = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/user-engagement/vip-tiers`, data, {
		'Content-Type': 'multipart/form-data',
	});

const updateTicketStatus = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/support/tickets`, data);

const putFaucetSetting = (data) =>
	putRequest(`http://localhost:8080/api/v1/bonus/faucet`, data);

const playerBan = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/live-chat/ban-group-user`, data);
const updateOffensiveWords = (data) =>
	putRequest(
		`${VITE_APP_API_URL}/api/v1/live-chat/update-offensive-word`,
		data
	);
const updateChatRule = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/live-chat/update-chat-rule`, data);
const updateChatrain = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/live-chat/update-chat-rain`, data);
const toggleAdminUser = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/admin/toggle`, data);

const updateSelfExclusion = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/user/self-exclusion`, data);

const updateBonusDropData = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/bonus/drop-bonus`, data);

const  GameStatusToggle = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/casino/toggle/game`, data);
const  updateProviderStatus = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/casino/toggle/provider`, data);

const  updateCategoryStatus = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/casino/toggle/category`, data);

const  updateBonusStatus = (data) =>
	putRequest(`${VITE_APP_API_URL}/api/v1/bonus/toggle`, data);
const toggleStaffStatus = (data)=>
	putRequest(`${VITE_APP_API_URL}/api/v1/admin/toggle`, data);


export {
	updateChatrain,
	updateChatRule,
	updateOffensiveWords,
	updateSuperAdminUser,
	updateAdmin,
	updateProfile,
	updateSiteConfiguration,
	resetProfilePassword,
	superAdminViewToggleStatus,
	superAdminToggleStatus,
	updateStatus,
	updateKYCLabels,
	updateGlobalRegistration,
	updateCurrency,
	editCountryDetails,
	editCasinoCategory,
	editCasinoProvider,
	editCasinoSubCategory,
	editCasinoGames,
	editBanners,
	editBetSettings,
	updateloyaltyLevel,
	uploadGallery,
	updateSAUserStatusCall,
	markUserAsInternal,
	updateWageringTemplate,
	updateSuperAdminCMS,
	verifyPlayerEmail,
	updateUserTags,
	updateUserInfoCall,
	resetPasswordEmail,
	resetUserPassword,
	requestDocument,
	cancelDocumentRequest,
	updateEmailTemplate,
	cancelBonus,
	updateComment,
	verifyUserDocument,
	addRestrictedCountriesCall,
	updateOddsVariationApi,
	detachOddsVariationApi,
	updateCompanyOddApi,
	addRestrictedItems,
	updateCategoryReOrder,
	updateBonusCall,
	updateSubCategoryReOrder,
	updateReorderGames,
	updateDepositlimit,
	updateWithdrawlimit,
	updateuserkycleveCall,
	updateRefAffCommision,
	updatePromotion,
	updateAffiliateStatus,
	updateAffUserActivation,
	updateRole,
	editSpinWheelList,
	updatePackageValue,
	editFaucetSetting,
	updateVipTier,
	putFaucetSetting,
	updateTicketStatus,
	playerBan,
	toggleAdminUser,
	updateSelfExclusion,
	updateBonusDropData,
	GameStatusToggle,
	updateProviderStatus,
	updateCategoryStatus,
	updateBonusStatus,
	toggleStaffStatus
};
