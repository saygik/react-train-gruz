import React, {Component} from 'react'
import Sprav1Table from "./sprav1-table"
import {spravka} from '../hoc'


class spravka1 extends Component {
    render() {
        const Spravka= spravka('spravka1')(Sprav1Table)
        return (
            <Spravka />
        )
    }
}

export default spravka1
