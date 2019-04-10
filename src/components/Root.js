import React, {Component} from 'react'
import {Link, Route} from 'react-router-dom'
import { Navbar, Nav,  NavDropdown} from 'react-bootstrap';
import WagonApproach from './wagonapproach'
import Spravka1 from './spravka1'
import Spravka2 from './spravka2'
import Spravka31 from './spravka31'
import Home from './home'
import Logo from '../img/train.png'
import "./root.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'

class Root extends Component {
    render() {
        return (
            <div>
                <Navbar fixed="top" bg="light" collapseOnSelect='true' >
                    <Navbar.Brand as={Link} to='/'>
                        <img src={Logo} alt="Logo" />
                        Грузовая работа
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title="Отчеты" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to={'/disl'}>Дислокация вагонов</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={'/pogrvygr'}>Погрузка, выгрузка и поступление вагонов с местным грузом</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={'/mesgruz'}>Наличие вагонов с местным грузом</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to={'/podhod'}>Подход вагонов</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Route path="/" exact component={Home} />
                <Route path="/disl" component={Spravka1}/>
                <Route path="/pogrvygr" component={Spravka2}/>
                <Route path="/mesgruz" component={Spravka31}/>
                <Route path="/podhod" component={WagonApproach}/>

            </div>
        )
    }
}

export default Root
