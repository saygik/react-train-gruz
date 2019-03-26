import "@babel/polyfill"
import React, {Component} from 'react'
import {Link, Route} from 'react-router-dom'
import { Navbar, Nav,  NavDropdown} from 'react-bootstrap';
import WagonApproach from './wagonapproach'
import Spravka1 from './spravka1'
import Home from './home'
import Logo from '../img/train.png'
import "./root.css"
import 'bootstrap/dist/css/bootstrap.min.css'

class Root extends Component {
    render() {
        return (
            <div>
                <Navbar fixed="top" bg="light" expand="lg">
                    <Navbar.Brand href="#home">
                        <img src={Logo} alt="Logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to='/'>Домашняя</Nav.Link>
                            <NavDropdown title="Отчеты" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to={'/disl'}>Дислокация вагонов</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to={'/podhod'}>Подход вагонов</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Route path="/" exact component={Home} />
                <Route path="/disl" component={Spravka1}/>
                <Route path="/podhod" component={WagonApproach}/>

            </div>
        )
    }
}

export default Root
