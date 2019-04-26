import React, {Component} from 'react'
import {ViewScrollProvider} from '../context'


class ViewScroll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showNavBar: true,
            ScrollPos:0
        }
        this.handleScroll = this.handleScroll.bind(this)
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll)
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll)
    }
    handleScroll() {
        const { scrollPos } = this.state;
        this.setState({
            scrollPos: document.body.getBoundingClientRect().top,
            showNavBar: document.body.getBoundingClientRect().top > scrollPos
        });

    }

    render() {
        return (
            <ViewScrollProvider value={this.state.showNavBar} >
                {this.props.children}
            </ViewScrollProvider>        )
    }
}

export default ViewScroll
