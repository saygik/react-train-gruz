import React, {Component} from 'react'

import VagonPodhod from './vagonpodhod'
import GruzStatistics from './gruz-statistics'
import Spravka1 from './spravka1'
import Spravka2 from './spravka2'
import Spravka31 from './spravka31'
import Naturki from './naturki'
import Navbar from './navbar'
import Logo from '../img/train.png'

import "./root.css"
import 'bootstrap/dist/css/bootstrap.min.css'


class Root extends Component {
    render() {
        const brand = { name: "Грузовая работа", to: "/", component: GruzStatistics, logo: Logo }
        const navlinks = [
            { name: "Дислокация вагонов", to: "/disl", component: Spravka1 },
            { name: "Погрузка, выгрузка и поступление вагонов с местным грузом", to: "/pogrvygr", component: Spravka2 },
            { name: "Наличие вагонов с местным грузом", to: "/mesgruz", component: Spravka31 },
            { name: "Натурки мест", to: "/naturki", component: Naturki },
            { name: "Подход вагонов", to: "/podhod", component: VagonPodhod },
        ];
        return (
            <div>
                <Navbar navlinks={navlinks} brand={brand}  />
            </div>
        )
    }
}

export default Root
