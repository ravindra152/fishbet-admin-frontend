/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Import menuDropdown
import { withTranslation } from 'react-i18next';
// import NotificationDropdown from '../CommonForBoth/TopbarDropdown/NotificationDropdown';
import ProfileMenu from '../CommonForBoth/TopbarDropdown/ProfileMenu';

import logo from '../../assets/images/company-logo.png';
import smallLogo from '../../assets/images/favicon.ico'

// i18n

// Redux Store
import {
	showRightSidebarAction,
	toggleLeftmenu,
	changeSidebarType,
} from '../../store/actions';
// import MegaMenu from '../CommonForBoth/TopbarDropdown/MegaMenu';

const Header = (props) => {
	function toggleFullscreen() {
		if (
			!document.fullscreenElement &&
			/* alternative standard method */ !document.mozFullScreenElement &&
			!document.webkitFullscreenElement
		) {
			// current working methods
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen(
					Element.ALLOW_KEYBOARD_INPUT
				);
			}
		} else if (document.cancelFullScreen) {
			document.cancelFullScreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	}

	function tToggle() {
		const { body } = document;
		if (window.screen.width <= 998) {
			body.classList.toggle('sidebar-enable');
		} else {
			body.classList.toggle('vertical-collpsed');
			body.classList.toggle('sidebar-enable');
		}
	}

	return (
		<header id="page-topbar">
			<div className="navbar-header">
				<div className="d-flex">
					<div className="navbar-brand-box d-lg-none d-md-block">
						<Link to="/" className="logo">
							<span className="logo-sm">
								<img src={smallLogo} alt="" height="30" />
							</span>
						</Link>

						{/* <Link to="/" className="logo logo-light">
							<span className="logo-sm">
								<img src={logo} alt="" height="22" />
							</span>
						</Link> */}
					</div>

					<button 
						type="button"
						onClick={() => {
							tToggle();
						}}
						className="btn btn-sm px-3 font-size-16 header-item "
						id="vertical-menu-btn"
						aria-label="Toggle Vertical Menu"
					>
						<i className="fa fa-fw fa-bars" />
					</button>

					{/* <NavigationSearch /> */}

					{/* <MegaMenu /> */}
				</div>
				<div className="d-flex">
					{/* <div className="dropdown d-inline-block d-lg-none ms-2">
						<button
							onClick={() => {
								setsearch(!search);
							}}
							type="button"
							className="btn header-item noti-icon "
							id="page-header-search-dropdown"
						>
							<i className="mdi mdi-magnify" />
						</button>
						<div
							className={
								search
									? 'dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show'
									: 'dropdown-menu dropdown-menu-lg dropdown-menu-end p-0'
							}
							aria-labelledby="page-header-search-dropdown"
						>
							<form className="p-3">
								<div className="form-group m-0">
									<div className="input-group">
										<input
											type="text"
											className="form-control"
											placeholder="Search ..."
											aria-label="Recipient's username"
										/>
										<div className="input-group-append">
											<button className="btn btn-primary" type="submit">
												<i className="mdi mdi-magnify" />
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div> */}

					{/* <LanguageDropdown /> */}

					{/* <SocialDropdown /> */}

					<div className="dropdown d-none d-lg-inline-block ms-1">
						<button
							type="button"
							onClick={() => {
								toggleFullscreen();
							}}
							className="btn header-item noti-icon "
							data-toggle="fullscreen"
							aria-label="Toggle Fullscreen"
						>
							<i className="bx bx-fullscreen" />
						</button>
					</div>

					{/* <NotificationDropdown /> */}
					<ProfileMenu
						showRightSidebarAction={props.showRightSidebarAction}
						showRightSidebar={props.showRightSidebar}
					/>

					<div
						onClick={() => {
							props.showRightSidebarAction(!props.showRightSidebar);
						}}
						className="dropdown d-inline-block"
						role="button"
						tabIndex={0}
						aria-label="Toggle Right Sidebar"
					>
						<button
							type="button"
							className="btn header-item noti-icon right-bar-toggle "
							aria-label="Toggle Right Bar"
						>
							<i className="bx bx-cog bx-spin" />
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

Header.defaultProps = {
	// changeSidebarType: PropTypes.func,
	// leftSideBarType: PropTypes.objectOf,
	showRightSidebar: () => {},
	showRightSidebarAction: () => {},
	// t: () => {},
};

Header.propTypes = {
	// changeSidebarType: PropTypes.func,
	// leftSideBarType: PropTypes.objectOf,
	showRightSidebar: PropTypes.objectOf,
	showRightSidebarAction: PropTypes.func,
	// t: PropTypes.func,
};

const mapStatetoProps = (state) => {
	const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
		state.Layout;
	return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
	showRightSidebarAction,
	toggleLeftmenu,
	changeSidebarType,
})(withTranslation()(Header));
