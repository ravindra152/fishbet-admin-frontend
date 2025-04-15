// import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import withRouter from '../Common/withRouter';

// i18n
import SidebarContent from './SidebarContent';
// import logo from '../../assets/images/logo.svg';
// import logoLightPng from '../../assets/images/logo-light.png';
// import logoLightSvg from '../../assets/images/logo-light.svg';

import logo from '../../assets/images/company-logo.png';
import smallLogo from '../../assets/images/favicon.ico';

const Sidebar = () => {
  // State to handle sidebar collapse/expand
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClick = () => {
    // Toggle the collapsed state
    setIsCollapsed(!isCollapsed);

    // Toggle the 'vertical-collapsed' class on the body
    document.body.classList.toggle('sidebar-enable');
  };

  return (
    <div className={`vertical-menu ${isCollapsed ? 'collapsed' : 'sidebar-enable'}`} onClick={handleClick}>
      <div className="navbar-brand-box">
        <Link to="/" className="logo">
          <span className="logo-sm">
            <img src={smallLogo} alt="" height="22" />
          </span>
          <span className="logo-lg">
            <img src={logo} alt="logo" style={{ filter: 'invert(1)' }} className="sidebar-logo" />
          </span>
        </Link>
      </div>
      <div data-simplebar className="h-100">
        {/* Add SidebarContent component and pass the dropdown toggle functionality */}
        <SidebarContent />
      </div>
      <div className="sidebar-background" />
    </div>
  );
};

Sidebar.defaultProps = {
  // type: '',
};

Sidebar.propTypes = {
  // type: PropTypes.string,
};

const mapStatetoProps = (state) => ({
  layout: state.Layout,
});

export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
