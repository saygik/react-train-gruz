import React from 'react'
import {Link, Route} from 'react-router-dom'
import { Navbar, Nav,  NavDropdown} from 'react-bootstrap';
import withViewScroll from "../hoc/with-view-scroll"
import {brand, navlinksGruz, navlinksAsus} from "./nav-bar-links"

const NavbarGruz = ({showNavBar}) =>
    <>
        <div className={showNavBar ? "active" : "hidden"} >
            <Navbar fixed="top" bg="light" collapseOnSelect expand="sm" className="p-0 m-0">
                <Navbar.Brand as={Link} to={brand.to} >
                    <img src={brand.logo} alt="Logo" />
                    <span className={'gruz-text-ls gruz-font-110 pl-2'}>{brand.name}</span>
                </Navbar.Brand>
                <Nav className="pr-3">
                    <NavDropdown title="Отчеты" id="basic-nav-dropdown" >
                        {navlinksGruz.map((link, index) => link.divider ? <NavDropdown.Divider key={index} /> :<NavDropdown.Item key={index} as={Link} to={link.to}>{link.name}</NavDropdown.Item>)}
                        </NavDropdown>
                    <NavDropdown title="АСУС" id="basic-nav-dropdown" >
                        {navlinksAsus.map((link, index) => <NavDropdown.Item key={index} as={Link} to={link.to}>{link.name}</NavDropdown.Item>)}
                    </NavDropdown>
                </Nav>
            </Navbar>
        </div>
        <Route path="/" exact component={brand.component}/>
        {navlinksGruz.map((link, index) => !link.render ?  <Route key={index} path={link.to} component={link.component}/> :
            <Route key={index}
                   path={link.to}
                   render={(routeProps)=>(
                       React.cloneElement(link.component, {...routeProps})
                   )}
            />)}
        {navlinksAsus.map((link, index) => <Route key={index} path={link.to} component={link.component}/>)}
    </>


export default  withViewScroll()(NavbarGruz)
