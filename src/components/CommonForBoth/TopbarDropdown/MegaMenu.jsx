import React, { useState } from 'react';
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import megamenuImg from '../../../assets/images/megamenu-img.png';
import { getMegaMenuElement } from '../../../constants/sidebar';
import usePermission from '../../Common/Hooks/usePermission';

const MegaMenu = () => {
  const { isGranted } = usePermission();
	const superAdminUser = useSelector((state) => state.PermissionDetails.superAdminUser);
	const [megaMenu, setmegaMenu] = useState(false);

	return (
		<Dropdown
			className="dropdown-mega d-none d-lg-block ms-2"
			isOpen={megaMenu}
			toggle={() => {
				setmegaMenu(!megaMenu);
			}}
		>
			<DropdownToggle className="btn header-item " caret tag="button">
				{' '}
				Mega Menu <i className="mdi mdi-chevron-down" />
			</DropdownToggle>
			<DropdownMenu className="dropdown-megamenu">
				<Row>
					<Col sm={12}>
						<Row>
							{getMegaMenuElement()?.map((nav) => {
                  if(nav?.separatorModule && superAdminUser) {
                    const navSeparatorPermissions = nav?.separatorModule?.filter((module) => isGranted(module, 'R'));
                    if(navSeparatorPermissions?.length === 0) return null;
                  }

                return (
                  <Col md={2} key={nav.label}>
                    <h5 className="font-size-14 mt-0">{nav?.label}</h5>
                    {nav?.subMenu?.length && (
                      <ul className="list-unstyled megamenu-list">
                        {nav?.subMenu?.map((sub) => {
                          if (sub?.module && !isGranted(sub.module, 'R')) {
                            return null;
                          }

                          if (sub?.groupModules) {
                            const groupPermissions = sub?.groupModules?.filter((module) => isGranted(module, 'R'));
                            if(groupPermissions?.length === 0) return null;
                          }

                          return (
                            <li key={sub.link}>
                              <Link to={sub.link} onClick={() => setmegaMenu(!megaMenu)}>{sub.label}</Link>
                            </li>
                        )})}
                      </ul>
                    )}
                  </Col>
							)})}
							<Col md={2}>
								<div>
									<img
										src={megamenuImg}
										alt=""
										className="img-fluid mx-auto d-block"
									/>
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
			</DropdownMenu>
		</Dropdown>
	);
};

export default MegaMenu;
