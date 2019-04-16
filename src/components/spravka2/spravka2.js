import React, {Component} from 'react'
import Sprav2Table from "./sprav2-table"
import {spravka} from '../hoc'


class spravka2 extends Component {
    render() {
        const Spravka= spravka('spravka2')(Sprav2Table)
        return (
            <Spravka />
        )
    }
}

export default spravka2
