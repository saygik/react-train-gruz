import Spravka31 from "../spravka31"
import Naturki from "../naturki"
import Spravka1 from "../spravka1"
import Spravka2 from "../spravka2"
import {FindVagonsAll} from "../findvagons"
import VagonPodhod from "../vagonpodhod"
import GruzStatistics from "../gruz-statistics"
import Logo from '../../img/train.png'

const brand = { name: "Грузовая работа", to: "/", component: GruzStatistics, logo: Logo }
const navlinks = [
    { name: "Дислокация вагонов", to: "/disl", component: Spravka1 },
    { name: "Погрузка, выгрузка и поступление вагонов с местным грузом", to: "/pogrvygr", component: Spravka2 },
    { name: "Наличие вагонов с местным грузом", to: "/mesgruz", component: Spravka31 },
    { name: "Натурки мест", to: "/naturki", component: Naturki },
    { name: "Подход вагонов", to: "/podhod", component: VagonPodhod },
    { name: "Поиск вагонов", to: "/findvagons", component: FindVagonsAll },
]
export {
    brand,
    navlinks
}
