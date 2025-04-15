import { postRequest } from './axios';

const { VITE_APP_API_URL } = import.meta.env;

const superAdminLogin = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/admin/login`, data);

const createCurrency = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/currency`, data);

const addSuperAdminUser = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/admin`, data);

const createAggregator = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/casino/aggregator`, data);

const createCasinoProvider = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/casino/provider`, data, {
		'Content-Type': 'multipart/form-data',
	});

const createReview = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/review`, data);

const createBetSettings = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/sportsbook/bet-settings`, data);

const createSABanners = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/banner`, data, {
		'Content-Type': 'multipart/form-data',
	});

const createCasinoCategory = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/casino/category`, data, {
		'Content-Type': 'multipart/form-data',
	});

const createKYCLabels = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/document-label`, data);

const createCasinoSubCategory = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/casino/sub-category`, data, {
		'Content-Type': 'multipart/form-data',
	});

const createUserCommentEntry = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/user/comment`, data);

const createWageringTemplate = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/wagering-template`, data);

const resetUserLimitCall = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/user/daily-limit`, data);

const resetDepositLimitCall = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/user/deposit-limit`, data);

const resetLossLimitCall = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/user/loss-limit`, data);

const disableUserCall = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/user/disable-until`, data);

const disableUserSession = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/user/session-time`, data);

const createSuperAdminCMS = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/cms`, data);

const updateMatchFeaturedTemplate = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/sportsbook/featured-matches`, data);

const issueBonus = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/bonus/issue`, data);

const testEmailTemplateEndPoint = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/email/test`, data);

const createEmailTemplate = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/email`, data);

const isCasinoFeaturedService = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/casino/featured-games`, data);

const addGamesToSubCategory = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/casino/category-games`, data);

const createBonusCall = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/bonus`, data, {
		'Content-Type': 'multipart/form-data',
	});

const sendUserEmail = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/send-multiple-email`, data);

const createPromotion = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/banner/promotions`, data, {
		'Content-Type': 'multipart/form-data',
	});

const updateBonus = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/bonus`, data, {
		'Content-Type': 'multipart/form-data',
	});
const addDepositToOtherCall = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/user/manage-wallet`, data);

const createRole = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/admin-role`, data);

const createPackages = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/package/`, data, {
		'Content-Type': 'multipart/form-data',
	});
const createVipTier = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/user-engagement/vip-tiers`, data, {
		'Content-Type': 'multipart/form-data',
	});

const createWithdrawRequestAccept = (data) =>
	postRequest(
		`${VITE_APP_API_URL}/api/v1/wallet/accept-withdraw-request?withdrawalId=${data}`
	);
const createWithdrawRequestCancel = (id, reason) => {
	postRequest(
		`${VITE_APP_API_URL}/api/v1/wallet/reject-withdraw-request/?withdrawalId=${id}`,
		reason
	);
};
const sendTicketReply = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/support/ticket-message`, data);

const createChannel = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/live-chat/create-group`, data);
const updateChannelDetailsRequest = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/live-chat/update-group`, data);

const createChatrain = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/live-chat/create-chat-rain`, data);

const createOffensiveWords = (data) => postRequest(
		`${VITE_APP_API_URL}/api/v1/live-chat/create-offensive-word`,
		data
	);

const createChatRule = (data) =>{
	console.log(data,'fata')
	return postRequest(
		`${VITE_APP_API_URL}/api/v1/live-chat/create-chat-rule`,
		data
	);
};

const createUser = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/user`, data);

const createNotice = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/cms/notice`, data);

const createBonusDrop = (data) =>
	postRequest(`${VITE_APP_API_URL}/api/v1/bonus/drop-bonus`, data);

const RejectRedeemReq = (data) =>
	postRequest(
		`${VITE_APP_API_URL}/api/v1/wallet/reject-withdraw-request`,
		data
	);
const AcceptRedeemReq = (data)=>
	postRequest(`${VITE_APP_API_URL}/api/v1/wallet/accept-withdraw-request`,data)

export {
	RejectRedeemReq,
	AcceptRedeemReq,
	createChatRule,
	createOffensiveWords,
	createChatrain,
	createSuperAdminCMS,
	superAdminLogin,
	createCurrency,
	addSuperAdminUser,
	createAggregator,
	createCasinoProvider,
	createReview,
	createBetSettings,
	createSABanners,
	createCasinoCategory,
	createKYCLabels,
	createCasinoSubCategory,
	createUserCommentEntry,
	createWageringTemplate,
	resetUserLimitCall,
	disableUserCall,
	disableUserSession,
	updateMatchFeaturedTemplate,
	issueBonus,
	resetDepositLimitCall,
	resetLossLimitCall,
	isCasinoFeaturedService,
	testEmailTemplateEndPoint,
	createEmailTemplate,
	addGamesToSubCategory,
	createBonusCall,
	sendUserEmail,
	createPromotion,
	updateBonus,
	addDepositToOtherCall,
	createRole,
	createPackages,
	createVipTier,
	createWithdrawRequestAccept,
	createWithdrawRequestCancel,
	sendTicketReply,
	createChannel,
	updateChannelDetailsRequest,
	createUser,
	createNotice,
	createBonusDrop,
};
