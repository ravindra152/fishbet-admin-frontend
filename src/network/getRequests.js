import { safeStringify } from '../utils/helpers';
import { getRequest } from './axios';

const { VITE_APP_API_URL } = import.meta.env;

const getCasinoCategoryListing = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/casino/categories`, payload);

const getCasinoSubCategoryListing = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/casino/sub-category`, payload);


const getLanguages = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/language`, payload);

const getCountries = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/country/list`, payload);

const getAllCasinoProviders = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/casino/providers`, payload);

const getAdminRole = () => getRequest(`${VITE_APP_API_URL}/api/v1/admin/roles`);

const getAllAdmins = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/admin`, payload);

const getPermissionDetails = () =>
	getRequest(`${VITE_APP_API_URL}/api/v1/admin/details`);

const getPlayers = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/user/all`, payload);

const getAllCms = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/cms`, payload);

const getAggregators = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/casino/aggregators`, payload);

const getSuperAdminWageringTemplateDetail = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/wagering-template/details`, payload);

const getSuperAdminWageringTemplate = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/wagering-template`, payload);
const getAllCasinoGames = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/casino/games`, payload);

const getAllBonus = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/bonus`, payload);

const getBonusDetails = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/bonus/detail`, payload);

const getCurrencies = ({ pageNo, limit }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/v1/currency?pageNo=${pageNo}&limit=${limit}`
	);

const getLanguageManagement = ({ language = '' }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/v1/language/support-keys?language=${language}`
	);

const getBetSettings = () =>
	getRequest(`${VITE_APP_API_URL}/api/v1/sportsbook/bet-settings`);

const getTransactionBanking = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/reports/transactions`, payload);

const getSportsList = (payload) =>
	payload?.isAllListing
		? getRequest(
				`${VITE_APP_API_URL}/api/v1/sportsbook/sport?listing=all`,
				payload
		  )
		: getRequest(`${VITE_APP_API_URL}/api/v1/sportsbook/sport`, payload);

const getReviewManagement = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/review`, payload);

const getCountriesList = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/sportsbook/countries`, payload);

const getSportsTransaction = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/sportsbook/transactions`, payload);

const getTournamentsList = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/sportsbook/tournaments`, payload);

const getCasinoTransactions = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/reports/casino-transactions`, payload);

const getWithdrawRequests = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/wallet/all-withdraw-request`, payload);

const getAllSABanners = ({ limit, pageNo }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/v1/banner?limit=${limit}&pageNo=${pageNo}`
	);

const getSportsMatches = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/sportsbook/matches`, payload);

const getSportsMarkets = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/sportsbook/markets`, payload);
const getAllGroups = () =>
	getRequest(`${VITE_APP_API_URL}/api/v1/admin/site-information`);

const getEmailTemplates = () =>
	getRequest(`${VITE_APP_API_URL}/api/v1/email/all`);

const getAdminDetails = (adminId) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/admin/details?adminUserId=${adminId}`);

const getDocumentLabelCall = (userId) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/document-label?userId=${userId}`);

const getUserDocument = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/user/document`, payload);

const getUserBonuses = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/bonus`, payload);

const getSiteConfiguration = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/admin/site-information`, data);

const getGlobalRegistration = () =>
	getRequest(`${VITE_APP_API_URL}/api/v1/global-registration`);

const getloyaltyLevel = () =>
	getRequest(`${VITE_APP_API_URL}/api/v1/bonus/loyalty-level`);

const getDashboardLiveInfoService = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/report/live-player`, data);

const getDashboardDemoGraphicService = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/report/demographic`, data);

const getDashboardGameReportService = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/reports/game`, data);

const getUserDetails = (params) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/user`, params);

const getUserBonusesDetails = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/bonus/user-bonus`, payload);

const getImageGalleryData = () =>
	getRequest(`${VITE_APP_API_URL}/api/v1/gallery`);

const getCommentsList = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/user/comments`, payload);

const getCMSDynamicKeys = () =>
	getRequest(`${VITE_APP_API_URL}/api/v1/cms/dynamic-data`);

const getCmsByPageId = ({ cmsPageId }) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/cms/details?cmsPageId=${cmsPageId}`);

const getDuplicateUsers = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/user/duplicate`, payload);

const fetchRestrictedCountries = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/country/restricted`, payload);

const fetchUnrestrictedCountries = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/country/unrestricted`, payload);

const getEmailTypes = () =>
	getRequest(`${VITE_APP_API_URL}/api/v1/cms/dynamic-data`);

const getEmailTemplate = (emailTemplateId) =>
	getRequest(
		`${VITE_APP_API_URL}/api/v1/email?emailTemplateId=${emailTemplateId}`
	);

const getSportsMatchesDetailApi = ({ matchId = '' }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/v1/sportsbook/match-markets?matchId=${matchId}`
	);

const getBonusCurrenciesConvertAmount = ({
	currencyFields,
	currencyCode,
	tenantIds,
}) =>
	getRequest(
		`${VITE_APP_API_URL}/api/v1/bonus/convert-amount?currencyFields=${safeStringify(
			currencyFields
		)}&currentCurrencyCode=${currencyCode}&tenantIds=${tenantIds}`
	);
const getSuperAdminAllWageringTemplate = () =>
	getRequest(`${VITE_APP_API_URL}/api/v1/wagering-template/all`);

