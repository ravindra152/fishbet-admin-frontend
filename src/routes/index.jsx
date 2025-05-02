import React from 'react';
// import CountriesList from '../pages/CountriesList';
import Admins from '../pages/Admins';
import BonusDetail from '../pages/Bonus';
import CasinoAggregators from '../pages/Casino Management/Aggregators';
import CasinoCategory from '../pages/CasinoCategory';
import CasinoSubCategory from '../pages/CasinoSubCategory';
import CasinoAddGames from '../pages/CasinoSubCategory/CasinoAddGames';
import Cms from '../pages/Cms';
import CMSDetails from '../pages/Cms/CMSDetails';
import CreateCMS from '../pages/Cms/CreateCMS';
import EditCMS from '../pages/Cms/EditCMS';
import PlayersList from '../pages/Players';
// import LanguageList from '../pages/LanguageList';
import CurrencyList from '../pages/CurrencyList';
// import LanguageManagementList from '../pages/LanguageManagement';
// import BetSettings from '../pages/BetSettings';
import TransactionBankingListing from '../pages/TransactionBankingList';
// import SportsListing from '../pages/SportsListing';
import ReviewManagementList from '../pages/ReviewManagementList';
// import SportsCountriesListing from '../pages/SportsCountriesList';
// import SportsTournamentList from '../pages/SportsTournamentList';
// import SportsTransactionList from '../pages/SportsTransactionList';
import CasinoTransactionsList from '../pages/CasinoTransactionsList';
// import WithdrawRequestsList from '../pages/WithdrawRequestsList';
import BannerManagement from '../pages/BannerManagement';
import CasinoGames from '../pages/CasinoGames';
import CasinoProviders from '../pages/CasinoProviders';
// import SportsMatchesList from '../pages/SportsMatchesList';
// import SportsMarketsList from '../pages/SportsMarketsList';
import AddAdmin from '../pages/Admins/addAdmin';
import EditAdmin from '../pages/Admins/editAdmin';
import EmailTemplate from '../pages/EmailTemplate';
import KYCLabels from '../pages/KYCLabels';
import ProfilePage from '../pages/Profile';
import WageringTemplate from '../pages/WageringTemplateDetail';
import CreateWageringTemplate from '../pages/WageringTemplateDetail/createWageringTemplate';
import EditWageringTemplate from '../pages/WageringTemplateDetail/editWageringTemplate';
import WageringTemplateDetailList from '../pages/WageringTemplateDetail/WageringTemplateDetailList';
// import RegistrationFields from '../pages/RegistrationFormFields';
import AdminDetails from '../pages/AdminDetails';
import CreateBonus from '../pages/Bonus/CreateBonus';
import DashboardView from '../pages/DashboardView';
import CreateEmailTemplate from '../pages/EmailTemplate/CreateEmailTemplate';
import EditEmailTemplate from '../pages/EmailTemplate/EditEmailTemplate';
import ImageGallery from '../pages/ImageGallery';
import LoyaltyManagement from '../pages/LoyaltyManagement';
import PlayerDetailsPage from '../pages/PlayerDetails';
import ViewBlockedCountries from '../pages/ViewBlockedCountries';
// import SportsMatchDetail from '../pages/SportsMatchDetail';
import LoginRight from '../pages/Authentication/Login/LoginRight';
// import ViewRestrictedGames from '../pages/ViewRestrictedGames';
// import ViewRestrictedProviders from '../pages/ViewRestrictedProviders';
import { modules } from '../constants/permissions';
import BonusPreview from '../pages/Bonus/BonusView';
import EditBonus from '../pages/Bonus/EditBonus';
import ReorderCategories from '../pages/CasinoCategory/ReorderCategories';
import ReorderGames from '../pages/CasinoGames/components/ReorderGames';
import ReorderSubCategory from '../pages/CasinoSubCategory/components/ReorderSubCategory';
import Channels from '../pages/Channels';
import CreateChannel from '../pages/Channels/CreateChannel';
import EditChannel from '../pages/Channels/EditChannel';
import ChannelsReport from '../pages/ChannelsReport';
import ChatRain from '../pages/ChatRain';
import PreviewChatrain from '../pages/ChatRain/ChatrainView';
import CreateChatRain from '../pages/ChatRain/CreateChatRain';
import EditChatrain from '../pages/ChatRain/EditChatrain';
import Chatrule from '../pages/ChatRule';
import DemographicReport from '../pages/DemographicReport';
import FaucetSettings from '../pages/FaucetSettings';
import GameReportList from '../pages/GameReportList';
import GlobalSetting from '../pages/GlobalSetting';
import Notice from '../pages/Notice';
import CreateNotice from '../pages/Notice/CreateNotice';
import OffensiveWords from '../pages/OffensiveWords';
import Packages from '../pages/Packages';
import CreatePackage from '../pages/Packages/CreatePackage';
import UpdatePackage from '../pages/Packages/UpdatePackage';
import KYCSettings from '../pages/PlayerDetails/KYCSettings';
import PlayerEmails from '../pages/PlayerEmails';
import PlayerReportList from '../pages/PlayerReport';
import Promotions from '../pages/Promotions';
import CreatePromotion from '../pages/Promotions/CreatePromotion';
import EditPromotion from '../pages/Promotions/EditPromotion';
import RedeemRequestList from '../pages/RedeemRequestsList';
import Roles from '../pages/Roles';
import SpinWheel from '../pages/SpinWheel';
import TicketManagement from '../pages/TicketManagement';
import VipTierListing from '../pages/VipTier';
import CreateVipTier from '../pages/VipTier/createVipTier';
import UpdateVipTier from '../pages/VipTier/updateVipTier';
import ViewVipTier from '../pages/VipTier/viewVipTier';
import BonusDrop from '../pages/Bonus Drop';
import CreateBonusDrop from '../pages/Bonus Drop/CreateBonusDrop';
import EditBonusDrop from '../pages/Bonus Drop/EditBonusDrop';
import EditChat from '../pages/ChatRule/EditChatRule';
import SocialLinks from '../pages/SocialLinks';

