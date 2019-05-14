import React from "react"
import Spravka31 from "../pages/spravka31"
import Naturki from "../pages/naturki"
import Spravka1 from "../pages/spravka1"
import Spravka2 from "../pages/spravka2"
import VagonPodhod from "../pages/vagonpodhod"
import GruzStatistics from "../shared/gruz-statistics"
import ExtReportIframe from "../pages/ext-report-iframe"
import {FindVagonsAll} from "../pages/findvagons"
import Clients from '../pages/clients'
import Logo from '../../img/train.png'

const brand = { name: "Грузовая работа", to: "/", component: GruzStatistics, logo: Logo }
const nod2exp = <ExtReportIframe url={"http://ivc-sql16/ReportServer/Pages/ReportViewer.aspx?%2fAPI%2f%d0%9d%d0%9e%d0%94-2+%d0%9d%d0%b0%d0%bb%d0%b8%d1%87%d0%b8%d0%b5+%d1%8d%d0%ba%d1%81%d0%bf%d0%be%d1%80%d1%82%d0%b0+%d0%bd&rs:Command=Render"} />
const semvag = <ExtReportIframe url={"http://ivc-sql16/ReportServer/Pages/ReportViewer.aspx?%2fAPI%2f%d0%9d%d0%b0%d0%bb%d0%b8%d1%87%d0%b8%d0%b5+%d0%b2%d0%b0%d0%b3%d0%be%d0%bd%d0%be%d0%b2+%d1%81+%d0%b3%d1%80%d1%83%d0%b7%d0%be+(%d0%a1%d0%b5%d0%bc%d1%8f%d0%bd%d1%83%d0%b2%d0%ba%d0%b8)&rs:Command=Render"} />
const kuzvag = <ExtReportIframe url={"http://ivc-sql16/ReportServer/Pages/ReportViewer.aspx?%2fAPI%2f%d0%9d%d0%b0%d0%bb%d0%b8%d1%87%d0%b8%d0%b5+%d0%b2%d0%b0%d0%b3%d0%be%d0%bd%d0%be%d0%b2+%d1%81+%d0%b3%d1%80%d1%83%d0%b7%d0%be(%d0%9a%d1%83%d0%b7%d0%bd%d0%b8%d1%86%d1%8b)&rs:Command=Render"} />
const navlinks = [
    { name: "Дислокация вагонов", to: "/disl", component: Spravka1 },
    { name: "Погрузка, выгрузка и поступление вагонов с местным грузом", to: "/pogrvygr", component: Spravka2 },
    { name: "Наличие вагонов с местным грузом", to: "/mesgruz", component: Spravka31 },
    { name: "Натурки мест", to: "/naturki", component: Naturki },
    { name: "Подход вагонов", to: "/podhod", component: VagonPodhod },
    { name: "Поиск вагонов", to: "/findvagons", component: FindVagonsAll },
    { name: "Поиск клиентов", to: "/clients", component: Clients },
    { divider: "true" },
    { name: "НОД-2 Наличие экспорта на отделении", to: "/nod2exp", component: nod2exp, render: true},
    { name: "Наличие вагонов с грузом для Семянувки на отделении", to: "/semvag", component: semvag, render: true},
    { name: "Наличие вагонов с грузом для Семенувки/Кузницы на отделении", to: "/kuzvag", component: kuzvag, render: true}
]
export {
    brand,
    navlinks
}