const getRestrictedItems = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/country/restricted-items`, data);

const getUnrestrictedItems = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/country/unrestricted-items`, data);

const getBonus = ({ bonusId, userBonusId }) =>
	getRequest(
		`${VITE_APP_API_URL}/api/v1/bonus/detail?bonusId=${bonusId}&userBonusId=${userBonusId}`
	);
const getDashboardKPIReport = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/report/kpi`, data);

const getDashboardKPISummary = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/report/kpi-summary`, data);

const getCurrencyLimit = () =>
	getRequest(`${VITE_APP_API_URL}/api/v1/site/get-currency-limit`);

const getAffiliates = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/affiliate/all`, data);

const getAffiliateRequests = (data) =>
	getRequest(
		`${VITE_APP_API_URL}/api/v1/affiliate/get-affiliate-request`,
		data
	);

const getRefAffCommision = () =>
	getRequest(
		`${VITE_APP_API_URL}/api/v1/affiliate/global-affiliate-percentage`
	);

const getPromotions = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/banner/promotions`, data);

const getReferredUsers = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/user/referred-players`, data);
const getPlayerReport = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/reports/top-players`, data);
const getAllRole = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/admin-role/all`, payload);

const getAdminRoles = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/admin-role`, payload);

const getSpinWheelList = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}/api/v1/user-engagement/spin-wheel-configuration`,
		payload
	);

const getAllPackage = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/package/all`, data);

const getPackageData = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/package`, data);

const getDashBoardData = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/reports/stats`, data);

const getFaucetSetting = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/bonus/faucet`, data);

const getAllVipTier = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/user-engagement/vip-tiers`, data);

const getVipTierData = (data) =>
	getRequest(
		`${VITE_APP_API_URL}/api/v1/user-engagement/vip-tier/details`,
		data
	);

const getTicketManagementListing = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/support/tickets`, payload);
const getTicketMessages = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/support/ticket-message`, payload);

const getAllChannels = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/live-chat/get-group`, payload);

const getChannelMessages = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}/api/v1/live-chat/messages/messages-group`,
		payload
	);

const getChannelGroupDetails = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/live-chat/get-group-users`, payload);
const getChannelGroupChatsDetails = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/live-chat/get-group-chats`, payload);

const getChatrain = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/live-chat/get-chat-rain`, payload);

const getOffensiveWordsDetails = (payload) =>
	getRequest(
		`${VITE_APP_API_URL}/api/v1/live-chat/get-offensive-words`,
		payload
	);

const getChatRuleDetails = (payload) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/live-chat/get-chat-rule`, payload);

const getAllNotice = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/cms/notice`, data);

const getBonusDrop = (data) =>
	getRequest(`${VITE_APP_API_URL}/api/v1/bonus/drop-bonus`, data);

export {
	getOffensiveWordsDetails,
	getBonus,
	getAdminRole,
	getCountries,
	getPermissionDetails,
	getPlayers,
	getAllCms,
	getAggregators,
	getCasinoCategoryListing,
	getCasinoSubCategoryListing,
	getLanguages,
	getAllAdmins,
	getAllBonus,
	getCurrencies,
	getLanguageManagement,
	getBetSettings,
	getTransactionBanking,
	getSportsList,
	getReviewManagement,
	getCountriesList,
	getTournamentsList,
	getSportsTransaction,
	getCasinoTransactions,
	getWithdrawRequests,
	getAllCasinoProviders,
	getAllCasinoGames,
	getAllSABanners,
	getSportsMatches,
	getAllGroups,
	getSportsMarkets,
	getEmailTemplates,
	getAdminDetails,
	getDocumentLabelCall,
	getSuperAdminWageringTemplateDetail,
	getSuperAdminWageringTemplate,
	getSiteConfiguration,
	getGlobalRegistration,
	getloyaltyLevel,
	getDashboardLiveInfoService,
	getUserDetails,
	getUserDocument,
	getImageGalleryData,
	getUserBonuses,
	getCommentsList,
	getDashboardDemoGraphicService,
	getDashboardGameReportService,
	getCMSDynamicKeys,
	getCmsByPageId,
	getDuplicateUsers,
	getBonusDetails,
	fetchRestrictedCountries,
	fetchUnrestrictedCountries,
	getEmailTypes,
	getEmailTemplate,
	getSportsMatchesDetailApi,
	getBonusCurrenciesConvertAmount,
	getSuperAdminAllWageringTemplate,
	getRestrictedItems,
	getUnrestrictedItems,
	getDashboardKPIReport,
	getDashboardKPISummary,
	getCurrencyLimit,
	getAffiliates,
	getAffiliateRequests,
	getRefAffCommision,
	getPromotions,
	getReferredUsers,
	getUserBonusesDetails,
	getPlayerReport,
	getAllRole,
	getAdminRoles,
	getSpinWheelList,
	getAllPackage,
	getPackageData,
	getDashBoardData,
	getFaucetSetting,
	getAllVipTier,
	getVipTierData,
	getTicketManagementListing,
	getTicketMessages,
	getAllChannels,
	getChannelMessages,
	getChannelGroupChatsDetails,
	getChannelGroupDetails,
	getChatrain,
	getChatRuleDetails,
	getAllNotice,
	getBonusDrop,
};