const authProtectedRoutes = [
	{
		path: '/',
		component: <DashboardView />,
		// groupModules: [
		// 	modules.Reports,
		// ],
	},
	{
		path: '/dashboard',
		component: <DashboardView />,
		// groupModules: [
		// 	modules.Reports,
		// ],
	},

	{
		path: '/demographics',
		component: <DemographicReport />,
		module: modules.Reports,
	},

	{
		path: '/kyc-settings',
		component: <KYCSettings />,
		module: modules.KYC,
	},
	// Staff/Admin
	{ path: '/staff', component: <Admins />, module: modules.Administrator },
	{
		path: '/staff/add',
		component: <AddAdmin />,
		module: modules.Administrator,
	},
	{
		path: '/staff/details/:adminUserId',
		component: <AdminDetails />,
		module: modules.Administrator,
	},
	{
		path: '/staff/edit/:adminUserId',
		component: <EditAdmin />,
		module: modules.Administrator,
	},

	{
		path: '/categories',
		component: <CasinoCategory />,
		module: modules.CasinoManagement,
	},
	{
		path: '/categories/reorder',
		component: <ReorderCategories />,
		module: modules.CasinoManagement,
	},
	{
		path: '/sub-categories',
		component: <CasinoSubCategory />,
		module: modules.CasinoManagement,
	},
	{
		path: '/sub-categories/reorder',
		component: <ReorderSubCategory />,
		module: modules.CasinoManagement,
	},
	{
		path: '/categories/addGames/:gameSubCategoryId',
		component: <CasinoAddGames />,
		module: modules.CasinoManagement,
	},
	// {
	// 	path: '/countries',
	// 	component: <CountriesList />,
	// 	module: modules.RestrictedCountry,
	// },
	// {
	// 	path: '/countries/restricted-games/:countryId',
	// 	component: <ViewRestrictedGames />,
	//   module: modules.RestrictedCountry,
	// },
	// {
	// 	path: '/countries/restricted-providers/:countryId',
	// 	component: <ViewRestrictedProviders />,
	//   module: modules.RestrictedCountry,
	// },
	{ path: '/users', component: <PlayersList />, module: modules.Players },
	{ path: '/cms', component: <Cms />, module: modules.ContentManagement },
	{
		path: '/cms/create',
		component: <CreateCMS />,
		module: modules.ContentManagement,
	},
	{
		path: '/cms/edit/:cmsPageId',
		component: <EditCMS />,
		module: modules.ContentManagement,
	},
	{
		path: '/cms/details/:cmsPageId',
		component: <CMSDetails />,
		module: modules.ContentManagement,
	},
	{
		path: '/casino-aggregators',
		component: <CasinoAggregators />,
		module: modules.CasinoManagement,
	},
	{ path: '/bonus', component: <BonusDetail />, module: modules.Bonus },
	{
		path: '/bonus/:bonusId',
		component: <BonusPreview />,
		module: modules.Bonus,
	},
	{ path: '/bonus/create', component: <CreateBonus />, module: modules.Bonus },
	{
		path: '/bonus/edit/:bonusId',
		component: <EditBonus />,
		module: modules.Bonus,
	},
	// { path: '/languages', component: <LanguageList />, module: modules.MultiLanguage, },
	{
		path: '/currencies',
		component: <CurrencyList />,
		module: modules.AppConfiguration,
	},
	// { path: '/languages-management', component: <LanguageManagementList />, module: modules.MultiLanguage, },
	// {
	// 	path: '/bet-settings',
	// 	component: <BetSettings />,
	// 	module: modules.BetSettings,
	// },
	{
		path: '/transaction-banking',
		component: <TransactionBankingListing />,
		module: modules.Transactions,
	},
	// { path: '/sports', component: <SportsListing />, module: modules.SportbookManagement, },
	{
		path: '/review-management',
		component: <ReviewManagementList />,
		module: modules.Reviews,
	},
	// { path: '/sports/countries', component: <SportsCountriesListing />, module: modules.SportbookManagement, },
	// { path: '/sports/leagues', component: <SportsTournamentList />, module: modules.SportbookManagement, },
	// { path: '/sports-transactions', component: <SportsTransactionList />, module: modules.Transactions, },
	{
		path: '/casino-transactions',
		component: <CasinoTransactionsList />,
		module: modules.Reports,
	},
	// { path: '/withdraw-request', component: <WithdrawRequestsList />, module: modules.Transactions, },
	{
		path: '/casino-providers',
		component: <CasinoProviders />,
		module: modules.CasinoManagement,
	},
	{
		path: '/casino-games',
		component: <CasinoGames />,
		module: modules.CasinoManagement,
	},
	{
		path: '/casino-games/reorder',
		component: <ReorderGames />,
		module: modules.CasinoManagement,
	},
	{
		path: '/banner-management',
		component: <BannerManagement />,
		module: modules.ContentManagement,
	},
	{
		path: '/social-links',
		component: <SocialLinks />,
		module: modules.ContentManagement,
	},
	{
		path: '/promotions',
		component: <Promotions />,
		module: modules.ContentManagement,
	},
	{
		path: '/promotions/create',
		component: <CreatePromotion />,
		module: modules.ContentManagement,
	},
	{
		path: '/promotions/edit/:promotionPageId',
		component: <EditPromotion />,
		module: modules.ContentManagement,
	},
	// { path: '/matches', component: <SportsMatchesList />, module: modules.SportbookManagement, },
	// { path: '/match/:matchId', component: <SportsMatchDetail />, module: modules.SportbookManagement, },
	// { path: '/markets', component: <SportsMarketsList />, module: modules.SportbookManagement, },
	{
		path: '/email-templates',
		component: <EmailTemplate />,
		// module: modules.EmailTemplate,
	},
	{
		path: '/email-players',
		component: <PlayerEmails />,
		// module: modules.EmailTemplate,
	},
	{
		path: '/email-templates/create',
		component: <CreateEmailTemplate />,
		// module: modules.EmailTemplate,
	},
	{
		path: '/email-templates/edit/:emailTemplateId',
		component: <EditEmailTemplate />,
		// module: modules.EmailTemplate,
	},
	{ path: '/kyc-labels', component: <KYCLabels />, module: modules.KYC },
	{
		path: '/wagering-template',
		component: <WageringTemplate />,
		module: modules.WageringTemplate,
	},
	{
		path: '/wagering-template/create',
		component: <CreateWageringTemplate />,
		module: modules.WageringTemplate,
	},
	{
		path: '/wagering-template/edit/:wageringTemplateId',
		component: <EditWageringTemplate />,
		module: modules.WageringTemplate,
	},
	{
		path: '/wagering-template/details/:wageringTemplateId',
		component: <WageringTemplateDetailList />,
		module: modules.WageringTemplate,
	},
	{ path: '/profile', component: <ProfilePage /> },
	// { path: '/form-fields', component: <RegistrationFields />, module: modules.RegistrationField, },
	{
		path: '/global-setting',
		component: <GlobalSetting />,
		groupModules: [modules.AppConfiguration, modules.AffiliateModule],
	},
	{
		path: '/loyalty-management',
		component: <LoyaltyManagement />,
		module: modules.LoyaltyManagement,
	},
	{
		path: '/player-details/:playerId',
		component: <PlayerDetailsPage />,
		module: modules.Players,
	},
	{
		path: '/image-gallery',
		component: <ImageGallery />,
		module: modules.ContentManagement,
	},
	// {
	// 	path: '/casino-providers/restrict-countries/:casinoProviderId',
	// 	component: <ViewBlockedCountries />,
	//   module: modules.CasinoManagement,
	// },
	{
		path: '/casino-games/restrict-countries/:casinoGameId',
		component: <ViewBlockedCountries />,
		module: modules.CasinoManagement,
	},
	{
		path: '/spin-wheel',
		component: <SpinWheel />,
		module: modules.SpinWheel,
	},
	{
		path: '/packages',
		component: <Packages />,
		module: modules.Packages,
	},
	{
		path: '/packages/create',
		component: <CreatePackage />,
		modules: [modules.Packages],
		operation: 'C',
	},
	{
		path: '/packages/edit/:packageId',
		component: <UpdatePackage />,
		modules: [modules.Packages],
		operation: 'U',
	},
	{ path: '/roles', component: <Roles />, module: modules.Administrator },
	{
		path: '/redeem-request',
		component: <RedeemRequestList />,
	},
	{
		path: '/faucet-settings',
		component: <FaucetSettings />,
		module: modules.AMOE,
	},
	{ path: '*', component: <DashboardView /> },
	// { path: '*', component: <ProfilePage /> },
	{
		path: '/vip-tier',
		component: <VipTierListing />,
		// module: [modules.PlayerEngagement],
	},
	{
		path: '/vip-tier/create',
		component: <CreateVipTier />,
		// module: [modules.VipTier],
	},
	{
		path: '/vip-tier/edit/:vipTierId',
		component: <UpdateVipTier />,
		modules: [modules.PlayerEngagement],
		operation: 'U',
	},
	{
		path: '/vip-tier/view/:vipTierId',
		component: <ViewVipTier />,
		// modules: [modules.PlayerEngagement],
		// operation: 'U',
	},
	{
		path: '/game-report',
		component: <GameReportList />,
		module: modules.Reports,
	},
	{
		path: '/player-report',
		component: <PlayerReportList />,
		module: modules.Reports,
	},
	{
		path: '/ticket-management',
		component: <TicketManagement />,
		module: modules.TicketManagement,
	},
	{
		path: '/chat/channels',
		component: <Channels />,
		modules: [modules.paymentManagement],
		operation: 'C',
	},
	{
		path: '/chat/chat-rain',
		component: <ChatRain />,
		modules: [modules.paymentManagement],
		operation: 'C',
	},
	{
		path: '/chat/channel/create',
		component: <CreateChannel />,
	},
	{
		path: '/chat/channel/edit/:channelId',
		component: <EditChannel />,
		// modules: [modules.bonus],
		// operation: 'U',
	},
	{
		path: '/chat/offensive-words',
		component: <OffensiveWords />,
	},
	{
		path: '/chat/channel-report/:channelId',
		component: <ChannelsReport />,
		// modules: [modules.bonus],
		// operation: 'U',
	},
	{
		path: '/chat/chat-rain/add',
		component: <CreateChatRain />,
		modules: [modules.paymentManagement],
		operation: 'C',
	},
	{
		path: '/chat/chat-rain/edit/:chatRainId',
		component: <EditChatrain />,
		modules: [modules.paymentManagement],
		operation: 'C',
	},
	{
		path: '/chat/chat-rain/:chatRainId',
		component: <PreviewChatrain />,
		modules: [modules.paymentManagement],
		operation: 'C',
	},
	{
		path: '/chat/chat-rule',
		component: <Chatrule />,
		modules: [modules.paymentManagement],
		operation: 'C',
	},
	{
		path: '/chat/chat-rule/:Id',
		component: <EditChat />,
		modules: [modules.paymentManagement],
		operation: 'C',
	},
	{
		path: '/notice',
		component: <Notice />,
		// modules: [modules.paymentManagement],
		// operation: 'C',
	},
	{
		path: '/notice/create',
		component: <CreateNotice />,
		// modules: [modules.paymentManagement],
		// operation: 'C',
	},
	{
		path: '/bonus-drop',
		component: <BonusDrop />,
		// modules: [modules.paymentManagement],
		// operation: 'C',
	},
	{
		path: '/bonus-drop/create',
		component: <CreateBonusDrop />,
		// modules: [modules.paymentManagement],
		// operation: 'C',
	},
	{
		path: '/bonus-drop/edit/:bonusDropId',
		component: <EditBonusDrop />,
		// modules: [modules.paymentManagement],
		// operation: 'C',
	},
];

const publicRoutes = [{ path: '/login', component: <LoginRight /> }];

export { authProtectedRoutes, publicRoutes };
