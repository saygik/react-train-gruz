import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import withViewScroll from "../hoc/with-view-scroll"
import { brand, navlinksGruz, navlinksAsus } from "../../routes/nav-bar-links"
import { useAuth } from '../../context/Auth';
import { authConfig } from '../../config';

const NavbarGruz = ({ showNavBar }) => {
    const { signedIn, user, signOut, isFullAccess, isASUSAccess } = useAuth();
    const location = useLocation();

    // На страницах входа навигационная панель не нужна
    const isAuthPage = location.pathname === authConfig.loginPath || location.pathname === authConfig.callbackPath;
    if (!signedIn || isAuthPage) return null;

    return (
        <div className={showNavBar ? "active" : "hidden"} >
            <Navbar fixed="top" bg="light" collapseOnSelect expand="sm" className="p-0 m-0">
                <Navbar.Brand as={Link} to={brand.to} >
                    <img src={brand.logo} alt="Logo" />
                    <span className={'gruz-text-ls gruz-font-110 pl-2'}>{brand.name}</span>
                </Navbar.Brand>
                <Nav className="pr-3">
                    <NavDropdown title="Отчеты" id="basic-nav-dropdown" >
                        {navlinksGruz.map((link, index) => {
                            if (!isFullAccess && link.fullAccess) return null
                            return link.divider ? <NavDropdown.Divider key={index} /> : <NavDropdown.Item key={index} as={Link} to={link.to}>{link.name}</NavDropdown.Item>
                        }
                        )}
                    </NavDropdown>
                    {isASUSAccess && < NavDropdown title="АСУС" id="basic-nav-dropdown" >
                        {navlinksAsus.map((link, index) => <NavDropdown.Item key={index} as={Link} to={link.to}>{link.name}</NavDropdown.Item>)}
                    </NavDropdown>
                    }
                </Nav>
                <Navbar.Collapse className="justify-content-end pr-2">
                    <Navbar.Text className="pr-2 ">
                        {user.name}
                    </Navbar.Text>
                    <button
                        type="button"
                        className="navbar-logout"
                        onClick={() => signOut()}
                        title="Выйти"
                        aria-label="Выйти"
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </button>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default withViewScroll()(NavbarGruz)
