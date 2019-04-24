import React, {Component} from 'react'
import {connect} from "react-redux"
import {Link, Route} from 'react-router-dom'
import { Navbar, Nav,  NavDropdown} from 'react-bootstrap';
import {setScrollPos, showNavbarSelector} from "../../ducks/global"


class NavbarGruz extends Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
    handleScroll() {
        this.props.setScrollPos(document.body.getBoundingClientRect().top)
    }
    render() {
        const {brand, navlinks, show}=this.props
        return (
            <div>
                <div className={show ? "active" : "hidden"} >
                <Navbar fixed="top" bg="light" collapseOnSelect expand="sm" className="p-0 m-0">
                    <Navbar.Brand as={Link} to={brand.to} >
                        <img src={brand.logo} alt="Logo" />
                        <span className={'gruz-text-ls gruz-font-110 pl-2'}>{brand.name}</span>
                    </Navbar.Brand>
                    <Nav className="pr-3">
                        <NavDropdown title="Отчеты" id="basic-nav-dropdown" >
                            {navlinks.map((link, index) => <NavDropdown.Item key={index} as={Link} to={link.to}>{link.name}</NavDropdown.Item>)}
                        </NavDropdown>
                    </Nav>
                </Navbar>
                </div>
                <Route path="/" exact component={brand.component}/>
                {navlinks.map((link, index) => <Route key={index} path={link.to} component={link.component}/>)}
            </div>
        )
    }
}

export default connect(state=>({
    show: showNavbarSelector(state)
}), {setScrollPos })(NavbarGruz)
