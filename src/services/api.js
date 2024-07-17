import { apiConfig } from "../config";
import { getCurrentDateTime } from '../ducks/utils'
import stanc from '../services/stanc'
import axios from 'axios'

import { OrderedMap, Map } from 'immutable'

export const api = {};

axios.defaults.timeout = 1000 * 55

const _apiBase = apiConfig.apiGruzUrl
//gruzClient 'http://localhost:9000/'
const getResource = (url) => {
    const errMsg = 'Ошибка получения данных'
    return axios.get(`${_apiBase}${url}`)
        .then(response => {
            if (response.status === 200) {
                return { fetchOK: true, data: response.data.data, msg: `Данные обновлены в ${getCurrentDateTime()}` };
            }
            else {
                console.log('-response-', response)
                return { fetchOK: false, msg: errMsg };
            }
        })
        .catch(error => {
            console.log('-err-', error)
            return { fetchOK: false, msg: errMsg }
        })
}
const postResource = (url, data) => {
    const errMsg = 'Ошибка изменения данных'
    return axios.post(`${_apiBase}${url}`, data)
        .then(response => {
            if (response.status === 200) {

                return { fetchOK: true, data: [], msg: `Данные изменены в ${getCurrentDateTime()}` };
            }
            else {
                return { fetchOK: false, msg: errMsg };
            }
        })
        .catch(error => {
            console.log('-err-', error)
            return { fetchOK: false, msg: errMsg }
        })
}


export const arrToEntities = (data, RecordModel = Map) => {
    return data.reduce((acc, item) => {
        return acc.set(item.ID, (new RecordModel(item)))
    }, new OrderedMap({}))
}
export const arrToMap = (data, RecordModel = Map) => {
    return data.reduce((acc, item) => {
        return acc.set(item.Id, (new RecordModel(item)))
    }, new OrderedMap({}))
}

const apiData = async (url, method = 'get', data = {}) => {

    return axios({
        method,
        url: _apiBase + url,
        data
    });
};


//***************************** GRUZ *******************************************************
export const updateClient = async (client) => await postResource(`/gruzClient`, client)
export const fetchGruzSprav1 = async () => await getResource(`/gruzSprav1`)
export const fetchGruzSprav2 = async () => await getResource(`/gruzSprav2`)
export const fetchGruzSprav31 = async () => await getResource(`/gruzSprav31`)
export const fetchGruzNaturki = async () => await getResource(`/gruzNaturki`)
export const fetchGruzClients = async () => await getResource(`/gruzClients/nod`)
export const fetchGruzAllClients = async () => await getResource(`/gruzClients`)
export const fetchGruzClientsForEdit = async () => await getResource(`/gruzClients/all`)
export const fetchUserByIP = async () => await getResource(`/getIP`)
export const fetchGruzGruz = async () => await getResource(`/gruzGruz`)
export const fetchStatistics = async () => {
    const res = await getResource(`/gruz`)
    return res.data ? {
        fetchOK: res.fetchOK,
        data: _transformStatistics(res.data),
        msg: res.msg
    } : res
}
export const fetchPodhod = async (stantion) => await getResource(`/gruzPodhod/${stantion}`)
export const fetchFindVagons = async (row) => await getResource(`/gruzFindVagons/${row.stan}/${row.tip}/${row.onStation}/${row.onNod}`)
export const fetchFindVagonsAll = async (row) => await getResource(`/gruzFindVagonsAll/${row.stan}/${row.client}/${row.gruz}/${row.vagon}`)
export const fetchPogrVygr = async (row) => await getResource(`/gruzFindPogrVygr/${row.stan}/${row.tip}/${row.oper}`)
export const fetchVagonHistory = async (row) => await getResource(`/gruzFindVagonsOneHistory/${row.Kodv}`)
export const fetchGruzStantions = () => ({ fetchOK: true, data: stanc, msg: `Данные обновлены в ${getCurrentDateTime()}` })
export const fetchPoezdVagons = async (row) => await getResource(`/gruzPoezdVagons/${row.kodp}/${row.fullnatur}`)


//***************************** ASUS *******************************************************
export const fetchAsusParks = async () => await getResource(`/asus/parks/13857`)
export const fetchAsusWays = async (parkId) => await getResource(`/asus/ways/${parkId}`)
export const fetchAsusVagons = async (wayId) => await getResource(`/asus/vagons/13857/${wayId}`)


api.oAuth2login = async (state) => await apiData(`/api/oauth/login?state=${state}`, 'get');
api.exchangeCode = async (params) => await apiData(`/api/oauth/token${params}`, 'get');

api.whoami = async (idtoken) => await apiData('/api/oauth/whoami', 'post', { "id_token": idtoken })
api.logout = async (idtoken) => await apiData('/api/oauth/logout', 'post', { "id_token": idtoken, "url": `${window.location.origin}/auth/logout` })
//index.refreshToken = async (token) => await apiData('/v1/token/refresh', '', 'post', JSON.stringify({ refresh_token: token }));

const _transformStatistics = (stat) => {
    return [
        { id: 1, value: stat.AllVagons, name: 'Вагонов всего', url: '/disl', caption: 'Вагонов на всех станциях и подходах к ним  на Барановичском отделении' },
        { id: 2, value: stat.OnStantionsVagons, name: 'Вагонов на станциях', url: '/disl', caption: 'Вагонов на всех станциях Барановичского отделения' },
        { id: 3, value: stat.InNearApproachVagons, name: 'Вагонов на ближних подходах', url: '/disl', caption: 'Вагонов на ближнем подходе к станциям Барановичского отделения' },
        { id: 4, value: stat.InFarApproachVagons, name: 'Вагонов на дальних подходах', url: '/disl', caption: 'Вагонов на дальнем подходе к станциям Барановичского отделения' },
        { id: 5, value: stat.LoadedVagons, name: 'Вагонов погружено', url: '/pogrvygr', caption: 'Вагонов погружено на всех станциях Барановичского отделения' },
        { id: 6, value: stat.LoadedVesVagons, name: 'Вес погруженных вагонов', url: '/pogrvygr', caption: 'Вес погруженных вагонов на всех станциях Барановичского отделения' },
        { id: 7, value: stat.UnloadedVagons, name: 'Вагонов выгружено', url: '/pogrvygr', caption: 'Вагонов выгружено на всех станциях Барановичского отделения' },
        { id: 8, value: stat.ArrivedVagons, name: 'Поступило вагонов', url: '/pogrvygr', caption: 'Вагонов поступило на Барановичское отделение' },
    ]
}

