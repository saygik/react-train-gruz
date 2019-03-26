import {apiConfig} from "../config";
import {getCurrentDateTime } from './utils'
//import stanc2 from '../services/stanc'


export const fetchGruzSprav1 = async () => {
    try {
        const response = await fetch(apiConfig.apiGruzUrl+"gruzSprav1");

        if (response.status===200) {
            const data = await response.json();
            return {fetchOK: true,data: data.addata, msg: `Данные успешно обновлены ${getCurrentDateTime()}`};
            }
            else {
            return {fetchOK: false,data: [], msg: 'Ошибка получения данных с сервера'};
        }
    } catch (e) {
        console.log(e);
        return {fetchOK: true,data: [], msg: 'Критическая ошибка получения данных с сервера'};
    }
};

export const fetchFindVagons = async (row) => {
    try {
        const response = await fetch(apiConfig.apiGruzUrl + `gruzFindVagons/${row.stan}/${row.tip}/${row.onStation}/${row.onNod}`);

        if (response.status===200) {
            const data = await response.json();
            return {fetchOK: true,data: data.data, msg: `Данные успешно обновлены ${getCurrentDateTime()}`};
        }
        else {
            return {fetchOK: false,data: [], msg: 'Ошибка получения данных с сервера'};
        }
    } catch (e) {
        console.log(e);
        return {fetchOK: true,data: [], msg: 'Критическая ошибка получения данных с сервера'};
    }
};
