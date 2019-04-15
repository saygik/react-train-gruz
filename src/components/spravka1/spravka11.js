import React, {Component} from 'react'
import Sprav1Table from "./Sprav1Table"
import {spravka} from '../hoc'


class spravka11 extends Component {
    render() {
        const Spravka1= spravka('spravka1')(Sprav1Table)
        return (
            <Spravka1 />
        )
    }
}

export default spravka11
