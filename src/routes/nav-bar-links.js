import React from "react"
import Spravka31 from "../components/pages/spravka31"
import Naturki from "../components/pages/naturki"
import Spravka1 from "../components/pages/spravka1"
import Spravka2 from "../components/pages/spravka2"
import VagonPodhod from "../components/pages/vagonpodhod"
import GruzStatistics from "../components/shared/gruz-statistics"
import ExtReportIframe from "../components/pages/ext-report-iframe"
import { FindVagonsAll } from "../components/pages/findvagons"
import Clients from '../components/pages/clients'
import Asus from "../components/pages/asus"
import Logo from '../img/train.png'

const brand = { name: "Грузовая работа", to: "/", component: GruzStatistics, logo: Logo }
const nod2exp = <ExtReportIframe url={"http://reports.brnv.rw/ReportServer/Pages/ReportViewer.aspx?%2fAPI%2f%d0%9d%d0%9e%d0%94-2+%d0%9d%d0%b0%d0%bb%d0%b8%d1%87%d0%b8%d0%b5+%d1%8d%d0%ba%d1%81%d0%bf%d0%be%d1%80%d1%82%d0%b0+%d0%bd&rs:Command=Render"} />
const semvag = <ExtReportIframe url={"http://reports.brnv.rw/ReportServer/Pages/ReportViewer.aspx?%2fAPI%2f%d0%9d%d0%b0%d0%bb%d0%b8%d1%87%d0%b8%d0%b5+%d0%b2%d0%b0%d0%b3%d0%be%d0%bd%d0%be%d0%b2+%d1%81+%d0%b3%d1%80%d1%83%d0%b7%d0%be+(%d0%a1%d0%b5%d0%bc%d1%8f%d0%bd%d1%83%d0%b2%d0%ba%d0%b8)&rs:Command=Render"} />
const kuzvag = <ExtReportIframe url={"http://reports.brnv.rw/ReportServer/Pages/ReportViewer.aspx?%2fAPI%2f%d0%9d%d0%b0%d0%bb%d0%b8%d1%87%d0%b8%d0%b5+%d0%b2%d0%b0%d0%b3%d0%be%d0%bd%d0%be%d0%b2+%d1%81+%d0%b3%d1%80%d1%83%d0%b7%d0%be(%d0%9a%d1%83%d0%b7%d0%bd%d0%b8%d1%86%d1%8b)&rs:Command=Render"} />
const navlinksGruz = [
    { name: "Дислокация вагонов", to: "/disl", component: Spravka1, fullAccess: true },
    { name: "Погрузка, выгрузка и поступление вагонов с местным грузом", to: "/pogrvygr", component: Spravka2, fullAccess: true },
    { name: "Наличие вагонов с местным грузом", to: "/mesgruz", component: Spravka31, fullAccess: true },
    { name: "Натурки мест", to: "/naturki", component: Naturki, fullAccess: true },
    { name: "Подход вагонов", to: "/podhod", component: VagonPodhod, fullAccess: false },
    { name: "Поиск вагонов", to: "/findvagons", component: FindVagonsAll, fullAccess: true },
    { name: "Поиск клиентов", to: "/clients", component: Clients, fullAccess: true },
    // { divider: "true" },
    // { name: "НОД-2 Наличие экспорта на отделении", to: "/nod2exp", component: nod2exp, render: true },
    // { name: "Наличие экспорта для Кузницы/Семянувки", to: "/semvag", component: semvag, render: true },
    // { name: "Наличие вагонов с грузом для Семенувки/Кузницы на отделении", to: "/kuzvag", component: kuzvag, render: true }
]
const navlinksAsus = [
    { name: "Барановичи-Центральные", to: "/nakoplenie13857", component: Asus, fullAccess: true },
]
export {
    brand,
    navlinksGruz,
    navlinksAsus
}
