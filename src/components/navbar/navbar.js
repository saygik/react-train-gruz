import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Button, Form } from 'react-bootstrap';
import withViewScroll from "../hoc/with-view-scroll"
import { brand, navlinksGruz, navlinksAsus } from "../../routes/nav-bar-links"
import { useAuth } from '../../context/Auth';

const NavbarGruz = ({ showNavBar }) => {
    const { signedIn, user, signOut, signIn, isFullAccess, isASUSAccess } = useAuth();

    return (
        <>
            <div className={showNavBar ? "active" : "hidden"} >
                <Navbar fixed="top" bg="light" collapseOnSelect expand="sm" className="p-0 m-0">
                    <Navbar.Brand as={Link} to={brand.to} >
                        <img src={brand.logo} alt="Logo" />
                        <span className={'gruz-text-ls gruz-font-110 pl-2'}>{brand.name}</span>
                    </Navbar.Brand>
                    {signedIn &&
                        <Nav className="pr-3">
                            <NavDropdown title="Отчеты" id="basic-nav-dropdown" >
                                {navlinksGruz.map((link, index) => {
                                    if (!isFullAccess && link.fullAccess) return
                                    return link.divider ? <NavDropdown.Divider key={index} /> : <NavDropdown.Item key={index} as={Link} to={link.to}>{link.name}</NavDropdown.Item>
                                }
                                )}
                            </NavDropdown>
                            {isASUSAccess && < NavDropdown title="АСУС" id="basic-nav-dropdown" >
                                {navlinksAsus.map((link, index) => <NavDropdown.Item key={index} as={Link} to={link.to}>{link.name}</NavDropdown.Item>)}
                            </NavDropdown>
                            }
                        </Nav>
                    }
                    <Navbar.Collapse className="justify-content-end pr-2">
                        <Navbar.Text className="pr-2 ">
                            {user.name}
                        </Navbar.Text>
                        <Form className="d-flex">
                            {signedIn
                                ? <Button variant="secondary" size="sm" onClick={() => signOut()}>Выйти</Button>
                                : <Button variant="secondary" size="sm" onClick={() => signIn()}>Войти</Button>
                            }
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            {/* <Route path="/" exact component={brand.component} />
            {navlinksGruz.map((link, index) => !link.render ? <Route key={index} path={link.to} component={link.component} /> :
                <Route key={index}
                    path={link.to}
                    render={(routeProps) => (
                        React.cloneElement(link.component, { ...routeProps })
                    )}
                />)}
            {navlinksAsus.map((link, index) => <Route key={index} path={link.to} component={link.component} />)} */}
        </>
    )
}

export default withViewScroll()(NavbarGruz)
