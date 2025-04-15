import React from 'react';

const permissionIcons = () => ({
	ContentManagement: <i className="bx bx-list-ol" />,
	Bonus: <i className="bx bxs-dollar-circle" />,
	Players: <i className="bx bx-user" />,
	Administrator: <i className="bx bx-shield-quarter" />,
	Tenant: <i className="mdi mdi-search-web" />,
	CountriesStates: <i className="bx bx-layout" />,
	PlayerEngagement: <i className="bx bx-list-check" />,
	KYC: <i className="bx bx-user-check" />,
	Reports: <i className="bx bxs-report" />,
	Packages: <i className="bx bx-dollar" />,
	GameReport: <i className="bx bx-football" />,
	ChatModule: <i className="bx bx-comment-dots" />,
	BetSettings: <i className="bx bx-wrench" />,
	ImageGallery: <i className="bx bxs-image" />,
	Transactions: <i className="bx bx-wallet-alt" />,
	CRM: <i className="bx bx-mail-send" />,
	MultiLanguage: <i className="mdi mdi-google-translate" />,
	TenantSettings: <i className="mdi mdi-web-clock" />,
	DemographReport: <i className="mdi mdi-map-marker" />,
	BannerManagement: <i className="mdi mdi-file-presentation-box" />,
	CasinoManagement: <i className="mdi mdi-gamepad-variant-outline" />,
	KpiSummaryReport: <i className="mdi mdi-chart-box-outline" />,
	LivePlayerReport: <i className="mdi mdi-television-play" />,
	WageringTemplate: <i className="mdi mdi-credit-card-plus" />,
	AMOE: <i className="mdi mdi-cash" />,
	LoyaltyManagement: <i className="mdi mdi-trophy-outline" />,
	RegistrationField: <i className="bx bx-user-plus" />,
	RestrictedCountry: <i className="mdi mdi-map-marker-off-outline" />,
	TenantCredentials: <i className="mdi mdi-onepassword" />,
	TenantConfigurations: <i className="mdi mdi-content-save-settings-outline" />,
	PlayerLiabilityReport: <i className="mdi mdi-file-chart-outline" />,
	PaymentGateway: <i className="bx bxs-user-detail" />,
	AppConfiguration: <i className="mdi mdi-web" />,
	SportbookManagement: <i className="mdi mdi-hockey-sticks" />,
	SportsbookManagement: <i className="bx bx-ball" />,
	AffiliateModule: <i className="bx bx-shopping-bag" />,
	FraudDetection: <i className="bx bx-shopping-bag" />,
});

const permissionLabel = (label) => {
	switch (label) {
		case 'C':
			return 'Create';
		case 'R':
			return 'Read';
		case 'U':
			return 'Update';
		case 'D':
			return 'Delete';
		case 'T':
			return 'Toggle Status';
		case 'A':
			return 'Apply';
		case 'CC':
			return 'Create Custom';
		case 'AB':
			return 'Manage Money';
		case 'SR':
			return 'Limit';
		case 'TE':
			return 'Test Email';
		case 'EV':
			return 'Verify Email';
		case 'UP':
			return 'Reset Password';
		case 'UPL':
			return 'Upload';
		default:
			return label;
	}
};

const modules = {
	AMOE:'AMOE',
	Administrator:'Administrator',
	AffiliateModule:'AffiliateModule',
	AppConfiguration:'AppConfiguration',
	Bonus:'Bonus',
	CRM:'CRM',
	CasinoManagement:'CasinoManagement',
	ChatModule:'ChatModule',
	ContentManagement:'ContentManagement',
	CountriesStates:'CountriesStates',
	FraudDetection:'FraudDetection',
	KYC:'KYC',
	Packages:'Packages',
	PaymentGateway:'PaymentGateway',
	PlayerEngagement:'PlayerEngagement',
	Players:'Players',
	Reports:'Reports'
};

export { permissionIcons, permissionLabel, modules };
