import { combineReducers } from 'redux';

// Front
import Layout from './layout/reducer';

// Authentication
import Login from './auth/login/reducer';

// Dashboard
import Dashboard from './dashboard/reducer';

// admin
import AdminRoles from './auth/roles/reducer';
import PermissionDetails from './auth/permissionDetails/reducer';

// Countries
import Countries from './countries/reducer';

// Players
import Players from './players/reducer';

// Admins data
import AllAdmins from './admins/reducer';

// All cms data
import AllCms from './cms/reducer';

// Casino Management
import CasinoManagementData from './casinoManagement/reducer';

// Aggregators
import AggregatorsReducer from './aggregators/reducer';

// Bonus data
import AllBonusDetails from './bonusListing/reducer';

// Languages
import Languages from './languages/reducer';

// Currencies
import Currencies from './currencies/reducer';

// LanguageManagement
import LanguageManagement from './languageManagement/reducer';

// Bet Settings
import BetSettings from './betSettings/reducer';

// Transaction Banking
import TransactionBanking from './transactionBanking/reducer';

// Review Management
import ReviewManagement from './reviewManagement/reducer';

// Sports Transaction
import SportsTransaction from './sportsTransaction/reducer';

// Withdraw Requests
import WithdrawRequests from './withdrawRequests/reducer';

// Super Admins Settings
import SASettings from './superAdminSettings/reducer';

import AdminUser from './adminUser/reducer';

// Crm
import EmailTemplate from './emailTemplate/reducer';

// wagering Template
import WageringTemplate from './wageringTemplate/reducer';
import ProgressLoading from './progressLoading/reducer';

// PROFILE UPDATE
import ProfileData from './Profile/reducer';

// global registration
import FormFields from './registrationformFiels/reducer';

// Dashboard view
import DashboardViewInfo from './dashboardView/reducer';

// User Details
import UserDetails from './userDetails/reducer';

// Restricted Countries
import RestrictedCountries from './restrictedCountries/reducer';

// Create Update Bonus
import CreateUpdateBonus from './createUpdateBonus/reducer';

// Set site global settings
import GlobalSetting from './globalSetting/reducer';

// Promotion management
import Promotions from './promotions/reducer';

// SpinWheel management
import SpinWheelList from './spinWheelList/reducers';
// packages
import Packages from './packages/reducer';

import VipTier from './vipTier/reducer';

// GameReportList management
import GameReportList from './gameReportList/reducer';
import CasinoTransactions from './casinoTransactions/reducer';

// Ticket Management
import TicketManagementData from './ticketManagement/reducer';

import Channel from './channel/reducer';

import Chatrain from './chatRain/reducer';

import OffensiveWords from './offensiveWords/reducer';

import ChatRule from './chatRule/reducer';

import BonusDrop from './bonusDrop/reducer';

const rootReducer = combineReducers({
	AdminRoles,
	Countries,
	Players,
	PermissionDetails,
	AllBonusDetails,
	BetSettings,
	SASettings,
	AdminUser,
	EmailTemplate,
	WageringTemplate,
	ProgressLoading,
	ProfileData,
	FormFields,
	// public
	Layout,
	Login,
	AllAdmins,
	AllCms,
	CasinoManagementData,
	AggregatorsReducer,
	Languages,
	Currencies,
	LanguageManagement,
	TransactionBanking,
	ReviewManagement,
	SportsTransaction,

	WithdrawRequests,

	DashboardViewInfo,
	UserDetails,
	RestrictedCountries,
	Dashboard,
	CreateUpdateBonus,
	GlobalSetting,
	Promotions,
	SpinWheelList,
	Packages,
	VipTier,
	GameReportList,
	TicketManagementData,
	Channel,
	Chatrain,
	OffensiveWords,
	ChatRule,
	CasinoTransactions,
	BonusDrop,
});

export default rootReducer;
