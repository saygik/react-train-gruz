import {apiConfig} from "../config";
import {getCurrentDateTime } from '../ducks/utils'
import stanc from '../services/stanc'

const _apiBase = apiConfig.apiGruzUrl

const getResource = async (url) => {
    const response = await fetch(`${_apiBase}${url}`)
    if (!response.ok) {
        return {fetchOK: true,data: [], msg: 'Критическая ошибка получения данных с сервера'};
    } else {
        if (response.status===200) {
            const data = await response.json();
            return {fetchOK: true,data: data.data, msg: `Данные успешно обновлены ${getCurrentDateTime()}`};
        }
        else {
            return {fetchOK: false,data: [], msg: 'Ошибка получения данных с сервера'};
        }
    }
};
export const fetchGruzSprav1 = async () =>  await getResource(`gruzSprav1`)
export const fetchGruzSprav2 = async () =>  await getResource(`gruzSprav2`)
export const fetchGruzSprav31 = async () =>  await getResource(`gruzSprav31`)

export const fetchPodhod = async (stantion) =>  await getResource(`gruzPodhod/${stantion}`)
export const fetchFindVagons = async (row) =>  await getResource(`gruzFindVagons/${row.stan}/${row.tip}/${row.onStation}/${row.onNod}`)
export const fetchPogrVygr = async (row) =>  await getResource(`gruzFindPogrVygr/${row.stan}/${row.tip}/${row.oper}`)
export const fetchVagonHistory = async (row) =>  await getResource(`gruzFindVagonsOneHistory/${row.Kodv}`)

export const fetchGruzStantions = () => ({fetchOK: true,data: stanc, msg: `Данные успешно обновлены ${getCurrentDateTime()}`})


