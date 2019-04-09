import {apiConfig} from "../config";
import {getCurrentDateTime } from '../ducks/utils'
import stanc from '../services/stanc'


export const fetchGruzSprav1 = async () => {
    try {
        const response = await fetch(apiConfig.apiGruzUrl+"gruzSprav1");

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

export const fetchGruzSprav2 = async () => {
    try {
        const response = await fetch(apiConfig.apiGruzUrl+"gruzSprav2");

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
export const fetchGruzSprav31 = async () => {
    try {
        const response = await fetch(apiConfig.apiGruzUrl+"gruzSprav31");

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
export const fetchPogrVygr = async (row) => {
    try {
        const response = await fetch(apiConfig.apiGruzUrl + `gruzFindPogrVygr/${row.stan}/${row.tip}/${row.oper}`);

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

export const fetchVagonHistory = async (row) => {
    try {
        const response = await fetch(apiConfig.apiGruzUrl + `gruzFindVagonsOneHistory/${row.Kodv}`);

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

export const fetchPodhod = async (stantion) => {
    try {
        const response = await fetch(apiConfig.apiGruzUrl + `gruzPodhod/${stantion}`);

        if (response.status===200) {
            const data = await response.json();
            return {fetchOK: true,data: data.data, msg: `Данные успешно обновлены ${getCurrentDateTime()}`};
        }
        else {
            return {fetchOK: false,data: [], msg: 'По данной станции подходов не обнаружено'};
        }
    } catch (e) {
        console.log(e);
        return {fetchOK: true,data: [], msg: 'Критическая ошибка получения данных с сервера'};
    }
};

export const fetchGruzStantions = () => {
    try {

        return {fetchOK: true,data: stanc, msg: `Данные успешно обновлены ${getCurrentDateTime()}`};

    } catch (e) {
        console.log(e);
        return {fetchOK: true,data: [], msg: 'Критическая ошибка получения данных с сервера'};
    }
};


