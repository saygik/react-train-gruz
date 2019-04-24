import {apiConfig} from "../config";
import {getCurrentDateTime } from '../ducks/utils'
import stanc from '../services/stanc'
import axios from 'axios'

axios.defaults.timeout = 1000 * 10

const _apiBase = apiConfig.apiGruzUrl

const getResource =  (url) => {
    const errMsg='Ошибка получения данных'
    return axios.get(`${_apiBase}${url}`)
        .then (response =>  {
            if (response.status===200) {
                return {fetchOK: true,data: response.data.data, msg: `Данные обновлены в ${getCurrentDateTime()}`};
            }
            else {
                return {fetchOK: false, msg: errMsg};
            }
        })
        .catch(error    =>   {
            console.log('-err-',error )
            return {fetchOK: false, msg: errMsg}
        })
}
export const fetchGruzSprav1 = async () => await getResource(`gruzSprav1`)

export const fetchGruzSprav2 = async () => await getResource(`gruzSprav2`)

export const fetchGruzSprav31 = async () => await getResource(`gruzSprav31`)

export const fetchGruzNaturki = async () => await getResource(`gruzNaturki`)

export const fetchStatistics =  async () => {
    const res= await getResource(`gruz`)
    return res.data ? {
        fetchOK: res.fetchOK,
        data: _transformStatistics(res.data),
        msg: res.msg
    } : res
}

export const fetchPodhod = async (stantion) =>  await getResource(`gruzPodhod/${stantion}`)

export const fetchFindVagons = async (row) => await  getResource(`gruzFindVagons/${row.stan}/${row.tip}/${row.onStation}/${row.onNod}`)

export const fetchPogrVygr = async (row) =>  await getResource(`gruzFindPogrVygr/${row.stan}/${row.tip}/${row.oper}`)

export const fetchVagonHistory = async (row) => await getResource(`gruzFindVagonsOneHistory/${row.Kodv}`)

export const fetchGruzStantions = () => ({fetchOK: true,data: stanc, msg: `Данные обновлены в ${getCurrentDateTime()}`})

export const fetchPoezdVagons = async (row) => await getResource(`gruzPoezdVagons/${row.kodp}/${row.fullnatur}`)


const _transformStatistics = (stat) => {
    return [
        {id: 1,value: stat.AllVagons, name: 'Вагонов на отделении всего', url: '/disl'},
        {id: 2,value: stat.OnStantionsVagons, name:'Вагонов на станциях', url: '/disl'},
        {id: 3,value: stat.InNearApproachVagons, name:'Вагонов на ближних подходах', url: '/disl'},
        {id: 4,value: stat.InFarApproachVagons, name:'Вагонов на дальних подходах', url: '/disl'},
        {id: 5,value: stat.LoadedVagons, name:'Вагонов погружено', url: '/pogrvygr'},
        {id: 6,value: stat.LoadedVesVagons, name:'Вес погруженных вагонов', url: '/pogrvygr'},
        {id: 7,value: stat.UnloadedVagons, name:'Вагонов выгружено', url: '/pogrvygr'},
        {id: 8,value: stat.ArrivedVagons, name:'Поступило вагонов', url: '/pogrvygr'}
    ]
}

