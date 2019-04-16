import React, {Component} from 'react'
import Sprav31Table from "./sprav31-table"
import {spravka} from '../hoc'


class spravka1 extends Component {
    render() {
        const Spravka= spravka('spravka31')(Sprav31Table)
        return (
            <Spravka />
        )
    }
}

export default spravka1
