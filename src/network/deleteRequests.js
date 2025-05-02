import { deleteRequest } from './axios';

const { VITE_APP_API_URL } = import.meta.env;

const deleteFromGallery = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/v1/gallery`, data);

const deleteEmailTemplate = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/v1/email `, data);

const removeRestrictedCountriesCall = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/v1/country/restricted`, data);

const deleteSubCategory = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/v1/casino/sub-category`, data);

const deleteCasinoGames = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/v1/casino/games`, data);

const deleteSocialLink = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/v1/social-links`, data);


// const deleteSABanners = ({ bannerType, bannerId }) =>
// 	deleteRequest(
// 		`${VITE_APP_API_URL}/api/v1/banner?bannerKey=${bannerType}&bannerId=${bannerId}`
// 	);

const deleteCategory = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/v1/casino/category`, data);

const deleteSABanners = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/v1/banner`,data);

const deleteRestrictedItems = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/v1/country/restricted-items`, data);

const deleteBonus = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/v1/bonus`, data);

const deletePromotion = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/v1/banner/promotions`, data);
const deletePackage = (data) =>
	deleteRequest(`${VITE_APP_API_URL}/api/v1/package`, data);

const deleteChannelData = (data) =>
	deleteRequest(
		`${VITE_APP_API_URL}/api/v1/live-chat/delete-group`,
		data
	);
const deleteChatRain = (data) =>
	deleteRequest(
		`${VITE_APP_API_URL}/api/v1/live-chat/delete-chat-rain`,
		data
	);
const deleteOffensiveWords = (data) =>
	deleteRequest(
		`${VITE_APP_API_URL}/api/v1/live-chat/delete-offensive-word?id=${data?.id}`,
		data
	);
const deleteChatRule = (data) =>
	deleteRequest(
		`${VITE_APP_API_URL}/api/v1/live-chat/delete-chat-rule`,
		data
	);

export {
	deleteChatRule,
	deleteFromGallery,
	removeRestrictedCountriesCall,
	deleteEmailTemplate,
	deleteSubCategory,
	deleteCasinoGames,
	deleteSABanners,
	deleteCategory,
	deleteRestrictedItems,
	deleteBonus,
	deletePromotion,
	deletePackage,
	deleteChannelData,
	deleteSocialLink,
	deleteChatRain,
	deleteOffensiveWords
};
