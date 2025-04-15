import { all, fork } from 'redux-saga/effects';
import AuthSaga from './auth/login/saga';
import LayoutSaga from './layout/saga';
import CountriesSaga from './countries/saga';
import AdminRoles from './auth/roles/saga';
import PermissionDetails from './auth/permissionDetails/saga';
import PlayerSaga from './players/saga';
import AdminDetailsSaga from './admins/saga';
import CmsDetailsSaga from './cms/saga';
import aggregatorsSaga from './aggregators/saga';
import BonusDetailsSaga from './bonusListing/saga';
import LanguagesSaga from './languages/saga';
import CurrenciesSaga from './currencies/saga';
import LanguageManagementSaga from './languageManagement/saga';
import BetSettingsSaga from './betSettings/saga';
import TransactionBankingSaga from './transactionBanking/saga';
import ReviewManagementSaga from './reviewManagement/saga';
import SportsTransactionSaga from './sportsTransaction/saga';
import CasinoManagementSaga from './casinoManagement/saga';
import CasinoTransactionsSaga from './casinoTransactions/saga';
import WithdrawRequestsSaga from './withdrawRequests/saga';
import SASettingsSaga from './superAdminSettings/saga';
import adminUserWatcher from './adminUser/saga';
import EmailTemplateSaga from './emailTemplate/saga';
import WageringTemplateDetailsSaga from './wageringTemplate/saga';
import ProfileDataSaga from './Profile/saga';
import GlobalRegistrationSaga from './registrationformFiels/saga';
import DashboardViewSaga from './dashboardView/saga';
import UserDetailsSaga from './userDetails/saga';
import RestrictedCountriesSaga from './restrictedCountries/saga';
import CreateUpdateBonusSaga from './createUpdateBonus/saga';
import GlobalSettingSaga from './globalSetting/saga';
import Promotions from './promotions/saga';
import SpinWheelList from './spinWheelList/saga';
import Packages from './packages/saga';
import VipTiersSaga from './vipTier/saga';
import GameReportSaga from './gameReportList/saga';
import TicketManagementSaga from './ticketManagement/saga';
import ChannelSaga from './channel/saga';
import ChatrainSaga from './chatRain/saga';
import offensiveWordsSaga from './offensiveWords/saga';
import ChatRuleSaga from './chatRule/saga';
import NoticeDetailsSaga from './notice/saga';
import BonusDropDetailsSaga from './bonusDrop/saga';


export default function* rootSaga() {
	yield all([
		fork(AdminRoles),
		fork(CountriesSaga),
		fork(AuthSaga),
		fork(PermissionDetails),
		fork(PlayerSaga),
		fork(CmsDetailsSaga),
		fork(BonusDetailsSaga),
		fork(LanguagesSaga),
		fork(CurrenciesSaga),
		fork(LanguageManagementSaga),
		fork(BetSettingsSaga),
		fork(TransactionBankingSaga),
		fork(ReviewManagementSaga),
		fork(SportsTransactionSaga),
		fork(CasinoManagementSaga),
		fork(CasinoTransactionsSaga),
		fork(WithdrawRequestsSaga),
		fork(SASettingsSaga),
		fork(adminUserWatcher),
		fork(EmailTemplateSaga),
		fork(WageringTemplateDetailsSaga),
		fork(ProfileDataSaga),
		fork(GlobalRegistrationSaga),
		fork(UserDetailsSaga),
		fork(RestrictedCountriesSaga),
		fork(LayoutSaga),
		fork(AdminDetailsSaga),
		fork(aggregatorsSaga),
		fork(DashboardViewSaga),
		fork(CreateUpdateBonusSaga),
		fork(GlobalSettingSaga),
		fork(Promotions),
		fork(SpinWheelList),
		fork(Packages),
		fork(VipTiersSaga),
		fork(GameReportSaga),
		fork(TicketManagementSaga),
		fork(ChannelSaga),
		fork(ChatrainSaga),
		fork(offensiveWordsSaga),
		fork(ChatRuleSaga),
		fork(NoticeDetailsSaga),
		fork(BonusDropDetailsSaga),
	]);
}
