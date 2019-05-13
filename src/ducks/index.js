import gruzStatisticsReducer, {moduleName as gruzStatisticsModule} from './gruz-statistics'
import spravka1Reducer, {moduleName as spravka1Module} from './spravka1'
import spravka31Reducer, {moduleName as spravka31Module} from './spravka31'
import spravka2Reducer, {moduleName as spravka2Module} from './spravka2'
import podhodReducer, {moduleName as podhodModule} from './vagonpodhod'
import pogrvygrReducer, {moduleName as pogrVygrModule} from './pogrvygr'
import findvagonsReducer, {moduleName as findvagonsModule} from './findvagons'
import findvagonsAllReducer, {moduleName as findvagonsAllModule} from './findvagonsall'
import naturkiReducer, {moduleName as naturkiModule} from './naturki'
import findvagonhistoryReducer, {moduleName as findvagonhistoryModule} from './findvagonhistory'
import findpoezdvagonsReducer, {moduleName as findpoezdvagonsModule} from './findpoezdvagons'
// import globalReducer, {moduleName as globalModule} from './global'



export  default  {
    // [globalModule]: globalReducer,
    [gruzStatisticsModule]: gruzStatisticsReducer,
    [spravka1Module]: spravka1Reducer,
    [spravka2Module]: spravka2Reducer,
    [spravka31Module]: spravka31Reducer,
    [podhodModule]: podhodReducer,
    [findvagonsModule]: findvagonsReducer,
    [findvagonsAllModule]: findvagonsAllReducer,
    [pogrVygrModule]: pogrvygrReducer,
    [findvagonhistoryModule]: findvagonhistoryReducer,
    [naturkiModule]: naturkiReducer,
    [findpoezdvagonsModule]: findpoezdvagonsReducer,
}